import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/forms/Input';
import employeeService from '../../services/employeeService';

const defaultProfile = {
  firstName: '',
  lastName: '',
  personalEmail: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  fatherName: '',
  motherName: '',
  spouseName: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  emergencyContactRelation: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  department: '',
  designation: '',
  joiningDate: '',
  employmentType: '',
  reportingManager: '',
  workLocation: '',
  previousExperience: '',
  skills: [],
  bankName: '',
  bankAccountName: '',
  bankAccountNumber: '',
  bankIfscCode: ''
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await employeeService.getEmployeeProfile();
        setProfile({ ...defaultProfile, ...response.data.employee });
      } catch (error) {
        setProfile(defaultProfile);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: name === 'skills' ? value.split(',').map((skill) => skill.trim()).filter(Boolean) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await employeeService.upsertEmployeeProfile(profile);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Profile update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Employee profile</h2>
          <Badge tone="primary">Editable</Badge>
        </div>
      </Card>

      {message && (
        <Card style={{ background: message.includes('success') ? '#edf9ef' : '#fff1f1', borderColor: message.includes('success') ? '#c6e9d8' : '#f4c3c3' }}>
          <div style={{ color: message.includes('success') ? '#2e7d32' : '#a22525' }}>{message}</div>
        </Card>
      )}

      <Card>
        <h3 style={{ marginTop: 0 }}>Personal details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>First name</label>
            <Input name="firstName" value={profile.firstName} onChange={handleChange} placeholder="First name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Last name</label>
            <Input name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Last name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
            <Input type="email" name="personalEmail" value={profile.personalEmail} onChange={handleChange} placeholder="Email" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Phone</label>
            <Input name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} placeholder="Phone number" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Date of birth</label>
            <Input type="date" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Gender</label>
            <Input name="gender" value={profile.gender} onChange={handleChange} placeholder="Gender" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Family details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Father's name</label>
            <Input name="fatherName" value={profile.fatherName} onChange={handleChange} placeholder="Father's name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Mother's name</label>
            <Input name="motherName" value={profile.motherName} onChange={handleChange} placeholder="Mother's name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Spouse name</label>
            <Input name="spouseName" value={profile.spouseName} onChange={handleChange} placeholder="Spouse name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Emergency contact name</label>
            <Input name="emergencyContactName" value={profile.emergencyContactName} onChange={handleChange} placeholder="Emergency contact name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Emergency contact number</label>
            <Input name="emergencyContactNumber" value={profile.emergencyContactNumber} onChange={handleChange} placeholder="Emergency contact number" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Relation</label>
            <Input name="emergencyContactRelation" value={profile.emergencyContactRelation} onChange={handleChange} placeholder="Relation" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Address line 1</label>
            <Input name="addressLine1" value={profile.addressLine1} onChange={handleChange} placeholder="Street address" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Address line 2</label>
            <Input name="addressLine2" value={profile.addressLine2} onChange={handleChange} placeholder="Apartment, building, etc." />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>City</label>
            <Input name="city" value={profile.city} onChange={handleChange} placeholder="City" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>State</label>
            <Input name="state" value={profile.state} onChange={handleChange} placeholder="State" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Postal code</label>
            <Input name="postalCode" value={profile.postalCode} onChange={handleChange} placeholder="Postal code" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Country</label>
            <Input name="country" value={profile.country} onChange={handleChange} placeholder="Country" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Work details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Department</label>
            <Input name="department" value={profile.department} onChange={handleChange} placeholder="Department" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Designation</label>
            <Input name="designation" value={profile.designation} onChange={handleChange} placeholder="Designation" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Joining date</label>
            <Input type="date" name="joiningDate" value={profile.joiningDate} onChange={handleChange} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Employment type</label>
            <select name="employmentType" value={profile.employmentType} onChange={handleChange} style={{ width: '100%', border: '1px solid #e9e9e9', borderRadius: 10, padding: '0.75rem 0.8rem', background: '#fff' }}>
              <option value="">Select employment type</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Reporting manager</label>
            <Input name="reportingManager" value={profile.reportingManager} onChange={handleChange} placeholder="Manager name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Work location</label>
            <Input name="workLocation" value={profile.workLocation} onChange={handleChange} placeholder="Office location" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Previous experience (years)</label>
            <Input type="number" name="previousExperience" value={profile.previousExperience} onChange={handleChange} placeholder="Years" />
          </div>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Skills</label>
          <Input name="skills" value={profile.skills.join(', ')} onChange={handleChange} placeholder="Leadership, Excel, Communication" />
          <small style={{ display: 'block', marginTop: '0.35rem', color: '#5c5c5c' }}>Separate skills with commas.</small>
        </div>
      </Card>

      <Card>
        <h3 style={{ marginTop: 0 }}>Bank details</h3>
        <p style={{ marginTop: 0, color: '#5c5c5c', fontSize: '0.9rem' }}>Optional. Only your own profile can access these details.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <Input name="bankName" value={profile.bankName} onChange={handleChange} placeholder="Bank name" />
          <Input name="bankAccountName" value={profile.bankAccountName} onChange={handleChange} placeholder="Account holder name" />
          <Input name="bankAccountNumber" value={profile.bankAccountNumber} onChange={handleChange} placeholder="Account number" inputMode="numeric" />
          <Input name="bankIfscCode" value={profile.bankIfscCode} onChange={handleChange} placeholder="IFSC / routing code" />
        </div>
      </Card>

      <Card>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            border: 'none',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #ff6a00, #e55a00)',
            color: '#fff',
            padding: '0.9rem 1rem',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          {loading ? 'Saving...' : 'Save profile'}
        </button>
      </Card>
    </form>
  );
};

export default Profile;
