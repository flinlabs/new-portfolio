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
	skills?: string[]
	website?: string
	websiteLabel?: string
	logo?: string
}

export const experiences: Experience[] = [
	{
		slug: "esrt",
		logo: "/esrt-logo.png",
		title: "AI Tools Intern",
		company: "Empire State Realty Trust (ESRT)",
		tag: "AI · Product · Engineering · Real Estate · Finance",
		period: "Jun – Aug 2026",
		summary: "Built AI tooling for ESRT's lease operations, including Lease Intelligence, a conversational AI tool for querying ESRT's commercial lease terms in plain English.",
		overview: "At Empire State Realty Trust — the owner and operator of the Empire State Building and a broader NYC commercial and residential portfolio — I built AI tools spanning lease administration and natural-language lease search. I built an Excel/VBA Letter of Credit expiry notification system with deduplication logic and automated, building-routed Outlook alerts, and used Harvey AI to generate two types of lease abstracts — RAG-optimized abstracts for semantic retrieval and verbatim abstracts structured for Yardi Voyager data entry. I also designed and built a working prototype of Lease Intelligence, a conversational AI tool giving non-specialist teams across Asset Management, Legal, Finance, and AR direct plain-English access to commercial lease data, layering a Claude (Anthropic API) synthesis engine over Harvey-managed retrieval on a FastAPI + React stack, deployed on Azure App Service and Static Web Apps and secured via Entra ID and Managed Identity within ESRT's Microsoft tenant.",
		responsibilities: [
			"Built an Excel/VBA Letter of Credit expiry notification system with deduplication logic and automated Outlook alerts, deployed team-wide with building-to-email routing and user documentation.",
			"Built Harvey AI Agents and Playbooks generating two abstract types from lease documents: RAG abstracts optimized for semantic retrieval and verbatim abstracts structured for Yardi Voyager data entry.",
			"Designed and built a working prototype of Lease Intelligence, a conversational AI tool for querying ESRT's commercial lease terms in plain English.",
			"Layered a Claude (Anthropic API) synthesis engine over Harvey-managed retrieval, on a FastAPI + React stack deployed to Azure App Service and Static Web Apps, secured via Entra ID and Managed Identity.",
		],
		achievements: [
			"Delivered a working Lease Intelligence prototype giving 50+ employees self-serve access to lease data previously gated behind Lease Administration, covering all 880 leases.",
			"Presented the production architecture (Harvey exports, Informatica ingestion, Azure storage with field-level protection, FastAPI retrieval) and rollout plan to ESRT leadership.",
			"Modeled an 86% licensing-cost reduction versus per-seat Harvey licenses ($227.3K vs $4.9–32.8K per year).",
			"Cut lease abstraction time by roughly 50% with Harvey Agents and Playbooks producing dual-format abstracts for semantic retrieval and Yardi Voyager entry.",
			"Deployed an automated LOC expiry notification system team-wide, cutting up to 2 hours of manual review weekly.",
			"Secured the Lease Intelligence platform end-to-end within ESRT's Microsoft tenant using Entra ID and Managed Identity.",
		],
		skills: ["Harvey AI", "Claude / Anthropic API", "RAG / Retrieval Augmented Generation", "FastAPI", "React", "Microsoft Azure", "Entra ID", "Yardi Voyager", "VBA", "Excel", "Python"],
		website: "https://www.esrtreit.com/",
		websiteLabel: "ESRT's Website",
	},
	{
		slug: "skydeck",
		logo: "/skydeck-logo.png",
		title: "AI Voice Engineering & Product Intern",
		company: "Skyline - Berkeley SkyDeck",
		tag: "AI · Product · Engineering · Real Estate",
		period: "Jan – Mar 2026",
		summary: "Built a real-time AI voice agent for CRE brokers to automate client qualification calls, targeting savings of up to 1.5 hours of call time per day.",
		overview: "At Skyline, a Berkeley SkyDeck-backed startup in commercial real estate, I built a real-time AI voice agent designed to automate introductory client qualification calls for CRE brokers. I owned both the engineering and product sides: defining the STT/LLM/TTS pipeline architecture, evaluating competing voice AI models, and building the React frontend. The system targets 7–10 minute qualification calls and client profile creation, saving brokers up to 1.5 hours of manual call time per day.",
		responsibilities: [
			"Built a real-time AI voice agent pipeline for automated CRE broker qualification calls.",
			"Defined the Speech-to-Text/LLM/TTS architecture and evaluated ElevenLabs, Deepgram, Whisper, and Gemini to inform stack selection.",
			"Developed the React UI frontend with Tailwind CSS and shadcn/ui, implementing Listening, Thinking, and Speaking states.",
			"Owned product requirements and system design from initial scoping through implementation.",
		],
		achievements: [
			"Designed a voice agent system targeting up to 1.5 hours of saved call time per broker per day.",
			"Evaluated four competing voice AI providers to make a data-informed stack selection.",
			"Delivered a full-stack working prototype spanning pipeline architecture and a polished React frontend.",
		],
		skills: ["React", "Tailwind CSS", "TypeScript", "Python", "STT / LLM / TTS pipeline", "ElevenLabs", "Deepgram", "Whisper", "Gemini", "AI product development"],
	},
	{
		slug: "cgp",
		logo: "/cgp-logo.png",
		title: "Data Insights Intern",
		company: "Cornerstone Global Partners (CGP Group)",
		tag: "AI · Product · Engineering",
		period: "Jun – Aug 2025",
		summary: "Built CANDI, an AI-powered candidate insights platform, and a browser extension for real-time job-candidate matching — cutting manual screening overhead for a global recruiting firm.",
		overview: "As part of CGP Group's GLINT Summer Global Internship in Shanghai, I focused on building AI tooling to improve the recruiting and candidate screening process. I built two major products: an AI-powered browser extension that generates real-time match scores between candidates and job descriptions with explanation breakdowns, and CANDI, a full candidate insights platform that automates transcript parsing, objection tracking, candidate scoring, and interview prep generation. Both tools were designed to eliminate the manual, time-intensive parts of the recruiting pipeline.",
		responsibilities: [
			"Programmed an AI-powered browser extension that matches candidates to job descriptions, generating real-time match scores with explanation breakdowns to quickly sort through candidates without manually parsing resumes.",
			"Developed the MVP of CANDI, an AI-powered candidate insights platform for transcript parsing, objection tracking, and report generation.",
			"Automated workflows for candidate scoring, red/green flags, push/pull/stay factors, and personalized interview prep.",
			"Collaborated with the data science team to integrate AI workflows into existing recruiting processes.",
		],
		achievements: [
			"Built a browser extension that eliminates manual resume parsing by surfacing match scores and explanations in real time.",
			"Developed the CANDI MVP end-to-end, automating the full post-interview pipeline from transcript to hiring-manager-ready report.",
			"Reduced hiring-manager report prep time significantly through automated scoring and flag generation.",
		],
		skills: ["Chrome Extensions", "JavaScript", "Python", "Prompt engineering", "Glide", "Airtable", "AI product development"],
		website: "https://www.linkedin.com/company/cornerstone-global-partners/",
		websiteLabel: "CGP's LinkedIn",
	},
	{
		slug: "loeb",
		logo: "/loeb-logo.png",
		title: "NextGen Angel Investor Apprentice",
		company: "Loeb.nyc",
		tag: "Finance",
		period: "Dec 2024 – Jan 2025",
		summary: "Conducted structured due diligence on seven early-stage startups and researched emerging venture opportunities in IP platforms and Shopify A/B testing.",
		overview: "I was selected for Loeb.NYC's NextGen Angel Investor Apprentice program, a hands-on experience covering angel investing, venture capital, and startup funding dynamics within a family office ecosystem. I engaged directly with founders, VCs, and Loeb.NYC leadership to evaluate early-stage startups across consumer, AI, and tech sectors — analyzing unit economics, market sizing, and valuation benchmarks, and researching specific verticals to identify competitive positioning and investment opportunity.",
		responsibilities: [
			"Conducted due diligence on seven early-stage startups, analyzing unit economics, market sizing, and valuation benchmarks to inform investment decisions.",
			"Researched emerging ventures in the Intellectual Property platform and Shopify A/B testing spaces, identifying market opportunities and competitive positioning for potential investment.",
			"Assessed founder-market fit, scaling potential, and exit strategies across evaluated companies.",
			"Collaborated on portfolio diversification and risk management discussions with program mentors and Loeb.NYC leadership.",
		],
		achievements: [
			"Completed rigorous due diligence on seven startups, developing a repeatable framework for evaluating early-stage investment opportunities.",
			"Identified competitive positioning in two high-growth verticals — IP platforms and Shopify A/B testing — as part of directed research.",
			"Built foundational skills in venture funding decision-making within a family office investing context.",
		],
		skills: ["Venture capital", "Due diligence", "Market research", "Financial modeling", "Competitive analysis"],
		website: "https://loeb.nyc",
		websiteLabel: "Loeb.nyc's Website",
	},
	{
		slug: "link-multifamily",
		logo: "/link-multifamily-logo.png",
		title: "Real Estate Acquisition & Portfolio Management Intern",
		company: "Link Multifamily",
		tag: "Real Estate · Finance",
		period: "Jun – Aug 2024",
		summary: "Underwrote multifamily acquisitions and ran monthly financial audits across a $100M+ portfolio at a Dallas multifamily investment firm.",
		overview: "At Link Multifamily, a Dallas-based multifamily investment and management firm, I worked both sides of the deal lifecycle: evaluating new acquisitions and keeping the existing portfolio honest. On the acquisitions side I underwrote deals through financial analysis of T12 statements, rent rolls, debt terms, renovation budgets, CapEx schedules, and pro-forma models. On the portfolio side I conducted monthly financial audits across a $100M+ portfolio, reconciling ledger data against bank statements and tracing variance drivers to support asset management decisions.",
		responsibilities: [
			"Underwrote multifamily acquisitions through financial analysis of T12 statements, rent rolls, debt terms, renovation budgets, CapEx schedules, and pro-forma models.",
			"Conducted monthly financial audits across a $100M+ portfolio, reconciling ledger data with bank statements.",
			"Identified variance drivers behind ledger-to-bank discrepancies to support asset management decisions and reporting accuracy.",
		],
		achievements: [
			"Built core skills in investment evaluation and asset-level due diligence across live multifamily deals.",
			"Kept monthly reporting accurate across a $100M+ portfolio through recurring reconciliation and variance analysis.",
		],
		skills: ["Underwriting", "Pro-forma modeling", "T12 / rent roll analysis", "CapEx budgeting", "Financial auditing", "Variance analysis", "Excel"],
	},
	{
		slug: "aquameridian",
		logo: "/aquameridian-logo.png",
		title: "Founder & Executive Director (U.S. Chapter)",
		company: "AquaMeridian US",
		tag: "Environmental · Science",
		period: "Jun 2022 – Present",
		summary: "Founded and scaled the U.S. chapter of an international ocean conservation nonprofit over 4 years, leading a 12-person student team across coastal cleanups, STEM workshops, and community partnerships engaging 300+ members.",
		overview: "I established the U.S. chapter of AquaMeridian, an international marine conservation initiative, building it from the ground up into a sustained, student-led organization over four years. I designed and ran programs spanning large-scale coastal cleanups, STEM education workshops, and community partnerships — engaging over 300 members across the chapter's lifetime. Beyond programming, I built the organization's funding infrastructure from scratch, developed a student leadership pipeline that continued operations independently, and established institutional partnerships with schools, libraries, and local organizations to extend our reach into marine education and habitat restoration.",
		responsibilities: [
			"Founded and scaled the U.S. chapter of AquaMeridian, growing it into a sustained operation over 4 years.",
			"Led a 12-person student leadership team across coastal cleanups, STEM workshops, and community partnerships.",
			"Directed strategic planning, fundraising, and operational management for all U.S. chapter programs.",
			"Organized large-scale beach cleanups with 150+ volunteers, submitting collected debris data to global ocean health databases.",
			"Hosted environmental education panels and STEM workshops reaching 200+ students across schools and libraries.",
			"Recruited, trained, and mentored a student leadership team with succession planning to ensure continuity.",
		],
		achievements: [
			"Grew the chapter to 300+ community members and sustained operations across 4 years.",
			"Raised $8,500+ from corporate partners including Apple East Bay and individual donors.",
			"Collected 2,000+ lbs of marine debris submitted to global ocean health databases.",
			"Built a 12-person student leadership pipeline that continued running the organization independently.",
			"Formed lasting partnerships with local schools, libraries, and organizations to support marine education and habitat restoration.",
		],
		skills: ["Program management", "Fundraising", "Community organizing", "STEM education", "Operations"],
		website: "https://aquameridian-us.org",
		websiteLabel: "AquaMeridian's Website",
	},
]

