import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';
import { FiCalendar, FiEye, FiArrowLeft, FiTag } from 'react-icons/fi';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`).then(r => setPost(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}><div style={{ color: '#94a3b8' }}>Loading...</div></div>;
  if (!post) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 16 }}><p style={{ color: '#94a3b8' }}>Post not found.</p><Link to="/blog" className="btn btn-dark">Back to Blog</Link></div>;

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 76 }}>
        {post.coverImage && <div style={{ height: 420, overflow: 'hidden' }}><img src={post.coverImage} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
        {!post.coverImage && <div style={{ background: 'linear-gradient(135deg, #070e1c, #0d1b2e)', height: 280 }} />}
        <section className="section reveal">
          <div className="container" style={{ maxWidth: 780 }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#64748b', fontWeight: 500, marginBottom: 28 }}>
              <FiArrowLeft size={14} /> Back to Blog
            </Link>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(245,166,35,0.1)', color: '#f5a623', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}><FiTag size={11} />{post.category}</span>
              <span style={{ fontSize: 13, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5 }}><FiCalendar size={12} />{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span style={{ fontSize: 13, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 5 }}><FiEye size={12} />{post.views} views</span>
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 'clamp(24px,4vw,38px)', color: '#0d1b2e', lineHeight: 1.25, marginBottom: 24 }}>{post.title}</h1>
            {post.author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, paddingBottom: 28, borderBottom: '1px solid #e8ecf4' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0d1b2e, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>{post.author.name?.charAt(0)}</div>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: '#0d1b2e' }}>{post.author.name}</div><div style={{ fontSize: 12, color: '#94a3b8' }}>K Charging Solutions</div></div>
              </div>
            )}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} style={{ fontSize: 16, color: '#374151', lineHeight: 1.85 }} />
            {post.tags?.length > 0 && (
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid #e8ecf4', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Tags:</span>
                {post.tags.map(tag => <span key={tag} style={{ padding: '5px 14px', borderRadius: 100, background: '#f8f9fc', border: '1px solid #e8ecf4', fontSize: 13, color: '#64748b' }}>{tag}</span>)}
              </div>
            )}
            <div style={{ marginTop: 48, padding: 32, background: 'linear-gradient(135deg, #0d1b2e, #1a3050)', borderRadius: 16, textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', color: '#fff', fontSize: 22, marginBottom: 12 }}>Ready to Install EV Charging?</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, fontSize: 15 }}>Get a free consultation and site assessment for your property.</p>
              <Link to="/booking" className="btn btn-primary">Book a Free Consultation</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <style>{`.blog-content h2{font-family:'Space Grotesk',sans-serif;font-size:24px;color:#0d1b2e;margin:32px 0 16px}.blog-content h3{font-size:20px;color:#0d1b2e;margin:24px 0 12px;font-weight:700}.blog-content p{margin-bottom:20px}.blog-content ul,.blog-content ol{margin:0 0 20px 24px}.blog-content li{margin-bottom:8px}.blog-content strong{font-weight:700;color:#0d1b2e}.blog-content a{color:#3d7fff;text-decoration:underline}`}</style>
    </div>
  );
}
