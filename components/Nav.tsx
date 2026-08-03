"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TransitionLink } from "@/components/motion/PageTransition"
import Magnetic from "@/components/motion/Magnetic"
import Motif from "@/components/Motif"

gsap.registerPlugin(ScrollTrigger)

const links = [
	{ href: "/experience", label: "Experience" },
	{ href: "/projects", label: "Projects" },
	{ href: "/about", label: "About" },
]

export default function Nav() {
	const pathname = usePathname()
	const [scrolled, setScrolled] = useState(false)
	const [hidden, setHidden] = useState(false)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const st = ScrollTrigger.create({
			start: 60,
			end: "max",
			onToggle: self => setScrolled(self.isActive),
			// trionn-style: nav ducks away scrolling down, returns scrolling up
			onUpdate: self => setHidden(self.direction === 1 && self.scroll() > 260),
		})
		return () => st.kill()
	}, [])

	useEffect(() => {
		document.documentElement.style.overflow = open ? "hidden" : ""
		if (open) window.__lenis?.stop()
		else window.__lenis?.start()
	}, [open])

	const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

	return (
		<>
			<header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
				<div className="container site-nav-inner">
					<TransitionLink href="/" label="Faye Lin" className="site-nav-wordmark">
						<Motif size={38} strokeWidth={3} />
						Faye Lin
					</TransitionLink>

					<nav className="nav-links" aria-label="Primary">
						{links.map(({ href, label }) => (
							<TransitionLink
								key={href}
								href={href}
								label={label}
								className="label link-underline"
								aria-current={isActive(href) ? "page" : undefined}
							>
								{label}
							</TransitionLink>
						))}
					</nav>

					<div className="nav-cta">
						<Magnetic>
							<TransitionLink href="/contact" label="Contact" className="btn btn-dark" style={{ padding: "11px 24px" }}>
								Let&rsquo;s talk
							</TransitionLink>
						</Magnetic>
					</div>

					<button className="nav-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}>
						<span />
						<span />
					</button>
				</div>
			</header>

			{open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}
		</>
	)
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
		const ctx = gsap.context(() => {
			gsap.fromTo(".mobile-menu", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
			gsap.fromTo(
				".mobile-menu-link",
				{ yPercent: 110 },
				{ yPercent: 0, duration: 0.7, stagger: 0.07, delay: 0.1, ease: "power4.out" },
			)
		})
		return () => ctx.revert()
	}, [])

	const items = [{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }]

	return (
		<div className="mobile-menu">
			<nav aria-label="Mobile">
				{items.map(({ href, label }) => (
					<div key={href} style={{ overflow: "hidden" }}>
						<TransitionLink
							href={href}
							label={label}
							onNavigate={onClose}
							className="mobile-menu-link"
							aria-current={pathname === href ? "page" : undefined}
						>
							{label}
						</TransitionLink>
					</div>
				))}
			</nav>
			<div className="mobile-menu-foot">
				<a href="https://www.linkedin.com/in/fayelin-aqua" target="_blank" rel="noopener noreferrer">
					LinkedIn
				</a>
				<a href="/FayeLin_Resume.pdf" download>
					Resume
				</a>
			</div>
		</div>
	)
}
