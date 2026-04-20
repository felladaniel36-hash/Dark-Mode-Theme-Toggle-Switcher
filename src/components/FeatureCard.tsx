import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="theme-transition group rounded-[20px] border border-luna-border bg-luna-surface p-6 transition-shadow hover:border-luna-border-hover hover:shadow-card-hover lg:p-10"
    >
      {/* Icon container */}
      <div className="theme-transition flex h-12 w-12 items-center justify-center rounded-xl bg-luna-glass text-luna-accent">
        {icon}
      </div>

      {/* Title */}
      <h3 className="theme-transition mt-6 text-xl font-semibold leading-tight text-luna-text lg:text-2xl">
        {title}
      </h3>

      {/* Description */}
      <p className="theme-transition mt-3 leading-relaxed text-luna-text-secondary">
        {description}
      </p>
    </motion.div>
  );
}
