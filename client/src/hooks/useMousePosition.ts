import { useState, useEffect } from "react";

export interface MousePosition {
  x: number; // Raw pixels X
  y: number; // Raw pixels Y
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / innerWidth) * 2 - 1,
        normalizedY: -(e.clientY / innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}
