import { Palette, PenTool, Layout, Layers, MousePointer2, Sparkles, Image, Monitor, Code, GitBranch, Bot, Terminal, Blocks, Cpu, Lightbulb } from "lucide-react";

const designTools = [
  { name: "Adobe Photoshop", icon: Palette, category: "Photo Editing, Retouching & Compositing" },
  { name: "Adobe Illustrator", icon: PenTool, category: "Vector Graphics & Brand Assets" },
  { name: "Adobe Lightroom", icon: Image, category: "Colour Correction & Photo Enhancement" },
  { name: "CorelDRAW", icon: Layers, category: "Print & Vector Design" },
  { name: "Canva", icon: Layout, category: "Social Media & Marketing Creatives" },
  { name: "Figma", icon: MousePointer2, category: "UI Design, Wireframing & Prototyping" },
];

const webTools = [
  { name: "HTML & CSS", icon: Monitor, category: "Responsive Web Layouts" },
  { name: "JavaScript", icon: Terminal, category: "Interactive Front-End Experiences" },
  { name: "React & Tailwind CSS", icon: Code, category: "Modern Front-End Development" },
  { name: "Git / GitHub / Vercel", icon: GitBranch, category: "Version Control & Deployment" },
];

const aiTools = [
  { name: "Generative AI", icon: Sparkles, category: "Visual Ideation & Creative Exploration" },
  { name: "AI Image Generation", icon: Image, category: "Concept Development & High-Fidelity Visuals" },
  { name: "Prompt Engineering", icon: Terminal, category: "Detailed Creative Prompting" },
  { name: "AI-Assisted Web Dev", icon: Code, category: "Rapid Website & Landing Page Prototyping" },
  { name: "Lovable & Antigravity", icon: Blocks, category: "AI-Assisted Website Development" },
  { name: "ChatGPT, Claude & Gemini", icon: Bot, category: "Creative Research, Ideation & Dev Assistance" },
];

const expertise = [
  {
    title: "Graphic Design",
    description: "Creating visual communication through branding, layouts, marketing creatives, print materials, photo editing, and digital compositions.",
    icon: Palette,
  },
  {
    title: "Web Design",
    description: "Designing modern, responsive websites and landing pages with a strong focus on visual hierarchy, usability, and brand consistency.",
    icon: Layout,
  },
  {
    title: "UI/UX Design",
    description: "Creating clean and intuitive interfaces through wireframes, visual systems, responsive layouts, and user-focused design thinking.",
    icon: MousePointer2,
  },
  {
    title: "AI Creative Technology",
    description: "Combining design expertise with generative AI and AI-assisted development to explore ideas, prototype faster, and create modern digital experiences.",
    icon: Lightbulb,
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
            Skills & Expertise
          </p>
          <h2 className="heading-lg max-w-xl">
            Tools I Master,
            <span className="gradient-text block">Skills I Offer</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Design Tools - Card Grid */}
          <div className="flex flex-col h-full space-y-8">
            <div>
              <h3 className="font-display text-2xl md:text-[26px] font-bold text-[#111111] dark:text-foreground mb-4">Design Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {designTools.map((tool, index) => (
                  <div key={index} className="group modern-card p-3 sm:p-3.5 cursor-default hover:bg-foreground hover:text-background transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-3.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors shrink-0">
                        <tool.icon size={20} className="text-foreground group-hover:text-background transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-bold text-[15px] sm:text-base text-[#111111] group-hover:text-background dark:text-foreground transition-colors leading-tight truncate">{tool.name}</h4>
                        <p className="font-body text-xs sm:text-[13px] leading-snug text-[#4A4A4A] group-hover:text-background/80 dark:text-muted-foreground transition-colors mt-0.5 line-clamp-2">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl md:text-[26px] font-bold text-[#111111] dark:text-foreground mb-4">Web & UI/UX</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {webTools.map((tool, index) => (
                  <div key={index} className="group modern-card p-3 sm:p-3.5 cursor-default hover:bg-foreground hover:text-background transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-3.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors shrink-0">
                        <tool.icon size={20} className="text-foreground group-hover:text-background transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-bold text-[15px] sm:text-base text-[#111111] group-hover:text-background dark:text-foreground transition-colors leading-tight truncate">{tool.name}</h4>
                        <p className="font-body text-xs sm:text-[13px] leading-snug text-[#4A4A4A] group-hover:text-background/80 dark:text-muted-foreground transition-colors mt-0.5 line-clamp-2">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl md:text-[26px] font-bold text-[#111111] dark:text-foreground mb-4">AI & Creative Technology</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {aiTools.map((tool, index) => (
                  <div key={index} className="group modern-card p-3 sm:p-3.5 cursor-default hover:bg-foreground hover:text-background transition-all duration-300">
                    <div className="flex items-center gap-3 sm:gap-3.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors shrink-0">
                        <tool.icon size={20} className="text-foreground group-hover:text-background transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-bold text-[15px] sm:text-base text-[#111111] group-hover:text-background dark:text-foreground transition-colors leading-tight truncate">{tool.name}</h4>
                        <p className="font-body text-xs sm:text-[13px] leading-snug text-[#4A4A4A] group-hover:text-background/80 dark:text-muted-foreground transition-colors mt-0.5 line-clamp-2">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-border text-[#4A4A4A] dark:text-muted-foreground font-body text-xs sm:text-sm">
              <Sparkles size={16} />
              <span>Always learning new tools, technologies, and creative workflows.</span>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="flex flex-col h-full">
            <h3 className="font-display text-2xl md:text-[26px] font-bold text-[#111111] dark:text-foreground mb-4 md:mb-6">Areas of Expertise</h3>
            <div className="space-y-3 sm:space-y-3.5 flex-1 flex flex-col">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="group modern-card p-4 sm:p-5 cursor-default flex-1 flex flex-col justify-center"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-foreground/5 group-hover:bg-foreground group-hover:text-background flex items-center justify-center transition-all duration-300 shrink-0">
                      <item.icon size={24} className="text-foreground group-hover:text-background transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg md:text-xl text-[#111111] dark:text-foreground mb-1 group-hover:text-foreground transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-body text-xs sm:text-sm leading-relaxed text-[#4A4A4A] dark:text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
