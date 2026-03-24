'use client';
import { useEffect, useRef } from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Healthcare Data Analyst',
    company: 'WebRepp HK',
    location: 'Hong Kong (Remote)',
    period: 'Mar 2025 – Jul 2025',
    type: 'Full Time',
    color: '#E84530',
    icon: '🏥',
    highlights: [
      'Scraped 135+ healthcare KPIs from 180+ countries for comprehensive analysis',
      'Built robust ETL pipelines using Python and SQL for data processing',
      'Developed pandemic preparedness scoring models for global health insights',
      'Provided actionable business insights from large-scale healthcare datasets',
    ],
    tags: ['Python', 'SQL', 'ETL', 'Power BI', 'Healthcare Analytics'],
  },
  {
    title: 'Natural Disaster Prediction & Management Intern',
    company: 'BISAG-N (MeitY)',
    location: 'Gandhinagar, India',
    period: 'May 2025 – Apr 2026',
    type: 'Internship',
    color: '#ff8c42',
    icon: '🛰️',
    highlights: [
      'Built flood forecasting systems using geospatial data and ML models',
      'Engineered automated geospatial data pipelines for real-time processing',
      'Implemented RAG chatbots using Ollama LLM for disaster information retrieval',
      'Deployed production APIs with FastAPI and Jenkins CI/CD pipelines',
    ],
    tags: ['Flood Forecasting', 'FastAPI', 'RAG', 'Ollama', 'Jenkins', 'CI/CD', 'GIS'],
  },
  {
    title: 'Teaching Assistant',
    company: 'Ahmedabad University',
    location: 'Ahmedabad, India',
    period: '2024 – Present',
    type: 'Academic Role',
    color: '#E84530',
    icon: '👨‍🏫',
    highlights: [
      'Assisted in teaching Python fundamentals to undergraduate students',
      'Conducted lab sessions and helped students with programming assignments',
      'Mentored students in data science concepts and practical applications',
    ],
    tags: ['Python', 'Teaching', 'Data Science', 'Mentoring'],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-28 relative">
      <div className="section-divider" />

      <div
        className="absolute top-20 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle at right, rgba(232,69,48,0.05) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20 reveal">
          <div className="section-badge">Experience</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
            Work <span className="gradient-text">History</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-7 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'var(--border)' }}
          />

          <div className="space-y-7">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative flex gap-7 reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {/* Timeline node */}
                <div
                  className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-xl items-center justify-center text-xl z-10"
                  style={{
                    background: 'var(--surface)',
                    border: `1px solid ${exp.color}40`,
                    boxShadow: `0 0 20px ${exp.color}15`,
                  }}
                >
                  {exp.icon}
                </div>

                {/* Card */}
                <div className="flex-1 card p-7 relative overflow-hidden glow-border">
                  {/* Top gradient bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 animated-gradient rounded-t-2xl"
                  />
                  {/* Left accent */}
                  <div
                    className="absolute left-0 top-5 bottom-5 w-0.5 rounded-full"
                    style={{ background: exp.color }}
                  />

                  <div className="pl-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div>
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-2"
                          style={{ background: `${exp.color}18`, color: exp.color }}
                        >
                          {exp.type}
                        </span>
                        <h3 className="font-black text-xl text-white">{exp.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="font-bold text-sm" style={{ color: exp.color }}>
                            {exp.company}
                          </span>
                          <span
                            className="text-sm flex items-center gap-1"
                            style={{ color: 'var(--gray3)' }}
                          >
                            <MapPin size={11} /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          background: 'var(--surface2)',
                          border: '1px solid var(--border)',
                          color: 'var(--gray2)',
                        }}
                      >
                        <Calendar size={11} /> {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5">
                      {exp.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--gray2)' }}
                        >
                          <ChevronRight
                            size={13}
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: exp.color }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div
                      className="flex flex-wrap gap-2 pt-4"
                      style={{ borderTop: '1px solid var(--border)' }}
                    >
                      {exp.tags.map(tag => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
