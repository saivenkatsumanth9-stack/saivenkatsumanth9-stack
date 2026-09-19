import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  Star,
  GitFork,
  ArrowUpRight,
  Filter,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import {
  projects,
  projectCategories,
  type FilterCategory,
} from "@/data/projects";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useGitHubRepo } from "@/hooks/useGitHub";

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
}

const ProjectCard: React.FC<{
  project: Project;
  onSelect: (project: Project) => void;
}> = ({ project, onSelect }) => {
  const repoPath = project.githubUrl.replace("https://github.com/", "");
  const { stats } = useGitHubRepo(repoPath);

  return (
    <Card
      onClick={() => onSelect(project)}
      className="flex flex-col justify-between h-full group p-6 cursor-pointer border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Bar with Lang & Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-[var(--color-accent)] bg-[var(--color-accent-glow)] px-2 py-0.5 rounded border border-[var(--color-accent)]/30">
              {project.primaryLanguage}
            </span>
            <Badge variant="status" size="sm">
              {project.status}
            </Badge>
          </div>
          {project.featured && (
            <Badge variant="accent" size="sm">
              FEATURED
            </Badge>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors flex items-center justify-between">
          <span>{project.name}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--color-accent)]" />
        </h3>
        <p className="text-xs font-medium text-[var(--color-text-secondary)] mt-1 mb-3">
          {project.tagline}
        </p>

        {/* Short Description */}
        <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges (First 4) */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech.name} variant="outline" size="sm">
              {tech.name}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[11px] font-mono text-[var(--color-text-muted)] self-center px-1">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer Details & Live Links */}
      <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            {stats.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3.5 h-3.5 text-blue-400" />
            {stats.forks}
          </span>
        </div>

        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </Card>
  );
};

export const Projects: React.FC<ProjectsProps> = ({
  onSelectProject,
  selectedTechFilter,
  onClearTechFilter,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" ||
        project.categories.includes(activeCategory as any);

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.name.toLowerCase().includes(q));

      const matchesTech =
        !selectedTechFilter ||
        project.technologies.some(
          (t) => t.name.toLowerCase() === selectedTechFilter.toLowerCase()
        );

      return matchesCategory && matchesSearch && matchesTech;
    });
  }, [activeCategory, searchQuery, selectedTechFilter]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRODUCTION BUILDS & EXPERIMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Explore All Projects
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Real-world systems, autonomous agents, and full-stack solutions built with verified architectures.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter & Search Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (onClearTechFilter) onClearTechFilter();
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id && !selectedTechFilter
                    ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20"
                    : "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search builds or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
        </div>

        {/* Active Technology Banner */}
        {selectedTechFilter && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/40 text-xs font-mono text-[var(--color-text)]">
            <span className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              Showing projects built with:{" "}
              <strong className="text-[var(--color-accent)]">
                {selectedTechFilter}
              </strong>
            </span>
            <button
              onClick={onClearTechFilter}
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <p className="text-base text-[var(--color-text-secondary)] font-mono">
            No projects found matching the specified criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
              if (onClearTechFilter) onClearTechFilter();
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
