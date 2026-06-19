import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Blob from "@/components/Blob"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	style: ["normal", "italic"],
	variable: "--font-cormorant",
	display: "swap",
})

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-inter",
	display: "swap",
})

export const metadata: Metadata = {
	title: "Faye Lin",
	description: "Builder, researcher, and connector of dots. Economics & Data Science at UC Berkeley.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
			<body style={{ backgroundColor: "var(--bg)", minHeight: "100vh", position: "relative" }}>
				<Blob />
				<Nav />
				<div style={{ position: "relative", zIndex: 10 }}>
					{children}
				</div>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}