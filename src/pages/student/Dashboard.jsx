import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import studentService from '../../services/studentService';
import { appConfig } from '../../config/appConfig';

const Dashboard = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await studentService.getStudentProfile();
        setStudent(response.data.student);
      } catch (error) {
        setStudent({
          firstName: 'Student',
          lastName: 'User',
          collegeName: 'Your College',
          course: 'Course',
          branch: 'Branch',
          currentSemester: 'Semester',
          cgpa: 0,
          studentId: 'N/A',
          profileCompletion: 0
        });
      }
    };

    fetchStudent();
  }, []);

  const profileCompletion = student?.profileCompletion ?? 0;

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <Card style={{ background: appConfig.colors.gradient, color: appConfig.colors.textWhite }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.8rem', letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8 }}>Welcome back</div>
            <h2 style={{ margin: '0.35rem 0 0', fontSize: '2rem' }}>{student?.firstName || 'Student'} {student?.lastName || ''}</h2>
          </div>
          <Badge tone="primary">{student?.currentSemester || 'Semester'} • {student?.course || 'Course'}</Badge>
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
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>Student ID</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{student?.studentId || 'N/A'}</h3>
        </Card>

        <Card>
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>Course / Branch</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.15rem' }}>{student?.course || 'Course'} / {student?.branch || 'Branch'}</h3>
        </Card>

        <Card>
          <div style={{ color: appConfig.colors.textMuted, fontSize: '0.8rem' }}>CGPA</div>
          <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem' }}>{student?.cgpa || '0.00'}</h3>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        <Card>
          <h3 style={{ marginTop: 0 }}>Academic snapshot</h3>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <div><strong>College:</strong> {student?.collegeName || 'Not added'}</div>
            <div><strong>University:</strong> {student?.university || 'Not added'}</div>
            <div><strong>Semester:</strong> {student?.currentSemester || 'Not added'}</div>
            <div><strong>Backlogs:</strong> {student?.backlogs ?? 0}</div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Document status</h3>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            <div><Badge tone="warning">ID card pending</Badge></div>
            <div><Badge tone="success">Marksheets verified</Badge></div>
            <div><Badge tone="primary">Certificate review</Badge></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
