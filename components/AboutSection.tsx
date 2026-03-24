'use client';
import { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const education = [
  {
    degree: 'MTech in Computer Science and Engineering',
    institution: 'Ahmedabad University',
    school: 'School of Engineering and Applied Science',
    cgpa: '3.03 / 4.00',
    status: 'Pursuing',
    color: '#6c63ff',
    icon: '🎓',
  },
  {
    degree: 'Bachelor of Engineering (Computer Engineering)',
    institution: 'Kadi Sarva Vidhyalay University',
    school: 'LDRP Institute of Technology and Research',
    cgpa: '6.64 CGPA',
    year: '2024',
    color: '#ff6584',
    icon: '🏛️',
  },
];

export default function AboutSection() {
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

  const interests = [
    'Machine Learning', 'Deep Learning', 'Computer Vision',
    'NLP & LLMs', 'Predictive Analytics', 'ETL Pipelines',
    'Remote Sensing', 'Healthcare Data', 'Disaster Management',
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <div className="section-badge">About Me</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-2">
            Who <span className="gradient-text">I Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <div className="reveal">
            <div className="glass rounded-3xl p-8 card-3d relative overflow-hidden">
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, #6c63ff, transparent)' }} />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, #f0eeff, #ffe8ef)' }}>
                  👨‍💻
                </div>
                <div>
                  <h3 className="font-black text-xl text-gray-800">Brijesh Munjiyasara</h3>
                  <p className="text-sm text-purple-500 font-semibold">AI/ML Engineer & Data Scientist</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                As an <span className="font-semibold text-purple-600">MTech student</span> at Ahmedabad University,
                I&apos;m deeply passionate about transforming complex data into impactful AI/ML solutions.
                I bridge the gap between cutting-edge research and real-world deployment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                I have extensive experience in <span className="font-semibold text-pink-500">healthcare data analysis</span>,
                <span className="font-semibold text-green-500"> natural disaster prediction</span>, and
                building intelligent systems using machine learning, deep learning, and NLP techniques.
              </p>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                My work spans from building ETL pipelines and pandemic preparedness scoring models
                to developing GNN-based brain network analysis and RAG-powered chatbots.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</div>
                  <div className="flex items-center gap-1 text-gray-700 font-semibold text-sm">
                    <MapPin size={13} className="text-purple-500" /> Ahmedabad, India
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-gray-700 font-semibold text-sm">Open to Opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="mt-6 glass rounded-3xl p-6 reveal">
              <h4 className="font-black text-gray-700 mb-4 text-sm uppercase tracking-wider">Areas of Interest</h4>
              <div className="flex flex-wrap gap-2">
                {interests.map(i => (
                  <span key={i} className="tech-tag">{i}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Education */}
          <div className="reveal">
            <div className="section-badge mb-4">Education</div>
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="glass rounded-3xl p-6 card-3d relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl"
                    style={{ background: edu.color }} />
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{edu.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {edu.status && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${edu.color}20`, color: edu.color }}>
                            {edu.status}
                          </span>
                        )}
                        {edu.year && (
                          <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                            <Calendar size={11} /> {edu.year}
                          </span>
                        )}
                      </div>
                      <h3 className="font-black text-gray-800 text-[15px] leading-snug mb-1">{edu.degree}</h3>
                      <p className="text-sm font-bold mb-0.5" style={{ color: edu.color }}>{edu.institution}</p>
                      <p className="text-xs text-gray-500 mb-3">{edu.school}</p>
                      <div className="flex items-center gap-2">
                        <Award size={13} style={{ color: edu.color }} />
                        <span className="text-sm font-bold text-gray-700">{edu.cgpa}</span>
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
