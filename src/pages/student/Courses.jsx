import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';

const Courses = () => {
  return (
    <Card>
      <h2 style={{ marginTop: 0 }}>Courses</h2>
      <p style={{ color: '#5c5c5c' }}>Course listings and enrollment details will be available in the next phase.</p>
      <Badge tone="primary">Coming soon</Badge>
    </Card>
  );
};

export default Courses;
