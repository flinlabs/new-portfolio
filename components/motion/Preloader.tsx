"use client"
import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { openLoadGate, openNavGate, preloaderWillRun, PRELOAD_KEY } from "@/lib/gate"

export default function Preloader() {
	const [gone, setGone] = useState(false)
	const rootRef = useRef<HTMLDivElement>(null)
	const wordRef = useRef<HTMLSpanElement>(null)
	const countRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!preloaderWillRun()) {
			openLoadGate()
			const raf = requestAnimationFrame(() => setGone(true))
			return () => cancelAnimationFrame(raf)
		}
		try {
			sessionStorage.setItem(PRELOAD_KEY, "1")
		} catch {}

		window.__lenis?.stop()
		const counter = { v: 0 }
		const tl = gsap.timeline({
			onComplete: () => {
				window.__lenis?.start()
				setGone(true)
			},
		})
		tl.fromTo(wordRef.current, { yPercent: 130 }, { yPercent: 0, duration: 0.7, ease: "power4.out" })
			.to(
				counter,
				{
					v: 100,
					duration: 1.5,
					ease: "power2.inOut",
					onUpdate: () => {
						if (countRef.current) countRef.current.textContent = String(Math.round(counter.v))
					},
				},
				"<0.1",
			)
			.to([wordRef.current, countRef.current], { autoAlpha: 0, duration: 0.3, ease: "power2.in" })
			.add(() => {
				openLoadGate()
				openNavGate()
			})
			.to(rootRef.current, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "<")

		return () => {
			tl.kill()
		}
	}, [])

	if (gone) return null

	return (
		<div ref={rootRef} className="preloader" aria-hidden="true">
			<div className="preloader-word">
				<span ref={wordRef}>Faye Lin</span>
			</div>
			<div ref={countRef} className="preloader-count">
				0
			</div>
		</div>
	)
}
