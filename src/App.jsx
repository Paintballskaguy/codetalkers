import React, { useState } from 'react';
import CodeClarifier from './components/CodeClarifier';
import SnippetShowcase from './components/SnippetShowcase';
import LandingPage from './components/LandingPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  const handleSelectSnippet = (snippet) => {
    setSelectedSnippet(snippet);
    setActiveTab('clarify');
  };

  // If active tab is home, display full marketing landing page
  if (activeTab === 'home') {
    return <LandingPage onEnterDashboard={() => setActiveTab('clarify')} />;
  }

  return (
    <div className="app-container">
      {/* Dynamic Animated background mesh */}
      <div className="app-bg-mesh" />

      {/* Responsive Glass Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <img 
              src="/logo.png" 
              alt="CodeTalkers Logo" 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                objectFit: 'cover',
                boxShadow: '0 4px 15px -3px hsla(var(--accent-violet) / 0.5)'
              }} 
            />
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '800', lineHeight: 1 }}>CodeTalkers</h1>
              <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                v1.0.0 (Vercel)
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('home')}
              className="glass-panel glass-panel-interactive"
              style={{ 
                padding: '14px 20px', 
                width: '100%', 
                textAlign: 'left',
                border: 'none',
                color: 'hsl(var(--text-secondary))',
                background: 'transparent',
                borderColor: 'rgba(255,255,255,0.02)',
                fontWeight: '400',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>🏠</span> Home Portal
            </button>

            <button 
              onClick={() => {
                setSelectedSnippet(null);
                setActiveTab('clarify');
              }}
              className="glass-panel glass-panel-interactive"
              style={{ 
                padding: '14px 20px', 
                width: '100%', 
                textAlign: 'left',
                border: 'none',
                color: activeTab === 'clarify' ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))',
                background: activeTab === 'clarify' ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderColor: activeTab === 'clarify' ? 'hsla(var(--accent-violet) / 0.4)' : 'rgba(255,255,255,0.02)',
                fontWeight: activeTab === 'clarify' ? '600' : '400',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>🔍</span> Code Clarifier
            </button>

            <button 
              onClick={() => setActiveTab('showcase')}
              className="glass-panel glass-panel-interactive"
              style={{ 
                padding: '14px 20px', 
                width: '100%', 
                textAlign: 'left',
                border: 'none',
                color: activeTab === 'showcase' ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))',
                background: activeTab === 'showcase' ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderColor: activeTab === 'showcase' ? 'hsla(var(--accent-violet) / 0.4)' : 'rgba(255,255,255,0.02)',
                fontWeight: activeTab === 'showcase' ? '600' : '400',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>✨</span> Snippet Showcase
            </button>

            <button 
              onClick={() => setActiveTab('about')}
              className="glass-panel glass-panel-interactive"
              style={{ 
                padding: '14px 20px', 
                width: '100%', 
                textAlign: 'left',
                border: 'none',
                color: activeTab === 'about' ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))',
                background: activeTab === 'about' ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderColor: activeTab === 'about' ? 'hsla(var(--accent-violet) / 0.4)' : 'rgba(255,255,255,0.02)',
                fontWeight: activeTab === 'about' ? '600' : '400',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>⚙️</span> About Platform
            </button>
          </nav>
        </div>

        {/* Footer Credits */}
        <div style={{ borderTop: '1px solid hsl(var(--border-subtle))', paddingTop: '20px', fontSize: '12px', color: 'hsl(var(--text-muted))' }}>
          <p>Logged in as **Lead Architect**</p>
          <p style={{ marginTop: '4px' }}>© 2026 Filtrex Service Group</p>
        </div>
      </aside>

      {/* Main Dashboard Section */}
      <main className="main-content">
        {activeTab === 'clarify' && (
          <CodeClarifier defaultSnippet={selectedSnippet} />
        )}

        {activeTab === 'showcase' && (
          <SnippetShowcase onSelectSnippet={handleSelectSnippet} />
        )}

        {activeTab === 'about' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>
                About <span className="text-gradient-purple-pink">CodeTalkers</span>
              </h2>
              <p style={{ color: 'hsl(var(--text-secondary))' }}>
                Learn about the architectural foundation of our monorepo deployment system.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '20px', color: 'hsl(var(--accent-violet))' }}>System Integration Architecture</h3>
              <p>
                **CodeTalkers** utilizes a custom monorepo stack combining a lightweight **React** single-page application built on **Vite** with a serverless **Python FastAPI** microservice backend.
              </p>
              
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginTop: '10px' }}>Monorepo Deployment Details:</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'hsl(var(--text-secondary))' }}>
                <li>**Vercel configuration** (`vercel.json`) intercepts all `/api/*` endpoint triggers and redirects them to `api/index.py`.</li>
                <li>**Local development** proxies all frontend fetch calls seamlessly from port `5173` to port `8000` through built-in Vite server configuration.</li>
                <li>**Static Frontend Assets** compile to lightweight production code and are instantly served by Vercel Edge Networks.</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
