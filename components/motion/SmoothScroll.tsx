"use client"
import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

declare global {
	interface Window {
		__lenis?: Lenis
	}
}

export default function SmoothScroll() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		const lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
		window.__lenis = lenis

		lenis.on("scroll", ScrollTrigger.update)
		// Keep gsap's default lag smoothing: without it, long main-thread blocks
		// (hydration, WebGL shader compile) fast-forward every running timeline,
		// which visibly skips the preloader and page transitions.
		const tick = (time: number) => lenis.raf(time * 1000)
		gsap.ticker.add(tick)

		return () => {
			gsap.ticker.remove(tick)
			lenis.destroy()
			delete window.__lenis
		}
	}, [])

	return null
}
