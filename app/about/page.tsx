const skills: Record<string, string[]> = {
	"Analysis": ["Financial modeling", "Data visualization", "Market research", "Due diligence", "Process optimization"],
	"Technical": ["Python", "SQL", "Excel", "SolidWorks", "Glide", "Airtable", "Canva"],
	"Domain": ["Venture capital", "Program management", "Environmental education", "Operations"],
}

const coursework = ["Data Analysis", "Data Visualization", "Financial Modeling", "Microeconomics", "Macroeconomics"]

const chip: React.CSSProperties = {
	fontSize: "12px",
	padding: "4px 12px",
	borderRadius: "100px",
	background: "rgba(155,135,212,0.08)",
	border: "1px solid rgba(155,135,212,0.2)",
	color: "var(--text-muted)",
}

const card: React.CSSProperties = {
	background: "var(--bg-card)",
	backdropFilter: "blur(16px)",
	border: "1px solid var(--border)",
	borderRadius: "20px",
	padding: "24px",
	boxShadow: "0 2px 20px rgba(155,135,212,0.06)",
}

export default function About() {
	return (
		<main style={{ maxWidth: "1000px", margin: "0 auto", padding: "144px 48px 120px" }}>

			<h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "48px",
			}}>
				Hi, I&apos;m <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#9B87D4,#D4A0C0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Faye.</em>
			</h1>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "48px", alignItems: "start" }}>

				{/* Left — bio + On AI */}
				<div>
					<div style={{ display: "flex", flexDirection: "column", gap: "18px", fontSize: "16px", lineHeight: 1.8, color: "var(--text)", marginBottom: "36px" }}>
						<p>
							My projects range from engineering marine robots that go into the actual ocean,
							to building AI tools that real recruiting teams use, to running a conservation
							nonprofit I started from scratch. What ties them together is that I genuinely
							needed each one to exist.
						</p>
						<p>
							I&apos;m studying Economics and Data Science at UC Berkeley. The coursework builds
							the quantitative foundation, but most of what I&apos;ve learned came from trying
							to build real things and figuring out what I got wrong.
						</p>
						<p>
							I love connecting people and ideas. My best work tends to happen when there&apos;s
							a spreadsheet and a real conversation happening in the same room.
						</p>
					</div>

					<div style={card}>
						<p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--lavender)", marginBottom: "12px" }}>On AI</p>
						<p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--text)" }}>
							I use AI to move faster and go deeper. It handles the repetitive work so I can
							focus on what actually needs a person. I am not interested in replacing judgment
							or real conversation.
						</p>
					</div>
				</div>

				{/* Right — Education + Skills */}
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

					<div style={card}>
						<p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>Education</p>
						<p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>UC Berkeley</p>
						<p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.5 }}>
							BA Business Economics · BA Data Science · Expected May 2028
						</p>
						<p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "10px", opacity: 0.7 }}>Relevant Coursework</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
							{coursework.map(c => <span key={c} style={chip}>{c}</span>)}
						</div>
					</div>

					<div style={card}>
						<p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", marginBottom: "16px" }}>Skills</p>
						<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
							{Object.entries(skills).map(([category, items]) => (
								<div key={category}>
									<p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", opacity: 0.7 }}>{category}</p>
									<div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
										{items.map(skill => <span key={skill} style={chip}>{skill}</span>)}
									</div>
								</div>
							))}
						</div>
					</div>

				</div>
			</div>

		</main>
	)
}