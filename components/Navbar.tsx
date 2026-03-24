'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#home',         label: 'Home' },
  { href: '#about',        label: 'About' },
  { href: '#skills',       label: 'Skills' },
  { href: '#experience',   label: 'Experience' },
  { href: '#projects',     label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact',      label: 'Contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('#home');
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => document.querySelector(l.href));
      let cur = '#home';
      sections.forEach(sec => {
        if (sec) {
          const r = sec.getBoundingClientRect();
          if (r.top <= 120 && r.bottom > 120) cur = `#${sec.id}`;
        }
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div
        className={`mx-auto px-6 py-3 transition-all duration-300 ${
          scrolled
            ? 'max-w-5xl mt-4 rounded-2xl border'
            : 'max-w-full'
        }`}
        style={scrolled ? {
          background: 'rgba(10,15,26,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.08)',
        } : {
          background: 'transparent',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'var(--accent)' }}
            >
              BM
            </div>
            <span className="font-black text-white hidden md:block text-sm tracking-wide">
              BRIJESH<span style={{ color: 'var(--accent)' }}>.</span>IO
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`nav-link ${active === href ? 'active' : ''}`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-primary text-xs py-2 px-5 hidden md:inline-flex">
              Hire Me
            </a>
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={16} color="white" /> : <Menu size={16} color="white" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden mt-4 pb-4 pt-4 space-y-1"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 px-3 text-sm font-semibold rounded-lg transition-colors"
                style={{
                  color: active === href ? 'var(--accent)' : 'var(--gray2)',
                  background: active === href ? 'rgba(232,69,48,0.08)' : 'transparent',
                }}
              >
                {label}
              </a>
            ))}
            <div className="pt-3">
              <a href="#contact" className="btn-primary w-full justify-center text-xs py-2.5">
                Hire Me
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
