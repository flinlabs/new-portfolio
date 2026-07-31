"use client"
import { TransitionLink } from "@/components/motion/PageTransition"

const honors = [
	"ISEF Finalist",
	"Published in IEEE Xplore",
	"Regeneron STS Top 300",
	"ACSEF Grand Award",
	"Broadcom MASTERS Top 300",
	"NASA & NOAA Special Awards",
]

export default function Footer() {
	return (
		<footer className="section-dark site-footer">
			<div className="marquee" aria-hidden="true">
				{[0, 1].map(i => (
					<div key={i} className="marquee-track serif">
						{honors.map(h => (
							<span key={h} className="footer-honor">
								{h} <span className="footer-dot">·</span>
							</span>
						))}
					</div>
				))}
			</div>

			<div className="container footer-main">
				<p className="label">Open to internships and builds</p>
				<TransitionLink href="/contact" label="Contact" className="serif footer-cta" data-cursor="view" data-cursor-label="Say hi">
					Let&rsquo;s talk <span className="footer-cta-arrow">&#8599;</span>
				</TransitionLink>
			</div>

			<div className="container footer-grid">
				<a href="mailto:f.lin@berkeley.edu" className="link-underline">
					f.lin@berkeley.edu
				</a>
				<a href="https://www.linkedin.com/in/fayelin-aqua" target="_blank" rel="noopener noreferrer" className="link-underline">
					LinkedIn
				</a>
				<a href="https://github.com/flinlabs" target="_blank" rel="noopener noreferrer" className="link-underline">
					GitHub
				</a>
				<a href="/FayeLin_Resume.pdf" download className="link-underline">
					Resume
				</a>
			</div>

			<div className="container footer-base">
				<span>&copy; 2026 Faye Lin</span>
				<span>Berkeley, CA</span>
			</div>
		</footer>
	)
}
