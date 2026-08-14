import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome, FiCalendar, FiZap, FiStar, FiFileText,
  FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX,
  FiExternalLink, FiChevronRight
} from 'react-icons/fi';

const navItems = [
  { icon: FiHome, label: 'Dashboard', path: '/admin' },
  { icon: FiCalendar, label: 'Bookings', path: '/admin/bookings' },
  { icon: FiZap, label: 'Services', path: '/admin/services' },
  { icon: FiStar, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: FiFileText, label: 'Blog & News', path: '/admin/blog' },
  { icon: FiMessageSquare, label: 'Messages', path: '/admin/messages' },
  { icon: FiSettings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, background: '#1a7d3c', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 18 }}>K</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 13, lineHeight: 1 }}>K CHARGING</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.15em', marginTop: 2 }}>ADMIN PANEL</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>Main Menu</div>
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} end={item.path === '/admin'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px',
              borderRadius: 10, marginBottom: 2, fontSize: 14, fontWeight: 500,
              color: isActive ? '#0b3d24' : 'rgba(255,255,255,0.65)',
              background: isActive ? '#1a7d3c' : 'transparent',
              transition: 'all 0.2s',
            })}
            onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'transparent'; }}
          >
            <item.icon size={17} />
            <span style={{ flex: 1 }}>{item.label}</span>
            <FiChevronRight size={14} style={{ opacity: 0.4 }} />
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', marginBottom: 4 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #1a7d3c, #4ade80)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{user?.role}</div>
          </div>
        </div>
        <a href="/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>
          <FiExternalLink size={15} /> View Website
        </a>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, fontSize: 13, color: '#ef4444', background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
          <FiLogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fc' }}>
      {/* Desktop Sidebar */}
      <div style={{ width: 240, background: '#0b3d24', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }} className="admin-sidebar">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, background: '#0b3d24', zIndex: 1 }}>
            <button onClick={() => setSidebarOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FiX size={22} /></button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }} className="admin-content">
        {/* Mobile topbar */}
        <div style={{ display: 'none', alignItems: 'center', padding: '16px', background: '#0b3d24', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="admin-topbar">
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: 16 }}><FiMenu size={22} /></button>
          <span style={{ color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700 }}>K Charging Admin</span>
        </div>
        <Outlet />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-content { margin-left: 0 !important; }
          .admin-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
