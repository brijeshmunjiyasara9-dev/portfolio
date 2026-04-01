'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

interface Experience {
  id: number; company: string; role: string; tag: string; period: string;
  description: string; image: string; status: string;
}

export default function ExperiencePage() {
  usePortfolioAnimations();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/portfolio/experience')
      .then(r => r.json())
      .then(data => setExperiences(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      <div className="grain-overlay"></div>
      <Nav />

      <section className="page-hero">
        <div className="page-hero-label reveal-up">Professional Experience</div>
        <h1 className="page-hero-title reveal-up">
          Work that bridges<br />research and<br />real impact.
        </h1>
        <p className="page-hero-body reveal-up">
          From government-level disaster management at BISAG-N (MeitY) to international
          healthcare analytics at WebRepp HK — each role shaped by purpose and technical depth.
        </p>
      </section>

      <div className="places-grid">
        {experiences.map((exp) => (
          <div key={exp.id} className="place-card reveal-up">
            <div className="place-card-img">
              <img src={exp.image} alt={exp.company} />
            </div>
            <div className="place-card-status">{exp.status}</div>
            <div className="place-card-name">{exp.company}</div>
            <div className="place-card-location">
              {exp.role} &nbsp;·&nbsp; {exp.period}
            </div>
          </div>
        ))}
      </div>

      <div className="updates-page-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="update-page-item reveal-up">
            <div className="update-page-left">
              <span className="update-page-tag">{exp.tag}</span>
              <span className="update-page-date">{exp.period}</span>
            </div>
            <div className="update-page-right">
              <div className="update-page-title">{exp.role} — {exp.company}</div>
              <p className="update-page-body">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="places-disclaimer reveal-up" style={{ marginLeft: 'auto', maxWidth: '780px', padding: '3rem' }}>
        <p>
          Contact:{' '}
          <a href="mailto:brijesh.m@ahduni.edu.in" style={{ color: 'var(--accent)', fontStyle: 'normal' }}>
            brijesh.m@ahduni.edu.in
          </a>{' '}
          · +91 9879578052
        </p>
      </div>

      <Footer />
    </>
  );
}
