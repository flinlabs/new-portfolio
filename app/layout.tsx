import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Faye Lin",
	description: "Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<nav style={{ padding: "16px 32px", borderBottom: "1px solid #eee", display: "flex", gap: "24px" }}>
					<Link href="/">Faye Lin</Link>
					<Link href="/about">About</Link>
					<Link href="/experience">Experience</Link>
					<Link href="/projects">Projects</Link>
					<Link href="/contact">Contact</Link>
				</nav>
				{children}
			</body>
		</html>
	)
}