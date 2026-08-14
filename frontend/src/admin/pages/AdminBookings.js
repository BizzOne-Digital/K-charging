import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiSearch, FiTrash2, FiMail, FiPhone, FiFilter } from 'react-icons/fi';

const statusColors = { pending: '#f59e0b', confirmed: '#22c55e', completed: '#2f9e55', cancelled: '#ef4444' };

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/bookings${filter ? `?status=${filter}` : ''}`);
      setBookings(res.data.bookings || []);
      setTotal(res.data.total || 0);
    } catch { toast.error('Failed to load bookings'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success('Status updated');
      setSelected(prev => prev ? { ...prev, status } : prev);
      load();
    } catch { toast.error('Update failed'); }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await api.delete(`/bookings/${id}`);
      toast.success('Deleted');
      setSelected(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  const filtered = bookings.filter(b =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.email?.toLowerCase().includes(search.toLowerCase()) ||
    b.service?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0b3d24', marginBottom: 4 }}>Bookings</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>{total} total consultation requests</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
          <FiSearch size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..."
            style={{ width: '100%', padding: '10px 14px 10px 40px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', background: '#fff' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '10px 16px', borderRadius: 10, border: `1px solid ${filter === s ? '#0b3d24' : '#e8ecf4'}`,
              background: filter === s ? '#0b3d24' : '#fff', color: filter === s ? '#fff' : '#64748b',
              fontSize: 13, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize',
            }}>{s || 'All'}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>
            <FiCalendar size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
            <p>No bookings found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fc' }}>
                  {['Client', 'Service', 'Date', 'Property', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: '#64748b', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b._id} style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer', background: i % 2 === 0 ? '#fff' : '#fafbfc' }}
                    onClick={() => setSelected(b)}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0b3d24' }}>{b.name}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{b.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569' }}>{b.service}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#94a3b8' }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: '#475569', textTransform: 'capitalize' }}>{b.propertyType || '—'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className={`badge-status badge-${b.status}`}>{b.status}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={e => { e.stopPropagation(); deleteBooking(b._id); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}>
                        <FiTrash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24' }}>Booking Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94a3b8' }}>×</button>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[['Name', selected.name], ['Email', selected.email], ['Phone', selected.phone], ['Company', selected.company || '—'], ['Service', selected.service], ['Property Type', selected.propertyType || '—'], ['Chargers Needed', selected.chargersNeeded || '—'], ['Preferred Date', selected.preferredDate ? new Date(selected.preferredDate).toLocaleDateString() : '—']].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, color: '#0b3d24', fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
              {selected.message && (
                <div style={{ background: '#f8f9fc', borderRadius: 10, padding: 16, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>Message</div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.7 }}>{selected.message}</p>
                </div>
              )}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Update Status</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                    <button key={s} onClick={() => updateStatus(selected._id, s)} style={{
                      padding: '8px 16px', borderRadius: 8, border: `1px solid ${selected.status === s ? statusColors[s] : '#e8ecf4'}`,
                      background: selected.status === s ? statusColors[s] : '#fff',
                      color: selected.status === s ? '#fff' : '#64748b', fontSize: 13, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href={`mailto:${selected.email}`} className="btn btn-dark" style={{ fontSize: 14, padding: '10px 20px' }}>
                  <FiMail size={14} /> Email Client
                </a>
                <a href={`tel:${selected.phone}`} className="btn" style={{ background: '#f8f9fc', color: '#0b3d24', border: '1px solid #e8ecf4', fontSize: 14, padding: '10px 20px' }}>
                  <FiPhone size={14} /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
