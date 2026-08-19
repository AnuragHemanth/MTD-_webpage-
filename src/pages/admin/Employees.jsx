import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import TableControls from '../../components/admin/TableControls';
import adminService from '../../services/adminService';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [ids, setIds] = useState({});
  const pageSize = 8;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await adminService.getEmployees();
        setEmployees(response.data.employees || []);
      } catch (error) {
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return employees.filter((employee) => {
      const values = `${employee.firstName || ''} ${employee.lastName || ''} ${employee.department || ''} ${employee.designation || ''} ${employee.employeeId || ''}`.toLowerCase();
      return values.includes(query);
    });
  }, [employees, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const saveId = async (employee) => {
    try {
      await adminService.updateEmployeeId(employee._id, ids[employee._id] || employee.employeeId);
      setEmployees((current) => current.map((item) => item._id === employee._id ? { ...item, employeeId: ids[employee._id] || employee.employeeId } : item));
    } catch (error) {
      alert(error?.response?.data?.message || 'Employee ID could not be saved.');
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <Card>
      <h2 style={{ marginTop: 0 }}>Employees</h2>
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
                <th style={{ padding: '0.8rem' }}>Employee ID</th>
                <th style={{ padding: '0.8rem' }}>Department</th>
                <th style={{ padding: '0.8rem' }}>Designation</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((employee) => (
                <tr key={employee._id || employee.employeeId} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.8rem' }}>{employee.firstName || 'N/A'} {employee.lastName || ''}</td>
                  <td style={{ padding: '0.8rem' }}><div style={{ display: 'flex', gap: '0.4rem', minWidth: 180 }}><input value={ids[employee._id] ?? employee.employeeId ?? ''} onChange={(event) => setIds((current) => ({ ...current, [employee._id]: event.target.value }))} aria-label={`Employee ID for ${employee.firstName || 'employee'}`} /><button type="button" onClick={() => saveId(employee)} style={{ border: 0, borderRadius: 8, background: '#fff5ee', color: '#ff6a00', padding: '0.4rem 0.6rem' }}>Save</button></div></td>
                  <td style={{ padding: '0.8rem' }}>{employee.department || 'N/A'}</td>
                  <td style={{ padding: '0.8rem' }}>{employee.designation || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableControls>
    </Card>
  );
};

export default Employees;
