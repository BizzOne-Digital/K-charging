import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setService(null);
    setNotFound(false);
    api.get(`/services/${slug}`).then(r => setService(r.data)).catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div>
        <Navbar />
        <div style={{ paddingTop: 76, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16 }}>
          <p style={{ color: '#94a3b8' }}>Service not found.</p>
          <Link to="/services" className="btn btn-dark">Back to Services</Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div>
        <Navbar />
        <div style={{ paddingTop: 76 }}>
          <div style={{ background: 'linear-gradient(135deg,#052414,#0b3d24)', padding: '80px 0' }}>
            <div className="container">
              <div className="skeleton" style={{ width: '55%', height: 42, borderRadius: 8, marginBottom: 16, opacity: 0.15 }} />
              <div className="skeleton" style={{ width: '75%', height: 18, borderRadius: 6, opacity: 0.15 }} />
            </div>
          </div>
          <section className="section">
            <div className="container" style={{ maxWidth: 800 }}>
              <div className="skeleton" style={{ width: '100%', height: 16, borderRadius: 6, marginBottom: 10 }} />
              <div className="skeleton" style={{ width: '90%', height: 16, borderRadius: 6, marginBottom: 32 }} />
              <div style={{ background: '#f8f9fc', borderRadius: 16, padding: 32 }}>
                <div className="skeleton" style={{ width: '30%', height: 20, borderRadius: 6, marginBottom: 20 }} />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ width: `${70 - i * 8}%`, height: 14, borderRadius: 6, marginBottom: 12 }} />
                ))}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div><Navbar />
      <div style={{paddingTop:76}}>
        <div style={{background:'linear-gradient(135deg,#052414,#0b3d24)',padding:'80px 0'}}>
          <div className="container"><h1 style={{fontFamily:'Space Grotesk',fontSize:'clamp(28px,4vw,50px)',color:'#fff',marginBottom:16}}>{service.title}</h1>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:17,maxWidth:580}}>{service.shortDescription}</p></div></div>
        <section className="section reveal"><div className="container" style={{maxWidth:800}}>
          <p style={{color:'#64748b',lineHeight:1.8,fontSize:16,marginBottom:32}}>{service.description}</p>
          {service.features?.length > 0 && (<div style={{background:'#f8f9fc',borderRadius:16,padding:32,marginBottom:32}}>
            <h3 style={{fontFamily:'Space Grotesk',color:'#0b3d24',marginBottom:20}}>What's Included</h3>
            {service.features.map((f,i)=>(<div key={i} style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}><FiCheck size={16} color="#22c55e"/><span style={{fontSize:15,color:'#374151'}}>{f}</span></div>))}
          </div>)}
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            <Link to="/booking" className="btn btn-primary">Get a Free Quote <FiArrowRight size={15}/></Link>
            <Link to="/services" style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:14,fontWeight:600,color:'#64748b',padding:'14px 0'}}>← All Services</Link>
          </div>
        </div></section></div><Footer /></div>);
}
