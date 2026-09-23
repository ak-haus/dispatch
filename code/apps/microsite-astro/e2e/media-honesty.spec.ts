/**
 * The reading room ships only media it has — F65, and F61's media half.
 *
 * `/article` is a primary nav destination ("Articles" lands here) and it
 * shipped 7.92MB of media on load: three requests for the SAME 3.86MB MP4,
 * one of them behind a card labelled "audio". Two causes, one asset.
 *
 *   F61(1) — the rotation declared `{ kind: 'audio', src: '…/district.mp4' }`
 *            while ZERO audio files ship in dist/ (detector control: the same
 *            search finds 8 .webp). So the audio card downloaded a video to
 *            play audio it did not have, beside a hardcoded "04:32" and a
 *            synthesised 56-bar waveform, under page copy promising "the real
 *            cover media the dispatch was published with".
 *   F65    — the file was not +faststart (moov at byte 3,856,536 of
 *            3,858,799), so `preload="metadata"` could not reach the metadata
 *            without streaming the whole file, aborting, then range-requesting
 *            the tail.
 *
 * Both are now closed: the asset is remuxed (moov at byte 32, verified
 * lossless — same codec, dimensions, frame count and duration), the fabricated
 * audio kind is gone, and hover-to-play video preloads nothing. Measured by
 * CDP `encodedDataLength`, which is ACTUAL transfer — `content-length` counts
 * bytes the server offered, not bytes the browser read, and would have
 * reported 7.87MB for a page that fetched none of it.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from './helpers/fixtures'

const DIST = join(process.cwd(), 'dist')
const AUDIO = /\.(mp3|m4a|aac|ogg|oga|wav|flac)$/i
const IMAGE = /\.(webp|png|jpe?g|avif)$/i

function filesUnder(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory() ? filesUnder(join(dir, e.name)) : [join(dir, e.name)],
	)
}

test('no card claims a media kind the build does not ship', async ({ page }) => {
	const shipped = filesUnder(DIST)
	const audioFiles = shipped.filter((f) => AUDIO.test(f))
	// Prove the detector: the same sweep must find the images that DO ship,
	// so "no audio" cannot be an artifact of a search that finds nothing.
	expect(shipped.filter((f) => IMAGE.test(f)).length, 'the sweep must see shipped media').toBeGreaterThan(0)

	await page.goto('/article')
	await page.waitForTimeout(1500)

	const claimed = await page.evaluate(() => {
		const labels = [...document.querySelectorAll('button,[role="button"]')]
			.map((e) => (e.textContent ?? '').trim())
			.filter(Boolean)
		return {
			// The Media filter must not offer a kind nothing carries.
			offersAudio: labels.some((l) => /^audio$/i.test(l)),
			audioElements: document.querySelectorAll('audio').length,
			// No invented duration beside a synthesised waveform.
			hardcodedDuration: document.body.innerText.includes('Audio dispatch · '),
		}
	})

	if (audioFiles.length === 0) {
		expect(claimed.offersAudio, 'the Media filter offers a kind no card can have').toBe(false)
		expect(claimed.audioElements).toBe(0)
	}
	expect(claimed.hardcodedDuration, 'a duration must be read, never authored').toBe(false)
})

test('every shipped mp4 is +faststart', async () => {
	const mp4s = filesUnder(DIST).filter((f) => f.endsWith('.mp4'))
	expect(mp4s.length, 'the sweep must find an mp4 to judge').toBeGreaterThan(0)

	const late: string[] = []
	for (const f of mp4s) {
		const buf = readFileSync(f)
		let i = 0
		let moovAt = -1
		let mdatAt = -1
		while (i < buf.length - 8) {
			const size = buf.readUInt32BE(i)
			const type = buf.toString('latin1', i + 4, i + 8)
			if (type === 'moov' && moovAt < 0) moovAt = i
			if (type === 'mdat' && mdatAt < 0) mdatAt = i
			if (size < 8) break
			i += size
		}
		// faststart means the index precedes the payload, so a player can start
		// without streaming to the end of the file.
		if (moovAt < 0 || (mdatAt >= 0 && moovAt > mdatAt)) late.push(`${f} moov@${moovAt} mdat@${mdatAt}`)
	}
	expect(late).toEqual([])
})

test('/article does not download video nobody asked to play', async ({ page, context }) => {
	const cdp = await context.newCDPSession(page)
	await cdp.send('Network.enable')
	const url = new Map<string, string>()
	const size = new Map<string, number>()
	cdp.on('Network.requestWillBeSent', (e: { requestId: string; request: { url: string } }) =>
		url.set(e.requestId, e.request.url),
	)
	/* `dataReceived`, not `loadingFinished`. A request the browser ABORTS
	 * never fires `loadingFinished`, so counting only completions scored the
	 * unfixed build at zero — which is exactly how the defect hid: Chrome
	 * streamed a 3.8MB non-faststart file looking for its moov atom and then
	 * gave up. Those bytes crossed the wire and the reader paid for them.
	 * `dataReceived` fires per chunk and counts them.
	 *
	 * Sum `dataLength`, and only it (Build 33). Chrome reports each chunk's
	 * `encodedDataLength` one event LATE — measured for a 323,066-byte plate
	 * as [enc 0, data 134898] [134898, 188168] [188168, 0] — so the former
	 * `encodedDataLength || dataLength` counted every request's first chunk
	 * twice: +40% to +100% per image, which read six real covers (1.65MB,
	 * equal to the sum of their content-lengths to the byte) as 3.3MB. Media
	 * is never content-encoded, so decoded length IS transfer length here,
	 * and an aborted request's chunks still arrive as `dataReceived`. */
	cdp.on('Network.dataReceived', (e: { requestId: string; dataLength: number }) =>
		size.set(e.requestId, (size.get(e.requestId) ?? 0) + e.dataLength),
	)

	await page.goto('/article')
	await page.waitForTimeout(3000)

	let mediaBytes = 0
	let seen = 0
	for (const [id, u] of url) {
		if (!/\.(mp4|webm|webp|jpe?g|png|avif)$/i.test(u.split('?')[0])) continue
		seen++
		mediaBytes += Math.max(0, size.get(id) ?? 0)
	}
	// Cannot pass vacuously: the route really does ship cover imagery, so a
	// page that loaded nothing at all would fail here first.
	expect(seen, 'the route must still load its cover imagery').toBeGreaterThan(0)

	// The route measured 7.92MB before this. The posters alone are ~0.54MB;
	// 2MB leaves generous headroom while still failing the moment a 3.8MB
	// video is fetched again on load.
	expect(mediaBytes / 1048576).toBeLessThan(2)
})
