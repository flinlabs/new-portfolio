"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { TransitionLink } from "@/components/motion/PageTransition"

export type WorkItem = {
	slug: string
	title: string
	tag: string
	period: string
	image?: string
	logo?: string
}

export default function WorkList({ items }: { items: WorkItem[] }) {
	const sectionRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState<number | null>(null)

	useEffect(() => {
		const section = sectionRef.current
		const preview = previewRef.current
		if (!section || !preview) return
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

		const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" })
		const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" })
		const onMove = (e: PointerEvent) => {
			xTo(e.clientX)
			yTo(e.clientY)
		}
		section.addEventListener("pointermove", onMove, { passive: true })
		return () => section.removeEventListener("pointermove", onMove)
	}, [])

	useEffect(() => {
		const preview = previewRef.current
		if (!preview) return
		gsap.to(preview, {
			autoAlpha: active === null ? 0 : 1,
			scale: active === null ? 0.92 : 1,
			duration: 0.4,
			ease: "power3.out",
		})
	}, [active])

	return (
		<div ref={sectionRef} className="work-rows" onPointerLeave={() => setActive(null)}>
			{items.map((item, i) => (
				<TransitionLink
					key={item.slug}
					href={`/projects/${item.slug}`}
					label={item.title}
					className="work-row"
					data-cursor="view"
					onNavigate={() => setActive(null)}
				>
					<span
						className="muted"
						style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}
						onPointerEnter={() => setActive(i)}
					>
						{String(i + 1).padStart(2, "0")}
					</span>
					<span
						className="serif work-row-title"
						style={{ fontSize: "clamp(30px, 4.4vw, 60px)", lineHeight: 1.05, display: "block" }}
						onPointerEnter={() => setActive(i)}
					>
						{item.title}
					</span>
					<span className="work-row-meta muted" style={{ fontSize: 13, textAlign: "right", lineHeight: 1.7 }}>
						{item.tag}
						<br />
						{item.period}
					</span>
				</TransitionLink>
			))}

			<div ref={previewRef} className="work-preview" aria-hidden="true">
				{active !== null &&
					(items[active].image ? (
						<Image src={items[active].image!} alt="" width={600} height={760} />
					) : (
						<div className="work-preview-logo">
							{items[active].logo && <Image src={items[active].logo!} alt="" width={120} height={120} />}
						</div>
					))}
			</div>
		</div>
	)
}
