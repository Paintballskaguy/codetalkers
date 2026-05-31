import Icon from '../Icon';

export default function ROICalculator({ opsCost, setOpsCost, friction, setFriction }) {
  const calculatedSavings = Math.round(opsCost * 0.40 + (friction / 100) * opsCost * 0.45);
  const calculatedEfficiency = (1.4 + (friction / 100) * 1.8).toFixed(1);
  const modernizationScore = Math.min(100, Math.round(50 + (friction * 0.75))).toString();

  const getScoreClass = (score) => {
    const val = parseInt(score);
    if (val > 65) return 'text-accent';
    return 'text-accent-blue';
  };

  return (
    <section id="calculator" className="roi-section" aria-labelledby="roi-heading">
      <div className="themed-card roi-card reveal">
        <div className="roi-grid">
          {/* Left Column: Sliders */}
          <div className="roi-sliders">
            <div>
              <span className="step-badge step-badge-tip badge-flat">Modernization ROI Calculator</span>
              <h2 id="roi-heading">Measure Your Customer Growth</h2>
              <p>
                Slow websites leak client conversions. Drag the sliders to see how custom-built engineering recaptures monthly business revenue.
              </p>
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Current Monthly Web/Ad Overhead</span>
                <span className="slider-value text-accent">
                  ${opsCost.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={opsCost}
                onChange={(e) => setOpsCost(Number(e.target.value))}
                className="roi-slider"
                aria-label="Current monthly web and ad overhead"
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Client Dropout Friction (Bounce Rates)</span>
                <span className="slider-value text-accent">
                  {friction}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={friction}
                onChange={(e) => setFriction(Number(e.target.value))}
                className="roi-slider"
                aria-label="Client dropout friction percentage"
              />
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="glass-panel roi-results">
            <div>
              <h4 className="results-label">Projected Client Revenue Capture</h4>
              <div className="results-big text-accent" aria-live="polite" aria-atomic="true">
                ${calculatedSavings.toLocaleString()}
              </div>
              <span className="results-note">*Based on recovery of dropouts &amp; modern conversion capture.</span>
            </div>

            <div className="results-split">
              <div>
                <h5>Client Booking Boost</h5>
                <div className="results-mid">{calculatedEfficiency}x</div>
                <span>In customer sign-ups</span>
              </div>
              <div>
                <h5>Modernization Score</h5>
                <div className={`results-mid ${getScoreClass(modernizationScore)}`}>
                  {modernizationScore}%
                </div>
                <span>Optimized client reach</span>
              </div>
            </div>

            <a href="#ticket" className="btn-brutal roi-cta">
              Get More Clients Now <Icon name="zap" size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
