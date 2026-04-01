'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

interface Project {
  id: number; num: string; name: string; tech: string; detail: string; image: string;
}

export default function ProjectsPage() {
  usePortfolioAnimations();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then(r => r.json())
      .then(data => setProjects(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
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
