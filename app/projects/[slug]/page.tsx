import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function ProjectPage({ params }: { params: { slug: string } }) {
	const project = projects.find(p => p.slug === params.slug)
	if (!project) notFound()

	return (
		<main style={{ maxWidth: "760px", margin: "0 auto", padding: "144px 48px 120px" }}>

			<p style={{
				fontSize: "11px",
				fontWeight: 500,
				letterSpacing: "0.14em",
				textTransform: "uppercase",
				color: "var(--text-muted)",
				marginBottom: "12px",
			}}>
				{project.tag}
			</p>

			<h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "52px",
				fontWeight: 600,
				lineHeight: 1.1,
				marginBottom: "8px",
			}}>
				{project.title}
			</h1>

			<p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "4px" }}>{project.subtitle}</p>
			<p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "48px" }}>{project.period}</p>

			{project.links && (
				<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "48px" }}>
					{project.links.map(link => (
						<a
							key={link.label}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								fontSize: "13px",
								color: "var(--lavender)",
								border: "1px solid var(--border)",
								borderRadius: "100px",
								padding: "6px 16px",
								textDecoration: "none",
							}}
						>
							{link.label} ↗
						</a>
					))}
				</div>
			)}

			<div style={{ height: "1px", background: "var(--border)", marginBottom: "48px" }} />

			<div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Overview</p>
					{project.overview.split("\n\n").map((para, i) => (
						<p key={i} style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--text)", marginBottom: "16px" }}>{para}</p>
					))}
				</div>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>The Problem</p>
					<p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--text)" }}>{project.problem}</p>
				</div>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Approach</p>
					<ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
						{project.approach.map((a) => (
							<li key={a} style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text)", paddingLeft: "16px", borderLeft: "2px solid var(--border)" }}>
								{a}
							</li>
						))}
					</ul>
				</div>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Outcomes</p>
					<ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", padding: 0 }}>
						{project.outcomes.map((o) => (
							<li key={o} style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text)", paddingLeft: "16px", borderLeft: "2px solid var(--lavender)" }}>
								{o}
							</li>
						))}
					</ul>
				</div>

				{project.images && (
					<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
						{project.images.map((src) => (
							<div key={src} style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden" }}>
								<Image src={src} alt={project.title} fill style={{ objectFit: "cover" }} />
							</div>
						))}
					</div>
				)}

				{project.awards && (
					<div>
						<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Recognition</p>
						<p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--text)" }}>{project.awards}</p>
					</div>
				)}

				{project.tech && (
					<div>
						<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Stack & Tools</p>
						<p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--text)" }}>{project.tech}</p>
					</div>
				)}

			</div>

			<div style={{ marginTop: "64px" }}>
				<Link href="/projects" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}>
					← Back to Projects
				</Link>
			</div>

		</main>
	)
}