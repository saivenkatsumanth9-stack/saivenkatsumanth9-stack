import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Layers,
  Server,
  BrainCircuit,
  Wrench,
  Cloud,
} from "lucide-react";
import { techGroups } from "@/data/technologies";
import { projects } from "@/data/projects";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TechStackProps {
  onSelectTech: (techName: string) => void;
  selectedTech: string | null;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  language: Code,
  frontend: Layers,
  backend: Server,
  "ai-ml": BrainCircuit,
  tools: Wrench,
  cloud: Cloud,
};

export const TechStack: React.FC<TechStackProps> = ({
  onSelectTech,
  selectedTech,
}) => {
  return (
    <section id="tech-stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>VERIFIED CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Technology Arsenal
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Click any technology card to immediately filter and highlight the projects powered by it.
          </p>
        </div>
      </ScrollReveal>

      {/* Tech Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techGroups.map((group) => {
          const Icon = CATEGORY_ICONS[group.category] || Code;
          return (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[var(--color-border)]">
                  <div className="p-2 rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-accent)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--color-text)]">
                      {group.label}
                    </h3>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      {group.items.length} technologies
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => {
                    const isSelected =
                      selectedTech?.toLowerCase() === tech.name.toLowerCase();
                    const projectCount = projects.filter((p) =>
                      p.technologies.some(
                        (t) => t.name.toLowerCase() === tech.name.toLowerCase()
                      )
                    ).length;

                    return (
                      <motion.button
                        key={tech.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectTech(tech.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/30 font-bold"
                            : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)]"
                        }`}
                      >
                        <span>{tech.name}</span>
                        {projectCount > 0 && (
                          <span
                            className={`text-[10px] px-1 rounded ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-[var(--color-bg)] text-[var(--color-text-muted)]"
                            }`}
                          >
                            {projectCount}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
