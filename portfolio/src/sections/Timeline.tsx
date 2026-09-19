import React from "react";
import { motion } from "framer-motion";
import { Calendar, GitCommit, ArrowUpRight, Clock } from "lucide-react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatDate } from "@/lib/utils";

interface TimelineProps {
  onSelectProject: (project: Project) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onSelectProject }) => {
  // Sort projects chronologically (newest first)
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL BUILD HISTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Project Evolution
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Milestones and evolution across full-stack architectures, algorithms, and agentic workflows.
          </p>
        </div>
      </ScrollReveal>

      {/* Timeline Tree */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-border)] -translate-x-1/2" />

        <div className="space-y-12">
          {sortedProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-8`}
              >
                {/* Center Node Indicator */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] border-2 border-[var(--color-accent)] flex items-center justify-center z-10 shadow-lg">
                  <GitCommit className="w-4 h-4 text-[var(--color-accent)]" />
                </div>

                {/* Content Card */}
                <div className="ml-10 md:ml-0 md:w-1/2 md:px-6">
                  <motion.div
                    whileHover={{ y: -4 }}
                    onClick={() => onSelectProject(project)}
                    className="p-6 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-[var(--color-accent)] font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(project.createdAt)}
                      </span>
                      <Badge variant="outline" size="sm">
                        {project.primaryLanguage}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex items-center justify-between">
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-1 mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--color-border)]">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t.name}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
