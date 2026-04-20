import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Preview', href: '#preview' },
  { label: 'How It Works', href: '#how-it-works' },
];

export default function Navbar() {
  const scrollY = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const isScrolled = scrollY > 50;

  // Track active section
  useEffect(() => {
    const sections = ['features', 'preview', 'how-it-works'];
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          setActiveSection(sections[i]);
          return;
        }
      }
    }
    setActiveSection('');
  }, [scrollY]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`theme-transition fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? 'border-luna-border glass'
            : 'border-transparent bg-transparent'
        }`}
        style={{ height: 64 }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="theme-transition font-display text-xl font-semibold text-luna-text hover:text-luna-accent focus:outline-none"
          >
            Luna
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`theme-transition relative text-sm font-medium uppercase tracking-widest transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-luna-text'
                    : 'text-luna-text-secondary hover:text-luna-text'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luna-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side: Theme toggle + Mobile menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle size="sm" />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="theme-transition flex h-10 w-10 items-center justify-center rounded-lg text-luna-text-secondary hover:text-luna-text focus:outline-none md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="theme-transition fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-luna-bg/95 backdrop-blur-lg md:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="theme-transition absolute right-6 top-4 flex h-10 w-10 items-center justify-center rounded-lg text-luna-text-secondary hover:text-luna-text"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNavClick(link.href)}
                className="theme-transition text-2xl font-medium text-luna-text-secondary hover:text-luna-text"
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
            >
              <ThemeToggle size="lg" showLabel />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
