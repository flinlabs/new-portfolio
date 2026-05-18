import Link from "next/link"
import Image from "next/image"
import { projects } from "@/data/projects"
import TagChips from "@/components/TagChips"

export default function Projects() {
	return (
		<main style={{ maxWidth: "960px", margin: "0 auto", padding: "144px 48px 120px" }}>
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
					<Link key={project.slug} href={`/projects/${project.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
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

							{(project.thumbnail ?? project.images?.[0]) && (
								<div style={{ position: "relative", width: "160px", height: "160px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
									<Image
										src={project.thumbnail ?? project.images![0]}
										alt={project.title}
										fill
										style={{ objectFit: "cover" }}
									/>
								</div>
							)}

							<div style={{ flex: 1 }}>
								<TagChips tag={project.tag} />
								<h2 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>{project.title}</h2>
								<p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "10px" }}>{project.subtitle}</p>
								<p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}>{project.summary}</p>
							</div>

							<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
								<p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{project.period}</p>
								<span style={{ fontSize: "18px", color: "var(--text-muted)", opacity: 0.4 }}>→</span>
							</div>

						</div>
					</Link>
				))}
			</div>

		</main>
	)
}