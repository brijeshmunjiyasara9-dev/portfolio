'use client';
import { useEffect, useRef } from 'react';
import { Award, FileText, Star } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Academy Graduate',
    subtitle: 'Cloud Foundations',
    issuer: 'Amazon Web Services (AWS)',
    icon: '☁️',
    color: '#E84530',
    badge: 'AWS',
  },
  {
    title: 'Python for Data Science',
    subtitle: 'NPTEL Certification',
    issuer: 'IIT Madras via NPTEL',
    icon: '🐍',
    color: '#ff8c42',
    badge: 'NPTEL',
  },
];

const publications = [
  {
    title: 'Research Paper on Flood Prediction',
    journal: 'International Journal of Scientific Research in Science and Technology (IJSRST)',
    period: 'May 2025 – Sep 2025',
    icon: '🌊',
    color: '#E84530',
    description: 'Published research on flood prediction and management using ML/AI techniques for natural disaster early warning systems.',
  },
  {
    title: 'Research Paper on BERT',
    subtitle: 'Pre-training of Deep Bidirectional Transformers',
    period: 'Jul 2022 – Jan 2023',
    icon: '🤖',
    color: '#ff8c42',
    description: 'Research study on BERT architecture and bidirectional transformer models for natural language understanding tasks.',
    note: 'Presented to faculty at university',
  },
];

const bottomStats = [
  { icon: '📄', num: '2',  label: 'Research Papers',    color: '#E84530' },
  { icon: '🏆', num: '2',  label: 'Certifications',     color: '#ff8c42' },
  { icon: '💼', num: '3',  label: 'Professional Roles', color: '#E84530' },
  { icon: '🚀', num: '6+', label: 'Projects Built',     color: '#ff8c42' },
];

export default function AchievementsSection() {
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
    <section id="achievements" ref={sectionRef} className="py-28 relative">
      <div className="section-divider" />

      <div
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(232,69,48,0.05) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-20 reveal">
          <div className="section-badge">Achievements</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
            Certs &amp; <span className="gradient-text">Publications</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── Certifications ── */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(232,69,48,0.12)', border: '1px solid rgba(232,69,48,0.2)' }}
              >
                <Award size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-black text-xl text-white">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div key={i} className="card p-6 relative overflow-hidden glow-border">
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                    style={{ background: cert.color, transform: 'translate(25%,-25%)' }}
                  />
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{cert.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-black text-white">{cert.title}</h4>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: cert.color }}>
                            {cert.subtitle}
                          </p>
                          <p className="text-xs mt-1" style={{ color: 'var(--gray3)' }}>
                            {cert.issuer}
                          </p>
                        </div>
                        <span
                          className="text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{ background: `${cert.color}18`, color: cert.color }}
                        >
                          {cert.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={11} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs ml-1.5" style={{ color: 'var(--gray3)' }}>Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Publications ── */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(232,69,48,0.12)', border: '1px solid rgba(232,69,48,0.2)' }}
              >
                <FileText size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="font-black text-xl text-white">Research Publications</h3>
            </div>

            <div className="space-y-4">
              {publications.map((pub, i) => (
                <div key={i} className="card p-6 relative overflow-hidden glow-border">
                  <div
                    className="absolute top-0 left-0 bottom-0 w-0.5 rounded-l-2xl"
                    style={{ background: pub.color }}
                  />
                  <div className="pl-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">{pub.icon}</div>
                      <div>
                        <h4 className="font-black text-white text-sm leading-snug">{pub.title}</h4>
                        {pub.subtitle && (
                          <p className="text-xs mt-0.5 italic" style={{ color: 'var(--gray3)' }}>
                            {pub.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--gray2)' }}>
                      {pub.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      {pub.journal && (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(232,69,48,0.1)', color: 'var(--accent)' }}
                        >
                          📰 {pub.journal.split('(')[0].trim()}
                        </span>
                      )}
                      <span className="text-xs font-medium" style={{ color: 'var(--gray3)' }}>
                        {pub.period}
                      </span>
                      {pub.note && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}
                        >
                          ✓ {pub.note}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-14 card-flat p-8 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {bottomStats.map(({ icon, num, label, color }) => (
              <div key={label}>
                <div className="text-3xl mb-3">{icon}</div>
                <div className="text-3xl font-black mb-1.5 text-white">{num}</div>
                <div className="text-xs font-semibold" style={{ color: 'var(--gray3)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
