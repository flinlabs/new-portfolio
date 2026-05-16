import Image from "next/image";
import FadeIn from "@/components/FadeIn"

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
					Faye Lin.
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
		</main>
	)
}