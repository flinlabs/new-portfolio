"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import type { GalleryImage } from "@/data/projects"

type Row = { kind: "row" | "strip"; items: GalleryImage[] }

const CAP = { half: 2, third: 3 } as const

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Captioned art grid in justified rows: every image in a row renders at the
 * same height (widths split by aspect ratio). Clicking a piece zooms it from
 * its spot in the grid to the center of the screen; closing reverses the
 * move. Right-click and drag are disabled on the artwork.
 */
export default function ArtGallery({ images, context }: { images: GalleryImage[]; context: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const frameRef = useRef<HTMLDivElement>(null)
	const srcRectRef = useRef<DOMRect | null>(null)
	const closingRef = useRef(false)
	const [active, setActive] = useState<GalleryImage | null>(null)

	const open = (img: GalleryImage, e: React.MouseEvent<HTMLButtonElement>) => {
		srcRectRef.current = e.currentTarget.querySelector("img")?.getBoundingClientRect() ?? null
		setActive(img)
		const dialog = dialogRef.current
		if (!dialog) return
		dialog.showModal()
		// FLIP: start the enlarged image at the thumbnail's position and
		// scale, then release it to its centered layout spot.
		requestAnimationFrame(() => {
			const el = frameRef.current?.querySelector("img")
			const cap = frameRef.current?.querySelector("p")
			const src = srcRectRef.current
			if (!el || !src || reducedMotion()) return
			const dest = el.getBoundingClientRect()
			if (!dest.width) return
			gsap.fromTo(
				el,
				{
					x: src.x + src.width / 2 - (dest.x + dest.width / 2),
					y: src.y + src.height / 2 - (dest.y + dest.height / 2),
					scale: src.width / dest.width,
				},
				{ x: 0, y: 0, scale: 1, duration: 0.65, ease: "power3.inOut" },
			)
			if (cap) gsap.fromTo(cap, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out" })
		})
	}

	const close = () => {
		const dialog = dialogRef.current
		if (!dialog?.open || closingRef.current) return
		const el = frameRef.current?.querySelector("img")
		const cap = frameRef.current?.querySelector("p")
		const src = srcRectRef.current
		if (!el || !src || reducedMotion()) {
			dialog.close()
			return
		}
		closingRef.current = true
		const dest = el.getBoundingClientRect()
		if (cap) gsap.to(cap, { autoAlpha: 0, duration: 0.2, ease: "power2.in" })
		gsap.to(el, {
			x: src.x + src.width / 2 - (dest.x + dest.width / 2),
			y: src.y + src.height / 2 - (dest.y + dest.height / 2),
			scale: src.width / dest.width,
			duration: 0.5,
			ease: "power3.inOut",
			onComplete: () => {
				dialog.close()
				closingRef.current = false
				gsap.set(el, { clearProps: "all" })
				if (cap) gsap.set(cap, { clearProps: "all" })
			},
		})
	}

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
		<button type="button" className="oc-zoom" onClick={e => open(img, e)} aria-label={`Enlarge: ${img.caption ?? context}`}>
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
			<dialog
				ref={dialogRef}
				className="oc-lightbox"
				onClick={close}
				onCancel={e => {
					e.preventDefault()
					close()
				}}
				onClose={() => setActive(null)}
				onContextMenu={e => e.preventDefault()}
			>
				<div ref={frameRef}>
					{active && (
						<>
							<Image src={active.src} alt={active.caption ?? context} width={active.w} height={active.h} draggable={false} />
							{active.caption && <p>{active.caption}</p>}
						</>
					)}
				</div>
			</dialog>
		</div>
	)
}
