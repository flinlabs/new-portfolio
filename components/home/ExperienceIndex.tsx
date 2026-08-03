"use client"
import { useRef, useState } from "react"
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

function yearOf(period: string) {
	const years = period.match(/20\d\d/g)
	const year = years ? years[years.length - 1] : ""
	return period.includes("Present") ? `${period.match(/20\d\d/)?.[0]} —` : year
}

export default function ExperienceIndex({ items, compact = false }: { items: ExperienceItem[]; compact?: boolean }) {
	const [active, setActive] = useState(0)
	const current = items[active]
	const previewRef = useRef<HTMLDivElement>(null)
	useVelocitySkew(previewRef, 3)

	return (
		<div className={compact ? undefined : "exp-layout"}>
			<div className="exp-list">
				{items.map((exp, i) => (
					<TransitionLink
						key={exp.slug}
						href={`/experience/${exp.slug}`}
						label={exp.company}
						className="exp-row"
						onNavigate={() => setActive(i)}
					>
						<span className="exp-row-flood" style={{ background: pastels[i % pastels.length][0] }} aria-hidden="true" />
						<span className="exp-row-year" onPointerEnter={() => setActive(i)}>
							{yearOf(exp.period)}
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
							style={{ background: pastels[i % pastels.length][0] }}
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
