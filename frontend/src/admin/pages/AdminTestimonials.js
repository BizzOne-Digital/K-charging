import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiStar } from 'react-icons/fi';

const emptyForm = { name: '', role: '', company: '', content: '', rating: 5, isActive: true, order: 0 };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/testimonials/admin/all').then(r => setTestimonials(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setAvatar(null); setShowModal(true); };
  const openEdit = (t) => {
    setForm({ name: t.name, role: t.role || '', company: t.company || '', content: t.content, rating: t.rating || 5, isActive: t.isActive, order: t.order || 0 });
    setEditId(t._id); setAvatar(null); setShowModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.content) { toast.error('Name and content required'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (avatar) fd.append('avatar', avatar);
      if (editId) await api.put(`/testimonials/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/testimonials', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(editId ? 'Testimonial updated' : 'Testimonial added');
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}`); toast.success('Deleted'); load(); } catch { toast.error('Delete failed'); }
  };

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0b3d24', marginBottom: 4 }}>Testimonials</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>{testimonials.length} client reviews</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary"><FiPlus size={16} /> Add Testimonial</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {testimonials.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#94a3b8' }}>
            <FiStar size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
            <p>No testimonials yet. Add your first one.</p>
          </div>
        )}
        {testimonials.map(t => (
          <div key={t._id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', padding: 24 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={14} fill={i < (t.rating || 5) ? '#1a7d3c' : 'transparent'} color={i < (t.rating || 5) ? '#1a7d3c' : '#e8ecf4'} />
              ))}
            </div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.content}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              {t.avatar
                ? <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                : <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #0b3d24, #1a7d3c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16 }}>{t.name.charAt(0)}</div>
              }
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0b3d24' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}{t.company ? `, ${t.company}` : ''}</div>
              </div>
              <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: t.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.1)', color: t.isActive ? '#22c55e' : '#94a3b8' }}>
                {t.isActive ? 'Active' : 'Hidden'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(t)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e8ecf4', background: '#f8f9fc', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <FiEdit2 size={14} /> Edit
              </button>
              <button onClick={() => deleteTestimonial(t._id)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444' }}>
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24' }}>{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FiX size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Client Name *</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle} placeholder="John Smith" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Role / Title</label>
                  <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle} placeholder="Property Manager" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Company</label>
                  <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={inputStyle} placeholder="Company Name" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Rating</label>
                  <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} style={inputStyle}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Review Content *</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} required
                  style={{ ...inputStyle, resize: 'vertical' }} placeholder="Write the client's review here..." />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Client Photo (optional)</label>
                <input type="file" accept="image/*" onChange={e => setAvatar(e.target.files[0])}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <input type="checkbox" id="tActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ width: 16, height: 16 }} />
                <label htmlFor="tActive" style={{ fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>Show on website</label>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Saving...' : <><FiCheck size={16} /> {editId ? 'Update' : 'Add Testimonial'}</>}
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
