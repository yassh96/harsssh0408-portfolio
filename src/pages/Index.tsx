import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import FeaturedWorkSection from "@/components/portfolio/FeaturedWorkSection";
import ServicesSection from "@/components/portfolio/ServicesSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedWorkSection />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
