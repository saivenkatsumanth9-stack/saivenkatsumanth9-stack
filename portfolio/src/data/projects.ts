import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "benefitx",
    name: "BENEFITX",
    tagline: "AI-Powered Government Scheme Discovery & Readiness Platform",
    description:
      "An intelligent GovTech decision-support system bridging the discovery gap between government welfare schemes and eligible citizens. Features a deterministic criteria evaluation engine, explainable recommendation scoring, quantitative document readiness tracker, What-If eligibility simulator, and multilingual explanations in English, Telugu, and Hindi.",
    problem:
      "Millions of eligible citizens miss government welfare schemes due to complex eligibility criteria, language barriers, and lack of awareness about available benefits.",
    solution:
      "BENEFITX provides AI-powered scheme discovery with explainable eligibility assessments, a document readiness tracker, and a What-If simulator — all in the citizen's native language.",
    categories: ["full-stack", "ai", "web-apps"],
    githubUrl: "https://github.com/saivenkatsumanth9-stack/BENEFITX",
    liveUrl: "https://benefit-navigator-main.vercel.app",
    primaryLanguage: "TypeScript",
    featured: true,
    status: "active",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "language" },
      { name: "TanStack Start", category: "frontend" },
      { name: "TanStack Router", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Radix UI", category: "frontend" },
      { name: "Recharts", category: "frontend" },
      { name: "Zod", category: "tools" },
      { name: "React Hook Form", category: "tools" },
      { name: "Nitro", category: "backend" },
      { name: "Vitest", category: "tools" },
      { name: "Vite", category: "frontend" },
      { name: "Vercel", category: "cloud" },
    ],
    features: [
      {
        title: "Missed Scheme Detector",
        description:
          "Proactively discovers schemes the citizen is eligible for but hasn't searched for, using deterministic weighted profile-match scoring.",
      },
      {
        title: "Explainable Eligibility Engine",
        description:
          "Evaluates citizen criteria against scheme rules and returns clear MATCHED, FAILED, or UNKNOWN states with human-readable breakdowns.",
      },
      {
        title: "Smart Document Readiness",
        description:
          "Calculates quantitative readiness scores based on available vs required documents. Optional documents never penalize readiness.",
      },
      {
        title: "What-If Simulator",
        description:
          "Zero-mutation simulator that lets citizens test hypothetical changes like income shifts or education qualification with field whitelisting protection.",
      },
      {
        title: "Multilingual Translation",
        description:
          "Converts dense government notices into plain language with native support for English, Telugu, and Hindi.",
      },
      {
        title: "Gov-Admin Portal",
        description:
          "Nodal officer workspace with citizen verification queue, national scheme registry, and rules engine inspector.",
      },
    ],
    architecture: {
      nodes: [
        { id: "user", label: "Citizen / Admin", type: "user" },
        { id: "frontend", label: "TanStack Start (React 19)", type: "frontend", description: "17-route platform suite" },
        { id: "engines", label: "5 Core Engines", type: "ai", description: "Recommendation, Eligibility, Readiness, Simulator, Translation" },
        { id: "api", label: "Nitro Backend", type: "backend" },
        { id: "data", label: "Scheme Registry", type: "database", description: "22 government schemes with rules" },
      ],
      edges: [
        { from: "user", to: "frontend" },
        { from: "frontend", to: "engines" },
        { from: "engines", to: "api" },
        { from: "api", to: "data" },
      ],
    },
    createdAt: "2026-08-23",
  },
  {
    id: "handscape",
    name: "HANDSCAPE",
    tagline: "Next-Gen 3D Escape Room Controlled by Computer Vision & Hand Tracking",
    description:
      "An immersive browser 3D escape room game where your hands are the physical controller. Uses webcam frames + Google MediaPipe hand tracking (21 landmarks) to point, pinch, grab, swipe, and rotate through 7 tactical chambers with 100% on-device local privacy.",
    problem:
      "Traditional interactive games require costly specialized hardware (VR controllers, sensors) or break immersion with keyboard/mouse clicks.",
    solution:
      "HANDSCAPE leverages client-side WebAssembly machine learning and Three.js to track 21 3D hand skeletal landmarks at 60 FPS directly through a standard webcam with zero hardware barrier.",
    categories: ["ai", "game", "web-apps"],
    githubUrl: "https://github.com/saivenkatsumanth9-stack/HandScapeGame-",
    primaryLanguage: "TypeScript",
    featured: true,
    status: "active",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "language" },
      { name: "Three.js", category: "frontend" },
      { name: "MediaPipe Vision AI", category: "ai-ml" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Web Audio API", category: "tools" },
      { name: "Supabase", category: "backend" },
      { name: "Vite", category: "frontend" },
    ],
    features: [
      {
        title: "11 Kinetic Gestures",
        description:
          "Real-time recognition of Point, Pinch, Grab, Fist, Open Palm, Wrist Roll, Directional Swipes, and Dual-Hand Synchrony.",
      },
      {
        title: "100% On-Device Privacy",
        description:
          "All video frames are processed locally on CPU/GPU via WebAssembly — zero images or video streams are ever uploaded.",
      },
      {
        title: "7 Sealed Escape Chambers",
        description:
          "Chambers challenging rotational alignment, laser timing, celestial scans, and silhouette shadow matching.",
      },
      {
        title: "Procedural Audio Synthesizer",
        description:
          "Real-time Web Audio API oscillators generate reactive soundscapes and drone chords with 0 external sound asset downloads.",
      },
    ],
    architecture: {
      nodes: [
        { id: "webcam", label: "Webcam Video Stream", type: "user" },
        { id: "mediapipe", label: "MediaPipe Hand Landmarker", type: "ai", description: "21 3D points @ 60 FPS" },
        { id: "processor", label: "LandmarkProcessor", type: "service", description: "Smoothing, pinch & roll angles" },
        { id: "recognizer", label: "Gesture State Machine", type: "ai" },
        { id: "threejs", label: "Three.js 3D Physics", type: "frontend" },
      ],
      edges: [
        { from: "webcam", to: "mediapipe" },
        { from: "mediapipe", to: "processor" },
        { from: "processor", to: "recognizer" },
        { from: "recognizer", to: "threejs" },
      ],
    },
    createdAt: "2026-09-01",
  },
  {
    id: "agentic-research-agent",
    name: "Agentic Research Agent",
    tagline: "ReAct-Style Autonomous Multi-Tool Research Agent",
    description:
      "A ReAct-style (Thought → Action → Observation) research agent built with FastAPI, exposing a toolset of calculator, Wikipedia lookup, web search, URL fetch, and notepad that it chains together to answer compound questions. Uses a transparent, deterministic goal-decomposition planner rather than an external LLM dependency.",
    problem:
      "Answering compound research questions requires chaining multiple tools (search, calculate, lookup) — but most implementations require expensive LLM API calls and are opaque in their reasoning.",
    solution:
      "A deterministic, inspectable ReAct agent that decomposes compound goals into subgoals, selects the right tool per subgoal, and provides full reasoning traces. Runs fully offline with zero API keys required.",
    categories: ["ai", "agentic-ai", "developer-tools"],
    githubUrl:
      "https://github.com/saivenkatsumanth9-stack/05-agentic-research-agent",
    primaryLanguage: "Python",
    featured: true,
    status: "completed",
    technologies: [
      { name: "Python", category: "language" },
      { name: "FastAPI", category: "backend" },
      { name: "Uvicorn", category: "backend" },
      { name: "Pydantic", category: "tools" },
      { name: "ReAct Agents", category: "ai-ml" },
      { name: "Goal Decomposition", category: "ai-ml" },
      { name: "Deterministic Planning", category: "ai-ml" },
      { name: "HTML", category: "language" },
      { name: "JavaScript", category: "language" },
    ],
    features: [
      {
        title: "Compound-Goal Decomposition",
        description:
          'Splits complex queries like "Who is Ada Lovelace and calculate 12*(7+3)" into subgoals solved with the right tool per subgoal.',
      },
      {
        title: "Safe AST Calculator",
        description:
          "Mathematical evaluation using Python AST parsing — no eval() for security.",
      },
      {
        title: "Full ReAct Trace",
        description:
          "Returns complete thought/action/action_input/observation traces per step plus a synthesized final answer.",
      },
      {
        title: "Offline-Safe Architecture",
        description:
          "Network-dependent tools degrade gracefully to UNAVAILABLE observations instead of crashing. Agent still completes its reasoning loop.",
      },
    ],
    architecture: {
      nodes: [
        { id: "user", label: "User Query", type: "user" },
        { id: "api", label: "FastAPI Server", type: "backend" },
        { id: "agent", label: "ReAct Agent", type: "ai", description: "Thought → Action → Observation loop" },
        { id: "planner", label: "Goal Decomposition Planner", type: "ai" },
        { id: "tools", label: "Tool Suite", type: "service", description: "Calculator, Wikipedia, Search, Fetch, Notepad" },
      ],
      edges: [
        { from: "user", to: "api" },
        { from: "api", to: "agent" },
        { from: "agent", to: "planner" },
        { from: "planner", to: "tools" },
        { from: "tools", to: "agent", label: "Observation" },
      ],
    },
    createdAt: "2026-05-01",
  },
  {
    id: "finflow",
    name: "FinFlow Finance Tracker",
    tagline: "Personal Finance & OCR Receipt Scanning Engine",
    description:
      "A dark-first, client-side personal finance web application built for young professionals and students to track budgets, expenses, and savings goals. Features occupational customization, dynamic ledger labels, a local AI assistant, and offline-first architecture.",
    problem:
      "Existing finance trackers are either too complex for students or too simplistic for real budgeting. They also require accounts and cloud storage, raising privacy concerns.",
    solution:
      "FinFlow provides a premium, offline-first finance tracker with smart presets for both students and employees, OCR receipt scanning, and a local AI assistant — all data stays in the browser.",
    categories: ["full-stack", "finance", "web-apps"],
    githubUrl:
      "https://github.com/saivenkatsumanth9-stack/finflow-finance-tracker",
    primaryLanguage: "TypeScript",
    featured: false,
    status: "completed",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "language" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Recharts", category: "frontend" },
      { name: "Tesseract.js OCR", category: "ai-ml" },
      { name: "Vite", category: "frontend" },
    ],
    features: [
      {
        title: "Occupational Customization",
        description:
          "Tailored onboarding for Students (Allowance & Canteen) and Employees (Salaries & SIPs).",
      },
      {
        title: "Cost Customization for Debits",
        description:
          "Set a custom Monthly Spend Limit and partition it using 50/30/20 presets among categories.",
      },
      {
        title: "Dynamic Ledger Labels",
        description:
          'Shows "Credited To" / "Debited From" depending on transaction direction with banking terminology.',
      },
      {
        title: "Receipt OCR Scanner",
        description:
          "Extract text and totals directly from receipt photos offline using Tesseract.js.",
      },
    ],
    architecture: {
      nodes: [
        { id: "user", label: "User", type: "user" },
        { id: "frontend", label: "React + Tailwind", type: "frontend" },
        { id: "flo", label: "FLO AI Assistant", type: "ai", description: "Local heuristic analysis" },
        { id: "ocr", label: "Tesseract.js OCR", type: "service" },
        { id: "storage", label: "localStorage", type: "database", description: "Offline-first data" },
      ],
      edges: [
        { from: "user", to: "frontend" },
        { from: "frontend", to: "flo" },
        { from: "frontend", to: "ocr" },
        { from: "frontend", to: "storage" },
      ],
    },
    createdAt: "2026-06-25",
  },
  {
    id: "studybudy-llm",
    name: "StudyBuddy AI",
    tagline: "Gamified RAG-Powered Study Planner & Exam Assistant",
    description:
      "A gamified AI learning platform built with TanStack Start, React 19, and Supabase. Upload lecture PDFs (up to 20MB) and chat contextually with notes using Retrieval-Augmented Generation (RAG), generate dynamic schedule blocks, and test knowledge with custom quizzes.",
    problem:
      "Students struggle to synthesize lengthy lecture slides and structure daily revision blocks before university exam deadlines.",
    solution:
      "StudyBuddy AI embeds coursework notes into a vector RAG pipeline, enabling interactive document queries, automatic syllabus-aligned quiz generation, and Pomodoro focus tracking.",
    categories: ["ai", "full-stack", "web-apps"],
    githubUrl: "https://github.com/saivenkatsumanth9-stack/studybudy-LLM",
    primaryLanguage: "TypeScript",
    featured: false,
    status: "completed",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "TypeScript", category: "language" },
      { name: "TanStack Start", category: "frontend" },
      { name: "Supabase", category: "backend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Radix UI", category: "frontend" },
    ],
    features: [
      {
        title: "Document RAG Chat",
        description:
          "Upload syllabus and lecture PDFs to query contextually with verified citations.",
      },
      {
        title: "Dynamic Study Planner",
        description:
          "Generates structured revision blocks based on subject weight and exam dates.",
      },
      {
        title: "Interactive Quiz Lab",
        description:
          "Automatically creates multiple-choice practice quizzes from uploaded notes.",
      },
    ],
    createdAt: "2026-07-01",
  },
  {
    id: "smart-calculator",
    name: "ClassWiz Studio (Smart Calculator)",
    tagline: "Casio fx-991CW Scientific Calculator & OCR Solver",
    description:
      "A feature-rich web-based scientific calculator inspired by the Casio fx-991CW ClassWiz. Features AST mathematical parsing, 2D function graphing, quadratic/linear equation solvers, Tesseract OCR photo scan-to-solve, voice input, and an 80+ formula library.",
    problem:
      "Standard software calculators lack scientific depth, function graphing, or photo OCR capture in a lightweight zero-dependency format.",
    solution:
      "A single-bundle glassmorphic application with math.js AST evaluation, canvas curve plotting, voice speech synthesis, and OCR image scanning.",
    categories: ["developer-tools", "web-apps"],
    githubUrl: "https://github.com/saivenkatsumanth9-stack/Smart-Calculator",
    primaryLanguage: "JavaScript",
    featured: false,
    status: "completed",
    technologies: [
      { name: "JavaScript", category: "language" },
      { name: "HTML", category: "language" },
      { name: "CSS", category: "language" },
      { name: "Tesseract.js OCR", category: "ai-ml" },
      { name: "Web Audio API", category: "tools" },
    ],
    features: [
      {
        title: "Scientific & Graphing Engine",
        description:
          "Trig, inverse trig, log, calculus functions with real-time Cartesian function plotting.",
      },
      {
        title: "OCR Scan-to-Solve",
        description:
          "Extracts printed math equations from camera uploads using Tesseract.js.",
      },
      {
        title: "Voice Math Input",
        description:
          "Spoken natural language calculation conversion via Web Speech API.",
      },
    ],
    createdAt: "2026-06-22",
  },
];

export const projectCategories = [
  { id: "all" as const, label: "All" },
  { id: "ai" as const, label: "AI" },
  { id: "agentic-ai" as const, label: "Agentic AI" },
  { id: "full-stack" as const, label: "Full Stack" },
  { id: "finance" as const, label: "Finance" },
  { id: "game" as const, label: "Game & 3D" },
  { id: "developer-tools" as const, label: "Developer Tools" },
  { id: "web-apps" as const, label: "Web Apps" },
] as const;

export type FilterCategory = (typeof projectCategories)[number]["id"];

export function getProjectsByCategory(category: FilterCategory): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.categories.includes(category));
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.name.toLowerCase().includes(q)) ||
      p.categories.some((c) => c.includes(q))
  );
}

export function getProjectsByTech(techName: string): Project[] {
  return projects.filter((p) =>
    p.technologies.some(
      (t) => t.name.toLowerCase() === techName.toLowerCase()
    )
  );
}
