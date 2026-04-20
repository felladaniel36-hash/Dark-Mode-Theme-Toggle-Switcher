import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Detect System Preference',
    description:
      "On first visit, the hook checks window.matchMedia('(prefers-color-scheme: dark)') to determine the user's OS-level theme preference. No flash of wrong theme — the correct mode is set before the first paint.",
    code: "const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;",
  },
  {
    number: '02',
    title: 'Persist to localStorage',
    description:
      "Every theme change is immediately saved to localStorage under the key 'luna-theme'. On subsequent visits, this stored value takes precedence over the system preference, ensuring the user's choice is always respected.",
    code: "localStorage.setItem('luna-theme', 'dark');",
  },
  {
    number: '03',
    title: 'Apply with CSS Variables',
    description:
      "The active theme name is applied as a data attribute on the document root: <html data-theme='dark'>. Tailwind CSS reads this attribute and switches an entire palette of CSS custom properties. Every component inherits the new colors automatically.",
    code: '<html data-theme="dark"> /* CSS vars switch automatically */',
  },
  {
    number: '04',
    title: 'Animate Every Transition',
    description:
      "A single CSS rule applies transition to color, background-color, border-color, and box-shadow across all themed elements. The result: every themed element animates simultaneously in a smooth 400ms ease-out.",
    code: '.theme-transition { transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1); }',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="theme-transition bg-luna-bg">
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8 lg:py-[120px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center lg:mb-20"
        >
          <p className="theme-transition text-xs font-medium uppercase tracking-[0.12em] text-luna-accent">
            How It Works
          </p>
          <h2 className="theme-transition mt-4 font-display text-4xl font-semibold tracking-tight text-luna-text md:text-5xl">
            Simple Architecture, Powerful Results
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="theme-transition absolute left-6 top-0 hidden h-full w-0.5 origin-top bg-luna-accent/30 md:left-1/2 md:-translate-x-px lg:block"
          />

          {/* Mobile left border */}
          <div className="theme-transition absolute left-3 top-0 h-full w-1 rounded-full bg-luna-accent/30 md:left-6 lg:hidden" />

          {/* Steps */}
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex items-start gap-6 md:gap-8 lg:gap-0 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Number dot */}
                  <div className="theme-transition relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-luna-accent text-sm font-bold text-luna-accent-text md:h-10 md:w-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1 + 0.2,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="hidden md:inline"
                    >
                      {parseInt(step.number)}
                    </motion.span>
                    <span className="md:hidden">{parseInt(step.number)}</span>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 lg:w-1/2 ${
                      isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                    }`}
                  >
                    {/* Mobile number + title inline */}
                    <div className="flex items-center gap-3 lg:block">
                      <span className="theme-transition text-3xl font-bold text-luna-accent/50 lg:hidden">
                        {step.number}
                      </span>
                      <h3 className="theme-transition text-xl font-semibold text-luna-text lg:text-2xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="theme-transition mt-3 leading-relaxed text-luna-text-secondary">
                      {step.description}
                    </p>

                    {/* Code block */}
                    <div
                      className={`theme-transition mt-4 overflow-x-auto rounded-lg border-l-[3px] border-l-luna-accent bg-luna-surface p-4 ${
                        isEven ? 'lg:ml-auto' : ''
                      }`}
                    >
                      <code className="theme-transition font-mono text-sm text-luna-text">
                        {step.code}
                      </code>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
