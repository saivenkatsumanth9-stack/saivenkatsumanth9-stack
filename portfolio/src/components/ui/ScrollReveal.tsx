import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export type RevealVariant = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';

export interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'slideUp',
  delay = 0,
  duration = 0.5,
  className,
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref as any}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={cn('', className)}
    >
      {children}
    </motion.div>
  );
};
