'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

export default function HomePage() {
  usePortfolioAnimations();

  const [about, setAbout] = useState({
    headline: 'Passionate\nAbout Real-World\nAI Impact',
    paragraph1: 'As an MTech student in Computer Science at Ahmedabad University, I specialise in machine learning, deep learning, and computer vision — turning complex datasets into actionable insights.',
    paragraph2: 'From flood-prediction models at BISAG-N (MeitY) to healthcare analytics at WebRepp HK, I bridge the gap between cutting-edge research and real deployable solutions.',
  });
  const [profileInfo, setProfileInfo] = useState({
    profile_image: '',
    has_resume: false,
    resume_original_name: '',
  });

  useEffect(() => {
    fetch('/api/portfolio/about').then(r => r.json()).then(data => {
      if (data && data.headline) setAbout(data);
    });
    fetch('/api/portfolio/profile').then(r => r.json()).then(data => {
      if (data) setProfileInfo(data);
    });
  }, []);

  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-label reveal-up">Ahmedabad, India&nbsp;&nbsp;·&nbsp;&nbsp;AI/ML Engineer</div>
          <h1 className="hero-title">
            <span className="reveal-line">Brijesh</span>
            <span className="reveal-line">Munjiyasara</span>
          </h1>
          <div className="hero-cta reveal-up">
            <Link href="/projects" className="cta-link">
              View Projects<span className="cta-sep">&nbsp;·&nbsp;</span>Explore Work{' '}
              <span className="cta-arrow">/</span>
            </Link>
          </div>
        </div>
        <div className="hero-image-grid">
          <div className="hero-img-wrap img-reveal">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format"
              alt="AI Technology"
              className="hero-img"
            />
          </div>
          <div className="hero-img-wrap img-reveal delay-1">
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format"
              alt="Machine Learning"
              className="hero-img"
            />
          </div>
          <div className="hero-img-wrap img-reveal delay-2">
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80&auto=format"
              alt="Data Science"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-section">
        <div className="marquee-track">
          <span>Transforming Data into Intelligence</span>
          <span className="marquee-dot">·</span>
          <span>Transforming Data into Intelligence</span>
          <span className="marquee-dot">·</span>
          <span>Transforming Data into Intelligence</span>
          <span className="marquee-dot">·</span>
          <span>Transforming Data into Intelligence</span>
          <span className="marquee-dot">·</span>
          <span>Transforming Data into Intelligence</span>
          <span className="marquee-dot">·</span>
          <span>Transforming Data into Intelligence</span>
          <span className="marquee-dot">·</span>
        </div>
      </div>

      {/* Full Bleed Section */}
      <section className="full-bleed-section">
        <div className="full-bleed-image parallax-img">
          <img
            src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80&auto=format"
            alt="Code and Data"
          />
          <div className="full-bleed-overlay"></div>
        </div>
        <div className="full-bleed-text reveal-up">
          <h2>Bridging Research<br />and Deployment</h2>
        </div>
      </section>

      {/* About / Focus Section */}
      <section className="places-section" id="about">
        <div className="places-inner">
          <div className="places-left">
            <div className="places-images">
              <div className="place-img-wrap reveal-up">
                <img
                  src={
                    profileInfo.profile_image
                      ? profileInfo.profile_image
                      : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80&auto=format'
                  }
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
          <div className="places-right">
            <h2 className="section-title reveal-up">
              {about.headline.split('\n').map((line, i) => (
                <span key={i}>{line}{i < about.headline.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="section-body reveal-up">{about.paragraph1}</p>
            <p className="section-body reveal-up">{about.paragraph2}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Link href="/projects" className="text-link reveal-up">
                See My Work <span className="arrow">/</span>
              </Link>
              {profileInfo.has_resume && (
                <a
                  href="/api/resume"
                  download
                  className="reveal-up"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.6rem 1.4rem',
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.35)',
                    borderRadius: '8px',
                    color: '#a5b4fc',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.22)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(99,102,241,0.6)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(99,102,241,0.12)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(99,102,241,0.35)';
                  }}
                >
                  ↓ Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Preview — Horizontal Scroll */}
      <section className="objects-preview-section">
        <div className="objects-preview-header">
          <div className="objects-header-left reveal-up">
            <p className="section-small-text">Each project originates from a real-world challenge.</p>
            <p className="section-small-text">Built with rigorous data pipelines and cutting-edge ML frameworks.</p>
            <p className="section-small-text">
              From RAG-powered document systems to satellite image processing — every solution is purposeful.
            </p>
            <Link href="/projects" className="btn-outline reveal-up">
              Explore Projects
            </Link>
          </div>
        </div>

        <div className="objects-hscroll-wrap">
          <div className="objects-hscroll" id="objScroll">
            <div className="obj-card reveal-fade">
              <div className="obj-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&q=80&auto=format"
                  alt="Document Management System"
                />
              </div>
              <div className="obj-meta">
                <span className="obj-num">(I)</span>
                <span className="obj-name">Document Management System</span>
              </div>
              <div className="obj-counter">RAG · NLP · MEAN Stack</div>
            </div>
            <div className="obj-card reveal-fade delay-1">
              <div className="obj-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80&auto=format"
                  alt="Human System Stress Observatory"
                />
              </div>
              <div className="obj-meta">
                <span className="obj-num">(II)</span>
                <span className="obj-name">Human Stress Observatory</span>
              </div>
              <div className="obj-counter">Bayesian · ELSI Index</div>
            </div>
            <div className="obj-card reveal-fade delay-2">
              <div className="obj-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=500&q=80&auto=format"
                  alt="Brain Network Analysis"
                />
              </div>
              <div className="obj-meta">
                <span className="obj-num">(III)</span>
                <span className="obj-name">Brain Network Analysis</span>
              </div>
              <div className="obj-counter">GNN · fMRI · Deep Learning</div>
            </div>
            <div className="obj-card reveal-fade delay-3">
              <div className="obj-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80&auto=format"
                  alt="UAV ReID Tracking"
                />
              </div>
              <div className="obj-meta">
                <span className="obj-num">(IV)</span>
                <span className="obj-name">UAV ReID Tracking</span>
              </div>
              <div className="obj-counter">YOLO · DeepSORT · CV</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work / Research Section */}
      <section className="connection-section">
        <div className="connection-inner">
          <div className="connection-image reveal-up">
            <img
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80&auto=format"
              alt="Satellite Remote Sensing"
            />
          </div>
          <div className="connection-text">
            <span className="section-label reveal-up">Research</span>
            <h2 className="section-title reveal-up">
              Published<br />Research on<br />Flood Prediction.
            </h2>
            <p className="section-body reveal-up">
              Research paper on flood prediction using ML published in the International Journal
              of Scientific Research in Science and Technology (IJSRST), May–Sep 2025.
            </p>
            <p className="section-body reveal-up">
              Also conducted a study on BERT architecture presented to faculty at Ahmedabad
              University — exploring transformer-based NLP at the frontier of AI research.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="updates-section" id="experience">
        <div className="updates-inner">
          <h2 className="section-title reveal-up">Experience<br />Highlights</h2>
          <div className="updates-list">
            <div className="update-item reveal-up">
              <div className="update-tag">Data Analytics · Hong Kong</div>
              <div className="update-title">Healthcare Data Analyst — WebRepp HK</div>
              <div className="update-body">
                Mar 2025 – Jul 2025. Developed healthcare KPI dashboards and built a pandemic
                preparedness scoring system for real-world health analytics.
              </div>
            </div>
            <div className="update-item reveal-up delay-1">
              <div className="update-tag">Research Internship · Gandhinagar</div>
              <div className="update-title">Natural Disaster Prediction — BISAG-N (MeitY)</div>
              <div className="update-body">
                May 2025 – Apr 2026. Flood forecasting using satellite data and RAG-based
                chatbot development for the Ministry of Electronics & IT, Government of India.
              </div>
            </div>
            <div className="update-item reveal-up delay-2">
              <div className="update-tag">Teaching · Ahmedabad University</div>
              <div className="update-title">Teaching Assistant — Python Fundamentals</div>
              <div className="update-body">
                Assisted faculty in delivering Python programming fundamentals, guiding students
                through core concepts in data structures and algorithmic thinking.
              </div>
            </div>
          </div>
          <div className="updates-numbers reveal-up">
            <span className="num active">1</span>
            <span className="num">2</span>
            <span className="num">3</span>
          </div>
        </div>
        <div className="updates-image reveal-fade">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format"
            alt="Work Experience"
          />
        </div>
      </section>

      {/* Skills Section */}
      <section className="people-section" id="skills">
        <div className="people-inner">
          <div className="people-images">
            <div className="person-img reveal-up">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80&auto=format"
                alt="Machine Learning"
              />
            </div>
            <div className="person-img reveal-up delay-1">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80&auto=format"
                alt="Cloud Computing"
              />
            </div>
            <div className="person-img reveal-up delay-2">
              <img
                src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&q=80&auto=format"
                alt="Programming"
              />
            </div>
            <div className="person-img reveal-up delay-3">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format"
                alt="Data Engineering"
              />
            </div>
          </div>
          <div className="people-text">
            <h2 className="section-title reveal-up">
              Built on<br />Deep Technical<br />Expertise
            </h2>
            <p className="section-body reveal-up">
              Proficient in Python, C/C++, SQL and JavaScript — with hands-on experience in
              TensorFlow, PyTorch, Scikit-learn, and the full ML/DL stack.
            </p>
            <p className="section-body reveal-up">
              Cloud-certified (AWS Academy), experienced with Docker, CI/CD, Azure ML Studio,
              Hadoop, Power BI, and PostgreSQL.
            </p>
            <Link href="/skills" className="text-link reveal-up">
              View All Skills <span className="arrow">/</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="apply-section" id="contact">
        <div className="apply-inner">
          <h2 className="section-title reveal-up">Get in<br />Touch</h2>
          <form
            className="apply-form"
            id="applyForm"
            onSubmit={(e) => {
              e.preventDefault();
              const btn = e.currentTarget.querySelector('.btn-submit') as HTMLButtonElement;
              if (btn) {
                btn.textContent = 'Sent!';
                btn.disabled = true;
                btn.style.opacity = '0.5';
              }
            }}
          >
            <div className="form-row reveal-up">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="Your Name" />
            </div>
            <div className="form-row reveal-up delay-1">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="your@email.com" />
            </div>
            <div className="form-row reveal-up delay-2">
              <label className="form-label">Organisation / University</label>
              <input type="text" className="form-input" placeholder="Company or University" />
            </div>
            <div className="form-row reveal-up delay-3">
              <label className="form-label">
                Message <span className="form-label-sub">/</span>
              </label>
              <textarea
                className="form-input form-textarea"
                placeholder="I'd love to collaborate on..."
              ></textarea>
            </div>
            <div className="form-footer reveal-up delay-4">
              <p className="form-note">
                Or reach me directly at{' '}
                <a href="mailto:brijesh.m@ahduni.edu.in" className="form-link">
                  brijesh.m@ahduni.edu.in
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/brijesh-munjiyasara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="form-link"
                >
                  LinkedIn Profile
                </a>
              </p>
              <button type="submit" className="btn-submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
