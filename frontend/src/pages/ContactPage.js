import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheck } from 'react-icons/fi';

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 10,
  border: '1px solid #e8ecf4', fontSize: 15, color: '#0b3d24',
  outline: 'none', fontFamily: 'Inter, sans-serif', background: '#fff',
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      setSent(true);
      toast.success('Message sent successfully!');
    } catch { toast.error('Failed to send. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #052414, #0b3d24)', padding: '64px 0', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,46px)', color: '#fff', marginBottom: 16 }}>Get In Touch</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>Have a question or want to discuss your EV charging project? We're here to help.</p>
          </div>
        </div>
        <section className="section-sm" style={{ background: '#f8f9fc' }}>
          <div className="container" style={{ maxWidth: 900 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40 }}>
              {/* Info */}
              <div>
                {[
                  { icon: FiPhone, label: 'Phone', value: '+1 (438) 765-6550', href: 'tel:+14387656550' },
                  { icon: FiMail, label: 'Email', value: 'info@kchargingsolutions.com', href: 'mailto:info@kchargingsolutions.com' },
                  { icon: FiMapPin, label: 'Location', value: 'Montreal, Canada', href: '#' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(26,125,60,0.1)', border: '1px solid rgba(26,125,60,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={20} color="#1a7d3c" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{item.label}</div>
                      <a href={item.href} style={{ fontSize: 15, fontWeight: 600, color: '#0b3d24' }}>{item.value}</a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div style={{ background: '#fff', borderRadius: 20, padding: 40, border: '1px solid #e8ecf4' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <FiCheck size={28} color="#22c55e" />
                    </div>
                    <h3 style={{ fontFamily: 'Space Grotesk', color: '#0b3d24', marginBottom: 10 }}>Message Sent!</h3>
                    <p style={{ color: '#64748b' }}>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      {[{name:'name',label:'Name *',ph:'Your name'},{name:'email',label:'Email *',ph:'your@email.com',type:'email'},{name:'phone',label:'Phone',ph:'+1 000 000 0000'},{name:'subject',label:'Subject',ph:'How can we help?'}].map(f=>(
                        <div key={f.name}>
                          <label style={{fontSize:13,fontWeight:600,color:'#374151',marginBottom:6,display:'block'}}>{f.label}</label>
                          <input type={f.type||'text'} name={f.name} value={form[f.name]} onChange={e=>setForm({...form,[e.target.name]:e.target.value})} placeholder={f.ph} style={inputStyle} required={f.name==='name'||f.name==='email'} onFocus={e=>e.target.style.borderColor='#1a7d3c'} onBlur={e=>e.target.style.borderColor='#e8ecf4'} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label style={{fontSize:13,fontWeight:600,color:'#374151',marginBottom:6,display:'block'}}>Message *</label>
                      <textarea name="message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={5} placeholder="Tell us about your project or question..." required style={{...inputStyle,resize:'vertical'}} onFocus={e=>e.target.style.borderColor='#1a7d3c'} onBlur={e=>e.target.style.borderColor='#e8ecf4'} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px'}} disabled={loading}>
                      {loading ? 'Sending...' : <><FiSend size={15}/> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
