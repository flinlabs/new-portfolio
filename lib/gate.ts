// Resolves once the preloader has finished (or immediately when it's skipped),
// so above-the-fold intro animations don't play hidden behind it.
let resolveGate: () => void
let done = false

export const gatePromise: Promise<void> =
	typeof window === "undefined"
		? Promise.resolve()
		: new Promise(res => {
				resolveGate = res
			})

export function openGate() {
	if (done) return
	done = true
	resolveGate?.()
}

export function gateOpen() {
	return done
}

export const PRELOAD_KEY = "fl-preloaded"

export function preloaderWillRun(): boolean {
	if (typeof window === "undefined") return false
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
	try {
		return sessionStorage.getItem(PRELOAD_KEY) === null
	} catch {
		return false
	}
}
