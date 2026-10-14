// Every fact on the site comes from this file, which follows the résumé.
// Academic grades are intentionally left out of this project.

export const person = {
  name: "Salvatore Berte",
  disciplines: ["Finance", "Applied Economics", "Investment Research"],
  headline: ["Understanding markets.", "Analyzing risk.", "Finding opportunity."],
  intro:
    "I am a finance and economics professional pursuing a Master of Science in Applied Economics at Boston College. My interests center on fixed-income markets, monetary policy, investment research, and how macroeconomic developments shape the valuation of financial assets.",
  email: "sdberte525@gmail.com",
  linkedin: "https://www.linkedin.com/in/salvatore-berte-50bb72257/",
  location: "Boca Raton, Florida",
  relocation: "Open to relocation",
  resume: "/salvatore-berte-resume.pdf",
} as const;

export const heroFacts = [
  { label: "Currently", value: "M.S. Applied Economics, Boston College" },
  { label: "Focus", value: "Fixed income, monetary policy, investment research" },
  { label: "Based in", value: "Boca Raton, Florida. Open to relocation." },
] as const;

export const about = {
  title: "Grounded in finance, drawn to markets.",
  paragraphs: [
    "I earned a Bachelor of Science in Business Administration from Stonehill College, majoring in Finance with a minor in Economics. I am now pursuing a Master of Science in Applied Economics at Boston College and expect to graduate in May 2027.",
    "My experience spans wealth management, banking, university teaching, and Bloomberg-based portfolio analysis. Building financial plans at Ameriprise, working under BSA/AML controls at Westfield Bank, running Stonehill's Bloomberg trading desk, and teaching fixed income have each given me a different view of how financial decisions are analyzed, executed, and reported.",
    "The question that interests me most is how monetary policy and macroeconomic data move interest rates and asset prices. I am working toward a career in investment research, fixed income, or asset management.",
  ],
  interests: [
    "Fixed income securities",
    "Monetary policy and interest rates",
    "Macroeconomic research",
    "Investment and portfolio analysis",
    "Quantitative financial modeling",
    "Financial markets and asset valuation",
  ],
  personal: "Outside of work, I spend my time weightlifting, playing golf, and distance running.",
} as const;

export type Role = {
  organization: string;
  location: string;
  title: string;
  /** Course names or other qualifiers shown beneath the title. */
  detail?: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  /** Points to a related entry in Selected work. */
  related?: { href: string; label: string };
};

// Ordered by end date, most recent first.
export const experience: Role[] = [
  {
    organization: "Boston College",
    location: "Chestnut Hill, MA",
    title: "Teaching Assistant",
    detail: "Money & Financial Markets; Impact of News on Financial Markets",
    start: "Sep 2026",
    end: "Present",
    current: true,
    summary: "A primary resource for students across two financial markets courses.",
    highlights: [
      "Support instruction in interest rates, fixed income, monetary policy, market expectations, and economic indicators.",
      "Analyze how macroeconomic releases and geopolitical developments carry through to asset valuations and investor behavior.",
      "Turn financial theory into live market cases for classroom discussion.",
    ],
  },
  {
    organization: "Westfield Bank",
    location: "Springfield, MA",
    title: "Bank Teller",
    start: "May 2026",
    end: "Aug 2026",
    summary: "Branch banking with a focus on accuracy, controls, and regulatory compliance.",
    highlights: [
      "Processed and reconciled more than 100 customer transactions daily with zero-variance drawer balancing.",
      "Applied Bank Secrecy Act, anti-money-laundering, and internal control procedures to every transaction, escalating irregular activity in line with federal standards.",
    ],
  },
  {
    organization: "Stonehill College",
    location: "Easton, MA",
    title: "Bloomberg Trading Desk Manager",
    start: "Oct 2025",
    end: "May 2026",
    summary: "Managed Stonehill's Bloomberg trading desk, overseeing 25 student-managed portfolios.",
    highlights: [
      "Oversaw 25 student-managed portfolios representing $6.25 million in tracked assets, producing performance attribution and compliance reporting.",
      "Executed and monitored more than 400 multi-asset trades across equities, fixed income, commodities, and foreign exchange.",
      "Used Bloomberg Terminal analytics for pre-trade screening, post-trade review, and performance reporting.",
    ],
    related: { href: "#selected-work", label: "More in Selected work" },
  },
  {
    organization: "Stonehill College",
    location: "Easton, MA",
    title: "Teaching Assistant",
    detail: "Fixed Income; Money and Banking",
    start: "Nov 2025",
    end: "May 2026",
    summary: "Supported instruction in two courses on bonds, interest rates, and banking.",
    highlights: [
      "Instructed students on bond pricing, duration, holding-period return, and interest-rate risk, and evaluated quantitative problem sets.",
      "Led training on Bloomberg Terminal navigation and financial data retrieval.",
    ],
  },
  {
    organization: "Ameriprise Financial",
    location: "Springfield, MA",
    title: "Wealth Management Intern",
    start: "May 2025",
    end: "Aug 2025",
    summary: "Worked alongside a Vice President on financial planning and investment advisory work.",
    highlights: [
      "Built financial plans modeling retirement, cash-flow, and contribution scenarios, and helped translate the results into client-facing recommendations.",
      "Reviewed client financial statements, account documentation, and portfolio holdings, validating data while upholding fiduciary confidentiality standards.",
    ],
  },
];

export const deskFigures = [
  { value: "25", label: "Student-managed portfolios overseen" },
  { value: "$6.25M", label: "In tracked portfolio assets" },
  { value: "400+", label: "Multi-asset trades executed and monitored" },
] as const;

export const selectedWork = {
  desk: {
    title: "Bloomberg trading desk management",
    context: "Stonehill College",
    period: "Oct 2025 – May 2026",
    body: "As desk manager I oversaw Stonehill's student-managed portfolios: executing and monitoring trades across equities, fixed income, commodities, and foreign exchange, using Bloomberg Terminal analytics for pre-trade screening and post-trade review, and producing performance attribution and compliance reporting.",
    note: "Portfolios are managed by students within Stonehill's academic program. Figures describe assets tracked by the desk, not personally owned assets or client accounts.",
  },
  challenge: {
    title: "Bloomberg Global Trading Challenge",
    context: "Stonehill College",
    period: "Oct 2025 – May 2026",
    figure: { value: "$1M", label: "Virtual multi-asset portfolio" },
    body: "Managed a virtual multi-asset portfolio in a Bloomberg-hosted competition, using equity screening, valuation, and portfolio optimization within risk and correlation constraints.",
    note: "A simulated portfolio. No real capital was invested.",
  },
  fixedIncome: {
    title: "Fixed income and monetary policy",
    context: "Teaching and coursework",
    body: "Teaching and coursework centered on how bonds are priced and how policy and economic data move rates.",
    topics: [
      "Bond valuation",
      "Duration and convexity",
      "Holding-period return",
      "Interest-rate risk",
      "Monetary policy",
      "Economic data and market expectations",
    ],
    settings: [
      "Teaching Assistant, Fixed Income and Money and Banking at Stonehill",
      "Teaching Assistant, Money & Financial Markets at Boston College",
      "Fixed Income Analysis, Investments, and Money and Banking coursework",
    ],
  },
} as const;

export type School = {
  name: string;
  division?: string;
  location: string;
  degree: string;
  field?: string;
  date: string;
  coursework: string[];
};

export const education: School[] = [
  {
    name: "Boston College",
    division: "Woods College of Advancing Studies",
    location: "Chestnut Hill, MA",
    degree: "Master of Science in Applied Economics",
    date: "Expected May 2027",
    coursework: [
      "Applied Microeconomic Theory",
      "Applied Macroeconomic Theory",
      "Econometrics",
      "Statistical Methods for Economists",
    ],
  },
  {
    name: "Stonehill College",
    location: "Easton, MA",
    degree: "Bachelor of Science in Business Administration",
    field: "Major in Finance, minor in Economics",
    date: "Graduated May 2026",
    coursework: [
      "Fixed Income Analysis",
      "Investments",
      "Money and Banking",
      "Econometrics",
      "Data Analytics",
      "Advanced Corporate Finance & Modeling",
      "Private Equity Modeling",
    ],
  },
];

export type Credential = {
  name: string;
  issuer?: string;
  status: "Candidate" | "Completed";
};

export const credentials: Credential[] = [
  { name: "CFA Level I", issuer: "CFA Institute", status: "Candidate" },
  { name: "Bloomberg Market Concepts", issuer: "Bloomberg", status: "Completed" },
  { name: "Python for Data Science", status: "Completed" },
  { name: "Excel Mastery", issuer: "Meehan School of Business", status: "Completed" },
];

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Financial analysis",
    items: [
      "Discounted cash flow modeling",
      "Three-statement financial modeling",
      "Comparable company and precedent transaction analysis",
      "LBO modeling",
      "WACC",
      "Bond pricing",
      "Duration and convexity",
      "Portfolio analysis",
    ],
  },
  {
    category: "Economics and quantitative research",
    items: [
      "Econometric modeling",
      "OLS and multivariate regression",
      "Time-series analysis",
      "Statistical hypothesis testing",
      "Financial data visualization",
    ],
  },
  {
    category: "Markets and advisory",
    items: [
      "Trade execution and monitoring",
      "Performance reporting and attribution",
      "Equity screening",
      "Financial statement analysis",
      "Financial planning support",
      "BSA/AML compliance",
    ],
  },
  {
    category: "Programming and software",
    items: [
      "Python (pandas, NumPy, statsmodels)",
      "R",
      "Stata",
      "SQL",
      "SAS",
      "Java",
      "Bloomberg Terminal",
      "Jupyter",
      "Git",
    ],
  },
  {
    category: "AI and research tools",
    items: ["Claude Code", "Generative AI workflows for research automation", "AI-assisted data pipelines"],
  },
];
