import { useState } from 'react';
import Icon from '../Icon';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function BookingTicket() {
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [isTearAnimating, setIsTearAnimating] = useState(false);
  const [isTornCompletely, setIsTornCompletely] = useState(false);
  const [error, setError] = useState(null);
  const reducedMotion = useReducedMotion();

  const validate = () => {
    if (!businessName.trim() && !businessEmail.trim()) {
      setError('Please fill in both your business name and contact email.');
      return false;
    }
    if (!businessName.trim()) {
      setError('Please enter your business name.');
      return false;
    }
    if (!businessEmail.trim()) {
      setError('Please enter your contact email.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsTearAnimating(true);
    setTimeout(() => {
      setIsTornCompletely(true);
    }, reducedMotion ? 0 : 1200);
  };

  const handleBlur = (field) => {
    return () => {
      const nameVal = businessName.trim();
      const emailVal = businessEmail.trim();
      if (field === 'name' && nameVal) {
        if (!emailVal) setError(null);
        else validate();
      }
      if (field === 'email' && emailVal) {
        validate();
      }
    };
  };

  const handleReset = () => {
    setBusinessName('');
    setBusinessEmail('');
    setIsTearAnimating(false);
    setIsTornCompletely(false);
    setError(null);
  };

  return (
    <section id="ticket" className="ticket-section" aria-labelledby="ticket-heading">
      <div className="ticket-header">
        <h2 id="ticket-heading">Get Your Custom Web Quote</h2>
        <p>Tear off the perforated stub below to submit your business details directly to John &amp; Melissa.</p>
      </div>

      <div className="ticket-wrapper">
        {/* Main Ticket */}
        <div className="ticket-main">
          {!isTornCompletely ? (
            <form onSubmit={handleTicketSubmit} noValidate>
              <h3 className="ticket-form-title">
                <Icon name="ticket" size={16} /> TICKET STUB ORDER FORM
              </h3>

              {error && (
                <div className="ticket-error" role="alert">
                  <Icon name="alert" size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-field">
                <label htmlFor="business-name">YOUR BUSINESS NAME <span aria-hidden="true" className="required-mark">*</span></label>
                <input
                  id="business-name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  onBlur={handleBlur('name')}
                  className="custom-input"
                  placeholder="e.g. Broken Arrow Autoworks"
                  autoComplete="organization"
                />
                <span className="input-helper">We will use this to personalize your quote.</span>
              </div>

              <div className="form-field">
                <label htmlFor="business-email">YOUR CONTACT EMAIL <span aria-hidden="true" className="required-mark">*</span></label>
                <input
                  id="business-email"
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  onBlur={handleBlur('email')}
                  className="custom-input"
                  placeholder="e.g. john@business.com"
                  autoComplete="email"
                />
                <span className="input-helper">We will contact you at this address within 24 hours.</span>
              </div>

              <p className="ticket-disclaimer">
                *Valid for one website modernization audit by the CodeTalkers agency. John &amp; Melissa Wilson will construct a custom strategy mapping your client capture potential.
              </p>
            </form>
          ) : (
            <div className="ticket-success" role="status" aria-live="polite">
              <div className="ticket-success-icon" aria-hidden="true">
                <Icon name="check" size={48} />
              </div>
              <h3>TICKET SUBMITTED &amp; STUB TORN!</h3>
              <p>
                Melissa and John Wilson have received your business request. We will review your current website, map your local SEO benchmarks, and contact you at <strong>{businessEmail}</strong> within 24 hours!
              </p>
              <button onClick={handleReset} className="btn-brutal ticket-reset">
                Submit Another Request <Icon name="arrowRight" size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Ticket Stub */}
        <div
          className={`ticket-stub ${isTearAnimating && !reducedMotion ? 'ticket-torn-stub' : ''}`}
          style={reducedMotion && isTearAnimating ? { opacity: 0, transform: 'translateX(100px)' } : undefined}
        >
          <div className="ticket-stub-inner">
            <span className="step-badge step-badge-warning badge-flat">
              CODE: {businessName ? businessName.slice(0, 3).toUpperCase() : 'CT'}-2026
            </span>

            <div className="ticket-barcode" aria-hidden="true">
              {[3, 1, 4, 2, 1, 4, 2, 3, 1].map((w, i) => (
                <div key={i} style={{ width: `${w}px` }} />
              ))}
            </div>

            <button
              onClick={handleTicketSubmit}
              disabled={isTearAnimating || !businessName || !businessEmail}
              className="btn-brutal ticket-submit"
              aria-label="Submit booking request by tearing ticket stub"
            >
              {isTearAnimating ? (
                <>
                  <Icon name="loader" size={14} className="spin-animation" />
                  Tearing Stub…
                </>
              ) : (
                <>
                  Tear Stub to Submit <Icon name="ticket" size={16} />
                </>
              )}
            </button>

            <span className="ticket-hint">Fill details to unlock</span>
          </div>
        </div>
      </div>
    </section>
  );
}
