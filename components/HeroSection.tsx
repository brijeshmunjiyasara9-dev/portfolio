'use client';
import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, ArrowDown, Sparkles, Brain } from 'lucide-react';

const roles = [
  'AI/ML Engineer',
  'Data Scientist',
  'Healthcare Data Analyst',
  'Deep Learning Researcher',
  'NLP Engineer',
  'Computer Vision Specialist',
];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = roles[roleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, typing, roleIdx]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)', animation: 'orbPulse 4s ease-in-out infinite' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,101,132,0.15) 0%, transparent 70%)', animation: 'orbPulse 5s ease-in-out infinite reverse' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(67,233,123,0.05) 0%, transparent 70%)' }} />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 shadow-sm"
          style={{ animation: 'float 5s ease-in-out infinite' }}>
          <Sparkles size={14} className="text-purple-500" />
          <span className="text-sm font-semibold text-purple-600">MTech CSE • AI/ML Specialist</span>
          <Sparkles size={14} className="text-pink-400" />
        </div>

        {/* Avatar */}
        <div className="relative inline-block mb-8">
          <div className="w-36 h-36 mx-auto rounded-full glass glow-purple flex items-center justify-center text-5xl font-black relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f0eeff, #fff5f7)' }}>
            <span className="gradient-text select-none">BM</span>
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-300/30" style={{ animation: 'pulseRing 2.5s linear infinite' }} />
            <div className="absolute inset-0 rounded-full border-2 border-pink-300/20" style={{ animation: 'pulseRing 2.5s linear infinite 0.8s' }} />
          </div>
          {/* Online indicator */}
          <div className="absolute bottom-3 right-3 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md" />
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
          <span className="gradient-text">Brijesh</span>
          <span className="text-gray-800"> Munjiyasara</span>
        </h1>

        {/* Typing role */}
        <div className="h-14 flex items-center justify-center mb-6">
          <span className="text-2xl md:text-3xl font-bold text-gray-600">
            I&apos;m a{' '}
          </span>
          <span className="text-2xl md:text-3xl font-black ml-2" style={{ color: '#6c63ff' }}>
            {displayed}
            <span className="cursor-blink text-pink-400">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Transforming complex data into impactful{' '}
          <span className="font-semibold text-purple-600">AI/ML solutions</span>,
          bridging research and deployment to solve real-world challenges.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { num: '5+', label: 'Projects', color: '#6c63ff' },
            { num: '2', label: 'Research Papers', color: '#ff6584' },
            { num: '15+', label: 'Technologies', color: '#43e97b' },
            { num: '2', label: 'Internships', color: '#ffd166' },
          ].map(({ num, label, color }) => (
            <div key={label} className="glass rounded-2xl px-6 py-4 card-3d min-w-[110px]">
              <div className="text-3xl font-black mb-1" style={{ color }}>{num}</div>
              <div className="text-xs font-semibold text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="#projects" className="btn-primary">
            <Brain size={18} />
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            <Mail size={18} />
            Contact Me
          </a>
          <a href="https://www.linkedin.com/in/brijesh-munjiyasara/" target="_blank"
            rel="noopener noreferrer" className="btn-outline" style={{ borderColor: '#0077b5', color: '#0077b5' }}>
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>

        {/* Quick contact */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-12">
          <a href="mailto:brijesh.m@ahduni.edu.in" className="flex items-center gap-2 hover:text-purple-600 transition-colors">
            <Mail size={14} /> brijesh.m@ahduni.edu.in
          </a>
          <a href="tel:9879578052" className="flex items-center gap-2 hover:text-purple-600 transition-colors">
            <Phone size={14} /> +91 9879578052
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={14} /> Ahmedabad, India
          </span>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-16">
          {[
            { icon: <Github size={18} />, href: 'https://github.com/brijesh279', label: 'GitHub' },
            { icon: <Github size={18} />, href: 'https://github.com/Brijesh439', label: 'GitHub 2' },
            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/brijesh-munjiyasara/', label: 'LinkedIn' },
            { icon: <Mail size={18} />, href: 'mailto:brijesh.m@ahduni.edu.in', label: 'Email' },
          ].map(({ icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="glass w-12 h-12 rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:scale-110 transition-all duration-200 shadow-sm">
              {icon}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 animate-bounce">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </div>
      </div>
    </section>
  );
}
