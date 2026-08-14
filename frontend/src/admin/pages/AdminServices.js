import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiZap } from 'react-icons/fi';

const emptyForm = { title: '', shortDescription: '', description: '', features: ['', '', ''], isActive: true, order: 0 };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/services/admin/all').then(r => setServices(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setImage(null); setShowModal(true); };
  const openEdit = (s) => {
    setForm({ title: s.title, shortDescription: s.shortDescription || '', description: s.description, features: s.features?.length ? [...s.features, '', ''].slice(0, Math.max(s.features.length, 3)) : ['', '', ''], isActive: s.isActive, order: s.order || 0 });
    setEditId(s._id); setImage(null); setShowModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.description) { toast.error('Title and description required'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => { if (k === 'features') fd.append(k, JSON.stringify(v.filter(f => f.trim()))); else fd.append(k, v); });
      if (image) fd.append('image', image);
      if (editId) await api.put(`/services/${editId}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      else await api.post('/services', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(editId ? 'Service updated' : 'Service created');
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try { await api.delete(`/services/${id}`); toast.success('Deleted'); load(); } catch { toast.error('Delete failed'); }
  };

  const updateFeature = (i, val) => {
    const arr = [...form.features];
    arr[i] = val;
    setForm({ ...form, features: arr });
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0d1b2e', marginBottom: 4 }}>Services</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>{services.length} services configured</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">
          <FiPlus size={16} /> Add Service
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {services.map(s => (
          <div key={s._id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden' }}>
            {s.image && <img src={s.image} alt={s.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, color: '#0d1b2e', flex: 1 }}>{s.title}</h3>
                <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: s.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.1)', color: s.isActive ? '#22c55e' : '#94a3b8', marginLeft: 8 }}>
                  {s.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>{s.shortDescription}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(s)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e8ecf4', background: '#f8f9fc', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <FiEdit2 size={14} /> Edit
                </button>
                <button onClick={() => deleteService(s._id)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444' }}>
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0d1b2e' }}>{editId ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FiX size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Service Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Short Description</label>
                <input value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Features (one per line)</label>
                {form.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
                  </div>
                ))}
                <button type="button" onClick={() => setForm({ ...form, features: [...form.features, ''] })} style={{ fontSize: 13, color: '#3d7fff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  + Add Feature
                </button>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Service Image</label>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14 }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ width: 16, height: 16 }} />
                <label htmlFor="isActive" style={{ fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>Active (visible on website)</label>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Saving...' : <><FiCheck size={16} /> {editId ? 'Update Service' : 'Create Service'}</>}
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
