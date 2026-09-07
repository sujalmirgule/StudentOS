import { useEffect, useRef } from "react";
import { gsap, EASE } from "../lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface TiltOptions {
  maxTiltX?: number;
  maxTiltY?: number;
  scaleOnHover?: number;
}

export function useGsapTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const cardRef = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { maxTiltX = 8, maxTiltY = 8, scaleOnHover = 1.015 } = options;

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReduced) return;

    // Check if touch device
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTiltX;
      const rotateY = ((x - centerX) / centerX) * maxTiltY;

      gsap.to(el, {
        rotateX,
        rotateY,
        scale: scaleOnHover,
        duration: 0.3,
        ease: EASE.spatialOut,
        transformPerspective: 1000,
        transformOrigin: "center center",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: EASE.spatialOut,
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTiltX, maxTiltY, scaleOnHover, prefersReduced]);

  return cardRef;
}
