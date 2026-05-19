export type Experience = {
	slug: string
	title: string
	company: string
	tag: string
	period: string
	summary: string
	overview: string
	responsibilities: string[]
	achievements: string[]
	website?: string
	websiteLabel?: string
	logo?: string
}

export const experiences: Experience[] = [
	{
		slug: "skydeck",
		logo: "/skydeck-logo.png",
		title: "Product & Engineering Intern",
		company: "Berkeley SkyDeck Funded Startup",
		tag: "Product · AI · Engineering · Finance · Real Estate",
		period: "Jan 2025 – Present",
		summary: "Building commercial real estate transaction tools at a SkyDeck-funded startup, defining product requirements and working with the engineering team to ship them.",
		overview: "I'm currently interning at a Berkeley SkyDeck-funded startup working on commercial real estate transaction development. My role spans product and engineering: I help define what gets built and work directly with the team to build it. I translate customer workflows into product specifications, then stay involved through execution to make sure what ships matches what was needed.",
		responsibilities: [
			"Drive commercial real estate transaction product development.",
			"Translate customer workflows into product specifications for engineering.",
			"Collaborate across product and engineering to ship features.",
		],
		achievements: [
			"Embedded in a fast-moving early-stage startup environment at Berkeley SkyDeck.",
			"Working directly on customer problems at an early-stage startup from day one.",
		],
	},
	{
		slug: "cgp",
		logo: "/cgp-logo.png",
		title: "Talent Acquisition & Data Insights Intern",
		company: "Cornerstone Global Partners (CGP Group)",
		tag: "AI · Product · Engineering",
		period: "Jun – Aug 2025",
		summary: "Led candidate sourcing across Southeast Asia and built CANDI, an AI-powered recruiting platform that cut screening time by up to 50%.",
		overview: "As part of CGP Group's GLINT Summer Global Internship in Shanghai, I owned the talent sourcing and screening pipeline for multiple roles across Southeast Asia, qualifying 40+ candidates every week. I partnered closely with the recruiting and data science teams to improve internal tools and workflows. The biggest thing I built was CANDI: an AI-powered candidate insights platform that parses interview transcripts, tracks objections, scores profiles, and generates hiring-manager-ready reports.",
		responsibilities: [
			"Managed end-to-end candidate pipeline across multiple SEA markets.",
			"Conducted screening calls assessing qualifications, fit, and readiness.",
			"Collaborated with the data science team to improve tool usage and processes.",
			"Designed and tested AI-driven workflows for candidate scoring and transcript parsing.",
			"Programmed a browser extension that matches candidates to job descriptions in real time.",
		],
		achievements: [
			"Sourced and evaluated 40+ candidates weekly across high-demand sectors.",
			"Built CANDI MVP, projected to cut manual screening time by up to 50%.",
			"Reduced hiring-manager report prep from ~45–60 min to ~10–15 min.",
			"Standardized note-taking across recruiters through automated parsing.",
		],
		website: "https://linkedin.com/company/cgp-group",
		websiteLabel: "CGP's LinkedIn",
	},
	{
		slug: "link-multifamily",
		logo: "/link-logo.png",
		title: "Real Estate Acquisition & Portfolio Management Intern",
		company: "Link Multifamily, LLC",
		tag: "Finance · Real Estate",
		period: "Summer 2024",
		summary: "Underwrote multifamily acquisitions and audited a $100M+ portfolio; the analyses fed directly into go/no-go investment decisions.",
		overview: "I interned with Link Multifamily focusing on acquisition due diligence and portfolio oversight. I built financial models for potential acquisitions, evaluating trailing 12-month financials, rent rolls, loan terms, renovation budgets, and CapEx schedules to assess investment viability. For existing assets, I performed monthly audits reconciling the ResMan ledger against bank statements, calculating economic vacancy, and identifying variance drivers.",
		responsibilities: [
			"Built and maintained detailed financial models for acquisition targets.",
			"Underwrote multifamily deals through T12 financials, rent roll, and pro-forma analysis.",
			"Performed monthly financial audits across a $100M+ portfolio.",
			"Reconciled bank statements, identified variance drivers, and flagged inefficiencies.",
			"Prepared concise audit reports and presented findings to senior leadership.",
		],
		achievements: [
			"Analysis fed directly into acquisition committee decisions.",
			"Improved financial oversight of a portfolio exceeding $100M in asset value.",
			"Strengthened audit processes, ensuring consistency and accuracy in reporting.",
		],
		website: "https://linkmultifamily.com",
		websiteLabel: "Link Multifamily's Website",
	},
	{
		slug: "loeb",
		logo: "/loeb-logo.png",
		title: "NextGen Venture Strategy & Angel Investor Intern",
		company: "Loeb.nyc",
		tag: "Finance",
		period: "Dec 2024",
		summary: "Evaluated seven early-stage startups through structured due diligence and made two personal angel investments of $5,000 each.",
		overview: "I was selected for Loeb.nyc's NextGen Venture Strategy & Angel Investor mentorship program, a hands-on experience covering angel investing, venture capital, and startup funding dynamics within a family office ecosystem. I engaged directly with founders, VCs, and Loeb.nyc leadership to evaluate early-stage startups across consumer, AI, and tech sectors.",
		responsibilities: [
			"Conducted due diligence on seven early-stage startups.",
			"Analyzed unit economics, market sizing, and valuation benchmarks.",
			"Assessed founder-market fit, scaling potential, and exit strategies.",
			"Collaborated on portfolio diversification and risk management discussions.",
		],
		achievements: [
			"Personally invested $5,000 each into Shoplift and Spaceport.",
			"Built foundational skills in startup analysis and venture funding decision-making.",
			"Developed lasting connections with founders and investors in the NextGen cohort.",
			"Made personal angel investments in Shoplift and Spaceport based on analyzing their go-to-market strategies.",
		],
		website: "https://loeb.nyc",
		websiteLabel: "Loeb.nyc's Website",
	},
	{
		slug: "doer-marine",
		logo: "/doer-logo.png",
		title: "Engineering Intern",
		company: "DOER Marine",
		tag: "Engineering · Environmental · Science",
		period: "Jun 2022 – Aug 2023",
		summary: "Contributed to the SWAD Lanternfish submersible using SolidWorks CAD and helped ready equipment for Dr. Sylvia Earle's Mission Blue Galapagos expedition.",
		overview: "I interned with DOER Marine, a pioneer in deep-sea vehicle design, contributing to the engineering, logistics, and operational readiness of the SWAD Lanternfish submersible. I redesigned valve extensions and frame screw-hole placements in SolidWorks to improve assembly efficiency and diver safety, and built an automated fastener tracking system in Excel to reduce inventory errors.",
		responsibilities: [
			"Applied SolidWorks CAD to optimize hardware component design.",
			"Automated fastener inventory tracking using Excel pivot tables.",
			"Authored detailed operational protocols for dive safety and maintenance.",
			"Inventoried and prepared equipment for international expedition shipment.",
		],
		achievements: [
			"Improved part accessibility and reduced maintenance turnaround for the Lanternfish.",
			"Enhanced logistics efficiency with automated tracking, reducing manual errors.",
			"Supported safe, timely deployment for a globally recognized conservation mission.",
		],
		website: "https://doermarine.com",
		websiteLabel: "DOER's Website",
	},
	{
		slug: "aquameridian",
		logo: "/aquameridian-logo.png",
		title: "Founder & Executive Director (U.S. Chapter)",
		company: "AquaMeridian US",
		tag: "Environmental · Science",
		period: "Jun 2022 – Present",
		summary: "Founded the U.S. chapter of an international marine conservation nonprofit. Lead monthly beach cleanups and education programs engaging 300+ students and community members.",
		overview: "I established the U.S. chapter of AquaMeridian, an international marine conservation initiative, to expand outreach, education, and direct-action environmental projects. I designed and ran programs that combined community engagement with measurable conservation outcomes, from speaker panels in schools and libraries to large-scale beach cleanups. I also built the organization's funding infrastructure from scratch, developing a sponsorship strategy that secured $8,500+ from corporate and individual partners including Apple East Bay.",
		responsibilities: [
			"Directed strategic planning, fundraising, and operational management for U.S. chapter.",
			"Organized 10 large-scale beach cleanups with 150+ volunteers.",
			"Hosted environmental education panels reaching 200+ students.",
			"Managed volunteer recruitment, training, and retention.",
			"Recruited and mentored a 12-member student leadership team.",
		],
		achievements: [
			"Raised $8,500+ from corporate partners (including Apple East Bay) and individual donors.",
			"Collected 2,000+ lbs of marine debris, submitted to global ocean health databases.",
			"Built a sustainable organizational structure with student leadership succession planning.",
			"Built a student leadership pipeline with 12 members who continued operations independently.",
		],
		website: "https://aquameridian.org",
		websiteLabel: "AquaMeridian's Website",
	},
]