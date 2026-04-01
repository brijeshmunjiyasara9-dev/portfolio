'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

export default function EducationPage() {
  usePortfolioAnimations();

  return (
    <>
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

      {/* Education Updates */}
      <div className="updates-page-list">

        {/* MTech */}
        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Education · Pursuing</span>
            <span className="update-page-date">2024 — Present</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">
              MTech in Computer Science &amp; Engineering — Ahmedabad University
            </div>
            <p className="update-page-body">
              School of Engineering and Applied Science, Ahmedabad University. CGPA: 3.03/4.00.
              Specialising in Artificial Intelligence, Machine Learning, and Data Engineering.
              Active research in flood prediction modelling, NLP pipelines, and remote sensing
              applications. Teaching Assistant for Python Fundamentals.
            </p>
          </div>
        </div>

        {/* BE */}
        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">Education</span>
            <span className="update-page-date">2020 — 2024</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">
              Bachelor of Engineering (Computer Engineering) — LDRP Institute of Technology &amp; Research
            </div>
            <p className="update-page-body">
              Kadi Sarva Vidhyalay University. CGPA: 6.64/10. LDRP Institute of Technology and
              Research, Gandhinagar. Built strong foundations in computer science: data structures,
              algorithms, databases, computer networks, and software engineering principles. Final
              year project focused on applied machine learning for real-world problem solving.
            </p>
          </div>
        </div>

        {/* AWS */}
        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Certification</span>
            <span className="update-page-date">2024</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">AWS Academy Graduate — Cloud Foundations</div>
            <p className="update-page-body">
              Completed Amazon Web Services Academy Cloud Foundations programme, gaining expertise
              in core AWS services, cloud architecture patterns, security best practices, pricing
              models, and deployment strategies for scalable cloud-based applications.
            </p>
          </div>
        </div>

        {/* NPTEL */}
        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">Certification · NPTEL</span>
            <span className="update-page-date">2023</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">NPTEL Certified — Python for Data Science</div>
            <p className="update-page-body">
              Nationally recognised NPTEL (National Programme on Technology Enhanced Learning)
              certification in Python for Data Science. Covered NumPy, Pandas, Matplotlib,
              Scikit-learn, and statistical analysis methodologies for data-driven decision making.
            </p>
          </div>
        </div>

        {/* Research Publication */}
        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Research · Published</span>
            <span className="update-page-date">May 2025 – Sep 2025</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">
              Research Paper Published — International Journal of Scientific Research in Science &amp; Technology (IJSRST)
            </div>
            <p className="update-page-body">
              Research paper on flood prediction using machine learning published in IJSRST —
              a peer-reviewed international journal. The paper explores advanced ML techniques
              applied to satellite and meteorological data for accurate flood event prediction and
              early warning systems, contributing to disaster preparedness research.
            </p>
          </div>
        </div>

        {/* BERT Study */}
        <div className="update-page-item reveal-up delay-1">
          <div className="update-page-left">
            <span className="update-page-tag">Research Study</span>
            <span className="update-page-date">Jul 2022 – Jan 2023</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Research Study on BERT — Presented to Faculty</div>
            <p className="update-page-body">
              Conducted an in-depth research study on BERT (Bidirectional Encoder Representations
              from Transformers) architecture and its applications in natural language understanding.
              Presented findings to faculty members at Ahmedabad University, exploring fine-tuning
              strategies, transfer learning, and downstream NLP task performance.
            </p>
          </div>
        </div>

        {/* Area of Interest */}
        <div className="update-page-item reveal-up">
          <div className="update-page-left">
            <span className="update-page-tag">Expertise</span>
          </div>
          <div className="update-page-right">
            <div className="update-page-title">Area of Interest &amp; Focus</div>
            <p className="update-page-body">
              Keen interest in applying machine learning, deep learning, and computer vision
              techniques to real-world challenges — particularly in predictive analytics, large-scale
              dataset preparation, and generating actionable business insights. Passionate about
              bridging the gap between academic AI research and production-ready deployment
              solutions that address genuine human challenges.
            </p>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
