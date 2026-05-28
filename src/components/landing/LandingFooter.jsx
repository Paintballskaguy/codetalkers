
export default function LandingFooter({ isDarkMode }) {
  return (
    <footer className="themed-footer landing-footer" aria-label="CodeTalkers footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <img src="/logo.png" alt="CodeTalkers Logo" width="40" height="40" loading="lazy" decoding="async" />
            <h3>CodeTalkers</h3>
          </div>
          <p>
            Weaving traditional geometric precision with low-latency modern website designs to supercharge local small business client volume.
          </p>
        </div>

        <div className="footer-badge">
          <a href="#mission" aria-label="Back to top">
            <img
              src="/footer-badge.png"
              alt="Built by CodeTalkers Footer Badge"
              width="180"
              height="auto"
              loading="lazy"
              decoding="async"
              style={{
                filter: isDarkMode ? 'drop-shadow(0 0 20px hsla(var(--accent-violet) / 0.25))' : 'none',
              }}
            />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 CodeTalkers. All rights reserved.</p>
        <p>Brother-Sister Crafted in Oklahoma, USA</p>
      </div>
    </footer>
  );
}
