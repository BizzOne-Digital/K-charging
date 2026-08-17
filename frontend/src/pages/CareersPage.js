import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { FiArrowRight, FiMapPin, FiBriefcase, FiClock, FiCheck } from 'react-icons/fi';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs').then(r => setJobs(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

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
                  <a href="mailto:careers@kchargingsolutions.com" style={{ color: '#1a7d3c', fontWeight: 600 }}>careers@kchargingsolutions.com</a>.
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
                      <a
                        href={`mailto:careers@kchargingsolutions.com?subject=${encodeURIComponent('Application: ' + job.title)}`}
                        className="btn btn-primary"
                        style={{ fontSize: 14, padding: '10px 20px', flexShrink: 0 }}
                      >
                        Apply Now <FiArrowRight size={14} />
                      </a>
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
    </div>
  );
}
