import { motion } from 'framer-motion';
import FeatureCard from '@/components/FeatureCard';
import { Zap, Eye, Save, Accessibility, Monitor, Package } from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} />,
    title: 'Smooth Transitions',
    description:
      'Every color, shadow, and border animates seamlessly with a 400ms ease-out curve. No jarring flashes — just elegant transformation.',
  },
  {
    icon: <Eye size={24} />,
    title: 'System Preference Detection',
    description:
      "Automatically respects the user's OS-level dark or light mode preference on first visit. No configuration needed — it just works.",
  },
  {
    icon: <Save size={24} />,
    title: 'Persistent Settings',
    description:
      "Your theme choice is saved to localStorage and remembered across sessions. Return anytime to find your preferred mode waiting.",
  },
  {
    icon: <Accessibility size={24} />,
    title: 'Fully Accessible',
    description:
      'ARIA labels, keyboard navigation, and focus-visible rings ensure everyone can use the toggle. Respects prefers-reduced-motion for sensitive users.',
  },
  {
    icon: <Monitor size={24} />,
    title: 'Responsive Design',
    description:
      'From mobile phones to ultrawide monitors, the theme system adapts beautifully. Touch-friendly toggle on mobile with a floating action button.',
  },
  {
    icon: <Package size={24} />,
    title: 'Zero Dependencies',
    description:
      'Built with pure React hooks and Tailwind CSS. No heavy animation libraries or CSS-in-JS overhead. Lightweight and fast.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="theme-transition bg-luna-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-[120px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center lg:mb-20"
        >
          <p className="theme-transition text-xs font-medium uppercase tracking-[0.12em] text-luna-accent">
            Features
          </p>
          <h2 className="theme-transition mt-4 font-display text-4xl font-semibold tracking-tight text-luna-text md:text-5xl lg:text-[56px]">
            Everything You Need
          </h2>
          <p className="theme-transition mx-auto mt-4 max-w-xl text-lg font-light text-luna-text-secondary">
            A complete theme system designed for production-ready applications.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
