import { lazy } from "react";
import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import DeferredSection from "@/components/portfolio/DeferredSection";

const ExperienceSection = lazy(() => import("@/components/portfolio/ExperienceSection"));
const FeaturedWorkSection = lazy(() => import("@/components/portfolio/FeaturedWorkSection"));
const MotionShowcaseSection = lazy(() => import("@/components/portfolio/MotionShowcaseSection"));
const PortfolioSection = lazy(() => import("@/components/portfolio/PortfolioSection"));
const ParallaxGallerySection = lazy(() => import("@/components/portfolio/ParallaxGallerySection"));
const ContactSection = lazy(() => import("@/components/portfolio/ContactSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <DeferredSection minHeight={900}>
          <ExperienceSection />
        </DeferredSection>
        <DeferredSection minHeight={900}>
          <FeaturedWorkSection />
        </DeferredSection>
        <DeferredSection minHeight={900}>
          <ParallaxGallerySection />
        </DeferredSection>
        <DeferredSection minHeight={900}>
          <MotionShowcaseSection />
        </DeferredSection>
        <DeferredSection minHeight={900}>
          <PortfolioSection />
        </DeferredSection>
        <DeferredSection minHeight={700}>
          <ContactSection />
        </DeferredSection>
      </main>
    </div>
  );
};

export default Index;
