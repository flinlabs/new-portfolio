"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/experience", label: "Experience" },
	{ href: "/projects", label: "Projects" },
	{ href: "/contact", label: "Contact" },
]

export default function Nav() {
	const pathname = usePathname()

	return (
		<nav style={{
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			zIndex: 50,
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: "20px 48px",
			background: "rgba(247,246,250,0.82)",
			backdropFilter: "blur(14px)",
			borderBottom: "1px solid rgba(196,181,240,0.2)",
		}}>
			<Link href="/" style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px", fontWeight: 600 }}>
				Faye Lin
			</Link>
			<ul style={{ display: "flex", alignItems: "center", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
				{links.map(({ href, label }) => {
					const active = pathname === href || (href !== "/" && pathname.startsWith(href))
					return (
						<li key={href}>
							<Link href={href} style={{
								fontSize: "11px",
								fontWeight: 500,
								letterSpacing: "0.12em",
								textTransform: "uppercase",
								textDecoration: "none",
								color: active ? "var(--text)" : "var(--text-muted)",
								transition: "color 0.2s ease",
							}}>
								{label}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}