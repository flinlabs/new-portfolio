import Link from "next/link"
import { experiences } from "@/data/experiences"
import TagChips from "@/components/TagChips"

export default function Experience() {
	return (
		<main style={{ maxWidth: "960px", margin: "0 auto", padding: "144px 48px 120px" }}>
			<h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "64px",
			}}>
				My Experience.
			</h1>

			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{experiences.map((exp) => (
					<Link key={exp.slug} href={`/experience/${exp.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
						<div style={{
							background: "var(--bg-card)",
							border: "1px solid var(--border)",
							borderRadius: "20px",
							padding: "28px 32px",
							display: "flex",
							alignItems: "center",
							gap: "32px",
							transition: "box-shadow 0.2s ease",
						}}>
							<div style={{ minWidth: "110px", textAlign: "right" }}>
								<p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{exp.period}</p>
							</div>

							<div style={{ flex: 1 }}>
								<TagChips tag={exp.tag} />
								<h2 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>{exp.title}</h2>
								<p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "10px" }}>{exp.company}</p>
								<p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}>{exp.summary}</p>
							</div>

							<div style={{ fontSize: "18px", color: "var(--text-muted)", opacity: 0.4, flexShrink: 0 }}>→</div>
						</div>
					</Link>
				))}
			</div>

		</main>
	)
}