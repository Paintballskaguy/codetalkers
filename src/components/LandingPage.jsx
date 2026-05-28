import { useState } from 'react';
import LandingHeader from './landing/LandingHeader';
import HeroSection from './landing/HeroSection';
import KineticTicker from './landing/KineticTicker';
import BentoFeatures from './landing/BentoFeatures';
import ROICalculator from './landing/ROICalculator';
import PortfolioGrid from './landing/PortfolioGrid';
import BookingTicket from './landing/BookingTicket';
import LandingFooter from './landing/LandingFooter';

export default function LandingPage() {
  const [currentTheme, setCurrentTheme] = useState('brutalist');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [opsCost, setOpsCost] = useState(3000);
  const [friction, setFriction] = useState(40);

  return (
    <div
      className={`theme-${currentTheme} ${isDarkMode ? 'mode-dark' : 'mode-light'}`}
      style={{
        position: 'relative',
        overflowX: 'hidden',
        paddingBottom: '40px',
        minHeight: '100vh',
        background: 'hsl(var(--bg-base))',
        transition: 'background-color 0.5s ease, color 0.3s ease',
      }}
    >
      {/* Floating Gradient Blurs (Hidden in light mode for crisp contrast) */}
      {isDarkMode && (
        <>
          <div
            aria-hidden="true"
            className="hero-blur hero-blur-violet"
          />
          <div
            aria-hidden="true"
            className="hero-blur hero-blur-pink"
          />
        </>
      )}

      <main id="main-content">
        <LandingHeader
          currentTheme={currentTheme}
          setCurrentTheme={setCurrentTheme}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <HeroSection isDarkMode={isDarkMode} />

      <KineticTicker />

      <BentoFeatures />

      <PortfolioGrid />

      <ROICalculator
        opsCost={opsCost}
        setOpsCost={setOpsCost}
        friction={friction}
        setFriction={setFriction}
      />

        <BookingTicket />

        <LandingFooter isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
