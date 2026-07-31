"use client"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { navGate } from "@/lib/gate"

const HOLD = 2.2

export default function RotatingLines({ lines }: { lines: string[] }) {
	const ref = useRef<HTMLSpanElement>(null)

	useLayoutEffect(() => {
		const el = ref.current
		if (!el) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		const items = Array.from(el.querySelectorAll<HTMLElement>(".rotator-line"))
		gsap.set(items, { yPercent: 120 })
		let cancelled = false
		let tl: gsap.core.Timeline | undefined

		navGate().then(() => {
			if (cancelled) return
			tl = gsap.timeline({ repeat: -1 })
			items.forEach(item => {
				tl!
					.fromTo(item, { yPercent: 120 }, { yPercent: 0, duration: 0.6, ease: "power4.out" })
					.to(item, { yPercent: -120, duration: 0.55, ease: "power3.in" }, `+=${HOLD}`)
			})
		})

		return () => {
			cancelled = true
			tl?.kill()
		}
	}, [])

	return (
		<span ref={ref} className="rotator" aria-label={lines.join(", ")}>
			{/* sizer keeps the box as tall/wide as the longest line */}
			<span className="rotator-sizer" aria-hidden="true">
				{lines.reduce((a, b) => (a.length > b.length ? a : b))}
			</span>
			{lines.map(line => (
				<span key={line} className="rotator-line" aria-hidden="true">
					{line}
				</span>
			))}
		</span>
	)
}
