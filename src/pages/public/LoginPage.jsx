import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appConfig, BASE_PATH } from '../../config/appConfig';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validation = useMemo(() => ({
    email: !formData.email.trim() ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Enter a valid email address.' : '',
    password: !formData.password ? 'Password is required.' : formData.password.length < 8 ? 'Password must be at least 8 characters.' : ''
  }), [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {
      email: validation.email,
      password: validation.password
    };

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await login({ email: formData.email.trim(), password: formData.password });
      const normalizedRole = String(response?.user?.role || 'student').toLowerCase();
      navigate(`${BASE_PATH}/${normalizedRole}/dashboard`);
    } catch (loginError) {
      setError(loginError?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', background: appConfig.colors.surface, borderRadius: 20, boxShadow: '0 16px 40px rgba(0,0,0,0.06)', border: `1px solid ${appConfig.colors.border}`, padding: '2rem' }}>
      <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Login</h1>
      <p style={{ marginTop: '0.75rem', color: appConfig.colors.textMuted }}>Welcome back to your portal dashboard.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }} noValidate>
        <div>
          <label htmlFor="login-email" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Email</label>
          <input id="login-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-email-error' : undefined} style={{ width: '100%', borderRadius: 12, border: `1px solid ${errors.email ? '#dc2626' : appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none', boxShadow: errors.email ? '0 0 0 3px rgba(220,38,38,0.1)' : '0 0 0 1px transparent' }} />
          {errors.email && <div id="login-email-error" style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="login-password" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Password</label>
          <input id="login-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-password-error' : undefined} style={{ width: '100%', borderRadius: 12, border: `1px solid ${errors.password ? '#dc2626' : appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none', boxShadow: errors.password ? '0 0 0 3px rgba(220,38,38,0.1)' : '0 0 0 1px transparent' }} />
          {errors.password && <div id="login-password-error" style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.password}</div>}
        </div>

        {error && (
          <div style={{ background: '#fff1f1', border: '1px solid #f4c3c3', borderRadius: 12, color: '#a22525', padding: '0.75rem 0.9rem' }}>{error}</div>
        )}

        <button type="submit" disabled={loading} style={{ border: 'none', borderRadius: 12, background: appConfig.colors.gradient, color: appConfig.colors.textWhite, padding: '0.9rem 1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'box-shadow 0.2s ease', outline: 'none' }} onFocus={(event) => { event.target.style.boxShadow = '0 0 0 3px rgba(255,106,0,0.2)'; }} onBlur={(event) => { event.target.style.boxShadow = 'none'; }}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
