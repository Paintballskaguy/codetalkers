// Honest signals for a new, local, family-owned shop — no awards, no inflated
// project counts. Each of these is true and defensible if a prospect asks.
const STATS = [
  { value: '100%', label: 'Custom-Coded — No Templates' },
  { value: '24 hr', label: 'Quote Turnaround' },
  { value: 'Atlas IT', label: 'Trained & Certified' },
  { value: 'Local', label: 'Oklahoma Family-Owned' },
];

export default function StatsSection() {
  return (
    <section id="about" className="stats-section" aria-labelledby="stats-heading">
      <div className="stats-grid">
        <div className="stats-text reveal">
          <h2 id="stats-heading">Freshly trained. Locally focused.</h2>
          <p>
            We just graduated from Atlas IT School and now build modern,
            custom-coded websites for Oklahoma small businesses. No templates,
            no page builders — just a local, family-owned team that treats your
            project like our name is on it. Because it is.
          </p>
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
