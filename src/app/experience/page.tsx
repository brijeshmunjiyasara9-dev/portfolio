'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

const experiences = [
  {
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&auto=format',
    status: 'Current Role',
    name: 'BISAG-N (MeitY), Gandhinagar',
    role: 'Natural Disaster Prediction & Management',
    period: 'May 2025 – Apr 2026',
    delay: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80&auto=format',
    status: 'Past Role',
    name: 'WebRepp HK, Hong Kong',
    role: 'Healthcare Data Analyst',
    period: 'Mar 2025 – Jul 2025',
    delay: 'delay-1',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80&auto=format',
    status: 'Academic Role',
    name: 'Ahmedabad University',
    role: 'Teaching Assistant — Python Fundamentals',
    period: 'Ongoing',
    delay: 'delay-2',
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80&auto=format',
    status: 'Leadership',
    name: 'Team Leader',
    role: 'Cross-functional Project Lead',
    period: 'Jun 2023 – Jul 2023',
    delay: '',
  },
];

export default function ExperiencePage() {
  usePortfolioAnimations();

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
          <div key={exp.name} className={`place-card reveal-up ${exp.delay}`}>
            <div className="place-card-img">
              <img src={exp.image} alt={exp.name} />
            </div>
            <div className="place-card-status">{exp.status}</div>
            <div className="place-card-name">{exp.name}</div>
            <div className="place-card-location">
              {exp.role} &nbsp;·&nbsp; {exp.period}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Experience List */}
      <div className="updates-page-list">
        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Internship · Govt. of India</span>
            <span className="update-page-date">May 2025 – Apr 2026</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Natural Disaster Prediction & Management — BISAG-N (MeitY)</div>
            <p className="update-page-body">
              Working at Bhaskaracharya National Institute for Space Applications and
              Geo-Informatics (BISAG-N), a premier organisation under the Ministry of Electronics
              and IT, Government of India. Responsibilities include flood forecasting using
              satellite remote sensing data, building ETL pipelines for geospatial datasets, and
              developing a RAG-based conversational AI chatbot for disaster management queries.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">Analytics · Hong Kong</span>
            <span className="update-page-date">Mar 2025 – Jul 2025</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Healthcare Data Analyst — WebRepp HK</div>
            <p className="update-page-body">
              Developed end-to-end healthcare analytics solutions for a Hong Kong-based tech firm.
              Built interactive dashboards tracking healthcare KPIs, designed a pandemic
              preparedness scoring system, and implemented data pipelines for health trend
              analysis. Applied SQL, Python, and Power BI to deliver actionable insights for
              healthcare stakeholders.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Academic · Teaching</span>
            <span className="update-page-date">Ongoing</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Teaching Assistant — Python Fundamentals, Ahmedabad University</div>
            <p className="update-page-body">
              Supporting faculty in delivering Python programming fundamentals to undergraduate
              students. Conducting lab sessions, assisting with assignments, and mentoring
              students through foundational concepts in data structures, algorithms, and
              introductory data science with Python.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">Leadership</span>
            <span className="update-page-date">Jun 2023 – Jul 2023</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Team Leader</div>
            <p className="update-page-body">
              Led a cross-functional project team, coordinating technical deliverables, managing
              timelines, and ensuring collaborative output across disciplines. Developed skills in
              agile project management, stakeholder communication, and team motivation.
            </p>
          </div>
        </div>
      </div>

      <div
        className="places-disclaimer reveal-up"
        style={{ marginLeft: 'auto', maxWidth: '780px', padding: '3rem' }}
      >
        <p>
          Contact:{' '}
          <a
            href="mailto:brijesh.m@ahduni.edu.in"
            style={{ color: 'var(--accent)', fontStyle: 'normal' }}
          >
            brijesh.m@ahduni.edu.in
          </a>{' '}
          · +91 9879578052
        </p>
      </div>

      <Footer />
    </>
  );
}
