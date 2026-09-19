import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  Wrench,
  CheckCircle,
  User,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AIExperimentsProps {
  onSelectProject: (project: Project) => void;
}

const AGENT_STAGES = [
  {
    id: "user",
    title: "USER PROMPT",
    subtitle: "Complex Compound Query",
    icon: User,
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    example: '"Who was Ada Lovelace and calculate 12 * (7 + 3)"',
  },
  {
    id: "agent",
    title: "REACT AGENT",
    subtitle: "Autonomous Controller",
    icon: Bot,
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    example: "Thought: Break into 2 distinct tasks (Search + Math)",
  },
  {
    id: "reasoning",
    title: "GOAL DECOMPOSITION",
    subtitle: "Deterministic Planner",
    icon: BrainCircuit,
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    example: "Action 1: wikipedia_summary, Action 2: calculator",
  },
  {
    id: "tools",
    title: "TOOL EXECUTION",
    subtitle: "AST Math & Wikipedia",
    icon: Wrench,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    example: "Observation: 120 calculated safely via AST parse",
  },
  {
    id: "result",
    title: "SYNTHESIS RESULT",
    subtitle: "Consolidated Response",
    icon: CheckCircle,
    color: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    example: "Final Answer returned with full trace inspectability",
  },
];

export const AIExperiments: React.FC<AIExperimentsProps> = ({
  onSelectProject,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const aiProjects = projects.filter(
    (p) => p.categories.includes("ai") || p.categories.includes("agentic-ai")
  );

  return (
    <section id="ai" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-400 mb-4">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>AGENTIC WORKFLOWS & AUTONOMY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            AI & Agentic Systems
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Building transparent, inspectable reasoning loops and deterministic agent architectures that solve real tasks.
          </p>
        </div>
      </ScrollReveal>

      {/* Interactive Agent Flow Pipeline */}
      <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-16 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--color-accent)]" />
            <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--color-text)] font-semibold">
              Live Agent ReAct Pipeline Simulation
            </h3>
          </div>
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            Step {activeStep + 1} of {AGENT_STAGES.length}
          </span>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {AGENT_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? `${stage.border} ${stage.bg} shadow-lg scale-[1.02]`
                    : "border-[var(--color-border)] bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-hover)] opacity-80"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stage.bg} ${stage.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <h4 className="text-xs font-bold font-mono text-[var(--color-text)]">
                  {stage.title}
                </h4>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                  {stage.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dynamic Trace Inspection Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-secondary)]"
        >
          <div className="flex items-center justify-between text-[var(--color-text-muted)] mb-1 pb-1 border-b border-[var(--color-border)] text-[11px]">
            <span>TRACE LOG &bull; {AGENT_STAGES[activeStep]?.title}</span>
            <span className="text-[var(--color-green)]">EXECUTION: NOMINAL</span>
          </div>
          <p className="pt-2 text-[var(--color-text)] font-medium">
            &gt; {AGENT_STAGES[activeStep]?.example}
          </p>
        </motion.div>
      </div>

      {/* AI Projects Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {aiProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="p-6 md:p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-purple-500/50 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <Badge variant="accent" size="sm">
                {project.primaryLanguage}
              </Badge>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                {project.status.toUpperCase()}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[var(--color-text)] group-hover:text-purple-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-1 mb-3">
              {project.tagline}
            </p>
            <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.slice(0, 5).map((t) => (
                <Badge key={t.name} variant="outline" size="sm">
                  {t.name}
                </Badge>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold">
                Explore Architecture Details &rarr;
              </span>
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-accent)] text-[var(--color-text)] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
