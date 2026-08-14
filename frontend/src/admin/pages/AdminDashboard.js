import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FiCalendar, FiZap, FiMessageSquare, FiUsers, FiTrendingUp, FiArrowRight, FiClock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e8ecf4', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: 28, fontFamily: 'Space Grotesk', fontWeight: 800, color: '#0b3d24', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{sub}</div>}
    </div>
  </div>
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, thisMonth: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/bookings/stats').then(r => setStats(r.data)).catch(() => {});
    api.get('/bookings?limit=5').then(r => setRecentBookings(r.data.bookings || [])).catch(() => {});
    api.get('/services/admin/all').then(r => setServices(r.data)).catch(() => {});
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 28, color: '#0b3d24', marginBottom: 4 }}>
          {greeting}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 15 }}>Here's what's happening with K Charging Solutions today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
        <StatCard icon={FiCalendar} label="Total Bookings" value={stats.total} sub={`${stats.thisMonth} this month`} color="#2f9e55" />
        <StatCard icon={FiClock} label="Pending Review" value={stats.pending} sub="Needs attention" color="#f59e0b" />
        <StatCard icon={FiTrendingUp} label="Confirmed" value={stats.confirmed} color="#22c55e" />
        <StatCard icon={FiZap} label="Active Services" value={services.length} color="#1a7d3c" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent Bookings */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, color: '#0b3d24' }}>Recent Bookings</h3>
            <Link to="/admin/bookings" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#1a7d3c', fontWeight: 600 }}>
              View all <FiArrowRight size={13} />
            </Link>
          </div>
          <div>
            {recentBookings.length === 0 ? (
              <div style={{ padding: '32px 24px', textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>No bookings yet</div>
            ) : recentBookings.map(b => (
              <div key={b._id} style={{ padding: '14px 24px', borderBottom: '1px solid #f8f9fc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0b3d24' }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{b.service}</div>
                </div>
                <span className={`badge-status badge-${b.status}`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: 16, color: '#0b3d24' }}>Quick Actions</h3>
          </div>
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'View All Bookings', to: '/admin/bookings', icon: FiCalendar, color: '#2f9e55' },
              { label: 'Manage Services', to: '/admin/services', icon: FiZap, color: '#1a7d3c' },
              { label: 'Read Messages', to: '/admin/messages', icon: FiMessageSquare, color: '#22c55e' },
              { label: 'Add Testimonial', to: '/admin/testimonials', icon: FiUsers, color: '#8b5cf6' },
            ].map(action => (
              <Link key={action.to} to={action.to} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                borderRadius: 12, background: '#f8f9fc', border: '1px solid #e8ecf4',
                fontSize: 14, fontWeight: 600, color: '#0b3d24', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = action.color; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fc'; e.currentTarget.style.borderColor = '#e8ecf4'; }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${action.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <action.icon size={17} color={action.color} />
                </div>
                {action.label}
                <FiArrowRight size={14} style={{ marginLeft: 'auto', color: '#94a3b8' }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
