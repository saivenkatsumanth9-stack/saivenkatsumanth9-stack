import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}) => {
  const { ref, isVisible } = useScrollReveal();
  const [hasTriggered, setHasTriggered] = useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) => {
    return Math.round(current).toString();
  });

  useEffect(() => {
    if (isVisible && !hasTriggered) {
      springValue.set(value);
      setHasTriggered(true);
    }
  }, [isVisible, hasTriggered, springValue, value]);

  return (
    <span ref={ref as any} className={cn('inline-flex items-center font-mono', className)}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};
