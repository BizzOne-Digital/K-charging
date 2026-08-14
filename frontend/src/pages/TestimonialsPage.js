import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import { FiStar, FiArrowRight } from 'react-icons/fi';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => { api.get('/testimonials').then(r => setTestimonials(r.data)).catch(() => {}); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #070e1c, #0d1b2e)', padding: '72px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}><FiStar size={12} /> Client Reviews</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 16 }}>What Our Clients Say</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>Real feedback from commercial properties, fleet operators, and businesses we've served.</p>
          </div>
        </div>
        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container">
            {testimonials.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 80, color: '#94a3b8' }}>
                <FiStar size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                <p>No testimonials published yet. Check back soon.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                {testimonials.map(t => (
                  <div key={t._id} style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e8ecf4', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                      {[...Array(5)].map((_, i) => <FiStar key={i} size={16} fill={i < (t.rating || 5) ? '#f5a623' : 'transparent'} color={i < (t.rating || 5) ? '#f5a623' : '#e8ecf4'} />)}
                    </div>
                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{t.content}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      {t.avatar ? <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                        : <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #0d1b2e, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>{t.name.charAt(0)}</div>}
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#0d1b2e' }}>{t.name}</div>
                        <div style={{ fontSize: 13, color: '#94a3b8' }}>{t.role}{t.company ? `, ${t.company}` : ''}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 64, background: '#0d1b2e', borderRadius: 20, padding: '48px 40px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', color: '#fff', fontSize: 26, marginBottom: 12 }}>Ready to join our satisfied clients?</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28, fontSize: 16 }}>Get a free site assessment and customized proposal for your property.</p>
              <Link to="/booking" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 28px' }}>Book a Free Consultation <FiArrowRight size={15} /></Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
