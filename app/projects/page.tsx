import type { Metadata } from "next"
import { projects } from "@/data/projects"
import Reveal from "@/components/motion/Reveal"
import WorkList from "@/components/home/WorkList"

export const metadata: Metadata = { title: "Work" }

const items = projects.map(p => ({
	slug: p.slug,
	title: p.title,
	tag: p.tag,
	period: p.period,
	image: p.images?.[0],
	logo: p.thumbnail,
}))

export default function ProjectsPage() {
	return (
		<main className="container" style={{ minHeight: "70dvh" }}>
			<div className="page-head">
				<Reveal as="h1" lines className="display-xl">
					Work
				</Reveal>
				<Reveal delay={0.2}>
					<p className="body-lg muted" style={{ marginTop: 20, maxWidth: "48ch" }}>
						Projects I designed, built, and took into the field, from AI recruiting tools to an
						urchin-culling underwater robot.
					</p>
				</Reveal>
			</div>
			<Reveal delay={0.1}>
				<WorkList items={items} />
			</Reveal>
			<div style={{ paddingBottom: "clamp(96px, 12vw, 176px)" }} />
		</main>
	)
}
