import React, { useEffect, useState } from 'react';
import { SimulationScenario } from '../../../types';

export const SimulationsView: React.FC = () => {
  const [simulations, setSimulations] = useState<SimulationScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Networking Topology',
    difficulty: 'Intermediate',
    targetPrefix: 26,
    requiredHosts: 50,
    timeLimitSeconds: 300,
    xpReward: 200,
    lpReward: 100
  });

  const fetchSimulations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/simulations');
      if (res.ok) {
        const json = await res.json();
        setSimulations(json);
      }
    } catch (e) {
      console.error('Failed to fetch simulations:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimulations();
  }, []);

  const handleSaveSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        fetchSimulations();
      }
    } catch (e) {
      console.error('Error saving simulation:', e);
    }
  };

  const handleDeleteSimulation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this simulation scenario?')) return;
    try {
      const res = await fetch(`/api/admin/simulations/${id}`, { method: 'DELETE' });
      if (res.ok) fetchSimulations();
    } catch (e) {
      console.error('Error deleting simulation:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Interactive Simulations Center</h1>
          <p className="text-slate-400 text-xs mt-0.5">Configure hands-on virtual sandbox environments and topological challenge conditions.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition"
        >
          + Add Simulation Scenario
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">Loading simulations...</p>
        ) : simulations.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center col-span-full">
            <p className="text-slate-400 text-sm font-semibold">No simulation scenarios created.</p>
          </div>
        ) : (
          simulations.map((sim) => (
            <div key={sim.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-2xl">⚡</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {sim.difficulty || 'Intermediate'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{sim.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2">{sim.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-500">Target Prefix</p>
                  <p className="font-mono font-bold text-white">/{sim.targetPrefix || 26}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">XP Reward</p>
                  <p className="font-bold text-purple-400">+{sim.xpReward || 200} XP</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500">LP Reward</p>
                  <p className="font-bold text-amber-400">+{sim.lpReward || 100} LP</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDeleteSimulation(sim.id)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition"
                >
                  Delete Scenario
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveSimulation} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Create Simulation Scenario</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Scenario Title</label>
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
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Target CIDR Prefix</label>
                  <input
                    type="number"
                    value={formData.targetPrefix}
                    onChange={(e) => setFormData({ ...formData, targetPrefix: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Required Usable Hosts</label>
                  <input
                    type="number"
                    value={formData.requiredHosts}
                    onChange={(e) => setFormData({ ...formData, requiredHosts: Number(e.target.value) })}
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
                Save Simulation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
