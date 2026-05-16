export default function Contact() {
	return (
		<main>
			<h1>Contact</h1>
			<p>Whether you have a role, a project, or just want to connect, I&apos;m always happy to chat.</p>
			<form>
				<div>
					<label>Name</label>
					<input type="text" name="name" placeholder="Your name" />
				</div>
				<div>
					<label>Email</label>
					<input type="email" name="email" placeholder="Your email" />
				</div>
				<div>
					<label>Message</label>
					<textarea name="message" placeholder="Your message" rows={5} />
				</div>
				<button type="submit">Send</button>
			</form>
		</main>
	)
}