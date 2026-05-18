import FadeIn from "@/components/FadeIn"
import TiltCard from "@/components/TiltCard"
import Link from "next/link"

const featured = [
	{ type: "projects",   slug: "candi",       tag: "AI · Product",  title: "CANDI",        sub: "AI Recruiting Platform",           period: "Jun – Aug 2025" },
	{ type: "projects",   slug: "walsea",       tag: "Engineering",   title: "WAL-SEA",      sub: "Homebuilt ROV",                    period: "2021 – 2024" },
	{ type: "experience", slug: "cgp",          tag: "AI · Product",  title: "CGP Group",    sub: "Talent Acquisition & Data Intern", period: "Jun – Aug 2025" },
	{ type: "experience", slug: "aquameridian", tag: "Nonprofit",     title: "AquaMeridian", sub: "Founder & Executive Director",     period: "2022 – Present" },
]

export default function Home() {
	return (
		<main style={{ maxWidth: "900px", margin: "0 auto", padding: "144px 48px 120px" }}>

			<FadeIn delay={0}>
				<p style={{
					fontSize: "12px",
					fontWeight: 500,
					textTransform: "uppercase",
					letterSpacing: "0.1em",
					color: "var(--green)",
					marginBottom: "32px",
				}}>
					● Available for Work
				</p>
			</FadeIn>

			<FadeIn delay={0.08}>
				<h1 style={{
    				fontFamily: "var(--font-cormorant)",
    				fontSize: "96px",
    				fontWeight: 600,
    				lineHeight: 1,
    				marginBottom: "24px",
    				color: "var(--text)",
				}}>
    				Faye{" "}
    				<em style={{
        				fontStyle: "italic",
        				background: "linear-gradient(135deg,#9B87D4,#D4A0C0,#87B8D4)",
        				WebkitBackgroundClip: "text",
       					WebkitTextFillColor: "transparent",
    				}}>Lin</em>
				</h1>
			</FadeIn>
			<FadeIn delay={0.14}>
				<p style={{
					maxWidth: "520px",
					fontSize: "17px",
					lineHeight: 1.7,
					color: "var(--text)",
					marginBottom: "40px",
					opacity: 0.75,
				}}>
					Builder, researcher, and connector of dots. I work across technical and human
					problems, from AI tools to marine robots to ocean conservation.
					Class of &apos;28 studying Economics &amp; Data Science at UC Berkeley.
				</p>
			</FadeIn>

			<FadeIn delay={0.2}>
				<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "72px" }}>
					<a
						href="https://www.linkedin.com/in/fayelin-aqua"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							display: "inline-flex",
							alignItems: "center",
							borderRadius: "100px",
							padding: "13px 28px",
							fontSize: "14px",
							fontWeight: 500,
							color: "#fff",
							textDecoration: "none",
							background: "linear-gradient(135deg,#8B6FD4,#D4609C)",
						}}
					>
						LinkedIn →
					</a>
					<a
						href="/FayeLin_Resume.pdf"
						download
						style={{
							display: "inline-flex",
							alignItems: "center",
							borderRadius: "100px",
							padding: "13px 28px",
							fontSize: "14px",
							fontWeight: 500,
							color: "var(--text)",
							textDecoration: "none",
							border: "1px solid rgba(14,12,26,0.2)",
							background: "rgba(255,255,255,0.5)",
						}}
					>
						Download Resume ↓
					</a>
				</div>
			</FadeIn>

			<div style={{ height: "1px", background: "linear-gradient(90deg,transparent,var(--lavender),transparent)", opacity: 0.4, marginBottom: "48px" }} />

			<FadeIn>
				<p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "24px" }}>
					Featured work
				</p>
			</FadeIn>

			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
				{featured.map(({ type, slug, tag, title, sub, period }, i) => (
					<FadeIn key={slug} delay={i * 0.07}>
						<TiltCard>
							<Link href={`/${type}/${slug}`} style={{
								background: "rgba(255,255,255,0.88)",
								backdropFilter: "blur(20px)",
								border: "1px solid rgba(155,135,212,0.3)",
								borderRadius: "20px",
								padding: "32px",
								display: "block",
								textDecoration: "none",
								color: "inherit",
								boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
							}}>
								<p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--lavender)", marginBottom: "10px" }}>{tag}</p>
								<h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "24px", fontWeight: 600, marginBottom: "6px" }}>{title}</h3>
								<p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "16px" }}>{sub}</p>
								<p style={{ fontSize: "11px", color: "var(--text-muted)", opacity: 0.65 }}>{period}</p>
							</Link>
						</TiltCard>
					</FadeIn>
				))}
			</div>

		</main>
	)
}