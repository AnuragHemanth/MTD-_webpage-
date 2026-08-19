import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import TableControls from '../../components/admin/TableControls';
import adminService from '../../services/adminService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminService.getUsers();
        setUsers(response.data.users || []);
      } catch (error) {
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return users.filter((user) => {
      const values = `${user.firstName || ''} ${user.lastName || ''} ${user.email || ''} ${user.role || ''}`.toLowerCase();
      return values.includes(query);
    });
  }, [users, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <Card>
      <h2 style={{ marginTop: 0 }}>Users</h2>
      <TableControls
        search={search}
        onSearchChange={setSearch}
        page={page}
        pageCount={pageCount}
        total={filtered.length}
        onPrev={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(pageCount, current + 1))}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '0.8rem' }}>Name</th>
                <th style={{ padding: '0.8rem' }}>Email</th>
                <th style={{ padding: '0.8rem' }}>Role</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.8rem' }}>{user.firstName || 'N/A'} {user.lastName || ''}</td>
                  <td style={{ padding: '0.8rem' }}>{user.email || 'N/A'}</td>
                  <td style={{ padding: '0.8rem' }}>{user.role || 'N/A'}</td>
                  <td style={{ padding: '0.8rem' }}>{user.accountStatus || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableControls>
    </Card>
  );
};

export default Users;
