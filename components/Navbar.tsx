'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Active section detection
      const sections = navLinks.map(l => document.querySelector(l.href));
      let current = '#home';
      sections.forEach((sec) => {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) current = `#${sec.id}`;
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`mx-auto px-6 py-3 transition-all duration-300 ${scrolled ? 'max-w-5xl mt-3 rounded-2xl glass shadow-lg' : 'max-w-full'}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #ff6584)' }}>
              BM
            </div>
            <span className="font-black text-gray-800 hidden md:block text-sm">
              Brijesh <span className="gradient-text">Munjiyasara</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href}
                className={`nav-link px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  active === href
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/50'
                }`}>
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="btn-primary text-sm py-2 px-5">
              <Sparkles size={14} />
              Hire Me
            </a>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden glass w-10 h-10 rounded-xl flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 px-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition-colors">
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
