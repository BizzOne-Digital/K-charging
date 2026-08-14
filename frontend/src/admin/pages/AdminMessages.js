import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiMessageSquare, FiMail, FiTrash2, FiPhone, FiCheck, FiSearch } from 'react-icons/fi';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [filterRead, setFilterRead] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const params = filterRead !== '' ? `?isRead=${filterRead}` : '';
      const r = await api.get(`/contact${params}`);
      setMessages(r.data.messages || []);
      setTotal(r.data.total || 0);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [filterRead]);

  const markRead = async (id) => {
    try {
      await api.put(`/contact/${id}`, { isRead: true });
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
      if (selected?._id === id) setSelected(prev => ({ ...prev, isRead: true }));
    } catch { toast.error('Failed to update'); }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message deleted');
      if (selected?._id === id) setSelected(null);
      load();
    } catch { toast.error('Delete failed'); }
  };

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg._id);
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  const filtered = messages.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase()) ||
    m.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0d1b2e', marginBottom: 4 }}>
            Messages
            {unreadCount > 0 && (
              <span style={{ marginLeft: 12, background: '#ef4444', color: '#fff', fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 100 }}>
                {unreadCount} new
              </span>
            )}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>{total} total contact messages</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 20, minHeight: 500 }}>
        {/* Message List */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Search + filter */}
          <div style={{ padding: 16, borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <FiSearch size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
                style={{ width: '100%', padding: '9px 12px 9px 34px', borderRadius: 8, border: '1px solid #e8ecf4', fontSize: 13, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['', 'All'], ['false', 'Unread'], ['true', 'Read']].map(([val, label]) => (
                <button key={val} onClick={() => setFilterRead(val)} style={{
                  flex: 1, padding: '6px', borderRadius: 8, border: `1px solid ${filterRead === val ? '#0d1b2e' : '#e8ecf4'}`,
                  background: filterRead === val ? '#0d1b2e' : '#fff', color: filterRead === val ? '#fff' : '#64748b',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}>{label}</button>
              ))}
            </div>
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: 32, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>Loading...</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
                <FiMessageSquare size={32} style={{ marginBottom: 10, opacity: 0.3 }} />
                <p style={{ fontSize: 14 }}>No messages found</p>
              </div>
            ) : filtered.map(msg => (
              <div key={msg._id} onClick={() => openMessage(msg)} style={{
                padding: '16px 18px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                background: selected?._id === msg._id ? '#f0f4ff' : (!msg.isRead ? '#fffbf0' : '#fff'),
                borderLeft: `3px solid ${selected?._id === msg._id ? '#3d7fff' : (!msg.isRead ? '#f5a623' : 'transparent')}`,
                transition: 'background 0.15s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: msg.isRead ? 500 : 700, color: '#0d1b2e', flex: 1 }}>{msg.name}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{new Date(msg.createdAt).toLocaleDateString()}</div>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{msg.email}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {msg.subject || msg.message}
                </div>
                {!msg.isRead && (
                  <div style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#f5a623', marginTop: 6 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden' }}>
          {!selected ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', color: '#94a3b8', padding: 40 }}>
              <FiMail size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
              <p style={{ fontSize: 15 }}>Select a message to read</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 17, color: '#0d1b2e', marginBottom: 4 }}>
                    {selected.subject || 'No Subject'}
                  </h3>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {!selected.isRead && (
                    <button onClick={() => markRead(selected._id)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.06)', color: '#22c55e', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FiCheck size={14} /> Mark Read
                    </button>
                  )}
                  <button onClick={() => deleteMessage(selected._id)} style={{ padding: '8px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444' }}>
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Sender Info */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', background: '#f8f9fc', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { label: 'From', value: selected.name },
                  { label: 'Email', value: selected.email },
                  { label: 'Phone', value: selected.phone || '—' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0d1b2e' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Message Body */}
              <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{selected.message}</p>
              </div>

              {/* Reply Actions */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12 }}>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your Inquiry'}`} className="btn btn-primary" style={{ fontSize: 14, padding: '10px 20px' }}>
                  <FiMail size={15} /> Reply via Email
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="btn" style={{ background: '#f8f9fc', color: '#0d1b2e', border: '1px solid #e8ecf4', fontSize: 14, padding: '10px 20px' }}>
                    <FiPhone size={15} /> Call
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
