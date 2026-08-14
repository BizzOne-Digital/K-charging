import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { FiCalendar, FiEye, FiArrowRight, FiTag } from 'react-icons/fi';

const categories = ['All', 'General', 'EV Industry', 'Installation Guide', 'Company News', 'Technology', 'Case Study'];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 9 });
    if (category) params.append('category', category);
    api.get(`/blog?${params}`).then(r => {
      setPosts(r.data.posts || []);
      setPages(r.data.pages || 1);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page, category]);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        <div style={{ background: 'linear-gradient(135deg, #052414, #0b3d24)', padding: '72px 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ margin: '0 auto 16px', justifyContent: 'center' }}><FiTag size={12} /> Blog & News</div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(28px,4vw,48px)', color: '#fff', marginBottom: 16 }}>EV Charging Insights & News</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Stay up to date with the latest in EV infrastructure, charging technology, and industry news.</p>
          </div>
        </div>
        <div style={{ background: '#fff', borderBottom: '1px solid #e8ecf4', padding: '14px 0' }}>
          <div className="container" style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setCategory(cat === 'All' ? '' : cat); setPage(1); }} style={{
                padding: '8px 18px', borderRadius: 100, border: `1px solid ${(!category && cat === 'All') || category === cat ? '#0b3d24' : '#e8ecf4'}`,
                background: (!category && cat === 'All') || category === cat ? '#0b3d24' : '#fff',
                color: (!category && cat === 'All') || category === cat ? '#fff' : '#64748b',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{cat}</button>
            ))}
          </div>
        </div>
        <section className="section reveal" style={{ background: '#f8f9fc' }}>
          <div className="container">
            {loading ? <div style={{ textAlign: 'center', padding: 60, color: '#94a3b8' }}>Loading...</div>
              : posts.length === 0 ? <div style={{ textAlign: 'center', padding: 80, color: '#94a3b8' }}><p>No posts published yet.</p></div>
              : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28, marginBottom: 48 }}>
                    {posts.map((post, i) => (
                      <article key={post._id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        {post.coverImage ? <img src={post.coverImage} alt={post.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                          : <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, #0b3d24, #135c34)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 40, fontWeight: 800, color: 'rgba(26,125,60,0.3)', fontFamily: 'Space Grotesk' }}>K</span></div>}
                        <div style={{ padding: 24 }}>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                            <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(26,125,60,0.1)', color: '#1a7d3c', fontSize: 11, fontWeight: 700 }}>{post.category}</span>
                            <span style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}><FiCalendar size={11} /> {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 17, fontWeight: 700, color: '#0b3d24', marginBottom: 10, lineHeight: 1.35 }}>{post.title}</h2>
                          {post.excerpt && <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link to={`/blog/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#0b3d24' }}>Read More <FiArrowRight size={14} /></Link>
                            <span style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}><FiEye size={11} /> {post.views || 0}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  {pages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      {[...Array(pages)].map((_, i) => (
                        <button key={i} onClick={() => setPage(i + 1)} style={{ width: 38, height: 38, borderRadius: 8, border: `1px solid ${page === i + 1 ? '#0b3d24' : '#e8ecf4'}`, background: page === i + 1 ? '#0b3d24' : '#fff', color: page === i + 1 ? '#fff' : '#64748b', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{i + 1}</button>
                      ))}
                    </div>
                  )}
                </>
              )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
