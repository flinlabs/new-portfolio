"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { TransitionLink } from "@/components/motion/PageTransition"
import { Chip } from "@/components/TagChips"
import { useVelocitySkew } from "@/lib/useVelocitySkew"

export type ExperienceItem = {
	slug: string
	title: string
	company: string
	period: string
	tag: string
}

const pastels = [
	["var(--lav)", "var(--lav-ink)"],
	["var(--powder)", "var(--powder-ink)"],
	["var(--butter)", "var(--butter-ink)"],
	["var(--mint)", "var(--mint-ink)"],
	["var(--blush)", "var(--blush-ink)"],
]

// pinned per company so colors survive reordering; new slugs fall back to the cycle
const slugColor: Record<string, string> = {
	esrt: "var(--mint)",
	skydeck: "var(--powder)",
	cgp: "var(--blush)",
	loeb: "var(--lav)",
	aquameridian: "var(--butter)",
}

const colorFor = (slug: string, i: number) => slugColor[slug] ?? pastels[i % pastels.length][0]

const seasons: Record<string, string> = {
	Dec: "Winter", Jan: "Winter", Feb: "Winter",
	Mar: "Spring", Apr: "Spring", May: "Spring",
	Jun: "Summer", Jul: "Summer", Aug: "Summer",
	Sep: "Fall", Oct: "Fall", Nov: "Fall",
}

function seasonOf(period: string) {
	const month = period.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/)?.[0]
	const year = period.match(/20\d\d/)?.[0] ?? ""
	const season = month ? seasons[month] : ""
	return `${season} ${year}${period.includes("Present") ? " —" : ""}`.trim()
}

export default function ExperienceIndex({ items, compact = false }: { items: ExperienceItem[]; compact?: boolean }) {
	const [active, setActive] = useState(0)
	const current = items[active]
	const previewRef = useRef<HTMLDivElement>(null)
	const listRef = useRef<HTMLDivElement>(null)
	useVelocitySkew(previewRef, 3)

	// cursor-following 3D tilt on each row, same physics family as the desk
	useEffect(() => {
		const list = listRef.current
		if (!list) return
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		const cleanups: (() => void)[] = []
		list.querySelectorAll<HTMLElement>(".exp-row").forEach(row => {
			gsap.set(row, { transformPerspective: 900 })
			const rx = gsap.quickTo(row, "rotationX", { duration: 0.45, ease: "power3.out" })
			const ry = gsap.quickTo(row, "rotationY", { duration: 0.45, ease: "power3.out" })
			const yTo = gsap.quickTo(row, "y", { duration: 0.35, ease: "power3.out" })
			const zTo = gsap.quickTo(row, "z", { duration: 0.35, ease: "power3.out" })
			const move = (e: PointerEvent) => {
				const r = row.getBoundingClientRect()
				rx(((e.clientY - r.top) / r.height - 0.5) * -5)
				ry(((e.clientX - r.left) / r.width - 0.5) * 2.5)
			}
			const enter = () => {
				yTo(-3)
				zTo(14)
			}
			const leave = () => {
				rx(0)
				ry(0)
				yTo(0)
				zTo(0)
			}
			row.addEventListener("pointermove", move)
			row.addEventListener("pointerenter", enter)
			row.addEventListener("pointerleave", leave)
			cleanups.push(() => {
				row.removeEventListener("pointermove", move)
				row.removeEventListener("pointerenter", enter)
				row.removeEventListener("pointerleave", leave)
			})
		})
		return () => cleanups.forEach(fn => fn())
	}, [items])

	return (
		<div className={compact ? undefined : "exp-layout"}>
			<div ref={listRef} className="exp-list">
				{items.map((exp, i) => (
					<TransitionLink
						key={exp.slug}
						href={`/experience/${exp.slug}`}
						label={exp.company}
						className="exp-row"
						onNavigate={() => setActive(i)}
					>
						<span className="exp-row-flood" style={{ background: colorFor(exp.slug, i) }} aria-hidden="true" />
						<span className="exp-row-year" onPointerEnter={() => setActive(i)}>
							{seasonOf(exp.period)}
						</span>
						<span onPointerEnter={() => setActive(i)}>
							<span className="exp-row-role">{exp.title}</span>
							<span className="exp-row-company">{exp.company}</span>
						</span>
						<span className="exp-row-tags">
							{exp.tag
								.split(/\s*[·•]\s*/)
								.slice(0, 2)
								.map(t => (
									<Chip key={t} text={t} />
								))}
						</span>
					</TransitionLink>
				))}
			</div>

			{!compact && (
			<div ref={previewRef} className="exp-preview" aria-hidden="true">
				<div className="exp-preview-inner">
					{items.map((exp, i) => (
						<div
							key={exp.slug}
							className={`exp-preview-slide ${i === active ? "is-active" : ""}`}
							style={{ background: colorFor(exp.slug, i) }}
						>
							<Image src={`/${exp.slug}-logo.png`} alt="" width={96} height={96} />
						</div>
					))}
				</div>
				<div className="exp-preview-caption">
					<span>
						{current.company.split("(")[0].trim()} &middot; {current.period}
					</span>
					<span>
						{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
					</span>
				</div>
			</div>
			)}
		</div>
	)
}
