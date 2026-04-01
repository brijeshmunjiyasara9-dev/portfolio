/**
 * Database abstraction layer.
 *
 * - Local / dev  → better-sqlite3  (fast, synchronous, file-based)
 * - Vercel / prod → @libsql/client  (Turso or file:// URL via env vars)
 *
 * Set these environment variables in Vercel:
 *   TURSO_DATABASE_URL   e.g. libsql://your-db.turso.io
 *   TURSO_AUTH_TOKEN     your Turso auth token
 *
 * If neither is set the code falls back to a local SQLite file at ./data/portfolio.db
 * which works fine for local `next dev` but won't persist on Vercel serverless.
 */

import bcrypt from 'bcryptjs';

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface DbRow { [key: string]: unknown }

/* ─── Adapter interface ──────────────────────────────────────────────────── */
interface DbAdapter {
  get(sql: string, params?: unknown[]): Promise<DbRow | undefined>;
  all(sql: string, params?: unknown[]): Promise<DbRow[]>;
  run(sql: string, params?: unknown[]): Promise<{ lastInsertRowid?: number | bigint }>;
  exec(sql: string): Promise<void>;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  BETTER-SQLITE3  (synchronous, Node.js only – great for local dev)         */
/* ─────────────────────────────────────────────────────────────────────────── */
function makeSqliteAdapter(db: import('better-sqlite3').Database): DbAdapter {
  return {
    async get(sql, params = []) {
      return db.prepare(sql).get(...params) as DbRow | undefined;
    },
    async all(sql, params = []) {
      return db.prepare(sql).all(...params) as DbRow[];
    },
    async run(sql, params = []) {
      const r = db.prepare(sql).run(...params);
      return { lastInsertRowid: r.lastInsertRowid };
    },
    async exec(sql) {
      db.exec(sql);
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  LIBSQL / TURSO  (async HTTP – works on Vercel serverless)                 */
/* ─────────────────────────────────────────────────────────────────────────── */
function makeLibsqlAdapter(client: import('@libsql/client').Client): DbAdapter {
  return {
    async get(sql, params = []) {
      const rs = await client.execute({ sql, args: params as import('@libsql/client').InValue[] });
      if (rs.rows.length === 0) return undefined;
      const row = rs.rows[0];
      const obj: DbRow = {};
      rs.columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    },
    async all(sql, params = []) {
      const rs = await client.execute({ sql, args: params as import('@libsql/client').InValue[] });
      return rs.rows.map(row => {
        const obj: DbRow = {};
        rs.columns.forEach((col, i) => { obj[col] = row[i]; });
        return obj;
      });
    },
    async run(sql, params = []) {
      const rs = await client.execute({ sql, args: params as import('@libsql/client').InValue[] });
      return { lastInsertRowid: rs.lastInsertRowid };
    },
    async exec(sql) {
      // Execute multi-statement DDL one statement at a time
      const stmts = sql.split(';').map(s => s.trim()).filter(Boolean);
      for (const stmt of stmts) {
        await client.execute(stmt);
      }
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Singleton adapter                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
let adapter: DbAdapter | null = null;
let initialized = false;

async function getAdapter(): Promise<DbAdapter> {
  if (adapter) return adapter;

  const tursoUrl   = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;

  if (tursoUrl) {
    // ── Turso / remote libSQL ──────────────────────────────────────────────
    const { createClient } = await import('@libsql/client');
    const client = createClient({
      url: tursoUrl,
      authToken: tursoToken,
    });
    adapter = makeLibsqlAdapter(client);
  } else {
    // ── Local better-sqlite3 ──────────────────────────────────────────────
    const path = await import('path');
    const { mkdirSync } = await import('fs');
    const Database = (await import('better-sqlite3')).default;
    const dbPath = path.join(process.cwd(), 'data', 'portfolio.db');
    mkdirSync(path.dirname(dbPath), { recursive: true });
    const db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    adapter = makeSqliteAdapter(db);
  }

  return adapter;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Public DB accessor                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
export async function getDb(): Promise<DbAdapter> {
  const db = await getAdapter();
  if (!initialized) {
    initialized = true;
    await initSchema(db);
    await seedData(db);
  }
  return db;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Schema                                                                     */
/* ─────────────────────────────────────────────────────────────────────────── */
async function initSchema(db: DbAdapter) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS about (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      headline TEXT NOT NULL,
      paragraph1 TEXT NOT NULL,
      paragraph2 TEXT NOT NULL,
      visible INTEGER DEFAULT 1
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      num TEXT NOT NULL,
      name TEXT NOT NULL,
      tech TEXT NOT NULL,
      detail TEXT NOT NULL,
      image TEXT NOT NULL,
      visible INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      tag TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Past Role',
      visible INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      role TEXT NOT NULL,
      skills_list TEXT NOT NULL,
      image TEXT NOT NULL,
      visible INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    )
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      institution TEXT NOT NULL,
      tag TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT NOT NULL,
      visible INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    )
  `);
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Seed                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
async function seedData(db: DbAdapter) {
  // Admin
  const adminExists = await db.get('SELECT id FROM admin WHERE username = ?', ['brijesh']);
  if (!adminExists) {
    const hash = bcrypt.hashSync('brijesh@admin2024', 10);
    await db.run('INSERT INTO admin (username, password) VALUES (?, ?)', ['brijesh', hash]);
  }

  // About
  const aboutRow = await db.get('SELECT COUNT(*) as c FROM about');
  if ((aboutRow?.c as number) === 0) {
    await db.run(
      'INSERT INTO about (headline, paragraph1, paragraph2) VALUES (?, ?, ?)',
      [
        'Passionate\nAbout Real-World\nAI Impact',
        'As an MTech student in Computer Science at Ahmedabad University, I specialise in machine learning, deep learning, and computer vision — turning complex datasets into actionable insights.',
        'From flood-prediction models at BISAG-N (MeitY) to healthcare analytics at WebRepp HK, I bridge the gap between cutting-edge research and real deployable solutions.',
      ]
    );
  }

  // Projects
  const projRow = await db.get('SELECT COUNT(*) as c FROM projects');
  if ((projRow?.c as number) === 0) {
    const projects = [
      ['(I)', 'Document Management System', 'MEAN Stack · RAG · NLP', 'NLP & LLM Integration', 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80&auto=format', 1],
      ['(II)', 'Human Stress Observatory', 'Bayesian Modeling · ELSI Index', 'Human System Stress Observatory (HSSO)', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format', 2],
      ['(III)', 'Personalised Brain Network Analysis', 'GNN · fMRI · Deep Learning', 'Neuroscience · Graph Neural Networks', 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80&auto=format', 3],
      ['(IV)', 'UAV ReID-Based Tracking', 'YOLO · DeepSORT · Computer Vision', 'Evaluating ReID Algorithms for UAV Videos', 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80&auto=format', 4],
      ['(V)', 'Satellite Image Processing', 'Remote Sensing · Atmospheric Correction', 'BISAG-N · MeitY · Gandhinagar', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&q=80&auto=format', 5],
      ['(VI)', 'Flood Prediction Model', 'Machine Learning · IJSRST Published', 'Natural Disaster Prediction', 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80&auto=format', 6],
      ['(VII)', 'RAG-Based Disaster Chatbot', 'RAG · LLM · NLP Pipeline', 'Conversational AI · BISAG-N', 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format', 7],
      ['(VIII)', 'Healthcare Analytics Dashboard', 'ETL · Power BI · PostgreSQL', 'WebRepp HK · Pandemic Preparedness', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&auto=format', 8],
    ];
    for (const p of projects) {
      await db.run('INSERT INTO projects (num, name, tech, detail, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)', p);
    }
  }

  // Experience
  const expRow = await db.get('SELECT COUNT(*) as c FROM experience');
  if ((expRow?.c as number) === 0) {
    const exps = [
      ['BISAG-N (MeitY), Gandhinagar', 'Natural Disaster Prediction & Management', 'Internship · Govt. of India', 'May 2025 – Apr 2026', 'Working at Bhaskaracharya National Institute for Space Applications and Geo-Informatics (BISAG-N), a premier organisation under the Ministry of Electronics and IT, Government of India. Responsibilities include flood forecasting using satellite remote sensing data, building ETL pipelines for geospatial datasets, and developing a RAG-based conversational AI chatbot for disaster management queries.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&auto=format', 'Current Role', 1],
      ['WebRepp HK, Hong Kong', 'Healthcare Data Analyst', 'Analytics · Hong Kong', 'Mar 2025 – Jul 2025', 'Developed end-to-end healthcare analytics solutions for a Hong Kong-based tech firm. Built interactive dashboards tracking healthcare KPIs, designed a pandemic preparedness scoring system, and implemented data pipelines for health trend analysis.', 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80&auto=format', 'Past Role', 2],
      ['Ahmedabad University', 'Teaching Assistant — Python Fundamentals', 'Academic · Teaching', 'Ongoing', 'Supporting faculty in delivering Python programming fundamentals to undergraduate students. Conducting lab sessions, assisting with assignments, and mentoring students through foundational concepts in data structures, algorithms, and introductory data science with Python.', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=80&auto=format', 'Academic Role', 3],
      ['Team Leader', 'Cross-functional Project Lead', 'Leadership', 'Jun 2023 – Jul 2023', 'Led a cross-functional project team, coordinating technical deliverables, managing timelines, and ensuring collaborative output across disciplines. Developed skills in agile project management, stakeholder communication, and team motivation.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80&auto=format', 'Leadership', 4],
    ];
    for (const e of exps) {
      await db.run('INSERT INTO experience (company, role, tag, period, description, image, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', e);
    }
  }

  // Skills
  const skillRow = await db.get('SELECT COUNT(*) as c FROM skills');
  if ((skillRow?.c as number) === 0) {
    const skills = [
      ['Machine Learning & AI', 'Core Expertise', 'TensorFlow · PyTorch · Scikit-learn · OpenCV · YOLO · DeepSORT', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80&auto=format', 1],
      ['Cloud & DevOps', 'Infrastructure', 'AWS Academy Certified · Azure ML Studio · Docker · CI/CD Pipelines', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80&auto=format', 2],
      ['Programming Languages', 'Languages', 'Python · C · C++ · SQL · JavaScript', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&q=80&auto=format', 3],
      ['Data Engineering', 'Data Stack', 'ETL Pipelines · Hadoop · PostgreSQL · Power BI · Pandas · NumPy', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80&auto=format', 4],
      ['NLP & LLMs', 'Natural Language Processing', 'BERT · RAG · MarianMT · LangChain · Hugging Face Transformers', 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80&auto=format', 5],
      ['Remote Sensing & GIS', 'Geospatial', 'Satellite Image Processing · Atmospheric Correction · BISAG-N · Flood Modelling', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&q=80&auto=format', 6],
    ];
    for (const s of skills) {
      await db.run('INSERT INTO skills (category, role, skills_list, image, sort_order) VALUES (?, ?, ?, ?, ?)', s);
    }
  }

  // Education
  const eduRow = await db.get('SELECT COUNT(*) as c FROM education');
  if ((eduRow?.c as number) === 0) {
    const edus = [
      ['MTech in Computer Science & Engineering', 'Ahmedabad University', 'Education · Pursuing', '2024 — Present', 'School of Engineering and Applied Science, Ahmedabad University. CGPA: 3.03/4.00. Specialising in Artificial Intelligence, Machine Learning, and Data Engineering. Active research in flood prediction modelling, NLP pipelines, and remote sensing applications. Teaching Assistant for Python Fundamentals.', 1],
      ['Bachelor of Engineering (Computer Engineering)', 'LDRP Institute of Technology & Research', 'Education', '2020 — 2024', 'Kadi Sarva Vidhyalay University. CGPA: 6.64/10. LDRP Institute of Technology and Research, Gandhinagar. Built strong foundations in computer science: data structures, algorithms, databases, computer networks, and software engineering principles.', 2],
      ['AWS Academy Graduate — Cloud Foundations', 'Amazon Web Services', 'Certification', '2024', 'Completed Amazon Web Services Academy Cloud Foundations programme, gaining expertise in core AWS services, cloud architecture patterns, security best practices, pricing models, and deployment strategies for scalable cloud-based applications.', 3],
      ['NPTEL Certified — Python for Data Science', 'NPTEL', 'Certification · NPTEL', '2023', 'Nationally recognised NPTEL certification in Python for Data Science. Covered NumPy, Pandas, Matplotlib, Scikit-learn, and statistical analysis methodologies for data-driven decision making.', 4],
      ['Research Paper Published — IJSRST', 'International Journal of Scientific Research in Science & Technology', 'Research · Published', 'May 2025 – Sep 2025', 'Research paper on flood prediction using machine learning published in IJSRST — a peer-reviewed international journal. The paper explores advanced ML techniques applied to satellite and meteorological data for accurate flood event prediction and early warning systems.', 5],
      ['Research Study on BERT — Presented to Faculty', 'Ahmedabad University', 'Research Study', 'Jul 2022 – Jan 2023', 'Conducted an in-depth research study on BERT (Bidirectional Encoder Representations from Transformers) architecture and its applications in natural language understanding. Presented findings to faculty members at Ahmedabad University.', 6],
    ];
    for (const e of edus) {
      await db.run('INSERT INTO education (title, institution, tag, period, description, sort_order) VALUES (?, ?, ?, ?, ?, ?)', e);
    }
  }
}
