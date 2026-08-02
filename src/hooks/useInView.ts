import { useEffect, useRef, useState, type RefObject } from "react";

/** Tracks whether an element is (near) the viewport, for pausing off-screen work. */
export function useInView<T extends HTMLElement>(
  rootMargin = "200px 0px"
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
