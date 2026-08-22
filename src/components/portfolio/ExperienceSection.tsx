import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Building2 } from "lucide-react";

const professionalExperiences = [
  {
    role: "Creative Technologist / Graphic Designer",
    company: "Akshat Infomedia",
    location: "Pune, Maharashtra",
    duration: "July 2026 – Present",
    responsibilities: [
      "Manage visual design requirements across 12–14 active social media pages, creating regular social media creatives, campaigns, advertisements, and promotional content",
      "Design and maintain brand identities, visual systems, and marketing assets for multiple client brands",
      "Handle print design requirements, including promotional materials, marketing collateral, and production-ready artwork",
      "Design web and digital experiences, including website graphics, landing pages, responsive layouts, and visual assets for online platforms",
      "Work across diverse industries, including digital marketing, education, photography, beauty & wellness, F&B, and animation",
      "Support creative requirements for Reliance Animation projects, adapting visual communication and design assets to project-specific requirements",
      "Collaborate directly with clients and the internal creative team to translate briefs into practical and visually consistent solutions",
      "Use Figma, Photoshop, Illustrator, AI tools, Lovable, Antigravity, and other modern creative technologies across different design and digital workflows",
      "Explore and implement AI-assisted design and web development workflows to accelerate ideation, prototyping, and digital production",
      "Maintain visual consistency and quality across social media, print, web, advertising, and digital brand touchpoints",
    ],
  },
  {
    role: "Graphic Design Intern",
    company: "Crowdera",
    location: "Remote",
    duration: "December 2025 – February 2026",
    responsibilities: [
      "Designed corporate marketing creatives",
      "Created social media graphics and digital branding assets",
      "Worked remotely with the creative team",
      "Maintained consistent visual identity across campaigns",
    ],
  },
  {
    role: "Graphic Designer / Photo Editor",
    company: "Satpute Digital Colour Lab",
    location: "Amravati, Maharashtra",
    duration: "May 2019 – June 2024",
    responsibilities: [
      "Delivered professional photo editing and advanced Photoshop compositing for commercial clients",
      "Performed high-end colour correction, retouching, background manipulation, and image enhancement",
      "Prepared print-ready artwork for visiting cards, brochures, banners, flex, photo frames, and marketing materials",
      "Designed personalized photo frames, albums, greeting cards, and other customized visual products",
      "Managed large-format printing workflows and digital-to-physical production requirements",
      "Handled client interactions, design revisions, and production requirements",
      "Maintained high-resolution output and print quality across different production formats",
      "Worked within a high-volume commercial environment with regular client orders and tight turnaround requirements",
    ],
  },
];

const leadership = {
  role: "Chief Editor",
  organization: "College Magazine Committee (MCA Department)",
  location: "Nagpur University",
  duration: "January 2025 – March 2026",
  responsibilities: [
    "Led the visual identity of the annual college magazine",
    "Directed complete layout design and page composition",
    "Managed typography, graphics and publication consistency",
    "Coordinated with faculty and student contributors",
    "Improved readability through thoughtful editorial design",
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/50 relative overflow-hidden noise">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-foreground/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
            Career Path
          </p>
          <h2 className="heading-lg max-w-2xl">
            Professional
            <span className="gradient-text block">Experience</span>
          </h2>
          <p className="body-md text-muted-foreground max-w-2xl mt-6">
            A journey of creating impactful designs across print, branding, digital media and creative leadership.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-border/60" />

          <div className="space-y-12">
            {professionalExperiences.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-20 md:pl-28"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.15,
                }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-8 md:left-12 top-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-colors duration-300 ${
                    index === 0
                      ? "bg-foreground border-foreground"
                      : "bg-background border-foreground"
                  }`}
                />

                {/* Experience card */}
                <div className="modern-card glass p-6 md:p-8 hover-lift group">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div className="space-y-1">
                      <h3 className="font-display text-xl md:text-2xl font-semibold group-hover:text-foreground transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 size={14} className="text-foreground/70" />
                          {item.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} className="text-foreground/70" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-full shrink-0">
                      <Calendar size={13} />
                      {item.duration}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {item.responsibilities.map((responsibility, rIndex) => (
                      <li
                        key={rIndex}
                        className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/40 shrink-0" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Experience */}
        <motion.div
          className="mt-20 md:mt-24 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-foreground text-background p-8 md:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-foreground/10">
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-background/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                  <Award size={24} className="text-background" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold">Leadership Experience</h3>
                  <p className="text-sm text-background/60 mt-0.5">A leadership position, not professional employment</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-6">
                <div>
                  <p className="text-lg font-semibold">{leadership.role}</p>
                  <p className="text-background/70">{leadership.organization}</p>
                </div>
                <div className="hidden md:block w-px h-8 bg-background/20" />
                <div className="flex flex-wrap items-center gap-3 text-sm text-background/70">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {leadership.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} />
                    {leadership.duration}
                  </span>
                </div>
              </div>

              <ul className="grid sm:grid-cols-2 gap-3">
                {leadership.responsibilities.map((responsibility, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm md:text-base text-background/80 leading-relaxed"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-background/40 shrink-0" />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Professional Evolution */}
        <motion.div
          className="mt-20 md:mt-24 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="mb-8 md:mb-10 text-center">
            <h3 className="heading-md">Professional Evolution</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="modern-card p-6 border-t-4 border-t-muted-foreground/30 hover:border-t-foreground transition-colors">
              <h4 className="font-display text-xl font-bold mb-3">2019–2024</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Graphic Design • Photo Editing • Photoshop • Print Production • Client Work
              </p>
            </div>
            
            <div className="modern-card p-6 border-t-4 border-t-muted-foreground/50 hover:border-t-foreground transition-colors">
              <h4 className="font-display text-xl font-bold mb-3">2024–2025</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Digital Design • UI/UX Learning • Figma • Web Design • Front-End Foundations
              </p>
            </div>
            
            <div className="modern-card p-6 border-t-4 border-t-muted-foreground/80 hover:border-t-foreground transition-colors">
              <h4 className="font-display text-xl font-bold mb-3">2025–Present</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                UI/UX • Responsive Websites • AI-Assisted Design • AI-Assisted Web Development • Creative Technology
              </p>
            </div>
            
            <div className="modern-card p-6 border-t-4 border-t-foreground bg-foreground text-background">
              <h4 className="font-display text-xl font-bold mb-3">Today</h4>
              <p className="text-sm text-background/80 leading-relaxed">
                Combining <strong>6+ years of visual design experience</strong> with modern UI/UX, web, and AI-assisted creative workflows to build both compelling visuals and digital experiences.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
