import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface CursorFollowingMouseOptions {
  /** Interpolation factor for smooth easing (recommended 0.05 - 0.12) */
  lerpFactor?: number;
  /** Maximum horizontal travel distance in pixels */
  maxX?: number;
  /** Maximum vertical travel distance in pixels */
  maxY?: number;
  /** Maximum tilt / rotation angle in degrees */
  maxRotation?: number;
  /** Multiplier determining how much horizontal velocity tilts the mouse */
  rotationFactor?: number;
}

/**
 * Custom hook that animates an illustrated desk mouse to smoothly track the visitor's cursor
 * within the Hero section.
 *
 * Features:
 * - Direct DOM manipulation via `translate3d` and `rotate` (no state updates on pointer move).
 * - Smooth lerp easing (`current += (target - current) * lerpFactor`).
 * - Velocity-sensitive subtle tilt.
 * - Dynamic desk boundary clamping.
 * - Smooth return to base position when cursor leaves the hero area.
 * - Automatic disable on touch/mobile devices or when `prefers-reduced-motion` is active.
 */
export function useCursorFollowingMouse<
  TContainer extends HTMLElement = HTMLElement,
  TMouse extends HTMLElement = HTMLElement,
  TShadow extends HTMLElement = HTMLElement
>(
  containerRef: React.RefObject<TContainer | null>,
  options: CursorFollowingMouseOptions = {}
) {
  const {
    lerpFactor = 0.08,
    maxX = 55,
    maxY = 28,
    maxRotation = 7,
    rotationFactor = 0.35,
  } = options;

  const mouseRef = useRef<TMouse | null>(null);
  const shadowRef = useRef<TShadow | null>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect touch-only / coarse pointer devices (disable cursor tracking on mobile/touch)
    const isTouchOnly =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(pointer: fine)").matches;

    if (reducedMotion || isTouchOnly) {
      // Keep mouse and shadow at resting origin
      if (mouseRef.current) {
        mouseRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
      }
      if (shadowRef.current) {
        shadowRef.current.style.transform = "translate3d(0, 4px, 0) scale(1)";
      }
      return;
    }

    // State stored in refs to avoid React re-renders during 60fps animation
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const prevCurrent = { x: 0 };
    let currentRotation = 0;
    let isInside = false;
    let rafId: number | null = null;
    let isLoopRunning = false;

    // Boundary updater based on current container size
    const updateTarget = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      // Calculate cursor position relative to container center (-1 to +1)
      const relX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamp normalized values between -1 and 1
      const clampedRelX = Math.max(-1, Math.min(1, relX));
      const clampedRelY = Math.max(-1, Math.min(1, relY));

      // Calculate permitted desk displacement
      target.x = clampedRelX * maxX;
      target.y = clampedRelY * maxY;

      startLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch events to prevent unexpected dragging
      if (e.pointerType === "touch") return;
      isInside = true;
      updateTarget(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      isInside = false;
      // Target smoothly resets to resting center position (0, 0)
      target.x = 0;
      target.y = 0;
      startLoop();
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isInside = true;
      updateTarget(e.clientX, e.clientY);
    };

    // Main animation loop using requestAnimationFrame
    const animate = () => {
      // Smooth interpolation (lerp)
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      current.x += dx * lerpFactor;
      current.y += dy * lerpFactor;

      // Compute velocity for realistic physical tilt
      const velocityX = current.x - prevCurrent.x;
      prevCurrent.x = current.x;

      // Target rotation proportional to movement velocity, smoothly clamped
      const rawTargetRotation = velocityX * rotationFactor * 10;
      const targetRotation = Math.max(
        -maxRotation,
        Math.min(maxRotation, rawTargetRotation)
      );
      currentRotation += (targetRotation - currentRotation) * 0.12;

      // Apply 3D hardware-accelerated transform to physical mouse
      if (mouseRef.current) {
        mouseRef.current.style.transform = `translate3d(${current.x.toFixed(
          2
        )}px, ${current.y.toFixed(2)}px, 0) rotate(${currentRotation.toFixed(
          2
        )}deg)`;
      }

      // Apply subtle lagging transform to ground shadow (attached to desk plane)
      if (shadowRef.current) {
        const shadowX = current.x * 0.82;
        const shadowY = current.y * 0.82 + 4;
        const shadowScale = 1 - Math.abs(currentRotation) * 0.012;
        shadowRef.current.style.transform = `translate3d(${shadowX.toFixed(
          2
        )}px, ${shadowY.toFixed(2)}px, 0) scale(${shadowScale.toFixed(3)})`;
      }

      // Continue animation if still moving or cursor is active
      const distance = Math.hypot(dx, dy);
      const isSettled = !isInside && distance < 0.05 && Math.abs(currentRotation) < 0.05;

      if (!isSettled) {
        rafId = requestAnimationFrame(animate);
      } else {
        // Snap cleanly to zero once settled to save CPU
        current.x = 0;
        current.y = 0;
        currentRotation = 0;
        if (mouseRef.current) {
          mouseRef.current.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
        }
        if (shadowRef.current) {
          shadowRef.current.style.transform = "translate3d(0, 4px, 0) scale(1)";
        }
        isLoopRunning = false;
        rafId = null;
      }
    };

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    // Attach pointer listeners to container
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    container.addEventListener("pointerenter", handlePointerEnter, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointerenter", handlePointerEnter);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [containerRef, lerpFactor, maxX, maxY, maxRotation, rotationFactor, reducedMotion]);

  return { mouseRef, shadowRef };
}
