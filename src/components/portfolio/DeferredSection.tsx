import { Suspense, memo, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children only once the placeholder approaches the viewport
 * (or after the browser goes idle), keeping the initial JS/media work small
 * without changing any visual output. A reserved min-height prevents CLS.
 */
const DeferredSection = memo(
  ({ children, minHeight = 600 }: { children: ReactNode; minHeight?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
      if (show) return;
      const el = ref.current;
      let idle: number | undefined;

      const reveal = () => setShow(true);

      if (el && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io.disconnect();
              reveal();
            }
          },
          { rootMargin: "1200px 0px" }
        );
        io.observe(el);

        // safety net so in-page anchors always find a mounted section
        const w = window as unknown as {
          requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
        };
        if (w.requestIdleCallback) {
          idle = w.requestIdleCallback(() => {
            io.disconnect();
            reveal();
          }, { timeout: 4000 });
        } else {
          idle = window.setTimeout(() => {
            io.disconnect();
            reveal();
          }, 3000) as unknown as number;
        }

        return () => {
          io.disconnect();
          if (idle !== undefined) {
            const c = (window as unknown as { cancelIdleCallback?: (h: number) => void })
              .cancelIdleCallback;
            c ? c(idle) : clearTimeout(idle);
          }
        };
      }

      reveal();
    }, [show]);

    if (!show) return <div ref={ref} style={{ minHeight }} aria-hidden />;

    return (
      <Suspense fallback={<div style={{ minHeight }} aria-hidden />}>
        {children}
      </Suspense>
    );
  }
);

DeferredSection.displayName = "DeferredSection";

export default DeferredSection;
