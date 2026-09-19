import { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { DeveloperDashboard } from "@/sections/DeveloperDashboard";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Projects } from "@/sections/Projects";
import { ProjectDetail } from "@/sections/ProjectDetail";
import { AIExperiments } from "@/sections/AIExperiments";
import { TechStack } from "@/sections/TechStack";
import { Timeline } from "@/sections/Timeline";
import { HowIBuild } from "@/sections/HowIBuild";
import { GitHubActivity } from "@/sections/GitHubActivity";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Terminal } from "@/components/Terminal";
import { CommandPalette } from "@/components/CommandPalette";
import { CursorGlow } from "@/components/CursorGlow";
import { useEasterEggs } from "@/hooks/useEasterEggs";
import { useKeyboard } from "@/hooks/useKeyboard";
import type { Project } from "@/types";

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);

  const { matrixActive } = useEasterEggs();

  const handleOpenDetail = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
  }, []);

  const handleToggleTerminal = useCallback(() => {
    setIsTerminalOpen((prev) => !prev);
  }, []);

  const handleToggleTheme = useCallback(() => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }, []);

  const handleSelectTech = useCallback((techName: string) => {
    if (selectedTechFilter?.toLowerCase() === techName.toLowerCase()) {
      setSelectedTechFilter(null);
    } else {
      setSelectedTechFilter(techName);
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedTechFilter]);

  const handleClearTechFilter = useCallback(() => {
    setSelectedTechFilter(null);
  }, []);

  // Global Keyboard shortcuts: Cmd/Ctrl+K, Cmd/Ctrl+`
  useKeyboard({
    "mod+k": (e) => {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
    },
    "mod+`": (e) => {
      e.preventDefault();
      setIsTerminalOpen((prev) => !prev);
    },
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] relative selection:bg-[var(--color-accent)] selection:text-white">
      {/* Ambient background glow & Matrix Easter Egg */}
      <CursorGlow />
      {matrixActive && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-black/80 font-mono text-green-500 p-8 text-xs overflow-hidden flex flex-col justify-center items-center">
          <div className="animate-pulse text-lg font-bold mb-4">
            ⚡ KONAMI PROTOCOL ENGAGED // ACCESS GRANTED
          </div>
          <p className="text-center text-gray-400 max-w-md">
            "We build intelligence by structuring thought." Welcome to the developer inner sanctum.
          </p>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleTerminal={handleToggleTerminal}
      />

      {/* Main Page Content Flow */}
      <main className="relative z-10">
        <Hero onToggleTerminal={handleToggleTerminal} />
        <DeveloperDashboard />
        <FeaturedProjects onSelectProject={handleOpenDetail} />
        <Projects
          onSelectProject={handleOpenDetail}
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={handleClearTechFilter}
        />
        <AIExperiments onSelectProject={handleOpenDetail} />
        <TechStack
          onSelectTech={handleSelectTech}
          selectedTech={selectedTechFilter}
        />
        <Timeline onSelectProject={handleOpenDetail} />
        <HowIBuild />
        <GitHubActivity />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals, Overlays & Interactive Drawers */}
      <ProjectDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTerminal={handleToggleTerminal}
        onToggleTheme={handleToggleTheme}
      />

      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
