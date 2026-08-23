import { memo, useCallback, useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import centerAsset from "@/assets/Center.mp4";
import leftTopAsset from "@/assets/left_top.mp4";
import leftBottomAsset from "@/assets/left_bottom.mp4";
import rightTopAsset from "@/assets/right_top.mp4";
import rightBottomAsset from "@/assets/right_bottom.mp4";

type Item = {
  id: string;
  label: string;
  src: string;
  /** desktop absolute placement */
  pos: string;
  /** entrance + stacking order */
  order: number;
  /** layered depth in px */
  depth: number;
  zIndex: number;
  /** floating loop */
  floatDelay: number;
  floatRange: number;
  featured?: boolean;
};

const items: Item[] = [
  {
    id: "center",
    label: "Center",
   src: centerAsset,
pos: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] lg:w-[40%]",
    order: 0,
    depth: 90,
    zIndex: 30,
    floatDelay: 0,
    floatRange: 8,
    featured: true,
  },
  {
    id: "left-top",
    label: "Top Left",
    src: leftTopAsset,
    pos: "left-0 top-[4%] w-[27%]",
    order: 1,
    depth: -60,
    zIndex: 10,
    floatDelay: 0.3,
    floatRange: 10,
  },
  {
    id: "right-top",
    label: "Top Right",
    src: rightTopAsset,
    pos: "right-0 top-[4%] w-[27%]",
    order: 2,
    depth: 40,
    zIndex: 20,
    floatDelay: 0.6,
    floatRange: 9,
  },
  {
    id: "left-bottom",
    label: "Bottom Left",
    src: leftBottomAsset,
    pos: "left-0 bottom-[4%] w-[27%]",
    order: 3,
    depth: -35,
    zIndex: 10,
    floatDelay: 0.9,
    floatRange: 11,
  },
  {
    id: "right-bottom",
    label: "Bottom Right",
    src: rightBottomAsset,
    pos: "right-0 bottom-[4%] w-[27%]",
    order: 4,
    depth: 10,
    zIndex: 20,
    floatDelay: 1.2,
    floatRange: 9,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const VideoCard = memo(({
  item,
  onOpen,
  layered = true,
}: {
  item: Item;
  onOpen: (item: Item) => void;
  layered?: boolean;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video auto-plays and loops continuously without user interaction
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const playVideo = () => {
      el.muted = true;
      const p = el.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    };

    // Trigger play immediately and on readiness
    playVideo();
    el.addEventListener("loadeddata", playVideo);
    el.addEventListener("canplay", playVideo);

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting;
          if (visible) {
            playVideo();
          } else if (!el.paused) {
            el.pause();
          }
        },
        { rootMargin: "300px 0px", threshold: 0.01 }
      );
      io.observe(el);
    }

    return () => {
      el.removeEventListener("loadeddata", playVideo);
      el.removeEventListener("canplay", playVideo);
      if (io) io.disconnect();
    };
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 140, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-1, 1], [-8, 8]);
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);

  const rectRef = useRef<DOMRect | null>(null);

  const onEnter = useCallback(() => {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  }, []);

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = rectRef.current ?? ref.current?.getBoundingClientRect();
    if (!r) return;
    rectRef.current = r;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }, [mx, my]);

  const onLeave = useCallback(() => {
    rectRef.current = null;
    mx.set(0);
    my.set(0);
  }, [mx, my]);


  return (
    <motion.div
      className="w-full"
      style={{ transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.85, y: 80, rotateX: -12, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 1,
        ease: EASE,
        delay: 0.25 + item.order * 0.12,
      }}
    >
      <motion.div
        className="w-full"
        animate={reduce ? undefined : { y: [0, -item.floatRange, 0] }}
        transition={{
          duration: 6,
          delay: item.floatDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.button
          ref={ref}
          type="button"
          onMouseEnter={onEnter}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={() => onOpen(item)}
          aria-label={`Play ${item.label} motion project`}
          style={{
            rotateX,
            rotateY,
            translateZ: layered ? item.depth : 0,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          whileHover={{ scale: item.featured ? 1.03 : 1.05, y: -8 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="motion-card group relative block w-full overflow-hidden rounded-[24px] border border-background/10 bg-black/60 p-2 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-3"
        >
          <div className="relative w-full overflow-hidden rounded-[16px] bg-black">
            <video
              ref={videoRef}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              onLoadedData={(e) => {
                const v = e.currentTarget;
                v.muted = true;
                v.play().catch(() => {});
              }}
              className="block h-auto w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-25" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg">
                <Play size={18} />
              </span>
            </div>
          </div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
});

VideoCard.displayName = "VideoCard";


const MotionShowcaseSection = () => {
  const [active, setActive] = useState<Item | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="motion"
      className="section-padding relative overflow-hidden bg-foreground text-background noise"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/[0.04] blur-[120px]" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-background/60">
            Motion Design
          </p>
          <h2 className="heading-lg text-background">Motion Showcase</h2>
          <p className="body-md mt-4 text-background/70">
            A curated set of motion pieces — crafted for rhythm, timing, and premium visual impact.
          </p>
        </div>

        {/* Desktop / tablet X composition */}
        <div
          className="relative mx-auto hidden h-[560px] w-full max-w-5xl md:block lg:h-[700px]"
          style={{ perspective: "1400px", perspectiveOrigin: "50% 45%" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`absolute ${item.pos}`}
              style={{ zIndex: item.zIndex, transformStyle: "preserve-3d" }}
            >
              <VideoCard item={item} onOpen={setActive} />
            </div>
          ))}
        </div>

        {/* Mobile stack */}
        <div
          className="flex flex-col gap-8 md:hidden"
          style={{ perspective: "1000px" }}
        >
          {items.map((item) => (
            <VideoCard key={item.id} item={item} onOpen={setActive} layered={false} />
          ))}
        </div>
      </motion.div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-foreground/95 p-6"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close video"
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background hover:text-foreground"
          >
            <X size={20} />
          </button>
          <div
            className="w-full max-w-5xl animate-scale-in overflow-hidden rounded-[24px] border border-background/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={active.src}
              controls
              autoPlay
              loop
              playsInline
              className="h-auto max-h-[80vh] w-full bg-black object-contain"
            />
          </div>
        </div>
      )}

      <style>{`
        .motion-card { transition: box-shadow 0.5s cubic-bezier(0.16,1,0.3,1); }
        .motion-card:hover {
          box-shadow: 0 50px 90px -40px rgba(0,0,0,0.95), 0 0 60px -10px hsl(var(--background) / 0.18);
          border-color: hsl(var(--background) / 0.25);
        }
      `}</style>
    </section>
  );
};

export default MotionShowcaseSection;
