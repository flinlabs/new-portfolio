import type { Metadata, Viewport } from "next"
import { Newsreader, Archivo } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Preloader from "@/components/motion/Preloader"
import SmoothScroll from "@/components/motion/SmoothScroll"
import Cursor from "@/components/motion/Cursor"
import { TransitionProvider } from "@/components/motion/PageTransition"
import { Analytics } from "@vercel/analytics/next"

const newsreader = Newsreader({
	subsets: ["latin"],
	style: ["normal", "italic"],
	axes: ["opsz"],
	variable: "--font-newsreader",
	display: "swap",
})

const archivo = Archivo({
	subsets: ["latin"],
	variable: "--font-archivo",
	display: "swap",
})

export const metadata: Metadata = {
	title: { default: "Faye Lin", template: "%s · Faye Lin" },
	description:
		"AI product builder studying Economics & Data Science at UC Berkeley. AI tools shipped inside real companies, marine robots field-tested in Monterey Bay.",
}

export const viewport: Viewport = {
	themeColor: "#efece5",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${newsreader.variable} ${archivo.variable}`}>
			<body>
				<Preloader />
				<TransitionProvider>
					<Nav />
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
