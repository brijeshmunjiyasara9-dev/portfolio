'use client';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 relative"
      style={{ borderTop: '1px solid rgba(108,99,255,0.1)' }}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #ff6584)' }}>
              BM
            </div>
            <div>
              <div className="font-black text-gray-800 text-sm">Brijesh Munjiyasara</div>
              <div className="text-xs text-gray-400">AI/ML Engineer • Data Scientist</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />, href: 'https://github.com/brijesh279', label: 'GitHub' },
              { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/brijesh-munjiyasara/', label: 'LinkedIn' },
              { icon: <Mail size={16} />, href: 'mailto:brijesh.m@ahduni.edu.in', label: 'Email' },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="glass w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-purple-600 hover:scale-110 transition-all duration-200">
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span>© 2025 Made with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>by Brijesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
