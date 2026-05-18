"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import SearchDropdown from "@/components/SearchDropdown"

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
			<Link href="/" style={{ display: "flex", alignItems: "center" }}>
				<Image
					src="/logo.png"
					alt="Faye Lin"
					width={40}
					height={40}
					style={{ objectFit: "contain", filter: "brightness(0)" }}
				/>
			</Link>
			<div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
				<SearchDropdown />
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
			</div>
		</nav>
	)
}