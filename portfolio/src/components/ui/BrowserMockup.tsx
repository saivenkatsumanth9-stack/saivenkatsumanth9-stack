import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

export interface BrowserMockupProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
}

export const BrowserMockup: React.FC<BrowserMockupProps> = ({
  url = 'localhost:3000',
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-xl',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-tertiary)]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[var(--color-red)]/90" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-yellow)]/90" />
          <div className="w-3 h-3 rounded-full bg-[var(--color-green)]/90" />
        </div>
        <div className="flex-1 flex justify-center px-4">
          <div className="flex items-center justify-center w-full max-w-md px-3 py-1.5 space-x-2 text-xs rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] font-mono">
            <Lock className="w-3 h-3 text-[var(--color-green)]" />
            <span className="truncate">{url}</span>
          </div>
        </div>
        <div className="w-10"></div>
      </div>
      <div className="relative w-full h-full bg-[var(--color-bg)] font-sans">
        {children}
      </div>
    </div>
  );
};
