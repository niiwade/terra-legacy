'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function AdminFAQEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    question: '', answer: '', category: '', isActive: true, sortOrder: '0',
  });

  useEffect(() => { if (!isNew) fetchData(); }, [id, isNew]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/faqs/${id}`);
      const data = await res.json();
      if (data.faq) {
        const f = data.faq;
        setFormData({
          question: f.question || '', answer: f.answer || '', category: f.category || '',
          isActive: f.isActive !== false, sortOrder: f.sortOrder?.toString() || '0',
        });
      }
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const body = { ...formData, sortOrder: parseInt(formData.sortOrder) };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) router.push('/admin/faqs');
      else alert('Failed to save');
    } catch (error) { console.error('Save error:', error); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/admin/faqs" className="p-2 text-gray-500 hover:text-[#3c4b33] mr-2"><FiArrowLeft className="w-5 h-5" /></Link>
        <h2 className="text-2xl font-bold text-gray-900">{isNew ? 'New FAQ' : 'Edit FAQ'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
            <input type="text" required value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Answer *</label>
            <textarea required value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} rows={6} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
          </div>

          <label className="flex items-center">
            <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded border-gray-300 text-[#3c4b33] focus:ring-[#3c4b33]" />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center px-6 py-2 bg-[#3c4b33] text-white rounded-lg hover:bg-[#4a5d3f] disabled:opacity-50">
            <FiSave className="w-4 h-4 mr-2" />{saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
