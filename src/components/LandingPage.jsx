import React, { useState } from 'react';

const DEVELOPER_SQUAD = [
  { name: 'John Wilson', role: 'Founder & Lead Engineer', icon: '💻', bio: 'Engineers custom booking tools, secure client databases, and lightning-fast full-stack platform architectures.' },
  { name: 'Melissa Wilson', role: 'Co-Founder & UI/UX Director', icon: '🎨', bio: 'Fuses traditional geometric aesthetic precision with modern typography to make small businesses look world-class.' },
  { name: 'Gabe Ihloff', role: 'Machine Learning Engineer', icon: '🤖', bio: 'Integrates responsive AI diagnostics, localized NLP workflows, and predictive client-overhead metrics.' },
  { name: 'Hailee & Nathan', role: 'Technical Contributors', icon: '⚡', bio: 'Supported by Hailee Evans and Nathan Wilson to scale local SEO frameworks and edge database pipelines.' }
];

export default function LandingPage({ onEnterDashboard }) {
  const [currentTheme, setCurrentTheme] = useState('brutalist');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [opsCost, setOpsCost] = useState(3000);
  const [friction, setFriction] = useState(40);
  
  // Perforated Ticket Booking States
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [isTearAnimating, setIsTearAnimating] = useState(false);
  const [isTornCompletely, setIsTornCompletely] = useState(false);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!businessName || !businessEmail) return;
    
    // Trigger tear-off animation
    setIsTearAnimating(true);
    setTimeout(() => {
      setIsTornCompletely(true);
    }, 1200);
  };

  // ROI Calculator Calculations
  const calculatedSavings = Math.round(opsCost * 0.40 + (friction / 100) * opsCost * 0.45);
  const calculatedEfficiency = (1.4 + (friction / 100) * 1.8).toFixed(1);
  const modernizationScore = Math.min(100, Math.round(50 + (friction * 0.75))).toString();

  const getScoreColor = (score) => {
    const val = parseInt(score);
    if (val > 80) return 'hsl(var(--accent-pink))';
    if (val > 65) return 'hsl(var(--accent-violet))';
    return 'hsl(var(--accent-blue))';
  };

  return (
    <div className={`theme-${currentTheme} ${isDarkMode ? 'mode-dark' : 'mode-light'}`} style={{ position: 'relative', overflowX: 'hidden', paddingBottom: '40px', minHeight: '100vh', background: 'hsl(var(--bg-base))', transition: 'background-color 0.5s ease, color 0.3s ease' }}>

      {/* Floating Gradient Blurs (Hidden in light mode for crisp contrast) */}
      {isDarkMode && (
        <>
          <div style={{
            position: 'absolute',
            top: '-10%',
            left: '20%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsla(var(--accent-violet) / 0.08) 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: -1,
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'absolute',
            top: '40%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsla(var(--accent-pink) / 0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: -1,
            pointerEvents: 'none'
          }} />
        </>
      )}

      {/* Glass Navigation Header (Themed) */}
      <header className="themed-header" style={{
        position: 'sticky',
        top: '20px',
        zIndex: 1000,
        margin: '0 20px',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Brand Representation: Image + High Readability Text Mark */}
        <a 
          href="#mission" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            textDecoration: 'none',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector('img');
            if (img) img.style.transform = 'scale(1.1) rotate(5deg)';
            const txt = e.currentTarget.querySelector('span');
            if (txt) txt.style.color = 'hsl(var(--accent-pink))';
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector('img');
            if (img) img.style.transform = 'scale(1) rotate(0deg)';
            const txt = e.currentTarget.querySelector('span');
            if (txt) txt.style.color = 'hsl(var(--text-primary))';
          }}
        >
          <img 
            src="/logo.png" 
            alt="CodeTalkers Logo" 
            style={{ 
              width: '42px', 
              height: '42px', 
              objectFit: 'contain',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          />
          <span style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: '20px', 
            fontWeight: '800', 
            letterSpacing: '-0.03em',
            color: 'hsl(var(--text-primary))',
            transition: 'color 0.3s ease'
          }}>
            CodeTalkers
          </span>
        </a>

        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Segmented Theme Switcher Control Deck */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            background: 'rgba(128,128,128,0.06)', 
            padding: '4px', 
            borderRadius: '9999px', 
            border: '1.5px solid rgba(128,128,128,0.12)',
            marginRight: '8px'
          }}>
            <button 
              onClick={() => setCurrentTheme('brutalist')} 
              style={{ 
                border: 'none', 
                background: currentTheme === 'brutalist' ? 'hsl(var(--text-primary))' : 'transparent', 
                color: currentTheme === 'brutalist' ? 'hsl(var(--bg-base))' : 'hsl(var(--text-secondary))', 
                cursor: 'pointer', 
                padding: '6px 12px', 
                borderRadius: '9999px', 
                fontSize: '11px', 
                fontWeight: '800', 
                transition: 'var(--transition-fast)' 
              }}
              title="Brutalist Design System"
            >
              ⚡ Brutal
            </button>
            <button 
              onClick={() => setCurrentTheme('minimalist')} 
              style={{ 
                border: 'none', 
                background: currentTheme === 'minimalist' ? 'hsl(var(--text-primary))' : 'transparent', 
                color: currentTheme === 'minimalist' ? 'hsl(var(--bg-base))' : 'hsl(var(--text-secondary))', 
                cursor: 'pointer', 
                padding: '6px 12px', 
                borderRadius: '9999px', 
                fontSize: '11px', 
                fontWeight: '800', 
                transition: 'var(--transition-fast)' 
              }}
              title="Clean Minimalist UI"
            >
              ✨ Sleek
            </button>
            <button 
              onClick={() => setCurrentTheme('organic')} 
              style={{ 
                border: 'none', 
                background: currentTheme === 'organic' ? 'hsl(var(--text-primary))' : 'transparent', 
                color: currentTheme === 'organic' ? 'hsl(var(--bg-base))' : 'hsl(var(--text-secondary))', 
                cursor: 'pointer', 
                padding: '6px 12px', 
                borderRadius: '9999px', 
                fontSize: '11px', 
                fontWeight: '800', 
                transition: 'var(--transition-fast)' 
              }}
              title="Traditional Organic Earthy Warm Theme"
            >
              🪵 Warm
            </button>
          </div>

          {/* Light / Dark Mode Toggle Switch */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{ 
              border: 'none', 
              background: 'rgba(128,128,128,0.06)', 
              color: 'hsl(var(--text-primary))', 
              cursor: 'pointer', 
              width: '36px',
              height: '36px', 
              borderRadius: '50%', 
              fontSize: '14px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid rgba(128,128,128,0.12)',
              transition: 'all 0.3s ease',
              marginRight: '12px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(128,128,128,0.15)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(128,128,128,0.06)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <a href="#mission" style={{ color: 'hsl(var(--text-secondary))', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--accent-pink))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--text-secondary))'}>Our Mission</a>
          <a href="#bento" style={{ color: 'hsl(var(--text-secondary))', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--accent-pink))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--text-secondary))'}>Solutions</a>
          <a href="#calculator" style={{ color: 'hsl(var(--text-secondary))', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'hsl(var(--accent-pink))'} onMouseLeave={(e) => e.target.style.color = 'hsl(var(--text-secondary))'}>ROI Calculator</a>
          <button onClick={onEnterDashboard} className="btn-brutal">
            Dev Toolkit ⚡
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="mission" style={{ padding: '100px 40px 60px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <div className="step-badge step-badge-tip floating-element" style={{ padding: '8px 16px', fontSize: '13px', letterSpacing: '0.08em', borderRadius: '0px', border: '1px solid hsl(var(--text-primary))' }}>
          ✨ WE DESIGN, WE CODE, WE LAUNCH
        </div>

        <h1 style={{ fontSize: '64px', fontWeight: '800', lineHeight: 1.1, maxWidth: '1000px', margin: '0 auto', letterSpacing: '-0.04em', color: 'hsl(var(--text-primary))' }}>
          Making Your Website <span className="shimmer-gradient-text">Look Amazing</span> & Bringing More Clients Through the Door
        </h1>

        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '18px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
          We are **CodeTalkers** — a family-owned website design and full-stack development firm run by John Wilson, Melissa Wilson, and our close developer squad. We modernize legacy systems and build custom digital platforms to get local small businesses booked.
        </p>

        {/* Wordmark Emblem placement */}
        <div style={{ marginTop: '10px', marginBottom: '10px' }} className="floating-element">
          <img 
            src="/wordmark.png" 
            alt="CodeTalkers Premium Wordmark"
            style={{ maxHeight: '60px', opacity: 0.95, filter: isDarkMode ? 'drop-shadow(0 0 20px hsla(var(--accent-violet) / 0.15))' : 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="#ticket" className="btn-brutal">Secure Your Website Quote</a>
          <button onClick={onEnterDashboard} className="btn-brutal" style={{ background: 'rgba(128,128,128,0.06)', color: 'hsl(var(--text-primary))', border: '2px solid rgba(128,128,128,0.12)' }}>Explore Toolkit</button>
        </div>
      </section>

      {/* Infinite Horizontal Kinetic Ticker */}
      <div className="ticker-container">
        <div className="ticker-content">
          <div className="ticker-item">✦ WE WEAVE TRADITIONAL DESIGN</div>
          <div className="ticker-item">✦ WE WRITE HIGH-PERFORMANCE REACT</div>
          <div className="ticker-item">✦ WE MODERNIZES WEB ASSETS</div>
          <div className="ticker-item">✦ GET CLIENTS IN YOUR DOOR</div>
          <div className="ticker-item">✦ 100% HAND-CODED IN OKLAHOMA</div>
          
          {/* Double content for loop scroll */}
          <div className="ticker-item">✦ WE WEAVE TRADITIONAL DESIGN</div>
          <div className="ticker-item">✦ WE WRITE HIGH-PERFORMANCE REACT</div>
          <div className="ticker-item">✦ WE MODERNIZES WEB ASSETS</div>
          <div className="ticker-item">✦ GET CLIENTS IN YOUR DOOR</div>
          <div className="ticker-item">✦ 100% HAND-CODED IN OKLAHOMA</div>
        </div>
      </div>

      {/* Bento Grid Feature Section (Themed) */}
      <section id="bento" style={{ padding: '80px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '38px', fontWeight: '800', color: 'hsl(var(--text-primary))' }}>Custom Solutions. Zero Templates.</h2>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>Tactile, human-crafted engineering designed to outperform standard automated page builders.</p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Modern Web Rebuilds */}
          <div className="themed-card bento-col-8" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '24px' }}>
            <div>
              <span className="step-badge step-badge-info" style={{ marginBottom: '16px', borderRadius: '0px' }}>Full-Stack Web Engineering</span>
              <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px', color: 'hsl(var(--text-primary))' }}>Modern, Edge-Hosted Web Platforms</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '15px', lineHeight: '1.7' }}>
                We replace clunky, template-based websites with bespoke codebase setups built using serverless React/Vite frontends and FastAPI backends. Our sites deploy to global Edge networks, ensuring near-instant local page loading and flawless mobile rendering.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
              <div style={{ padding: '16px', background: 'rgba(128,128,128,0.06)', border: '1px solid rgba(128,128,128,0.12)' }}>
                <h4 style={{ color: 'hsl(var(--accent-violet))', fontSize: '20px', fontWeight: '800' }}>Instant</h4>
                <span style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Client Load Speeds</span>
              </div>
              <div style={{ padding: '16px', background: 'rgba(128,128,128,0.06)', border: '1px solid rgba(128,128,128,0.12)' }}>
                <h4 style={{ color: 'hsl(var(--accent-pink))', fontSize: '20px', fontWeight: '800' }}>Responsive</h4>
                <span style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Flawless Layouts</span>
              </div>
              <div style={{ padding: '16px', background: 'rgba(128,128,128,0.06)', border: '1px solid rgba(128,128,128,0.12)' }}>
                <h4 style={{ color: 'hsl(var(--accent-emerald))', fontSize: '20px', fontWeight: '800' }}>Secure</h4>
                <span style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Database Backups</span>
              </div>
            </div>
          </div>

          {/* Card 2: Aesthetic Excellence */}
          <div className="themed-card themed-card-emerald bento-col-4" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span className="step-badge step-badge-success" style={{ marginBottom: '16px', borderRadius: '0px' }}>Creative Edge</span>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'hsl(var(--text-primary))' }}>Aesthetic Excellence</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '14px', lineHeight: '1.6' }}>
                We ensure your business commands attention. Fusing clean displays with traditional geometric feather motifs, we design digital interfaces that are stunning, customized, and memorable.
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <img 
                src="/logo.png" 
                alt="Pawnee Logo" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  objectFit: 'contain',
                  border: '2px solid rgba(128,128,128,0.15)', 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
                }}
              />
            </div>
          </div>

          {/* Card 3: Small Business Focus */}
          <div className="themed-card themed-card-amber bento-col-4" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span className="step-badge step-badge-warning" style={{ marginBottom: '16px', borderRadius: '0px' }}>Our Mission</span>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'hsl(var(--text-primary))' }}>Getting Clients Booked</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '14px', lineHeight: '1.6' }}>
                Our job is simple: make you look world-class and bring more clients to your business. We engineer out client dropouts, establishing smooth contact loops, optimized calendars, and high-conversion client forms.
              </p>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(128,128,128,0.06)', border: '1px solid rgba(128,128,128,0.12)', fontSize: '13px' }}>
              <p style={{ fontWeight: '600', color: 'hsl(var(--text-primary))' }}>💼 Client Growth Mappings:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', color: 'hsl(var(--text-secondary))', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>Auto-save client forms</li>
                <li>Friction-free online bookings</li>
                <li>Optimized local search engine keywords</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Dev Squad */}
          <div className="themed-card bento-col-8" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span className="step-badge step-badge-tip" style={{ marginBottom: '16px', borderRadius: '0px' }}>Core Agency Squad</span>
              <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: 'hsl(var(--text-primary))' }}>Meet the CodeTalkers Squad</h3>
              <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '15px' }}>
                We are a group of dedicated local Native software engineers committed to elevating local businesses.
              </p>
            </div>

            <div className="squad-grid">
              {DEVELOPER_SQUAD.map((dev, i) => (
                <div key={i} className="glass-panel" style={{ padding: '20px', background: 'rgba(128,128,128,0.02)', border: '1px solid rgba(128,128,128,0.08)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>{dev.icon}</div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'hsl(var(--text-primary))' }}>{dev.name}</h4>
                  <span style={{ fontSize: '11px', color: 'hsl(var(--accent-violet))', fontWeight: '600' }}>{dev.role}</span>
                  <p style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', marginTop: '8px', lineHeight: '1.4' }}>{dev.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Business Calculator Widget (Themed) */}
      <section id="calculator" style={{ padding: '60px 40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="themed-card" style={{ padding: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '50px', alignItems: 'center' }}>
            {/* Left Column: Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <span className="step-badge step-badge-tip" style={{ marginBottom: '12px', borderRadius: '0px' }}>Modernization ROI Calculator</span>
                <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px', color: 'hsl(var(--text-primary))' }}>Measure Your Customer Growth</h2>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '15px' }}>
                  Slow websites leak client conversions. Drag the sliders to see how custom-built engineering recaptures monthly business revenue.
                </p>
              </div>

              {/* Slider 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600', fontSize: '15px', color: 'hsl(var(--text-primary))' }}>Current Monthly Web/Ad Overhead</span>
                  <span style={{ color: 'hsl(var(--accent-violet))', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>${opsCost.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="250"
                  value={opsCost}
                  onChange={(e) => setOpsCost(Number(e.target.value))}
                  className="roi-slider"
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600', fontSize: '15px', color: 'hsl(var(--text-primary))' }}>Client Dropout Friction (Bounce Rates)</span>
                  <span style={{ color: 'hsl(var(--accent-pink))', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>{friction}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  step="5"
                  value={friction}
                  onChange={(e) => setFriction(Number(e.target.value))}
                  className="roi-slider"
                />
              </div>
            </div>

            {/* Right Column: Calculated Results Card */}
            <div className="glass-panel" style={{
              padding: '36px',
              background: 'rgba(128,128,128,0.03)',
              border: '1px solid rgba(128,128,128,0.1)',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              <div>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'hsl(var(--text-muted))', marginBottom: '4px' }}>Projected Client Revenue Capture</h4>
                <div style={{ fontSize: '48px', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'hsl(var(--accent-emerald))', lineHeight: 1 }}>
                  ${calculatedSavings.toLocaleString()}
                </div>
                <span style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>*Based on recovery of dropouts & modern conversion capture.</span>
              </div>

              <div style={{ borderTop: '1px solid rgba(128,128,128,0.08)', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <h5 style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', marginBottom: '4px' }}>Client Booking Boost</h5>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'hsl(var(--text-primary))' }}>{calculatedEfficiency}x</div>
                  <span style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>In customer sign-ups</span>
                </div>

                <div>
                  <h5 style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', marginBottom: '4px' }}>Modernization Score</h5>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: getScoreColor(modernizationScore) }}>{modernizationScore}%</div>
                  <span style={{ fontSize: '11px', color: 'hsl(var(--text-secondary))' }}>Optimized client reach</span>
                </div>
              </div>

              <a href="#ticket" className="btn-brutal" style={{ justifyContent: 'center', marginTop: '10px' }}>
                Get More Clients Now ⚡
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skeuomorphic Perforated Booking Ticket */}
      <section id="ticket" style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'hsl(var(--text-primary))' }}>Get Your Custom Web Quote</h2>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>Tear off the perforated stub below to submit your business details directly to John & Melissa.</p>
        </div>

        <div className="ticket-wrapper">
          {/* Main Ticket */}
          <div className="ticket-main">
            {!isTornCompletely ? (
              <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '20px', borderBottom: '1px solid rgba(128,128,128,0.1)', paddingBottom: '12px', color: 'hsl(var(--text-primary))' }}>
                  🎫 TICKET STUB ORDER FORM
                </h3>
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'hsl(var(--text-muted))' }}>
                    YOUR BUSINESS NAME
                  </label>
                  <input 
                    type="text" 
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="custom-input" 
                    placeholder="e.g. Broken Arrow Autoworks"
                    autoComplete="organization"
                    style={{ borderRadius: '4px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'hsl(var(--text-muted))' }}>
                    YOUR CONTACT EMAIL
                  </label>
                  <input 
                    type="email" 
                    required
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="custom-input" 
                    placeholder="e.g. john@business.com"
                    autoComplete="email"
                    style={{ borderRadius: '4px' }}
                  />
                </div>

                <p style={{ fontSize: '12px', color: 'hsl(var(--text-muted))', marginTop: '10px' }}>
                  *Valid for one website modernization audit by the CodeTalkers agency. John & Melissa Wilson will construct a custom strategy mapping your client capture potential.
                </p>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '220px', gap: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px' }}>🎟️</div>
                <h3 style={{ fontSize: '24px', color: 'hsl(var(--accent-emerald))', fontWeight: '800' }}>TICKET SUBMITTED & STUB TORN!</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '450px' }}>
                  Melissa and John Wilson have received your business request. We will review your current website, map your local SEO benchmarks, and contact you at **{businessEmail}** within 24 hours!
                </p>
              </div>
            )}
          </div>

          {/* Ticket Stub (Tears Off) */}
          <div className={`ticket-stub ${isTearAnimating ? 'ticket-torn-stub' : ''}`}>
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '16px',
              textAlign: 'center'
            }}>
              <span className="step-badge step-badge-warning" style={{ borderRadius: '0px', fontSize: '11px' }}>
                CODE: {businessName ? businessName.slice(0, 3).toUpperCase() : 'CT'}-2026
              </span>
              
              {/* Virtual Barcode using simple styled stripes */}
              <div style={{ 
                height: '50px', 
                width: '120px', 
                background: 'white', 
                padding: '6px', 
                display: 'flex', 
                gap: '2px',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ width: '3px', background: 'black', height: '100%' }} />
                <div style={{ width: '1px', background: 'black', height: '100%' }} />
                <div style={{ width: '4px', background: 'black', height: '100%' }} />
                <div style={{ width: '2px', background: 'black', height: '100%' }} />
                <div style={{ width: '1px', background: 'black', height: '100%' }} />
                <div style={{ width: '4px', background: 'black', height: '100%' }} />
                <div style={{ width: '2px', background: 'black', height: '100%' }} />
                <div style={{ width: '3px', background: 'black', height: '100%' }} />
                <div style={{ width: '1px', background: 'black', height: '100%' }} />
              </div>

              <button 
                onClick={handleTicketSubmit}
                disabled={isTearAnimating || !businessName || !businessEmail}
                className="btn-brutal"
                style={{ 
                  fontSize: '12px',
                  padding: '10px 16px',
                  background: isTearAnimating ? '#333' : (!businessName || !businessEmail ? '#777' : 'hsl(var(--accent-pink))'),
                  color: 'white',
                  cursor: (!businessName || !businessEmail) ? 'not-allowed' : 'pointer'
                }}
              >
                {isTearAnimating ? 'Tearing Stub...' : 'Tear Stub to Submit 🎟️'}
              </button>
              
              <span style={{ fontSize: '11px', color: 'hsl(var(--text-muted))', fontStyle: 'italic' }}>
                Fill details to unlock
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Footer (Themed) */}
      <footer className="themed-footer" style={{
        padding: '60px 40px 40px',
        margin: '60px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {/* Main Footer Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          {/* Left Side: Brand info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', textAlign: 'left', maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src="/logo.png" 
                alt="CodeTalkers Logo" 
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
              />
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'hsl(var(--text-primary))' }}>CodeTalkers</h3>
            </div>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '14px', lineHeight: '1.6' }}>
              Weaving traditional geometric precision with low-latency modern website designs to supercharge local small business client volume.
            </p>
          </div>

          {/* Right Side: Built by CodeTalkers Badge with Link */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end', 
            flex: '1', 
            minWidth: '200px', 
            opacity: 0.95 
          }}>
            <a 
              href="#mission" 
              style={{ 
                display: 'block', 
                width: '180px', 
                transition: 'var(--transition-smooth)' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img 
                src="/footer-badge.png" 
                alt="Built by CodeTalkers Footer Badge"
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'contain', 
                  borderRadius: '9999px', 
                  overflow: 'hidden', 
                  border: '2.5px solid rgba(255,255,255,0.25)', 
                  filter: isDarkMode ? 'drop-shadow(0 0 20px hsla(var(--accent-violet) / 0.25))' : 'none'
                }}
              />
            </a>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto',
          borderTop: '1px solid rgba(128,128,128,0.12)', 
          paddingTop: '24px', 
          fontSize: '13px', 
          color: 'hsl(var(--text-muted))' 
        }}>
          <p>© 2026 CodeTalkers. All rights reserved.</p>
          <p>Brother-Sister Crafted in Oklahoma, USA</p>
        </div>
      </footer>
    </div>
  );
}
