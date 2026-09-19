import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  BrainCircuit,
  Wrench,
  User,
  Mail,
  SunMoon,
  Terminal as TerminalIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/data/profile";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleTerminal: () => void;
  onToggleTheme: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onToggleTerminal,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const commands = [
    {
      id: "projects",
      title: "Explore Projects",
      subtitle: "Filter all production builds and repositories",
      icon: FolderGit2,
      action: () => scrollTo("projects"),
      keywords: ["project", "code", "repo", "benefitx", "finflow", "agent"],
    },
    {
      id: "ai",
      title: "AI & Agentic Systems",
      subtitle: "Inspect ReAct reasoning loops and agents",
      icon: BrainCircuit,
      action: () => scrollTo("ai"),
      keywords: ["ai", "agent", "react", "llm", "intelligence"],
    },
    {
      id: "tech-stack",
      title: "View Technology Arsenal",
      subtitle: "Explore languages, frameworks, and tools",
      icon: Wrench,
      action: () => scrollTo("tech-stack"),
      keywords: ["tech", "stack", "skills", "python", "react", "typescript"],
    },
    {
      id: "terminal",
      title: "Toggle Developer Terminal",
      subtitle: "Open the interactive command-line interface",
      icon: TerminalIcon,
      action: () => {
        onToggleTerminal();
        onClose();
      },
      keywords: ["terminal", "cli", "command", "shell", "console"],
    },
    {
      id: "theme",
      title: "Toggle Theme",
      subtitle: "Switch between Dark & Light modes",
      icon: SunMoon,
      action: () => {
        onToggleTheme();
        onClose();
      },
      keywords: ["theme", "dark", "light", "mode", "color"],
    },
    {
      id: "about",
      title: "About Developer",
      subtitle: "Read biography, background & education",
      icon: User,
      action: () => scrollTo("about"),
      keywords: ["about", "bio", "education", "nnres", "student"],
    },
    {
      id: "contact",
      title: "Contact Sumanth",
      subtitle: "Direct email and LinkedIn channels",
      icon: Mail,
      action: () => scrollTo("contact"),
      keywords: ["contact", "email", "hire", "collaborate", "reach"],
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      subtitle: "Visit github.com/saivenkatsumanth9-stack",
      icon: GithubIcon,
      action: () => {
        window.open(profile.github, "_blank");
        onClose();
      },
      keywords: ["github", "git", "source", "profile"],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.keywords.some((k) => k.includes(q))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) selected.action();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Search className="w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] font-mono"
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
                ESC
              </span>
            </div>

            {/* Commands List */}
            <div className="p-2 max-h-80 overflow-y-auto space-y-1">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-accent)] text-white"
                          : "text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-[var(--color-bg-tertiary)] text-[var(--color-accent)]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {cmd.title}
                          </div>
                          <div
                            className={`text-xs ${
                              isSelected
                                ? "text-white/80"
                                : "text-[var(--color-text-muted)]"
                            }`}
                          >
                            {cmd.subtitle}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono ${
                          isSelected
                            ? "text-white/70"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        ↵
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs font-mono text-[var(--color-text-muted)]">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Bottom Footer Hint */}
            <div className="px-4 py-2 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-muted)]">
              <span>Navigation: ↑ ↓ to browse</span>
              <span>Select: Enter ↵</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
