import type { Metadata } from "next"
import Nav from "@/components/Nav"
import Blob from "@/components/Blob"

export const metadata: Metadata = {
	title: "Faye Lin",
	description: "Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Blob />
				<Nav />
				<div style={{ position: "relative", zIndex: 1 }}>
					{children}
				</div>
			</body>
		</html>
	)
}