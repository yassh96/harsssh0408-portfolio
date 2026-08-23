import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

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
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const [isMd, setIsMd] = useState(false);
  const [stageRef, stageInView] = useInView<HTMLDivElement>("200px 0px");
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const progressRef = useRef(0);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);


  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsMd(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Adaptive card box: cards grow to the image's own aspect ratio while
  // keeping a consistent visual area (no cropping, no letterboxing).
  const cardBox = (ratio?: number) => {
    const maxH = isMd ? 400 : 320;
    const maxW = isMd ? 520 : 300;
    const r = ratio ?? 0.8;
    let h = maxH;
    let w = h * r;
    if (w > maxW) {
      w = maxW;
      h = w / r;
    }
    return { width: `${Math.round(w)}px`, height: `${Math.round(h)}px` };
  };


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!stageInView) {
      lastTimeRef.current = null;
      return;
    }
    const count = featured.length;
    const step = (Math.PI * 2) / count;
    const radius = 520;
    const angularVel = 0.00022; // radians per ms => full loop ~28s

    let raf = 0;


    const tick = (t: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = t;
      const dt = t - lastTimeRef.current;
      lastTimeRef.current = t;

      progressRef.current += angularVel * dt;

      // mouse inertia damping
      mouseRef.current.x += (mouseTargetRef.current.x - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseTargetRef.current.y - mouseRef.current.y) * 0.06;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const angle = i * step + progressRef.current;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        const x = sin * radius;
        const z = cos * radius - radius; // front = 0, back = -2*radius
        const rotY = -angle * (180 / Math.PI);

        // "frontness": 1 at front, 0 at side, -1 at back
        const front = cos;

        // scale interpolation: front 1, side 0.88, back 0.75
        let scale: number;
        if (front >= 0) scale = 0.88 + front * 0.12;
        else scale = 0.88 + front * 0.13; // 0.88 -> 0.75

        // opacity + blur for back
        const opacity = Math.max(0, 0.35 + (front + 1) * 0.325); // back 0.35, front 1
        const blur = front < -0.2 ? Math.min(6, (Math.abs(front) - 0.2) * 8) : 0;

        // parallax tilt only strong on front cards
        const tiltStrength = Math.max(0, front);
        const tiltY = mx * 12 * tiltStrength;
        const tiltX = -my * 10 * tiltStrength;

        el.style.transform =
          `translate3d(-50%, -50%, 0) translate3d(${x}px, 0px, ${z}px) ` +
          `rotateY(${rotY + tiltY}deg) rotateX(${tiltX}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = blur ? `blur(${blur}px)` : "";
        el.style.zIndex = String(Math.round((front + 1) * 500));
        el.style.pointerEvents = front > 0.2 ? "auto" : "none";
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stageInView]);

  // cache the stage rect so pointer moves never force a layout read
  const onMouseEnter = useCallback(() => {
    rectRef.current = stageRef.current?.getBoundingClientRect() ?? null;
  }, [stageRef]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current ?? stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    rectRef.current = rect;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseTargetRef.current = { x: nx, y: ny };
  }, [stageRef]);

  const onMouseLeave = useCallback(() => {
    rectRef.current = null;
    mouseTargetRef.current = { x: 0, y: 0 };
  }, []);


  return (
    <section id="showcase" className="px-6 pt-16 pb-10 md:px-12 md:pt-20 md:pb-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <div>
            <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-2 md:mb-3">
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

        <div
          ref={stageRef}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative w-full h-[460px] md:h-[560px] overflow-hidden"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {featured.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => (cardRefs.current[i] = el)}
                type="button"
                onClick={() => setSelected(item)}
                className="carousel-card group absolute left-1/2 top-1/2 modern-card overflow-hidden text-left"
                style={{
                  ...cardBox(ratios[item.id]),
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                  backfaceVisibility: "hidden",
                  transition: "box-shadow 300ms ease, filter 300ms ease",
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.category}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (!img.naturalWidth || !img.naturalHeight) return;
                    const r = img.naturalWidth / img.naturalHeight;
                    setRatios((prev) =>
                      prev[item.id] === r ? prev : { ...prev, [item.id]: r }
                    );
                  }}
                  className="absolute inset-0 w-full h-full object-contain transition-[filter,transform] duration-500 ease-out group-hover:brightness-110 group-hover:scale-[1.02]"
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

      <style>{`
        .carousel-card:hover {
          box-shadow: 0 30px 60px -20px hsl(var(--foreground) / 0.35);
        }
      `}</style>
    </section>
  );
};

export default FeaturedWorkSection;
