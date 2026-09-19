import React from "react";
import { User, GraduationCap, MapPin, Coffee } from "lucide-react";
import { profile } from "@/data/profile";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <User className="w-3.5 h-3.5" />
            <span>ENGINEER PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Passionate software engineer building resilient web products, deterministic agents, and scalable tooling.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Bio Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6 p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
            Engineering for real-world impact through relentless shipping.
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
            I am a 3rd-year Computer Science student at {profile.university}, deeply passionate about full-stack engineering, AI automation, and agentic workflows.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
            Rather than relying solely on theory, I learn by crafting complete end-to-end applications: from government welfare decision engines (BENEFITX) and ReAct multi-tool research agents to dark-first financial trackers (FinFlow).
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
            My development philosophy adheres strictly to clean code architecture, type safety, deterministic logic over black-box guesswork, and continuous test automation.
          </p>

          <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-4 text-xs font-mono text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-400" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              {profile.education}
            </span>
            <span className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-amber-400" />
              Fueled by coffee & code
            </span>
          </div>
        </div>

        {/* Right Terminal Bio Snippet (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden">
          <div className="p-3 bg-[var(--color-bg-tertiary)] border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
            </div>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              neofetch.sh
            </span>
            <div className="w-8"></div>
          </div>

          <div className="p-6 font-mono text-xs text-[var(--color-text-secondary)] space-y-2 leading-relaxed overflow-x-auto">
            <div>
              <span className="text-[var(--color-accent)] font-bold">sumanth@dev</span>:
              <span className="text-[var(--color-text-muted)]">~</span>$ neofetch --summary
            </div>
            <div className="pt-2 text-[var(--color-text)]">
              <span className="text-yellow-400 font-bold">OS:</span> Developer Command Center 2026
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Host:</span> {profile.fullName}
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Role:</span> Full-Stack & AI Builder
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Education:</span> {profile.education} @ {profile.university}
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Languages:</span> TypeScript, Python, Java, C#, C
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Frameworks:</span> React 19, FastAPI, Tailwind CSS v4
            </div>
            <div>
              <span className="text-yellow-400 font-bold">Status:</span> Open for Software Internships & Collabs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
