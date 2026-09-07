import { useEffect, useRef } from "react";
import { gsap, EASE, DURATION } from "../lib/gsap";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface GsapRevealOptions {
  stagger?: number;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export function useGsapReveal<T extends HTMLElement>(
  selector?: string,
  options: GsapRevealOptions = {}
) {
  const containerRef = useRef<T | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  const {
    stagger = 0.06,
    delay = 0.1,
    yOffset = 20,
    duration = DURATION.entrance,
  } = options;

  useEffect(() => {
    if (!containerRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = selector
        ? containerRef.current?.querySelectorAll(selector)
        : [containerRef.current];

      if (targets && targets.length > 0) {
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y: yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: EASE.spatialOut,
            clearProps: "transform",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selector, stagger, delay, yOffset, duration, prefersReduced]);

  return containerRef;
}
