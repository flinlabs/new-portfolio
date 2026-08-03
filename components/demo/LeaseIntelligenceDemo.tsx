"use client"
import { useEffect, useRef, useState } from "react"

/* Sandbox demo of Lease Intelligence. Every tenant, address, and figure
   below is fabricated for the demo — no real portfolio data. */

type Lease = {
	id: string
	name: string
	tenant: string
	premises: string
	rsf: string
	rent: string
	expiry: string
	color: string
	inkColor: string
	flags: string[]
	abstract: { label: string; value: string }[]
}

const leases: Lease[] = [
	{
		id: "L-001",
		name: "Lease 1",
		tenant: "Harborview Books LLC",
		premises: "120 Harbor Lane, Suite 210",
		rsf: "4,850 RSF",
		rent: "$18,590 / mo",
		expiry: "Aug 31, 2029",
		color: "var(--lav)",
		inkColor: "var(--lav-ink)",
		flags: ["LOC on file"],
		abstract: [
			{ label: "Parties", value: "Harborview Books LLC (Tenant); Meridian Property Owner LLC (Landlord)" },
			{ label: "Premises", value: "Suite 210, 120 Harbor Lane — 4,850 rentable square feet, second floor" },
			{ label: "Term", value: "84 months, commencing Sep 1, 2022 and expiring Aug 31, 2029" },
			{ label: "Base rent", value: "$46.00/RSF/yr ($18,590/mo), fixed for the full term" },
			{ label: "Security", value: "Letter of credit, $95,000, expiring Mar 31, 2027 — renewal notice due 60 days prior" },
			{ label: "Options", value: "None" },
		],
	},
	{
		id: "L-002",
		name: "Lease 2",
		tenant: "Cobalt Fitness Group",
		premises: "48 Meridian Avenue, Floors 1–2",
		rsf: "12,400 RSF",
		rent: "$41,200 / mo",
		expiry: "Jan 31, 2031",
		color: "var(--powder)",
		inkColor: "var(--powder-ink)",
		flags: ["Rent steps", "ROFO"],
		abstract: [
			{ label: "Parties", value: "Cobalt Fitness Group Inc. (Tenant); Meridian Property Owner LLC (Landlord)" },
			{ label: "Premises", value: "Floors 1–2, 48 Meridian Avenue — 12,400 rentable square feet" },
			{ label: "Term", value: "120 months, commencing Feb 1, 2021 and expiring Jan 31, 2031" },
			{ label: "Base rent", value: "$39.87/RSF/yr ($41,200/mo) with $2.00/RSF step increases every 24 months" },
			{ label: "Security", value: "Cash deposit, three months' rent" },
			{ label: "Options", value: "Right of first offer (ROFO) on contiguous ground-floor space; exercisable within 15 business days of landlord notice" },
		],
	},
	{
		id: "L-003",
		name: "Lease 3",
		tenant: "Juniper & Co. Café",
		premises: "5 Foundry Street, Ground Floor",
		rsf: "2,150 RSF",
		rent: "$9,875 / mo",
		expiry: "Nov 30, 2027",
		color: "var(--mint)",
		inkColor: "var(--mint-ink)",
		flags: ["LOC expiring soon", "Termination option"],
		abstract: [
			{ label: "Parties", value: "Juniper & Co. Café LLC (Tenant); Foundry Street Holdings LLC (Landlord)" },
			{ label: "Premises", value: "Ground floor retail, 5 Foundry Street — 2,150 rentable square feet plus sidewalk seating license" },
			{ label: "Term", value: "60 months, commencing Dec 1, 2022 and expiring Nov 30, 2027" },
			{ label: "Base rent", value: "$55.12/RSF/yr ($9,875/mo), with annual CPI escalation capped at 3%" },
			{ label: "Security", value: "Letter of credit, $40,000, expiring Dec 15, 2026" },
			{ label: "Options", value: "One-time termination option effective Nov 30, 2025 with 6 months' notice and payment of unamortized TI" },
		],
	},
]

type Source = { lease: string; clause: string; excerpt: string }

type QA = {
	q: string
	a: string
	sources: Source[]
}

const questions: QA[] = [
	{
		q: "Which letters of credit expire in the next 18 months?",
		a: "One letter of credit expires within the next 18 months. Juniper & Co. Café (Lease 3) holds a $40,000 LOC expiring Dec 15, 2026. Harborview Books (Lease 1) carries a $95,000 LOC, but it runs to Mar 31, 2027 — just outside the window — with a renewal notice due 60 days prior. Cobalt Fitness (Lease 2) posted a cash deposit instead, so no LOC applies.",
		sources: [
			{ lease: "Lease 3 — Juniper & Co. Café", clause: "§6.2 Security", excerpt: "Tenant shall maintain an irrevocable letter of credit in the amount of $40,000, expiring December 15, 2026…" },
			{ lease: "Lease 1 — Harborview Books LLC", clause: "§5.4 Letter of Credit", excerpt: "…in the amount of $95,000, to remain in effect through March 31, 2027. Tenant shall deliver evidence of renewal no later than sixty (60) days prior…" },
		],
	},
	{
		q: "What are the rent steps for Cobalt Fitness?",
		a: "Cobalt Fitness Group (Lease 2) pays base rent of $39.87/RSF per year ($41,200/mo) with fixed step increases of $2.00/RSF every 24 months over the 120-month term. The next scheduled step lands on Feb 1, 2027, bringing base rent to $43.87/RSF.",
		sources: [
			{ lease: "Lease 2 — Cobalt Fitness Group", clause: "§4.1 Base Rent; Schedule B", excerpt: "Base Rent shall increase by Two Dollars ($2.00) per rentable square foot on each twenty-four (24) month anniversary of the Commencement Date…" },
		],
	},
	{
		q: "Do any tenants hold renewal, offer, or termination options?",
		a: "Two of the three leases carry options. Cobalt Fitness (Lease 2) holds a right of first offer on the contiguous ground-floor space, exercisable within 15 business days of landlord notice. Juniper & Co. Café (Lease 3) holds a one-time termination option effective Nov 30, 2025, requiring 6 months' notice and repayment of unamortized tenant improvements. Harborview Books (Lease 1) has no options.",
		sources: [
			{ lease: "Lease 2 — Cobalt Fitness Group", clause: "§28 Right of First Offer", excerpt: "Tenant shall have a one-time right of first offer with respect to the contiguous ground floor premises…" },
			{ lease: "Lease 3 — Juniper & Co. Café", clause: "§27.3 Termination Option", excerpt: "Tenant may terminate this Lease effective November 30, 2025 upon not less than six (6) months' prior written notice…" },
		],
	},
]

export default function LeaseIntelligenceDemo() {
	const [tab, setTab] = useState<"ask" | "dashboard">("ask")
	const [activeQ, setActiveQ] = useState<number | null>(null)
	const [phase, setPhase] = useState<"idle" | "thinking" | "done">("idle")
	const [openLease, setOpenLease] = useState<string | null>(null)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

	useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

	const ask = (i: number) => {
		if (timer.current) clearTimeout(timer.current)
		setActiveQ(i)
		setPhase("thinking")
		timer.current = setTimeout(() => setPhase("done"), 850)
	}

	const qa = activeQ === null ? null : questions[activeQ]

	return (
		<div className="lid" aria-label="Lease Intelligence sandbox demo">
			<div className="lid-bar">
				<span className="lid-brand">
					<span className="lid-brand-dot" aria-hidden="true" />
					Lease Intelligence
				</span>
				<div className="lid-tabs" role="tablist" aria-label="Demo sections">
					<button role="tab" aria-selected={tab === "ask"} className={tab === "ask" ? "is-active" : ""} onClick={() => setTab("ask")}>
						Ask
					</button>
					<button role="tab" aria-selected={tab === "dashboard"} className={tab === "dashboard" ? "is-active" : ""} onClick={() => setTab("dashboard")}>
						Dashboard
					</button>
				</div>
				<span className="lid-badge">sandbox demo · dummy data</span>
			</div>

			{tab === "ask" && (
				<div className="lid-body">
					<p className="lid-hint">
						The real tool answers free-text questions across 880 leases. This sandbox runs on three fictional
						leases — pick a question to see how a cited answer comes back.
					</p>
					<div className="lid-chips">
						{questions.map((item, i) => (
							<button key={item.q} className={`lid-chip ${activeQ === i ? "is-active" : ""}`} onClick={() => ask(i)}>
								{item.q}
							</button>
						))}
					</div>

					{activeQ !== null && (
						<div className="lid-thread" key={activeQ}>
							<div className="lid-msg lid-msg-user">
								<span className="lid-msg-who">You</span>
								<p>{qa!.q}</p>
							</div>
							{phase === "thinking" ? (
								<div className="lid-msg lid-msg-ai">
									<span className="lid-msg-who">Lease Intelligence</span>
									<p className="lid-thinking" aria-live="polite">
										Reading abstracts<span>.</span><span>.</span><span>.</span>
									</p>
								</div>
							) : (
								<div className="lid-msg lid-msg-ai">
									<span className="lid-msg-who">Lease Intelligence</span>
									<p>{qa!.a}</p>
									<div className="lid-sources">
										<span className="lid-sources-label">Sources</span>
										{qa!.sources.map(s => (
											<div key={s.clause + s.lease} className="lid-source">
												<span className="lid-source-ref">
													{s.lease} · {s.clause}
												</span>
												<p>&ldquo;{s.excerpt}&rdquo;</p>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			)}

			{tab === "dashboard" && (
				<div className="lid-body">
					<div className="lid-stats">
						<div className="lid-stat">
							<span className="lid-stat-num">3</span>
							<span className="lid-stat-label">Leases</span>
						</div>
						<div className="lid-stat">
							<span className="lid-stat-num">19,400</span>
							<span className="lid-stat-label">Total RSF</span>
						</div>
						<div className="lid-stat">
							<span className="lid-stat-num">$69.7K</span>
							<span className="lid-stat-label">Monthly rent</span>
						</div>
						<div className="lid-stat">
							<span className="lid-stat-num">1</span>
							<span className="lid-stat-label">LOC expiring &lt; 18 mo</span>
						</div>
					</div>

					<div className="lid-table" role="list">
						{leases.map(lease => {
							const open = openLease === lease.id
							return (
								<div key={lease.id} role="listitem" className={`lid-row ${open ? "is-open" : ""}`}>
									<button
										className="lid-row-head"
										aria-expanded={open}
										onClick={() => setOpenLease(open ? null : lease.id)}
									>
										<span className="lid-row-id" style={{ background: lease.color, color: lease.inkColor }}>
											{lease.name}
										</span>
										<span className="lid-row-main">
											<span className="lid-row-tenant">{lease.tenant}</span>
											<span className="lid-row-premises">{lease.premises}</span>
										</span>
										<span className="lid-row-figures">
											<span>{lease.rsf}</span>
											<span>{lease.rent}</span>
											<span>exp {lease.expiry}</span>
										</span>
										<span className="lid-row-flags">
											{lease.flags.map(f => (
												<span key={f} className="lid-flag" style={{ background: lease.color, color: lease.inkColor }}>
													{f}
												</span>
											))}
										</span>
										<span className="lid-row-caret" aria-hidden="true">{open ? "–" : "+"}</span>
									</button>
									{open && (
										<dl className="lid-abstract">
											{lease.abstract.map(row => (
												<div key={row.label} className="lid-abstract-row">
													<dt>{row.label}</dt>
													<dd>{row.value}</dd>
												</div>
											))}
										</dl>
									)}
								</div>
							)
						})}
					</div>
				</div>
			)}

			<div className="lid-foot">
				All tenants, addresses, and figures above are fabricated for this demo. The production tool runs on
				ESRT&rsquo;s real portfolio behind Entra ID.
			</div>
		</div>
	)
}
