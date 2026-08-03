import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import Image from "next/image"
import TagChips from "@/components/TagChips"
import Reveal from "@/components/motion/Reveal"
import { TransitionLink } from "@/components/motion/PageTransition"

export function generateStaticParams() {
	return projects.map(p => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const index = projects.findIndex(p => p.slug === slug)
	if (index === -1) notFound()
	const project = projects[index]
	const next = projects[(index + 1) % projects.length]

	return (
		<main className="container">
			<div className="page-head" style={{ maxWidth: 900 }}>
				<Reveal>
					<TagChips tag={project.tag} />
				</Reveal>
				<Reveal as="h1" lines className="display-lg" delay={0.1} style={{ marginTop: 24 }}>
					{project.title}
				</Reveal>
				{project.subtitle && (
					<Reveal delay={0.2}>
						<p style={{ fontSize: "clamp(17px, 1.8vw, 21px)", fontWeight: 520, marginTop: 16, color: "var(--ink-soft)" }}>
							{project.subtitle}
						</p>
					</Reveal>
				)}
				<Reveal delay={0.28}>
					<div className="page-head-meta">
						<span>{project.period}</span>
						{project.location && <span>{project.location}</span>}
					</div>
					{project.links && (
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
							{project.links.map(link => (
								<a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="chip" style={{ background: "var(--lav)", color: "var(--lav-ink)" }}>
									{link.label} &#8599;
								</a>
							))}
						</div>
					)}
				</Reveal>
			</div>

			<div className="article">
				<Reveal className="article-section">
					<h2>Overview</h2>
					{project.overview.split("\n\n").map((para, i) => (
						<p key={i}>{para}</p>
					))}
				</Reveal>

				{slug === "lease-intelligence" && (
					<Reveal className="article-section">
						<h2>Sandbox demo</h2>
						<p>
							The actual app, running entirely in your browser on a fabricated three-lease dataset — every
							tenant, address, and figure is invented. Ask a question and get a cited answer, or open the
							dashboard and click into a lease for its full abstract.
						</p>
						<div className="demo-breakout">
							<iframe
								src="/lease-intelligence-demo/index.html"
								title="Lease Intelligence sandbox demo"
								className="demo-embed"
								loading="lazy"
							/>
							<div className="demo-embed-foot">
								<span>sandbox demo &middot; dummy data &middot; no backend</span>
								<a href="/lease-intelligence-demo/index.html" target="_blank" rel="noopener noreferrer" className="link-underline">
									Open full screen &#8599;
								</a>
							</div>
						</div>
					</Reveal>
				)}

				<Reveal className="article-section">
					<h2>The problem</h2>
					<p>{project.problem}</p>
				</Reveal>

				<Reveal className="article-section">
					<h2>Approach</h2>
					<ul className="article-list">
						{project.approach.map(a => (
							<li key={a}>{a}</li>
						))}
					</ul>
				</Reveal>

				<Reveal className="article-section">
					<h2>Outcomes</h2>
					<ul className="article-list">
						{project.outcomes.map(o => (
							<li key={o}>{o}</li>
						))}
					</ul>
				</Reveal>

				{project.images && (
					<Reveal className="article-section" style={{ borderTop: "none", paddingTop: 8 }}>
						{project.images.map(src => (
							<div key={src} style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "var(--dark-2)" }}>
								<Image src={src} alt={project.title} fill style={{ objectFit: "cover" }} />
							</div>
						))}
					</Reveal>
				)}

				{project.awards && (
					<Reveal className="article-section">
						<h2>Recognition</h2>
						<p>{project.awards}</p>
					</Reveal>
				)}

				{project.tech && (
					<Reveal className="article-section">
						<h2>Stack &amp; tools</h2>
						<p>{project.tech}</p>
					</Reveal>
				)}
			</div>

			<TransitionLink href={`/projects/${next.slug}`} label={next.title} className="next-link">
				<span className="label" style={{ display: "block", marginBottom: 12 }}>
					Next project
				</span>
				<span className="next-link-title">{next.title} &#8599;</span>
			</TransitionLink>
		</main>
	)
}
