"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type LenisLike = { scrollTo: (target: number, opts?: { duration?: number }) => void }

export default function BackToTop() {
	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const btn = ref.current
		if (!btn) return
		gsap.set(btn, { autoAlpha: 0, y: 14 })
		let shown = false
		const onScroll = () => {
			const show = window.scrollY > 700
			if (show !== shown) {
				shown = show
				gsap.to(btn, { autoAlpha: show ? 1 : 0, y: show ? 0 : 14, duration: 0.4, ease: "power3.out", overwrite: "auto" })
			}
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	const toTop = () => {
		const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
		if (lenis) lenis.scrollTo(0, { duration: 1.1 })
		else window.scrollTo({ top: 0, behavior: "smooth" })
	}

	return (
		<button ref={ref} className="back-to-top" onClick={toTop} aria-label="Back to top">
			&uarr;
		</button>
	)
}
