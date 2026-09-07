import LandingNavbar from "./LandingNavbar";
import HeroSection from "./HeroSection";
import FragmentationSection from "./FragmentationSection";
import EcosystemSection from "./EcosystemSection";
import HowItWorksSection from "./HowItWorksSection";
import ModulesShowcaseSection from "./ModulesShowcaseSection";
import AISection from "./AISection";
import WhyStudentOSSection from "./WhyStudentOSSection";
import FinalCTASection from "./FinalCTASection";
import LandingFooter from "./LandingFooter";
import { useGsapReveal } from "../../hooks/useGsapReveal";

export default function LandingPage() {
  const containerRef = useGsapReveal<HTMLDivElement>(".gsap-reveal", {
    stagger: 0.08,
    delay: 0.05,
    yOffset: 24,
  });

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#080D0B] text-[#E8ECE7] selection:bg-[#14B8A6] selection:text-[#080D0B]"
    >
      {/* Translucent Spatial Navbar */}
      <LandingNavbar />

      {/* Main Storytelling Experience */}
      <main className="relative z-10">
        {/* Section 1: Hero & 3D Spatial Ecosystem */}
        <HeroSection />

        {/* Section 2: The Fragmentation Problem (Scattered to Connected) */}
        <FragmentationSection />

        {/* Section 3: What StudentOS Connects (Ecosystem Matrix) */}
        <EcosystemSection />

        {/* Section 4: How StudentOS Works (3-Step Connected Journey) */}
        <HowItWorksSection />

        {/* Section 5: Core Modules Showcase (Interactive UI Previews) */}
        <ModulesShowcaseSection />

        {/* Section 6: AI as a Student Assistant Layer */}
        <AISection />

        {/* Section 7: Why StudentOS (Core Principles) */}
        <WhyStudentOSSection />

        {/* Section 8: Final Spatial Horizon CTA */}
        <FinalCTASection />
      </main>

      {/* Section 9: Authentic Footer */}
      <LandingFooter />
    </div>
  );
}