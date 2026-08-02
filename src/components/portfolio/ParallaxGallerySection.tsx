import { memo, useEffect, useMemo, useRef, useState } from "react";
import { galleryImages, type GalleryImage } from "./galleryImages";
import { useInView } from "@/hooks/useInView";

/** deterministic shuffle so layout feels organic but stable across renders */
const shuffle = (items: GalleryImage[]) => {
  const arr = [...items];
  let seed = 20260730;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const colsForWidth = (w: number) => (w < 640 ? 2 : w < 1024 ? 3 : w < 1440 ? 4 : 5);

const useColumnCount = () => {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      // throttle to one update per frame
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setCols(colsForWidth(window.innerWidth));
      });
    };
    setCols(colsForWidth(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return cols;
};


const SPEEDS = [26, 34, 22, 38, 30]; // px per second, unique per column

const ParallaxColumn = memo(
  ({
    images,
    direction,
    speed,
    velocityRef,
    active,
  }: {
    images: GalleryImage[];
    direction: 1 | -1;
    speed: number;
    velocityRef: React.MutableRefObject<number>;
    active: boolean;
  }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const halfRef = useRef(0);

    // measure once per size change instead of every animation frame
    useEffect(() => {
      const inner = innerRef.current;
      if (!inner) return;
      const measure = () => {
        halfRef.current = inner.offsetHeight / 2;
      };
      measure();
      if (typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(() => measure());
      ro.observe(inner);
      return () => ro.disconnect();
    }, [images]);

    useEffect(() => {
      if (!active) return;
      let raf = 0;
      let last: number | null = null;

      const tick = (t: number) => {
        if (last == null) last = t;
        const dt = Math.min(64, t - last);
        last = t;

        const track = trackRef.current;
        const half = halfRef.current;
        if (track && half > 0) {
          offsetRef.current +=
            (direction * speed * dt) / 1000 + (velocityRef.current * dt) / 1000;
          offsetRef.current = ((offsetRef.current % half) + half) % half;
          track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
        }
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, [direction, speed, velocityRef, active]);

    const loop = useMemo(() => [...images, ...images], [images]);

    return (
      <div className="relative flex-1 min-w-0 overflow-hidden">
        <div ref={trackRef} style={{ willChange: "transform" }}>
          <div ref={innerRef} className="flex flex-col gap-4 md:gap-6">
            {loop.map((img, i) => (
              <figure
                key={`${img.src}-${i}`}
                className="parallax-card group relative rounded-xl overflow-hidden border border-foreground/10 bg-secondary/40 backdrop-blur-sm shadow-[0_18px_45px_-25px_hsl(var(--foreground)/0.45)] transition-transform duration-500 ease-out"
                style={{ transformStyle: "preserve-3d", contentVisibility: "auto" } as React.CSSProperties}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="block w-full h-auto"
                  style={{ aspectRatio: `${img.w} / ${img.h}` }}
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-foreground/20 shadow-[0_0_60px_-10px_hsl(var(--foreground)/0.35)_inset]" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ParallaxColumn.displayName = "ParallaxColumn";

const ParallaxGallerySection = () => {
  const cols = useColumnCount();
  const velocityRef = useRef(0);
  const [sectionRef, inView] = useInView<HTMLDivElement>("300px 0px");

  const columns = useMemo(() => {
    const shuffled = shuffle(galleryImages);
    const buckets: GalleryImage[][] = Array.from({ length: cols }, () => []);
    shuffled.forEach((img, i) => buckets[i % cols].push(img));
    return buckets;
  }, [cols]);

  // wheel-driven inertia with damping — the damping loop only runs while
  // there is velocity to bleed off, so no idle rAF work.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !inView) return;

    let raf = 0;

    const damp = () => {
      velocityRef.current *= 0.94;
      if (Math.abs(velocityRef.current) < 0.05) {
        velocityRef.current = 0;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(damp);
    };

    const onWheel = (e: WheelEvent) => {
      velocityRef.current += e.deltaY * 0.9;
      velocityRef.current = Math.max(-1400, Math.min(1400, velocityRef.current));
      if (!raf) raf = requestAnimationFrame(damp);
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
      velocityRef.current = 0;
    };
  }, [inView, sectionRef]);

  return (
    <section id="gallery" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-muted-foreground font-medium tracking-widest uppercase text-sm mb-4">
              Gallery
            </p>
            <h2 className="heading-lg">
              An Endless <span className="gradient-text">Design Archive</span>
            </h2>
          </div>
          <p className="body-md text-muted-foreground max-w-md">
            A continuously flowing archive of posters, branding and campaign
            work — every piece shown in its original proportions.
          </p>
        </div>
      </div>

      <div
        ref={sectionRef}
        className="relative mx-auto max-w-[1600px] px-4 md:px-8 h-[70vh] md:h-[85vh] overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div className="flex gap-4 md:gap-6 h-full">
          {columns.map((colImages, i) => (
            <ParallaxColumn
              key={`${cols}-${i}`}
              images={colImages}
              direction={i % 2 === 0 ? 1 : -1}
              speed={SPEEDS[i % SPEEDS.length]}
              velocityRef={velocityRef}
              active={inView}
            />
          ))}
        </div>

        {/* soft fades to blend with page background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <style>{`
        .parallax-card:hover {
          transform: perspective(1200px) rotateX(3deg) rotateY(-3deg) scale(1.03);
          box-shadow: 0 40px 80px -30px hsl(var(--foreground) / 0.5);
        }
      `}</style>
    </section>
  );
};

export default ParallaxGallerySection;
