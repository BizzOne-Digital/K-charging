import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
      boxShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', padding: '6px 0' }}>
          <img src="/primary_green.png" alt="K Charging Solutions" style={{ height: 32, width: 'auto' }} />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: location.pathname === link.path ? '#1a7d3c' : '#475569',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#1a7d3c'}
            onMouseLeave={e => e.target.style.color = location.pathname === link.path ? '#1a7d3c' : '#475569'}
            >{link.label}</Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="desktop-nav">
          <a href="tel:+15146612494" style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500,
            color: '#64748b'
          }}>
            <FiPhone size={15} /> +1 514 661 2494
          </a>
          <Link to="/booking" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>
            Book a Consultation
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: 'none', color: '#0b3d24',
          display: 'none', padding: 8,
        }} className="mobile-menu-btn">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: '#fff', padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              padding: '12px 16px', color: location.pathname === link.path ? '#1a7d3c' : '#475569',
              fontWeight: 500, borderRadius: 8, fontSize: 15,
            }}>{link.label}</Link>
          ))}
          <Link to="/booking" className="btn btn-primary" style={{ marginTop: 12, justifyContent: 'center' }}>
            Book a Consultation
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
