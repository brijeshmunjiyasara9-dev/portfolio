'use client';
import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowDown, ArrowRight } from 'lucide-react';

const roles = [
  'AI/ML Engineer',
  'Data Scientist',
  'Deep Learning Researcher',
  'NLP Engineer',
  'Computer Vision Specialist',
  'Healthcare Data Analyst',
];

export default function HeroSection() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing,    setTyping]    = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const current = roles[roleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)), 65
        );
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)), 35
        );
      } else {
        setRoleIdx(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, typing, roleIdx]);

  const stats = [
    { num: '5+',  label: 'Projects' },
    { num: '2',   label: 'Papers' },
    { num: '15+', label: 'Technologies' },
    { num: '2',   label: 'Internships' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,69,48,0.08) 0%, transparent 65%)',
          animation: 'orbPulse 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,69,48,0.06) 0%, transparent 65%)',
          animation: 'orbPulse 8s ease-in-out infinite reverse',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-16 text-center max-w-5xl">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full"
          style={{
            background: 'rgba(232,69,48,0.1)',
            border: '1px solid rgba(232,69,48,0.25)',
            animation: 'float 5s ease-in-out infinite',
          }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
            Available · MTech CSE · AI/ML
          </span>
        </div>

        {/* Avatar */}
        <div className="relative inline-block mb-10">
          <div
            className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-black relative overflow-hidden"
            style={{
              background: 'var(--surface2)',
              border: '2px solid var(--border2)',
              boxShadow: '0 0 40px rgba(232,69,48,0.2)',
            }}
          >
            <span className="gradient-text select-none">BM</span>
            <div
              className="absolute inset-0 rounded-full border border-red-500/20"
              style={{ animation: 'pulseRing 2.5s linear infinite' }}
            />
            <div
              className="absolute inset-0 rounded-full border border-red-500/10"
              style={{ animation: 'pulseRing 2.5s linear infinite 0.9s' }}
            />
          </div>
          <div
            className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2"
            style={{ borderColor: 'var(--bg)' }}
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-none uppercase">
          <span className="text-white">Brijesh </span>
          <span className="gradient-text">Munjiyasara</span>
        </h1>

        {/* Typing role */}
        <div className="h-12 flex items-center justify-center mb-6">
          <span className="text-xl md:text-2xl font-semibold" style={{ color: 'var(--gray2)' }}>
            I&apos;m a{' '}
          </span>
          <span
            className="text-xl md:text-2xl font-black ml-2"
            style={{ color: 'var(--accent)' }}
          >
            {displayed}
            <span className="cursor-blink text-white/60">|</span>
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'var(--gray2)' }}
        >
          Transforming complex data into impactful{' '}
          <span className="font-semibold text-white">AI/ML solutions</span>,
          bridging research and deployment to solve real-world challenges.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          <a href="#projects" className="btn-primary">
            View Projects
            <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-outline">
            <Mail size={16} />
            Contact Me
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {stats.map(({ num, label }) => (
            <div
              key={label}
              className="px-8 py-4 rounded-2xl min-w-[100px]"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="text-2xl font-black text-white mb-0.5">{num}</div>
              <div className="text-xs font-semibold" style={{ color: 'var(--gray3)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-5 mb-14">
          <a
            href="mailto:brijesh.m@ahduni.edu.in"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--gray3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray3)')}
          >
            <Mail size={14} /> brijesh.m@ahduni.edu.in
          </a>
          <a
            href="tel:9879578052"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--gray3)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray3)')}
          >
            <Phone size={14} /> +91 9879578052
          </a>
          <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--gray3)' }}>
            <MapPin size={14} /> Ahmedabad, India
          </span>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-3 mb-20">
          {[
            { icon: <Github size={17} />, href: 'https://github.com/brijesh279',                         label: 'GitHub' },
            { icon: <Github size={17} />, href: 'https://github.com/Brijesh439',                         label: 'GitHub 2' },
            { icon: <Linkedin size={17} />, href: 'https://www.linkedin.com/in/brijesh-munjiyasara/',    label: 'LinkedIn' },
            { icon: <Mail size={17} />,   href: 'mailto:brijesh.m@ahduni.edu.in',                       label: 'Email' },
          ].map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--gray2)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.color = 'var(--gray2)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{ color: 'var(--gray3)' }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  );
}
