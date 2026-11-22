"use client"
import { useRef, useState } from "react"
import Image from "next/image"
import type { GalleryImage } from "@/data/projects"

/**
 * Captioned art grid with a lightbox: thumbnails stay small on the page,
 * clicking any piece opens it near full-screen in a native <dialog>.
 */
export default function ArtGallery({ images, context }: { images: GalleryImage[]; context: string }) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [active, setActive] = useState<GalleryImage | null>(null)

	const open = (img: GalleryImage) => {
		setActive(img)
		dialogRef.current?.showModal()
	}
	const close = () => dialogRef.current?.close()

	// consecutive "tiny" images render as one fixed 4-up strip
	const groups: (GalleryImage | GalleryImage[])[] = []
	for (const img of images) {
		const last = groups[groups.length - 1]
		if (img.size === "tiny") {
			if (Array.isArray(last)) last.push(img)
			else groups.push([img])
		} else groups.push(img)
	}

	const zoom = (img: GalleryImage) => (
		<button type="button" className="oc-zoom" onClick={() => open(img)} aria-label={`Enlarge: ${img.caption ?? context}`}>
			<Image src={img.src} alt={img.caption ?? context} width={img.w} height={img.h} />
		</button>
	)

	return (
		<div className="oc-gallery">
			{groups.map(item =>
				Array.isArray(item) ? (
					<figure key={item[0].src} className="oc-strip">
						<span className="oc-strip-row">{item.map(img => <span key={img.src}>{zoom(img)}</span>)}</span>
						{item.some(i => i.caption) && <figcaption>{item.map(i => i.caption).find(Boolean)}</figcaption>}
					</figure>
				) : (
					<figure key={item.src} className={item.size ? `oc-${item.size}` : undefined}>
						{zoom(item)}
						{item.caption && <figcaption>{item.caption}</figcaption>}
					</figure>
				),
			)}
			<dialog ref={dialogRef} className="oc-lightbox" onClick={close} onClose={() => setActive(null)}>
				{active && (
					<>
						<Image src={active.src} alt={active.caption ?? context} width={active.w} height={active.h} />
						{active.caption && <p>{active.caption}</p>}
					</>
				)}
			</dialog>
		</div>
	)
}
