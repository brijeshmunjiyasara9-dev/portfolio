// Server Component — data is fetched at request time on the server.
// No client-side fetch, no cold-start waterfall, no blank screen while loading.
import { getDb } from '@/lib/db';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnimationsClient from '@/components/AnimationsClient';

export const dynamic = 'force-dynamic'; // always SSR, never statically cached

interface Project {
  id: number;
  num: string;
  name: string;
  tech: string;
  detail: string;
  image: string;
  description: string;
  github_url: string;
  website_url: string;
}

export default async function ProjectsPage() {
  const db = await getDb();
  const projects = (await db.all(
    'SELECT * FROM projects WHERE visible = 1 ORDER BY sort_order ASC'
  )) as unknown as Project[];

  return (
    <>
      <AnimationsClient />
      <div className="grain-overlay"></div>
      <Nav />

      <section className="page-hero">
        <div className="page-hero-label reveal-up">AI/ML · Data Science · Computer Vision</div>
        <h1 className="page-hero-title reveal-up">
          Projects built<br />from real-world<br />challenges.
        </h1>
        <p className="page-hero-body reveal-up">
          Each project addresses a genuine problem — from flood forecasting and healthcare KPI
          analysis to brain network modelling and UAV tracking algorithms.
        </p>
      </section>

      <div className="principle-block reveal-up">
        <div className="principle-label">Approach</div>
        <p className="principle-text">
          Every solution begins with understanding the data. Rigorous preprocessing, thoughtful
          model selection, and careful deployment — research and production, unified.
        </p>
      </div>

      <div className="objects-grid">
        {projects.map((project) => (
          <div key={project.id} className="object-item reveal-fade">
            <div className="object-item-img">
              <img src={project.image} alt={project.name} />
            </div>
            <div className="object-item-meta">
              <span className="object-item-num">{project.num}</span>
              <span className="object-item-name">{project.name}</span>
            </div>
            <div className="object-item-origin">{project.tech}</div>
            {project.description && (
              <p className="object-item-desc">{project.description}</p>
            )}
            {(project.github_url || project.website_url) && (
              <div className="object-item-links">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--github"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.website_url && (
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link project-link--website"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="objects-note reveal-up">
        <p>
          GitHub:{' '}
          <a href="https://github.com/brijesh279" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent-dim)' }}>
            github.com/brijesh279
          </a>
          {' '}·{' '}
          <a href="https://github.com/Brijesh439" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent-dim)' }}>
            github.com/Brijesh439
          </a>
        </p>
      </div>

      <Footer />
    </>
  );
}
