import { useState, useEffect } from 'react';
import Icon from '../Icon';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'Agency' },
];

export default function LandingHeader({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  return (
    <header
      className="themed-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <a
        href="#mission"
        className="brand-link"
        aria-label="CodeTalkers Home"
      >
        <img
          src="/logo.png"
          alt="CodeTalkers Logo"
          className="brand-logo"
          width="42"
          height="42"
          decoding="async"
        />
        <span className="brand-text">CodeTalkers</span>
      </a>

      <nav className="landing-nav" aria-label="Landing page navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-anchor${activeSection === link.href.slice(1) ? ' nav-active' : ''}`}
          >
            {link.label}
          </a>
        ))}
        <a href="#ticket" className="btn-brutal cta-btn">
          Start a Project <Icon name="arrowRight" size={14} />
        </a>
      </nav>

      <button
        className="mobile-menu-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
        <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
        <span className={`hamburger-line${menuOpen ? ' open' : ''}`} />
      </button>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="mobile-nav-drawer"
          role="dialog"
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-nav-anchor${activeSection === link.href.slice(1) ? ' nav-active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#ticket"
              className="btn-brutal cta-btn mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              Start a Project <Icon name="arrowRight" size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
