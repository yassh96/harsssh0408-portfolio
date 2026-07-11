import { useState, useEffect } from "react";
import { X } from "lucide-react";

const featured = [
  {
    id: 1,
    title: "Cinematic Impact",
    category: "Movie Poster Design",
    image: "https://i.ibb.co/hJrsckjr/swades-2004-poster.jpg",
  },
  {
    id: 2,
    title: "Street Motion",
    category: "Footwear Campaign Design",
    image: "https://i.ibb.co/1tvf1tR5/Gemini-Generated-Image-yivbvdyivbvdyivb.png",
  },
  {
    id: 3,
    title: "Street Motion",
    category: "Footwear Campaign Design",
    image: "https://i.ibb.co/DSmzYLp/Metro.jpg",
  },
  {
    id: 4,
    title: "Digital Engagement",
    category: "Social Media Creative",
    image: "https://i.ibb.co/XrRXxPZC/Ai-habib.jpg",
  },
  {
    id: 5,
    title: "Brand Creative",
    category: "Marketing Creative Design",
    image: "https://i.ibb.co/8ns6SW81/Ice-cream.jpg",
  },
  {
    id: 6,
    title: "Care & Awareness",
    category: "Healthcare Awareness Campaign",
    image: "https://i.ibb.co/yBh9Wr9Q/hospital-running-a-campaign.png",
  },
  {
    id: 8,
    title: "Choking the Future",
    category: "Sustainability Drive",
    image: "https://i.ibb.co/k2DSjGCR/say-no-to-plastic.png",
  },
  {
    id: 9,
    title: "Power in Your Palm",
    category: "Instant Connectivity Interaction",
    image: "https://i.ibb.co/rRYK4D36/Redminote14.png",
  },
  {
    id: 10,
    title: "Future Forward",
    category: "Minimalist Brand Identity",
    image: "https://i.ibb.co/Nn26XsQV/logo.jpg",
  },
];

const FeaturedWorkSection = () => {
  const [selected, setSelected] = useState<typeof featured[0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="showcase" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
              Featured Work
            </p>
            <h2 className="heading-lg">
              Highlights of <span className="gradient-text">Creative Craft</span>
            </h2>
          </div>
          <p className="body-md text-muted-foreground max-w-md">
            A selection of my best creative projects, showcasing visual storytelling, branding, social media design, and graphic creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
              className="group relative aspect-[4/5] modern-card overflow-hidden text-left"
            >
              <img
                src={item.image}
                alt={`${item.title} — ${item.category}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs uppercase tracking-widest text-background/70 mb-2 font-medium">
                  {item.category}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-background">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-background/98 z-50 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary hover:bg-foreground hover:text-background transition-colors flex items-center justify-center z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div
            className="max-w-5xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modern-card overflow-hidden">
              <img
                src={selected.image}
                alt={`${selected.title} — ${selected.category}`}
                className="w-full max-h-[75vh] object-contain bg-secondary"
              />
              <div className="p-6 md:p-8">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary rounded-full mb-3">
                  {selected.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold">
                  {selected.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedWorkSection;
