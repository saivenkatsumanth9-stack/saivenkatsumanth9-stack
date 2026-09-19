import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverable = true, onClick, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden',
          hoverable && 'hover:border-[var(--color-accent)] cursor-pointer',
          className
        )}
        onClick={onClick}
        whileHover={hoverable ? { y: -2 } : undefined}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
