'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(`Hi Brijesh,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.open(`mailto:brijesh.m@ahduni.edu.in?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contactItems = [
    { icon: <Mail size={20} />, label: 'Email', value: 'brijesh.m@ahduni.edu.in', href: 'mailto:brijesh.m@ahduni.edu.in', color: '#6c63ff' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 9879578052', href: 'tel:9879578052', color: '#ff6584' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Ahmedabad, India', href: '#', color: '#43e97b' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'brijesh-munjiyasara', href: 'https://www.linkedin.com/in/brijesh-munjiyasara/', color: '#0077b5' },
    { icon: <Github size={20} />, label: 'GitHub', value: 'brijesh279 / Brijesh439', href: 'https://github.com/brijesh279', color: '#333' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(108,99,255,0.04), transparent)' }}>
      <div className="absolute top-0 left-0 w-72 h-72 opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(67,233,123,0.2) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal">
          <div className="section-badge">Contact</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-2">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Open to collaborations, internships, research opportunities, and exciting projects in AI/ML
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="reveal">
            {/* Availability banner */}
            <div className="glass rounded-2xl p-5 mb-6 flex items-center gap-4"
              style={{ background: 'linear-gradient(135deg, rgba(67,233,123,0.1), rgba(108,99,255,0.08))' }}>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <div>
                <div className="font-black text-gray-800 text-sm">Available for Opportunities</div>
                <div className="text-xs text-gray-500">AI/ML roles, Research collaborations, Data Science</div>
              </div>
              <Sparkles size={20} className="text-purple-500 ml-auto" />
            </div>

            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-5 flex items-center gap-4 card-3d hover:no-underline group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</div>
                    <div className="font-semibold text-gray-700 text-sm group-hover:text-purple-600 transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="glass rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #6c63ff, transparent)' }} />

              <div className="flex items-center gap-3 mb-6">
                <MessageSquare size={22} className="text-purple-500" />
                <h3 className="font-black text-xl text-gray-800">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white/70 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white/70 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    placeholder="Collaboration / Opportunity / Research"
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white/70 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-white/70 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all resize-none placeholder:text-gray-300"
                    required
                  />
                </div>

                <button type="submit"
                  className={`btn-primary w-full justify-center ${sent ? 'bg-green-500' : ''}`}
                  style={{ background: sent ? '#43e97b' : undefined }}>
                  {sent ? '✓ Message Sent!' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
