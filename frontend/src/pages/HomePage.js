import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import {
  FiCalendar, FiArrowRight, FiCheck, FiStar, FiChevronDown,
  FiZap, FiShield, FiGlobe, FiClock, FiTrendingUp, FiCpu,
  FiHome, FiTool, FiCreditCard, FiHeadphones, FiMapPin, FiTruck
} from 'react-icons/fi';
import { MdElectricCar, MdOutlineElectricalServices } from 'react-icons/md';

const features = [
  { icon: FiHome, label: 'Zero Upfront Cost' },
  { icon: FiZap, label: 'Tesla & FLO Hardware' },
  { icon: FiTool, label: 'Grid Integration' },
  { icon: FiShield, label: 'FLO Authorized Partner' },
  { icon: FiClock, label: '24/7 Monitoring' },
  { icon: FiCreditCard, label: 'PCI-Compliant Billing' },
];

const stats = [
  { value: '$0', label: 'Upfront Cost to You' },
  { value: '98%+', label: 'Uptime Guarantee' },
  { value: '24/7', label: 'Monitoring & Support' },
  { value: 'Tesla / FLO', label: 'Certified Hardware' },
];

const serviceIcons = {
  'Zero-CapEx Site Leasing': FiHome,
  'Premium Hardware: Tesla & FLO': MdElectricCar,
  'End-to-End Installation & Grid Integration': MdOutlineElectricalServices,
  'Increased Foot Traffic & Dwell Time': FiTrendingUp,
  'Fully Managed Charging Operations': FiShield,
};

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data)).catch(() => {}).finally(() => setServicesLoading(false));
    api.get('/testimonials').then(r => setTestimonials(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const faqs = [
    { q: 'Does it cost anything to lease my parking space to you?', a: 'No. There is zero upfront cost to the property owner. We cover the hardware, installation, permits, and grid upgrades, and pay you lease income in return.' },
    { q: 'Who owns and maintains the charging equipment?', a: 'We do. We procure, install, and own the Tesla and FLO commercial charging hardware, and handle 100% of the ongoing maintenance and network management.' },
    { q: 'What happens if a charger breaks down?', a: 'Our 24/7 monitoring flags issues immediately, backed by a 98%+ uptime guarantee, a performance warranty, and priority maintenance response.' },
    { q: 'How does this benefit my supermarket or mall?', a: 'High-speed charging hubs attract affluent EV drivers directly to your property, increasing foot traffic, dwell time, and retail spend while their vehicle charges.' },
    { q: 'Do you work with fleets, cities, and utilities too?', a: 'Yes. We offer end-to-end fleet electrification, time-of-use and demand response programs for utilities, and curbside charging and grant guidance for municipalities.' },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="hero-section" style={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(90deg, rgba(3,20,11,0.97) 0%, rgba(3,20,11,0.9) 30%, rgba(3,20,11,0.55) 55%, rgba(3,20,11,0.15) 75%, rgba(3,20,11,0) 90%), url(/hero1.png)',
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
          background: 'radial-gradient(circle, rgba(26,125,60,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(47,158,85,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div className="container" style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', zIndex: 1, maxWidth: 1400, marginLeft: 0, paddingLeft: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center' }}>
            {/* Left */}
            <div style={{ maxWidth: 700 }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(26,125,60,0.4)', borderRadius: 100,
                padding: '7px 18px', marginBottom: 32,
              }}>
                <FiZap size={13} color="#1a7d3c" />
                <span style={{ color: '#1a7d3c', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  FLO Authorized Partner
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
                Turn Unused Parking<br />
                into{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #1a7d3c, #4ade80)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Steady Income</span>
                <br />with Zero Upfront Cost
              </h1>

              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
                We lease unused parking space from malls, supermarkets, and roadside businesses and install Tesla & FLO fast-charging hubs at our own expense — you earn lease income and increased foot traffic, completely hands-off.
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link to="/booking" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
                  <FiCalendar size={16} /> Lease Your Property
                </Link>
                <Link to="/services" className="btn btn-outline" style={{ fontSize: 15, padding: '14px 28px' }}>
                  Explore Our Solutions <FiArrowRight size={16} />
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="hero-stats" style={{ display: 'flex', gap: 24, marginTop: 48, flexWrap: 'wrap' }}>
                {stats.map((s, i) => (
                  <div key={i} style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800, color: '#1a7d3c', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature bar */}
        <div className="feature-bar" style={{
          background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)', padding: '20px 0',
        }}>
          <div className="container">
            <div className="feature-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {features.map((f, i) => (
                <div key={i} className="feature-item" style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                  <f.icon size={18} color="#1a7d3c" className="feature-icon" />
                  <span className="feature-label" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500, whiteSpace: 'nowrap' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media(max-width:900px){section > div.container > div{grid-template-columns:1fr !important} .feature-grid{grid-template-columns:repeat(2,1fr) !important}}
          @media(max-width:768px){
            .hero-section{
              background-image: linear-gradient(180deg, rgba(5,36,20,0.6) 0%, rgba(5,36,20,0.45) 55%, rgba(5,36,20,0.75) 100%), url(/mobile-hero.png) !important;
              background-position: center top !important;
              min-height: auto !important;
              padding-bottom: 40px;
            }
            .hero-section .container{ padding-left: 20px !important; padding-top: 90px !important; padding-bottom: 40px !important; }
            .hero-section h1{ font-size: 34px !important; }
            .hero-section p{ font-size: 15px !important; }
            .hero-stats{ display: flex !important; flex-direction: column !important; gap: 16px !important; text-align: left !important; }
            .feature-bar{
              backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
              background: transparent !important; border-top: none !important;
              padding: 0 16px 20px !important; margin-top: -32px !important;
            }
            .feature-bar .container{ padding: 0 !important; }
            .feature-grid{
              display: flex !important; grid-template-columns: none !important;
              gap: 0 !important; overflow-x: auto !important; flex-wrap: nowrap !important;
              background: rgba(3,20,11,0.9) !important; border: 1px solid rgba(255,255,255,0.08) !important;
              border-radius: 16px !important; padding: 16px 8px !important;
              -webkit-overflow-scrolling: touch !important; scrollbar-width: none !important;
            }
            .feature-grid::-webkit-scrollbar{ display: none !important; }
            .feature-item{
              flex-direction: column !important; justify-content: center !important;
              align-items: center !important; gap: 6px !important; flex: 0 0 auto !important;
              width: 96px !important; text-align: center !important;
            }
            .feature-label{ white-space: normal !important; font-size: 12px !important; line-height: 1.3 !important; }
          }
        `}</style>
      </section>

      <style>{`
        @media(max-width:960px){ .services-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:640px){ .services-grid{ grid-template-columns:1fr !important; } }
      `}</style>

      {/* ===== SERVICES ===== */}
      <section className="section reveal" style={{ background: '#f8f9fc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><FiZap size={12} /> What We Do</div>
            <h2 className="section-title">A Zero-CapEx EV Charging Partnership</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              We lease your unused space, own the hardware, run the installation, and manage the entire operation — you collect the lease income.
            </p>
          </div>
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {servicesLoading && [...Array(6)].map((_, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e8ecf4' }}>
                <div className="skeleton" style={{ width: 52, height: 52, borderRadius: 12, marginBottom: 20 }} />
                <div className="skeleton" style={{ width: '70%', height: 20, borderRadius: 6, marginBottom: 14 }} />
                <div className="skeleton" style={{ width: '100%', height: 14, borderRadius: 6, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: '85%', height: 14, borderRadius: 6, marginBottom: 24 }} />
                <div className="skeleton" style={{ width: '60%', height: 14, borderRadius: 6, marginBottom: 8 }} />
                <div className="skeleton" style={{ width: '50%', height: 14, borderRadius: 6 }} />
              </div>
            ))}
            {!servicesLoading && services.map((service, i) => {
              const Icon = serviceIcons[service.title] || FiZap;
              return (
                <div key={service._id} style={{
                  background: '#fff', borderRadius: 16, padding: 32,
                  border: '1px solid #e8ecf4',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#1a7d3c'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e8ecf4'; }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(11,61,36,0.08), rgba(26,125,60,0.1))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                  }}>
                    <Icon size={24} color="#0b3d24" />
                  </div>
                  <h3 style={{ fontSize: 18, fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0b3d24', marginBottom: 10 }}>{service.title}</h3>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>{service.shortDescription}</p>
                  {service.features?.slice(0, 3).map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <FiCheck size={14} color="#22c55e" />
                      <span style={{ fontSize: 13, color: '#475569' }}>{f}</span>
                    </div>
                  ))}
                  <Link to={`/services/${service.slug}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20,
                    fontSize: 14, fontWeight: 600, color: '#0b3d24',
                  }}>Learn More <FiArrowRight size={14} /></Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section reveal" style={{ background: '#0b3d24' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="section-label"><FiShield size={12} /> Why Property Owners Partner With Us</div>
              <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontFamily: 'Space Grotesk', fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.15 }}>
                Passive Income, Zero Hassle
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 36, fontSize: 16 }}>
                We fund, install, and operate the entire charging hub on your property. You provide the space — we handle everything else and pay you lease income for it.
              </p>
              {[
                { title: 'Zero Upfront Cost', desc: 'We cover hardware, installation, permits, and grid upgrades — no capital investment from you.' },
                { title: 'Tesla & FLO Hardware', desc: 'We procure and own elite commercial charging hardware from industry leaders for top reliability and speed.' },
                { title: 'Fully Managed Operations', desc: 'Network monitoring, payment processing, maintenance, and driver support — all handled for you.' },
                { title: 'More Customers, Longer Visits', desc: 'High-speed charging hubs bring affluent EV drivers to your property and increase dwell time and retail spend.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: 'rgba(26,125,60,0.15)',
                    border: '1px solid rgba(26,125,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <FiCheck size={16} color="#1a7d3c" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/booking" className="btn btn-primary" style={{ marginTop: 8 }}>
                Get a Free Site Assessment <FiArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: i % 2 === 0 ? 'rgba(26,125,60,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(26,125,60,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 40, fontWeight: 800, color: i % 2 === 0 ? '#1a7d3c' : '#fff', lineHeight: 1 }}>{s.value}</div>
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
                      <FiStar key={si} size={16} color="#1a7d3c" fill="#1a7d3c" />
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>"{t.content}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {t.avatar
                      ? <img src={t.avatar} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                      : <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0b3d24, #1a7d3c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>{t.name.charAt(0)}</div>
                    }
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#0b3d24' }}>{t.name}</div>
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
            <h2 className="section-title">How the Lease Partnership Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A simple, transparent process from first call to a fully operational, revenue-generating charging hub.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
            {[
              { step: '01', title: 'Site Assessment', desc: 'We evaluate your property, traffic, and grid capacity to design a phased rollout plan.' },
              { step: '02', title: 'Lease & Permits', desc: 'We sign a lease for the space and handle all engineering, permits, and utility coordination — at no cost to you.' },
              { step: '03', title: 'Installation', desc: 'Our team installs and commissions Tesla & FLO charging hardware with minimal disruption to your property.' },
              { step: '04', title: 'Hands-Off Operations', desc: '24/7 monitoring, billing, maintenance, and driver support — you simply collect the lease income.' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative', padding: 28, borderRadius: 16, background: '#f8f9fc', border: '1px solid #e8ecf4' }}>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: 36, fontWeight: 800, color: 'rgba(26,125,60,0.3)', marginBottom: 12 }}>{item.step}</div>
                <h3 style={{ fontSize: 17, fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0b3d24', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLO PARTNER CAPABILITIES ===== */}
      <section className="section reveal" style={{ background: '#f8f9fc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><FiShield size={12} /> FLO Authorized Partner</div>
            <h2 className="section-title">A Complete, Fully-Managed Charging Ecosystem</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              As a FLO Authorized Partner, we bring enterprise-grade network operations, software, billing, and support to every site we lease.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: FiClock, title: 'Network Operations & Monitoring', desc: '24/7 proactive monitoring backed by a 98%+ uptime guarantee, plus a performance warranty with priority maintenance.' },
              { icon: FiCpu, title: 'Software & Management Tools', desc: 'A dedicated web portal for station management, patented energy management tools, and real-time station status on the FLO app.' },
              { icon: FiCreditCard, title: 'Payment & Billing', desc: 'PCI-compliant billing for secure, reliable payment processing on every transaction.' },
              { icon: FiHeadphones, title: 'Driver Support', desc: 'A 24/7 toll-free support line so every EV driver gets help whenever they need it.' },
              { icon: FiMapPin, title: 'Visibility & Marketing', desc: 'Listing on the FLO app (iOS/Android) so drivers can find your stations — driving extra visibility and foot traffic.' },
              { icon: FiTool, title: 'Phased Rollout Planning', desc: 'Site assessment and phased infrastructure planning so your charging hub scales with real EV demand.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e8ecf4' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(11,61,36,0.08), rgba(26,125,60,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <item.icon size={20} color="#0b3d24" />
                </div>
                <h3 style={{ fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0b3d24', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEGMENT-SPECIFIC OFFERINGS ===== */}
      <section className="section reveal" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label"><FiGlobe size={12} /> Who We Serve</div>
            <h2 className="section-title">Solutions for Every Property & Partner</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Beyond retail and mall parking, we tailor our charging partnerships to fleets, utilities, and municipalities.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: FiTruck, title: 'Fleets', desc: 'End-to-end electrification with reduced maintenance and fuel costs, plus help identifying government subsidies and rebates.' },
              { icon: FiZap, title: 'Utilities', desc: 'Time-of-use rates and demand response programs that help manage grid load efficiently.' },
              { icon: FiMapPin, title: 'Cities & Municipalities', desc: 'Curbside charging programs and grant guidance, including federal incentive programs like the CFI grant.' },
              { icon: FiHome, title: 'Retail & Hospitality', desc: 'One point of contact for hardware, software, installation, and customer service — the complete experience, handled for you.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#f8f9fc', borderRadius: 16, padding: 28, border: '1px solid #e8ecf4' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: '#0b3d24',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <item.icon size={20} color="#1a7d3c" />
                </div>
                <h3 style={{ fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0b3d24', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        background: 'linear-gradient(135deg, #0b3d24 0%, #12522e 100%)',
        padding: '72px 0', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(26,125,60,0.15) 0%, transparent 70%)', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>
            Ready to Turn Your Parking Lot Into Revenue?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 520, margin: '0 auto 32px' }}>
            Book a free site assessment and find out how much lease income your property could earn — with zero upfront cost.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/booking" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
              <FiCalendar size={16} /> Lease Your Property
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
              borderColor: openFaq === i ? '#1a7d3c' : '#e8ecf4',
            }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: '100%', padding: '20px 24px', background: '#fff',
                border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontSize: 15, fontWeight: 600, color: '#0b3d24', cursor: 'pointer', textAlign: 'left',
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
