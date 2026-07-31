const tagColors: Record<string, { bg: string; color: string }> = {
	AI: { bg: "var(--lav)", color: "var(--lav-ink)" },
	Product: { bg: "var(--powder)", color: "var(--powder-ink)" },
	Engineering: { bg: "var(--blush)", color: "var(--blush-ink)" },
	Finance: { bg: "var(--butter)", color: "var(--butter-ink)" },
	"Real Estate": { bg: "var(--sand)", color: "var(--sand-ink)" },
	Science: { bg: "var(--mint)", color: "var(--mint-ink)" },
	Environmental: { bg: "var(--mint)", color: "var(--mint-ink)" },
}

export function Chip({ text }: { text: string }) {
	const s = tagColors[text.trim()]
	return (
		<span className="chip" style={s ? { background: s.bg, color: s.color } : undefined}>
			{text.trim()}
		</span>
	)
}

export default function TagChips({ tag }: { tag: string }) {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
			{tag.split(/\s*[·•]\s*/).map(t => (
				<Chip key={t} text={t} />
			))}
		</div>
	)
}
