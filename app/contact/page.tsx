export default function Contact() {
	return (
		<main style={{ maxWidth: "900px", margin: "0 auto", padding: "144px 48px 120px" }}>

			<p style={{
				fontSize: "11px",
				fontWeight: 500,
				letterSpacing: "0.14em",
				textTransform: "uppercase",
				color: "var(--text-muted)",
				marginBottom: "12px",
			}}>
				Contact
			</p>

			<h1 style={{
				fontFamily: "var(--font-cormorant)",
				fontSize: "68px",
				fontWeight: 600,
				lineHeight: 1.05,
				marginBottom: "16px",
			}}>
				Let&apos;s talk.
			</h1>
			<p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: "48px" }}>
				Whether you have a role, a project, or just want to connect,<br />
				I&apos;m always happy to chat.
			</p>
			<form style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
					<label style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-muted)" }}>Name</label>
					<input
						type="text"
						name="name"
						placeholder="Your name"
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
					style={{
						padding: "13px 28px",
						borderRadius: "100px",
						border: "none",
						background: "linear-gradient(135deg,#8B6FD4,#D4609C)",
						color: "#fff",
						fontSize: "14px",
						fontWeight: 500,
						cursor: "pointer",
						alignSelf: "flex-start",
					}}
				>
					Send →
				</button>
			</form>
		</main>
	)
}