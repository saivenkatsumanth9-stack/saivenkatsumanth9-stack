import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Terminal as TerminalIcon } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

const navLinks = [
  { name: "Home", href: "home" },
  { name: "Projects", href: "projects" },
  { name: "AI", href: "ai" },
  { name: "Tech Stack", href: "tech-stack" },
  { name: "Timeline", href: "timeline" },
  { name: "GitHub", href: "github" },
  { name: "About", href: "about" },
  { name: "Contact", href: "contact" },
];

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onToggleTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onToggleTerminal,
}) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          const mostVisible = visibleSections.reduce((prev, current) => {
            return prev.intersectionRatio > current.intersectionRatio
              ? prev
              : current;
          });
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Monogram */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-mono font-black text-[var(--color-accent)] focus-visible:outline-none rounded-md cursor-pointer hover:scale-105 transition-transform"
            >
              S<span className="text-[var(--color-text)]">.</span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono font-medium transition-all rounded-lg cursor-pointer",
                  activeSection === link.href
                    ? "text-[var(--color-accent)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
                )}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Terminal Trigger */}
            <button
              onClick={onToggleTerminal}
              className="hidden sm:flex h-9 px-2.5 items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] text-xs font-mono cursor-pointer transition-colors"
              title="Toggle Terminal ($)"
            >
              <TerminalIcon className="h-3.5 w-3.5 text-[var(--color-green)]" />
              <span>CLI</span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex h-9 px-2.5 items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] text-xs font-mono cursor-pointer transition-colors"
              title="Command Palette (Ctrl+K)"
            >
              <Command className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span className="text-[10px] text-[var(--color-text-muted)]">⌘K</span>
            </button>

            {/* GitHub Link */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] transition-colors hover:border-[var(--color-border-hover)]"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)]"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--color-bg)] px-6 py-6"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-border)]">
              <span className="text-2xl font-mono font-bold text-[var(--color-accent)]">
                Sumanth.dev
              </span>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text)]"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "text-left text-xl font-bold py-2 border-b border-[var(--color-border)]/50",
                    activeSection === link.href
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text)]"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                peddi sai venkat sumanth
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--color-accent)] hover:underline flex items-center gap-1"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
