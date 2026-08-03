"use client"
import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TransitionLink } from "@/components/motion/PageTransition"
import Motif from "@/components/Motif"
import { navGate } from "@/lib/gate"
import { useVelocitySkew } from "@/lib/useVelocitySkew"

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsDesk() {
	const rootRef = useRef<HTMLDivElement>(null)
	useVelocitySkew(rootRef, 2.5)

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
				// The scroll-standstill scene: the desk pins and scrolling deals the
				// cards onto it one by one — fully scrubbed, so scrolling back
				// sweeps them off again.
				const deal = gsap.timeline({
					scrollTrigger: {
						trigger: root,
						start: "top 12%",
						end: "+=130%",
						pin: true,
						scrub: 1,
						anticipatePin: 1,
					},
				})

				els.forEach((el, i) => {
					const rot = Number(el.dataset.rot)
					const motion = el.querySelector<HTMLElement>(".desk-card-motion")!
					const inner = el.querySelector<HTMLElement>(".desk-card-inner")!

					deal.fromTo(
						motion,
						{ autoAlpha: 0, y: window.innerHeight * 0.55, rotation: rot * 3.4, scale: 0.9 },
						{ autoAlpha: 1, y: 0, rotation: rot, scale: 1, duration: 1, ease: "power2.out" },
						i * 0.55,
					)

					// cursor-following perspective tilt while over the card
					const tiltX = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" })
					const tiltY = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" })
					gsap.set(inner, { transformPerspective: 750 })

					const move = (e: PointerEvent) => {
						const r = el.getBoundingClientRect()
						tiltX(((e.clientY - r.top) / r.height - 0.5) * -9)
						tiltY(((e.clientX - r.left) / r.width - 0.5) * 9)
					}
					// hover: straighten and lift, settle back with a wobble
					const enter = () => {
						el.style.zIndex = "5"
						gsap.to(motion, { rotation: 0, y: -16, scale: 1.03, duration: 0.55, ease: "back.out(2.2)" })
					}
					const leave = () => {
						el.style.zIndex = ""
						tiltX(0)
						tiltY(0)
						gsap.to(motion, { rotation: rot, y: 0, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.45)" })
					}
					el.addEventListener("pointerenter", enter)
					el.addEventListener("pointermove", move)
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
			{/* WAL-SEA: the big photo */}
			<TransitionLink
				href="/projects/walsea"
				label="WAL-SEA"
				className="desk-card"
				style={{ left: "2%", top: 30, width: "min(400px, 37%)", zIndex: 2 }}
				data-rot={-3.2}
				data-drift={-42}
			>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "#fff" }}>
						<Image src="/walsea-rov.jpg" alt="The WAL-SEA ROV on deck" width={800} height={600} className="desk-card-photo" />
						<h3>WAL-SEA</h3>
						<p>A modular ROV that surveys and vacuums urchins. Four prototypes, seven ocean deployments, one published paper.</p>
						<span className="desk-card-meta">
							<span>2021&ndash;24 &middot; Monterey Bay</span>
							<Motif size={26} strokeWidth={3.4} className="desk-stamp" />
						</span>
					</span>
				</span>
			</TransitionLink>

			{/* CANDI: lavender panel */}
			<TransitionLink
				href="/projects/candi"
				label="CANDI"
				className="desk-card desk-card-tint"
				style={{ right: "6%", top: 10, width: "min(340px, 30%)" }}
				data-rot={1.8}
				data-drift={26}
			>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "var(--lav)" }}>
						<Image src="/candi-logo.png" alt="" width={40} height={40} className="desk-card-logo" />
						<h3>CANDI</h3>
						<p>A Chrome extension that scores a LinkedIn profile against a job description while you read it. Screening went from 28 minutes to 13.</p>
						<span className="desk-card-meta">
							<span>2025 &middot; Shanghai</span>
							<span>&#8599;</span>
						</span>
					</span>
				</span>
			</TransitionLink>

			{/* CompLens: blush panel, the newest thing on the desk */}
			<TransitionLink
				href="/projects/complens"
				label="CompLens"
				className="desk-card desk-card-tint"
				style={{ left: "38%", top: 0, width: "min(310px, 28%)", zIndex: 2 }}
				data-rot={1.2}
				data-drift={18}
			>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "var(--blush)" }}>
						<h3>CompLens</h3>
						<p>Type an address, get a rent comp memo: nearby multifamily ranked by rent per square foot, with demographics and a map. Building it solo right now.</p>
						<span className="desk-card-meta">
							<span>2026 &middot; Berkeley &middot; In progress</span>
							<span>&#8599;</span>
						</span>
					</span>
				</span>
			</TransitionLink>

			{/* Urchin camera rig: photo */}
			<TransitionLink
				href="/projects/urchin-camera"
				label="The PVC camera rig"
				className="desk-card"
				style={{ left: "34%", top: 190, width: "min(360px, 33%)", zIndex: 3 }}
				data-rot={2.6}
				data-drift={-16}
			>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "#fff" }}>
						<Image src="/urchin-camera.jpg" alt="The PVC underwater camera rig" width={800} height={600} className="desk-card-photo" />
						<h3>The PVC camera rig</h3>
						<p>Eighth grade: an underwater camera rig $2,500 cheaper than the commercial one. 48 hours of continuous footage at 54 feet.</p>
						<span className="desk-card-meta">
							<span>2018&ndash;19 &middot; Monterey Bay</span>
							<Motif size={26} strokeWidth={3.4} className="desk-stamp" />
						</span>
					</span>
				</span>
			</TransitionLink>

			{/* AquaMeridian: powder panel */}
			<TransitionLink
				href="/experience/aquameridian"
				label="AquaMeridian US"
				className="desk-card desk-card-tint"
				style={{ right: "0%", top: 310, width: "min(320px, 29%)", zIndex: 2 }}
				data-rot={-2.2}
				data-drift={38}
			>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "var(--powder)" }}>
						<Image src="/aquameridian-logo.png" alt="" width={40} height={40} className="desk-card-logo" />
						<h3>AquaMeridian US</h3>
						<p>The conservation nonprofit I started at fifteen and ran for four years: $8,500 raised, 2,140 lbs of shoreline debris, twelve people who kept it going.</p>
						<span className="desk-card-meta">
							<span>2022 &middot; Ongoing</span>
							<span>&#8599;</span>
						</span>
					</span>
				</span>
			</TransitionLink>

			{/* Also on the pile: butter note with two smaller things */}
			<div className="desk-card desk-card-tint" style={{ left: "8%", top: 410, width: "min(330px, 30%)", zIndex: 4 }} data-rot={1.4} data-drift={-30}>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "var(--butter)" }}>
						<span className="label" style={{ color: "var(--butter-ink)", display: "block", marginBottom: 14 }}>
							Also on the pile
						</span>
						<span className="desk-note-list">
							<TransitionLink href="/experience/skydeck" label="Skyline" className="desk-note-row">
								A voice agent that runs first qualification calls for CRE brokers <span>&#8599;</span>
							</TransitionLink>
							<TransitionLink href="/projects/lease-intelligence" label="Lease Intelligence" className="desk-note-row">
								Ask 880 leases a question, get a cited answer &mdash; sandbox demo inside <span>&#8599;</span>
							</TransitionLink>
						</span>
					</span>
				</span>
			</div>

			{/* Recognition sticker */}
			<div className="desk-card desk-card-tint" style={{ left: "44%", top: 480, width: "min(300px, 27%)", zIndex: 5 }} data-rot={-1.6} data-drift={14}>
				<span className="desk-card-motion">
					<span className="desk-card-inner" style={{ background: "var(--mint)" }}>
						<span className="label" style={{ color: "var(--mint-ink)", display: "block", marginBottom: 12 }}>
							Recognition
						</span>
						<p style={{ color: "var(--ink)" }}>
							ISEF Finalist &middot; Published in IEEE Xplore &middot; Regeneron STS Top 300 &middot; Broadcom
							MASTERS Top 300 &middot; NASA &amp; NOAA Special Awards
						</p>
					</span>
				</span>
			</div>
		</div>
	)
}
