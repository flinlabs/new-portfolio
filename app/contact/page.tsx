"use client"
import { useState } from "react"

export default function Contact() {
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setStatus("sending")
		const form = e.currentTarget
		const data = new FormData(form)

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
	}

	return (
		<main style={{ maxWidth: "900px", margin: "0 auto", padding: "144px 48px 120px" }}>
			<h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "16px",
			}}>
				Let&apos;s <em style={{ fontStyle: "italic", background: "linear-gradient(135deg,#9B87D4,#D4A0C0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>talk</em>
			</h1>

			<p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "48px" }}>
				Whether you have a role, a project, or just want to connect,<br />
				I&apos;m always happy to chat.
			</p>

			<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
					<label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)" }}>Name</label>
					<input
						type="text"
						name="name"
						placeholder="Your name"
						required
						style={{
							padding: "12px 16px",
							borderRadius: "12px",
							border: "1px solid var(--border)",
							background: "var(--bg-card)",
							fontSize: "14px",
							color: "var(--text)",
							outline: "none",
						}}
					/>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
					<label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)" }}>Email</label>
					<input
						type="email"
						name="email"
						placeholder="Your email"
						required
						style={{
							padding: "12px 16px",
							borderRadius: "12px",
							border: "1px solid var(--border)",
							background: "var(--bg-card)",
							fontSize: "14px",
							color: "var(--text)",
							outline: "none",
						}}
					/>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
					<label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)" }}>Message</label>
					<textarea
						name="message"
						placeholder="Your message"
						rows={5}
						required
						style={{
							padding: "12px 16px",
							borderRadius: "12px",
							border: "1px solid var(--border)",
							background: "var(--bg-card)",
							fontSize: "14px",
							color: "var(--text)",
							outline: "none",
							resize: "vertical",
						}}
					/>
				</div>
				<button
					type="submit"
					disabled={status === "sending"}
					style={{
						padding: "13px 28px",
						borderRadius: "100px",
						border: "none",
						background: "linear-gradient(135deg,#8B6FD4,#D4609C)",
						color: "#fff",
						fontSize: "14px",
						fontWeight: 500,
						cursor: status === "sending" ? "not-allowed" : "pointer",
						alignSelf: "flex-start",
						opacity: status === "sending" ? 0.7 : 1,
					}}
				>
					{status === "sending" ? "Sending..." : "Send →"}
				</button>

				{status === "success" && (
					<p style={{ fontSize: "14px", color: "var(--green)" }}>Thanks! I&apos;ll get back to you soon.</p>
				)}
				{status === "error" && (
					<p style={{ fontSize: "14px", color: "#f87171" }}>Something went wrong. Email me directly at f.lin@berkeley.edu</p>
				)}
			</form>

		</main>
	)
}