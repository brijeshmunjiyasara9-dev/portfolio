'use client';
import { useEffect, useRef, useState } from 'react';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'Document Management System with NLP & LLM',
    emoji: '📄',
    description: 'A full-stack MEAN application integrated with a RAG-based chatbot for intelligent document interaction and retrieval.',
    highlights: ['MEAN Stack architecture', 'RAG-based chatbot', 'NLP-powered retrieval', 'Intelligent query handling'],
    tags: ['MEAN Stack', 'NLP', 'LLM', 'RAG', 'MongoDB', 'Angular'],
    accent: '#E84530',
  },
  {
    title: 'Human System Stress Observatory (HSSO)',
    emoji: '📊',
    description: 'An Economic-Labor Stress Index using PCA and Bayesian modeling to quantify and predict socioeconomic stress patterns.',
    highlights: ['PCA dimensionality reduction', 'Bayesian modeling', 'Economic stress quantification', 'Predictive analytics'],
    tags: ['Python', 'PCA', 'Bayesian', 'Data Analysis', 'ML'],
    accent: '#ff8c42',
  },
  {
    title: 'Personalised Brain Network Analysis',
    emoji: '🧠',
    description: 'A GNN-based model for analyzing fMRI brain images to identify personalized neural connectivity patterns.',
    highlights: ['GNN architecture', 'fMRI processing', 'Neural connectivity mapping', 'Brain profiling'],
    tags: ['GNN', 'Deep Learning', 'fMRI', 'PyTorch', 'Medical Imaging'],
    accent: '#E84530',
  },
  {
    title: 'ReID-Based Tracking for UAV Videos',
    emoji: '🚁',
    description: 'Multi-object tracking framework for UAV videos using YOLO for detection and DeepSORT for ReID-based persistent tracking.',
    highlights: ['YOLO detection', 'DeepSORT tracking', 'UAV video analysis', 'Multi-object ReID'],
    tags: ['YOLO', 'DeepSORT', 'Computer Vision', 'UAV', 'OpenCV'],
    accent: '#ff8c42',
  },
  {
    title: 'Satellite Image Atmospheric Correction',
    emoji: '🛰️',
    description: 'Deep learning model (R2U-Net) for atmospheric correction of Sentinel-2 satellite images, converting L1C to L2A with RMSE 3.37.',
    highlights: ['R2U-Net architecture', 'Sentinel-2 processing', 'Outperformed U-Net', 'RMSE: 3.37, SSIM: 0.8905'],
    tags: ['U-Net', 'R2U-Net', 'Remote Sensing', 'Deep Learning'],
    accent: '#E84530',
  },
  {
    title: 'Flood Forecasting System at BISAG-N',
    emoji: '🌊',
    description: 'Geospatial ML-powered flood forecasting with automated data pipelines, RAG chatbot, and FastAPI backend at BISAG-N (MeitY).',
    highlights: ['Flood ML prediction', 'Geospatial pipelines', 'RAG chatbot (Ollama)', 'FastAPI + Jenkins CI/CD'],
    tags: ['FastAPI', 'ML', 'GIS', 'Ollama', 'Jenkins', 'CI/CD'],
    accent: '#ff8c42',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    }
  };
  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="card reveal overflow-hidden"
      style={{
        transitionDelay: `${index * 0.08}s`,
        transformStyle: 'preserve-3d',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: project.accent }} />

      {/* Header */}
      <div
        className="p-6"
        style={{ background: `${project.accent}08` }}
      >
        <div className="text-4xl mb-4">{project.emoji}</div>
        <h3 className="font-black text-white text-base leading-tight">{project.title}</h3>
      </div>

      {/* Body */}
      <div className="px-6 pb-6">
        <p
          className="text-sm leading-relaxed mb-4 mt-4"
          style={{ color: 'var(--gray2)' }}
        >
          {project.description}
        </p>

        <div className="space-y-1.5 mb-5">
          {project.highlights.map(h => (
            <div
              key={h}
              className="flex items-center gap-2 text-xs"
              style={{ color: 'var(--gray2)' }}
            >
              <div
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: project.accent }}
              />
              {h}
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap gap-1.5 pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{
                background: `${project.accent}12`,
                color: project.accent,
                border: `1px solid ${project.accent}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
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
    <section id="projects" ref={sectionRef} className="py-28 relative">
      <div className="section-divider" />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-60 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,69,48,0.06) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-6 reveal">
          <div className="section-badge">Projects</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 max-w-xl text-base" style={{ color: 'var(--gray2)' }}>
            Real-world applications spanning healthcare, disaster management, neuroscience, and space technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <a
            href="https://github.com/brijesh279"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <Github size={17} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
