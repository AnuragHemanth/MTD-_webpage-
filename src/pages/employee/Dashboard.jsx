import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import employeeService from '../../services/employeeService';
import { appConfig } from '../../config/appConfig';

const Dashboard = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeService.getEmployeeProfile();
        setEmployee(response.data.employee);
      } catch (error) {
        setEmployee({
          firstName: 'Employee',
          lastName: 'User',
          department: 'Operations',
          designation: 'Team Member',
          employeeId: 'N/A',
          workLocation: 'Office',
          joiningDate: null,
          profileCompletion: 0
        });
      }
    };

    fetchEmployee();
  }, []);

  const profileCompletion = employee?.profileCompletion ?? 0;

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <Card style={{ background: appConfig.colors.gradient, color: appConfig.colors.textWhite }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>Welcome back</div>
            <h2 style={{ margin: '0.35rem 0 0', fontSize: '2rem' }}>{employee?.firstName || 'Employee'} {employee?.lastName || ''}</h2>
          </div>
          <Badge tone="primary">{employee?.department || 'Department'} • {employee?.designation || 'Role'}</Badge>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <Card>
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>Profile completion</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '2rem' }}>{profileCompletion}%</h3>
          <div style={{ height: 10, borderRadius: 999, background: '#f1f1f1', overflow: 'hidden' }}>
            <div style={{ width: `${profileCompletion}%`, height: '100%', background: appConfig.colors.gradient }} />
          </div>
        </Card>

        <Card>
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>Employee ID</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{employee?.employeeId || 'N/A'}</h3>
        </Card>

        <Card>
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>Department</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.15rem' }}>{employee?.department || 'Not assigned'}</h3>
        </Card>

        <Card>
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>Work location</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{employee?.workLocation || 'Not set'}</h3>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        <Card>
          <h3 style={{ marginTop: 0 }}>Employment summary</h3>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <div><strong>Designation:</strong> {employee?.designation || 'Not added'}</div>
            <div><strong>Manager:</strong> {employee?.reportingManager || 'Not assigned'}</div>
            <div><strong>Joining date:</strong> {employee?.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'Not added'}</div>
            <div><strong>Employment type:</strong> {employee?.employmentType || 'Not added'}</div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Document status</h3>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <div><Badge tone="success">Offer letter uploaded</Badge></div>
            <div><Badge tone="warning">ID proof pending</Badge></div>
            <div><Badge tone="primary">Background check in progress</Badge></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
