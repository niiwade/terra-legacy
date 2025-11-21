'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSave, FiUpload } from 'react-icons/fi';

export default function AdminEventEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    imageUrl: '',
    speaker: '',
    attendees: '0',
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    if (!isNew) fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isNew]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/admin/events/${id}`);
      const data = await res.json();
      if (data.event) {
        setFormData({
          title: data.event.title || '',
          description: data.event.description || '',
          date: data.event.date ? new Date(data.event.date).toISOString().split('T')[0] : '',
          time: data.event.time || '',
          location: data.event.location || '',
          category: data.event.category || '',
          imageUrl: data.event.imageUrl || '',
          speaker: data.event.speaker || '',
          attendees: data.event.attendees?.toString() || '0',
          isFeatured: data.event.isFeatured || false,
          isActive: data.event.isActive !== false,
        });
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'events');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formDataUpload });
      const data = await res.json();
      if (data.file) setFormData(prev => ({ ...prev, imageUrl: data.file.url }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/events' : `/api/admin/events/${id}`;
      const method = isNew ? 'POST' : 'PUT';
      const body = { ...formData, attendees: parseInt(formData.attendees) || 0 };
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) router.push('/admin/events');
      else alert('Failed to save event');
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3c4b33]"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/admin/events" className="p-2 text-gray-500 hover:text-[#3c4b33] mr-2"><FiArrowLeft className="w-5 h-5" /></Link>
        <h2 className="text-2xl font-bold text-gray-900">{isNew ? 'New Event' : 'Edit Event'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="text" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} placeholder="e.g., 10:00 AM" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Speaker</label>
              <input type="text" value={formData.speaker} onChange={(e) => setFormData({ ...formData, speaker: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
              <input type="number" value={formData.attendees} onChange={(e) => setFormData({ ...formData, attendees: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex items-center space-x-4">
              <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Image URL" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#3c4b33] focus:border-[#3c4b33]" />
              <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                <FiUpload className="w-4 h-4 mr-2" />
                {uploadingImage ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
              </label>
            </div>
            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />}
          </div>

          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="rounded border-gray-300 text-[#3c4b33] focus:ring-[#3c4b33]" />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="rounded border-gray-300 text-[#3c4b33] focus:ring-[#3c4b33]" />
              <span className="ml-2 text-sm text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center px-6 py-2 bg-[#3c4b33] text-white rounded-lg hover:bg-[#4a5d3f] disabled:opacity-50">
            <FiSave className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
