import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiFileText, FiEye, FiEyeOff } from 'react-icons/fi';

const emptyForm = { title: '', excerpt: '', content: '', category: 'General', tags: '', isPublished: false };

const categories = ['General', 'EV Industry', 'Installation Guide', 'Company News', 'Technology', 'Case Study'];

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const load = async () => {
    setPageLoading(true);
    try { const r = await api.get('/blog/admin/all'); setPosts(r.data); } catch { toast.error('Failed to load posts'); }
    finally { setPageLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setCoverImage(null); setShowModal(true); };
  const openEdit = (p) => {
    setForm({ title: p.title, excerpt: p.excerpt || '', content: p.content, category: p.category || 'General', tags: Array.isArray(p.tags) ? p.tags.join(', ') : '', isPublished: p.isPublished });
    setEditId(p._id); setCoverImage(null); setShowModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.content) { toast.error('Title and content required'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      const tagsArr = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      Object.entries({ ...form, tags: JSON.stringify(tagsArr) }).forEach(([k, v]) => fd.append(k, v));
      if (coverImage) fd.append('coverImage', coverImage);
      if (editId) await api.put(`/blog/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(editId ? 'Post updated' : 'Post created');
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const togglePublish = async (post) => {
    try {
      await api.put(`/blog/${post._id}`, { isPublished: !post.isPublished });
      toast.success(post.isPublished ? 'Post unpublished' : 'Post published');
      load();
    } catch { toast.error('Failed to update'); }
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return;
    try { await api.delete(`/blog/${id}`); toast.success('Post deleted'); load(); } catch { toast.error('Delete failed'); }
  };

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0b3d24', marginBottom: 4 }}>Blog & News</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>{posts.filter(p => p.isPublished).length} published, {posts.filter(p => !p.isPublished).length} drafts</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary"><FiPlus size={16} /> New Post</button>
      </div>

      {/* Posts Table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden' }}>
        {pageLoading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: 64, textAlign: 'center', color: '#94a3b8' }}>
            <FiFileText size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p style={{ marginBottom: 16 }}>No blog posts yet</p>
            <button onClick={openAdd} className="btn btn-primary">Write Your First Post</button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fc' }}>
                {['Title', 'Category', 'Author', 'Views', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#64748b', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p, i) => (
                <tr key={p._id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0b3d24', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                    {p.excerpt && <div style={{ fontSize: 12, color: '#94a3b8', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.excerpt}</div>}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 100, fontSize: 12, fontWeight: 500, background: '#f8f9fc', color: '#64748b', border: '1px solid #e8ecf4' }}>{p.category}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{p.author?.name || 'Admin'}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#94a3b8' }}>{p.views || 0}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, background: p.isPublished ? 'rgba(34,197,94,0.1)' : 'rgba(26,125,60,0.1)', color: p.isPublished ? '#22c55e' : '#f59e0b' }}>
                      {p.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => togglePublish(p)} title={p.isPublished ? 'Unpublish' : 'Publish'}
                        style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid #e8ecf4', background: '#fff', cursor: 'pointer', color: p.isPublished ? '#f59e0b' : '#22c55e' }}>
                        {p.isPublished ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                      </button>
                      <button onClick={() => openEdit(p)} style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid #e8ecf4', background: '#fff', cursor: 'pointer', color: '#2f9e55' }}>
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => deletePost(p._id)} style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444' }}>
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 760, maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24' }}>{editId ? 'Edit Post' : 'New Blog Post'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FiX size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Post Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={inputStyle} placeholder="Enter a compelling title..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Tags (comma-separated)</label>
                  <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} style={inputStyle} placeholder="EV, charging, commercial" />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Excerpt / Summary</label>
                <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2}
                  style={{ ...inputStyle, resize: 'vertical' }} placeholder="Brief description shown in blog listing..." />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Content *</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={12} required
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }}
                  placeholder="Write your full blog post content here. HTML is supported." />
                <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>HTML tags are supported for formatting (e.g. &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;ul&gt;)</p>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Cover Image</label>
                <input type="file" accept="image/*" onChange={e => setCoverImage(e.target.files[0])}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '14px 16px', background: form.isPublished ? 'rgba(34,197,94,0.06)' : 'rgba(26,125,60,0.06)', borderRadius: 10, border: `1px solid ${form.isPublished ? 'rgba(34,197,94,0.2)' : 'rgba(26,125,60,0.2)'}` }}>
                <input type="checkbox" id="isPublished" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} style={{ width: 16, height: 16 }} />
                <label htmlFor="isPublished" style={{ fontSize: 14, fontWeight: 600, color: form.isPublished ? '#22c55e' : '#f59e0b', cursor: 'pointer' }}>
                  {form.isPublished ? '✓ Publish immediately (visible on website)' : '○ Save as Draft (not visible yet)'}
                </label>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Saving...' : <><FiCheck size={16} /> {editId ? 'Update Post' : 'Create Post'}</>}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ background: '#f8f9fc', color: '#64748b', border: '1px solid #e8ecf4' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
