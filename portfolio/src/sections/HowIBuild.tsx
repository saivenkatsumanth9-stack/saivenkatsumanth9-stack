import React from "react";
import {
  Compass,
  Layout,
  Code2,
  Cpu,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "Identify",
    tagline: "Pinpoint Real-World Friction",
    description:
      "Find genuine unaddressed problems — from complex government welfare navigation to personal financial budgeting bottlenecks.",
    icon: Compass,
    color: "text-blue-400",
  },
  {
    step: "02",
    title: "Design",
    tagline: "Architecture & UX Specification",
    description:
      "Map out deterministic rules, schema models, component hierarchies, and interactive states before writing production code.",
    icon: Layout,
    color: "text-purple-400",
  },
  {
    step: "03",
    title: "Build",
    tagline: "Modern Engineering Core",
    description:
      "Develop performant full-stack systems using React 19, TypeScript, TanStack Start, FastAPI, and Tailwind CSS v4.",
    icon: Code2,
    color: "text-cyan-400",
  },
  {
    step: "04",
    title: "Integrate",
    tagline: "AI Models & System Toolsets",
    description:
      "Wire up ReAct loops, deterministic decision engines, OCR extractors, and rule-based planners for robust reasoning.",
    icon: Cpu,
    color: "text-amber-400",
  },
  {
    step: "05",
    title: "Test",
    tagline: "Comprehensive QA & Validation",
    description:
      "Execute automated test suites (e.g. 40/40 Vitest unit suites, AST sanity checks) with zero tolerance for runtime errors.",
    icon: ShieldCheck,
    color: "text-green-400",
  },
  {
    step: "06",
    title: "Ship",
    tagline: "Deploy & Continuous Iteration",
    description:
      "Release production builds to Vercel/Cloudflare with continuous CI/CD GitHub Actions pipelines.",
    icon: Rocket,
    color: "text-pink-400",
  },
];

export const HowIBuild: React.FC = () => {
  return (
    <section id="how-i-build" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>DEVELOPMENT LIFECYCLE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            How I Build Software
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            A disciplined, engineering-first methodology prioritizing architecture, verifiable testing, and user-centric UX.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <ScrollReveal
              key={item.step}
              variant="slideUp"
              delay={idx * 0.08}
            >
              <div className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-[var(--color-border-hover)] group-hover:text-[var(--color-accent)] transition-colors">
                      {item.step}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl bg-[var(--color-bg-tertiary)] ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--color-accent)] mb-3">
                    {item.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
