import type { Metadata } from "next"
import { experiences } from "@/data/experiences"
import Reveal from "@/components/motion/Reveal"
import { TransitionLink } from "@/components/motion/PageTransition"

export const metadata: Metadata = { title: "Experience" }

export default function ExperienceIndex() {
	return (
		<main className="container" style={{ minHeight: "70dvh" }}>
			<div className="page-head">
				<Reveal as="h1" lines className="display-xl">
					Experience
				</Reveal>
				<Reveal delay={0.2}>
					<p className="body-lg muted" style={{ marginTop: 20, maxWidth: "48ch" }}>
						Internships and organizations across AI product work, venture, and ocean conservation.
					</p>
				</Reveal>
			</div>
			<div className="rows-light">
				{experiences.map(exp => (
					<Reveal key={exp.slug}>
						<TransitionLink href={`/experience/${exp.slug}`} label={exp.company} className="exp-row" data-cursor="view">
							<span className="serif exp-row-company">{exp.company}</span>
							<span className="muted exp-row-role">{exp.title}</span>
							<span className="muted exp-row-period">{exp.period}</span>
						</TransitionLink>
					</Reveal>
				))}
			</div>
			<div style={{ paddingBottom: "clamp(96px, 12vw, 176px)" }} />
		</main>
	)
}
