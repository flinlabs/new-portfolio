import { projects } from "@/data/projects"
import { experiences } from "@/data/experiences"
import Reveal from "@/components/motion/Reveal"
import HeroVisual from "@/components/three/HeroVisual"
import WorkList from "@/components/home/WorkList"
import { TransitionLink } from "@/components/motion/PageTransition"
import Magnetic from "@/components/motion/Magnetic"

const workItems = projects.map(p => ({
	slug: p.slug,
	title: p.title,
	tag: p.tag,
	period: p.period,
	image: p.images?.[0],
	logo: p.thumbnail,
}))

export default function Home() {
	return (
		<main>
			{/* Hero */}
			<section className="hero container">
				<div className="hero-copy">
					<Reveal delay={0.05}>
						<p className="label" style={{ marginBottom: 28 }}>
							AI Tools Intern at Empire State Realty Trust
						</p>
					</Reveal>
					<Reveal as="h1" lines className="display-xl" delay={0.12}>
						AI products, built <em>end to end.</em>
					</Reveal>
					<Reveal delay={0.3}>
						<p className="body-lg muted" style={{ marginTop: 28, maxWidth: "44ch" }}>
							I&rsquo;m Faye Lin: Economics &amp; Data Science at UC Berkeley, shipping AI tools inside
							real companies, from lease intelligence to voice agents.
						</p>
					</Reveal>
					<Reveal delay={0.42}>
						<div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
							<Magnetic>
								<TransitionLink href="/projects" label="Work" className="btn btn-dark">
									View work
								</TransitionLink>
							</Magnetic>
							<Magnetic>
								<a href="/FayeLin_Resume.pdf" download className="btn btn-ghost">
									Resume &#8595;
								</a>
							</Magnetic>
						</div>
					</Reveal>
				</div>
				<HeroVisual className="hero-visual-panel" />
			</section>

			{/* Selected work */}
			<section className="section container" id="work">
				<div className="section-head">
					<Reveal as="h2" lines className="display-lg">
						Selected <em>work</em>
					</Reveal>
				</div>
				<Reveal delay={0.1}>
					<WorkList items={workItems} />
				</Reveal>
			</section>

			{/* Experience */}
			<section className="section-dark">
				<div className="section container">
					<Reveal as="h2" lines className="display-lg" style={{ marginBottom: "clamp(40px, 5vw, 72px)" }}>
						Experience
					</Reveal>
					<div>
						{experiences.map(exp => (
							<Reveal key={exp.slug}>
								<TransitionLink href={`/experience/${exp.slug}`} label={exp.company} className="exp-row" data-cursor="view">
									<span className="serif exp-row-company">{exp.company}</span>
									<span className="muted exp-row-role">{exp.title}</span>
									<span className="muted exp-row-period">{exp.period}</span>
								</TransitionLink>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* About tease */}
			<section className="section container">
				<Reveal as="p" lines className="display-md about-tease serif">
					I learn by shipping: underwater robots field-tested in Monterey Bay, AI tools running inside
					real companies, and an ocean conservation nonprofit built from zero.
				</Reveal>
				<Reveal delay={0.2}>
					<TransitionLink href="/about" label="About" className="link-underline" style={{ fontSize: 15, marginTop: 32, display: "inline-block" }}>
						More about me
					</TransitionLink>
				</Reveal>
			</section>
		</main>
	)
}
