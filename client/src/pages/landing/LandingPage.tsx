import Navbar from "../../components/layout/Navbar";
import Hero from "./Hero";
import DashboardPreview from "./DashboardPreview";
import Features from "./Features";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <Hero />
      <DashboardPreview />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}