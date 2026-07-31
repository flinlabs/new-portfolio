// Two gates keep entrance animations honest:
// - loadGate: resolves when the preloader finishes (or immediately if skipped)
// - navGate: re-armed on every curtain cover, resolves as the curtain lifts,
//   so above-the-fold reveals never play hidden behind it.
let loadDone = false
let resolveLoad: () => void

export const loadGate: Promise<void> =
	typeof window === "undefined"
		? Promise.resolve()
		: new Promise(res => {
				resolveLoad = res
			})

export function openLoadGate() {
	if (loadDone) return
	loadDone = true
	resolveLoad?.()
}

let navPromise: Promise<void> = typeof window === "undefined" ? Promise.resolve() : loadGate
let resolveNav: (() => void) | null = null

export function armNavGate() {
	navPromise = new Promise(res => {
		resolveNav = res
	})
}

export function openNavGate() {
	resolveNav?.()
	resolveNav = null
}

export function navGate(): Promise<void> {
	return navPromise
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
