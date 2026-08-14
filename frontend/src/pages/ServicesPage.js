import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { FiCheck, FiArrowRight, FiZap } from 'react-icons/fi';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => { api.get('/services').then(r => setServices(r.data)).catch(() => {}); }, []);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #070e1c, #0d1b2e)', padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}><FiZap size={12} /> Our Services</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,50px)', color: '#fff', marginBottom: 20 }}>
              Complete EV Charging Solutions
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>
              Tailored EV charging infrastructure for every property type and business need.
            </p>
          </div>
        </div>
        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
              {services.map(service => (
                <div key={service._id} style={{ background: '#fff', borderRadius: 20, padding: 36, border: '1px solid #e8ecf4', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 22, color: '#0d1b2e', marginBottom: 12 }}>{service.title}</h2>
                  <p style={{ color: '#64748b', lineHeight: 1.75, fontSize: 15, marginBottom: 20 }}>{service.description}</p>
                  {service.features?.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                      <FiCheck size={14} color="#22c55e" /><span style={{ fontSize: 14, color: '#374151' }}>{f}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                    <Link to="/booking" className="btn btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>Get a Quote</Link>
                    <Link to={`/services/${service.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#0d1b2e', padding: '10px 0' }}>
                      Learn More <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
