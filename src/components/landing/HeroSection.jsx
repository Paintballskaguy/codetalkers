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
        Family-Owned Web Studio · Tulsa, OK
      </div>

      <h1
        id="hero-heading"
        className={`hero-title ${reducedMotion ? '' : 'hero-enter'}`}
      >
        Custom websites for
        <br />
        <span className="hero-title-line2">Oklahoma small businesses.</span>
      </h1>

      <p className={`hero-subtitle ${reducedMotion ? '' : 'hero-enter hero-enter-delay-1'}`}>
        We're <strong>CodeTalkers</strong> — a family-owned Tulsa studio, fresh
        out of Atlas IT School. We build fast, custom-coded websites (no templates)
        that help local businesses get found on Google and turn visitors into
        booked customers.
      </p>

      <div className={`hero-actions ${reducedMotion ? '' : 'hero-enter hero-enter-delay-2'}`}>
        <a href="#ticket" className="btn-brutal">
          Get a Free Quote <Icon name="arrowRight" size={16} />
        </a>
        <a href="#work" className="btn-secondary">
          See Our Work
        </a>
      </div>
    </section>
  );
}
