"use client"
import { useEffect, useRef } from "react"

export default function Blob() {
	const layer1 = useRef<HTMLDivElement>(null)
	const layer2 = useRef<HTMLDivElement>(null)
	const layer3 = useRef<HTMLDivElement>(null)
	const mouse = useRef({ x: 0, y: 0 })
	const cur1 = useRef({ x: 0, y: 0 })
	const cur2 = useRef({ x: 0, y: 0 })
	const cur3 = useRef({ x: 0, y: 0 })
	const raf = useRef<number>(0)

	useEffect(() => {
		if (typeof window !== "undefined") {
			mouse.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.6 }
			cur1.current = { ...mouse.current }
			cur2.current = { ...mouse.current }
			cur3.current = { ...mouse.current }
		}

		const onMove = (e: MouseEvent) => {
			mouse.current = { x: e.clientX, y: e.clientY }
		}

		const animate = () => {
			cur1.current.x += (mouse.current.x - cur1.current.x) * 0.010
			cur1.current.y += (mouse.current.y - cur1.current.y) * 0.010
			cur2.current.x += (mouse.current.x - cur2.current.x) * 0.020
			cur2.current.y += (mouse.current.y - cur2.current.y) * 0.020
			cur3.current.x += (mouse.current.x - cur3.current.x) * 0.034
			cur3.current.y += (mouse.current.y - cur3.current.y) * 0.034

			if (layer1.current)
				layer1.current.style.transform = `translate(${cur1.current.x}px, ${cur1.current.y}px)`
			if (layer2.current)
				layer2.current.style.transform = `translate(${cur2.current.x}px, ${cur2.current.y}px)`
			if (layer3.current)
				layer3.current.style.transform = `translate(${cur3.current.x}px, ${cur3.current.y}px)`

			raf.current = requestAnimationFrame(animate)
		}

		window.addEventListener("mousemove", onMove)
		raf.current = requestAnimationFrame(animate)
		return () => {
			window.removeEventListener("mousemove", onMove)
			cancelAnimationFrame(raf.current)
		}
	}, [])

	const base: React.CSSProperties = {
		position: "fixed",
		top: 0,
		left: 0,
		pointerEvents: "none",
		zIndex: 0,
		willChange: "transform",
	}

	return (
		<>
			<div ref={layer1} style={{ ...base, width: "700px", height: "700px", marginLeft: "-350px", marginTop: "-350px" }}>
				<div style={{
					width: "100%", height: "100%", borderRadius: "50%",
					background: "radial-gradient(circle, rgba(196,176,250,0.7) 0%, rgba(180,196,255,0.4) 50%, transparent 75%)",
					filter: "blur(60px)",
				}} />
			</div>
			<div ref={layer2} style={{ ...base, width: "500px", height: "500px", marginLeft: "-320px", marginTop: "-200px" }}>
				<div style={{
					width: "100%", height: "100%", borderRadius: "50%",
					background: "radial-gradient(circle, rgba(245,168,208,0.65) 0%, rgba(224,168,245,0.35) 55%, transparent 78%)",
					filter: "blur(55px)",
				}} />
			</div>
			<div ref={layer3} style={{ ...base, width: "380px", height: "380px", marginLeft: "-100px", marginTop: "-280px" }}>
				<div style={{
					width: "100%", height: "100%", borderRadius: "50%",
					background: "radial-gradient(circle, rgba(255,191,168,0.6) 0%, rgba(245,168,192,0.3) 55%, transparent 78%)",
					filter: "blur(50px)",
				}} />
			</div>
		</>
	)
}