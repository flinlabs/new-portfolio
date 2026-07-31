"use client"
import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TransitionLink } from "@/components/motion/PageTransition"
import { navGate } from "@/lib/gate"

gsap.registerPlugin(ScrollTrigger)

type DeskCard = {
	slug: string
	title: string
	blurb: string
	meta: string
	rotation: number
	drift: number
	style: React.CSSProperties
	photo?: string
	logo?: string
	tint?: string
}

const cards: DeskCard[] = [
	{
		slug: "walsea",
		title: "WAL-SEA",
		blurb: "A modular ROV that surveys and vacuums urchins. Four prototypes, seven ocean deployments, one published paper.",
		meta: "2021–24 · Monterey Bay",
		rotation: -3.2,
		drift: -36,
		style: { left: "1%", top: 60, width: "min(440px, 42%)" },
		photo: "/walsea-rov.jpg",
	},
	{
		slug: "candi",
		title: "CANDI",
		blurb: "A Chrome extension that scores a LinkedIn profile against a job description while you read it. Screening went from 28 minutes to 13.",
		meta: "2025 · Shanghai",
		rotation: 1.8,
		drift: 24,
		style: { right: "3%", top: 0, width: "min(370px, 33%)" },
		logo: "/candi-logo.png",
		tint: "var(--lav)",
	},
	{
		slug: "urchin-camera",
		title: "The PVC camera rig",
		blurb: "Eighth grade: an underwater camera rig $2,500 cheaper than the commercial one. 48 hours of continuous footage at 54 feet.",
		meta: "2018–19 · Monterey Bay",
		rotation: 2.6,
		drift: -14,
		style: { left: "44%", top: 380, width: "min(390px, 36%)" },
		photo: "/urchin-camera.jpg",
	},
]

export default function ProjectsDesk() {
	const rootRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const root = rootRef.current
		if (!root) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
		if (!window.matchMedia("(min-width: 900px)").matches) return

		let cancelled = false
		const ctx = gsap.context(() => {}, root)

		const els = gsap.utils.toArray<HTMLElement>(".desk-card", root)
		els.forEach(el => gsap.set(el.querySelector(".desk-card-motion"), { autoAlpha: 0 }))

		navGate().then(() => {
			if (cancelled) return
			ctx.add(() => {
				els.forEach((el, i) => {
					const rot = Number(el.dataset.rot)
					const motion = el.querySelector<HTMLElement>(".desk-card-motion")!

					// scatter in: drop onto the desk, overshooting the resting angle
					gsap.fromTo(
						motion,
						{ autoAlpha: 0, y: 90, rotation: rot * 2.6, scale: 0.94 },
						{
							autoAlpha: 1,
							y: 0,
							rotation: rot,
							scale: 1,
							duration: 1,
							delay: i * 0.12,
							ease: "power4.out",
							scrollTrigger: { trigger: root, start: "top 80%", once: true },
						},
					)

					// slow parallax drift at different depths while scrolling past
					gsap.to(el, {
						y: Number(el.dataset.drift),
						ease: "none",
						scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
					})

					// hover: straighten and lift, settle back with a wobble
					const enter = () => {
						el.style.zIndex = "5"
						gsap.to(motion, { rotation: 0, y: -14, scale: 1.03, duration: 0.55, ease: "back.out(2.2)" })
					}
					const leave = () => {
						el.style.zIndex = ""
						gsap.to(motion, { rotation: rot, y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.45)" })
					}
					el.addEventListener("pointerenter", enter)
					el.addEventListener("pointerleave", leave)
				})
			})
		})

		return () => {
			cancelled = true
			ctx.revert()
		}
	}, [])

	return (
		<div ref={rootRef} className="desk">
			{cards.map(card => (
				<TransitionLink
					key={card.slug}
					href={`/projects/${card.slug}`}
					label={card.title}
					className={`desk-card ${card.tint ? "desk-card-tint" : ""}`}
					style={card.style}
					data-cursor="view"
					data-rot={card.rotation}
					data-drift={card.drift}
				>
					<span className="desk-card-motion" style={{ display: "block" }}>
						<span className="desk-card-inner" style={{ display: "block", background: card.tint ?? "#fff" }}>
							{card.photo && <Image src={card.photo} alt={card.title} width={800} height={600} className="desk-card-photo" />}
							{card.logo && <Image src={card.logo} alt="" width={40} height={40} className="desk-card-logo" />}
							<h3>{card.title}</h3>
							<p>{card.blurb}</p>
							<span className="desk-card-meta">
								<span>{card.meta}</span>
								<span>&#8599;</span>
							</span>
						</span>
					</span>
				</TransitionLink>
			))}
		</div>
	)
}
