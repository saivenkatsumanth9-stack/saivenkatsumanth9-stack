import React from "react";
import {
  ExternalLink,
  ArrowRight,
  Star,
  GitFork,
  Clock,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getFeaturedProjects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { useGitHubRepo } from "@/hooks/useGitHub";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

function RepoStats({ githubUrl }: { githubUrl: string }) {
  const repoPath = githubUrl.replace("https://github.com/", "");
  const { stats, loading, error } = useGitHubRepo(repoPath);

  if (loading || error) return null;

  return (
    <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] font-mono mt-4 mb-6 p-3 rounded-lg bg-[var(--color-bg-tertiary)] w-fit border border-[var(--color-border)]">
      <div className="flex items-center gap-1.5">
        <Star size={14} className="text-yellow-500" />
        <span>{stats.stars}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <GitFork size={14} className="text-blue-400" />
        <span>{stats.forks}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock size={14} />
        <span>Updated {new Date(stats.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onSelectProject,
}) => {
  const featured = getFeaturedProjects();

  return (
    <section id="featured" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CASE STUDY SPOTLIGHT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Featured Builds
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Flagship products built end-to-end with production-grade engineering and live deployments.
          </p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-16">
        {featured.map((project, index) => (
          <ScrollReveal
            key={project.id}
            variant={index % 2 === 0 ? "slideLeft" : "slideRight"}
          >
            <Card className="flex flex-col lg:flex-row overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-all p-0">
              {/* Left Side: Mockup (55%) */}
              <div className="w-full lg:w-[55%] p-6 md:p-8 bg-[var(--color-bg-secondary)] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
                <BrowserMockup url={project.liveUrl || "http://localhost:3000"}>
                  <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center text-center p-8 bg-[var(--color-bg)] rounded-b-lg">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-glow)] text-[var(--color-accent)] border border-[var(--color-accent)]/30 flex items-center justify-center mb-4">
                      <span className="text-2xl font-mono font-bold">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-[var(--color-text)] mb-2 font-mono">
                      {project.name}
                    </h4>
                    <p className="text-xs text-[var(--color-text-secondary)] max-w-sm">
                      {project.tagline}
                    </p>
                    {project.liveUrl && (
                      <div className="mt-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-[11px] font-mono text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                          Live on Vercel
                        </span>
                      </div>
                    )}
                  </div>
                </BrowserMockup>
              </div>

              {/* Right Side: Details (45%) */}
              <div className="w-full lg:w-[45%] p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent" size="sm">
                    FEATURED
                  </Badge>
                  <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">
                    {project.primaryLanguage}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-6 font-medium leading-relaxed">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech.name} variant="outline" size="sm">
                      {tech.name}
                    </Badge>
                  ))}
                </div>

                <RepoStats githubUrl={project.githubUrl} />

                {project.features && project.features.length > 0 && (
                  <ul className="mb-8 space-y-2.5">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-text-secondary)]"
                      >
                        <ArrowRight
                          size={14}
                          className="text-[var(--color-accent)] shrink-0 mt-0.5"
                        />
                        <span>
                          <strong className="text-[var(--color-text)]">
                            {feature.title}:
                          </strong>{" "}
                          {feature.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--color-border)]">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onSelectProject(project)}
                  >
                    View Project Architecture
                  </Button>

                  {project.liveUrl && (
                    <Button
                      variant="ghost"
                      size="md"
                      href={project.liveUrl}
                      className="gap-2"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </Button>
                  )}

                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="md"
                      href={project.githubUrl}
                      className="gap-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Code</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
