import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi';
import { MdElectricCar } from 'react-icons/md';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#070e1c', color: 'rgba(255,255,255,0.75)', marginTop: 0 }}>
      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0d1b2e 0%, #1a3050 50%, #0d1b2e 100%)',
        borderTop: '1px solid rgba(245,166,35,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="container" style={{ padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <MdElectricCar size={28} color="#f5a623" />
            <span style={{ color: '#f5a623', fontWeight: 600, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ready to go electric?</span>
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px,4vw,38px)', color: '#fff', marginBottom: 12 }}>
            Power Your Property with Smart EV Charging
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            Get a free site assessment and customized proposal for your property.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/booking" className="btn btn-primary">Get a Free Consultation</Link>
            <a href="tel:+15146612494" className="btn btn-outline">+1 514 661 2494</a>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container" style={{ padding: '64px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <img src="/logo.png" alt="K Charging Solutions" style={{ height: 42, width: 'auto' }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              End-to-end EV charging infrastructure for commercial properties, workplaces, fleets, and residential buildings.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[FiFacebook, FiLinkedin, FiInstagram, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f5a623'; e.currentTarget.style.color = '#0d1b2e'; e.currentTarget.style.borderColor = '#f5a623'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                ><Icon size={16} /></a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Services</h4>
            {['Commercial EV Charging', 'Fleet Charging Solutions', 'Workplace Charging', 'Residential & Multi-Unit', 'Installation & Maintenance', 'Smart Charging Management'].map(s => (
              <Link key={s} to="/services" style={{ display: 'block', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#f5a623'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
              >{s}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Company</h4>
            {[{ label: 'About Us', to: '/about' }, { label: 'Blog & News', to: '/blog' }, { label: 'Testimonials', to: '/testimonials' }, { label: 'FAQ', to: '/faq' }, { label: 'Contact', to: '/contact' }, { label: 'Book a Consultation', to: '/booking' }].map(l => (
              <Link key={l.to} to={l.to} style={{ display: 'block', fontSize: 14, marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#f5a623'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="tel:+15146612494" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5a623'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              ><FiPhone size={15} style={{ color: '#f5a623', flexShrink: 0 }} /> +1 514 661 2494</a>
              <a href="mailto:info@kchargingsolutions.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f5a623'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
              ><FiMail size={15} style={{ color: '#f5a623', flexShrink: 0 }} /> info@kchargingsolutions.com</a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                <FiMapPin size={15} style={{ color: '#f5a623', marginTop: 2, flexShrink: 0 }} />
                <span>Canada</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 13 }}>&copy; {year} K Charging Solutions. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
