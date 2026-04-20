import { useState, useEffect, useRef } from 'react';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          setScrollY(lastScrollY.current);
          rafId.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollY;
}
