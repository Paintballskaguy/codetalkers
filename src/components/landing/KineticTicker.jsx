import useReducedMotion from '../../hooks/useReducedMotion';

const ITEMS = [
  'STRATEGY',
  'DESIGN',
  'DEVELOPMENT',
  'SEO',
  'AI SOLUTIONS',
  'BRANDING',
  'UI/UX',
];

export default function KineticTicker() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="ticker-container" role="region" aria-label="Agency capabilities ticker">
      <div
        className="ticker-content"
        style={reducedMotion ? { animation: 'none' } : undefined}
      >
        {[...ITEMS, ...ITEMS].map((text, i) => (
          <div key={i} className="ticker-item">
            <span aria-hidden="true">&#10022;</span> {text}
          </div>
        ))}
      </div>
    </div>
  );
}
