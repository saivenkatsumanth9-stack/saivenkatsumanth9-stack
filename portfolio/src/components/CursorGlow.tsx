import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CursorGlow() {
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const ease = 0.15;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop, reducedMotion]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
        opacity: 0.08,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
