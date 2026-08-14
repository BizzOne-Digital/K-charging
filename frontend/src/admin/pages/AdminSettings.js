import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { FiSave, FiSettings, FiPhone, FiMail, FiMapPin, FiFacebook, FiLinkedin, FiInstagram, FiTwitter, FiGlobe, FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid #e8ecf4', fontSize: 14, outline: 'none', fontFamily: 'Inter', color: '#0b3d24' };

export default function AdminSettings() {
  const { user } = useAuth();
  const [tab, setTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'K Charging Solutions', siteTagline: 'Smart. Reliable. Future-Ready.',
    phone: '+1 514 661 2494', email: 'info@kchargingsolutions.com', address: 'Canada',
    facebook: '', linkedin: '', instagram: '', twitter: '',
  });
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    api.get('/settings').then(r => {
      setSettings(prev => ({ ...prev, ...r.data }));
    }).catch(() => {});
  }, []);

  const saveSettings = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings saved successfully');
    } catch { toast.error('Failed to save settings'); }
    finally { setLoading(false); }
  };

  const saveProfile = async e => {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setProfileLoading(true);
    try {
      await api.put('/auth/profile', {
        name: profile.name,
        email: profile.email,
        ...(profile.currentPassword && { currentPassword: profile.currentPassword, newPassword: profile.newPassword }),
      });
      toast.success('Profile updated');
      setProfile(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setProfileLoading(false); }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'contact', label: 'Contact Info', icon: FiPhone },
    { id: 'social', label: 'Social Media', icon: FiGlobe },
    { id: 'profile', label: 'Admin Profile', icon: FiUser },
  ];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 26, color: '#0b3d24', marginBottom: 4 }}>Settings</h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>Manage website configuration and admin account</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
        {/* Tab Nav */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', padding: 12, height: 'fit-content' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '11px 14px',
              borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              background: tab === t.id ? '#0b3d24' : 'transparent',
              color: tab === t.id ? '#fff' : '#64748b',
              marginBottom: 4, transition: 'all 0.2s', textAlign: 'left',
            }}>
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ecf4', padding: 32 }}>

          {/* General */}
          {tab === 'general' && (
            <form onSubmit={saveSettings}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24', marginBottom: 24 }}>General Settings</h2>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Site Name</label>
                <input value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Tagline</label>
                <input value={settings.siteTagline} onChange={e => setSettings({ ...settings, siteTagline: e.target.value })} style={inputStyle} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : <><FiSave size={15} /> Save Settings</>}
              </button>
            </form>
          )}

          {/* Contact */}
          {tab === 'contact' && (
            <form onSubmit={saveSettings}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24', marginBottom: 24 }}>Contact Information</h2>
              {[
                { key: 'phone', label: 'Phone Number', icon: FiPhone, placeholder: '+1 514 661 2494' },
                { key: 'email', label: 'Email Address', icon: FiMail, placeholder: 'info@kchargingsolutions.com' },
                { key: 'address', label: 'Address / Location', icon: FiMapPin, placeholder: 'City, Province, Canada' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    <field.icon size={13} style={{ marginRight: 6 }} />{field.label}
                  </label>
                  <input value={settings[field.key] || ''} onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                    style={inputStyle} placeholder={field.placeholder} />
                </div>
              ))}
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? 'Saving...' : <><FiSave size={15} /> Save Contact Info</>}
              </button>
            </form>
          )}

          {/* Social */}
          {tab === 'social' && (
            <form onSubmit={saveSettings}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24', marginBottom: 24 }}>Social Media Links</h2>
              {[
                { key: 'facebook', label: 'Facebook', icon: FiFacebook, placeholder: 'https://facebook.com/kchargingsolutions' },
                { key: 'linkedin', label: 'LinkedIn', icon: FiLinkedin, placeholder: 'https://linkedin.com/company/k-charging' },
                { key: 'instagram', label: 'Instagram', icon: FiInstagram, placeholder: 'https://instagram.com/kcharging' },
                { key: 'twitter', label: 'Twitter / X', icon: FiTwitter, placeholder: 'https://twitter.com/kcharging' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    <field.icon size={13} style={{ marginRight: 6 }} />{field.label}
                  </label>
                  <input value={settings[field.key] || ''} onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                    style={inputStyle} placeholder={field.placeholder} type="url" />
                </div>
              ))}
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 8 }}>
                {loading ? 'Saving...' : <><FiSave size={15} /> Save Social Links</>}
              </button>
            </form>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <form onSubmit={saveProfile}>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 18, color: '#0b3d24', marginBottom: 24 }}>Admin Profile</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    <FiUser size={13} style={{ marginRight: 6 }} />Full Name
                  </label>
                  <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                    <FiMail size={13} style={{ marginRight: 6 }} />Email Address
                  </label>
                  <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 24, marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                  <FiLock size={14} style={{ marginRight: 6 }} />Change Password
                </h3>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Leave blank to keep current password</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  {[
                    { key: 'currentPassword', label: 'Current Password' },
                    { key: 'newPassword', label: 'New Password' },
                    { key: 'confirmPassword', label: 'Confirm New Password' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{f.label}</label>
                      <input type="password" value={profile[f.key]} onChange={e => setProfile({ ...profile, [f.key]: e.target.value })} style={inputStyle} placeholder="••••••••" />
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                {profileLoading ? 'Saving...' : <><FiSave size={15} /> Update Profile</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
