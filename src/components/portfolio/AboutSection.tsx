import { GraduationCap, Briefcase, Star, MessageCircle, Award, Users } from "lucide-react";

const education = [
  { level: "SSC", status: "Completed successfully", year: "2017" },
  { level: "HSC", status: "Completed successfully", year: "2019" },
  { level: "Undergraduate Degree", status: "Completed successfully", year: "2022" },
  { level: "Master's Degree", status: "Completed successfully", year: "2026" },
];

const strengths = [
  { icon: Star, label: "Precision & Detail" },
  { icon: Award, label: "Creative Solutions" },
  { icon: MessageCircle, label: "Clear Communication" },
  { icon: Users, label: "Client Relations" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/50 relative overflow-hidden noise">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
            About Me
          </p>
          <h2 className="heading-lg max-w-2xl">
            Passion for Design,
            <span className="gradient-text block">Driven by Creativity</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Bio */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="body-lg text-muted-foreground">
                I'm Harsh Bhidekar, a young and imaginative designer with a strong foundation in graphic design and visual storytelling, and a growing interest in UI/UX design. With <span className="text-foreground font-semibold">5–6 years</span> of hands-on experience, I've worked on client projects, local businesses, and creative pieces, crafting visuals that are both impactful and purposeful.
              </p>
              <p className="body-md text-muted-foreground">
                I believe great design goes beyond aesthetics—it's about communication, consistency, and intent. My approach centers on creating work that feels modern, meaningful, and honest. Alongside this philosophy, I have gained extensive hands-on experience by successfully completing numerous professional projects as a Graphic Designer in a design lab, where I consistently translated ideas into clear, impactful visual solutions.
              </p>
            </div>

            {/* Strengths */}
            <div className="pt-4">
              <h3 className="font-display text-xl font-semibold mb-6">Key Strengths</h3>
              <div className="grid grid-cols-2 gap-4">
                {strengths.map((strength, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/50 hover-lift cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center">
                      <strength.icon size={18} className="text-foreground" />
                    </div>
                    <span className="text-sm font-medium">{strength.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="space-y-8">
            {/* Education Timeline */}
            <div className="modern-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center">
                  <GraduationCap size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold">Education</h3>
              </div>
              <div className="space-y-0">
                {education.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex items-start gap-4 pb-6 last:pb-0"
                  >
                    {/* Timeline line */}
                    {index !== education.length - 1 && (
                      <div className="absolute left-[7px] top-4 w-[2px] h-full bg-border" />
                    )}
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-4 h-4 rounded-full mt-1 ${
                      index === education.length - 1 
                        ? 'bg-foreground animate-pulse' 
                        : 'bg-border border-2 border-background'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold truncate">{item.level}</span>
                        <span className="text-xs text-muted-foreground font-medium bg-secondary px-2 py-1 rounded-full">
                          {item.year}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Card */}
            <div className="modern-card p-6 md:p-8 bg-foreground text-background">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold">Experience</h3>
              </div>
              <p className="stat-number !text-background mb-3">5-6 Years</p>
              <p className="text-background/70 leading-relaxed">
                Professional experience in editing and designing across diverse projects
                including client work, local businesses, greeting cards, and photo albums.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
