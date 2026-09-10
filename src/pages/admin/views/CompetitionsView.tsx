import React, { useEffect, useState } from 'react';
import { Competition } from '../../../types';

export const CompetitionsView: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Networking',
    durationSeconds: 180,
    questionsCount: 10,
    xpReward: 300,
    lpReward: 200,
    status: 'live'
  });

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/competitions');
      if (res.ok) {
        const json = await res.json();
        setCompetitions(json);
      }
    } catch (e) {
      console.error('Failed to fetch competitions:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleSaveCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/competitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchCompetitions();
      }
    } catch (e) {
      console.error('Error saving competition:', e);
    }
  };

  const handleDeleteCompetition = async (id: string) => {
    if (!confirm('Are you sure you want to delete this competition tournament?')) return;
    try {
      const res = await fetch(`/api/admin/competitions/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCompetitions();
    } catch (e) {
      console.error('Error deleting competition:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Live Competitions & Tournaments</h1>
          <p className="text-slate-400 text-xs mt-0.5">Schedule live arena competitions, set time limits, and distribute prize rewards.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          + Create Live Tournament
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">Loading competitions...</p>
        ) : competitions.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center col-span-full">
            <p className="text-slate-400 text-sm font-semibold">No active competitions scheduled.</p>
          </div>
        ) : (
          competitions.map((comp) => (
            <div key={comp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-2xl">🏆</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    comp.status === 'live'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {comp.status || 'live'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{comp.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2">{comp.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-500">Duration</p>
                  <p className="font-mono font-bold text-white">{Math.round((comp.durationSeconds || 180) / 60)} mins</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">XP Prize</p>
                  <p className="font-bold text-purple-400">+{comp.xpReward || 300} XP</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">LP Prize</p>
                  <p className="font-bold text-amber-400">+{comp.lpReward || 200} LP</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => handleDeleteCompetition(comp.id)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition"
                >
                  Delete Tournament
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveCompetition} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create Competition Tournament</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Tournament Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Duration (Seconds)</label>
                  <input
                    type="number"
                    value={formData.durationSeconds}
                    onChange={(e) => setFormData({ ...formData, durationSeconds: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Questions Count</label>
                  <input
                    type="number"
                    value={formData.questionsCount}
                    onChange={(e) => setFormData({ ...formData, questionsCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">XP Prize</label>
                  <input
                    type="number"
                    value={formData.xpReward}
                    onChange={(e) => setFormData({ ...formData, xpReward: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">LP Prize</label>
                  <input
                    type="number"
                    value={formData.lpReward}
                    onChange={(e) => setFormData({ ...formData, lpReward: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
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
                Save Competition
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
