"use client"
import { createContext, useCallback, useContext, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type TransitionContextType = {
	navigate: (href: string, label?: string) => void
}

const TransitionContext = createContext<TransitionContextType>({ navigate: () => {} })

export function useTransition() {
	return useContext(TransitionContext)
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const rootRef = useRef<HTMLDivElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)
	const labelRef = useRef<HTMLDivElement>(null)
	const covering = useRef(false)
	const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)

	const uncover = useCallback(() => {
		if (!covering.current) return
		if (failsafe.current) {
			clearTimeout(failsafe.current)
			failsafe.current = null
		}
		const root = rootRef.current!
		const panel = panelRef.current!
		const labelEl = labelRef.current!
		window.scrollTo(0, 0)
		window.__lenis?.scrollTo(0, { immediate: true, force: true })
		ScrollTrigger.refresh()
		gsap.timeline({
			onComplete: () => {
				root.classList.remove("is-active")
				covering.current = false
				window.__lenis?.start()
			},
		})
			.to(labelEl, { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" })
			.to(panel, { yPercent: -110, duration: 0.75, ease: "power4.inOut" }, "-=0.1")
	}, [])

	const navigate = useCallback(
		(href: string, label?: string) => {
			if (href === pathname || covering.current) return
			const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
			if (reduce) {
				router.push(href)
				return
			}
			covering.current = true
			window.__lenis?.stop()
			const root = rootRef.current!
			const panel = panelRef.current!
			const labelEl = labelRef.current!
			labelEl.textContent = label ?? ""
			root.classList.add("is-active")
			gsap.timeline()
				.fromTo(panel, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "power4.inOut" })
				.fromTo(labelEl, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, "-=0.25")
				.add(() => {
					router.push(href)
					// If the route never resolves, don't leave the user behind a black wall.
					failsafe.current = setTimeout(() => uncover(), 4000)
				})
		},
		[pathname, router, uncover],
	)

	useEffect(() => {
		if (covering.current) {
			// New route content is mounted; lift the curtain on the next frame.
			const raf = requestAnimationFrame(() => uncover())
			return () => cancelAnimationFrame(raf)
		}
	}, [pathname, uncover])

	return (
		<TransitionContext.Provider value={{ navigate }}>
			{children}
			<div ref={rootRef} className="curtain" aria-hidden="true">
				<div ref={panelRef} className="curtain-panel" />
				<div ref={labelRef} className="curtain-label serif" />
			</div>
		</TransitionContext.Provider>
	)
}

type TransitionLinkProps = {
	href: string
	label?: string
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	onNavigate?: () => void
	"aria-current"?: "page" | undefined
	"data-cursor"?: string
}

export function TransitionLink({ href, label, children, onNavigate, ...rest }: TransitionLinkProps) {
	const { navigate } = useTransition()
	return (
		<Link
			href={href}
			{...rest}
			onClick={e => {
				if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
				e.preventDefault()
				onNavigate?.()
				navigate(href, label)
			}}
		>
			{children}
		</Link>
	)
}
