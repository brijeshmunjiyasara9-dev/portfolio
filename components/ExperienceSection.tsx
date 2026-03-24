'use client';
import { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Healthcare Data Analyst',
    company: 'WebRepp HK',
    location: 'Hong Kong (Remote)',
    period: 'Mar 2025 – Jul 2025',
    type: 'Full Time',
    color: '#6c63ff',
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
    color: '#ff6584',
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
    color: '#43e97b',
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
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative">
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,101,132,0.2) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 reveal">
          <div className="section-badge">Experience</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-2">
            Work <span className="gradient-text">History</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 timeline-line hidden md:block rounded-full" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="relative flex gap-8 reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-2xl items-center justify-center text-2xl z-10 glass shadow-md"
                  style={{ boxShadow: `0 0 20px ${exp.color}30` }}>
                  {exp.icon}
                </div>

                {/* Card */}
                <div className="flex-1 glass rounded-3xl p-7 card-3d relative overflow-hidden">
                  {/* Color accent top */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl animated-gradient" />
                  
                  {/* Color left border */}
                  <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                    style={{ background: exp.color }} />

                  <div className="pl-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-3 py-1 rounded-full"
                            style={{ background: `${exp.color}18`, color: exp.color }}>
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="font-black text-xl text-gray-800">{exp.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="font-bold text-sm" style={{ color: exp.color }}>{exp.company}</span>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <MapPin size={12} /> {exp.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full font-semibold">
                        <Calendar size={12} />
                        {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-sm text-gray-600">
                          <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: exp.color }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
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
