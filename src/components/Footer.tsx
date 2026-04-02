'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeFilename, setResumeFilename] = useState('');

  useEffect(() => {
    fetch('/api/portfolio/about')
      .then(r => r.json())
      .then(data => {
        if (data?.resume_url) setResumeUrl(data.resume_url);
        if (data?.resume_filename) setResumeFilename(data.resume_filename);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">Brijesh Munjiyasara</span>
          <span className="footer-tagline">AI/ML Engineer · Data Scientist · Ahmedabad</span>
        </div>
        <div className="footer-links">
          <Link href="/projects" className="footer-link">Projects</Link>
          <Link href="/experience" className="footer-link">Experience</Link>
          <Link href="/skills" className="footer-link">Skills</Link>
          <Link href="/education" className="footer-link">Education</Link>
          <Link href="/certifications" className="footer-link">Certifications</Link>
          {resumeUrl && (
            <a
              href={resumeUrl}
              download={resumeFilename || 'Brijesh_Munjiyasara_Resume.pdf'}
              className="footer-link footer-resume-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↓ Resume
            </a>
          )}
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Brijesh Munjiyasara</span>
          <a
            href="https://www.linkedin.com/in/brijesh-munjiyasara/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
