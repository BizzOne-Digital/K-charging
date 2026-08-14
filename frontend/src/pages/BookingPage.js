import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiUser, FiMail, FiPhone, FiBriefcase, FiMessageSquare, FiCheck } from 'react-icons/fi';

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 10,
  border: '1px solid #e8ecf4', fontSize: 15, color: '#0b3d24',
  outline: 'none', fontFamily: 'Inter, sans-serif', background: '#fff',
  transition: 'border-color 0.2s',
};

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    service: '', propertyType: '', chargersNeeded: '',
    preferredDate: '', preferredTime: '', message: '',
  });

  useEffect(() => {
    api.get('/services').then(r => setServices(r.data)).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await api.post('/bookings', form);
      setSubmitted(true);
      toast.success('Booking submitted successfully!');
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #052414, #0b3d24)', padding: '64px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}>
              <FiCalendar size={12} /> Lease Your Property
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,46px)', color: '#fff', marginBottom: 16 }}>
              Get a Free Site Assessment
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
              Fill out the form below and our team will contact you within 24 hours with a customized lease proposal — zero upfront cost.
            </p>
          </div>
        </div>

        {/* Form */}
        <section className="section-sm" style={{ background: '#f8f9fc' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            {submitted ? (
              <div style={{ background: '#fff', borderRadius: 20, padding: 64, textAlign: 'center', border: '1px solid #e8ecf4' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <FiCheck size={32} color="#22c55e" />
                </div>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 28, color: '#0b3d24', marginBottom: 12 }}>Booking Confirmed!</h2>
                <p style={{ color: '#64748b', fontSize: 16, lineHeight: 1.7 }}>
                  Thank you! Our team will reach out within 24 hours to schedule your free consultation and site assessment.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
                  <a href="/" className="btn btn-dark">Back to Home</a>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',company:'',service:'',propertyType:'',chargersNeeded:'',preferredDate:'',preferredTime:'',message:'' }); }} className="btn btn-outline" style={{ borderColor: '#0b3d24', color: '#0b3d24' }}>Book Another</button>
                </div>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 20, padding: 48, border: '1px solid #e8ecf4' }}>
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, color: '#0b3d24', marginBottom: 8 }}>Request a Free Consultation</h2>
                <p style={{ color: '#94a3b8', marginBottom: 36, fontSize: 14 }}>* Required fields</p>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    {[
                      { name: 'name', label: 'Full Name *', icon: FiUser, placeholder: 'John Smith' },
                      { name: 'email', label: 'Email Address *', icon: FiMail, placeholder: 'john@company.com', type: 'email' },
                      { name: 'phone', label: 'Phone Number *', icon: FiPhone, placeholder: '+1 514 000 0000' },
                      { name: 'company', label: 'Company / Property Name', icon: FiBriefcase, placeholder: 'Your company name' },
                    ].map(field => (
                      <div key={field.name}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{field.label}</label>
                        <div style={{ position: 'relative' }}>
                          <field.icon size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                          <input
                            type={field.type || 'text'}
                            name={field.name}
                            value={form[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            style={{ ...inputStyle, paddingLeft: 40 }}
                            onFocus={e => e.target.style.borderColor = '#1a7d3c'}
                            onBlur={e => e.target.style.borderColor = '#e8ecf4'}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Service Required *</label>
                      <select name="service" value={form.service} onChange={handleChange} style={{ ...inputStyle }} required
                        onFocus={e => e.target.style.borderColor = '#1a7d3c'} onBlur={e => e.target.style.borderColor = '#e8ecf4'}>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s._id} value={s.title}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Property Type</label>
                      <select name="propertyType" value={form.propertyType} onChange={handleChange} style={{ ...inputStyle }}
                        onFocus={e => e.target.style.borderColor = '#1a7d3c'} onBlur={e => e.target.style.borderColor = '#e8ecf4'}>
                        <option value="">Select type...</option>
                        <option value="commercial">Commercial Building</option>
                        <option value="residential">Residential / Condo</option>
                        <option value="fleet">Fleet Depot</option>
                        <option value="workplace">Workplace / Office</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Number of Chargers Needed</label>
                      <select name="chargersNeeded" value={form.chargersNeeded} onChange={handleChange} style={{ ...inputStyle }}
                        onFocus={e => e.target.style.borderColor = '#1a7d3c'} onBlur={e => e.target.style.borderColor = '#e8ecf4'}>
                        <option value="">Select range...</option>
                        <option value="1-5">1–5 chargers</option>
                        <option value="6-20">6–20 chargers</option>
                        <option value="21-50">21–50 chargers</option>
                        <option value="50+">50+ chargers</option>
                        <option value="unsure">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Preferred Date</label>
                      <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange} style={{ ...inputStyle }}
                        onFocus={e => e.target.style.borderColor = '#1a7d3c'} onBlur={e => e.target.style.borderColor = '#e8ecf4'} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                      <FiMessageSquare size={13} style={{ marginRight: 6 }} />Additional Details
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Tell us more about your project, property size, timeline, or any specific requirements..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={e => e.target.style.borderColor = '#1a7d3c'} onBlur={e => e.target.style.borderColor = '#e8ecf4'} />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }} disabled={loading}>
                    {loading ? 'Submitting...' : <><FiCalendar size={16} /> Submit Booking Request</>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
