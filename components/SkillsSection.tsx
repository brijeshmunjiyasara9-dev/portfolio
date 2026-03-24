'use client';
import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    label: 'Languages',
    icon: '💻',
    color: '#E84530',
    skills: [
      { name: 'Python',     level: 92 },
      { name: 'SQL',        level: 85 },
      { name: 'JavaScript', level: 72 },
      { name: 'C/C++',      level: 70 },
    ],
  },
  {
    label: 'AI/ML & Data Science',
    icon: '🧠',
    color: '#ff8c42',
    skills: [
      { name: 'Machine Learning',  level: 90 },
      { name: 'Deep Learning',     level: 88 },
      { name: 'NLP & LLMs',        level: 85 },
      { name: 'Computer Vision',   level: 82 },
      { name: 'Data Analysis',     level: 90 },
    ],
  },
  {
    label: 'Tools & Infrastructure',
    icon: '🔧',
    color: '#E84530',
    skills: [
      { name: 'AWS',           level: 78 },
      { name: 'Docker',        level: 75 },
      { name: 'Git',           level: 88 },
      { name: 'CI/CD',         level: 72 },
      { name: 'Azure ML',      level: 74 },
    ],
  },
  {
    label: 'Databases & BI',
    icon: '📊',
    color: '#ff8c42',
    skills: [
      { name: 'PostgreSQL',       level: 83 },
      { name: 'Power BI',         level: 80 },
      { name: 'Hadoop',           level: 68 },
    ],
  },
  {
    label: 'Specialized',
    icon: '🛰️',
    color: '#E84530',
    skills: [
      { name: 'ETL Pipelines',  level: 86 },
      { name: 'Remote Sensing', level: 78 },
      { name: 'FastAPI',        level: 80 },
      { name: 'MEAN Stack',     level: 68 },
    ],
  },
];

const techStack = [
  'Python','TensorFlow','PyTorch','scikit-learn','Pandas','NumPy',
  'FastAPI','Docker','AWS','PostgreSQL','Power BI','Hadoop',
  'Git','Azure ML','LangChain','Ollama','YOLO','OpenCV',
];

function SkillBar({ name, level, color, delay }: {
  name: string; level: number; color: string; delay: number;
}) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setWidth(level), delay);
    }, { threshold: 0.5 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-white">{name}</span>
        <span className="text-xs font-black" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
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
    <section id="skills" ref={sectionRef} className="py-28 relative">
      <div className="section-divider mb-0" />

      {/* Ambient */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(232,69,48,0.05) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-20 reveal">
          <div className="section-badge">Skills</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {skillCategories.map((cat, ci) => (
            <div key={cat.label} className="card p-6 reveal glow-border" style={{ transitionDelay: `${ci * 0.08}s` }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${cat.color}18` }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-black text-white text-sm">{cat.label}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} color={cat.color} delay={ci * 80 + si * 60} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech Stack badges */}
        <div className="card-flat p-8 reveal">
          <h3
            className="font-black text-center text-xs uppercase tracking-widest mb-7"
            style={{ color: 'var(--gray3)' }}
          >
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techStack.map(tech => (
              <span key={tech} className="tech-tag text-sm px-4 py-2">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
