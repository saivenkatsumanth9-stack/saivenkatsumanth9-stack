import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "accent"
    | "status"
    | "outline"
    | "status-green"
    | "status-yellow"
    | "status-red";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-mono font-medium rounded-md transition-colors",
        {
          "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]":
            variant === "default",
          "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border border-[var(--color-accent)]/30":
            variant === "accent",
          "bg-green-500/10 text-green-400 border border-green-500/20":
            variant === "status" || variant === "status-green",
          "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20":
            variant === "status-yellow",
          "bg-red-500/10 text-red-400 border border-red-500/20":
            variant === "status-red",
          "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border)]":
            variant === "outline",
        },
        {
          "px-2 py-0.5 text-[11px]": size === "sm",
          "px-2.5 py-1 text-xs": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
