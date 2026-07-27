/** JSR graph shim only — npm tarball keeps `from "bun"` (Bun built-in). */
export class Glob {
	constructor(_pattern: string, _options?: Record<string, unknown>) {}
	scanSync(_cwd?: string): string[] {
		return [];
	}
	async *scan(_cwd?: string): AsyncGenerator<string> {}
	[Symbol.asyncIterator](): AsyncIterator<string> {
		return this.scan();
	}
}