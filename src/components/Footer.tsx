import { Github } from 'lucide-react';

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Preview', href: '#preview' },
  { label: 'Documentation', href: '#how-it-works' },
];

const connectLinks = [
  { label: 'GitHub', href: 'https://github.com/felladaniel36-hash/Dark-Mode-Theme-Toggle-Switcher', icon: Github },
];

export default function Footer() {
  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="theme-transition border-t border-luna-border bg-luna-bg">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <span className="theme-transition font-display text-2xl font-semibold text-luna-text">
              Luna
            </span>
            <p className="theme-transition mt-3 max-w-xs text-sm leading-relaxed text-luna-text-secondary">
              Theme perfection, one toggle away. A complete theme system for modern React applications.
            </p>
            <p className="theme-transition mt-6 text-xs text-luna-muted">
              &copy; 2026 Huncho.Dev. All rights reserved.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="theme-transition mb-4 text-xs font-semibold uppercase tracking-widest text-luna-muted">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="theme-transition group flex items-center text-sm text-luna-text-secondary hover:text-luna-text"
                  >
                    <span className="theme-transition inline-block transition-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="theme-transition mb-4 text-xs font-semibold uppercase tracking-widest text-luna-muted">
              Connect
            </h3>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-transition group flex items-center gap-2 text-sm text-luna-text-secondary hover:text-luna-text"
                  >
                    <link.icon size={16} />
                    <span className="theme-transition inline-block transition-transform group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="theme-transition mt-12 border-t border-luna-border pt-8 text-center">
          <p className="theme-transition text-xs text-luna-muted">
            Developed by Huncho.Dev &bull; Built with React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
