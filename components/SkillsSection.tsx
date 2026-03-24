'use client';
import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    label: 'Languages',
    icon: '💻',
    color: '#6c63ff',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'SQL', level: 85 },
      { name: 'JavaScript', level: 72 },
      { name: 'C/C++', level: 70 },
    ],
  },
  {
    label: 'AI/ML & Data Science',
    icon: '🧠',
    color: '#ff6584',
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'Deep Learning', level: 88 },
      { name: 'NLP & LLMs', level: 85 },
      { name: 'Computer Vision', level: 82 },
      { name: 'Data Analysis', level: 90 },
    ],
  },
  {
    label: 'Tools & Infrastructure',
    icon: '🔧',
    color: '#43e97b',
    skills: [
      { name: 'AWS', level: 78 },
      { name: 'Docker', level: 75 },
      { name: 'Git', level: 88 },
      { name: 'CI/CD', level: 72 },
      { name: 'Azure ML Studio', level: 74 },
    ],
  },
  {
    label: 'Databases & BI',
    icon: '📊',
    color: '#ffd166',
    skills: [
      { name: 'PostgreSQL', level: 83 },
      { name: 'Power BI', level: 80 },
      { name: 'Big Data (Hadoop)', level: 68 },
    ],
  },
  {
    label: 'Specialized',
    icon: '🛰️',
    color: '#6cd3ff',
    skills: [
      { name: 'ETL Pipelines', level: 86 },
      { name: 'Remote Sensing', level: 78 },
      { name: 'FastAPI', level: 80 },
      { name: 'MEAN Stack', level: 68 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(level), delay);
      }
    }, { threshold: 0.5 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [level, delay]);

  return (
    <div ref={barRef} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-bold text-gray-700">{name}</span>
        <span className="text-xs font-black" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full skill-bar transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 8px ${color}50`,
          }} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
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

  // Tech stack logos as text badges  
  const techStack = [
    'Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
    'FastAPI', 'Docker', 'AWS', 'PostgreSQL', 'Power BI', 'Hadoop',
    'Git', 'Azure ML', 'LangChain', 'Ollama', 'YOLO', 'OpenCV',
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(108,99,255,0.03) 50%, transparent 100%)' }}>

      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(67,233,123,0.25) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <div className="section-badge">Skills</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-2">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat, ci) => (
            <div key={cat.label}
              className="glass rounded-3xl p-6 card-3d reveal"
              style={{ animationDelay: `${ci * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <h3 className="font-black text-gray-800 text-sm">{cat.label}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} color={cat.color} delay={ci * 100 + si * 80} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="glass rounded-3xl p-8 reveal">
          <h3 className="font-black text-gray-700 mb-6 text-center text-sm uppercase tracking-widest">Tech Stack</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <span key={tech} className="tech-tag text-sm px-4 py-2 card-3d cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
