'use client';
import { useEffect, useRef } from 'react';
import { Award, BookOpen, FileText, Star } from 'lucide-react';

const certifications = [
  {
    title: 'AWS Academy Graduate',
    subtitle: 'Cloud Foundations',
    issuer: 'Amazon Web Services (AWS)',
    icon: '☁️',
    color: '#ff9900',
    badge: 'AWS',
  },
  {
    title: 'Python for Data Science',
    subtitle: 'NPTEL Certification',
    issuer: 'IIT Madras via NPTEL',
    icon: '🐍',
    color: '#306998',
    badge: 'NPTEL',
  },
];

const publications = [
  {
    title: 'Research Paper on Flood Prediction',
    journal: 'International Journal of Scientific Research in Science and Technology (IJSRST)',
    period: 'May 2025 – Sep 2025',
    icon: '🌊',
    color: '#6c63ff',
    description: 'Published research on flood prediction and management using ML/AI techniques for natural disaster early warning systems.',
  },
  {
    title: 'Research Paper on BERT',
    subtitle: 'Pre-training of Deep Bidirectional Transformers',
    period: 'Jul 2022 – Jan 2023',
    icon: '🤖',
    color: '#ff6584',
    description: 'Research study on BERT architecture and bidirectional transformer models for natural language understanding tasks.',
    note: 'Presented to faculty at university',
  },
];

export default function AchievementsSection() {
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
    <section id="achievements" ref={sectionRef} className="py-24 relative">
      <div className="absolute bottom-0 right-0 w-72 h-72 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <div className="section-badge">Achievements</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-2">
            Certifications &amp; <span className="gradient-text">Publications</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #ffd16620, #ff990020)' }}>
                <Award size={20} className="text-yellow-500" />
              </div>
              <h3 className="font-black text-xl text-gray-800">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <div key={i} className="glass rounded-2xl p-6 card-3d relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-full"
                    style={{ background: cert.color, transform: 'translate(25%, -25%)' }} />
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{cert.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-black text-gray-800">{cert.title}</h4>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: cert.color }}>{cert.subtitle}</p>
                          <p className="text-xs text-gray-500 mt-1">{cert.issuer}</p>
                        </div>
                        <span className="text-xs font-black px-2.5 py-1 rounded-full"
                          style={{ background: `${cert.color}20`, color: cert.color }}>
                          {cert.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">Verified Certification</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,101,132,0.1))' }}>
                <FileText size={20} className="text-purple-500" />
              </div>
              <h3 className="font-black text-xl text-gray-800">Research Publications</h3>
            </div>

            <div className="space-y-4">
              {publications.map((pub, i) => (
                <div key={i} className="glass rounded-2xl p-6 card-3d relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                    style={{ background: pub.color }} />
                  <div className="pl-3">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">{pub.icon}</div>
                      <div>
                        <h4 className="font-black text-gray-800 text-sm leading-snug">{pub.title}</h4>
                        {pub.subtitle && (
                          <p className="text-xs text-gray-500 mt-0.5 italic">{pub.subtitle}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{pub.description}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      {pub.journal && (
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                          📰 {pub.journal.split('(')[0].trim()}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-medium">{pub.period}</span>
                      {pub.note && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ {pub.note}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 glass rounded-3xl p-8 reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '📄', num: '2', label: 'Research Papers', color: '#6c63ff' },
              { icon: '🏆', num: '2', label: 'Certifications', color: '#ffd166' },
              { icon: '💼', num: '3', label: 'Professional Roles', color: '#ff6584' },
              { icon: '🚀', num: '6+', label: 'Projects Built', color: '#43e97b' },
            ].map(({ icon, num, label, color }) => (
              <div key={label}>
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-3xl font-black mb-1" style={{ color }}>{num}</div>
                <div className="text-xs font-semibold text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
