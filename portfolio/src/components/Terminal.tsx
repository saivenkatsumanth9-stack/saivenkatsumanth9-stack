import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { techGroups } from "@/data/technologies";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "init",
      command: "welcome",
      output: (
        <div className="text-[var(--color-text-secondary)] space-y-1">
          <p className="text-[var(--color-accent)] font-bold">
            Sumanth Interactive Command Console v2.6.0
          </p>
          <p>Type <span className="text-[var(--color-cyan)]">help</span> to list all available system commands.</p>
        </div>
      ),
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, logs]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-xs">
            <p className="text-[var(--color-text)] font-bold">AVAILABLE SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[var(--color-text-muted)]">
              <div><span className="text-[var(--color-cyan)]">projects</span> — List all active repository builds</div>
              <div><span className="text-[var(--color-cyan)]">skills</span> — Display engineering capabilities</div>
              <div><span className="text-[var(--color-cyan)]">whoami</span> — Current user profile</div>
              <div><span className="text-[var(--color-cyan)]">about</span> — Developer background & education</div>
              <div><span className="text-[var(--color-cyan)]">contact</span> — Get direct communication links</div>
              <div><span className="text-[var(--color-cyan)]">github</span> — Open GitHub profile</div>
              <div><span className="text-[var(--color-cyan)]">clear</span> — Wipe terminal logs</div>
              <div><span className="text-[var(--color-cyan)]">sudo hire-me</span> — Unlock recruiter protocol</div>
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2">
            <p className="text-[var(--color-text)] font-semibold">PRODUCTION BUILDS & EXPERIMENTS:</p>
            {projects.map((p) => (
              <div key={p.id} className="pl-2 border-l-2 border-[var(--color-accent)]">
                <span
                  onClick={() => {
                    const el = document.getElementById("projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    onClose();
                  }}
                  className="text-[var(--color-accent)] font-bold hover:underline cursor-pointer"
                >
                  {p.name}
                </span>
                <span className="text-[var(--color-text-muted)]"> [{p.primaryLanguage}]</span>
                <p className="text-[var(--color-text-secondary)] text-[11px]">{p.tagline}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2">
            <p className="text-[var(--color-text)] font-semibold">VERIFIED TECHNOLOGY ARSENAL:</p>
            {techGroups.map((g) => (
              <div key={g.category} className="text-xs">
                <span className="text-[var(--color-purple)] font-bold">{g.label}:</span>{" "}
                <span className="text-[var(--color-text-secondary)]">
                  {g.items.map((t) => t.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-xs space-y-1">
            <p className="text-[var(--color-text)] font-bold">{profile.fullName}</p>
            <p className="text-[var(--color-text-secondary)]">{profile.title}</p>
            <p className="text-[var(--color-text-muted)]">{profile.location} &bull; {profile.education}</p>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
            {profile.bio}
          </p>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs space-y-1">
            <p>Email: <a href={`mailto:${profile.email}`} className="text-[var(--color-accent)] underline">{profile.email}</a></p>
            <p>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">{profile.linkedin}</a></p>
            <p>GitHub: <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] underline">{profile.github}</a></p>
          </div>
        );
        break;

      case "github":
        window.open(profile.github, "_blank");
        output = <p className="text-xs text-green-400">Opened {profile.github} in a new tab.</p>;
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      case "sudo hire-me":
        output = (
          <div className="p-3 rounded bg-green-500/10 border border-green-500/30 text-green-400 space-y-1 text-xs">
            <p className="font-bold">🎉 RECRUITER ACCESS GRANTED</p>
            <p>Looking for a high-velocity developer with AI and full-stack expertise? Let's connect immediately!</p>
            <p>Email: <strong className="underline">{profile.email}</strong></p>
          </div>
        );
        break;

      default:
        output = (
          <p className="text-xs text-red-400">
            command not found: "{cmdStr}". Type <span className="underline font-bold">help</span> for a list of valid commands.
          </p>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdStr,
        output,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          const historyCmd = history[history.length - 1 - nextIndex];
          if (historyCmd !== undefined) {
            setInput(historyCmd);
          }
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        const historyCmd = history[history.length - 1 - nextIndex];
        if (historyCmd !== undefined) {
          setInput(historyCmd);
        }
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-200 font-mono ${
        isMaximized
          ? "inset-4 md:inset-10"
          : "bottom-4 right-4 left-4 sm:left-auto sm:w-[540px] h-[400px]"
      }`}
    >
      <div className="w-full h-full rounded-2xl bg-[var(--color-bg)]/95 backdrop-blur-xl border border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden text-xs">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity"
              title="Close terminal"
            />
            <button
              onClick={() => setLogs([])}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity"
              title="Clear terminal"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80 transition-opacity"
              title="Toggle size"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[11px]">
            <TerminalIcon className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>sumanth@command-center:~</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {isMaximized ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Logs Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <span>➜</span>
                <span className="text-[var(--color-cyan)]">~</span>
                <span className="text-[var(--color-text)] font-semibold">$ {log.command}</span>
              </div>
              <div className="pl-4 text-[var(--color-text-secondary)]">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt */}
        <div className="p-3 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] flex items-center gap-2">
          <span className="text-[var(--color-accent)] font-bold">➜</span>
          <span className="text-[var(--color-cyan)]">~</span>
          <span className="text-[var(--color-text)] font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. 'projects', 'help')..."
            className="flex-1 bg-transparent border-none outline-none text-[var(--color-text)] placeholder-[var(--color-text-muted)] text-xs"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
