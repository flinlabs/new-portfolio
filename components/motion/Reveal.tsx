"use client"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { gatePromise } from "@/lib/gate"

gsap.registerPlugin(ScrollTrigger, SplitText)

type RevealProps = {
	children: React.ReactNode
	/** Split into masked lines (for display type) instead of a fade-up */
	lines?: boolean
	delay?: number
	className?: string
	as?: "div" | "section" | "span" | "h1" | "h2" | "p"
	style?: React.CSSProperties
}

export default function Reveal({ children, lines = false, delay = 0, className, style, as: Tag = "div" }: RevealProps) {
	const ref = useRef<HTMLElement>(null)

	useLayoutEffect(() => {
		const el = ref.current
		if (!el) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		let split: SplitText | null = null
		let cancelled = false
		const ctx = gsap.context(() => {}, el)

		if (!lines) gsap.set(el, { autoAlpha: 0, y: 32 })

		const build = async () => {
			await Promise.all([gatePromise, document.fonts.ready])
			if (cancelled) return
			ctx.add(() => {
				if (lines) {
					split = SplitText.create(el, { type: "lines", mask: "lines" })
					gsap.from(split.lines, {
						yPercent: 115,
						duration: 1.1,
						stagger: 0.09,
						delay,
						ease: "power4.out",
						scrollTrigger: { trigger: el, start: "top 88%", once: true },
					})
				} else {
					gsap.to(el, {
						autoAlpha: 1,
						y: 0,
						duration: 1,
						delay,
						ease: "power3.out",
						scrollTrigger: { trigger: el, start: "top 90%", once: true },
					})
				}
			})
		}
		build()

		return () => {
			cancelled = true
			ctx.revert()
			split?.revert()
		}
	}, [lines, delay])

	return (
		<Tag
			ref={(node: HTMLElement | null) => {
				ref.current = node
			}}
			className={className}
			style={style}
		>
			{children}
		</Tag>
	)
}
