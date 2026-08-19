import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/layout/Card';
import TableControls from '../../components/admin/TableControls';
import adminService from '../../services/adminService';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [ids, setIds] = useState({});
  const pageSize = 8;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await adminService.getStudents();
        setStudents(response.data.students || []);
      } catch (error) {
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return students.filter((student) => {
      const values = `${student.firstName || ''} ${student.lastName || ''} ${student.email || ''} ${student.studentId || ''} ${student.course || ''}`.toLowerCase();
      return values.includes(query);
    });
  }, [students, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const saveId = async (student) => {
    try {
      await adminService.updateStudentId(student._id, ids[student._id] || student.studentId);
      setStudents((current) => current.map((item) => item._id === student._id ? { ...item, studentId: ids[student._id] || student.studentId } : item));
    } catch (error) {
      alert(error?.response?.data?.message || 'Student ID could not be saved.');
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <Card>
      <h2 style={{ marginTop: 0 }}>Students</h2>
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
                <th style={{ padding: '0.8rem' }}>Student ID</th>
                <th style={{ padding: '0.8rem' }}>Course</th>
                <th style={{ padding: '0.8rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((student) => (
                <tr key={student._id || student.studentId} style={{ borderBottom: '1px solid #f3f3f3' }}>
                  <td style={{ padding: '0.8rem' }}>{student.firstName || 'N/A'} {student.lastName || ''}</td>
                  <td style={{ padding: '0.8rem' }}><div style={{ display: 'flex', gap: '0.4rem', minWidth: 180 }}><input value={ids[student._id] ?? student.studentId ?? ''} onChange={(event) => setIds((current) => ({ ...current, [student._id]: event.target.value }))} aria-label={`Student ID for ${student.firstName || 'student'}`} /><button type="button" onClick={() => saveId(student)} style={{ border: 0, borderRadius: 8, background: '#fff5ee', color: '#ff6a00', padding: '0.4rem 0.6rem' }}>Save</button></div></td>
                  <td style={{ padding: '0.8rem' }}>{student.course || 'N/A'}</td>
                  <td style={{ padding: '0.8rem' }}>{student.profileCompletion || 0}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableControls>
    </Card>
  );
};

export default Students;
