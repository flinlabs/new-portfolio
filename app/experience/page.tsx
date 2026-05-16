const experiences = [
	{
		title: "Product & Engineering Intern",
		company: "Berkeley SkyDeck Funded Startup",
		period: "Jan 2025 – Present",
		summary: "Building commercial real estate transaction tools, defining product requirements and working with the engineering team to ship them.",
	},
	{
		title: "Talent Acquisition & Data Insights Intern",
		company: "CGP Group",
		period: "Jun – Aug 2025",
		summary: "Led candidate sourcing across Southeast Asia and built CANDI, an AI-powered recruiting platform that cut screening time by up to 50%.",
	},
	{
		title: "Real Estate Acquisition & Portfolio Management Intern",
		company: "Link Multifamily",
		period: "Summer 2024",
		summary: "Underwrote multifamily acquisitions and audited a $100M+ portfolio; the analyses fed directly into go/no-go investment decisions.",
	},
	{
		title: "NextGen Venture Strategy & Angel Investor Intern",
		company: "Loeb.nyc",
		period: "Dec 2024",
		summary: "Evaluated seven early-stage startups through structured due diligence and made two personal angel investments of $5,000 each.",
	},
	{
		title: "Underwater Robotics, CAD & Dive Coordination Intern",
		company: "DOER Marine",
		period: "Jun 2022 – Aug 2023",
		summary: "Contributed to the SWAD Lanternfish submersible and helped ready equipment for Dr. Sylvia Earle's Mission Blue Galapagos expedition.",
	},
	{
		title: "Founder & Executive Director",
		company: "AquaMeridian US",
		period: "Jun 2022 – Present",
		summary: "Founded the U.S. chapter of an international marine conservation nonprofit. We raised $8,500+, ran 10 beach cleanups with 150+ volunteers, and logged 2,000 lbs of debris data.",
	},
]

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
					<div key={exp.title} style={{
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