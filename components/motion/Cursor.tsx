"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null)
	const ringRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
		if (!fine || !dotRef.current || !ringRef.current) return

		const dot = dotRef.current
		const ring = ringRef.current
		gsap.set([dot, ring], { xPercent: 0, yPercent: 0, autoAlpha: 0 })

		const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" })
		const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" })
		const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" })
		const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" })

		let seen = false
		const onMove = (e: PointerEvent) => {
			if (!seen) {
				seen = true
				gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
			}
			dotX(e.clientX)
			dotY(e.clientY)
			ringX(e.clientX)
			ringY(e.clientY)
		}

		const onOver = (e: PointerEvent) => {
			const t = e.target as HTMLElement
			const view = t.closest?.("[data-cursor='view']")
			const interactive = t.closest?.("a, button, [data-cursor]")
			if (view) {
				ring.classList.add("is-view")
				if (labelRef.current) labelRef.current.textContent = (view as HTMLElement).dataset.cursorLabel ?? "View"
				gsap.to(ring, { scale: 1.9, duration: 0.35, ease: "power3.out" })
				gsap.to(dot, { scale: 0, duration: 0.25 })
			} else if (interactive) {
				gsap.to(ring, { scale: 1.4, duration: 0.35, ease: "power3.out" })
			}
		}

		const onOut = (e: PointerEvent) => {
			const t = e.target as HTMLElement
			if (t.closest?.("a, button, [data-cursor]")) {
				ring.classList.remove("is-view")
				gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" })
				gsap.to(dot, { scale: 1, duration: 0.25 })
			}
		}

		window.addEventListener("pointermove", onMove, { passive: true })
		document.addEventListener("pointerover", onOver)
		document.addEventListener("pointerout", onOut)
		return () => {
			window.removeEventListener("pointermove", onMove)
			document.removeEventListener("pointerover", onOver)
			document.removeEventListener("pointerout", onOut)
		}
	}, [])

	return (
		<>
			<div ref={dotRef} className="cursor-dot" aria-hidden="true" />
			<div ref={ringRef} className="cursor-ring" aria-hidden="true">
				<span ref={labelRef}>View</span>
			</div>
		</>
	)
}
