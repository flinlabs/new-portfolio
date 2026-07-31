import type { Metadata } from "next"
import Reveal from "@/components/motion/Reveal"
import ProjectsDesk from "@/components/home/ProjectsDesk"

export const metadata: Metadata = { title: "Projects" }

export default function ProjectsPage() {
	return (
		<main className="container" style={{ minHeight: "70dvh" }}>
			<div className="page-head">
				<Reveal as="h1" lines className="display-xl">
					Projects
				</Reveal>
				<Reveal delay={0.15}>
					<p className="body-lg muted" style={{ marginTop: 20, maxWidth: "48ch" }}>
						Things I designed, built, and took into the field, from AI recruiting tools to an
						urchin-culling underwater robot. Pick anything up.
					</p>
				</Reveal>
			</div>
			<ProjectsDesk />
			<div style={{ paddingBottom: "clamp(88px, 10vw, 150px)" }} />
		</main>
	)
}
