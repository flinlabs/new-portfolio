import { experiences } from "@/data/experiences"
import Reveal from "@/components/motion/Reveal"
import ExperienceIndex from "@/components/home/ExperienceIndex"
import ProjectsDesk from "@/components/home/ProjectsDesk"
import RotatingLines from "@/components/home/RotatingLines"
import { TransitionLink } from "@/components/motion/PageTransition"

const descriptors = [
	"teaching 880 leases to answer questions",
	"building CompLens: address in, comps out",
	"studying econ + data science at Berkeley",
	"interning at the Empire State Building",
	"running a 300-member ocean nonprofit",
	"designing my own narrative puzzle videogame",
]

const expItems = experiences.map(({ slug, title, company, period, tag }) => ({ slug, title, company, period, tag }))

export default function Home() {
	return (
		<main>
			{/* Hero */}
			<section className="hero container">
				<div>
					<Reveal as="h1" lines className="display-xl">
						Faye Lin
					</Reveal>
					<Reveal delay={0.12}>
						<p className="rotator-row">
							<span className="rotator-prefix">currently:</span> <RotatingLines lines={descriptors} />
						</p>
					</Reveal>
					<Reveal delay={0.18}>
						<p className="body-lg" style={{ marginTop: 32, maxWidth: "52ch" }}>
							I&rsquo;m a sophomore at Berkeley studying economics and data science. Before that I spent
							three years building underwater robots in Monterey Bay. Right now I&rsquo;m writing AI tools
							for a real estate company in New York.
						</p>
						<p className="muted" style={{ marginTop: 16, fontSize: 15.5 }}>
							Everything I&rsquo;ve built is below, most recent first.
						</p>
					</Reveal>
				</div>

				<Reveal delay={0.3} className="hero-facts">
					<div className="hero-fact">
						<p className="label">Located</p>
						<p>Berkeley, California</p>
					</div>
					<div className="hero-fact">
						<p className="label">Studying</p>
						<p>
							BA Economics, BA Data Science
							<br />
							Expected May 2028
						</p>
					</div>
					<div className="hero-fact">
						<p className="label">Currently</p>
						<p>
							AI Tools Intern
							<br />
							Empire State Realty Trust
						</p>
					</div>
					<div className="hero-fact">
						<p className="label">Find me</p>
						<div className="hero-fact-links">
							<a href="https://www.linkedin.com/in/fayelin-aqua" target="_blank" rel="noopener noreferrer" className="link-underline">
								LinkedIn &#8599;
							</a>
							<a href="https://github.com/flinlabs" target="_blank" rel="noopener noreferrer" className="link-underline">
								GitHub &#8599;
							</a>
							<a href="/FayeLin_Resume.pdf" download className="link-underline">
								Resume &#8595;
							</a>
						</div>
					</div>
				</Reveal>
			</section>

			{/* Experience — first, most recent first */}
			<section className="section container" id="experience" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
					<Reveal>
						<p className="label">Experience &mdash; most recent first</p>
					</Reveal>
					<Reveal delay={0.1}>
						<span className="label">2022 &rarr; 2026</span>
					</Reveal>
				</div>
				<Reveal delay={0.05}>
					<ExperienceIndex items={expItems} />
				</Reveal>
			</section>

			{/* Projects — the desk */}
			<section className="section container" id="projects">
				<div style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
					<Reveal>
						<p className="label" style={{ marginBottom: 16 }}>
							Projects &mdash; on the desk
						</p>
					</Reveal>
					<Reveal as="h2" lines className="display-lg">
						Pick anything up
					</Reveal>
				</div>
				<ProjectsDesk />
			</section>

			{/* Pull quote */}
			<section className="section container">
				<Reveal as="p" lines className="display-md pull-quote">
					My best work happens when there&rsquo;s a spreadsheet and a real conversation in the same room.
				</Reveal>
				<Reveal delay={0.15}>
					<TransitionLink href="/about" label="About" className="link-underline" style={{ fontSize: 15, marginTop: 28, display: "inline-block" }}>
						More about me
					</TransitionLink>
				</Reveal>
			</section>
		</main>
	)
}
