import Card from '../../components/layout/Card';
import Badge from '../../components/common/Badge';

const Settings = () => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h2 style={{ margin: 0 }}>Settings</h2>
          <Badge tone="primary">Placeholder</Badge>
        </div>
      </Card>

      <Card>
        <p style={{ margin: 0, color: '#444' }}>Employee settings will be configured in a future module update.</p>
      </Card>
    </div>
  );
};

export default Settings;
