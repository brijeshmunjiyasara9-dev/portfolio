'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

const skillCategories = [
  {
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80&auto=format',
    name: 'Machine Learning & AI',
    role: 'Core Expertise',
    skills: 'TensorFlow · PyTorch · Scikit-learn · OpenCV · YOLO · DeepSORT',
    delay: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80&auto=format',
    name: 'Cloud & DevOps',
    role: 'Infrastructure',
    skills: 'AWS Academy Certified · Azure ML Studio · Docker · CI/CD Pipelines',
    delay: 'delay-1',
  },
  {
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&q=80&auto=format',
    name: 'Programming Languages',
    role: 'Languages',
    skills: 'Python · C · C++ · SQL · JavaScript',
    delay: 'delay-2',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80&auto=format',
    name: 'Data Engineering',
    role: 'Data Stack',
    skills: 'ETL Pipelines · Hadoop · PostgreSQL · Power BI · Pandas · NumPy',
    delay: 'delay-3',
  },
  {
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80&auto=format',
    name: 'NLP & LLMs',
    role: 'Natural Language Processing',
    skills: 'BERT · RAG · MarianMT · LangChain · Hugging Face Transformers',
    delay: '',
  },
  {
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&q=80&auto=format',
    name: 'Remote Sensing & GIS',
    role: 'Geospatial',
    skills: 'Satellite Image Processing · Atmospheric Correction · BISAG-N · Flood Modelling',
    delay: 'delay-1',
  },
];

export default function SkillsPage() {
  usePortfolioAnimations();

  return (
    <>
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

      {/* Skills Grid */}
      <div className="people-grid">
        {skillCategories.map((cat) => (
          <div key={cat.name} className={`person-card reveal-up ${cat.delay}`}>
            <div className="person-card-img">
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="person-card-name">{cat.name}</div>
            <div className="person-card-role">{cat.role}</div>
            <div className="person-card-location" style={{ lineHeight: '1.6', marginTop: '0.5rem' }}>
              {cat.skills}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications Block */}
      <div className="principle-block reveal-up">
        <div className="principle-label">Certifications</div>
        <p className="principle-text">
          AWS Academy Graduate — Cloud Foundations &nbsp;·&nbsp; NPTEL Certified in Python for
          Data Science &nbsp;·&nbsp; Research published in IJSRST (International Journal of
          Scientific Research in Science and Technology)
        </p>
      </div>

      {/* Detailed Skills List */}
      <div className="updates-page-list">
        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Core AI/ML</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Machine Learning & Deep Learning</div>
            <p className="update-page-body">
              TensorFlow, PyTorch, Keras, Scikit-learn, XGBoost, LightGBM — supervised,
              unsupervised, and reinforcement learning paradigms. Experience with CNNs, RNNs,
              Transformers, Graph Neural Networks (GNN), and Bayesian modelling.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">NLP & LLMs</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Natural Language Processing</div>
            <p className="update-page-body">
              BERT, GPT-based models, RAG (Retrieval-Augmented Generation), MarianMT for
              machine translation, LangChain, Hugging Face Transformers. Text classification,
              named entity recognition, semantic search, and document intelligence.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Computer Vision</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Computer Vision & Remote Sensing</div>
            <p className="update-page-body">
              OpenCV, YOLO (object detection), DeepSORT (multi-object tracking), fMRI image
              analysis, satellite image processing, atmospheric correction algorithms, and
              geospatial data analysis for disaster management applications.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">Cloud & Infra</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Cloud Platforms & DevOps</div>
            <p className="update-page-body">
              AWS (Academy Certified — Cloud Foundations), Azure ML Studio, Docker containerisation,
              CI/CD pipeline design, Hadoop for distributed computing, Git version control, and
              Linux-based development environments.
            </p>
          </div>
        </div>

        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Data Engineering</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Data Pipelines & Analytics</div>
            <p className="update-page-body">
              ETL pipeline design, PostgreSQL, Pandas, NumPy, Power BI dashboards, SQL query
              optimisation, data cleaning and preprocessing for large-scale datasets including
              healthcare, geospatial, and scientific data.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
