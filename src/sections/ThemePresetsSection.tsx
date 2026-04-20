import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeName } from '@/hooks/useTheme';

interface Preset {
  name: string;
  theme: ThemeName;
  bg: string;
  accent: string;
}

const presets: Preset[] = [
  { name: 'Midnight', theme: 'midnight', bg: '#0f0f1a', accent: '#8b5cf6' },
  { name: 'Ocean', theme: 'ocean', bg: '#0c1929', accent: '#06b6d4' },
  { name: 'Forest', theme: 'forest', bg: '#0a1f0a', accent: '#22c55e' },
  { name: 'Sunset', theme: 'sunset', bg: '#1a0a0a', accent: '#f97316' },
];

export default function ThemePresetsSection() {
  const { theme, isPresetActive, applyPreset, resetToDefault } = useTheme();

  const handlePresetClick = (preset: Preset) => {
    if (theme === preset.theme) {
      resetToDefault();
    } else {
      applyPreset(preset.theme);
    }
  };

  return (
    <section className="theme-transition" style={{ backgroundColor: 'var(--bg-surface)', opacity: 1 }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center lg:mb-12"
        >
          <p className="theme-transition text-xs font-medium uppercase tracking-[0.12em] text-luna-accent">
            More Themes
          </p>
          <h2 className="theme-transition mt-4 font-display text-3xl font-semibold tracking-tight text-luna-text md:text-4xl">
            Explore the Possibilities
          </h2>
          <p className="theme-transition mx-auto mt-3 max-w-lg text-base font-light text-luna-text-secondary">
            Click any preset to preview. Your preference won't be saved — this is just for fun.
          </p>
        </motion.div>

        {/* Preset Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
          {presets.map((preset, i) => {
            const isActive = theme === preset.theme;
            return (
              <motion.button
                key={preset.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePresetClick(preset)}
                className="theme-transition group relative overflow-hidden rounded-xl border border-white/10 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-luna-accent"
                style={{
                  backgroundColor: preset.bg,
                  boxShadow: isActive ? `0 0 24px ${preset.accent}40` : undefined,
                }}
              >
                {/* Accent bar */}
                <div
                  className="h-1 w-full transition-opacity"
                  style={{ backgroundColor: preset.accent, opacity: isActive ? 1 : 0.6 }}
                />

                {/* Card content */}
                <div className="flex h-[100px] items-center justify-center md:h-[120px] lg:h-[140px]">
                  <span className="text-sm font-medium text-white lg:text-base">
                    {preset.name}
                  </span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activePreset"
                    className="absolute inset-0 rounded-xl ring-2 ring-inset"
                    style={{ boxShadow: `inset 0 0 0 2px ${preset.accent}` }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover glow */}
                <div
                  className="theme-transition absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 30px ${preset.accent}20` }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Reset Button */}
        <AnimatePresence>
          {isPresetActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-8 text-center"
            >
              <button
                onClick={resetToDefault}
                className="theme-transition inline-flex h-10 items-center rounded-lg border border-luna-border px-5 text-sm font-medium text-luna-text-secondary transition-colors hover:border-luna-border-hover hover:bg-luna-surface-hover hover:text-luna-text focus:outline-none focus-visible:ring-2 focus-visible:ring-luna-accent"
              >
                Back to Default
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
