import { experiences } from "@/data/experiences"

export default function Experience() {
	return (
		<main style={{ maxWidth: "960px", margin: "0 auto", padding: "144px 48px 120px" }}>

			<p style={{
				fontSize: "11px",
				fontWeight: 500,
				letterSpacing: "0.14em",
				textTransform: "uppercase",
				color: "var(--text-muted)",
				marginBottom: "12px",
			}}>
				Experience
			</p>

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
					<div key={exp.slug} style={{
						background: "var(--bg-card)",
						border: "1px solid var(--border)",
						borderRadius: "20px",
						padding: "28px 32px",
					}}>
						<p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>{exp.period}</p>
						<h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{exp.title}</h2>
						<p style={{ fontSize: "14px", color: "var(--lavender)", marginBottom: "12px" }}>{exp.company}</p>
						<p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}>{exp.summary}</p>
					</div>
				))}
			</div>

		</main>
	)
}