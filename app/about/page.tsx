export default function About() {
	return (
		<main style={{ maxWidth: "900px", margin: "0 auto", padding: "144px 48px 120px" }}>
            <h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "48px",
			}}>
				Hi, I&apos;m Faye.
			</h1>
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
            <div style={{
				background: "var(--bg-card)",
				border: "1px solid var(--border)",
				borderRadius: "20px",
				padding: "24px",
			}}>
				<p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--lavender)", marginBottom: "12px" }}>
					On AI
				</p>
				<p style={{ fontSize: "15px", lineHeight: 1.75, color: "var(--text)" }}>
					I use AI to move faster and go deeper. It handles the repetitive work so I can
					focus on what actually needs a person. I am not interested in replacing judgment
					or real conversation.
				</p>
			</div>
		</main>
	)
}