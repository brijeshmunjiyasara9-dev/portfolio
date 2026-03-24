'use client';
import { useEffect, useRef } from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';

const education = [
  {
    degree: 'MTech in Computer Science and Engineering',
    institution: 'Ahmedabad University',
    school: 'School of Engineering and Applied Science',
    cgpa: '3.03 / 4.00',
    status: 'Pursuing',
    color: '#E84530',
    icon: '🎓',
  },
  {
    degree: 'Bachelor of Engineering (Computer Engineering)',
    institution: 'Kadi Sarva Vidhyalay University',
    school: 'LDRP Institute of Technology and Research',
    cgpa: '6.64 CGPA',
    year: '2024',
    color: '#ff8c42',
    icon: '🏛️',
  },
];

const interests = [
  'Machine Learning', 'Deep Learning', 'Computer Vision',
  'NLP & LLMs', 'Predictive Analytics', 'ETL Pipelines',
  'Remote Sensing', 'Healthcare Data', 'Disaster Management',
];

export default function AboutSection() {
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
    <section id="about" ref={sectionRef} className="py-28 relative">
      {/* Top divider */}
      <div className="section-divider" />

      {/* Ambient */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(232,69,48,0.06) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-20 reveal">
          <div className="section-badge">About Me</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
            Who <span className="gradient-text">I Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── Left: Bio ── */}
          <div className="space-y-6">
            <div className="card p-8 reveal glow-border">
              <div className="flex items-center gap-4 mb-7">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}
                >
                  👨‍💻
                </div>
                <div>
                  <h3 className="font-black text-lg text-white">Brijesh Munjiyasara</h3>
                  <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                    AI/ML Engineer & Data Scientist
                  </p>
                </div>
              </div>

              <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray2)', fontSize: '15px' }}>
                As an{' '}
                <span className="font-semibold text-white">MTech student</span> at Ahmedabad University,
                I&apos;m deeply passionate about transforming complex data into impactful AI/ML solutions.
                I bridge the gap between cutting-edge research and real-world deployment.
              </p>
              <p className="mb-4 leading-relaxed" style={{ color: 'var(--gray2)', fontSize: '15px' }}>
                I have extensive experience in{' '}
                <span className="font-semibold" style={{ color: 'var(--accent)' }}>healthcare data analysis</span>,{' '}
                <span className="font-semibold text-orange-400">natural disaster prediction</span>, and
                building intelligent systems using machine learning, deep learning, and NLP techniques.
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--gray2)', fontSize: '15px' }}>
                My work spans ETL pipelines, pandemic preparedness scoring models, GNN-based brain network
                analysis, and RAG-powered chatbots.
              </p>

              <div
                className="mt-8 pt-6 grid grid-cols-2 gap-5"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--gray3)' }}>
                    Location
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <MapPin size={13} style={{ color: 'var(--accent)' }} /> Ahmedabad, India
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--gray3)' }}>
                    Status
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-white">Open to Roles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="card-flat p-6 reveal">
              <h4
                className="text-xs font-black uppercase tracking-widest mb-5"
                style={{ color: 'var(--gray3)' }}
              >
                Areas of Interest
              </h4>
              <div className="flex flex-wrap gap-2">
                {interests.map(i => (
                  <span key={i} className="tech-tag">{i}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Education ── */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="section-badge mb-6">Education</div>
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="card p-6 relative overflow-hidden glow-border"
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                    style={{ background: edu.color }}
                  />
                  <div className="flex items-start gap-4 pl-4">
                    <div className="text-3xl">{edu.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {edu.status && (
                          <span
                            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{ background: `${edu.color}18`, color: edu.color }}
                          >
                            {edu.status}
                          </span>
                        )}
                        {edu.year && (
                          <span
                            className="text-xs font-bold flex items-center gap-1"
                            style={{ color: 'var(--gray3)' }}
                          >
                            <Calendar size={11} /> {edu.year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-white text-sm leading-snug mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-bold mb-0.5" style={{ color: edu.color }}>
                        {edu.institution}
                      </p>
                      <p className="text-xs mb-3" style={{ color: 'var(--gray3)' }}>
                        {edu.school}
                      </p>
                      <div className="flex items-center gap-2">
                        <Award size={13} style={{ color: edu.color }} />
                        <span className="text-sm font-bold text-white">{edu.cgpa}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
