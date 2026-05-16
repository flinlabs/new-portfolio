"use client"
import { useEffect, useRef } from "react"

export default function Blob() {
	const l1 = useRef<HTMLDivElement>(null)
	const l2 = useRef<HTMLDivElement>(null)
	const l3 = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let x = window.innerWidth / 2
		let y = window.innerHeight / 2
		let x1 = x, y1 = y
		let x2 = x, y2 = y
		let x3 = x, y3 = y

		const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
		window.addEventListener("mousemove", onMove)

		let frame: number
		const tick = () => {
			x1 += (x - x1) * 0.010
			y1 += (y - y1) * 0.010
			x2 += (x - x2) * 0.020
			y2 += (y - y2) * 0.020
			x3 += (x - x3) * 0.034
			y3 += (y - y3) * 0.034

			if (l1.current) l1.current.style.transform = `translate(${x1}px, ${y1}px)`
			if (l2.current) l2.current.style.transform = `translate(${x2}px, ${y2}px)`
			if (l3.current) l3.current.style.transform = `translate(${x3}px, ${y3}px)`

			frame = requestAnimationFrame(tick)
		}
		frame = requestAnimationFrame(tick)
		return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(frame) }
	}, [])

	const base: React.CSSProperties = {
		position: "fixed",
		top: 0,
		left: 0,
		borderRadius: "50%",
		filter: "blur(72px)",
		opacity: 0.55,
		pointerEvents: "none",
		zIndex: 0,
		animation: "blobPulse 8s ease-in-out infinite",
	}

	return (
		<div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
			<div ref={l1} style={{
				...base,
				width: "700px",
				height: "700px",
				marginLeft: "-350px",
				marginTop: "-350px",
				background: "radial-gradient(circle, rgba(200,180,248,0.7), rgba(180,196,255,0.4), transparent 70%)",
			}} />
			<div ref={l2} style={{
				...base,
				width: "500px",
				height: "500px",
				marginLeft: "-320px",
				marginTop: "-200px",
				background: "radial-gradient(circle, rgba(245,168,208,0.6), rgba(224,168,245,0.35), transparent 70%)",
				animationDelay: "-3s",
			}} />
			<div ref={l3} style={{
				...base,
				width: "380px",
				height: "380px",
				marginLeft: "-100px",
				marginTop: "-280px",
				background: "radial-gradient(circle, rgba(255,191,168,0.55), rgba(245,168,192,0.3), transparent 70%)",
				animationDelay: "-5s",
			}} />
		</div>
	)
}