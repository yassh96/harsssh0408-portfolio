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

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Design Tools - Card Grid */}
          <div className="flex flex-col h-full space-y-12">
            <div>
              <h3 className="font-display text-3xl font-bold text-[#111111] dark:text-foreground mb-6">Design Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {designTools.map((tool, index) => (
                  <div key={index} className="group modern-card p-5 cursor-default hover:bg-foreground hover:text-background transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors shrink-0">
                        <tool.icon size={26} className="text-foreground group-hover:text-background transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg md:text-xl text-[#111111] group-hover:text-background dark:text-foreground transition-colors leading-snug">{tool.name}</h4>
                        <p className="font-body text-sm md:text-[15px] leading-[1.5] text-[#4A4A4A] group-hover:text-background/80 dark:text-muted-foreground transition-colors mt-1">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold text-[#111111] dark:text-foreground mb-6">Web & UI/UX</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {webTools.map((tool, index) => (
                  <div key={index} className="group modern-card p-5 cursor-default hover:bg-foreground hover:text-background transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors shrink-0">
                        <tool.icon size={26} className="text-foreground group-hover:text-background transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg md:text-xl text-[#111111] group-hover:text-background dark:text-foreground transition-colors leading-snug">{tool.name}</h4>
                        <p className="font-body text-sm md:text-[15px] leading-[1.5] text-[#4A4A4A] group-hover:text-background/80 dark:text-muted-foreground transition-colors mt-1">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-3xl font-bold text-[#111111] dark:text-foreground mb-6">AI & Creative Technology</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiTools.map((tool, index) => (
                  <div key={index} className="group modern-card p-5 cursor-default hover:bg-foreground hover:text-background transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors shrink-0">
                        <tool.icon size={26} className="text-foreground group-hover:text-background transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg md:text-xl text-[#111111] group-hover:text-background dark:text-foreground transition-colors leading-snug">{tool.name}</h4>
                        <p className="font-body text-sm md:text-[15px] leading-[1.5] text-[#4A4A4A] group-hover:text-background/80 dark:text-muted-foreground transition-colors mt-1">
                          {tool.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-5 rounded-xl border border-dashed border-border text-[#4A4A4A] dark:text-muted-foreground font-body text-sm md:text-[15px] leading-[1.5]">
              <Sparkles size={18} />
              <span>Always learning new tools, technologies, and creative workflows.</span>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="flex flex-col h-full">
            <h3 className="font-display text-3xl font-bold text-[#111111] dark:text-foreground mb-8">Areas of Expertise</h3>
            <div className="space-y-4 flex-1 flex flex-col">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="group modern-card p-6 md:p-8 cursor-default flex-1"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-foreground/5 group-hover:bg-foreground group-hover:text-background flex items-center justify-center transition-all duration-300 shrink-0">
                      <item.icon size={32} className="text-foreground group-hover:text-background transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xl md:text-2xl text-[#111111] dark:text-foreground mb-2 group-hover:text-foreground transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-body text-sm md:text-[15px] leading-[1.5] text-[#4A4A4A] dark:text-muted-foreground">
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
