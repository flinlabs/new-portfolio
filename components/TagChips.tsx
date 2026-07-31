export default function TagChips({ tag }: { tag: string }) {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
			{tag.split(/\s*[·•]\s*/).map(t => (
				<span key={t} className="chip">
					{t.trim()}
				</span>
			))}
		</div>
	)
}
