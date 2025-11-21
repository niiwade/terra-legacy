'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiHelpCircle } from 'react-icons/fi';
import { FAQ } from '@/lib/db/schema';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    setDeleteId(id);
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) setFaqs(faqs.filter(f => f.id !== id));
    } catch (error) { console.error('Error:', error); }
    finally { setDeleteId(null); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
        <Link href="/admin/faqs/new" className="flex items-center px-4 py-2 bg-[#3c4b33] text-white rounded-lg hover:bg-[#4a5d3f]">
          <FiPlus className="w-4 h-4 mr-2" />New FAQ
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33] mx-auto"></div></div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No FAQs yet.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FiHelpCircle className="w-4 h-4 text-[#3c4b33] mr-2" />
                      <span className="font-medium text-gray-900">{item.question}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 ml-6">{item.answer}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <Link href={`/admin/faqs/${item.id}`} className="p-2 text-gray-500 hover:text-[#3c4b33]"><FiEdit2 className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(item.id)} disabled={deleteId === item.id} className="p-2 text-gray-500 hover:text-red-600 disabled:opacity-50"><FiTrash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
