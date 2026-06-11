import { useState, useEffect, useRef } from 'react';
import Icon from '../Icon';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'Agency' },
];

export default function LandingHeader({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
    // Return focus to the control that opened the drawer.
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;

    const drawer = drawerRef.current;
    const focusable = drawer
      ? drawer.querySelectorAll('a[href], button:not([disabled])')
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Move focus into the drawer when it opens.
    first?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }
      // Trap Tab focus within the drawer.
      if (e.key === 'Tab' && focusable.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
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
          Get a Free Quote <Icon name="arrowRight" size={14} />
        </a>
      </nav>

      <button
        ref={toggleRef}
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
          ref={drawerRef}
          className="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
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
              Get a Free Quote <Icon name="arrowRight" size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
