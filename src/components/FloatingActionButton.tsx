import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface FloatingActionButtonProps {
  visible: boolean;
}

export default function FloatingActionButton({ visible }: FloatingActionButtonProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 lg:hidden"
        >
          <div className="theme-transition glass flex h-14 w-14 items-center justify-center rounded-full border border-luna-border shadow-lg">
            <ThemeToggle size="sm" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
