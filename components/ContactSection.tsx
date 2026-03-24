'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body    = encodeURIComponent(`Hi Brijesh,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.open(`mailto:brijesh.m@ahduni.edu.in?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contactItems = [
    { icon: <Mail size={19} />,    label: 'Email',    value: 'brijesh.m@ahduni.edu.in',          href: 'mailto:brijesh.m@ahduni.edu.in',                      color: '#E84530' },
    { icon: <Phone size={19} />,   label: 'Phone',    value: '+91 9879578052',                    href: 'tel:9879578052',                                      color: '#ff8c42' },
    { icon: <MapPin size={19} />,  label: 'Location', value: 'Ahmedabad, India',                  href: '#',                                                   color: '#E84530' },
    { icon: <Linkedin size={19} />,label: 'LinkedIn', value: 'brijesh-munjiyasara',               href: 'https://www.linkedin.com/in/brijesh-munjiyasara/',     color: '#0a66c2' },
    { icon: <Github size={19} />,  label: 'GitHub',   value: 'brijesh279 / Brijesh439',           href: 'https://github.com/brijesh279',                       color: 'var(--gray2)' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 relative"
    >
      <div className="section-divider" />

      <div
        className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top left, rgba(232,69,48,0.05) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(255,140,66,0.04) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-20 reveal">
          <div className="section-badge">Contact</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 uppercase tracking-tight">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 max-w-xl text-base" style={{ color: 'var(--gray2)' }}>
            Open to collaborations, internships, research opportunities, and exciting AI/ML projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── Contact info ── */}
          <div className="reveal">
            {/* Availability banner */}
            <div
              className="rounded-2xl p-5 mb-6 flex items-center gap-4"
              style={{
                background: 'rgba(74,222,128,0.06)',
                border: '1px solid rgba(74,222,128,0.15)',
              }}
            >
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <div>
                <div className="font-black text-white text-sm">Available for Opportunities</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--gray3)' }}>
                  AI/ML roles · Research · Data Science
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {contactItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 p-4 glow-border group"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--gray3)' }}
                    >
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Contact form ── */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="card p-8 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none opacity-10"
                style={{ background: 'radial-gradient(circle, #E84530, transparent)' }}
              />

              <div className="flex items-center gap-3 mb-7">
                <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
                <h3 className="font-black text-xl text-white">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: 'var(--gray3)' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="input-dark"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: 'var(--gray3)' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="input-dark"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--gray3)' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Collaboration / Opportunity / Research"
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    className="input-dark"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: 'var(--gray3)' }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="input-dark resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                  style={sent ? { background: '#22c55e' } : {}}
                >
                  {sent ? '✓ Message Sent!' : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
