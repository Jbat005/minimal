import { asset } from "@/lib/utils";

export const profile = {
  name: "Jean Batista",
  role: "Data Analyst",
  location: "New York, NY",
  email: "batistajean78@gmail.com",
  linkedin: "https://www.linkedin.com/in/jbatist005/",
  linkedinLabel: "in/jbatist005",
  github: "https://github.com/Jbat005",
  githubLabel: "Jbat005",
  // Hero positioning line — drawn from the résumé summary.
  tagline:
    "I turn messy data and real client needs into clean reports, web tools, and decisions people can act on.",
  photo: asset("assets/jean_headshot.jpg"),
} as const;

export const about = {
  greeting: "Hi 👋, I'm Jean Batista,",
  lead: "a data analyst with a background in economics and a strong interest in how data can be used to solve real problems.",
  paragraphs: [
    "My path into data science started during the 2020 market bubble, when I taught myself Python to build financial models and better understand what was happening in the markets. From there, I kept taking on projects that caught my attention, challenged how I thought, and gave me new reasons to keep learning. That curiosity eventually led me to pursue a master's degree in data science.",
    "Today, I work on AI evaluation and data-focused projects that require careful judgment, consistency, and a sharp eye for detail. I also take on freelance analysis work, including turning unstructured classroom observations into a measurable progress report that could be used by teachers, families, and school administrators.",
    "I'm most interested in work that combines data, technology, and human judgment. I enjoy finding patterns, building practical solutions, and making complex information easier to understand.",
    "Outside of work, I enjoy exploring new places, taking on home renovation projects, spending time with my Pomeranians, and starting my mornings with a homemade coffee. When the weather is right, there is a good chance I'm in a hammock planning my next project.",
  ],
  facts: [
    "M.S. Data Science · Juniata College",
    "New York · Remote OK",
    "English · Spanish",
    "Open to data & developer roles",
  ],
} as const;

// The Work slide is a single, in-depth case study.
export const MEASURE_LABEL = "What we measured";

export const caseStudy = {
  eyebrow: "Selected Work · Case Study",
  kicker: "PS 196 · New York City",
  title:
    "Student Observations Study: intervention tactics for confidence and classroom management",
  intro:
    "Rachel Morales was finishing her master's in childhood development, with a dual program in early intervention. For her practicum she spent a semester at PS 196 as the second teacher in one classroom. One of her assignments was to run a before-and-after study: pick a few intervention tactics, use them on purpose, and see whether the room actually changed. She asked me to help her measure it.",
  photo: asset("assets/classroom.jpg"),
  photoCaption: "Ms. Morales' class · PS 196, New York",
  factors: ["Attention-seeking", "Attentiveness", "Disruptions", "Engagement", "Assessment scores"],
  stats: [
    { value: "+134%", label: "jump in the daily classroom score, from 2.0 to 4.7 out of 5" },
    { value: "40", label: "school days watched, start to finish" },
    { value: "5", label: "signals behind each day's score" },
    { value: "3", label: "phases: a baseline, new tactics, then refining them" },
  ],
  processSteps: [
    {
      step: 1,
      title: "Research",
      description:
        "We started by grounding the project in existing classroom-management research. Korpershoek, de Boer, and Mouw's 2025 meta-analysis found a small but significant positive effect for classroom-management interventions across 76 controlled studies, which gave us a research-backed reason to test whether Rachel's tactics could produce measurable change in this classroom.",
      href: "https://doi.org/10.3102/00346543251361903",
      linkLabel: "Read the article",
    },
    {
      step: 2,
      title: "Observation and baseline data",
      description:
        "Before changing the routine, we observed the classroom as it already was. This gave the project a baseline: a starting point for attention-seeking, attentiveness, disruptions, engagement, and assessment scores before any new strategy was introduced.",
    },
    {
      step: 3,
      title: "Implement strategy",
      description:
        "Rachel then began using the selected intervention tactics on purpose, including clearer attention signals, tighter routines, and smoother transitions. The goal was to make the classroom-management approach consistent enough that any later movement could be compared against the baseline.",
    },
    {
      step: 4,
      title: "Track change over time",
      description:
        "As the tactics stayed in place, we kept daily notes on the same five signals. Watching the same variables over time let us separate a one-day improvement from a pattern that held across the semester.",
    },
    {
      step: 5,
      title: "Organize and analyze",
      description:
        "I organized the observation notes into analyzable variables, cleaned the entries, and grouped the data by phase. From there, I calculated average scores and compared movement from baseline to strategy implementation to mastery.",
    },
    {
      step: 6,
      title: "Visualizations",
      description:
        "The results were turned into simple visuals so the story could be understood quickly. Charts made the score movement, phase differences, and five-signal framework easier to explain than a written table alone.",
    },
    {
      step: 7,
      title: "Research-backed report",
      description:
        "After the analysis, we tied the classroom results back to the research from step one. The final report explained how the observed improvement aligned with evidence that structured classroom-management interventions can support student behavior and classroom flow.",
    },
    {
      step: 8,
      title: "Share the results",
      description:
        "The finished report was prepared for the program directors overseeing the project and the classroom teachers. It also gave Rachel concrete progress notes she could use in parent-teacher conferences to explain which changes appeared to help students.",
    },
  ],
  sections: [
    {
      label: MEASURE_LABEL,
      heading: '"Classroom management" had to become one number.',
      body: "It's easy to say and hard to pin down, so we boiled it down to one score. Every day the room got a 1 to 5, averaged across five things you can actually watch for:",
    },
    {
      label: "What I did",
      heading: "I turned the practicum into a measurable intervention pipeline.",
      body: "The pipeline was research, baseline observation, strategy implementation, follow-up observation, data organization, analysis, visualization, and reporting. We collected baseline data first, introduced the tactics, watched changes over time, built variables around the behaviors Rachel was tracking, analyzed movement across the phases, and used charts to connect the classroom results back to the research question.",
    },
  ],
  phases: [
    { name: "Baseline", value: 2.0, note: "before any changes" },
    { name: "Strategy", value: 4.1, note: "tactics in play" },
    { name: "Mastery", value: 4.7, note: "dialed in" },
  ],
  rigor: [
    {
      value: "r = 0.91",
      label: "the daily scores lined up with the objective counts we kept, so it wasn't just a gut feeling",
    },
    {
      value: "+0.6",
      label: "the score still climbed after the first round of tactics, so it wasn't a one-time bump",
    },
  ],
  impact: {
    heading: "Where it ended up",
    body: "Rachel got a finished report that packaged the research, baseline-to-mastery analysis, and visuals in a format she could share with the program directors overseeing the project and the classroom teacher. It also gave her concrete progress notes for parent-teacher conferences, where the data could show families which specific changes made the difference for their kids.",
  },
  links: [
    {
      label: "Research citation (Korpershoek et al., 2025)",
      href: "https://doi.org/10.3102/00346543251361903",
    },
    {
      label: "Walk through the full deck",
      href: asset("Curent Projects/Pages/student-progression-tracking.html"),
    },
    { label: "Redesigned deck (PPTX)", href: asset("Curent Projects/Documents/PDP_Story_cleaned.pptx") },
    {
      label: "Analysis workbook (XLSX)",
      href: asset("Curent Projects/Documents/PDP_Working_Datasets.xlsx"),
    },
  ],
} as const;

export const skills = [
  {
    group: "Programming",
    items: ["Python", "R", "SQL (T-SQL, PostgreSQL)", "JavaScript", "HTML / CSS"],
  },
  {
    group: "Data & ML",
    items: [
      "pandas, NumPy",
      "scikit-learn",
      "tidyverse, ggplot2",
      "K-means, PCA, OLS",
      "Model diagnostics",
    ],
  },
  {
    group: "Databases",
    items: [
      "SQL Server, T-SQL",
      "Triggers & ACID",
      "MongoDB, Firestore",
      "Star & snowflake schemas",
    ],
  },
  {
    group: "Tools & Workflow",
    items: [
      "Jupyter, RMarkdown",
      "Git & GitHub",
      "matplotlib, seaborn",
      "Technical writing",
      "End-to-end deployment",
    ],
  },
] as const;

// Skill terms that get highlighted (bold) wherever they appear in the
// experience / education bullets.
export const skillKeywords = [
  "scikit-learn",
  "SQL Server",
  "PostgreSQL",
  "JavaScript",
  "RMarkdown",
  "K-means",
  "MongoDB",
  "Firestore",
  "matplotlib",
  "tidyverse",
  "ggplot2",
  "Jupyter",
  "seaborn",
  "GitHub",
  "T-SQL",
  "NumPy",
  "pandas",
  "Python",
  "HTML",
  "CSS",
  "SQL",
  "PCA",
  "OLS",
  "Git",
] as const;

export type TimelineEntry = {
  when: string;
  title: string;
  org: string;
  orgHref?: string;
  points: string[];
};

export const experience: TimelineEntry[] = [
  {
    when: "2026 – Present",
    title: "AI Quality Reviewer, Software Engineering Domain",
    org: "Handshake AI Fellowship · Contract · Remote",
    points: [
      "Oversee and audit a cohort of taskers evaluating frontier LLM responses on multi-turn software engineering and coding tasks, enforcing adherence to evaluation rubrics and quality standards.",
      "Enforce a strict no-AI-use policy across the tasker pool, reviewing submissions for signs of AI-generated content to protect the integrity of human-generated training data.",
      "Provide structured written feedback to taskers on scoring accuracy, rubric interpretation, and edge-case handling, raising inter-rater agreement across the team.",
      "Flag systematic scoring gaps and calibration issues, escalating patterns to program leads to keep human-feedback data consistent and high quality.",
    ],
  },
  {
    when: "2026 – Present",
    title: "AI Data Analytics Contractor",
    org: "Mercor Intelligence · Contract · Remote",
    points: [
      "Provide data-analytics expertise to evaluate AI model outputs for top AI labs, focusing on data quality, accuracy, and attention to detail across large, structured datasets.",
      "Apply structured, rubric-based assessments to clean, validate, and organize large volumes of data, surfacing errors, discrepancies, and edge cases with consistent accuracy.",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    when: "2025 – 2026",
    title: "M.S., Data Science",
    org: "Juniata College · Huntingdon, PA",
    orgHref:
      "https://www.juniata.edu/academics/graduate-programs/master-of-data-science/",
    points: [
      "Coursework: Data Mining, Machine Learning, Data Visualization, Big Data, and Database Systems.",
      "Capstone project: large-scale exploratory analysis of USDA branded food data.",
    ],
  },
  {
    when: "2019 – 2023",
    title: "B.A., Economics",
    org: "CUNY City College of New York · New York, NY",
    orgHref: "https://ccny-undergraduate.catalog.cuny.edu/programs/ECON-BA",
    points: [
      "Specialization in Python for Business Analytics and Quantitative Finance.",
      "Foundation in econometrics, statistics, and applied financial analysis.",
    ],
  },
];

export const nav = [
  { label: "Experience", href: "#background" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;
