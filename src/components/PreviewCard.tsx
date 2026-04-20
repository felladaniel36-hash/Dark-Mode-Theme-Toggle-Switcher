import { motion } from 'framer-motion';

const bars = [
  { height: '40%', delay: 0 },
  { height: '70%', delay: 0.1 },
  { height: '55%', delay: 0.2 },
  { height: '90%', delay: 0.3 },
  { height: '60%', delay: 0.4 },
];

const stats = [
  { value: '1,240', label: 'Views' },
  { value: '98%', label: 'Score' },
  { value: '12', label: 'Days' },
];

export default function PreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="theme-transition w-full max-w-[400px] overflow-hidden rounded-[20px] border border-luna-border bg-luna-surface shadow-lg transition-shadow hover:shadow-card-hover"
    >
      {/* Header */}
      <div className="theme-transition flex items-center gap-3 border-b border-luna-border px-6 py-4">
        <div className="theme-transition flex h-8 w-8 items-center justify-center rounded-full bg-luna-accent text-xs font-semibold text-luna-accent-text">
          U
        </div>
        <span className="theme-transition flex-1 text-sm font-medium text-luna-text">
          User Profile
        </span>
        <div className="theme-transition flex gap-0.5">
          <div className="h-1 w-1 rounded-full bg-luna-muted" />
          <div className="h-1 w-1 rounded-full bg-luna-muted" />
          <div className="h-1 w-1 rounded-full bg-luna-muted" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 px-6 py-5">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="theme-transition text-lg font-bold text-luna-text lg:text-xl">
              {stat.value}
            </div>
            <div className="theme-transition mt-0.5 text-xs uppercase tracking-wider text-luna-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="flex h-28 items-end justify-center gap-3 px-6 pb-2">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 0.3 + bar.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="theme-transition w-8 origin-bottom rounded-t-md bg-luna-accent"
            style={{ height: bar.height }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="theme-transition px-6 py-3 text-center text-xs text-luna-muted">
        Last updated: just now
      </div>
    </motion.div>
  );
}
