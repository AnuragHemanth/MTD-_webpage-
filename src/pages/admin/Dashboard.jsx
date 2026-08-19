import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import adminService from '../../services/adminService';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        setStats(response.data.stats || {});
      } catch (error) {
        setStats({
          totalStudents: 0,
          totalEmployees: 0,
          pendingRegistrations: 0,
          pendingDocuments: 0,
          verifiedDocuments: 0,
          totalUsers: 0
        });
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: 'Total students', value: stats.totalStudents || 0 },
    { label: 'Total employees', value: stats.totalEmployees || 0 },
    { label: 'Pending registrations', value: stats.pendingRegistrations || 0 },
    { label: 'Pending documents', value: stats.pendingDocuments || 0 },
    { label: 'Verified documents', value: stats.verifiedDocuments || 0 },
    { label: 'Total users', value: stats.totalUsers || 0 }
  ];

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <Card>
        <h2 style={{ margin: 0 }}>Admin dashboard</h2>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {cards.map((card) => (
          <Card key={card.label} style={{ background: '#fffaf7' }}>
            <div style={{ color: '#666', fontSize: '0.8rem' }}>{card.label}</div>
            <h3 style={{ margin: '0.5rem 0 0', fontSize: '2rem' }}>{card.value}</h3>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
