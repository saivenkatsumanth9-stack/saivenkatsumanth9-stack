import type { TechGroup } from "@/types";

export const techGroups: TechGroup[] = [
  {
    category: "language",
    label: "Languages",
    items: [
      { name: "TypeScript", category: "language" },
      { name: "Python", category: "language" },
      { name: "JavaScript", category: "language" },
      { name: "Java", category: "language" },
      { name: "C#", category: "language" },
      { name: "C", category: "language" },
      { name: "HTML", category: "language" },
      { name: "CSS", category: "language" },
    ],
  },
  {
    category: "frontend",
    label: "Frontend & 3D Graphics",
    items: [
      { name: "React", category: "frontend" },
      { name: "TanStack Start", category: "frontend" },
      { name: "Three.js", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "Framer Motion", category: "frontend" },
      { name: "Radix UI", category: "frontend" },
      { name: "Recharts", category: "frontend" },
      { name: "Vite", category: "frontend" },
    ],
  },
  {
    category: "ai-ml",
    label: "AI & Computer Vision",
    items: [
      { name: "ReAct Agents", category: "ai-ml" },
      { name: "MediaPipe Vision AI", category: "ai-ml" },
      { name: "Goal Decomposition", category: "ai-ml" },
      { name: "Tesseract.js OCR", category: "ai-ml" },
      { name: "RAG Pipelines", category: "ai-ml" },
      { name: "TensorFlow", category: "ai-ml" },
    ],
  },
  {
    category: "backend",
    label: "Backend & Cloud",
    items: [
      { name: "FastAPI", category: "backend" },
      { name: "Nitro", category: "backend" },
      { name: "Supabase", category: "backend" },
      { name: "Uvicorn", category: "backend" },
      { name: "Pydantic", category: "backend" },
      { name: "Node.js", category: "backend" },
      { name: "Vercel", category: "cloud" },
    ],
  },
  {
    category: "tools",
    label: "Tools & Testing",
    items: [
      { name: "Git", category: "tools" },
      { name: "Vitest", category: "tools" },
      { name: "Zod", category: "tools" },
      { name: "Web Audio API", category: "tools" },
      { name: "React Hook Form", category: "tools" },
      { name: "GitHub Actions", category: "tools" },
    ],
  },
];

export const allTechNames: string[] = techGroups.flatMap((g) =>
  g.items.map((t) => t.name)
);
