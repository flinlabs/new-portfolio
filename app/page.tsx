import Image from "next/image";

export default function Home() {
	return (
		<main>
			<p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#4A4460", marginBottom: "16px" }}>
				Available for Work
			</p>
			<h1 style={{ fontSize: "72px", fontWeight: 600, lineHeight: 1, marginBottom: "24px" }}>
				Faye Lin.
			</h1>
			<p style={{ maxWidth: "520px", fontSize: "17px", lineHeight: 1.7, marginBottom: "40px" }}>
				Builder, researcher, and connector of dots. I work across technical and human
				problems, from AI tools to marine robots to ocean conservation.
				Class of &apos;28 studying Economics &amp; Data Science at UC Berkeley.
			</p>
			<div style={{ display: "flex", gap: "12px", marginBottom: "72px" }}>
				<a href="https://www.linkedin.com/in/fayelin-aqua" target="_blank" rel="noopener noreferrer"
					style={{ padding: "12px 28px", background: "#0E0C1A", color: "#fff", borderRadius: "100px", fontSize: "14px" }}>
					LinkedIn →
				</a>
				<a href="/FayeLin_Resume.pdf" download
					style={{ padding: "12px 28px", border: "1px solid #ccc", borderRadius: "100px", fontSize: "14px" }}>
					Download Resume ↓
				</a>
			</div>
		</main>
	)
}