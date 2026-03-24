'use client';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-10 relative"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'var(--accent)' }}
            >
              BM
            </div>
            <div>
              <div className="font-black text-sm text-white tracking-wide">
                BRIJESH<span style={{ color: 'var(--accent)' }}>.</span>IO
              </div>
              <div className="text-xs" style={{ color: 'var(--gray3)' }}>
                AI/ML Engineer · Data Scientist
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={15} />,   href: 'https://github.com/brijesh279',                        label: 'GitHub'   },
              { icon: <Linkedin size={15} />, href: 'https://www.linkedin.com/in/brijesh-munjiyasara/',     label: 'LinkedIn' },
              { icon: <Mail size={15} />,     href: 'mailto:brijesh.m@ahduni.edu.in',                      label: 'Email'    },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--gray3)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--gray3)';
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs" style={{ color: 'var(--gray3)' }}>
            © 2025 Brijesh Munjiyasara · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
