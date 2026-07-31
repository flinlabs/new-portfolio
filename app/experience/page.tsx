import type { Metadata } from "next"
import { experiences } from "@/data/experiences"
import Reveal from "@/components/motion/Reveal"
import ExperienceIndex from "@/components/home/ExperienceIndex"

export const metadata: Metadata = { title: "Experience" }

const items = experiences.map(({ slug, title, company, period, tag }) => ({ slug, title, company, period, tag }))

export default function ExperienceIndexPage() {
	return (
		<main className="container" style={{ minHeight: "70dvh" }}>
			<div className="page-head">
				<Reveal as="h1" lines className="display-xl">
					Experience
				</Reveal>
				<Reveal delay={0.15}>
					<p className="body-lg muted" style={{ marginTop: 20, maxWidth: "48ch" }}>
						Internships and organizations across AI product work, venture, and conservation. Most recent
						first; every row opens the full story.
					</p>
				</Reveal>
			</div>
			<Reveal delay={0.05}>
				<ExperienceIndex items={items} />
			</Reveal>
			<div style={{ paddingBottom: "clamp(88px, 10vw, 150px)" }} />
		</main>
	)
}
