import Link from "next/link"
import Image from "next/image"
import { experiences } from "@/data/experiences"
import TagChips from "@/components/TagChips"

export default function Experience() {
	return (
		<main className="mobile-pad" style={{ maxWidth: "960px", margin: "0 auto", padding: "144px 48px 120px" }}>
			<h1 className="mobile-h1" style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "64px",
			}}>
				My <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#9B87D4,#D4A0C0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Experience</em>
			</h1>

			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{experiences.map((exp) => (
					<Link key={exp.slug} href={`/experience/${exp.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
						<div className="mobile-stack" style={{
							background: "var(--bg-card)",
							border: "1px solid var(--border)",
							borderRadius: "20px",
							padding: "28px 32px",
							display: "flex",
							alignItems: "center",
							gap: "32px",
							transition: "box-shadow 0.2s ease",
						}}>

							<div className="mobile-hide" style={{ minWidth: "110px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
								<p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{exp.period}</p>
								{exp.logo && (
									<div style={{
										width: "72px",
										height: "72px",
										borderRadius: "16px",
										overflow: "hidden",
										background: "rgba(255,255,255,0.8)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}>
										<Image src={exp.logo} alt={exp.company} width={72} height={72} style={{ objectFit: "contain", padding: "8px" }} />
									</div>
								)}
							</div>

							<div style={{ flex: 1 }}>
								<TagChips tag={exp.tag} />
								<h2 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>{exp.title}</h2>
								<p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "10px" }}>{exp.company}</p>
								<p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px" }}>{exp.period}</p>
								<p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}>{exp.summary}</p>
							</div>

							<div className="mobile-hide" style={{ fontSize: "18px", color: "var(--text-muted)", opacity: 0.4, flexShrink: 0 }}>→</div>

						</div>
					</Link>
				))}
			</div>

		</main>
	)
}