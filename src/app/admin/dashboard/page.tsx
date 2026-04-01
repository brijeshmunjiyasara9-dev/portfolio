'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────
type Section = 'about' | 'projects' | 'experience' | 'skills' | 'education' | 'certifications';

interface Project { id: number; num: string; name: string; tech: string; detail: string; image: string; description: string; github_url: string; website_url: string; visible: number; sort_order: number; }
interface Experience { id: number; company: string; role: string; tag: string; period: string; description: string; image: string; status: string; visible: number; sort_order: number; }
interface Skill { id: number; category: string; role: string; skills_list: string; image: string; visible: number; sort_order: number; }
interface Education { id: number; title: string; institution: string; tag: string; period: string; description: string; visible: number; sort_order: number; }
interface About { id: number; headline: string; paragraph1: string; paragraph2: string; }
interface Certification { id: number; title: string; issuer: string; tag: string; date_issued: string; credential_url: string; description: string; image: string; visible: number; sort_order: number; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
const SECTION_META: Record<Section, { label: string; icon: string; color: string }> = {
  about:          { label: 'About',          icon: '👤', color: '#6366f1' },
  projects:       { label: 'Projects',       icon: '🚀', color: '#0ea5e9' },
  experience:     { label: 'Experience',     icon: '💼', color: '#10b981' },
  skills:         { label: 'Skills',         icon: '⚡', color: '#f59e0b' },
  education:      { label: 'Education',      icon: '🎓', color: '#ec4899' },
  certifications: { label: 'Certifications', icon: '🏆', color: '#f97316' },
};

// ─── Shared Modal ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#111', border: '1px solid #222', borderRadius: '14px',
        width: '100%', maxWidth: '640px', maxHeight: '90vh', overflow: 'auto',
        padding: '2rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string; }) {
  const style: React.CSSProperties = {
    width: '100%', padding: '0.7rem 0.9rem',
    background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px',
    color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
    resize: multiline ? 'vertical' : 'none',
  };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', color: '#aaa', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4} style={style} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />}
    </div>
  );
}

// ─── Visibility Toggle Badge ──────────────────────────────────────────────────
function VisibleBadge({ visible, onToggle }: { visible: number; onToggle: () => void }) {
  return (
    <button onClick={onToggle} title={visible ? 'Click to hide' : 'Click to show'} style={{
      padding: '3px 10px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600,
      background: visible ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
      color: visible ? '#10b981' : '#ef4444',
    }}>
      {visible ? '● Visible' : '● Hidden'}
    </button>
  );
}

// ─── Item Card ────────────────────────────────────────────────────────────────
function ItemCard({ title, subtitle, extra, visible, onToggle, onEdit, onDelete }: {
  title: string; subtitle?: string; extra?: string;
  visible: number; onToggle: () => void; onEdit: () => void; onDelete: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div style={{
      background: '#161616', border: '1px solid #222', borderRadius: '10px',
      padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem',
      opacity: visible ? 1 : 0.55, transition: 'opacity 0.2s',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        {subtitle && <div style={{ color: '#888', fontSize: '0.78rem', marginTop: '2px' }}>{subtitle}</div>}
        {extra && <div style={{ color: '#555', fontSize: '0.75rem', marginTop: '2px' }}>{extra}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <VisibleBadge visible={visible} onToggle={onToggle} />
        <button onClick={onEdit} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #333', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: '0.78rem' }}>Edit</button>
        {confirm
          ? <>
              <button onClick={onDelete} style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #ef4444', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer', fontSize: '0.78rem' }}>Confirm</button>
              <button onClick={() => setConfirm(false)} style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid #333', background: 'transparent', color: '#666', cursor: 'pointer', fontSize: '0.78rem' }}>Cancel</button>
            </>
          : <button onClick={() => setConfirm(true)} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #333', background: 'transparent', color: '#666', cursor: 'pointer', fontSize: '0.78rem' }}>🗑</button>
        }
      </div>
    </div>
  );
}

// ─── Save Button ──────────────────────────────────────────────────────────────
function SaveBtn({ onClick, loading, label = 'Save Changes' }: { onClick: () => void; loading: boolean; label?: string }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      padding: '0.7rem 1.5rem', background: loading ? '#333' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem',
    }}>{loading ? 'Saving...' : label}</button>
  );
}

// ─── ABOUT Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const [data, setData] = useState<About | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio/about').then(r => r.json()).then(setData);
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    await fetch('/api/portfolio/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) return <div style={{ color: '#555', padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>About Me</h2>
          <p style={{ color: '#555', fontSize: '0.8rem', margin: '4px 0 0' }}>Edit the headline and bio shown on the homepage</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          {saved && <span style={{ color: '#10b981', fontSize: '0.85rem' }}>✓ Saved!</span>}
          <SaveBtn onClick={save} loading={saving} />
        </div>
      </div>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '1.5rem' }}>
        <Field label="Headline (use \\n for line breaks)" value={data.headline} onChange={v => setData({ ...data, headline: v })} multiline />
        <Field label="First Paragraph" value={data.paragraph1} onChange={v => setData({ ...data, paragraph1: v })} multiline />
        <Field label="Second Paragraph" value={data.paragraph2} onChange={v => setData({ ...data, paragraph2: v })} multiline />
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#0d1117', border: '1px solid #1a2030', borderRadius: '10px' }}>
        <p style={{ color: '#555', fontSize: '0.78rem', margin: 0 }}>
          <strong style={{ color: '#6366f1' }}>Preview:</strong>{' '}
          <span style={{ color: '#888' }}>{data.headline.split('\\n').join(' ')} — {data.paragraph1.slice(0, 80)}...</span>
        </p>
      </div>
    </div>
  );
}

// ─── PROJECTS Section ─────────────────────────────────────────────────────────
function ProjectsSection() {
  const [items, setItems] = useState<Project[]>([]);
  const [modal, setModal] = useState<Project | null | 'new'>(null);
  const [saving, setSaving] = useState(false);
  const blank: Omit<Project, 'id'> = { num: '', name: '', tech: '', detail: '', image: '', description: '', github_url: '', website_url: '', visible: 1, sort_order: 0 };
  const [form, setForm] = useState<any>(blank);

  const load = useCallback(() => {
    fetch('/api/portfolio/projects').then(r => r.json()).then(setItems);
  }, []);
  useEffect(() => { load(); }, [load]);

  function openEdit(item: Project) { setForm({ ...item }); setModal(item); }
  function openNew() { setForm({ ...blank, sort_order: items.length + 1, num: `(${toRoman(items.length + 1)})` }); setModal('new'); }

  async function save() {
    setSaving(true);
    if (modal === 'new') {
      await fetch('/api/portfolio/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/portfolio/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    setModal(null);
    load();
  }

  async function toggleVisible(item: Project) {
    await fetch('/api/portfolio/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, visible: item.visible ? 0 : 1 }) });
    load();
  }

  async function del(id: number) {
    await fetch('/api/portfolio/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <SectionHeader title="Projects" subtitle="Manage portfolio projects shown on the Projects page" onAdd={openNew} count={items.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map(p => (
          <ItemCard key={p.id} title={p.name} subtitle={p.tech} extra={`${p.num} · Sort: ${p.sort_order}`}
            visible={p.visible} onToggle={() => toggleVisible(p)} onEdit={() => openEdit(p)} onDelete={() => del(p.id)} />
        ))}
      </div>
      {modal && (
        <Modal title={modal === 'new' ? 'Add Project' : 'Edit Project'} onClose={() => setModal(null)}>
          <Field label="Number (e.g. (I))" value={form.num} onChange={v => setForm({ ...form, num: v })} />
          <Field label="Project Name" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <Field label="Tech Stack" value={form.tech} onChange={v => setForm({ ...form, tech: v })} placeholder="e.g. Python · TensorFlow · Docker" />
          <Field label="Detail / Subtitle" value={form.detail} onChange={v => setForm({ ...form, detail: v })} />
          <Field label="Description" value={form.description ?? ''} onChange={v => setForm({ ...form, description: v })} multiline placeholder="Short description of the project..." />
          <Field label="GitHub URL" value={form.github_url ?? ''} onChange={v => setForm({ ...form, github_url: v })} placeholder="https://github.com/..." />
          <Field label="Website / Live Demo URL" value={form.website_url ?? ''} onChange={v => setForm({ ...form, website_url: v })} placeholder="https://..." />
          <Field label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
          <Field label="Sort Order" value={String(form.sort_order)} onChange={v => setForm({ ...form, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600 }}>Visibility</label>
            <VisibleBadge visible={form.visible} onToggle={() => setForm({ ...form, visible: form.visible ? 0 : 1 })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button onClick={() => setModal(null)} style={{ padding: '0.7rem 1.2rem', background: 'none', border: '1px solid #333', borderRadius: '8px', color: '#666', cursor: 'pointer' }}>Cancel</button>
            <SaveBtn onClick={save} loading={saving} label={modal === 'new' ? 'Add Project' : 'Save Changes'} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── EXPERIENCE Section ───────────────────────────────────────────────────────
function ExperienceSection() {
  const [items, setItems] = useState<Experience[]>([]);
  const [modal, setModal] = useState<Experience | null | 'new'>(null);
  const [saving, setSaving] = useState(false);
  const blank = { company: '', role: '', tag: '', period: '', description: '', image: '', status: 'Past Role', visible: 1, sort_order: 0 };
  const [form, setForm] = useState<any>(blank);

  const load = useCallback(() => { fetch('/api/portfolio/experience').then(r => r.json()).then(setItems); }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    await fetch('/api/portfolio/experience', { method: modal === 'new' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false); setModal(null); load();
  }
  async function toggleVisible(item: Experience) {
    await fetch('/api/portfolio/experience', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, visible: item.visible ? 0 : 1 }) });
    load();
  }
  async function del(id: number) {
    await fetch('/api/portfolio/experience', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <SectionHeader title="Experience" subtitle="Manage work experience entries" onAdd={() => { setForm({ ...blank, sort_order: items.length + 1 }); setModal('new'); }} count={items.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map(e => (
          <ItemCard key={e.id} title={e.role} subtitle={e.company} extra={`${e.tag} · ${e.period}`}
            visible={e.visible} onToggle={() => toggleVisible(e)} onEdit={() => { setForm({ ...e }); setModal(e); }} onDelete={() => del(e.id)} />
        ))}
      </div>
      {modal && (
        <Modal title={modal === 'new' ? 'Add Experience' : 'Edit Experience'} onClose={() => setModal(null)}>
          <Field label="Company / Organisation" value={form.company} onChange={v => setForm({ ...form, company: v })} />
          <Field label="Role / Title" value={form.role} onChange={v => setForm({ ...form, role: v })} />
          <Field label="Tag (e.g. Internship · Govt.)" value={form.tag} onChange={v => setForm({ ...form, tag: v })} />
          <Field label="Period" value={form.period} onChange={v => setForm({ ...form, period: v })} placeholder="e.g. May 2025 – Apr 2026" />
          <Field label="Status Badge" value={form.status} onChange={v => setForm({ ...form, status: v })} placeholder="e.g. Current Role / Past Role / Academic Role" />
          <Field label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
          <Field label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
          <Field label="Sort Order" value={String(form.sort_order)} onChange={v => setForm({ ...form, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600 }}>Visibility</label>
            <VisibleBadge visible={form.visible} onToggle={() => setForm({ ...form, visible: form.visible ? 0 : 1 })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button onClick={() => setModal(null)} style={{ padding: '0.7rem 1.2rem', background: 'none', border: '1px solid #333', borderRadius: '8px', color: '#666', cursor: 'pointer' }}>Cancel</button>
            <SaveBtn onClick={save} loading={saving} label={modal === 'new' ? 'Add Experience' : 'Save Changes'} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── SKILLS Section ───────────────────────────────────────────────────────────
function SkillsSection() {
  const [items, setItems] = useState<Skill[]>([]);
  const [modal, setModal] = useState<Skill | null | 'new'>(null);
  const [saving, setSaving] = useState(false);
  const blank = { category: '', role: '', skills_list: '', image: '', visible: 1, sort_order: 0 };
  const [form, setForm] = useState<any>(blank);

  const load = useCallback(() => { fetch('/api/portfolio/skills').then(r => r.json()).then(setItems); }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    await fetch('/api/portfolio/skills', { method: modal === 'new' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false); setModal(null); load();
  }
  async function toggleVisible(item: Skill) {
    await fetch('/api/portfolio/skills', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, visible: item.visible ? 0 : 1 }) });
    load();
  }
  async function del(id: number) {
    await fetch('/api/portfolio/skills', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <SectionHeader title="Skills" subtitle="Manage skill categories and tech stack entries" onAdd={() => { setForm({ ...blank, sort_order: items.length + 1 }); setModal('new'); }} count={items.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map(s => (
          <ItemCard key={s.id} title={s.category} subtitle={s.role} extra={s.skills_list}
            visible={s.visible} onToggle={() => toggleVisible(s)} onEdit={() => { setForm({ ...s }); setModal(s); }} onDelete={() => del(s.id)} />
        ))}
      </div>
      {modal && (
        <Modal title={modal === 'new' ? 'Add Skill Category' : 'Edit Skill Category'} onClose={() => setModal(null)}>
          <Field label="Category Name" value={form.category} onChange={v => setForm({ ...form, category: v })} placeholder="e.g. Machine Learning & AI" />
          <Field label="Role Label" value={form.role} onChange={v => setForm({ ...form, role: v })} placeholder="e.g. Core Expertise" />
          <Field label="Skills List (use · to separate)" value={form.skills_list} onChange={v => setForm({ ...form, skills_list: v })} multiline placeholder="e.g. TensorFlow · PyTorch · Scikit-learn" />
          <Field label="Image URL" value={form.image} onChange={v => setForm({ ...form, image: v })} />
          <Field label="Sort Order" value={String(form.sort_order)} onChange={v => setForm({ ...form, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600 }}>Visibility</label>
            <VisibleBadge visible={form.visible} onToggle={() => setForm({ ...form, visible: form.visible ? 0 : 1 })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button onClick={() => setModal(null)} style={{ padding: '0.7rem 1.2rem', background: 'none', border: '1px solid #333', borderRadius: '8px', color: '#666', cursor: 'pointer' }}>Cancel</button>
            <SaveBtn onClick={save} loading={saving} label={modal === 'new' ? 'Add Skill' : 'Save Changes'} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── CERTIFICATIONS Section ──────────────────────────────────────────────────
function CertificationsSection() {
  const [items, setItems] = useState<Certification[]>([]);
  const [modal, setModal] = useState<Certification | null | 'new'>(null);
  const [saving, setSaving] = useState(false);
  const blank = { title: '', issuer: '', tag: 'Certification', date_issued: '', credential_url: '', description: '', image: '', visible: 1, sort_order: 0 };
  const [form, setForm] = useState<any>(blank);

  const load = useCallback(() => { fetch('/api/portfolio/certifications').then(r => r.json()).then(setItems); }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    await fetch('/api/portfolio/certifications', { method: modal === 'new' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false); setModal(null); load();
  }
  async function toggleVisible(item: Certification) {
    await fetch('/api/portfolio/certifications', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, visible: item.visible ? 0 : 1 }) });
    load();
  }
  async function del(id: number) {
    await fetch('/api/portfolio/certifications', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <SectionHeader title="Certifications" subtitle="Manage certifications, awards, and research publications" onAdd={() => { setForm({ ...blank, sort_order: items.length + 1 }); setModal('new'); }} count={items.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map(c => (
          <ItemCard key={c.id} title={c.title} subtitle={c.issuer} extra={`${c.tag} · ${c.date_issued}`}
            visible={c.visible} onToggle={() => toggleVisible(c)} onEdit={() => { setForm({ ...c }); setModal(c); }} onDelete={() => del(c.id)} />
        ))}
      </div>
      {modal && (
        <Modal title={modal === 'new' ? 'Add Certification' : 'Edit Certification'} onClose={() => setModal(null)}>
          <Field label="Title / Certificate Name" value={form.title} onChange={v => setForm({ ...form, title: v })} />
          <Field label="Issuer / Organisation" value={form.issuer} onChange={v => setForm({ ...form, issuer: v })} />
          <Field label="Tag" value={form.tag} onChange={v => setForm({ ...form, tag: v })} placeholder="e.g. Cloud · AWS / Research · Published" />
          <Field label="Date Issued" value={form.date_issued} onChange={v => setForm({ ...form, date_issued: v })} placeholder="e.g. 2024 / Jan 2025" />
          <Field label="Credential URL" value={form.credential_url ?? ''} onChange={v => setForm({ ...form, credential_url: v })} placeholder="https://..." />
          <Field label="Description" value={form.description ?? ''} onChange={v => setForm({ ...form, description: v })} multiline />
          <Field label="Image URL" value={form.image ?? ''} onChange={v => setForm({ ...form, image: v })} />
          <Field label="Sort Order" value={String(form.sort_order)} onChange={v => setForm({ ...form, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600 }}>Visibility</label>
            <VisibleBadge visible={form.visible} onToggle={() => setForm({ ...form, visible: form.visible ? 0 : 1 })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button onClick={() => setModal(null)} style={{ padding: '0.7rem 1.2rem', background: 'none', border: '1px solid #333', borderRadius: '8px', color: '#666', cursor: 'pointer' }}>Cancel</button>
            <SaveBtn onClick={save} loading={saving} label={modal === 'new' ? 'Add Certification' : 'Save Changes'} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── EDUCATION Section ────────────────────────────────────────────────────────
function EducationSection() {
  const [items, setItems] = useState<Education[]>([]);
  const [modal, setModal] = useState<Education | null | 'new'>(null);
  const [saving, setSaving] = useState(false);
  const blank = { title: '', institution: '', tag: '', period: '', description: '', visible: 1, sort_order: 0 };
  const [form, setForm] = useState<any>(blank);

  const load = useCallback(() => { fetch('/api/portfolio/education').then(r => r.json()).then(setItems); }, []);
  useEffect(() => { load(); }, [load]);

  async function save() {
    setSaving(true);
    await fetch('/api/portfolio/education', { method: modal === 'new' ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false); setModal(null); load();
  }
  async function toggleVisible(item: Education) {
    await fetch('/api/portfolio/education', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, visible: item.visible ? 0 : 1 }) });
    load();
  }
  async function del(id: number) {
    await fetch('/api/portfolio/education', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <SectionHeader title="Education" subtitle="Manage degrees, certifications, and research publications" onAdd={() => { setForm({ ...blank, sort_order: items.length + 1 }); setModal('new'); }} count={items.length} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map(e => (
          <ItemCard key={e.id} title={e.title} subtitle={e.institution} extra={`${e.tag} · ${e.period}`}
            visible={e.visible} onToggle={() => toggleVisible(e)} onEdit={() => { setForm({ ...e }); setModal(e); }} onDelete={() => del(e.id)} />
        ))}
      </div>
      {modal && (
        <Modal title={modal === 'new' ? 'Add Education Entry' : 'Edit Education Entry'} onClose={() => setModal(null)}>
          <Field label="Title / Degree" value={form.title} onChange={v => setForm({ ...form, title: v })} />
          <Field label="Institution" value={form.institution} onChange={v => setForm({ ...form, institution: v })} />
          <Field label="Tag" value={form.tag} onChange={v => setForm({ ...form, tag: v })} placeholder="e.g. Education · Pursuing / Certification" />
          <Field label="Period" value={form.period} onChange={v => setForm({ ...form, period: v })} placeholder="e.g. 2024 — Present" />
          <Field label="Description" value={form.description} onChange={v => setForm({ ...form, description: v })} multiline />
          <Field label="Sort Order" value={String(form.sort_order)} onChange={v => setForm({ ...form, sort_order: parseInt(v) || 0 })} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <label style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600 }}>Visibility</label>
            <VisibleBadge visible={form.visible} onToggle={() => setForm({ ...form, visible: form.visible ? 0 : 1 })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
            <button onClick={() => setModal(null)} style={{ padding: '0.7rem 1.2rem', background: 'none', border: '1px solid #333', borderRadius: '8px', color: '#666', cursor: 'pointer' }}>Cancel</button>
            <SaveBtn onClick={save} loading={saving} label={modal === 'new' ? 'Add Entry' : 'Save Changes'} />
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, onAdd, count }: { title: string; subtitle: string; onAdd: () => void; count: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
      <div>
        <h2 style={{ color: '#fff', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{title}
          <span style={{ marginLeft: '0.6rem', background: '#1e1e1e', color: '#555', borderRadius: '20px', padding: '2px 10px', fontSize: '0.75rem', fontWeight: 600 }}>{count}</span>
        </h2>
        <p style={{ color: '#555', fontSize: '0.8rem', margin: '4px 0 0' }}>{subtitle}</p>
      </div>
      <button onClick={onAdd} style={{
        padding: '0.6rem 1.2rem', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem',
      }}>+ Add New</button>
    </div>
  );
}

// ─── Roman helper ─────────────────────────────────────────────────────────────
function toRoman(n: number) {
  const map: [number, string][] = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let r = '';
  for (const [v, s] of map) { while (n >= v) { r += s; n -= v; } }
  return r;
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>('about');
  const [username, setUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('/api/auth/verify').then(r => {
      if (!r.ok) router.push('/admin/login');
      else r.json().then(d => setUsername(d.username));
    });
  }, [router]);

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const sections: Section[] = ['about', 'projects', 'experience', 'skills', 'education', 'certifications'];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '240px' : '64px',
        background: '#0d0d0d',
        borderRight: '1px solid #1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '1.2rem 1rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{
            width: '36px', height: '36px', flexShrink: 0,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '16px',
          }}>B</div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Admin Panel</div>
              <div style={{ color: '#555', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>@{username}</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '0.8rem 0.5rem' }}>
          {sections.map(s => {
            const meta = SECTION_META[s];
            const active = activeSection === s;
            return (
              <button key={s} onClick={() => setActiveSection(s)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.65rem 0.75rem', marginBottom: '0.25rem',
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: active ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                borderRadius: '8px', cursor: 'pointer', transition: 'all 0.15s',
                color: active ? '#6366f1' : '#555',
              }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{meta.icon}</span>
                {sidebarOpen && <span style={{ fontSize: '0.85rem', fontWeight: active ? 600 : 500, whiteSpace: 'nowrap', overflow: 'hidden' }}>{meta.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '0.8rem 0.5rem', borderTop: '1px solid #1a1a1a' }}>
          <a href="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 0.75rem', color: '#555', textDecoration: 'none',
            borderRadius: '8px', fontSize: '0.85rem', marginBottom: '0.25rem',
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>🌐</span>
            {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>View Site</span>}
          </a>
          <button onClick={logout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 0.75rem', background: 'transparent',
            border: '1px solid transparent', borderRadius: '8px',
            cursor: 'pointer', color: '#ef4444', fontSize: '0.85rem',
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>🚪</span>
            {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* Top Bar */}
        <div style={{
          padding: '1rem 2rem', borderBottom: '1px solid #1a1a1a',
          background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.2rem' }}>{SECTION_META[activeSection].icon}</span>
            <h1 style={{ color: '#fff', margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              {SECTION_META[activeSection].label}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {sections.map(s => (
              <button key={s} onClick={() => setActiveSection(s)} style={{
                padding: '5px 12px', borderRadius: '6px', border: '1px solid',
                borderColor: activeSection === s ? '#6366f1' : '#222',
                background: activeSection === s ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: activeSection === s ? '#6366f1' : '#555',
                cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
              }}>{SECTION_META[s].label}</button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <div style={{ padding: '2rem', maxWidth: '960px' }}>
          {activeSection === 'about' && <AboutSection />}
          {activeSection === 'projects' && <ProjectsSection />}
          {activeSection === 'experience' && <ExperienceSection />}
          {activeSection === 'skills' && <SkillsSection />}
          {activeSection === 'education' && <EducationSection />}
          {activeSection === 'certifications' && <CertificationsSection />}
        </div>
      </main>
    </div>
  );
}
