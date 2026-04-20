import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { button: 44, icon: 20 },
  md: { button: 48, icon: 22 },
  lg: { button: 80, icon: 36 },
};

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle({ size = 'md', showLabel = false, className = '' }: ThemeToggleProps) {
  const { baseTheme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const isDark = baseTheme === 'dark';

  const { button: buttonSize, icon: iconSize } = sizeMap[size];
  const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <motion.button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="theme-transition relative flex items-center justify-center rounded-full border border-luna-border bg-luna-toggle-track text-luna-toggle-thumb backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-luna-accent"
        style={{ width: buttonSize, height: buttonSize }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        aria-label={label}
        title={label}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <MoonIcon size={iconSize} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <SunIcon size={iconSize} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !showLabel && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, delay: 0.2 }}
            className="theme-transition absolute top-full mt-2 whitespace-nowrap rounded-md bg-luna-surface px-2.5 py-1 text-xs text-luna-text-secondary shadow-lg"
            style={{ zIndex: 70 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label below toggle */}
      {showLabel && (
        <span className="theme-transition mt-2 text-xs text-luna-muted">
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </div>
  );
}
