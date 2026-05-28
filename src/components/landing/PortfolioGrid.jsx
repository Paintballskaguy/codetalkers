import Icon from '../Icon';

const PROJECTS = [
  {
    id: 1,
    name: 'Boman Twine Company',
    client: 'Manufacturing & Industrial',
    description: 'A professional industrial supply website with product catalogs, contact forms, and mobile-first responsive design built for B2B client acquisition.',
    tags: ['React', 'Vite', 'Responsive'],
    color: 'hsl(var(--accent-violet))',
    image: '/logo.png',
    url: 'https://bomantwinec.com/',
  },
  {
    id: 2,
    name: 'Green Realty',
    client: 'Real Estate Agency',
    description: 'A modern realtor platform with property listings, agent profiles, and lead capture forms designed to convert browsers into buyers.',
    tags: ['React', 'Vercel', 'SEO-Optimized'],
    color: 'hsl(var(--accent-emerald))',
    image: '/logo.png',
    url: 'https://realtor-green.vercel.app/',
  },
];

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-heading">
      <div className="portfolio-header">
        <span className="step-badge step-badge-info badge-flat">Selected Work</span>
        <h2 id="portfolio-heading">Sites We Have Built</h2>
        <p>Real client platforms engineered for performance, conversions, and long-term growth.</p>
      </div>

      <div className="portfolio-grid">
        {PROJECTS.map((project) => (
          <article key={project.id} className="themed-card portfolio-card">
            <div className="portfolio-preview" style={{ borderColor: project.color }}>
              <img
                src={project.image}
                alt={`${project.name} project preview`}
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
              />
              <div
                className="portfolio-accent-bar"
                style={{ background: project.color }}
                aria-hidden="true"
              />
            </div>

            <div className="portfolio-body">
              <div className="portfolio-meta">
                <span className="portfolio-client">{project.client}</span>
                <h3>{project.name}</h3>
              </div>

              <p className="portfolio-desc">{project.description}</p>

              <div className="portfolio-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="step-badge step-badge-info" style={{ fontSize: '10px' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="portfolio-actions">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal"
                  style={{ fontSize: '13px', padding: '10px 18px' }}
                  aria-label={`Open live site for ${project.name} in new tab`}
                >
                  View Live <Icon name="arrowRight" size={14} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
