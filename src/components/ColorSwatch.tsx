import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorSwatchProps {
  colors: { name: string; value: string; cssVar?: string }[];
  size?: 'sm' | 'md';
}

export default function ColorSwatch({ colors, size = 'sm' }: ColorSwatchProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const swatchSize = size === 'sm' ? 'w-5 h-5' : 'w-8 h-8';

  return (
    <div className="flex flex-wrap items-center gap-2">
      {colors.map((color, i) => (
        <div
          key={color.name}
          className="relative"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`${swatchSize} theme-transition rounded-full border border-luna-border`}
            style={{ backgroundColor: color.value }}
          />

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIndex === i && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="theme-transition absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-luna-surface px-2 py-1 text-xs text-luna-text-secondary shadow-lg"
              >
                {color.cssVar || color.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
