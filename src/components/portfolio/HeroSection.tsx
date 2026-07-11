import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import harshProfile from "@/assets/harsh-profile-new.jpg";
import { useEffect, useRef, useState } from "react";

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return { count, ref };
};

const StatItem = ({ number, suffix, label }: { number: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(number, 2000);

  return (
    <div ref={ref} className="space-y-1">
      <p className="stat-number whitespace-nowrap">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center section-padding pt-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-60" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-8 stagger-children">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">Available for work</span>
              </div>
              
              <h1 className="heading-xl">
                Hello,
                <br />
                <span className="gradient-text">I'm Harsh</span>
              </h1>
            </div>

            <p className="body-lg text-muted-foreground max-w-lg">
              I'm a young designer with a limitless imagination, driven by creativity
              that has no age. I turn ideas into <span className="text-foreground font-medium">clean</span>, <span className="text-foreground font-medium">modern</span>, and <span className="text-foreground font-medium">meaningful</span> designs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 group"
              >
                <a href="#portfolio">
                  View My Work
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-2"
              >
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-border/50">
              <StatItem number={6} suffix="+" label="Years Experience" />
              <StatItem number={500} suffix="+" label="Projects Delivered" />
              <StatItem number={120} suffix="+" label="Happy Clients" />
              <StatItem number={9000} suffix="+" label="Print Designs Created" />
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              {/* Main image container */}
              <div className="relative w-72 h-72 md:w-[400px] md:h-[400px] rounded-[2rem] overflow-hidden animated-border">
                <div className="absolute inset-[2px] rounded-[2rem] bg-secondary overflow-hidden">
                  <img 
                    src={harshProfile} 
                    alt="Harsh Bhidekar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-border/50 floating" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-secondary border border-border/50 floating" style={{ animationDelay: '-3s' }} />
              
              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 glass rounded-2xl p-4 shadow-xl">
                <p className="text-3xl font-display font-bold">6+</p>
                <p className="text-xs text-muted-foreground">Years Exp.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 lg:mt-24 animate-bounce-slow">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-xs tracking-widest uppercase font-medium">Scroll Down</span>
            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
