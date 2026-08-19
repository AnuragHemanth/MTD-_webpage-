import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appConfig, BASE_PATH } from '../../config/appConfig';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const RegisterPage = ({ defaultRole = 'STUDENT' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: defaultRole });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validation = useMemo(() => ({
    firstName: !formData.firstName.trim() ? 'First name is required.' : formData.firstName.trim().length < 2 ? 'First name is too short.' : '',
    lastName: !formData.lastName.trim() ? 'Last name is required.' : formData.lastName.trim().length < 2 ? 'Last name is too short.' : '',
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
      firstName: validation.firstName,
      lastName: validation.lastName,
      email: validation.email,
      password: validation.password,
      resume: formData.role === 'STUDENT' && !resume ? 'Resume is required for student registration.' : ''
    };

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const registrationPayload = new FormData();
      registrationPayload.append('firstName', formData.firstName.trim());
      registrationPayload.append('lastName', formData.lastName.trim());
      registrationPayload.append('email', formData.email.trim());
      registrationPayload.append('password', formData.password);
      registrationPayload.append('role', formData.role);
      if (resume) registrationPayload.append('resume', resume);
      await authService.register(registrationPayload);

      const loginResponse = await login({ email: formData.email.trim(), password: formData.password });
      const normalizedRole = String(loginResponse?.user?.role || formData.role).toLowerCase();
      navigate(`${BASE_PATH}/${normalizedRole}/dashboard`);
    } catch (registerError) {
      setError(registerError?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: appConfig.colors.surface, borderRadius: 20, boxShadow: '0 16px 40px rgba(0,0,0,0.06)', border: `1px solid ${appConfig.colors.border}`, padding: '2rem' }}>
      <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>Register</h1>
      <p style={{ marginTop: '0.75rem', color: appConfig.colors.textMuted }}>Create your account and choose whether you are registering as a student or employee.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
          <div>
            <label htmlFor="register-first-name" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>First name</label>
            <input id="register-first-name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? 'register-first-name-error' : undefined} style={{ width: '100%', borderRadius: 12, border: `1px solid ${errors.firstName ? '#dc2626' : appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none', boxShadow: errors.firstName ? '0 0 0 3px rgba(220,38,38,0.1)' : '0 0 0 1px transparent' }} />
            {errors.firstName && <div id="register-first-name-error" style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.firstName}</div>}
          </div>
          <div>
            <label htmlFor="register-last-name" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Last name</label>
            <input id="register-last-name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" aria-invalid={Boolean(errors.lastName)} aria-describedby={errors.lastName ? 'register-last-name-error' : undefined} style={{ width: '100%', borderRadius: 12, border: `1px solid ${errors.lastName ? '#dc2626' : appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none', boxShadow: errors.lastName ? '0 0 0 3px rgba(220,38,38,0.1)' : '0 0 0 1px transparent' }} />
            {errors.lastName && <div id="register-last-name-error" style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.lastName}</div>}
          </div>
        </div>

        <div>
          <label htmlFor="register-resume" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Resume {formData.role === 'STUDENT' ? '(required)' : '(optional)'}</label>
          <input id="register-resume" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required={formData.role === 'STUDENT'} onChange={(event) => { setResume(event.target.files?.[0] || null); setErrors((previous) => ({ ...previous, resume: '' })); }} />
          {errors.resume && <div style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.resume}</div>}
        </div>

        <div>
          <label htmlFor="register-role" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Registration type</label>
          <select id="register-role" name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', borderRadius: 12, border: `1px solid ${appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none' }}>
            <option value="STUDENT">Student</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>

        <div>
          <label htmlFor="register-email" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Email</label>
          <input id="register-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'register-email-error' : undefined} style={{ width: '100%', borderRadius: 12, border: `1px solid ${errors.email ? '#dc2626' : appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none', boxShadow: errors.email ? '0 0 0 3px rgba(220,38,38,0.1)' : '0 0 0 1px transparent' }} />
          {errors.email && <div id="register-email-error" style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="register-password" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Password</label>
          <input id="register-password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'register-password-error' : undefined} style={{ width: '100%', borderRadius: 12, border: `1px solid ${errors.password ? '#dc2626' : appConfig.colors.border}`, padding: '0.8rem 0.9rem', outline: 'none', boxShadow: errors.password ? '0 0 0 3px rgba(220,38,38,0.1)' : '0 0 0 1px transparent' }} />
          {errors.password && <div id="register-password-error" style={{ marginTop: '0.35rem', color: '#b42318', fontSize: '0.8rem' }}>{errors.password}</div>}
        </div>

        {error && (
          <div style={{ background: '#fff1f1', border: '1px solid #f4c3c3', borderRadius: 12, color: '#a22525', padding: '0.75rem 0.9rem' }}>{error}</div>
        )}

        <button type="submit" disabled={loading} style={{ border: 'none', borderRadius: 12, background: appConfig.colors.gradient, color: appConfig.colors.textWhite, padding: '0.9rem 1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'box-shadow 0.2s ease', outline: 'none' }} onFocus={(event) => { event.target.style.boxShadow = '0 0 0 3px rgba(255,106,0,0.2)'; }} onBlur={(event) => { event.target.style.boxShadow = 'none'; }}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
