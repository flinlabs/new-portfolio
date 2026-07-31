"use client"
import { TransitionLink } from "@/components/motion/PageTransition"

export default function Footer() {
	return (
		<footer className="site-footer">
			<div className="container footer-main">
				<p className="label">Open to internships and builds</p>
				<TransitionLink href="/contact" label="Contact" className="footer-cta" data-cursor="view" data-cursor-label="Say hi">
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
