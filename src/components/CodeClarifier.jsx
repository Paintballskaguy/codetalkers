import React, { useState, useEffect } from 'react';

export default function CodeClarifier({ defaultSnippet }) {
  const [code, setCode] = useState(`// Paste or write your code block here to try it!
function calculatePayout(hours, rate) {
  const baseSalary = hours * rate;
  let bonus = 0;
  
  if (hours > 40) {
    const overtimeHours = hours - 40;
    bonus = overtimeHours * (rate * 0.5);
  }
  
  return baseSalary + bonus;
}`);
  const [language, setLanguage] = useState('javascript');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (defaultSnippet) {
      setCode(defaultSnippet.code);
      setLanguage(defaultSnippet.language);
      
      const autoClarify = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/clarify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: defaultSnippet.code, language: defaultSnippet.language }),
          });

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || 'Failed to analyze code snippet.');
          }

          const data = await response.json();
          setResult(data);
          setActiveStepIndex(0);
        } catch (err) {
          console.error(err);
          setError(err.message || 'Server error. Make sure the Python backend is running.');
        } finally {
          setIsLoading(false);
        }
      };
      autoClarify();
    }
  }, [defaultSnippet]);


  const handleClarify = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clarify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to analyze code snippet.');
      }

      const data = await response.json();
      setResult(data);
      setActiveStepIndex(0);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Server error. Make sure the Python backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStepBadgeClass = (severity) => {
    switch (severity) {
      case 'success': return 'step-badge-success';
      case 'warning': return 'step-badge-warning';
      case 'tip': return 'step-badge-tip';
      default: return 'step-badge-info';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>
          Code <span className="text-gradient-purple-pink">Clarifier</span>
        </h2>
        <p style={{ color: 'hsl(var(--text-secondary))' }}>
          Submit any codebase snippet and watch our Python engine analyze structure, highlight key logic, and map interactive walk-throughs.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'hsl(var(--text-secondary))' }}>
                Programming Language
              </label>
              <select 
                className="custom-select" 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML / Template</option>
                <option value="css">CSS</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
                onClick={handleClarify}
                disabled={isLoading}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isLoading ? 'Analyzing...' : 'Clarify Snippet'}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'hsl(var(--text-secondary))' }}>
              Code Block Input
            </label>
            <textarea 
              className="custom-textarea" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your script snippet here..."
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '20px', borderColor: 'hsla(var(--accent-pink) / 0.3)', background: 'hsla(var(--accent-pink) / 0.05)' }}>
          <p style={{ color: 'hsl(var(--accent-pink))', fontWeight: '600' }}>⚠️ {error}</p>
        </div>
      )}

      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Summary Metadata Card */}
          <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(16,16,20,0.8) 0%, rgba(26,20,40,0.4) 100%)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Snippet Diagnostics</h3>
              <div className="step-badge step-badge-tip" style={{ fontSize: '13px' }}>
                Complexity: {result.complexity}
              </div>
            </div>
            
            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '20px', fontSize: '15px' }}>
              {result.summary}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {result.insights.has_loops && (
                <span className="step-badge step-badge-tip">Contains Iteration Loops</span>
              )}
              {result.insights.has_db_calls && (
                <span className="step-badge step-badge-info">Triggers database/I-O calls</span>
              )}
              {result.insights.has_auth && (
                <span className="step-badge step-badge-warning">Security/Auth Context</span>
              )}
              {result.insights.functions_found.map((func, i) => (
                <span key={i} className="step-badge step-badge-success">Function: {func}</span>
              ))}
            </div>
          </div>

          {/* Code Viewer & Dynamic Stepper Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
            {/* Left Column: Code Line Viewer */}
            <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
              <h4 style={{ fontSize: '16px', color: 'hsl(var(--text-secondary))', marginBottom: '16px' }}>Code Block Structure</h4>
              <div className="code-container">
                {code.split('\n').map((line, idx) => {
                  const lineNum = idx + 1;
                  const isActiveLine = result.steps[activeStepIndex]?.line_number === lineNum;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`code-line ${isActiveLine ? 'code-line-highlighted' : ''}`}
                    >
                      <span className="code-line-number">{lineNum}</span>
                      <span className="code-line-content">{line}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Step Annotations Panel */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '16px', color: 'hsl(var(--text-secondary))' }}>Step Walkthrough</h4>
                  <span style={{ fontSize: '13px', color: 'hsl(var(--text-muted))', fontWeight: '500' }}>
                    Step {activeStepIndex + 1} of {result.steps.length}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Step Detail Card */}
                  <div 
                    className="glass-panel" 
                    style={{ 
                      padding: '20px', 
                      background: 'rgba(255,255,255,0.02)', 
                      borderColor: 'rgba(255,255,255,0.06)' 
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className={`step-badge ${getStepBadgeClass(result.steps[activeStepIndex]?.severity)}`}>
                        {result.steps[activeStepIndex]?.title || 'Annotation'}
                      </span>
                      <span style={{ fontSize: '13px', color: 'hsl(var(--text-muted))' }}>
                        Line {result.steps[activeStepIndex]?.line_number}
                      </span>
                    </div>

                    <p style={{ fontSize: '15px', color: 'hsl(var(--text-primary))', lineHeight: '1.7' }}>
                      {result.steps[activeStepIndex]?.explanation}
                    </p>
                  </div>

                  {/* Complete List of Steps for Direct Clicking */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
                    {result.steps.map((step, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setActiveStepIndex(idx)}
                        className="glass-panel glass-panel-interactive"
                        style={{ 
                          padding: '12px 16px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px',
                          background: activeStepIndex === idx ? 'rgba(255,255,255,0.05)' : 'transparent',
                          borderColor: activeStepIndex === idx ? 'hsla(var(--accent-violet) / 0.4)' : 'rgba(255,255,255,0.04)',
                        }}
                      >
                        <span className={`step-dot step-dot-${step.severity}`} />
                        <span style={{ 
                          fontSize: '13px', 
                          fontWeight: activeStepIndex === idx ? '600' : '400',
                          color: activeStepIndex === idx ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))'
                        }}>
                          {step.title} (Line {step.line_number})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginTop: '24px' }}>
                <button 
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeStepIndex === 0}
                >
                  ◀ Previous
                </button>
                <button 
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setActiveStepIndex(prev => Math.min(result.steps.length - 1, prev + 1))}
                  disabled={activeStepIndex === result.steps.length - 1}
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
