import Link from 'next/link';

export default function Footer() {
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
