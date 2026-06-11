// NOTE: keep these Q&As in sync with the FAQPage JSON-LD in index.html.
// Google requires FAQ schema text to match what's visible on the page.
const FAQS = [
  {
    q: 'How much does a small-business website cost?',
    a: "Every website we build is custom, so the price depends on what your business needs. We quote a clear, flat project price up front — no surprise monthly fees — and the quote is always free. Tell us about your business and we'll send pricing within 24 hours.",
  },
  {
    q: 'How long does it take to build my website?',
    a: "Most small-business websites take a few weeks from kickoff to launch, depending on the size of the site and how quickly we get your content and photos. You'll get a clear timeline along with your quote.",
  },
  {
    q: 'Do you only work with businesses in Oklahoma?',
    a: "We're proudly based in Tulsa, Oklahoma and love working with local businesses, but we build for clients anywhere — the whole process works great online and over the phone.",
  },
  {
    q: 'I already have a website. Can you redesign it instead of starting over?',
    a: "Absolutely. We modernize slow, outdated, or hard-to-update sites all the time. We'll keep what's already working and rebuild what's holding you back.",
  },
  {
    q: 'Will my website work on phones and show up on Google?',
    a: 'Yes. Every site we build is mobile-first and includes the SEO basics — fast loading, clean structure, and proper tags — so customers can find you on Google and use your site on any device.',
  },
  {
    q: 'Do I need to be technical to work with you?',
    a: "Not at all. We handle all the technical parts and explain everything in plain English. You focus on running your business; we'll handle the website.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-header">
        <span className="step-badge step-badge-info badge-flat reveal">Common Questions</span>
        <h2 id="faq-heading" className="reveal">Questions, answered</h2>
        <p className="reveal">
          Straight answers for local business owners — no jargon, no pressure.
        </p>
      </div>

      <div className="faq-list">
        {FAQS.map((item) => (
          <details key={item.q} className="faq-item reveal">
            <summary className="faq-question">
              <span>{item.q}</span>
            </summary>
            <p className="faq-answer">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
