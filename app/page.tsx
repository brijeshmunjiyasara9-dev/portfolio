'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

// Dynamic import for Three.js to avoid SSR issues
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <main className="relative min-h-screen noise">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Sticky background gradient */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, #faf9f7 0%, #f4f0ff 30%, #fff5f7 60%, #f0fff8 100%)',
        zIndex: -1,
      }} />

      {/* Navigation */}
      <Navbar />

      {/* Page Sections */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
