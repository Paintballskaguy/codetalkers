import Icon from '../Icon';

export default function LandingHeader() {
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
        <a href="#services" className="nav-anchor">Services</a>
        <a href="#work" className="nav-anchor">Work</a>
        <a href="#about" className="nav-anchor">Agency</a>
        <a href="#ticket" className="btn-brutal cta-btn">
          Start a Project <Icon name="arrowRight" size={14} />
        </a>
      </nav>
    </header>
  );
}
