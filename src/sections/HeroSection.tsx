import { motion } from 'framer-motion';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import ScrollIndicator from '@/components/ScrollIndicator';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HeroSection() {
  const scrollY = useScrollPosition();
  const showScrollIndicator = scrollY < 100;

  const handleCTAClick = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="theme-transition hero-section relative flex min-h-[600px] items-center justify-center overflow-hidden">
      {/* Starfield background */}
      <StarfieldCanvas />

      {/* Hero gradient overlay */}
      <div className="theme-transition hero-gradient-dark absolute inset-0" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="theme-transition text-xs font-medium uppercase tracking-[0.12em] text-luna-accent"
        >
          Theme Switcher
        </motion.p>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="theme-transition mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight text-luna-text md:text-7xl lg:text-[96px]"
        >
          One Toggle, Endless Moods
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="theme-transition mx-auto mt-8 max-w-xl text-lg font-light leading-relaxed text-luna-text-secondary md:text-xl"
        >
          Seamlessly switch between dark and light themes with smooth transitions, system preference detection, and persistent settings. Built for modern React applications.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-12">
          <motion.button
            onClick={handleCTAClick}
            whileHover={{ y: -2, boxShadow: '0 0 30px var(--accent-glow)' }}
            whileTap={{ scale: 0.97 }}
            className="theme-transition inline-flex h-[52px] items-center rounded-xl bg-luna-accent px-8 text-sm font-medium uppercase tracking-widest text-luna-accent-text transition-shadow hover:bg-luna-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-luna-accent focus-visible:ring-offset-2 focus-visible:ring-offset-luna-bg"
          >
            Try It Now
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator visible={showScrollIndicator} />
    </section>
  );
}
