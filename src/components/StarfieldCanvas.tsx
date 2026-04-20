import { useRef, useEffect, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  glow: boolean;
  glowRadius: number;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const themeOpacityRef = useRef(1);
  const { baseTheme } = useTheme();
  const isDark = baseTheme === 'dark';

  const initStars = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const count = isMobile ? 80 : 150;
    const stars: Star[] = [];

    for (let i = 0; i < count; i++) {
      const isGlow = i < (isMobile ? 3 : 5);
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isGlow ? 4 + Math.random() * 2 : 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.6,
        speed: 0.2 + Math.random() * 0.3,
        glow: isGlow,
        glowRadius: isGlow ? 8 + Math.random() * 6 : 0,
      });
    }

    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      if (starsRef.current.length === 0) {
        initStars(w, h);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking with throttling
    let mouseRaf: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRaf !== null) return;
      mouseRaf = requestAnimationFrame(() => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        mouseRaf = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Theme opacity transition
      const targetOpacity = isDark ? 1 : 0;
      const diff = targetOpacity - themeOpacityRef.current;
      if (Math.abs(diff) > 0.001) {
        themeOpacityRef.current += diff * 0.03;
      } else {
        themeOpacityRef.current = targetOpacity;
      }

      const globalOpacity = themeOpacityRef.current;
      if (globalOpacity < 0.001) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const stars = starsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Drift upward
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = h + 10;
          star.x = Math.random() * w;
        }

        // Parallax effect (every 2 frames for performance)
        let drawX = star.x;
        let drawY = star.y;

        if (frameCount % 2 === 0) {
          const dx = star.x - mx;
          const dy = star.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 30;
            drawX += (dx / dist) * force;
            drawY += (dy / dist) * force;
          }
        }

        const alpha = star.opacity * globalOpacity;

        if (star.glow) {
          ctx.save();
          ctx.shadowBlur = star.glowRadius;
          ctx.shadowColor = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseRaf !== null) cancelAnimationFrame(mouseRaf);
    };
  }, [isDark, initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
    />
  );
}
