"use client"
import { useState } from "react"
import Reveal from "@/components/motion/Reveal"
import Magnetic from "@/components/motion/Magnetic"

export default function Contact() {
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus("sending")
		const form = e.currentTarget
		const data = new FormData(form)

		try {
			const res = await fetch("https://formspree.io/f/xnjwebyb", {
				method: "POST",
				body: data,
				headers: { Accept: "application/json" },
			})
			if (res.ok) {
				setStatus("success")
				form.reset()
			} else {
				setStatus("error")
			}
		} catch {
			setStatus("error")
		}
	}

	return (
		<main className="container" style={{ minHeight: "70dvh" }}>
			<div className="page-head">
				<Reveal as="h1" lines className="display-lg">
					Let&rsquo;s talk
				</Reveal>
				<Reveal delay={0.2}>
					<p className="body-lg muted" style={{ marginTop: 20, maxWidth: "44ch" }}>
						Whether you have a role, a project, or just want to connect, I&rsquo;m always happy to chat.
						Or email me directly at{" "}
						<a href="mailto:f.lin@berkeley.edu" className="link-underline" style={{ color: "var(--ink)" }}>
							f.lin@berkeley.edu
						</a>
						.
					</p>
				</Reveal>
			</div>

			<Reveal delay={0.1}>
				<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 560, paddingBottom: "clamp(96px, 12vw, 176px)" }}>
					<div className="field">
						<label htmlFor="contact-name">Name</label>
						<input id="contact-name" type="text" name="name" autoComplete="name" required />
					</div>
					<div className="field">
						<label htmlFor="contact-email">Email</label>
						<input id="contact-email" type="email" name="email" autoComplete="email" required />
					</div>
					<div className="field">
						<label htmlFor="contact-message">Message</label>
						<textarea id="contact-message" name="message" rows={6} required style={{ resize: "vertical" }} />
					</div>

					<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
						<Magnetic>
							<button type="submit" className="btn btn-dark" disabled={status === "sending"} style={{ opacity: status === "sending" ? 0.7 : 1 }}>
								{status === "sending" ? "Sending" : "Send message"}
							</button>
						</Magnetic>
						{status === "success" && <p style={{ fontSize: 14, color: "var(--mint-ink)" }}>Thanks! I&rsquo;ll get back to you soon.</p>}
						{status === "error" && (
							<p style={{ fontSize: 14, color: "#8d3b2f" }}>
								Something went wrong. Email me at{" "}
								<a href="mailto:f.lin@berkeley.edu" className="link-underline">
									f.lin@berkeley.edu
								</a>
							</p>
						)}
					</div>
				</form>
			</Reveal>
		</main>
	)
}
