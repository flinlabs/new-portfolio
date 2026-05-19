"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
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
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
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

				{/* Desktop nav */}
				<div className="mobile-hide" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
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

				{/* Hamburger button — mobile only */}
				<button
					className="mobile-menu-btn"
					onClick={() => setMenuOpen(true)}
					style={{
						display: "none",
						background: "none",
						border: "none",
						cursor: "pointer",
						fontSize: "24px",
						color: "var(--text)",
						padding: "4px",
					}}
				>
					☰
				</button>
			</nav>

			{/* Full screen mobile menu */}
			{menuOpen && (
				<div style={{
					position: "fixed",
					inset: 0,
					zIndex: 100,
					background: "rgba(247,246,250,0.98)",
					backdropFilter: "blur(20px)",
					display: "flex",
					flexDirection: "column",
					padding: "40px 32px",
				}}>
					{/* Top row */}
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
						<Link href="/" onClick={() => setMenuOpen(false)}>
							<Image src="/logo.png" alt="Faye Lin" width={40} height={40} style={{ objectFit: "contain", filter: "brightness(0)" }} />
						</Link>
						<button
							onClick={() => setMenuOpen(false)}
							style={{
								background: "none",
								border: "none",
								cursor: "pointer",
								fontSize: "28px",
								color: "var(--text)",
								padding: "4px",
							}}
						>
							✕
						</button>
					</div>

					{/* Links */}
					<ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
						{links.map(({ href, label }) => {
							const active = pathname === href || (href !== "/" && pathname.startsWith(href))
							return (
								<li key={href}>
									<Link
										href={href}
										onClick={() => setMenuOpen(false)}
										style={{
											fontFamily: "var(--font-cormorant)",
											fontSize: "48px",
											fontWeight: 600,
											textDecoration: "none",
											color: active ? "var(--text)" : "var(--text-muted)",
											opacity: active ? 1 : 0.5,
											display: "block",
											lineHeight: 1.3,
										}}
									>
										{label}
									</Link>
								</li>
							)
						})}
					</ul>

					{/* Bottom links */}
					<div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
						<a
							href="https://www.linkedin.com/in/fayelin-aqua"
							target="_blank"
							rel="noopener noreferrer"
							style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
						>
							LinkedIn ↗
						</a>
						<a
							href="/FayeLin_Resume.pdf"
							download
							style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none" }}
						>
							Download Resume ↓
						</a>
					</div>
				</div>
			)}
		</>
	)
}