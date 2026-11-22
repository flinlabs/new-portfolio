"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/data/projects"

type Row = { kind: "row" | "strip"; items: GalleryImage[] }

const CAP = { half: 2, third: 3 } as const

/**
 * Captioned art grid in justified rows: every image in a row renders at the
 * same height (widths split by aspect ratio). Clicking a piece opens it
 * enlarged in the center of the screen. Right-click and drag are disabled
 * on the artwork.
 */
export default function ArtGallery({ images, context }: { images: GalleryImage[]; context: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [active, setActive] = useState<GalleryImage | null>(null)

	const open = (img: GalleryImage) => {
		setActive(img)
		dialogRef.current?.showModal()
	}
	const close = () => dialogRef.current?.close()

	const rows: Row[] = []
	for (const img of images) {
		const last = rows[rows.length - 1]
		if (img.size === "tiny") {
			if (last?.kind === "strip") last.items.push(img)
			else rows.push({ kind: "strip", items: [img] })
		} else if (img.size === "half" || img.size === "third") {
			const cap = CAP[img.size]
			if (last?.kind === "row" && last.items.length < cap && last.items[0].size === img.size) last.items.push(img)
			else rows.push({ kind: "row", items: [img] })
		} else {
			rows.push({ kind: "row", items: [img] })
		}
	}

	const art = (img: GalleryImage) => (
		<button type="button" className="oc-zoom" onClick={() => open(img)} aria-label={`Enlarge: ${img.caption ?? context}`}>
			<Image src={img.src} alt={img.caption ?? context} width={img.w} height={img.h} draggable={false} />
		</button>
	)

	return (
		<div className="oc-gallery" onContextMenu={e => e.preventDefault()}>
			{rows.map((row, i) =>
				row.kind === "strip" ? (
					<figure key={i} className="oc-strip">
						<span className="oc-strip-row">{row.items.map(img => <span key={img.src}>{art(img)}</span>)}</span>
						{row.items.some(x => x.caption) && <figcaption>{row.items.map(x => x.caption).find(Boolean)}</figcaption>}
					</figure>
				) : (
					<div key={i} className="oc-row">
						{row.items.map(img => (
							<figure key={img.src} style={{ "--ar": img.w / img.h } as React.CSSProperties}>
								{art(img)}
								{img.caption && <figcaption>{img.caption}</figcaption>}
							</figure>
						))}
					</div>
				),
			)}
			<dialog ref={dialogRef} className="oc-lightbox" onClick={close} onClose={() => setActive(null)} onContextMenu={e => e.preventDefault()}>
				{active && (
					<>
						<Image src={active.src} alt={active.caption ?? context} width={active.w} height={active.h} draggable={false} />
						{active.caption && <p>{active.caption}</p>}
					</>
				)}
			</dialog>
		</div>
	)
}
