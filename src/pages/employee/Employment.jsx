import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import employeeService from '../../services/employeeService';

const Employment = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeService.getEmployeeProfile();
        setEmployee(response.data.employee);
      } catch (error) {
        setEmployee({
          department: 'Operations',
          designation: 'Team Member',
          employmentType: 'Full-time',
          workLocation: 'Office',
          reportingManager: 'Manager'
        });
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Employment details</h2>
          <Badge tone="success">Active</Badge>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        <Card>
          <h3 style={{ marginTop: 0 }}>Role and team</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            <div><strong>Department:</strong> {employee?.department || '—'}</div>
            <div><strong>Designation:</strong> {employee?.designation || '—'}</div>
            <div><strong>Reporting manager:</strong> {employee?.reportingManager || '—'}</div>
            <div><strong>Work location:</strong> {employee?.workLocation || '—'}</div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Employment summary</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            <div><strong>Employment type:</strong> {employee?.employmentType || '—'}</div>
            <div><strong>Joining date:</strong> {employee?.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : '—'}</div>
            <div><strong>Previous experience:</strong> {employee?.previousExperience ?? 0} years</div>
            <div><strong>Skills:</strong> {(employee?.skills || []).join(', ') || '—'}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Employment;
