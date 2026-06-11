import { useState, useEffect } from 'react';
import LandingHeader from './landing/LandingHeader';
import HeroSection from './landing/HeroSection';
import KineticTicker from './landing/KineticTicker';
import BentoFeatures from './landing/BentoFeatures';
import PortfolioGrid from './landing/PortfolioGrid';
import StatsSection from './landing/StatsSection';
import ROICalculator from './landing/ROICalculator';
import FAQSection from './landing/FAQSection';
import BookingTicket from './landing/BookingTicket';
import LandingFooter from './landing/LandingFooter';

const SECTIONS = ['mission', 'services', 'work', 'about', 'calculator', 'ticket'];

export default function LandingPage() {
  const [opsCost, setOpsCost] = useState(3000);
  const [friction, setFriction] = useState(40);
  const [activeSection, setActiveSection] = useState('mission');

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="theme-minimalist mode-dark"
      style={{
        position: 'relative',
        paddingBottom: '40px',
        minHeight: '100dvh',
        background: 'hsl(var(--bg-base))',
        transition: 'background-color 0.5s ease, color 0.3s ease',
      }}
    >
      {/* Floating Gradient Blobs */}
      <>
        <div
          aria-hidden="true"
          className="hero-blur hero-blur-violet animate-blob"
        />
        <div
          aria-hidden="true"
          className="hero-blur hero-blur-pink animate-blob animation-delay-2000"
        />
      </>

      <main id="main-content">
        <LandingHeader activeSection={activeSection} />

        <HeroSection />

        <KineticTicker />

        <BentoFeatures />

        <PortfolioGrid />

        <StatsSection />

        <ROICalculator
          opsCost={opsCost}
          setOpsCost={setOpsCost}
          friction={friction}
          setFriction={setFriction}
        />

        <FAQSection />

        <BookingTicket />

        <LandingFooter />
      </main>
    </div>
  );
}
