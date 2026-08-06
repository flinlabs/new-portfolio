export type Project = {
	slug: string
	title: string
	subtitle?: string
	location?: string
	tag: string
	period: string
	summary: string
	overview: string
	problem: string
	approach: string[]
	outcomes: string[]
	tech: string
	awards?: string
	links?: { label: string; url: string }[]
	thumbnail?: string
	images?: string[]
}

export const projects: Project[] = [
	{
		slug: "complens",
		title: "CompLens",
		subtitle: "Address in, rent comp memo out",
		location: "Berkeley, CA",
		tag: "AI · Product · Real Estate",
		period: "Jul 2026 – Present",
		summary: "A rent comp tool I'm building solo: type any address and get a structured comp memo — nearby multifamily properties ranked by rent per square foot, Census demographics, and a map view.",
		overview: "CompLens turns the slowest part of underwriting a multifamily deal (pulling comps by hand) into a single search. You type an address, and it returns a structured comp memo: nearby multifamily properties ranked by rent per square foot, demographic context from the Census, and everything plotted on a map.\n\nI'm building it solo, full stack, end to end. The interesting part is the data: instead of leaning on listing aggregators, a two-model Claude pipeline sources asking rents from official property leasing sites first, so the comps reflect what landlords are actually quoting.",
		problem: "Pulling rent comps is manual and scattered: aggregator data is stale or padded with fees, official leasing sites all present pricing differently, and analysts end up stitching together screenshots and spreadsheets for every address they underwrite.",
		approach: [
			"Built the product solo, full stack: React + Vite frontend deployed on Vercel, Supabase for auth and Postgres.",
			"Integrated Google Maps APIs for geocoding, nearby-property discovery, and the map view.",
			"Designed a two-model Claude pipeline that prioritizes official property leasing sites over aggregators when sourcing asking rents.",
			"Layered in Census demographics so each memo carries neighborhood context, not just rent figures.",
		],
		outcomes: [
			"One search produces a structured comp memo that used to take an afternoon of manual pulls.",
			"Comps ranked by rent per square foot with source-aware provenance for each figure.",
			"Live and iterating — currently expanding coverage and memo depth.",
		],
		tech: "React, Vite, Vercel, Supabase (auth + Postgres), Google Maps APIs, Claude (two-model pipeline).",
		links: [
			{ label: "complens-ai.vercel.app", url: "https://complens-ai.vercel.app/" },
		],
		thumbnail: "/complens-logo.png",
		images: ["/complens-app.png", "/complens-comps.png", "/complens-neighborhood.png"],
	},
	{
		slug: "lease-intelligence",
		title: "Lease Intelligence",
		subtitle: "Self-serve Q&A over 880 commercial leases",
		location: "Empire State Realty Trust, New York, NY",
		tag: "AI · Product · Real Estate",
		period: "Jun – Aug 2026",
		summary: "An internal lease Q&A platform prototyped at ESRT: ask a question about any lease and get a cited answer, plus a dashboard for LOC expirations, rent steps, and renewals. Try the sandbox demo below.",
		overview: "Lease teams at ESRT answered lease questions the slow way: find the lease, read the lease, ask legal to confirm. Lease Intelligence is the prototype I built to make that self-serve — ask a question in plain English about any of 880 leases and get an answer with citations back to the source document.\n\nIt has two halves. Ask is the conversational side: Claude synthesizes cited answers over abstracts produced by Harvey-managed retrieval. Dashboard is the structured side: letter-of-credit expirations, rent steps, renewal windows, and options surfaced across the portfolio, with a browsable abstract for every lease.\n\nI presented the prototype and its cost case to company leadership at the end of the summer.",
		problem: "Two manual workflows ate the team's time: producing lease abstracts (reading and summarizing every executed lease) and answering one-off lease questions that each required pulling the underlying document. Neither scaled across an 880-lease portfolio.",
		approach: [
			"Automated abstraction with Harvey Agents and Playbooks: RAG-based narrative abstracts plus tabular abstracts verified against Yardi, cutting abstraction time roughly in half.",
			"Built Ask: a conversational interface where Claude synthesizes answers over Harvey retrieval, with citations back to the exact lease language.",
			"Built Dashboard: portfolio-wide views of LOC expirations, rent steps, renewals, and options, plus a per-lease abstract browser.",
			"Shipped the prototype as a FastAPI + React app on Azure App Service behind Entra ID single sign-on.",
		],
		outcomes: [
			"Modeled an 86% licensing-cost reduction versus per-seat Harvey licenses ($227.3K vs $4.9–32.8K per year).",
			"Cut lease abstraction time by roughly 50% with Harvey automations.",
			"Covered all 880 leases in the portfolio with searchable, cited abstracts.",
			"Presented the prototype and rollout plan to company leadership.",
		],
		tech: "Claude (Anthropic API), Harvey Agents + Playbooks, FastAPI, React, Azure App Service, Entra ID, Yardi.",
		thumbnail: "/lease-intelligence-logo.png",
		images: ["/lease-intelligence-app.png"],
	},
	{
		slug: "morimens-team-builder",
		title: "Morimens Team Builder",
		subtitle: "A fan-made team optimizer for a gacha deck-building RPG",
		tag: "Engineering · Product · Games",
		period: "2026",
		summary: "An unofficial team builder for Morimens: record your roster and a deterministic engine generates optimized, fully-geared teams — including five-team D-Tide lineups that share no units.",
		overview: "Morimens Team Builder is a fan project for the gacha deck-building RPG Morimens. You record what you own — Awakeners, Wheels of Destiny, Covenants, Posses, your Keeper level, down to enlighten and skill levels — and the app builds optimized, fully-geared teams from your actual roster, then lets you fine-tune them on an in-game-style lineup board.\n\nThe generation is deliberately AI-free: a deterministic engine ranks and gears every team, so the same roster always produces the same answer. Skill cards show real command-card values resolved against character level from the game's own data tables, and gear picks come from the community's best-in-slot tables with role-aware variants — the same unit slotted as a carry pulls its DPS set, as a support pulls its support set.",
		problem: "Assembling one geared team is easy; assembling five D-Tide teams that share no units or wheels, from what you actually own, is a combinatorial headache players solve with spreadsheets and guesswork.",
		approach: [
			"Built full inventory management with real investment detail: enlighten levels, skill and talent levels, wheel stars and stacks, covenant completion, Keeper level.",
			"Wrote a deterministic generation engine with two modes: Single Team (a working lineup plus alternates) and D-Tide ×5 (five teams with zero shared units or wheels).",
			"Added build-around-pins: place and pin characters by hand, and generation builds the rest of the team around them.",
			"Computed real in-game numbers from the game-data tables, and sourced wheel and covenant picks from the community Mythag Compendium best-in-slot tables with role-aware build variants.",
		],
		outcomes: [
			"Every slot is editable on an in-game-style lineup board, backed by your owned inventory.",
			"Same roster in, same optimized answer out — no LLM in the loop, fully reproducible.",
			"Data and assets sync from community databases via Node scripts.",
		],
		tech: "Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Zustand (persisted to localStorage), Node data-sync scripts.",
		links: [
			{ label: "GitHub", url: "https://github.com/flinlabs/morimens-team-builder" },
		],
	},
	{
		slug: "candi",
		title: "CANDI",
		subtitle: "Candidate Analysis & Discovery Intelligence",
		location: "Shanghai, China",
		tag: "AI · Product · Engineering",
		period: "Jun – Aug 2025",
		summary: "An AI-powered recruiting toolkit: a low-code recruiter workspace built at CGP Group, plus a Chrome extension that scores any LinkedIn profile against a job description in real time.",
		overview: "CANDI started as an internal recruiter workspace built during my CGP Group internship in Shanghai, and grew into a two-part toolkit for smarter hiring.\n\nThe first part is a Glide + Airtable app that compresses the most time-consuming recruiting tasks (requirements capture, candidate scoring, interview insights, and report generation) into a single workflow. The second part is a Chrome extension I built afterward that lets anyone paste a job description, open a LinkedIn profile, and instantly get an AI-generated match score with a plain-English explanation of fit and gaps.",
		problem: "Recruiters were drowning in fragmented tools: requirements captured inconsistently, screening notes built manually in Sheets, data entered redundantly into the ATS, and status updates scattered across chats and emails.",
		approach: [
			"Shadowed recruiters and mapped the end-to-end workflow: sourcing → screening → notes → HM report → ATS entry.",
			"Built the CANDI Glide + Airtable MVP with AI prompt packs for criteria extraction, per-criterion scoring, and report generation.",
			"Piloted with Singapore and Vietnam recruiting teams on live roles; iterated on UI/UX and outputs based on real usage.",
			"Designed and built a Chrome extension that reads the active LinkedIn profile, accepts a job description as text input, and returns a structured match score with reasoning.",
		],
		outcomes: [
			"Screening time per candidate reduced from ~25–30 min to ~12–15 min.",
			"Hiring-manager report prep dropped from ~45–60 min to ~10–15 min.",
			"Chrome extension enables real-time candidate evaluation directly on LinkedIn, with no context switching.",
			"Single source of truth for requirements across the recruiting team.",
		],
		tech: "Glide, Airtable, Glue, Claude, Chrome Extensions.",
		links: [
			{ label: "Chrome Extension (GitHub)", url: "https://github.com/flinlabs/candi-recruitment-extension" },
		],
		thumbnail: "/candi-logo.png",
		images: ["/candi-app.png"],
	},
	{
		slug: "walsea",
		title: "WAL-SEA",
		subtitle: "A Homebuilt, Multifunctional ROV for Near-Shore Ecosystems",
		location: "Del Monte Beach & Tanker's Reef, Monterey Bay, CA",
		tag: "Engineering · Environmental · Science",
		period: "2021 – 2024",
		summary: "A multifunctional underwater robot I designed, built, and field-tested over three years to combat kelp forest collapse. 4x faster than diver surveys. ISEF finalist, published in IEEE Xplore.",
		overview: "WAL-SEA is a homebuilt, multifunctional remotely operated vehicle designed to combat kelp forest collapse caused by unchecked purple sea urchin populations. Existing diver-led culling is costly, slow, and unscalable, so I set out to build a modular ROV that could both survey and actively remove urchins with far greater efficiency.\n\nOver two years I designed, built, and field-tested WAL-SEA through four major development phases: initial beta prototypes, a main ROV platform, mission-specific modules, and full assembly and deployment.",
		problem: "88.3% of kelp forests in Monterey Bay are collapsing due to overpopulated purple sea urchins, a cascading crisis triggered by sea star wasting disease and marine heatwaves. Diver-only culling is too slow, too costly, and too limited to scale.",
		approach: [
			"Designed four prototype phases: beta → main platform → mission modules → full assembly.",
			"Solved water intrusion with compression-fit cable penetrators; optimized buoyancy using high-density foam and ballast weights.",
			"Built two modular attachments: a survey module (4K/30fps, dimmable subsea lighting) and a vacuum module (stainless scraper, tilting thruster, collection net).",
			"Conducted 7 ocean deployments at Del Monte Beach across varying surge, depth, and visibility conditions.",
		],
		outcomes: [
			"10x survey speed and 6x efficiency: 1 acre in ~20 minutes vs. 75 minutes for divers.",
			"Reliable 40–60 ft operating envelope with hour-long missions and 4K footage.",
			"Vacuum module successfully scraped and collected multiple urchins per pass.",
			"Generated urchin density maps from overlapping survey transects for targeted restoration.",
		],
		tech: "SolidWorks, Arduino, Pixhawk, Raspberry Pi, Handbuilt ROV.",
		awards: "ACSEF Grand Award winner · ISEF Finalist · Regeneron STS Top 300 Scholar · Published in IEEE Xplore",
		links: [
			{ label: "Research Paper", url: "https://ieeexplore.ieee.org/document/10347506" },
		],
		images: ["/walsea-rov.jpg"],
	},
	{
		slug: "urchin-camera",
		title: "In Situ Urchin Behavior Study",
		subtitle: "Self-Built Underwater Camera System for Continuous Monitoring",
		location: "San Carlos Beach & Lovers Point, Monterey Bay, CA",
		tag: "Science · Environmental · Engineering",
		period: "2018 – 2019",
		summary: "Built a low-cost underwater camera rig as a middle schooler and ran 48-hour observation sessions to study purple urchin behavior. ACSEF first place, Broadcom MASTERS Top 300.",
		overview: "This project began with a pressing ecological question: how fast are purple urchins repopulating once removed, and how does their behavior vary by light, food, and time of day? Commercial monitoring systems like MBARI's SeeStar cost $2,500+ and were designed for deep-sea use, not small-scale coastal research. So I built my own.\n\nOver three design phases, I developed a modular rig of PVC piping and cameras with custom housings and extended battery packs, achieving long-duration recording at 30–54 ft depth under real ocean conditions.",
		problem: "Kelp forests were collapsing after sea star wasting disease and marine heatwaves fueled a purple urchin population explosion. No affordable, continuous, in situ system existed to measure urchin movement or repopulation at shallow coastal depths.",
		approach: [
			"Phase I: Simple PVC frame + Olympus TG-4 with strobe, achieving 16-hour overnight timelapse but limited by shot count.",
			"Phase II: Custom 6\" PVC housing with polycarbonate discs and external battery packs. Solved battery life but too bulky to deploy easily.",
			"Phase III: Streamlined rig with GoPro Hero 7s and hybrid Olympus setup; compact anchoring; recorded at 0.5s intervals day, 2-minute intervals night.",
		],
		outcomes: [
			"Achieved 16–48 hours of continuous recording at 30–54 ft depths.",
			"Quantified that urchins move only inches every 10 minutes, primarily repopulating from rocky crevices.",
			"Confirmed nocturnal movement patterns and light avoidance behavior.",
			"Observed that movement does not equal eating: urchins moved at night but did not always consume kelp proportionally.",
		],
		tech: "Olympus TG-4 + Inon D-2000 strobe, GoPro Hero 3/7, DBPower 4K action camera, custom PVC frame.",
		awards: "ACSEF First Place · NASA + NOAA Special Awards · Broadcom MASTERS Top 300",
		links: [
			{ label: "See Abstract", url: "https://docs.google.com/document/d/1Fm0MtHLB4b5l-ydHrzrUPMOUSWRXsZChAUHnEgSGvBY/edit?usp=drivesdk" },
		],
		images: ["/urchin-camera.jpg"],
	},
]
