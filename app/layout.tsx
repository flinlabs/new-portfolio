import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Preloader from "@/components/motion/Preloader"
import SmoothScroll from "@/components/motion/SmoothScroll"
import Cursor from "@/components/motion/Cursor"
import { TransitionProvider } from "@/components/motion/PageTransition"
import { Analytics } from "@vercel/analytics/next"

const archivo = Archivo({
	subsets: ["latin"],
	variable: "--font-archivo",
	display: "swap",
})

const plexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-plex-mono",
	display: "swap",
})

export const metadata: Metadata = {
	title: { default: "Faye Lin", template: "%s · Faye Lin" },
	description:
		"AI product builder studying Economics & Data Science at UC Berkeley. AI tools shipped inside real companies, marine robots field-tested in Monterey Bay.",
}

export const viewport: Viewport = {
	themeColor: "#f4f1ea",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
			<body>
				<Preloader />
				<TransitionProvider nav={<Nav />}>
					{children}
					<Footer />
				</TransitionProvider>
				<SmoothScroll />
				<Cursor />
				<div className="grain" aria-hidden="true" />
				<Analytics />
			</body>
		</html>
	)
}
