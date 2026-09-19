import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-mono font-bold text-[var(--color-accent)]">
              S.
            </span>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Built with curiosity, code & AI.
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
            &copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-blue-400 hover:border-blue-500/50 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="p-2 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-red-400 hover:border-red-500/50 transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
