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
		awards: "ACSEF First Place · Broadcom MASTERS Top 300",
		links: [
			{ label: "See Abstract", url: "https://docs.google.com/document/d/1Fm0MtHLB4b5l-ydHrzrUPMOUSWRXsZChAUHnEgSGvBY/edit?usp=drivesdk" },
		],
		images: ["/urchin-camera.jpg"],
	},
]