import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FiCheck, FiArrowRight, FiZap, FiShield, FiGlobe } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #052414, #0b3d24)', padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>About K Charging Solutions</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,50px)', color: '#fff', marginBottom: 20 }}>
              Zero-CapEx EV Charging, Built for Property Owners
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
              K Charging Solutions is a FLO Authorized Partner that leases unused parking space from malls, supermarkets, and roadside businesses and turns it into Tesla & FLO fast-charging hubs — at zero upfront cost to the property owner.
            </p>
          </div>
        </div>

        <section className="section reveal">
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                <h2 className="section-title">Our Mission</h2>
                <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 16, marginBottom: 24 }}>
                  We believe EV infrastructure should cost property owners nothing and earn them something. Our mission is to accelerate the transition to electric mobility by leasing unused space and funding, installing, and operating premium Tesla & FLO charging hubs ourselves.
                </p>
                <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
                  From site leasing to installation, network operations to driver support — K Charging Solutions is your end-to-end, fully-managed partner in the electric future.
                </p>
                {['FLO Authorized Partner', 'Zero upfront cost to property owners', 'Tesla & FLO certified hardware ownership', '100% managed operations & maintenance'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                    <FiCheck size={16} color="#22c55e" />
                    <span style={{ fontSize: 15, color: '#374151', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
                <Link to="/booking" className="btn btn-primary" style={{ marginTop: 32 }}>
                  Work With Us <FiArrowRight size={15} />
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: FiZap, title: 'Zero-CapEx', desc: 'We fund the hardware, installation, and grid upgrades — not you.' },
                  { icon: FiShield, title: 'Tesla & FLO', desc: 'Only certified, industry-leading commercial charging hardware.' },
                  { icon: FiGlobe, title: 'Scale', desc: 'From a single retail lot to multi-site regional rollouts.' },
                  { icon: FiCheck, title: 'Support', desc: '24/7 monitoring, driver support, and rapid response maintenance.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#f8f9fc', border: '1px solid #e8ecf4', borderRadius: 16, padding: 24 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: '#0b3d24', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <item.icon size={20} color="#1a7d3c" />
                    </div>
                    <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16, color: '#0b3d24', marginBottom: 8 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== MILESTONES ===== */}
        <section className="section reveal" style={{ background: '#0b3d24' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>Our Journey</div>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(26px,4vw,38px)', color: '#fff', fontWeight: 800 }}>Milestones That Matter</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {[
                { value: '$0', label: 'Upfront Cost to Property Owners' },
                { value: 'Tesla / FLO', label: 'Certified Charging Hardware' },
                { value: '98%+', label: 'Uptime Across Managed Sites' },
                { value: '24/7', label: 'Monitoring & Driver Support' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '24px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: 38, fontWeight: 800, color: '#1a7d3c', lineHeight: 1, marginBottom: 8 }}>{item.value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="section reveal" style={{ textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <h2 className="section-title">Let's Turn Your Property Into a Revenue Stream</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
              Whether it's a single retail lot or a multi-site rollout, our team is ready to lease your space and build a zero-CapEx charging hub on it.
            </p>
            <Link to="/booking" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>
              Book a Consultation <FiArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
