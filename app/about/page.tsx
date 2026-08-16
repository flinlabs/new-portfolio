import type { Metadata } from "next"
import Reveal from "@/components/motion/Reveal"

export const metadata: Metadata = { title: "About" }

const skills: Record<string, string[]> = {
	"Languages & Frameworks": ["Python", "Java", "SQL / MySQL", "VBA", "React", "TypeScript", "Tailwind CSS", "Next.js"],
	"AI & ML": ["RAG / Retrieval Augmented Generation", "Microsoft Azure", "Azure AI Foundry", "Semantic Kernel", "SharePoint / SPFx", "Ollama", "Llama", "LangChain", "AnythingLLM", "AWS Bedrock", "ChromaDB", "Docker"],
	"Tools & Platforms": ["Git / GitHub", "Excel", "SolidWorks", "Glide", "Airtable"],
	"Domain": ["Commercial real estate", "Venture capital", "AI product development", "Financial modeling", "Market research", "Due diligence", "Prompt engineering"],
}

const coursework = ["Data Structures & Algorithms (CS 61B)", "Data Analysis & Modeling", "Linear Algebra", "Probability & Statistics"]

export default function About() {
	return (
		<main className="container">
			<div className="page-head">
				<Reveal as="h1" lines className="display-xl">
					About
				</Reveal>
			</div>

			<div className="about-grid">
				<div>
					<Reveal as="p" lines className="about-lede">
						My projects range from marine robots that go into the actual ocean, to AI tools that real
						recruiting teams use, to a conservation nonprofit I started from scratch. What ties them
						together is that I genuinely needed each one to exist.
					</Reveal>
					<Reveal delay={0.1}>
						<div className="about-body">
							<p>
								I&rsquo;m studying Economics and Data Science at UC Berkeley. The coursework builds the
								quantitative foundation, but most of what I&rsquo;ve learned came from trying to build
								real things and figuring out what I got wrong.
							</p>
							<p>
								I love connecting people and ideas. My best work happens when there&rsquo;s a
								spreadsheet and a real conversation in the same room.
							</p>
							<p>
								On AI: I use it to move faster and go deeper. It handles the repetitive work so I can
								focus on what actually needs a person. I&rsquo;m not interested in replacing judgment or
								real conversation.
							</p>
						</div>
					</Reveal>
				</div>

				<div>
					<Reveal>
						<div className="exp-snapshot about-snapshot">
							<span className="snap-tape snap-tape-l" />
							<span className="snap-tape snap-tape-r" />
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img src="/faye-portrait.jpg" alt="Faye Lin" />
						</div>
					</Reveal>
					<Reveal className="article-section" style={{ paddingTop: 0, borderTop: "none" }}>
						<h2>Education</h2>
						<p>UC Berkeley</p>
						<p className="muted" style={{ fontSize: 14, marginTop: 4 }}>
							BA Data Science &middot; BA Economics &middot; Expected May 2028
						</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
							{coursework.map(c => (
								<span key={c} className="chip">
									{c}
								</span>
							))}
						</div>
					</Reveal>

					{Object.entries(skills).map(([category, items]) => (
						<Reveal key={category} className="article-section">
							<h2 style={{ fontSize: 20 }}>{category}</h2>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
								{items.map(skill => (
									<span key={skill} className="chip">
										{skill}
									</span>
								))}
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</main>
	)
}
