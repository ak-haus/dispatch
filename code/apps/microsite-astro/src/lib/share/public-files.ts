/**
 * Build-time lookups into public/ for the share module. Paths resolve from
 * the working directory the build runs in (the app root), the same
 * convention DispatchArticleLayout's banner probe uses.
 */

import fs from 'node:fs'
import path from 'node:path'

export function publicFilePath(file: string): string {
	return path.join(process.cwd(), 'public', file)
}

export function publicFileExists(file: string): boolean {
	try {
		return fs.statSync(publicFilePath(file)).isFile()
	} catch {
		return false
	}
}
