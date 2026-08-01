"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null)
	const ringRef = useRef<HTMLDivElement>(null)

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
			if (t.closest?.("a, button")) {
				gsap.to(ring, { scale: 1.4, duration: 0.35, ease: "power3.out" })
			}
		}

		const onOut = (e: PointerEvent) => {
			const t = e.target as HTMLElement
			if (t.closest?.("a, button")) {
				gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" })
			}
		}

		// Click ripple (from the design notes: small outward ring on click)
		const onDown = (e: PointerEvent) => {
			const ripple = document.createElement("span")
			ripple.className = "click-ripple"
			ripple.style.left = `${e.clientX}px`
			ripple.style.top = `${e.clientY}px`
			document.body.appendChild(ripple)
			ripple.addEventListener("animationend", () => ripple.remove())
		}

		window.addEventListener("pointermove", onMove, { passive: true })
		window.addEventListener("pointerdown", onDown, { passive: true })
		document.addEventListener("pointerover", onOver)
		document.addEventListener("pointerout", onOut)
		return () => {
			window.removeEventListener("pointermove", onMove)
			window.removeEventListener("pointerdown", onDown)
			document.removeEventListener("pointerover", onOver)
			document.removeEventListener("pointerout", onOut)
		}
	}, [])

	return (
		<>
			<div ref={dotRef} className="cursor-dot" aria-hidden="true" />
			<div ref={ringRef} className="cursor-ring" aria-hidden="true" />
		</>
	)
}
