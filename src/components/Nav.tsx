'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/education', label: 'Education' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Brijesh Munjiyasara
        </Link>
        <div className="nav-right">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${pathname === link.href ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
