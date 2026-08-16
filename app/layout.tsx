import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import BackToTop from "@/components/BackToTop"
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

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: "Faye Lin", template: "%s · Faye Lin" },
	description:
		"AI product builder studying Economics & Data Science at UC Berkeley. AI tools shipped inside real companies, marine robots field-tested in Monterey Bay.",
	openGraph: {
		title: "Faye Lin",
		description:
			"AI product builder studying Economics & Data Science at UC Berkeley. AI tools shipped inside real companies, marine robots field-tested in Monterey Bay.",
		images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Faye Lin" }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		images: ["/og-image.jpg"],
	},
}

export const viewport: Viewport = {
	themeColor: "#f4f1ea",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
			<body>
				<Preloader />
				<TransitionProvider nav={<><Nav /><BackToTop /></>}>
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
