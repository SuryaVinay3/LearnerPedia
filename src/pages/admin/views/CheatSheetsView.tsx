import React, { useEffect, useState } from 'react';
import { CheatSheet } from '../../../types';

export const CheatSheetsView: React.FC = () => {
  const [cheatSheets, setCheatSheets] = useState<CheatSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Networking',
    description: '',
    lpPrice: 100,
    previewImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  });

  const fetchCheatSheets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cheat-sheets');
      if (res.ok) {
        const json = await res.json();
        setCheatSheets(json);
      }
    } catch (e) {
      console.error('Failed to fetch cheat sheets:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheatSheets();
  }, []);

  const handleSaveCheatSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/cheat-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchCheatSheets();
      }
    } catch (e) {
      console.error('Error saving cheat sheet:', e);
    }
  };

  const handleDeleteCheatSheet = async (id: string) => {
    if (!confirm('Are you sure you want to delete this cheat sheet resource?')) return;
    try {
      const res = await fetch(`/api/admin/cheat-sheets/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCheatSheets();
    } catch (e) {
      console.error('Error deleting cheat sheet:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Cheat Sheets & Study Resources</h1>
          <p className="text-slate-400 text-xs mt-0.5">Upload high-yield quick reference sheets, set LP unlock prices, and track download analytics.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          + Upload Cheat Sheet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">Loading cheat sheets...</p>
        ) : cheatSheets.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center col-span-full">
            <p className="text-slate-400 text-sm font-semibold">No cheat sheets uploaded yet.</p>
          </div>
        ) : (
          cheatSheets.map((sheet) => (
            <div key={sheet.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl">
              {sheet.previewImage && (
                <img src={sheet.previewImage} alt={sheet.title} className="w-full h-32 object-cover" />
              )}
              
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">{sheet.category}</span>
                    <span className="text-xs font-extrabold text-amber-400">{sheet.lpPrice} LP</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{sheet.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2">{sheet.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">📥 {sheet.downloadsCount || 0} Unlocks</span>
                  <button
                    onClick={() => handleDeleteCheatSheet(sheet.id)}
                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg border border-red-500/20 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveCheatSheet} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Upload Cheat Sheet Resource</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Sheet Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">LP Unlock Price</label>
                  <input
                    type="number"
                    required
                    value={formData.lpPrice}
                    onChange={(e) => setFormData({ ...formData, lpPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">File URL / Download Link</label>
                <input
                  type="text"
                  required
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
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
                Publish Cheat Sheet
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
