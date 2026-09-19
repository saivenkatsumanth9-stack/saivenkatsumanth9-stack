import { useEffect, useCallback } from "react";

type KeyHandler = (e: KeyboardEvent) => void;

export function useKeyboard(handlers: Record<string, KeyHandler>) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = [
        e.ctrlKey || e.metaKey ? "mod" : "",
        e.shiftKey ? "shift" : "",
        e.altKey ? "alt" : "",
        e.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join("+");

      const handler = handlers[key];
      if (handler) {
        handler(e);
      }
    },
    [handlers]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
