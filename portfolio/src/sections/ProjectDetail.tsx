import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  GitFork,
  Calendar,
  Layers,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useGitHubRepo } from "@/hooks/useGitHub";
import { formatDate } from "@/lib/utils";

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  const repoPath = project.githubUrl.replace("https://github.com/", "");
  const { stats, loading: statsLoading } = useGitHubRepo(repoPath);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name}>
      <div className="space-y-8 text-left">
        {/* Header & Tagline */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              {project.primaryLanguage}
            </span>
            <span className="text-[var(--color-border)]">•</span>
            <Badge variant="status" size="sm">
              {project.status.toUpperCase()}
            </Badge>
            {project.featured && (
              <Badge variant="accent" size="sm">
                FEATURED
              </Badge>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            {project.name}
          </h2>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] mt-1 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons & Live Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--color-border)]">
          {project.liveUrl && (
            <Button
              variant="primary"
              size="md"
              href={project.liveUrl}
              className="flex items-center gap-2"
            >
              <span>Live Application Demo</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="secondary"
            size="md"
            href={project.githubUrl}
            className="flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source Code</span>
          </Button>

          {/* GitHub Live Stats Pill */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-muted)] ml-auto">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500" />
              {statsLoading ? "..." : stats.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
              {statsLoading ? "..." : stats.forks}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(project.createdAt)}
            </span>
          </div>
        </div>

        {/* Overview, Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.problem && (
            <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]/60 border border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-red)] mb-2 font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>THE PROBLEM</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)]/60 border border-[var(--color-border)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-green)] mb-2 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>THE SOLUTION</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {project.solution}
              </p>
            </div>
          )}
        </div>

        {/* Deep Description */}
        <div className="space-y-2">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Deep Dive Overview</span>
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)]/30 p-4 rounded-xl border border-[var(--color-border)]">
            {project.description}
          </p>
        </div>

        {/* Key Features Breakdown */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-cyan)]" />
              <span>Core Architectural Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
                >
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Architecture Flow Diagram */}
        {project.architecture && (
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[var(--color-purple)]" />
              <span>System & Data Flow Architecture</span>
            </h3>
            <div className="p-5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-x-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 min-w-[500px]">
                {project.architecture.nodes.map((node, idx) => (
                  <React.Fragment key={node.id}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 text-center p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] hover:border-[var(--color-accent)] transition-all cursor-default shadow-sm group w-full md:w-auto"
                    >
                      <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
                        {node.type}
                      </div>
                      <div className="text-sm font-bold text-[var(--color-text)] mt-0.5">
                        {node.label}
                      </div>
                      {node.description && (
                        <div className="text-[11px] text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                          {node.description}
                        </div>
                      )}
                    </motion.div>
                    {idx < project.architecture!.nodes.length - 1 && (
                      <div className="text-[var(--color-accent)] font-bold px-1 rotate-90 md:rotate-0 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tech Arsenal */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
            Verified Stack & Dependencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech.name} variant="outline" size="sm">
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
