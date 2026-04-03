// Server Component — data fetched on the server at request time.
import { getDb } from '@/lib/db';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnimationsClient from '@/components/AnimationsClient';

export const dynamic = 'force-dynamic';

interface Education {
  id: number;
  title: string;
  institution: string;
  tag: string;
  period: string;
  description: string;
}

export default async function EducationPage() {
  const db = await getDb();
  const items = (await db.all(
    'SELECT * FROM education WHERE visible = 1 ORDER BY sort_order ASC'
  )) as unknown as Education[];

  return (
    <>
      <AnimationsClient />
      <div className="grain-overlay"></div>
      <Nav />

      <section className="page-hero">
        <div className="page-hero-label reveal-up">Education · Certifications · Achievements</div>
        <h1 className="page-hero-title reveal-up">
          Academic<br />Foundation &amp;<br />Milestones
        </h1>
        <p className="page-hero-body reveal-up">
          From engineering fundamentals at LDRP to cutting-edge AI/ML research at Ahmedabad
          University — a continuous journey of learning, publishing, and building.
        </p>
      </section>

      <div className="updates-page-list">
        {items.map((edu) => (
          <div key={edu.id} className="update-page-item reveal-up">
            <div className="update-page-left">
              <span className="update-page-tag">{edu.tag}</span>
              <span className="update-page-date">{edu.period}</span>
            </div>
            <div className="update-page-right">
              <div className="update-page-title">{edu.title} — {edu.institution}</div>
              <p className="update-page-body">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
