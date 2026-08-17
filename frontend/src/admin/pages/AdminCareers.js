import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiBriefcase } from 'react-icons/fi';

const emptyForm = { title: '', department: '', location: '', type: 'Full-time', description: '', requirements: ['', ''], isActive: true, order: 0 };

export default function AdminCareers() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = () => api.get('/jobs/admin/all').then(r => setJobs(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (j) => {
    setForm({
      title: j.title, department: j.department || '', location: j.location || '', type: j.type || 'Full-time',
      description: j.description, requirements: j.requirements?.length ? [...j.requirements, ''] : ['', ''],
      isActive: j.isActive, order: j.order || 0,
    });
    setEditId(j._id); setShowModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.description) { toast.error('Title and description required'); return; }
    setLoading(true);
    try {
      const data = { ...form, requirements: form.requirements.filter(r => r.trim()) };
      if (editId) await api.put(`/jobs/${editId}`, data);
      else await api.post('/jobs', data);
      toast.success(editId ? 'Job updated' : 'Job created');
      setShowModal(false); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job posting?')) return;
    try { await api.delete(`/jobs/${id}`); toast.success('Deleted'); load(); } catch { toast.error('Delete failed'); }
  };

  const updateRequirement = (i, val) => {
    const arr = [...form.requirements];
    arr[i] = val;
    setForm({ ...form, requirements: arr });
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0b3d24', marginBottom: 4 }}>Careers</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>{jobs.length} job postings</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">
          <FiPlus size={16} /> Add Job
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {jobs.map(j => (
          <div key={j._id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, color: '#0b3d24', flex: 1 }}>{j.title}</h3>
              <span style={{ padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: j.isActive ? 'rgba(34,197,94,0.1)' : 'rgba(148,163,184,0.1)', color: j.isActive ? '#22c55e' : '#94a3b8', marginLeft: 8 }}>
                {j.isActive ? 'Active' : 'Hidden'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>
              {[j.department, j.location, j.type].filter(Boolean).join(' · ')}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(j)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #e8ecf4', background: '#f8f9fc', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <FiEdit2 size={14} /> Edit
              </button>
              <button onClick={() => deleteJob(j._id)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444' }}>
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 48, color: '#94a3b8' }}>
            <FiBriefcase size={28} style={{ marginBottom: 12 }} />
            <p>No job postings yet. Click "Add Job" to create one.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24' }}>{editId ? 'Edit Job' : 'Add Job'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><FiX size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Job Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Department</label>
                  <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} placeholder="e.g. Sales"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Location</label>
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Remote"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Description *</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} required
                  style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter', resize: 'vertical' }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Requirements (one per line)</label>
                {form.requirements.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input value={r} onChange={e => updateRequirement(i, e.target.value)} placeholder={`Requirement ${i + 1}`}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter' }} />
                  </div>
                ))}
                <button type="button" onClick={() => setForm({ ...form, requirements: [...form.requirements, ''] })} style={{ fontSize: 13, color: '#2f9e55', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  + Add Requirement
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} style={{ width: 16, height: 16 }} />
                <label htmlFor="isActive" style={{ fontSize: 14, fontWeight: 500, color: '#374151', cursor: 'pointer' }}>Active (visible on website)</label>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                  {loading ? 'Saving...' : <><FiCheck size={16} /> {editId ? 'Update Job' : 'Create Job'}</>}
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
