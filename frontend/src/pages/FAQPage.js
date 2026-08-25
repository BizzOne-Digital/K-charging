import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';

const faqs = [
  { category: 'Leasing', q: 'How does the site leasing model work?', a: 'We lease unused parking space from malls, supermarkets, and roadside businesses and install Tesla & FLO charging hubs on it at our own expense. In return, you receive steady lease income for the term of the agreement.' },
  { category: 'Leasing', q: 'Does it cost anything to lease my property to you?', a: 'No. There is zero upfront cost to the property owner. We cover the hardware, installation, permits, and grid upgrades ourselves.' },
  { category: 'Leasing', q: 'How much space do you need?', a: 'This depends on the number of stalls and charger type. During a free site assessment, we evaluate your property and recommend a phased rollout that scales with real EV demand.' },
  { category: 'Hardware', q: 'What charging hardware do you use?', a: 'We procure, deploy, and own elite commercial charging hardware directly from Tesla and FLO — ensuring top reliability, fast charging speeds, and cross-vehicle compatibility.' },
  { category: 'Hardware', q: 'Who owns and maintains the equipment?', a: 'We do. K Charging Solutions owns all installed hardware and is fully responsible for its maintenance, upgrades, and performance for the life of the lease.' },
  { category: 'Installation', q: 'How long does installation take?', a: 'Our team handles all engineering, utility permits, site design, and electrical upgrades. Timelines vary by site complexity, but most installations are completed within a few weeks of the lease agreement.' },
  { category: 'Installation', q: 'Do you handle permits and grid integration?', a: 'Yes. We manage everything — site assessment, electrical planning, permit applications, utility coordination, installation, and commissioning. You do not need to coordinate with any other contractor.' },
  { category: 'Retail Benefit', q: 'How does this benefit my supermarket or mall?', a: 'High-speed charging hubs bring high-value EV drivers directly to your property, significantly increasing foot traffic, dwell time, and retail spend while their vehicle charges.' },
  { category: 'Operations', q: 'What happens if a charger breaks down?', a: '24/7 proactive monitoring flags issues immediately, backed by a 98%+ uptime guarantee, a performance warranty, and priority maintenance response.' },
  { category: 'Operations', q: 'How is billing and payment handled?', a: 'All payment processing runs through a PCI-compliant billing system for secure, reliable transactions — fully managed by us, with no involvement required from the property owner.' },
  { category: 'Operations', q: 'What support does the property owner get?', a: 'You get a dedicated business support line plus real-time station status, so any issue with your charging hub is flagged and resolved without you having to manage it.' },
  { category: 'Other Sectors', q: 'Do you work with fleets, cities, and utilities?', a: 'Yes. We offer end-to-end fleet electrification with subsidy guidance, time-of-use and demand response programs for utilities, and curbside charging plus grant guidance (including the federal CFI program) for cities and municipalities.' },
];

const categoryColors = { Leasing: '#2f9e55', Hardware: '#1a7d3c', Installation: '#22c55e', 'Retail Benefit': '#8b5cf6', Operations: '#f59e0b', 'Other Sectors': '#0ea5e9' };

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const cats = ['All', ...new Set(faqs.map(f => f.category))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #052414, #0b3d24)', padding: '72px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>FAQ</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 16 }}>Frequently Asked Questions</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Everything you need to know about our zero-CapEx site leasing model, Tesla & FLO hardware, and fully managed operations.</p>
          </div>
        </div>
        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container" style={{ maxWidth: 820 }}>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36, justifyContent: 'center' }}>
              {cats.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setOpen(null); }} style={{
                  padding: '8px 20px', borderRadius: 100, border: `1px solid ${activeCategory === cat ? '#0b3d24' : '#e8ecf4'}`,
                  background: activeCategory === cat ? '#0b3d24' : '#fff', color: activeCategory === cat ? '#fff' : '#64748b',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>{cat}</button>
              ))}
            </div>
            {/* FAQ Items */}
            {filtered.map((faq, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, marginBottom: 10, border: `1px solid ${open === i ? '#1a7d3c' : '#e8ecf4'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '20px 24px', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: categoryColors[faq.category] || '#94a3b8', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#0b3d24', lineHeight: 1.4 }}>{faq.q}</span>
                  </div>
                  <FiChevronDown size={18} style={{ flexShrink: 0, color: '#94a3b8', transition: 'transform 0.2s', transform: open === i ? 'rotate(180deg)' : 'none' }} />
                </button>
                {open === i && (
                  <div style={{ padding: '0 24px 20px 44px', color: '#64748b', fontSize: 15, lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            ))}
            {/* Still have questions CTA */}
            <div style={{ marginTop: 48, background: '#0b3d24', borderRadius: 16, padding: 36, textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', color: '#fff', fontSize: 20, marginBottom: 10 }}>Still have questions?</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontSize: 15 }}>Our team is happy to answer any specific questions about your project.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Contact Us <FiArrowRight size={15}/></Link>
                <a href="tel:+14387656550" className="btn btn-outline">+1 (438) 765-6550</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
