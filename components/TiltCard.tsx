"use client"
import { useRef } from "react"

export default function TiltCard({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = ref.current
		if (!card) return
		const rect = card.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const cx = rect.width / 2
		const cy = rect.height / 2
		const rotateX = ((y - cy) / cy) * -6
		const rotateY = ((x - cx) / cx) * 6
		card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
	}

	const handleMouseLeave = () => {
		if (ref.current) {
			ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)"
		}
	}

	return (
		<div
			ref={ref}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{ transition: "transform 0.2s ease" }}
		>
			{children}
		</div>
	)
}