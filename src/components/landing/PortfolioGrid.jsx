import Icon from '../Icon';

const PROJECTS = [
  {
    id: 1,
    name: 'The Boman',
    client: 'Music Venue and Special Events Center',
    description: 'A professional live music venue website with booking information, contact forms, and mobile-first responsive design built for ease of use.',
    tags: ['React', 'Vite', 'Responsive'],
    category: 'Web App',
    image: '/project-boman-twine.jpg',
    url: 'https://bomantwineventcenter.com/en/',
  },
  {
    id: 2,
    name: 'Green Realty',
    client: 'Real Estate Agency',
    description: 'A modern realtor platform with property listings, agent profiles, and lead capture forms designed to convert browsers into buyers.',
    tags: ['React', 'Vercel', 'SEO-Optimized'],
    category: 'E-Commerce',
    image: '/project-green-realty.jpg',
    url: 'https://realtor-green.vercel.app/',
  },
];

export default function PortfolioGrid() {
  return (
    <section id="work" className="portfolio-section" aria-labelledby="portfolio-heading">
      <div className="portfolio-header">
        <span className="step-badge step-badge-info badge-flat reveal">Selected Work</span>
        <h2 id="portfolio-heading" className="reveal">Sites We Have Built</h2>
        <p className="reveal">Real client platforms engineered for performance, conversions, and long-term growth.</p>
      </div>

      <div className="portfolio-grid">
        {PROJECTS.map((project) => (
          <article key={project.id} className="portfolio-card reveal">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${project.name} in new tab`}
              className="portfolio-link"
            >
              <div className="portfolio-preview">
                <img
                  src={project.image}
                  alt={`${project.name} project preview`}
                  width="600"
                  height="450"
                  loading="lazy"
                  decoding="async"
                />
                <div className="portfolio-preview-overlay" aria-hidden="true" />
                <div className="portfolio-category">{project.category}</div>
                <div className="portfolio-arrow" aria-hidden="true">
                  <Icon name="arrowRight" size={20} />
                </div>
              </div>
              <h3 className="portfolio-title">{project.name}</h3>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
