import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';
import studentService from '../../services/studentService';

const defaultAcademic = {
  collegeName: '',
  university: '',
  course: '',
  branch: '',
  currentYear: '',
  currentSemester: '',
  rollNumber: '',
  cgpa: 0,
  backlogs: 0,
  skills: []
};

const Academic = () => {
  const [academic, setAcademic] = useState(defaultAcademic);

  useEffect(() => {
    const fetchAcademic = async () => {
      try {
        const response = await studentService.getStudentProfile();
        setAcademic({ ...defaultAcademic, ...response.data.student });
      } catch (error) {
        setAcademic(defaultAcademic);
      }
    };

    fetchAcademic();
  }, []);

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Academic overview</h2>
          <Badge tone="success">Current year: {academic.currentYear || '—'}</Badge>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        <Card>
          <h3 style={{ marginTop: 0 }}>Academic summary</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            <div><strong>College:</strong> {academic.collegeName || '—'}</div>
            <div><strong>University:</strong> {academic.university || '—'}</div>
            <div><strong>Course:</strong> {academic.course || '—'}</div>
            <div><strong>Branch:</strong> {academic.branch || '—'}</div>
            <div><strong>Semester:</strong> {academic.currentSemester || '—'}</div>
            <div><strong>Roll no:</strong> {academic.rollNumber || '—'}</div>
            <div><strong>CGPA:</strong> {academic.cgpa || '0.00'}</div>
            <div><strong>Backlogs:</strong> {academic.backlogs ?? 0}</div>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginTop: 0 }}>Skills</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(academic.skills?.length ? academic.skills : ['No skills added']).map((skill, index) => (
              <Badge key={`${skill}-${index}`} tone={index % 2 === 0 ? 'primary' : 'success'}>{skill}</Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Academic;
