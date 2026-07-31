"use client"
import { useEffect, type RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/** Trionn-style scroll-velocity skew: the element shears with fast scrolling
 *  and eases back upright when the scroll settles. */
export function useVelocitySkew(ref: RefObject<HTMLElement | null>, max = 4) {
	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		const setSkew = gsap.quickTo(el, "skewY", { duration: 0.45, ease: "power3.out" })
		let settle: ReturnType<typeof setTimeout>
		const st = ScrollTrigger.create({
			onUpdate: self => {
				setSkew(gsap.utils.clamp(-max, max, self.getVelocity() / -400))
				clearTimeout(settle)
				settle = setTimeout(() => setSkew(0), 120)
			},
		})
		return () => {
			clearTimeout(settle)
			st.kill()
		}
	}, [ref, max])
}
