// Server Component — data fetched on the server at request time.
import { getDb } from '@/lib/db';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AnimationsClient from '@/components/AnimationsClient';

export const dynamic = 'force-dynamic';

interface Skill {
  id: number;
  category: string;
  role: string;
  skills_list: string;
  image: string;
}

export default async function SkillsPage() {
  const db = await getDb();
  const skills = (await db.all(
    'SELECT * FROM skills WHERE visible = 1 ORDER BY sort_order ASC'
  )) as unknown as Skill[];

  return (
    <>
      <AnimationsClient />
      <div className="grain-overlay"></div>
      <Nav />

      <section className="page-hero">
        <div className="page-hero-label reveal-up">Technical Skills</div>
        <h1 className="page-hero-title reveal-up">
          Deep expertise<br />across the full<br />AI/ML stack.
        </h1>
        <p className="page-hero-body reveal-up">
          Built through hands-on projects, internships, and academic research — spanning machine
          learning, cloud infrastructure, data engineering, and remote sensing.
        </p>
      </section>

      <div className="people-grid">
        {skills.map((cat) => (
          <div key={cat.id} className="person-card reveal-up">
            <div className="person-card-img">
              <img src={cat.image} alt={cat.category} />
            </div>
            <div className="person-card-name">{cat.category}</div>
            <div className="person-card-role">{cat.role}</div>
            <div className="person-card-location" style={{ lineHeight: '1.6', marginTop: '0.5rem' }}>
              {cat.skills_list}
            </div>
          </div>
        ))}
      </div>

      <div className="principle-block reveal-up">
        <div className="principle-label">Certifications</div>
        <p className="principle-text">
          AWS Academy Graduate — Cloud Foundations &nbsp;·&nbsp; NPTEL Certified in Python for
          Data Science &nbsp;·&nbsp; Research published in IJSRST (International Journal of
          Scientific Research in Science and Technology)
        </p>
      </div>

      <div className="updates-page-list">
        {skills.map((cat) => (
          <div key={cat.id} className="update-page-item reveal-up">
            <div className="update-page-left">
              <span className="update-page-tag">{cat.role}</span>
            </div>
            <div className="update-page-right">
              <div className="update-page-title">{cat.category}</div>
              <p className="update-page-body">{cat.skills_list}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
