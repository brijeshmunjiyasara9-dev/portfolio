'use client';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

const projects = [
  {
    title: 'Document Management System with NLP & LLM',
    emoji: '📄',
    description: 'A full-stack MEAN (MongoDB, Express, Angular, Node.js) application integrated with a RAG-based chatbot for intelligent document interaction and retrieval.',
    highlights: ['MEAN Stack architecture', 'RAG-based chatbot integration', 'NLP-powered document retrieval', 'Intelligent query handling'],
    tags: ['MEAN Stack', 'NLP', 'LLM', 'RAG', 'MongoDB', 'Angular'],
    color: '#6c63ff',
    gradient: 'linear-gradient(135deg, #6c63ff20, #9c8cff10)',
  },
  {
    title: 'Human System Stress Observatory (HSSO)',
    emoji: '📊',
    description: 'An advanced Economic-Labor Stress Index system using Principal Component Analysis (PCA) and Bayesian modeling to quantify and predict socioeconomic stress patterns.',
    highlights: ['PCA dimensionality reduction', 'Bayesian modeling approach', 'Economic stress quantification', 'Predictive analytics pipeline'],
    tags: ['Python', 'PCA', 'Bayesian Modeling', 'Data Analysis', 'ML'],
    color: '#ff6584',
    gradient: 'linear-gradient(135deg, #ff658420, #ff909010)',
  },
  {
    title: 'Personalised Brain Network Analysis',
    emoji: '🧠',
    description: 'A Graph Neural Network (GNN) based model for analyzing fMRI brain images to identify personalized neural connectivity patterns and brain network structures.',
    highlights: ['GNN-based architecture', 'fMRI image processing', 'Neural connectivity mapping', 'Personalized brain profiling'],
    tags: ['GNN', 'Deep Learning', 'fMRI', 'PyTorch', 'Medical Imaging'],
    color: '#43e97b',
    gradient: 'linear-gradient(135deg, #43e97b20, #38f9d710)',
  },
  {
    title: 'ReID-Based Tracking for UAV Videos',
    emoji: '🚁',
    description: 'A comprehensive multi-object tracking framework for UAV (drone) videos using YOLO for detection and DeepSORT for Re-Identification-based persistent tracking.',
    highlights: ['YOLO object detection', 'DeepSORT tracking algorithm', 'UAV video analysis', 'Multi-object ReID'],
    tags: ['YOLO', 'DeepSORT', 'Computer Vision', 'UAV', 'OpenCV', 'Python'],
    color: '#ffd166',
    gradient: 'linear-gradient(135deg, #ffd16620, #ffb84010)',
  },
  {
    title: 'Satellite Image Atmospheric Correction',
    emoji: '🛰️',
    description: 'A deep learning model (R2U-Net outperforming U-Net) for atmospheric correction of Sentinel-2 satellite images, converting L1C to L2A with RMSE of 3.37.',
    highlights: ['R2U-Net architecture', 'Sentinel-2 dataset processing', 'Outperformed traditional models', 'RMSE: 3.37, SSIM: 0.8905'],
    tags: ['U-Net', 'R2U-Net', 'Remote Sensing', 'Deep Learning', 'Sentinel-2'],
    color: '#6cd3ff',
    gradient: 'linear-gradient(135deg, #6cd3ff20, #4facfe10)',
  },
  {
    title: 'Flood Forecasting System at BISAG-N',
    emoji: '🌊',
    description: 'A geospatial ML-powered flood forecasting system with automated data pipelines, RAG chatbot for disaster info, and FastAPI backend with CI/CD deployment at BISAG-N (MeitY).',
    highlights: ['Flood ML prediction models', 'Geospatial data pipelines', 'RAG chatbot (Ollama)', 'FastAPI + Jenkins CI/CD'],
    tags: ['FastAPI', 'ML', 'GIS', 'Ollama', 'Jenkins', 'CI/CD', 'Python'],
    color: '#ef476f',
    gradient: 'linear-gradient(135deg, #ef476f20, #f7797d10)',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    }
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
    setHovered(false);
  };

  return (
    <div ref={cardRef}
      className="glass rounded-3xl overflow-hidden reveal transition-all duration-200"
      style={{ transitionDelay: `${index * 0.1}s`, transformStyle: 'preserve-3d', cursor: 'default' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradient top */}
      <div className="h-1 w-full" style={{ background: project.gradient.replace(/20|10/g, '') }} />
      
      {/* Header */}
      <div className="p-6" style={{ background: project.gradient }}>
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
            {project.emoji}
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 glass rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Eye size={14} style={{ color: project.color }} />
            </div>
          </div>
        </div>
        <h3 className="font-black text-gray-800 text-lg leading-tight">{project.title}</h3>
      </div>

      {/* Body */}
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 leading-relaxed mb-4 mt-3">{project.description}</p>

        {/* Highlights */}
        <div className="space-y-1.5 mb-4">
          {project.highlights.map(h => (
            <div key={h} className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
              {h}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}>
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
    <section id="projects" ref={sectionRef} className="py-24 relative"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(255,101,132,0.03), transparent)' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.15) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <div className="section-badge">Projects</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-2">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Real-world applications spanning healthcare, disaster management, neuroscience, and space technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>

        {/* GitHub link */}
        <div className="text-center mt-10 reveal">
          <a href="https://github.com/brijesh279" target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2">
            <Github size={18} />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
