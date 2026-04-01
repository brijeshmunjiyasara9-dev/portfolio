'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

const projects = [
  {
    num: '(I)',
    name: 'Document Management System',
    tech: 'MEAN Stack · RAG · NLP',
    detail: 'NLP & LLM Integration',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80&auto=format',
    delay: '',
  },
  {
    num: '(II)',
    name: 'Human Stress Observatory',
    tech: 'Bayesian Modeling · ELSI Index',
    detail: 'Human System Stress Observatory (HSSO)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format',
    delay: 'delay-1',
  },
  {
    num: '(III)',
    name: 'Personalised Brain Network Analysis',
    tech: 'GNN · fMRI · Deep Learning',
    detail: 'Neuroscience · Graph Neural Networks',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80&auto=format',
    delay: 'delay-2',
  },
  {
    num: '(IV)',
    name: 'UAV ReID-Based Tracking',
    tech: 'YOLO · DeepSORT · Computer Vision',
    detail: 'Evaluating ReID Algorithms for UAV Videos',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80&auto=format',
    delay: '',
  },
  {
    num: '(V)',
    name: 'Satellite Image Processing',
    tech: 'Remote Sensing · Atmospheric Correction',
    detail: 'BISAG-N · MeitY · Gandhinagar',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&q=80&auto=format',
    delay: 'delay-1',
  },
  {
    num: '(VI)',
    name: 'Flood Prediction Model',
    tech: 'Machine Learning · IJSRST Published',
    detail: 'Natural Disaster Prediction',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80&auto=format',
    delay: 'delay-2',
  },
  {
    num: '(VII)',
    name: 'RAG-Based Disaster Chatbot',
    tech: 'RAG · LLM · NLP Pipeline',
    detail: 'Conversational AI · BISAG-N',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format',
    delay: '',
  },
  {
    num: '(VIII)',
    name: 'Healthcare Analytics Dashboard',
    tech: 'ETL · Power BI · PostgreSQL',
    detail: 'WebRepp HK · Pandemic Preparedness',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&auto=format',
    delay: 'delay-1',
  },
];

export default function ProjectsPage() {
  usePortfolioAnimations();

  return (
    <>
      <div className="grain-overlay"></div>
      <Nav />

      {/* Page Hero */}
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

      {/* Principle Block */}
      <div className="principle-block reveal-up">
        <div className="principle-label">Approach</div>
        <p className="principle-text">
          Every solution begins with understanding the data. Rigorous preprocessing, thoughtful
          model selection, and careful deployment — research and production, unified.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="objects-grid">
        {projects.map((project) => (
          <div key={project.num} className={`object-item reveal-fade ${project.delay}`}>
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
          <a
            href="https://github.com/brijesh279"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent-dim)' }}
          >
            github.com/brijesh279
          </a>
          {' '}·{' '}
          <a
            href="https://github.com/Brijesh439"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent-dim)' }}
          >
            github.com/Brijesh439
          </a>
        </p>
      </div>

      <Footer />
    </>
  );
}
