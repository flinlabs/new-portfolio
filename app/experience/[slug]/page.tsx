import { experiences } from "@/data/experiences"
import { notFound } from "next/navigation"
import TagChips from "@/components/TagChips"
import Reveal from "@/components/motion/Reveal"
import { TransitionLink } from "@/components/motion/PageTransition"

export function generateStaticParams() {
	return experiences.map(e => ({ slug: e.slug }))
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const index = experiences.findIndex(e => e.slug === slug)
	if (index === -1) notFound()
	const exp = experiences[index]
	const next = experiences[(index + 1) % experiences.length]

	return (
		<main className="container" style={{ position: "relative" }}>
			<div className="exp-snapshot" aria-hidden="true">
				<span className="snap-tape snap-tape-l" />
				<span className="snap-tape snap-tape-r" />
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={`/${exp.slug}-photo.jpg`} alt="" />
			</div>
			<div className="page-head" style={{ maxWidth: 900 }}>
				<Reveal>
					<TransitionLink href="/experience" label="Experience" className="back-link">
						<span aria-hidden="true">&larr;</span> Back to experiences
					</TransitionLink>
				</Reveal>
				<Reveal delay={0.05}>
					<TagChips tag={exp.tag} />
				</Reveal>
				<Reveal as="h1" lines className="display-lg" delay={0.1} style={{ marginTop: 24 }}>
					{exp.company}
				</Reveal>
				<Reveal delay={0.2}>
					<p style={{ fontSize: "clamp(17px, 1.8vw, 21px)", fontWeight: 520, marginTop: 16, color: "var(--ink-soft)" }}>
						{exp.title}
					</p>
				</Reveal>
				<Reveal delay={0.28}>
					<div className="page-head-meta">
						<span>{exp.period}</span>
					</div>
					{(exp.website || exp.related) && (
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
							{exp.related && (
								<TransitionLink href={exp.related.href} label={exp.related.label} className="chip" style={{ background: "var(--mint)", color: "var(--mint-ink)" }}>
									Project: {exp.related.label} &#8599;
								</TransitionLink>
							)}
							{exp.website && (
								<a href={exp.website} target="_blank" rel="noopener noreferrer" className="chip" style={{ background: "var(--lav)", color: "var(--lav-ink)" }}>
									{exp.websiteLabel} &#8599;
								</a>
							)}
						</div>
					)}
				</Reveal>
			</div>

			<div className="article">
				<Reveal className="article-section">
					<h2>Overview</h2>
					<p>{exp.overview}</p>
				</Reveal>

				<Reveal className="article-section">
					<h2>What I did</h2>
					<ul className="article-list">
						{exp.responsibilities.map(r => (
							<li key={r}>{r}</li>
						))}
					</ul>
				</Reveal>

				<Reveal className="article-section">
					<h2>Highlights</h2>
					<ul className="article-list">
						{exp.achievements.map(a => (
							<li key={a}>{a}</li>
						))}
					</ul>
				</Reveal>

				{exp.challenges && exp.challenges.length > 0 && (
					<Reveal className="article-section">
						<h2>What was hard</h2>
						<ul className="article-list">
							{exp.challenges.map(c => (
								<li key={c}>{c}</li>
							))}
						</ul>
					</Reveal>
				)}

				{exp.skills && exp.skills.length > 0 && (
					<Reveal className="article-section">
						<h2>Skills</h2>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
							{exp.skills.map(s => (
								<span key={s} className="chip">
									{s}
								</span>
							))}
						</div>
					</Reveal>
				)}
			</div>

			<TransitionLink href={`/experience/${next.slug}`} label={next.company} className="next-link">
				<span className="label" style={{ display: "block", marginBottom: 12 }}>
					Next role
				</span>
				<span className="next-link-title">{next.company} &#8599;</span>
			</TransitionLink>
		</main>
	)
}
