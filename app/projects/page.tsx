const projects = [
	{
		title: "CANDI",
		subtitle: "Candidate Analysis & Discovery Intelligence",
		period: "Jun – Aug 2025",
		tag: "AI · Product · Engineering",
		summary: "An AI-powered recruiting toolkit: a low-code recruiter workspace built at CGP Group, plus a Chrome extension that scores any LinkedIn profile against a job description in real time.",
	},
	{
		title: "WAL-SEA",
		subtitle: "A Homebuilt, Multifunctional ROV for Near-Shore Ecosystems",
		period: "2021 – 2024",
		tag: "Engineering · Environmental · Science",
		summary: "A multifunctional underwater robot I designed, built, and field-tested over three years to combat kelp forest collapse. 4x faster than diver surveys. ISEF finalist, published in IEEE Xplore.",
	},
	{
		title: "In Situ Urchin Behavior Study",
		subtitle: "Self-Built Underwater Camera System for Continuous Monitoring",
		period: "2018 – 2019",
		tag: "Science · Environmental · Engineering",
		summary: "Built a low-cost underwater camera rig as a middle schooler and ran 48-hour observation sessions to study purple urchin behavior. ACSEF first place, Broadcom MASTERS Top 300.",
	},
]

export default function Projects() {
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
				Projects
			</p>

			<h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "64px",
			}}>
				My Projects.
			</h1>

			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{projects.map((project) => (
					<div key={project.title} style={{
						background: "var(--bg-card)",
						border: "1px solid var(--border)",
						borderRadius: "20px",
						padding: "28px 32px",
					}}>
						<p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>{project.period}</p>
						<h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text)", marginBottom: "4px" }}>{project.title}</h2>
						<p style={{ fontSize: "14px", color: "var(--lavender)", marginBottom: "12px" }}>{project.subtitle}</p>
						<p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}>{project.summary}</p>
					</div>
				))}
			</div>
		</main>
	)
}