import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  onClick,
  className,
  disabled,
  type = "button",
}: ButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-mono font-semibold rounded-xl transition-all cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-md shadow-[var(--color-accent)]/20":
        variant === "primary",
      "border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)] text-[var(--color-text)] hover:bg-[var(--color-bg-tertiary)]":
        variant === "secondary",
      "bg-transparent hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)]":
        variant === "ghost",
      "border border-[var(--color-accent)]/40 bg-transparent text-[var(--color-accent)] hover:bg-[var(--color-accent-glow)]":
        variant === "outline",
    },
    {
      "px-3 py-1.5 text-xs": size === "sm",
      "px-4 py-2 text-sm": size === "md",
      "px-6 py-3 text-base": size === "lg",
    },
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target || (href.startsWith("http") ? "_blank" : undefined)}
        rel={rel || (href.startsWith("http") ? "noopener noreferrer" : undefined)}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
}
