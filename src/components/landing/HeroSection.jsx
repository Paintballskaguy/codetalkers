import Icon from '../Icon';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="mission"
      className="hero-section"
      aria-labelledby="hero-heading"
    >
      <div
        className={`hero-badge ${reducedMotion ? '' : 'floating-element'}`}
      >
        <span className="hero-badge-dot" aria-hidden="true" />
        Family-Owned Agency in Oklahoma
      </div>

      <h1
        id="hero-heading"
        className={`hero-title ${reducedMotion ? '' : 'reveal'}`}
      >
        Digital.
        <br />
        <span className="hero-title-line2">Crafted.</span>
      </h1>

      <p className={`hero-subtitle ${reducedMotion ? '' : 'reveal reveal-delay-100'}`}>
        We are <strong>CodeTalkers</strong> — a family-owned website design and
        full-stack development firm. We modernize legacy systems and build custom
        digital platforms to get local small businesses booked.
      </p>

      <div className={`hero-actions ${reducedMotion ? '' : 'reveal reveal-delay-200'}`}>
        <a href="#work" className="btn-brutal">
          See Our Work <Icon name="arrowRight" size={16} />
        </a>
      </div>
    </section>
  );
}
