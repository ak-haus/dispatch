/**
 * Colophon — publisher details footer.
 *
 * Three-column flat layout on md+ (Colophon · Issue metadata · Editors'
 * epigraph), stacked on phone. The Colophon column carries the typeface
 * credits ("Set in Pangram Editorial New & Vollkorn"); the meta column
 * is a dl table of issue/date/district/building values; the editors'
 * column carries an italic epigraph that reads as a manifesto closer.
 */

import { PALETTE } from './shared/palette'

export function Colophon({
	issueLabel,
	dateLabel,
}: {
	issueLabel: string
	dateLabel: string
}) {
	return (
		<section
			aria-label="Colophon"
			className="relative border-t border-body-strong/15"
			style={{ backgroundColor: 'var(--sky-low)' }}
		>
			<div className="mx-auto max-w-[1360px] 2xl:max-w-[1600px] min-[2200px]:max-w-[1880px] px-6 py-16 md:px-16 md:py-24">
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
					<div>
						<p
							className="font-mono text-[12px] uppercase tracking-[0.42em]"
							style={{ color: PALETTE.copper }}
						>
							Colophon
						</p>
						<p className="mt-4 font-narrative italic text-[1.25rem] leading-snug text-body-strong">
							Set in <span className="not-italic">Pangram Editorial New</span> &amp;{' '}
							<span className="not-italic">Vollkorn</span>.
						</p>
						<p className="mt-2 font-narrative text-[0.9375rem] leading-relaxed text-body-muted">
							Printed in vellum. Issued from the Editorial District, Prime City, MMXXVI.
						</p>
					</div>
					<dl className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[12px] uppercase tracking-[0.22em]">
						<dt className="text-body-faint">Issue</dt>
						<dd className="text-body-strong">{issueLabel}</dd>
						<dt className="text-body-faint">Date</dt>
						<dd className="text-body-strong">{dateLabel}</dd>
						<dt className="text-body-faint">District</dt>
						<dd className="text-body-strong">Editorial · Recto</dd>
						<dt className="text-body-faint">Building</dt>
						<dd className="text-body-strong">DISpatch HQ</dd>
					</dl>
					<div>
						<p className="font-mono text-[12px] uppercase tracking-[0.42em] text-body-faint">
							From the editors
						</p>
						<p className="mt-4 font-narrative italic text-[1rem] leading-relaxed text-body-muted">
							“We are not writing about the city. The city is being written, and these are
							its dispatches.”
						</p>
					</div>
				</div>
				<div className="mt-12 flex items-baseline justify-between border-t border-body-strong/20 pt-5 font-mono text-[12px] uppercase tracking-[0.32em] text-body-faint">
					<span>DISpatch · Volume 01 · MMXXVI</span>
					<span>·</span>
					<span>End of issue</span>
				</div>
			</div>
		</section>
	)
}
