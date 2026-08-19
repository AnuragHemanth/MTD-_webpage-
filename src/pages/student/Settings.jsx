import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/forms/Input';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import { useState } from 'react';

const Settings = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await authService.updateCurrentUser(form);
      setUser(response.data.user);
      setMessage('Settings saved successfully.');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Settings could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
      <Card><h2 style={{ marginTop: 0 }}>Student settings</h2><Badge tone="primary">Account</Badge></Card>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
          <Input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} placeholder="First name" />
          <Input value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} placeholder="Last name" />
          <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
          <button type="submit" disabled={saving} style={{ width: '100%', border: 0, borderRadius: 10, background: '#ff6a00', color: '#fff', padding: '0.85rem', fontWeight: 700 }}>{saving ? 'Saving...' : 'Save settings'}</button>
          {message && <div role="status" style={{ color: message.includes('successfully') ? '#2e7d32' : '#b42318' }}>{message}</div>}
        </div>
      </Card>
    </form>
  );
};

export default Settings;
