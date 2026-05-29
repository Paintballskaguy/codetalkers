const STATS = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '15+', label: 'Industry Awards' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Dev Support' },
];

export default function StatsSection() {
  return (
    <section id="about" className="stats-section" aria-labelledby="stats-heading">
      <div className="stats-grid">
        <div className="stats-text reveal">
          <h2 id="stats-heading">We build world-class digital products.</h2>
          <p>We act as your dedicated technical partners.</p>
        </div>

        <div className="stats-cards">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stats-card reveal reveal-delay-${(i + 1) * 100}`}
            >
              <div className="stats-value">{stat.value}</div>
              <div className="stats-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
