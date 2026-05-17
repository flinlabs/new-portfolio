const tagColors: Record<string, { bg: string; color: string; border: string }> = {
	"Product":       { bg: "rgba(155,135,212,0.14)", color: "#7B62C4", border: "rgba(155,135,212,0.3)"  },
	"AI":            { bg: "rgba(100,160,240,0.14)", color: "#3A7FD4", border: "rgba(100,160,240,0.3)"  },
	"Finance":       { bg: "rgba(232,180,80,0.16)",  color: "#A87820", border: "rgba(232,180,80,0.35)"  },
	"Real Estate":   { bg: "rgba(200,130,90,0.14)",  color: "#A85530", border: "rgba(200,130,90,0.3)"   },
	"Engineering":   { bg: "rgba(230,100,120,0.13)", color: "#C0404E", border: "rgba(230,100,120,0.28)" },
	"Environmental": { bg: "rgba(90,170,110,0.14)",  color: "#2E8A50", border: "rgba(90,170,110,0.3)"   },
	"Science":       { bg: "rgba(80,200,190,0.14)",  color: "#1A9090", border: "rgba(80,200,190,0.3)"   },
}

export default function TagChips({ tag }: { tag: string }) {
	const parts = tag.split(/\s*[·•]\s*/)
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
			{parts.map(part => {
				const s = tagColors[part.trim()] ?? { bg: "rgba(155,135,212,0.1)", color: "var(--lavender)", border: "rgba(155,135,212,0.2)" }
				return (
					<span key={part} style={{
						fontSize: "11px",
						fontWeight: 600,
						letterSpacing: "0.08em",
						textTransform: "uppercase",
						padding: "4px 12px",
						borderRadius: "100px",
						background: s.bg,
						color: s.color,
						border: `1px solid ${s.border}`,
					}}>
						{part.trim()}
					</span>
				)
			})}
		</div>
	)
}