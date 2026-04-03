'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  tag: string;
  date_issued: string;
  credential_url: string;
  description: string;
  image: string;
}

export default function CertificationsPage() {
  usePortfolioAnimations();
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    fetch('/api/portfolio/certifications', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setCerts(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      <div className="grain-overlay"></div>
      <Nav />

      <section className="page-hero">
        <div className="page-hero-label reveal-up">Certifications · Achievements · Research</div>
        <h1 className="page-hero-title reveal-up">
          Certified &amp;<br />Recognised<br />Excellence.
        </h1>
        <p className="page-hero-body reveal-up">
          A record of professional certifications, industry recognitions, and academic achievements
          built through continuous learning and hands-on expertise.
        </p>
      </section>

      <div className="principle-block reveal-up">
        <div className="principle-label">Credentials</div>
        <p className="principle-text">
          Each certification reflects a commitment to mastery — from cloud infrastructure and
          data science to published research in peer-reviewed international journals.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="cert-grid">
        {certs.map((cert, idx) => (
          <div key={cert.id} className="cert-card reveal-fade">
            {cert.image && (
              <div className="cert-card-img">
                <img src={cert.image} alt={cert.title} />
              </div>
            )}
            <div className="cert-card-body">
              <div className="cert-card-tags">
                <span className="cert-tag">{cert.tag}</span>
                <span className="cert-date">{cert.date_issued}</span>
              </div>
              <div className="cert-card-title">{cert.title}</div>
              <div className="cert-card-issuer">{cert.issuer}</div>
              {cert.description && (
                <p className="cert-card-desc">{cert.description}</p>
              )}
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-credential-link"
                >
                  View Credential <span className="arrow">/</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed List */}
      <div className="updates-page-list">
        {certs.map((cert) => (
          <div key={cert.id} className="update-page-item reveal-up">
            <div className="update-page-left">
              <span className="update-page-tag">{cert.tag}</span>
              <span className="update-page-date">{cert.date_issued}</span>
            </div>
            <div className="update-page-right">
              <div className="update-page-title">{cert.title} — {cert.issuer}</div>
              {cert.description && <p className="update-page-body">{cert.description}</p>}
              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent)', fontSize: '0.8rem', borderBottom: '1px solid var(--accent-dim)', marginTop: '0.5rem', display: 'inline-block' }}
                >
                  View Credential ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
