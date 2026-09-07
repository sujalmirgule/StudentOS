import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = {
  spatialOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  spatialIn: "cubic-bezier(0.7, 0, 0.84, 0)",
  spatialInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  elasticOut: "elastic.out(1, 0.5)",
  backOut: "back.out(1.4)",
};

export const DURATION = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.6,
  entrance: 0.8,
};

export { gsap, ScrollTrigger };
