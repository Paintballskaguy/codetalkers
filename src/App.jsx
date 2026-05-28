import LandingPage from './components/LandingPage';

export default function App() {
  return (
    <>
      {/* Skip to content for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Organic textured grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />
      <LandingPage />
    </>
  );
}
