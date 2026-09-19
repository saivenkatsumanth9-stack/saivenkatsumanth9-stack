import React, { useState } from "react";
import {
  Mail,
  Send,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--color-border)]">
      <ScrollReveal variant="slideUp">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 text-xs font-mono text-[var(--color-accent)] mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-text)]">
            Initiate Contact
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-3">
            Interested in collaborating, hiring for internships, or discussing AI systems? Reach out through any of the channels below.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email Card */}
        <div className="p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all flex flex-col justify-between group">
          <div>
            <div className="p-3 w-fit rounded-xl bg-red-500/10 text-red-400 mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              Direct Email
            </h3>
            <p className="text-xs font-mono text-[var(--color-text-muted)] mb-6 truncate">
              {profile.email}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="w-full py-2 px-4 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-blue-500 transition-all flex flex-col justify-between group">
          <div>
            <div className="p-3 w-fit rounded-xl bg-blue-500/10 text-blue-400 mb-6">
              <LinkedinIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              LinkedIn
            </h3>
            <p className="text-xs font-mono text-[var(--color-text-muted)] mb-6">
              Professional Network & Experience
            </p>
          </div>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-blue-600 hover:text-white border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--color-text)] transition-all flex items-center justify-center gap-2"
          >
            <span>Connect on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* GitHub Card */}
        <div className="p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all flex flex-col justify-between group">
          <div>
            <div className="p-3 w-fit rounded-xl bg-[var(--color-bg-tertiary)] text-[var(--color-text)] mb-6">
              <GithubIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">
              GitHub Repositories
            </h3>
            <p className="text-xs font-mono text-[var(--color-text-muted)] mb-6">
              Code, PRs & Active Commits
            </p>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] border border-[var(--color-border)] text-xs font-mono font-semibold text-[var(--color-text)] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Repos</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
