import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiArrowRight, FiMapPin, FiBriefcase, FiClock, FiCheck, FiX } from 'react-icons/fi';

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 10,
  border: '1px solid #e8ecf4', fontSize: 15, color: '#0b3d24',
  outline: 'none', fontFamily: 'Inter, sans-serif', background: '#fff',
};

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', resumeLink: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    api.get('/jobs').then(r => setJobs(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const openApply = (job) => {
    setApplyJob(job);
    setForm({ name: '', email: '', phone: '', resumeLink: '', message: '' });
    setSent(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    setSubmitting(true);
    try {
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Job Application: ${applyJob.title}`,
        message: [
          `Applying for: ${applyJob.title}`,
          form.resumeLink ? `Resume / Portfolio link: ${form.resumeLink}` : null,
          form.message ? `Message: ${form.message}` : null,
        ].filter(Boolean).join('\n'),
      });
      setSent(true);
      toast.success('Application sent!');
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #052414, #0b3d24)', padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}><FiBriefcase size={12} /> Careers</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,50px)', color: '#fff', marginBottom: 20 }}>
              Build the Future of EV Charging With Us
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
              We're growing our team to bring zero-CapEx Tesla & FLO charging hubs to more properties across Canada. Explore open roles below.
            </p>
          </div>
        </div>

        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container" style={{ maxWidth: 900 }}>
            {loading && (
              <div style={{ display: 'grid', gap: 20 }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e8ecf4' }}>
                    <div className="skeleton" style={{ width: '40%', height: 22, borderRadius: 6, marginBottom: 12 }} />
                    <div className="skeleton" style={{ width: '70%', height: 14, borderRadius: 6 }} />
                  </div>
                ))}
              </div>
            )}

            {!loading && jobs.length === 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 48, border: '1px solid #e8ecf4', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, color: '#0b3d24', marginBottom: 10 }}>No Open Positions Right Now</h3>
                <p style={{ color: '#64748b', fontSize: 15 }}>
                  We're not actively hiring at the moment, but we're always open to hearing from great people.
                  Send your resume to{' '}
                  <a href="mailto:info@kchargingsolutions.com" style={{ color: '#1a7d3c', fontWeight: 600 }}>info@kchargingsolutions.com</a>.
                </p>
              </div>
            )}

            {!loading && jobs.length > 0 && (
              <div style={{ display: 'grid', gap: 20 }}>
                {jobs.map(job => (
                  <div key={job._id} style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e8ecf4' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                      <div>
                        <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 20, color: '#0b3d24', marginBottom: 8 }}>{job.title}</h3>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          {job.department && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                              <FiBriefcase size={13} /> {job.department}
                            </span>
                          )}
                          {job.location && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                              <FiMapPin size={13} /> {job.location}
                            </span>
                          )}
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                            <FiClock size={13} /> {job.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => openApply(job)}
                        className="btn btn-primary"
                        style={{ fontSize: 14, padding: '10px 20px', flexShrink: 0 }}
                      >
                        Apply Now <FiArrowRight size={14} />
                      </button>
                    </div>
                    <p style={{ color: '#64748b', lineHeight: 1.75, fontSize: 15, marginBottom: job.requirements?.length ? 16 : 0 }}>{job.description}</p>
                    {job.requirements?.length > 0 && (
                      <div style={{ display: 'grid', gap: 8 }}>
                        {job.requirements.map((r, i) => (
                          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <FiCheck size={14} color="#22c55e" style={{ marginTop: 3, flexShrink: 0 }} />
                            <span style={{ fontSize: 14, color: '#374151' }}>{r}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />

      {/* Apply Modal */}
      {applyJob && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24' }}>Apply</h3>
                <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{applyJob.title}</p>
              </div>
              <button onClick={() => setApplyJob(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FiX size={22} /></button>
            </div>

            {sent ? (
              <div style={{ padding: '40px 28px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <FiCheck size={28} color="#22c55e" />
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk', color: '#0b3d24', marginBottom: 10 }}>Application Sent!</h3>
                <p style={{ color: '#64748b', fontSize: 15 }}>Thanks for applying — we'll review your application and get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Name *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Phone</label>
                  <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Resume / Portfolio Link</label>
                  <input value={form.resumeLink} onChange={e => setForm({ ...form, resumeLink: e.target.value })} placeholder="Google Drive, LinkedIn, portfolio, etc." style={inputStyle} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
                  {submitting ? 'Sending...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
