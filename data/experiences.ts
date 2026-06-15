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
		title: "Lease Administration & AI Development Intern",
		company: "Empire State Realty Trust (ESRT)",
		tag: "AI · Product · Engineering · Real Estate · Finance",
		period: "Jun 2026 – Present",
		summary: "Building an enterprise AI platform that makes ESRT's lease portfolio queryable in plain English, while handling day-to-day lease administration across a multi-building NYC portfolio.",
		overview: "At Empire State Realty Trust — the owner and operator of the Empire State Building and a broader NYC commercial and residential portfolio — I split my time between hands-on lease administration and building Lease AI, an internal RAG (Retrieval-Augmented Generation) system that lets non-technical staff query SharePoint-stored lease documents in plain English. On the operations side, I work in Yardi, track letters of credit, and reconcile tenant options and termination clauses. On the build side, I'm architecting an Azure-native pipeline: Azure OpenAI with GPT-4o, Azure AI Search for vector retrieval, Azure Cosmos DB for structured lease fields, and Azure Document Intelligence for document chunking, orchestrated with Semantic Kernel and surfaced through a React/SPFx chat interface.",
		responsibilities: [
			"Design and build Lease AI, an enterprise RAG platform enabling natural language queries over ESRT's full lease document library.",
			"Architect an Azure-native ingestion and retrieval pipeline (Azure OpenAI, AI Search, Cosmos DB, Document Intelligence, Semantic Kernel).",
			"Develop a multi-turn conversational chat UI with inline citations, deployed as an SPFx web part on SharePoint.",
			"Perform day-to-day lease administration including Yardi data entry, LOC tracking, and critical date reconciliation.",
			"Build and deploy VBA automation for LOC expiry notifications with Outlook email routing across ESRT's building portfolio.",
			"Conduct comparative analysis of AI vendors (Harvey AI vs. internal RAG) for senior leadership and IT security review.",
		],
		achievements: [
			"Architected a full enterprise RAG system from scratch, advancing from spec to working demo within the first intern cycle.",
			"Built an automated LOC expiry notification macro, replacing a manual tracking process across a multi-building portfolio.",
			"Produced a 14-dimension vendor comparison briefing for CTOs and senior leadership, influencing the platform decision.",
			"Designed a UI spec and citation system for the lease chat interface, covering edge cases for out-of-scope queries and missing clauses.",
			"Mapped ESRT's SharePoint folder schema to a structured metadata model enabling pre-retrieval filtering by portfolio, building, and tenant.",
		],
		skills: ["RAG / Retrieval Augmented Generation", "Microsoft Azure", "Azure AI Foundry", "Semantic Kernel", "SharePoint / SPFx", "Ollama", "LangChain", "ChromaDB", "AWS Bedrock", "VBA", "Excel", "Python", "Commercial real estate"],
		website: "https://esrtreit.com",
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
		period: "Dec 2024",
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