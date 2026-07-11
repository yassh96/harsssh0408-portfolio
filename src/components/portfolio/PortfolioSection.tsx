import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const projects = [
  {
    id: 1,
    title: "Magazine Design",
    category: "Print Design",
    description:
      "Complete layout and graphics design for a college magazine, featuring modern typography, engaging visuals, and cohesive brand elements throughout all pages.",
    gradient: "from-amber-500/20 via-orange-400/10 to-rose-500/20",
    link: "https://drive.google.com/drive/folders/1dGVGH-eKFr9S2LVKLyaElFZ_pXNrM-Cb?usp=drive_link",
  },
  {
    id: 2,
    title: "Local Business Branding",
    category: "Brand Identity",
    description:
      "Comprehensive branding project for a local establishment, including logo design, color palette, business cards, and marketing materials.",
    gradient: "from-emerald-500/20 via-teal-400/10 to-cyan-500/20",
    link: "https://drive.google.com/drive/folders/10LJkUxC5BvTDBdE_Q28KKlDU5FS78Li9?usp=drive_link",
  },
  {
    id: 3,
    title: "Posters and Photos Creation",
    category: "Photo Editing",
    description:
      "Creative photo album designs featuring professional photo editing, color correction, and artistic compositions for memorable occasions.",
    gradient: "from-violet-500/20 via-purple-400/10 to-fuchsia-500/20",
    link: "https://drive.google.com/drive/folders/1i9Vh2kBxZjYWc1jQCXH8bUC94XDRpS-s?usp=drive_link",
  },
  {
    id: 4,
    title: "Cards and Logo Creation",
    category: "Graphic Design",
    description:
      "A collection of beautifully designed greeting cards for various occasions, showcasing creative illustrations and thoughtful typography.",
    gradient: "from-rose-500/20 via-pink-400/10 to-red-500/20",
    link: "https://drive.google.com/drive/folders/1aQBHUYJHgPGQh5L2haF2A6DEeCQD-xpT?usp=drive_link",
  },
  {
    id: 5,
    title: "UI Design Project",
    category: "UI/UX",
    description:
      "User interface design for a mobile application, focusing on intuitive navigation, clean aesthetics, and seamless user experience.",
    gradient: "from-blue-500/20 via-indigo-400/10 to-sky-500/20",
    link: "https://drive.google.com/drive/folders/1xmGZj9aUNO__yvlqAsLQEWQJjPsvxwiA?usp=drive_link",
  },
  {
    id: 6,
    title: "Website Design",
    category: "Web Design",
    description:
      "Complete website redesign for improved user experience, modern aesthetics, and better conversion rates.",
    gradient: "from-cyan-500/20 via-teal-400/10 to-emerald-500/20",
    link: "https://my-site-8klyovzd-69yassh69.wix-vibe.com/",
  },
];

const PortfolioSection = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const openExternal = (url: string) => {
    const copyLink = async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          toast({
            title: "Link copied",
            description: "Google Drive can't open inside the preview. Paste the link in a new tab.",
          });
          return;
        }
      } catch {
        // ignore
      }

      toast({
        title: "Open this link",
        description: url,
      });
    };

    try {
      const opener = (() => {
        try {
          return window.top && window.top !== window ? window.top : window;
        } catch {
          return window;
        }
      })();

      const win = opener.open(url, "_blank", "noopener,noreferrer");
      if (!win) void copyLink();
    } catch {
      void copyLink();
    }
  };
  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
              My Work
            </p>
            <h2 className="heading-lg">
              Selected Projects
            </h2>
          </div>
          <p className="body-md text-muted-foreground max-w-md">
            A showcase of my best work across UI/UX, graphic design, and visual storytelling.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => {
            const CardWrapper = project.link ? 'a' : 'div';
            const cardProps = project.link 
              ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
              : { onClick: () => setSelectedProject(project) };
            
            return (
              <CardWrapper
                key={project.id}
                {...cardProps}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer block transition-transform duration-300 ease-out hover:scale-[1.05]"
              >
                {/* Project Card with Blur Effect */}
                <div className="aspect-[4/3] modern-card overflow-hidden mb-5 relative">
                  {/* Grayscale base layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted via-secondary to-muted transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Colored gradient revealed on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-foreground/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-foreground/5 blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-foreground/3 blur-3xl group-hover:scale-125 transition-transform duration-500" />
                  </div>

                  {/* Project number */}
                  <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-foreground/10 group-hover:scale-110 group-hover:text-foreground/15 transition-all duration-300 pointer-events-none">
                    {String(project.id).padStart(2, '0')}
                  </span>

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-foreground/90 flex items-center justify-center transition-all duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className={`text-center text-background p-6 transition-transform duration-300 ${hoveredId === project.id ? "-translate-y-1" : "translate-y-2"}`}>
                      <p className="text-sm font-medium mb-2 opacity-70">{project.category}</p>
                      <p className="font-display text-xl font-semibold mb-4">{project.title}</p>
                      <div className="w-12 h-12 rounded-full border-2 border-background/30 flex items-center justify-center mx-auto group-hover:border-background transition-colors">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">
                    {project.category}
                  </p>
                  <h3 className="font-display text-xl font-semibold group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                </div>
              </CardWrapper>
            );
          })}

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-background/98 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div
            className="max-w-3xl w-full modern-card p-8 md:p-12 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Project Visual */}
            <div className={`aspect-video rounded-xl mb-8 flex items-center justify-center overflow-hidden relative bg-gradient-to-br ${selectedProject.gradient}`}>
              {/* Animated blur circles */}
              <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-foreground/5 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-foreground/5 blur-2xl" />
              <span className="relative font-display text-8xl font-bold text-foreground/10">
                {String(selectedProject.id).padStart(2, '0')}
              </span>
            </div>

            {/* Project Details */}
            <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary rounded-full mb-4">
              {selectedProject.category}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              {selectedProject.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              {selectedProject.description}
            </p>
            
            {selectedProject.link && (
              <button
                type="button"
                onClick={() => openExternal(selectedProject.link!)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors"
              >
                View Project
                <ArrowUpRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
