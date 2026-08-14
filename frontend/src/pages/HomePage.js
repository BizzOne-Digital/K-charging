import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import {
  FiCalendar, FiArrowRight, FiCheck, FiStar, FiChevronDown,
  FiZap, FiShield, FiGlobe, FiClock, FiTrendingUp, FiCpu
} from 'react-icons/fi';
import { MdElectricCar, MdOutlineElectricalServices } from 'react-icons/md';

const features = [
  { icon: FiShield, label: 'Certified Installation' },
  { icon: FiZap, label: 'Fast & Reliable Chargers' },
  { icon: FiTrendingUp, label: 'Scalable Solutions' },
  { icon: FiClock, label: '24/7 Support' },
  { icon: FiGlobe, label: 'Energy-Efficient' },
  { icon: FiCpu, label: 'Future-Ready' },
];

const stats = [
  { value: '500+', label: 'Chargers Installed' },
  { value: '200+', label: 'Happy Clients' },
  { value: '98%', label: 'Uptime Guaranteed' },
  { value: '24/7', label: 'Support Available' },
];

const serviceIcons = {
  'Commercial EV Charging': MdElectricCar,
  'Fleet Charging Solutions': FiTrendingUp,
  'Workplace Charging': FiGlobe,
  'Residential & Multi-Unit': FiShield,
  'Installation & Maintenance': MdOutlineElectricalServices,
  'Smart Charging Management': FiCpu,
};

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data)).catch(() => {});
    api.get('/testimonials').then(r => setTestimonials(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const faqs = [
    { q: 'How long does a commercial EV charger installation take?', a: 'Most commercial installations are completed within 1-3 days depending on the scope. We handle everything from permits to commissioning.' },
    { q: 'What types of EV chargers do you install?', a: 'We install Level 2 AC chargers (ideal for overnight/workplace) and DC fast chargers (for high-traffic commercial use). We work with all major brands.' },
    { q: 'Do you offer maintenance and support after installation?', a: 'Yes. All installations come with ongoing monitoring and support. We offer maintenance packages with guaranteed response times.' },
    { q: 'Can you handle large fleet charging depots?', a: 'Absolutely. We specialize in fleet depot design with smart load management, overnight scheduling optimization, and fleet analytics dashboards.' },
    { q: 'Is there government funding available for EV charging?', a: 'Yes, various Canadian and provincial programs offer rebates and grants for EV infrastructure. We help our clients navigate all available incentives.' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(90deg, rgba(7,14,28,0.55) 0%, rgba(7,14,28,0.3) 55%, rgba(7,14,28,0.15) 100%), url(/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>

        {/* Gold glow orb */}
        <div style={{
          position: 'absolute', top: '20%', right: '15%', width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(61,127,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div className="container" style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', zIndex: 1, maxWidth: 1400, marginLeft: 0, paddingLeft: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center' }}>
            {/* Left */}
            <div style={{ maxWidth: 700 }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(245,166,35,0.4)', borderRadius: 100,
                padding: '7px 18px', marginBottom: 32,
              }}>
                <FiZap size={13} color="#f5a623" />
                <span style={{ color: '#f5a623', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Smart. Reliable. Future-Ready.
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(36px, 5vw, 62px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.08,
                marginBottom: 24,
                letterSpacing: '-0.02em',
              }}>
                Powering the Future<br />
                with{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f5a623, #ffd06e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Smart EV</span>
                <br />Charging Solutions
              </h1>

              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
                End-to-end EV charging for commercial properties, workplaces, fleets, and multi-unit residential buildings. From consultation to maintenance — we power your EV journey.
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/booking" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
                  <FiCalendar size={16} /> Book a Consultation
                </Link>
                <Link to="/services" className="btn btn-outline" style={{ fontSize: 15, padding: '14px 28px' }}>
                  Explore Our Solutions <FiArrowRight size={16} />
                </Link>
              </div>

              {/* Trust indicators */}
              <div style={{ display: 'flex', gap: 24, marginTop: 48, flexWrap: 'wrap' }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800, color: '#f5a623', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature bar */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)', padding: '20px 0',
        }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                  <f.icon size={18} color="#f5a623" />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, whiteSpace: 'nowrap' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media(max-width:900px){section > div.container > div{grid-template-columns:1fr !important} .feature-grid{grid-template-columns:repeat(2,1fr) !important}}`}</style>
      </section>

      <style>{`
        @media(max-width:960px){ .services-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:640px){ .services-grid{ grid-template-columns:1fr !important; } }
      `}</style>

      {/* ===== SERVICES ===== */}
      <section className="section reveal" style={{ background: '#f8f9fc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><FiZap size={12} /> Our Services</div>
            <h2 className="section-title">Complete EV Charging Solutions</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From initial consultation to ongoing maintenance — we cover every aspect of your EV charging journey.
            </p>
          </div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {services.map((service, i) => {
              const Icon = serviceIcons[service.title] || FiZap;
              return (
                <div key={service._id} style={{
                  background: '#fff', borderRadius: 16, padding: 32,
                  border: '1px solid #e8ecf4',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#f5a623'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8ecf4'; }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(13,27,46,0.08), rgba(245,166,35,0.1))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  }}>
                    <Icon size={24} color="#0d1b2e" />
                  </div>
                  <h3 style={{ fontSize: 18, fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0d1b2e', marginBottom: 10 }}>{service.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>{service.shortDescription}</p>
                  {service.features?.slice(0, 3).map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <FiCheck size={14} color="#22c55e" />
                      <span style={{ fontSize: 13, color: '#475569' }}>{f}</span>
                    </div>
                  ))}
                  <Link to={`/services/${service.slug}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20,
                    fontSize: 14, fontWeight: 600, color: '#0d1b2e',
                  }}>Learn More <FiArrowRight size={14} /></Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section reveal" style={{ background: '#0d1b2e' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="section-label"><FiShield size={12} /> Why K Charging</div>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontFamily: 'Space Grotesk', fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.15 }}>
                The EV Infrastructure Partner Built for Business
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 36, fontSize: 16 }}>
                We don't just install chargers — we design future-ready infrastructure that grows with your business, integrates with your operations, and delivers measurable ROI.
              </p>
              {[
                { title: 'Certified & Insured', desc: 'Licensed electricians and EV infrastructure specialists with full liability coverage.' },
                { title: 'Smart Technology', desc: 'Cloud-based management, load balancing, and detailed analytics for every installation.' },
                { title: 'End-to-End Service', desc: 'From site assessment and permits to installation, commissioning, and maintenance.' },
                { title: 'Business-First Approach', desc: 'We align EV charging strategy with your operational needs and budget.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: 'rgba(245,166,35,0.15)',
                    border: '1px solid rgba(245,166,35,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FiCheck size={16} color="#f5a623" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/booking" className="btn btn-primary" style={{ marginTop: 8 }}>
                Get a Free Assessment <FiArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: i % 2 === 0 ? 'rgba(245,166,35,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(245,166,35,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 40, fontWeight: 800, color: i % 2 === 0 ? '#f5a623' : '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {testimonials.length > 0 && (
        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label"><FiStar size={12} /> Client Stories</div>
              <h2 className="section-title">What Our Clients Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {testimonials.map((t, i) => (
                <div key={t._id} style={{
                  background: '#fff', borderRadius: 16, padding: 32,
                  border: '1px solid #e8ecf4', boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {[...Array(t.rating || 5)].map((_, si) => (
                      <FiStar key={si} size={16} color="#f5a623" fill="#f5a623" />
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>"{t.content}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {t.avatar
                      ? <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                      : <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0d1b2e, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>{t.name.charAt(0)}</div>
                    }
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#0d1b2e' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}{t.company ? `, ${t.company}` : ''}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== HOW IT WORKS ===== */}
      <section className="section reveal" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><FiCpu size={12} /> Our Process</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A simple, transparent process from first call to fully operational charging station.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
            {[
              { step: '01', title: 'Consultation', desc: 'We assess your site, usage needs, and budget to recommend the right charging solution.' },
              { step: '02', title: 'Design & Permits', desc: 'Our team designs the electrical layout and handles all permitting and utility coordination.' },
              { step: '03', title: 'Installation', desc: 'Certified electricians install and commission your chargers with minimal disruption.' },
              { step: '04', title: 'Ongoing Support', desc: '24/7 monitoring, maintenance, and smart charging management keep you running.' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative', padding: 28, borderRadius: 16, background: '#f8f9fc', border: '1px solid #e8ecf4' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: 800, color: 'rgba(245,166,35,0.3)', marginBottom: 12 }}>{item.step}</div>
                <h3 style={{ fontSize: 17, fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0d1b2e', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1b2e 0%, #163258 100%)',
        padding: '72px 0', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Ready to Power Your Property?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 520, margin: '0 auto 32px' }}>
            Book a free consultation with our EV infrastructure specialists and get a custom charging plan for your business.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/booking" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
              <FiCalendar size={16} /> Book a Consultation
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ fontSize: 15, padding: '14px 28px' }}>
              Contact Us <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section reveal">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Common Questions</h2>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              border: '1px solid #e8ecf4', borderRadius: 12, marginBottom: 12,
              overflow: 'hidden', transition: 'border-color 0.2s',
              borderColor: openFaq === i ? '#f5a623' : '#e8ecf4',
            }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: '100%', padding: '20px 24px', background: '#fff',
                border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 15, fontWeight: 600, color: '#0d1b2e', cursor: 'pointer', textAlign: 'left',
              }}>
                {faq.q}
                <FiChevronDown size={18} style={{ flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'none', color: '#94a3b8' }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', color: '#64748b', fontSize: 14, lineHeight: 1.75, background: '#fff' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
