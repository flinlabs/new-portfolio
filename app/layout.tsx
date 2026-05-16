import type { Metadata } from "next"
import Nav from "@/components/Nav"

export const metadata: Metadata = {
	title: "Faye Lin",
	description: "Portfolio",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Nav />
				{children}
			</body>
		</html>
	)
}