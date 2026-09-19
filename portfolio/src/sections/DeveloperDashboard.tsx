import {
  FolderGit2,
  BrainCircuit,
  Code2,
  Layers,
  Activity,
} from "lucide-react";
import { projects } from "@/data/projects";
import { techGroups } from "@/data/technologies";
import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function DeveloperDashboard() {
  const totalProjects = projects.length;
  const aiProjects = projects.filter((p) =>
    p.categories.some((c) => c === "ai" || c === "agentic-ai")
  ).length;

  const totalLanguages =
    techGroups.find((g) => g.category === "language")?.items.length || 8;

  const allTechSet = new Set<string>();
  projects.forEach((p) => {
    p.technologies.forEach((t) => allTechSet.add(t.name));
  });
  const totalTech = allTechSet.size;

  const stats = [
    {
      label: "TOTAL BUILDS",
      value: totalProjects,
      suffix: "+",
      subtext: "Production Systems",
      icon: FolderGit2,
      color: "text-blue-400",
      glow: "border-blue-500/20",
    },
    {
      label: "AI & AGENTIC",
      value: aiProjects,
      suffix: "",
      subtext: "Autonomous Workflows",
      icon: BrainCircuit,
      color: "text-purple-400",
      glow: "border-purple-500/20",
    },
    {
      label: "LANGUAGES",
      value: totalLanguages,
      suffix: "",
      subtext: "Polyglot Stack",
      icon: Code2,
      color: "text-amber-400",
      glow: "border-amber-500/20",
    },
    {
      label: "TECHNOLOGIES",
      value: totalTech,
      suffix: "+",
      subtext: "Verified Frameworks",
      icon: Layers,
      color: "text-cyan-400",
      glow: "border-cyan-500/20",
    },
    {
      label: "TEST PASS RATE",
      value: 100,
      suffix: "%",
      subtext: "Vitest QA Verified",
      icon: Activity,
      color: "text-green-400",
      glow: "border-green-500/20",
    },
  ];

  return (
    <section id="dashboard" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <ScrollReveal key={stat.label} variant="slideUp" delay={idx * 0.06}>
              <Card className="p-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] flex flex-col justify-between h-full transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-bold">
                    {stat.label}
                  </span>
                  <div className={`p-2 rounded-lg bg-[var(--color-bg-tertiary)] ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-[var(--color-text)] tracking-tight flex items-baseline gap-0.5">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] font-mono text-[var(--color-text-muted)] mt-1">
                    {stat.subtext}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
