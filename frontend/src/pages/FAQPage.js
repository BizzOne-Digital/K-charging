import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';

const faqs = [
  { category: 'General', q: 'What types of EV chargers do you install?', a: 'We install Level 2 AC chargers (ideal for workplaces and residential properties) and DC fast chargers (for high-traffic commercial locations). We work with all major brands including ChargePoint, Schneider Electric, Tesla, ABB, and more.' },
  { category: 'General', q: 'Do you serve all of Canada?', a: 'Yes. K Charging Solutions operates across Canada. Contact us to discuss your specific location and project requirements.' },
  { category: 'General', q: 'How do I get started?', a: 'Simply fill out our booking form for a free consultation. Our team will assess your property, discuss your needs, and provide a customized proposal within 48 hours.' },
  { category: 'Installation', q: 'How long does installation take?', a: 'Most residential and small commercial installations are completed in 1 day. Larger commercial or fleet depot projects typically take 3–7 business days depending on electrical upgrades and site complexity.' },
  { category: 'Installation', q: 'Do you handle permits and electrical work?', a: 'Yes. We manage everything — site assessment, electrical planning, permit applications, installation, commissioning, and final inspection. You do not need to coordinate with any other contractor.' },
  { category: 'Installation', q: 'What electrical infrastructure do I need?', a: 'This depends on the number of chargers and charger type. We conduct a full electrical assessment during consultation and will recommend any necessary panel upgrades or load management solutions.' },
  { category: 'Commercial', q: 'Can I monetize my EV charging stations?', a: 'Absolutely. We offer networked charging solutions that let you set pricing, accept payments, and generate monthly revenue reports. This is especially popular for commercial properties, hotels, and parking operators.' },
  { category: 'Commercial', q: 'What is smart load management?', a: 'Smart load management distributes available electrical capacity across multiple chargers to prevent overloading your electrical system. This lets you install more chargers without requiring a costly electrical service upgrade.' },
  { category: 'Commercial', q: 'Do you offer fleet charging solutions?', a: 'Yes. We design dedicated fleet charging depots with overnight scheduling, load optimization, and fleet analytics dashboards. We work with logistics companies, transit operators, and corporate fleets of all sizes.' },
  { category: 'Support', q: 'What happens if a charger breaks down?', a: 'All our installations include remote monitoring. Most issues are detected and resolved remotely. For hardware issues, we dispatch a certified technician — response times depend on your maintenance plan.' },
  { category: 'Support', q: 'Do you offer maintenance contracts?', a: 'Yes. We offer monthly and annual maintenance packages that include regular inspections, 24/7 remote monitoring, priority response, and preventive maintenance to maximize uptime.' },
  { category: 'Incentives', q: 'Are there government incentives available?', a: 'Yes. Canada offers federal and provincial programs including the Zero Emission Vehicle Infrastructure Program (ZEVIP) and various provincial rebates. We assist clients in identifying and applying for all available incentives — often reducing project costs by 25–50%.' },
];

const categoryColors = { General: '#3d7fff', Installation: '#f5a623', Commercial: '#22c55e', Support: '#8b5cf6', Incentives: '#f59e0b' };

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const cats = ['All', ...new Set(faqs.map(f => f.category))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #070e1c, #0d1b2e)', padding: '72px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>FAQ</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 16 }}>Frequently Asked Questions</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Everything you need to know about EV charging installation, management, and support.</p>
          </div>
        </div>
        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container" style={{ maxWidth: 820 }}>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36, justifyContent: 'center' }}>
              {cats.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setOpen(null); }} style={{
                  padding: '8px 20px', borderRadius: 100, border: `1px solid ${activeCategory === cat ? '#0d1b2e' : '#e8ecf4'}`,
                  background: activeCategory === cat ? '#0d1b2e' : '#fff', color: activeCategory === cat ? '#fff' : '#64748b',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>{cat}</button>
              ))}
            </div>
            {/* FAQ Items */}
            {filtered.map((faq, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, marginBottom: 10, border: `1px solid ${open === i ? '#f5a623' : '#e8ecf4'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '20px 24px', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: categoryColors[faq.category] || '#94a3b8', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#0d1b2e', lineHeight: 1.4 }}>{faq.q}</span>
                  </div>
                  <FiChevronDown size={18} style={{ flexShrink: 0, color: '#94a3b8', transition: 'transform 0.2s', transform: open === i ? 'rotate(180deg)' : 'none' }} />
                </button>
                {open === i && (
                  <div style={{ padding: '0 24px 20px 44px', color: '#64748b', fontSize: 15, lineHeight: 1.75 }}>{faq.a}</div>
                )}
              </div>
            ))}
            {/* Still have questions CTA */}
            <div style={{ marginTop: 48, background: '#0d1b2e', borderRadius: 16, padding: 36, textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', color: '#fff', fontSize: 20, marginBottom: 10 }}>Still have questions?</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontSize: 15 }}>Our team is happy to answer any specific questions about your project.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Contact Us <FiArrowRight size={15}/></Link>
                <a href="tel:+15146612494" className="btn btn-outline">+1 514 661 2494</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
