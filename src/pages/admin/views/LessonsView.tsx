import React, { useEffect, useState } from 'react';
import { Lesson } from '../../../types';

export const LessonsView: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    courseId: 'computer-networks',
    order: 1,
    summary: '',
    content: '',
    formula: '',
    keyTakeaways: ''
  });

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/lessons');
      if (res.ok) {
        const json = await res.json();
        setLessons(json);
      }
    } catch (e) {
      console.error('Failed to fetch lessons:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingLesson ? `/api/admin/lessons/${editingLesson.id}` : '/api/admin/lessons';
      const method = editingLesson ? 'PATCH' : 'POST';

      const payload = {
        ...formData,
        keyTakeaways: typeof formData.keyTakeaways === 'string'
          ? formData.keyTakeaways.split('\n').filter(Boolean)
          : formData.keyTakeaways
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowModal(false);
        fetchLessons();
      }
    } catch (e) {
      console.error('Error saving lesson:', e);
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, { method: 'DELETE' });
      if (res.ok) fetchLessons();
    } catch (e) {
      console.error('Error deleting lesson:', e);
    }
  };

  const openCreateModal = () => {
    setEditingLesson(null);
    setFormData({
      title: '',
      courseId: 'computer-networks',
      order: lessons.length + 1,
      summary: '',
      content: '',
      formula: '',
      keyTakeaways: ''
    });
    setShowModal(true);
  };

  const openEditModal = (l: Lesson) => {
    setEditingLesson(l);
    setFormData({
      title: l.title || '',
      courseId: l.courseId || 'computer-networks',
      order: l.order || 1,
      summary: l.summary || '',
      content: l.content || '',
      formula: l.formula || '',
      keyTakeaways: Array.isArray(l.keyTakeaways) ? l.keyTakeaways.join('\n') : ''
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Lesson Content Manager</h1>
          <p className="text-slate-400 text-xs mt-0.5">Edit formulas, summaries, key takeaways, and order of delivery.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          + Add Lesson
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Title & Summary</th>
              <th className="px-6 py-4">Course ID</th>
              <th className="px-6 py-4">Formula</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">Loading lessons...</td>
              </tr>
            ) : lessons.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-500">No lessons created yet.</td>
              </tr>
            ) : (
              lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                <tr key={lesson.id} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-mono font-bold text-indigo-400">
                    #{lesson.order}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm">{lesson.title}</p>
                    <p className="text-slate-400 text-[11px] line-clamp-1">{lesson.summary}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    {lesson.courseId}
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-400 text-[11px]">
                    {lesson.formula || '—'}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(lesson)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg border border-slate-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg border border-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveLesson} className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">{editingLesson ? 'Edit Lesson' : 'Create Lesson'}</h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Order #</label>
                  <input
                    type="number"
                    required
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Summary</label>
                <input
                  type="text"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Full Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Formula / Quick Math Rule</label>
                <input
                  type="text"
                  value={formData.formula}
                  onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Key Takeaways (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.keyTakeaways}
                  onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg"
              >
                Save Lesson
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
