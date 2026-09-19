import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WorkstationIllustration } from "@/components/WorkstationIllustration";
import { profile } from "@/data/profile";

interface HeroProps {
  onToggleTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onToggleTerminal }) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [terminalStep, setTerminalStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"workstation" | "terminal">("workstation");

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep((prev) => (prev < 4 ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-bg)] pt-20"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        {/* Left: Headline & Bio */}
        <motion.div
          className="flex-1 flex flex-col items-start w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Badge
              variant="status"
              size="sm"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-[var(--color-bg-secondary)] border-[var(--color-border)] rounded-full text-xs font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse"></span>
              Available for Opportunities & Internships
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-text)] leading-[1.1] tracking-tight mb-4"
          >
            Building Intelligent <br />
            <span className="gradient-text">Digital Experiences</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] font-medium mb-6 max-w-2xl font-mono"
          >
            {profile.subtitle}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[var(--color-text-muted)] text-sm sm:text-base mb-10 max-w-2xl leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Projects
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href={profile.github}
            >
              GitHub Profile
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>

        {/* Right: Interactive Workstation & Terminal Panel */}
        <motion.div
          className="w-full lg:w-[500px] xl:w-[540px] shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl overflow-hidden font-mono text-xs shadow-[0_0_40px_-15px_var(--color-accent-glow)] transition-all">
            {/* Panel Chrome Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--color-red)]"></div>
                <div className="w-3 h-3 rounded-full bg-[var(--color-yellow)]"></div>
                <div className="w-3 h-3 rounded-full bg-[var(--color-green)]"></div>
              </div>

              {/* View Switcher: Workstation vs Terminal */}
              <div className="flex items-center gap-1 bg-[var(--color-bg)]/80 p-0.5 rounded-lg border border-[var(--color-border)] text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveTab("workstation")}
                  className={`px-2.5 py-1 rounded-md transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "workstation"
                      ? "bg-[var(--color-accent)] text-white shadow-sm"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                  title="Interactive Workstation Illustration"
                >
                  <span>🖥️</span>
                  <span>Workstation</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("terminal")}
                  className={`px-2.5 py-1 rounded-md transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "terminal"
                      ? "bg-[var(--color-accent)] text-white shadow-sm"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  }`}
                  title="CLI Terminal Shell"
                >
                  <Terminal size={12} />
                  <span>Terminal</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onToggleTerminal}
                className="text-[10px] text-[var(--color-accent)] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                title="Expand full interactive terminal drawer"
              >
                <span>CLI ↗</span>
              </button>
            </div>

            {/* Panel Body Content */}
            {activeTab === "workstation" ? (
              <div className="p-3 bg-[var(--color-bg)]">
                <WorkstationIllustration heroContainerRef={heroRef} />
                <div className="mt-2.5 px-1 flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse"></span>
                    <span>Interactive Mouse • Move cursor to control</span>
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">60 FPS Physics</span>
                </div>
              </div>
            ) : (
              <div
                onClick={onToggleTerminal}
                className="p-6 text-[var(--color-text-secondary)] min-h-[220px] bg-[var(--color-bg)] cursor-pointer hover:bg-[var(--color-bg-secondary)]/50 transition-colors"
                title="Click to expand full interactive terminal"
              >
                <div className="space-y-3.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[var(--color-accent)]">
                      <span>➜</span>
                      <span className="text-[var(--color-cyan)]">$ whoami</span>
                    </div>
                    {terminalStep >= 1 && (
                      <div className="text-[var(--color-text)] ml-4 font-semibold">
                        developer &bull; full-stack engineer
                      </div>
                    )}
                  </div>

                  {terminalStep >= 1 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[var(--color-accent)]">
                        <span>➜</span>
                        <span className="text-[var(--color-cyan)]">$ focus</span>
                      </div>
                      {terminalStep >= 2 && (
                        <div className="text-[var(--color-text)] ml-4 font-semibold text-purple-400">
                          AI Agents + Modern Web Architectures
                        </div>
                      )}
                    </div>
                  )}

                  {terminalStep >= 2 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[var(--color-accent)]">
                        <span>➜</span>
                        <span className="text-[var(--color-cyan)]">$ status</span>
                      </div>
                      {terminalStep >= 3 && (
                        <div className="text-[var(--color-green)] ml-4 font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse"></span>
                          building & shipping active builds...
                        </div>
                      )}
                    </div>
                  )}

                  {terminalStep >= 3 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[var(--color-accent)]">
                        <span>➜</span>
                        <span className="text-[var(--color-cyan)]">$ projects</span>
                      </div>
                      {terminalStep >= 4 && (
                        <div className="text-[var(--color-text)] ml-4">
                          BENEFITX, Research Agent, FinFlow
                        </div>
                      )}
                    </div>
                  )}

                  {terminalStep >= 4 && (
                    <div className="flex items-center gap-2 text-[var(--color-accent)] animate-pulse pt-1">
                      <span>➜</span>
                      <span className="text-[var(--color-cyan)]">$</span>
                      <span className="w-2 h-4 bg-[var(--color-accent)] inline-block"></span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Chevron */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() =>
          document
            .getElementById("dashboard")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">
          Explore System
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
};
