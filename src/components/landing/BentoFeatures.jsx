import Icon from '../Icon';

const SQUAD = [
  { name: 'John Wilson', role: 'Founder & Lead Engineer', icon: 'monitor', bio: 'Engineers custom booking tools, secure client databases, and lightning-fast full-stack platform architectures.' },
  { name: 'Melissa Wilson', role: 'Co-Founder & UI/UX Director', icon: 'palette', bio: 'Fuses traditional geometric aesthetic precision with modern typography to make small businesses look world-class.' },
  { name: 'Gabe Ihloff', role: 'Machine Learning Engineer', icon: 'cpu', bio: 'Integrates responsive AI diagnostics, localized NLP workflows, and predictive client-overhead metrics.' },
  { name: 'Hailee & Nathan', role: 'Technical Contributors', icon: 'zap', bio: 'Supported by Hailee Evans and Nathan Wilson to scale local SEO frameworks and edge database pipelines.' }
];

export default function BentoFeatures() {
  return (
    <section id="bento" className="bento-section" aria-labelledby="bento-heading">
      <div className="bento-header">
        <h2 id="bento-heading">Custom Solutions. Zero Templates.</h2>
        <p>Tactile, human-crafted engineering designed to outperform standard automated page builders.</p>
      </div>

      <div className="bento-grid">
        {/* Card 1: Full-Stack */}
        <div className="themed-card bento-col-8 bento-card-stack">
          <div>
            <span className="step-badge step-badge-info badge-flat">Full-Stack Web Engineering</span>
            <h3>Modern, Edge-Hosted Web Platforms</h3>
            <p>
              We replace clunky, template-based websites with bespoke codebase setups built using serverless React/Vite frontends and FastAPI backends. Our sites deploy to global Edge networks, ensuring near-instant local page loading and flawless mobile rendering.
            </p>
          </div>

          <div className="stat-row">
            <div className="stat-cell">
              <h4 style={{ color: 'hsl(var(--accent-violet))' }}>Instant</h4>
              <span>Client Load Speeds</span>
            </div>
            <div className="stat-cell">
              <h4 style={{ color: 'hsl(var(--accent-pink))' }}>Responsive</h4>
              <span>Flawless Layouts</span>
            </div>
            <div className="stat-cell">
              <h4 style={{ color: 'hsl(var(--accent-emerald))' }}>Secure</h4>
              <span>Database Backups</span>
            </div>
          </div>
        </div>

        {/* Card 2: Aesthetic */}
        <div className="themed-card themed-card-emerald bento-col-4 bento-card-aesthetic">
          <div>
            <span className="step-badge step-badge-success badge-flat">Creative Edge</span>
            <h3>Aesthetic Excellence</h3>
            <p>
              We ensure your business commands attention. Fusing clean displays with traditional geometric feather motifs, we design digital interfaces that are stunning, customized, and memorable.
            </p>
          </div>

          <div className="aesthetic-logo">
            <img
              src="/logo.png"
              alt="CodeTalkers Logo"
            />
          </div>
        </div>

        {/* Card 3: Mission */}
        <div className="themed-card themed-card-amber bento-col-4 bento-card-mission">
          <div>
            <span className="step-badge step-badge-warning badge-flat">Our Mission</span>
            <h3>Getting Clients Booked</h3>
            <p>
              Our job is simple: make you look world-class and bring more clients to your business. We engineer out client dropouts, establishing smooth contact loops, optimized calendars, and high-conversion client forms.
            </p>
          </div>

          <div className="mission-list">
            <p><strong>Client Growth Mappings:</strong></p>
            <ul>
              <li>Auto-save client forms</li>
              <li>Friction-free online bookings</li>
              <li>Optimized local search engine keywords</li>
            </ul>
          </div>
        </div>

        {/* Card 4: Squad */}
        <div className="themed-card bento-col-8 bento-card-squad">
          <div>
            <span className="step-badge step-badge-tip badge-flat">Core Agency Squad</span>
            <h3>Meet the CodeTalkers Squad</h3>
            <p>We are a group of dedicated local Native software engineers committed to elevating local businesses.</p>
          </div>

          <div className="squad-grid">
            {SQUAD.map((dev, i) => (
              <div key={i} className="glass-panel squad-member">
                <div className="squad-icon" aria-hidden="true">
                  <Icon name={dev.icon} size={24} />
                </div>
                <h4>{dev.name}</h4>
                <span className="squad-role">{dev.role}</span>
                <p>{dev.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
