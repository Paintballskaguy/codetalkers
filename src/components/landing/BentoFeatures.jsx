import Icon from '../Icon';

const SQUAD = [
  { name: 'John Wilson', role: 'Founder & Lead Engineer', icon: 'monitor', bio: 'Hand-codes every site — the booking tools, contact forms, and fast, secure pages that work on any device.' },
  { name: 'Melissa Wilson', role: 'Co-Founder & UI/UX Director', icon: 'palette', bio: 'Designs clean, modern layouts that make local businesses look professional and easy to do business with.' },
  { name: 'Gabe Ihloff', role: 'Machine Learning Engineer', icon: 'cpu', bio: 'Brings extra engineering depth to the team, focused on the data and automation that make our tools smarter.' },
  { name: 'Hailee & Nathan', role: 'Technical Contributors', icon: 'zap', bio: 'Hailee Evans and Nathan Wilson pitch in across projects — testing, content, and getting sites ready to launch.' }
];

export default function BentoFeatures() {
  return (
    <section id="services" className="bento-section" aria-labelledby="services-heading">
      <div className="bento-header">
        <h2 id="services-heading" className="reveal">What We Do</h2>
        <p className="reveal">Straightforward web services for local businesses — hand-coded by people, not page builders.</p>
      </div>

      <div className="bento-grid">
        {/* Card 1: Full-Stack */}
        <div className="themed-card bento-col-8 bento-card-stack reveal reveal-delay-100">
          <div>
            <span className="step-badge step-badge-info badge-flat">Custom Web Development</span>
            <h3>Fast, Custom-Coded Websites</h3>
            <p>
              We skip the bloated templates and page builders and hand-code your site from scratch. That means it loads fast, looks sharp on phones, and is built around how your business actually works.
            </p>
          </div>

          <div className="stat-row">
            <div className="stat-cell">
              <h4>Fast</h4>
              <span>Page Load Speeds</span>
            </div>
            <div className="stat-cell">
              <h4>Mobile</h4>
              <span>Looks Great on Any Phone</span>
            </div>
            <div className="stat-cell">
              <h4>Secure</h4>
              <span>Safe &amp; Backed Up</span>
            </div>
          </div>
        </div>

        {/* Card 2: Aesthetic */}
        <div className="themed-card bento-col-4 bento-card-aesthetic reveal reveal-delay-200">
          <div>
            <span className="step-badge step-badge-success badge-flat">Design</span>
            <h3>Designed to Stand Out</h3>
            <p>
              We design clean, modern sites that fit your brand — with the geometric touches that make our work ours — so visitors trust you before they ever pick up the phone.
            </p>
          </div>

          <div className="aesthetic-logo">
            <img
              src="/logo.png"
              alt="CodeTalkers Logo"
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Card 3: Mission */}
        <div className="themed-card bento-col-4 bento-card-mission reveal reveal-delay-100">
          <div>
            <span className="step-badge step-badge-warning badge-flat">Our Mission</span>
            <h3>Getting Clients Booked</h3>
            <p>
              Our job is simple: help more local customers find you and reach out. We build smooth contact forms, easy online booking, and the local-search basics so fewer visitors slip away.
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
        <div className="themed-card bento-col-8 bento-card-squad reveal reveal-delay-200">
          <div>
            <span className="step-badge step-badge-tip badge-flat">Meet the Team</span>
            <h3>Meet the CodeTalkers Team</h3>
            <p>We're a small, local team of Native software engineers who care about helping Oklahoma businesses grow online.</p>
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
