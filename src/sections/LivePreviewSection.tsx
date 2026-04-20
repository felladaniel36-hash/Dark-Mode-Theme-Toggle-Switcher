import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import PreviewCard from '@/components/PreviewCard';
import ColorSwatch from '@/components/ColorSwatch';
import { useTheme } from '@/hooks/useTheme';

export default function LivePreviewSection() {
  const { baseTheme } = useTheme();
  const isDark = baseTheme === 'dark';

  const swatchColors = [
    { name: 'bg-base', value: isDark ? '#0a0a14' : '#faf8f5', cssVar: '--bg-base' },
    { name: 'bg-surface', value: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', cssVar: '--bg-surface' },
    { name: 'bg-surface-hover', value: isDark ? 'rgba(255,255,255,0.08)' : '#f5f2ed', cssVar: '--bg-surface-hover' },
    { name: 'text-primary', value: isDark ? '#ffffff' : '#1a1a2e', cssVar: '--text-primary' },
    { name: 'text-secondary', value: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(26,26,46,0.65)', cssVar: '--text-secondary' },
    { name: 'text-muted', value: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(26,26,46,0.35)', cssVar: '--text-muted' },
    { name: 'accent', value: '#c9a87c', cssVar: '--accent' },
    { name: 'border', value: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)', cssVar: '--border' },
  ];

  return (
    <section
      id="preview"
      className="theme-transition bg-luna-surface/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-[120px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left column: Text content + toggle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="theme-transition text-xs font-medium uppercase tracking-[0.12em] text-luna-accent">
              Live Preview
            </p>
            <h2 className="theme-transition mt-4 font-display text-4xl font-semibold tracking-tight text-luna-text md:text-5xl lg:text-[56px]">
              See It In Action
            </h2>
            <p className="theme-transition mt-4 max-w-lg text-lg font-light leading-relaxed text-luna-text-secondary">
              Toggle the switch below and watch every element on this page transform instantly. The preview card shows how a typical UI component adapts between themes.
            </p>

            {/* Large Theme Toggle */}
            <div className="mt-10">
              <ThemeToggle size="lg" showLabel />
            </div>

            {/* Color Swatches */}
            <div className="theme-transition mt-8">
              <p className="theme-transition mb-3 text-xs uppercase tracking-wider text-luna-muted">
                Current Palette
              </p>
              <ColorSwatch colors={swatchColors} size="md" />
            </div>
          </motion.div>

          {/* Right column: Preview Card */}
          <div className="flex justify-center lg:justify-end">
            <PreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
