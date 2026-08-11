import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Clock, Search } from "lucide-react";

export interface WebsitePortfolioModalProps {
  open: boolean;
  onClose: () => void;
}

export interface WebsiteProject {
  id: number;
  numberStr: string;
  title: string;
  category: string;
  url?: string;
  gradient: string;
  isComingSoon?: boolean;
}

const websiteProjects: WebsiteProject[] = [
  {
    id: 1,
    numberStr: "01",
    title: "Akshat Infomedia",
    category: "WEB DESIGN",
    url: "https://akshat-infomedia.vercel.app/",
    gradient: "from-blue-500/20 via-indigo-400/10 to-purple-500/20",
  },
  {
    id: 2,
    numberStr: "02",
    title: "Youth Academy",
    category: "EDUCATION WEBSITE",
    url: "https://youth-academy-web.vercel.app/",
    gradient: "from-emerald-500/20 via-teal-400/10 to-cyan-500/20",
  },
  {
    id: 3,
    numberStr: "03",
    title: "Entrepreneurs Adda",
    category: "BUSINESS WEBSITE",
    url: "https://entrepreneursadda.vercel.app/",
    gradient: "from-amber-500/20 via-orange-400/10 to-rose-500/20",
  },
  {
    id: 4,
    numberStr: "04",
    title: "Editorial Tattvix Portfolio",
    category: "PORTFOLIO WEBSITE",
    url: "https://editorialtattvix.vercel.app/",
    gradient: "from-rose-500/20 via-pink-400/10 to-red-500/20",
  },
  {
    id: 5,
    numberStr: "05",
    title: "Youthside",
    category: "YOUTH PLATFORM",
    url: "https://youthside.vercel.app/",
    gradient: "from-violet-500/20 via-purple-400/10 to-fuchsia-500/20",
  },
  {
    id: 6,
    numberStr: "06",
    title: "More Projects Coming Soon",
    category: "EXPLORING & BUILDING",
    gradient: "from-cyan-500/20 via-teal-400/10 to-emerald-500/20",
    isComingSoon: true,
  },
];

const WebsiteCard: React.FC<{ project: WebsiteProject }> = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (project.url && !project.isComingSoon) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  const screenshotUrl = project.url
    ? `https://screenshot.api.microlink.io?url=${encodeURIComponent(project.url)}`
    : null;

  const CardWrapper = project.url && !project.isComingSoon ? "a" : "div";
  const wrapperProps = project.url && !project.isComingSoon
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: handleClick };

  return (
    <CardWrapper
      {...wrapperProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer block transition-transform duration-300 ease-out hover:scale-[1.05]"
    >
      {/* Project Card matching main portfolio layout */}
      <div className="aspect-[4/3] modern-card overflow-hidden mb-5 relative">
        {/* Base layer / Screenshot */}
        {screenshotUrl ? (
          <div className="absolute inset-0 bg-muted">
            <img
              src={screenshotUrl}
              alt={project.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
            {/* Fallback gradient while screenshot loads */}
            {!imageLoaded && (
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-secondary to-muted transition-opacity duration-300 group-hover:opacity-0" />
        )}

        {/* Colored gradient revealed on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-foreground/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-foreground/5 blur-xl group-hover:scale-150 transition-transform duration-700 delay-100" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-foreground/3 blur-3xl group-hover:scale-125 transition-transform duration-500" />
        </div>

        {/* Subtle Project number inside preview area */}
        <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-foreground/15 group-hover:scale-110 group-hover:text-foreground/20 transition-all duration-300 pointer-events-none drop-shadow-sm">
          {project.numberStr}
        </span>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-foreground/90 flex items-center justify-center transition-all duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`text-center text-background p-6 transition-transform duration-300 ${
              hovered ? "-translate-y-1" : "translate-y-2"
            }`}
          >
            <p className="text-sm font-medium mb-2 opacity-70">{project.category}</p>
            <p className="font-display text-xl font-semibold mb-4">{project.title}</p>
            <div className="w-12 h-12 rounded-full border-2 border-background/30 flex items-center justify-center mx-auto group-hover:border-background transition-colors">
              {project.isComingSoon ? (
                <Clock size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Info Below Image */}
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
};

export const WebsitePortfolioModal: React.FC<WebsitePortfolioModalProps> = ({
  open,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = websiteProjects.filter((project) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      project.title.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q)
    );
  });

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-6 md:p-12 bg-background border-border/50 shadow-2xl rounded-2xl">
        {/* Header matching main portfolio section style */}
        <DialogHeader className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-left">
          <div>
            <p className="text-muted-foreground font-medium tracking-widest uppercase text-xs md:text-sm mb-3">
              Website Portfolio
            </p>
            <DialogTitle className="heading-lg text-3xl md:text-5xl font-semibold tracking-tight">
              Selected Web Projects
            </DialogTitle>
            <DialogDescription className="body-md text-muted-foreground max-w-md mt-2">
              Selected digital experiences I've designed & built.
            </DialogDescription>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search websites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm bg-secondary/50 border-border/60 focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
            />
          </div>
        </DialogHeader>

        {/* 3-Column Responsive Grid matching main portfolio section */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display font-medium text-lg text-muted-foreground">
              No matching website projects found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <WebsiteCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WebsitePortfolioModal;
