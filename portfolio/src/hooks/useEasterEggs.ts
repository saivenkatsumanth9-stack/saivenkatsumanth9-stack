import { useEffect, useRef, useCallback, useState } from "react";

export function useEasterEggs() {
  const [matrixActive, setMatrixActive] = useState(false);
  const sequenceRef = useRef<string[]>([]);
  const konamiCode = [
    "arrowup", "arrowup", "arrowdown", "arrowdown",
    "arrowleft", "arrowright", "arrowleft", "arrowright",
    "b", "a",
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      sequenceRef.current.push(e.key.toLowerCase());
      if (sequenceRef.current.length > konamiCode.length) {
        sequenceRef.current.shift();
      }

      if (
        sequenceRef.current.length === konamiCode.length &&
        sequenceRef.current.every((k, i) => k === konamiCode[i])
      ) {
        setMatrixActive(true);
        sequenceRef.current = [];
        setTimeout(() => setMatrixActive(false), 5000);
      }
    },
    [konamiCode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { matrixActive };
}
