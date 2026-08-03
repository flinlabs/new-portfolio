import type { Metadata } from "next"
import Image from "next/image"
import { projects } from "@/data/projects"
import Reveal from "@/components/motion/Reveal"
import { TransitionLink } from "@/components/motion/PageTransition"

export const metadata: Metadata = { title: "Projects" }

const pastels = ["var(--lav)", "var(--powder)", "var(--butter)", "var(--mint)", "var(--blush)"]

export default function ProjectsPage() {
	return (
		<main className="container" style={{ minHeight: "70dvh" }}>
			<div className="page-head">
				<Reveal as="h1" lines className="display-lg">
					Projects
				</Reveal>
				<Reveal delay={0.15}>
					<p className="body-lg muted" style={{ marginTop: 18, maxWidth: "48ch" }}>
						Everything built and shipped, in one place. The desk on the home page keeps the highlights.
					</p>
				</Reveal>
			</div>
			<div className="project-grid">
				{projects.map((p, i) => (
					<Reveal key={p.slug} delay={i * 0.06}>
						<TransitionLink
							href={`/projects/${p.slug}`}
							label={p.title}
							className="project-card"
							style={{ "--wash": pastels[i % pastels.length] } as React.CSSProperties}
						>
							<span className="desk-card-inner" style={{ display: "block", background: "#fff" }}>
								<span className="card-wash" aria-hidden="true" />
								{p.images?.[0] ? (
									<Image src={p.images[0]} alt={p.title} width={800} height={600} className="desk-card-photo" />
								) : (
									p.thumbnail && <Image src={p.thumbnail} alt="" width={40} height={40} className="desk-card-logo" />
								)}
								<h3>{p.title}</h3>
								<p>{p.summary}</p>
								<span className="desk-card-meta">
									<span>{p.period}</span>
									<span>&#8599;</span>
								</span>
							</span>
						</TransitionLink>
					</Reveal>
				))}
			</div>
			<div style={{ paddingBottom: "clamp(88px, 10vw, 150px)" }} />
		</main>
	)
}
