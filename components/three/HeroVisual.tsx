"use client"
import dynamic from "next/dynamic"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

export default function HeroVisual({ className }: { className?: string }) {
	return (
		<div className={`hero-visual ${className ?? ""}`}>
			<HeroScene />
		</div>
	)
}
