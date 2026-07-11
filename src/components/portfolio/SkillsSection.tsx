import { Palette, PenTool, Layout, Layers, MousePointer2, Sparkles } from "lucide-react";

const tools = [
  { name: "Adobe Photoshop", icon: Palette, category: "Photo Editing" },
  { name: "Adobe Illustrator", icon: PenTool, category: "Vector Graphics" },
  { name: "Canva", icon: Layout, category: "Quick Design" },
  { name: "CorelDraw", icon: Layers, category: "Vector Design" },
  { name: "Figma", icon: MousePointer2, category: "UI/UX Design" },
  { name: "AI Image Engineering", icon: Sparkles, category: "High-Fidelity Prompting & Upscaling" },
];

const expertise = [
  {
    title: "Graphic Design",
    description: "Crafting visual stories through layouts, branding, and creative compositions.",
    icon: Palette,
  },
  {
    title: "Web Design",
    description: "Designing modern, responsive websites that captivate and convert visitors.",
    icon: Layout,
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and engaging user interfaces that prioritize user experience.",
    icon: MousePointer2,
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
          <div className="flex flex-col h-full">
            <h3 className="font-display text-xl font-semibold mb-8">Design Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="group modern-card p-6 cursor-default hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary group-hover:bg-background/10 flex items-center justify-center transition-colors">
                      <tool.icon size={32} className="text-foreground group-hover:text-background transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{tool.name}</h4>
                      <p className="text-sm text-muted-foreground group-hover:text-background/70 transition-colors">
                        {tool.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Additional Skills Tag */}
              <div className="sm:col-span-2 flex items-center justify-center gap-2 p-5 rounded-xl border border-dashed border-border text-muted-foreground">
                <Sparkles size={18} />
                <span className="text-sm">Always learning new tools & technologies</span>
              </div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="flex flex-col h-full">
            <h3 className="font-display text-xl font-semibold mb-8">Areas of Expertise</h3>
            <div className="space-y-4 flex-1 flex flex-col">
              {expertise.map((item, index) => (
                <div
                  key={index}
                  className="group modern-card p-6 cursor-default flex-1"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-foreground/5 group-hover:bg-foreground group-hover:text-background flex items-center justify-center transition-all duration-300">
                      <item.icon size={32} className="text-foreground group-hover:text-background transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-semibold mb-2 group-hover:text-foreground transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
