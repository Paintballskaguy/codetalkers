import React from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function HeroSection({ onEnterDashboard, isDarkMode }) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="mission"
      className="hero-section"
      aria-labelledby="hero-heading"
    >
      <div className={`step-badge step-badge-tip ${reducedMotion ? '' : 'floating-element'}`}>
        <span aria-hidden="true">&#10022;</span> WE DESIGN, WE CODE, WE LAUNCH
      </div>

      <h1 id="hero-heading" className="hero-title">
        Making Your Website <span className="shimmer-gradient-text">Look Amazing</span> &amp; Bringing More Clients Through the Door
      </h1>

      <p className="hero-subtitle">
        We are <strong>CodeTalkers</strong> — a family-owned website design and full-stack development firm run by John Wilson, Melissa Wilson, and our close developer squad. We modernize legacy systems and build custom digital platforms to get local small businesses booked.
      </p>

      <div className={`hero-wordmark ${reducedMotion ? '' : 'floating-element'}`}>
        <img
          src="/wordmark.png"
          alt="CodeTalkers Premium Wordmark"
          style={{
            maxHeight: '60px',
            opacity: 0.95,
            filter: isDarkMode ? 'drop-shadow(0 0 20px hsla(var(--accent-violet) / 0.15))' : 'none',
          }}
        />
      </div>

      <div className="hero-actions">
        <a href="#ticket" className="btn-brutal">Secure Your Website Quote</a>
        <button
          onClick={onEnterDashboard}
          className="btn-brutal"
          style={{
            background: 'rgba(128,128,128,0.06)',
            color: 'hsl(var(--text-primary))',
            border: '2px solid rgba(128,128,128,0.12)',
          }}
        >
          Explore Toolkit
        </button>
      </div>
    </section>
  );
}
