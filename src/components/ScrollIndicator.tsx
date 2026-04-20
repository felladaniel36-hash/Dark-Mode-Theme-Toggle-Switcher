import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  visible: boolean;
}

export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      style={{ zIndex: 1 }}
    >
      <div className="h-8 w-px bg-luna-muted" />
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} className="text-luna-muted" />
      </motion.div>
    </motion.div>
  );
}
