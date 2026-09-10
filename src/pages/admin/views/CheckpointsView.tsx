import React, { useEffect, useState } from 'react';

export const CheckpointsView: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: 'Subnet Mask Mastery Checkpoint',
    courseId: 'computer-networks',
    afterLessonOrder: 4,
    requiredAccuracy: 80,
    questionsCount: 5,
    lpReward: 50,
    xpReward: 100
  });

  const fetchCheckpoints = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/checkpoints');
      if (res.ok) {
        const json = await res.json();
        setCheckpoints(json);
      }
    } catch (e) {
      console.error('Failed to fetch checkpoints:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckpoints();
  }, []);

  const handleSaveCheckpoint = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/checkpoints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchCheckpoints();
      }
    } catch (e) {
      console.error('Error saving checkpoint:', e);
    }
  };

  const handleDeleteCheckpoint = async (id: string) => {
    if (!confirm('Are you sure you want to delete this checkpoint rule?')) return;
    try {
      const res = await fetch(`/api/admin/checkpoints/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCheckpoints();
    } catch (e) {
      console.error('Error deleting checkpoint:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Hidden Checkpoints Manager</h1>
          <p className="text-slate-400 text-xs mt-0.5">Configure gated mastery assessments triggered dynamically between learning modules.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          + Create Hidden Checkpoint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">Loading checkpoints...</p>
        ) : checkpoints.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center col-span-full space-y-3">
            <p className="text-slate-400 text-sm font-semibold">No active hidden checkpoints configured.</p>
            <p className="text-slate-500 text-xs">Create a checkpoint to challenge learners after specific key lessons.</p>
          </div>
        ) : (
          checkpoints.map((cp) => (
            <div key={cp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="text-2xl">🎯</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Trigger: Lesson #{cp.afterLessonOrder || 4}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{cp.title}</h3>
                <p className="text-slate-400 text-xs mt-1">Course: <span className="font-mono text-indigo-400">{cp.courseId}</span></p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-500">Min Accuracy</p>
                  <p className="font-bold text-emerald-400">{cp.requiredAccuracy || 80}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">XP Reward</p>
                  <p className="font-bold text-purple-400">+{cp.xpReward || 100} XP</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">LP Reward</p>
                  <p className="font-bold text-amber-400">+{cp.lpReward || 50} LP</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDeleteCheckpoint(cp.id)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition"
                >
                  Delete Rule
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveCheckpoint} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create Hidden Checkpoint Trigger</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Checkpoint Title</label>
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
                  <label className="block text-slate-400 mb-1">Trigger After Lesson #</label>
                  <input
                    type="number"
                    required
                    value={formData.afterLessonOrder}
                    onChange={(e) => setFormData({ ...formData, afterLessonOrder: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Required Accuracy %</label>
                  <input
                    type="number"
                    required
                    value={formData.requiredAccuracy}
                    onChange={(e) => setFormData({ ...formData, requiredAccuracy: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={formData.xpReward}
                    onChange={(e) => setFormData({ ...formData, xpReward: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">LP Reward</label>
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
                Save Checkpoint
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
