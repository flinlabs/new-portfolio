"use client"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { experiences } from "@/data/experiences"
import { projects } from "@/data/projects"

const ALL_TAGS = ["Product", "AI", "Engineering", "Finance", "Real Estate", "Environmental", "Science"]

const DATE_RANGES = [
	{ label: "2025", test: (p: string) => p.includes("2025") },
	{ label: "2024", test: (p: string) => p.includes("2024") },
	{ label: "2023", test: (p: string) => p.includes("2023") },
	{ label: "2022", test: (p: string) => p.includes("2022") },
	{ label: "Pre-2022", test: (p: string) => /201[0-9]|2020|2021/.test(p) },
]

const tagColors: Record<string, { bg: string; color: string; border: string }> = {
	"Product":       { bg: "rgba(155,135,212,0.14)", color: "#7B62C4", border: "rgba(155,135,212,0.3)"  },
	"AI":            { bg: "rgba(100,160,240,0.14)", color: "#3A7FD4", border: "rgba(100,160,240,0.3)"  },
	"Finance":       { bg: "rgba(232,180,80,0.16)",  color: "#A87820", border: "rgba(232,180,80,0.35)"  },
	"Real Estate":   { bg: "rgba(200,130,90,0.14)",  color: "#A85530", border: "rgba(200,130,90,0.3)"   },
	"Engineering":   { bg: "rgba(230,100,120,0.13)", color: "#C0404E", border: "rgba(230,100,120,0.28)" },
	"Environmental": { bg: "rgba(90,170,110,0.14)",  color: "#2E8A50", border: "rgba(90,170,110,0.3)"   },
	"Science":       { bg: "rgba(80,200,190,0.14)",  color: "#1A9090", border: "rgba(80,200,190,0.3)"   },
}

type Result = {
	slug: string
	title: string
	sub: string
	tag: string
	period: string
	href: string
	type: "Experience" | "Project"
}

const allItems: Result[] = [
	...experiences.map(e => ({
		slug: e.slug, title: e.title, sub: e.company,
		tag: e.tag, period: e.period, href: `/experience/${e.slug}`, type: "Experience" as const,
	})),
	...projects.map(p => ({
		slug: p.slug, title: p.title, sub: p.subtitle ?? "",
		tag: p.tag, period: p.period, href: `/projects/${p.slug}`, type: "Project" as const,
	})),
]

function hasTag(itemTag: string, selected: string[]) {
	if (selected.length === 0) return true
	const parts = itemTag.split(/\s*[·•]\s*/).map(t => t.trim())
	return selected.every(s => parts.includes(s))
}

export default function SearchDropdown() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	const results = allItems.filter(item => {
		const matchesQuery = query.trim() === "" ||
			item.title.toLowerCase().includes(query.toLowerCase()) ||
			item.sub.toLowerCase().includes(query.toLowerCase())
		const matchesTags = hasTag(item.tag, selectedTags)
		const matchesDate = !selectedDate ||
			(DATE_RANGES.find(d => d.label === selectedDate)?.test(item.period) ?? true)
		return matchesQuery && matchesTags && matchesDate
	})

	const grouped = {
		Experience: results.filter(r => r.type === "Experience"),
		Project: results.filter(r => r.type === "Project"),
	}

	const toggleTag = (tag: string) =>
		setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

	const handleSelect = (href: string) => {
		router.push(href)
		setOpen(false)
		setQuery("")
		setSelectedTags([])
		setSelectedDate(null)
	}

	const handleClose = () => {
		setOpen(false)
		setQuery("")
		setSelectedTags([])
		setSelectedDate(null)
	}

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handler)
		return () => document.removeEventListener("mousedown", handler)
	}, [])

	useEffect(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 50)
	}, [open])

	const activeFilters = selectedTags.length + (selectedDate ? 1 : 0)

	return (
		<div ref={containerRef} style={{ position: "relative" }}>
			<div style={{
				display: "flex",
				alignItems: "center",
				gap: "8px",
				background: open ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
				backdropFilter: "blur(12px)",
				border: `1px solid ${open ? "var(--lavender)" : "var(--border)"}`,
				borderRadius: "100px",
				padding: "7px 16px",
				width: open ? "320px" : "200px",
				transition: "all 0.2s ease",
				boxShadow: open ? "0 2px 16px rgba(155,135,212,0.2)" : "none",
				cursor: open ? "default" : "pointer",
			}} onClick={() => !open && setOpen(true)}>
				<span style={{ fontSize: "15px", opacity: 0.45, flexShrink: 0 }}>⌕</span>
				<input
					ref={inputRef}
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder={open ? "Search experiences & projects..." : "Search..."}
					onKeyDown={e => e.key === "Escape" && handleClose()}
					readOnly={!open}
					style={{
						border: "none",
						outline: "none",
						background: "transparent",
						fontSize: "13px",
						color: "var(--text)",
						width: "100%",
						fontFamily: "var(--font-inter)",
						cursor: open ? "text" : "pointer",
					}}
				/>
				{open && (
					<button onClick={handleClose} style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						opacity: 0.35,
						fontSize: "18px",
						lineHeight: 1,
						padding: 0,
						flexShrink: 0,
					}}>×</button>
				)}
				{!open && activeFilters > 0 && (
					<span style={{
						fontSize: "11px",
						fontWeight: 600,
						background: "var(--lavender)",
						color: "#fff",
						borderRadius: "100px",
						padding: "1px 7px",
					}}>{activeFilters}</span>
				)}
			</div>

			{open && (
				<div style={{
					position: "absolute",
					top: "calc(100% + 10px)",
					right: 0,
					width: "380px",
					maxHeight: "560px",
					overflowY: "auto",
					background: "rgba(255,255,255,0.97)",
					backdropFilter: "blur(20px)",
					border: "1px solid var(--border)",
					borderRadius: "20px",
					boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
					zIndex: 100,
				}}>

					<div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
						<p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", opacity: 0.55 }}>Filter by tag</p>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "14px" }}>
							{ALL_TAGS.map(tag => {
								const active = selectedTags.includes(tag)
								const s = tagColors[tag]
								return (
									<button key={tag} onClick={() => toggleTag(tag)} style={{
										fontSize: "11px",
										fontWeight: 600,
										letterSpacing: "0.06em",
										textTransform: "uppercase",
										padding: "4px 11px",
										borderRadius: "100px",
										cursor: "pointer",
										transition: "all 0.15s",
										background: active ? s.bg : s.bg.replace(/[\d.]+\)$/, "0.05)"),
										color: active ? s.color : s.color + "99",
										border: `1px solid ${active ? s.border : s.border.replace(/[\d.]+\)$/, "0.12)")}`,
									}}>{tag}</button>
								)
							})}
						</div>

						<p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", opacity: 0.55 }}>Filter by year</p>
						<div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
							{DATE_RANGES.map(({ label }) => {
								const active = selectedDate === label
								return (
									<button key={label} onClick={() => setSelectedDate(active ? null : label)} style={{
										fontSize: "11px",
										fontWeight: 600,
										padding: "4px 11px",
										borderRadius: "100px",
										cursor: "pointer",
										transition: "all 0.15s",
										background: active ? "rgba(155,135,212,0.15)" : "rgba(0,0,0,0.03)",
										color: active ? "#8B74C8" : "var(--text-muted)",
										border: `1px solid ${active ? "rgba(155,135,212,0.3)" : "rgba(0,0,0,0.08)"}`,
									}}>{label}</button>
								)
							})}
						</div>
					</div>

					{(query.trim() !== "" || selectedTags.length > 0 || selectedDate !== null) && (
						<div style={{ padding: "8px 0" }}>
							{results.length === 0 ? (
								<p style={{ padding: "24px 16px", fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>No results found</p>
							) : (
								(["Experience", "Project"] as const).map(type => {
									const group = grouped[type]
									if (group.length === 0) return null
									return (
										<div key={type}>
											<p style={{ padding: "8px 16px 4px", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", opacity: 0.45 }}>{type}s</p>
											{group.map(item => (
												<button key={item.slug} onClick={() => handleSelect(item.href)} style={{
													width: "100%",
													textAlign: "left",
													background: "none",
													border: "none",
													cursor: "pointer",
													padding: "10px 16px",
													display: "block",
												}}
													onMouseEnter={e => (e.currentTarget.style.background = "rgba(155,135,212,0.06)")}
													onMouseLeave={e => (e.currentTarget.style.background = "none")}
												>
													<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
														<p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{item.title}</p>
														<p style={{ fontSize: "11px", color: "var(--text-muted)", opacity: 0.5, flexShrink: 0 }}>{item.period}</p>
													</div>
													{item.sub && <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "1px" }}>{item.sub}</p>}
												</button>
											))}
										</div>
									)
								})
							)}
						</div>
					)}
				</div>
			)}
		</div>
	)
}