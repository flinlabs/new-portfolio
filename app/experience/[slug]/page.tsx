import { experiences } from "@/data/experiences"
import { notFound } from "next/navigation"
import Link from "next/link"
import TagChips from "@/components/TagChips"

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const exp = experiences.find(e => e.slug === slug)
	if (!exp) notFound()

	const chip: React.CSSProperties = {
		fontSize: "12px",
		padding: "4px 12px",
		borderRadius: "100px",
		background: "rgba(155,135,212,0.08)",
		border: "1px solid rgba(155,135,212,0.2)",
		color: "var(--text-muted)",
	}

	return (
		<main className="mobile-pad" style={{ maxWidth: "760px", margin: "0 auto", padding: "144px 48px 120px" }}>

			<TagChips tag={exp.tag} />

			<h1 className="mobile-h1" style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "52px",
				fontWeight: 600,
				lineHeight: 1.1,
				marginBottom: "8px",
			}}>
				{exp.title}
			</h1>

			<p style={{ fontSize: "18px", color: "var(--lavender)", marginBottom: "4px" }}>{exp.company}</p>
			<p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "48px" }}>{exp.period}</p>

			{exp.website && (
				<a
					href={exp.website}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "6px",
						fontSize: "13px",
						color: "var(--lavender)",
						border: "1px solid var(--border)",
						borderRadius: "100px",
						padding: "6px 16px",
						marginBottom: "48px",
						textDecoration: "none",
					}}
				>
					{exp.websiteLabel} ↗
				</a>
			)}

			<div style={{ height: "1px", background: "var(--border)", marginBottom: "48px" }} />

			<div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Overview</p>
					<p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--text)" }}>{exp.overview}</p>
				</div>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Responsibilities</p>
					<ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "0", listStyle: "none" }}>
						{exp.responsibilities.map((r) => (
							<li key={r} style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text)", paddingLeft: "16px", borderLeft: "2px solid var(--border)" }}>
								{r}
							</li>
						))}
					</ul>
				</div>

				<div>
					<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Achievements</p>
					<ul style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "0", listStyle: "none" }}>
						{exp.achievements.map((a) => (
							<li key={a} style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text)", paddingLeft: "16px", borderLeft: "2px solid var(--lavender)" }}>
								{a}
							</li>
						))}
					</ul>
				</div>

				{exp.skills && exp.skills.length > 0 && (
					<div>
						<p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Skills</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
							{exp.skills.map((s) => (
								<span key={s} style={chip}>{s}</span>
							))}
						</div>
					</div>
				)}

			</div>

			<div style={{ marginTop: "64px" }}>
				<Link href="/experience" style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}>
					← Back to Experience
				</Link>
			</div>

		</main>
	)
}