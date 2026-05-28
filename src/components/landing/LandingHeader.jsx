import Icon from '../Icon';

const THEMES = [
  { id: 'brutalist', label: 'Brutal', icon: 'zap', title: 'Brutalist Design System' },
  { id: 'minimalist', label: 'Sleek', icon: 'sparkle', title: 'Clean Minimalist UI' },
  { id: 'organic', label: 'Warm', icon: 'palette', title: 'Traditional Organic Earthy Warm Theme' },
];

export default function LandingHeader({
  currentTheme,
  setCurrentTheme,
  isDarkMode,
  setIsDarkMode,
  onEnterDashboard,
}) {
  return (
    <header
      className="themed-header"
      style={{
        position: 'sticky',
        top: '20px',
        zIndex: 1000,
        margin: '0 20px',
        padding: '16px 32px',
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
        />
        <span className="brand-text">CodeTalkers</span>
      </a>

      <nav className="landing-nav" aria-label="Landing page navigation">
        <div className="theme-switcher" role="group" aria-label="Theme selector">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setCurrentTheme(t.id)}
              className={`theme-pill ${currentTheme === t.id ? 'theme-pill-active' : ''}`}
              title={t.title}
              aria-pressed={currentTheme === t.id}
            >
              <Icon name={t.icon} size={12} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mode-toggle"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <Icon name={isDarkMode ? 'sun' : 'moon'} size={16} />
        </button>

        <a href="#mission" className="nav-anchor">Our Mission</a>
        <a href="#bento" className="nav-anchor">Solutions</a>
        <a href="#calculator" className="nav-anchor">ROI Calculator</a>
        <button onClick={onEnterDashboard} className="btn-brutal cta-btn">
          Dev Toolkit <Icon name="zap" size={14} />
        </button>
      </nav>
    </header>
  );
}
