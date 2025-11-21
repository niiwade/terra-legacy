'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiBook } from 'react-icons/fi';
import { Course } from '@/lib/db/schema';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      setCourses(data.courses || []);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    setDeleteId(id);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      if (res.ok) setCourses(courses.filter(c => c.id !== id));
    } catch (error) { console.error('Error:', error); }
    finally { setDeleteId(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <Link href="/admin/courses-admin/new" className="flex items-center px-4 py-2 bg-[#3c4b33] text-white rounded-lg hover:bg-[#4a5d3f]">
          <FiPlus className="w-4 h-4 mr-2" />New Course
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33] mx-auto"></div></div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No courses yet.</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {course.imageUrl ? (
                        <img src={course.imageUrl} alt={course.title} className="w-10 h-10 rounded object-cover mr-3" />
                      ) : (
                        <FiBook className="w-10 h-10 text-gray-300 mr-3" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.category} • {course.level}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">${course.price}</p>
                    {course.salePrice && <p className="text-sm text-green-600">${course.salePrice}</p>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{course.instructor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {course.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/courses-admin/${course.id}`} className="p-2 text-gray-500 hover:text-[#3c4b33]"><FiEdit2 className="w-4 h-4" /></Link>
                      <button onClick={() => handleDelete(course.id)} disabled={deleteId === course.id} className="p-2 text-gray-500 hover:text-red-600 disabled:opacity-50"><FiTrash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
