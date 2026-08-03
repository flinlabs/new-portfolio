"use client"
import { createContext, useCallback, useContext, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Motif from "@/components/Motif"
import { armNavGate, openNavGate } from "@/lib/gate"

gsap.registerPlugin(ScrollTrigger)

type TransitionContextType = {
	navigate: (href: string, label?: string) => void
}

const TransitionContext = createContext<TransitionContextType>({ navigate: () => {} })

export function useTransition() {
	return useContext(TransitionContext)
}

const accents = ["var(--lav)", "var(--powder)", "var(--butter)", "var(--mint)", "var(--blush)"]

function kindOf(href: string) {
	if (href.startsWith("/experience/")) return "Experience"
	if (href.startsWith("/projects/")) return "Project"
	if (href === "/experience") return "Index"
	if (href === "/projects") return "Index"
	if (href === "/") return "Home"
	return "Page"
}

export function TransitionProvider({ nav, children }: { nav: React.ReactNode; children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const rootRef = useRef<HTMLDivElement>(null)
	const inkRef = useRef<HTMLDivElement>(null)
	const accentRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLDivElement>(null)
	const metaRef = useRef<HTMLDivElement>(null)
	const pageRef = useRef<HTMLDivElement>(null)
	const covering = useRef(false)
	const accentIndex = useRef(0)
	const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null)

	const uncover = useCallback(() => {
		if (!covering.current) return
		if (failsafe.current) {
			clearTimeout(failsafe.current)
			failsafe.current = null
		}
		const root = rootRef.current!
		const page = pageRef.current!
		// Let the new page mount and settle before anything is measured or
		// shown: two frames for layout + fonts, scroll pinned to top.
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				window.scrollTo(0, 0)
				window.__lenis?.scrollTo(0, { immediate: true, force: true })
				ScrollTrigger.refresh()
				gsap.set(page, { y: 42, scale: 0.985, transformOrigin: `50% ${window.innerHeight / 2}px` })
				gsap.timeline({
					onComplete: () => {
						gsap.set(page, { clearProps: "transform" })
						root.classList.remove("is-active")
						covering.current = false
						window.__lenis?.start()
					},
				})
					.to([metaRef.current, root.querySelector(".curtain-motif")], { autoAlpha: 0, duration: 0.2 }, 0)
					.to(titleRef.current, { yPercent: -125, duration: 0.4, ease: "power3.in" }, 0)
					// ink leaves first, exposing a beat of the accent colour behind it
					.to(inkRef.current, { yPercent: -110, duration: 0.7, ease: "power4.inOut" }, 0.12)
					.to(accentRef.current, { yPercent: -110, duration: 0.7, ease: "power4.inOut" }, 0.26)
					.to(page, { y: 0, scale: 1, duration: 0.8, ease: "power3.out" }, 0.3)
					// open the gate as the panels clear, so entrance reveals play in view
					.add(openNavGate, 0.55)
			})
		})
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
			armNavGate()
			window.__lenis?.stop()
			const page = pageRef.current!
			const kind = kindOf(href)
			titleRef.current!.textContent = label ?? kind
			metaRef.current!.textContent = kind
			accentRef.current!.style.background = accents[accentIndex.current++ % accents.length]
			gsap.set(page, { transformOrigin: `50% ${window.scrollY + window.innerHeight / 2}px` })
			rootRef.current!.classList.add("is-active")
			gsap.timeline()
				// the old page recedes as the panels sweep over it
				.to(page, { scale: 0.96, y: -18, duration: 0.7, ease: "power3.inOut" }, 0)
				.fromTo(accentRef.current, { y: 0, yPercent: 110 }, { yPercent: 0, duration: 0.62, ease: "power4.inOut" }, 0)
				.fromTo(inkRef.current, { y: 0, yPercent: 110 }, { yPercent: 0, duration: 0.62, ease: "power4.inOut" }, 0.12)
				.fromTo(
					rootRef.current!.querySelector(".curtain-motif"),
					{ autoAlpha: 0, scale: 0.6 },
					{ autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2.5)" },
					0.45,
				)
				.fromTo(titleRef.current, { yPercent: 125 }, { yPercent: 0, duration: 0.55, ease: "power4.out" }, 0.5)
				.fromTo(metaRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.68)
				.add(() => {
					router.push(href)
					// If the route never resolves, don't leave the user behind a black wall.
					failsafe.current = setTimeout(() => uncover(), 4000)
				}, 1.02)
		},
		[pathname, router, uncover],
	)

	useEffect(() => {
		if (covering.current) uncover()
	}, [pathname, uncover])

	return (
		<TransitionContext.Provider value={{ navigate }}>
			{nav}
			<div ref={pageRef}>{children}</div>
			<div ref={rootRef} className="curtain" aria-hidden="true">
				<div ref={accentRef} className="curtain-panel" />
				<div ref={inkRef} className="curtain-panel curtain-panel-ink" />
				<div className="curtain-text">
					<div className="curtain-motif">
						<Motif size={54} dot="var(--butter)" strokeWidth={2.4} />
					</div>
					<div className="curtain-title-mask">
						<div ref={titleRef} className="curtain-title" />
					</div>
					<div ref={metaRef} className="curtain-meta" />
				</div>
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
