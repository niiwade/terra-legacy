'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';

export default function AdminTestimonialEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    authorName: '', authorRole: '', authorImage: '', content: '', rating: '5', category: '', isActive: true, sortOrder: '0',
  });

  useEffect(() => { if (!isNew) fetchData(); }, [id, isNew]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`);
      const data = await res.json();
      if (data.testimonial) {
        const t = data.testimonial;
        setFormData({
          authorName: t.authorName || '', authorRole: t.authorRole || '', authorImage: t.authorImage || '',
          content: t.content || '', rating: t.rating?.toString() || '5', category: t.category || '',
          isActive: t.isActive !== false, sortOrder: t.sortOrder?.toString() || '0',
        });
      }
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'testimonials');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.file) setFormData(prev => ({ ...prev, authorImage: data.file.url }));
    } catch (error) { console.error('Upload error:', error); }
    finally { setUploadingImage(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const body = { ...formData, rating: parseInt(formData.rating), sortOrder: parseInt(formData.sortOrder) };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) router.push('/admin/testimonials');
      else alert('Failed to save');
    } catch (error) { console.error('Save error:', error); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/admin/testimonials" className="p-2 text-gray-500 hover:text-[#3c4b33] mr-2"><FiArrowLeft className="w-5 h-5" /></Link>
        <h2 className="text-2xl font-bold text-gray-900">{isNew ? 'New Testimonial' : 'Edit Testimonial'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Name *</label>
              <input type="text" required value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Role</label>
              <input type="text" value={formData.authorRole} onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })} placeholder="e.g., Land Investor" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content *</label>
            <textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Image</label>
            <div className="flex items-center space-x-4">
              <input type="text" value={formData.authorImage} onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
              <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                <FiUpload className="w-4 h-4 mr-2" />{uploadingImage ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
              </label>
            </div>
            {formData.authorImage && <img src={formData.authorImage} alt="Preview" className="mt-2 h-16 w-16 object-cover rounded-full" />}
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
