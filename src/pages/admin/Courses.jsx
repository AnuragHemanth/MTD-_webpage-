import { useEffect, useState } from 'react';
import Card from '../../components/layout/Card';
import adminService from '../../services/adminService';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ courseId: '', title: '', duration: '', description: '' });
  const [message, setMessage] = useState('');

  const loadCourses = async () => {
    try {
      const response = await adminService.getCourses();
      setCourses(response.data.courses || []);
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Courses could not be loaded.');
    }
  };

  useEffect(() => { loadCourses(); }, []);

  const create = async (event) => {
    event.preventDefault();
    try {
      await adminService.createCourse(form);
      setForm({ courseId: '', title: '', duration: '', description: '' });
      setMessage('Course added successfully.');
      await loadCourses();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Course could not be added.');
    }
  };

  const remove = async (id) => {
    try {
      await adminService.deleteCourse(id);
      await loadCourses();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Course could not be removed.');
    }
  };

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Card><h2 style={{ margin: 0 }}>Courses</h2></Card>
      <Card>
        <form onSubmit={create} style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {Object.entries(form).map(([name, value]) => <input key={name} value={value} required={name === 'courseId' || name === 'title'} onChange={(event) => setForm({ ...form, [name]: event.target.value })} placeholder={name.replace(/([A-Z])/g, ' $1')} />)}
          <button type="submit" style={{ border: 0, borderRadius: 10, background: '#ff6a00', color: '#fff', padding: '0.75rem', fontWeight: 700 }}>Add course</button>
        </form>
        {message && <p role="status" style={{ color: message.includes('successfully') ? '#2e7d32' : '#b42318' }}>{message}</p>}
      </Card>
      <Card>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {courses.map((course) => <div key={course._id} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}><div><strong>{course.title}</strong><div style={{ color: '#666' }}>{course.courseId}{course.duration ? ` - ${course.duration}` : ''}</div></div><button type="button" onClick={() => remove(course._id)} style={{ border: 0, borderRadius: 8, background: '#fff1f1', color: '#b42318', padding: '0.6rem 0.8rem' }}>Remove</button></div>)}
        </div>
      </Card>
    </div>
  );
};

export default Courses;