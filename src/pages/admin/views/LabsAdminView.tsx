import React, { useState, useEffect } from 'react';
import { Lab, LabAnalytics } from '../../../types';
import { labService } from '../../../services/labService';
import { LABS_CATALOG } from '../../../data/labsCatalog';
import { 
  FlaskConical, Plus, Search, Filter, Trash2, Edit3, Eye, BarChart2, CheckCircle2, Clock, Zap, Award 
} from 'lucide-react';

export const LabsAdminView: React.FC = () => {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLabAnalytics, setSelectedLabAnalytics] = useState<LabAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadAdminLabs();
  }, []);

  const loadAdminLabs = async () => {
    setLoading(true);
    try {
      const data = await labService.getLabs();
      setLabs(data.length > 0 ? data : LABS_CATALOG);
    } catch (err) {
      setLabs(LABS_CATALOG);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnalytics = async (labId: string) => {
    const analytics = await labService.getLabAnalytics(labId);
    setSelectedLabAnalytics(analytics);
  };

  const filteredLabs = labs.filter(l => 
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-cyan-400" />
            Universal Labs Management & Real Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure lab scenarios, set starter code, test case inputs, and view real learner performance analytics.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20">
          <Plus className="h-4 w-4" />
          Create New Lab
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search labs..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Labs Admin Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs font-sans">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3.5">Lab Title & Category</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Difficulty</th>
              <th className="p-3.5">Rewards</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredLabs.map((lab) => (
              <tr key={lab.id} className="hover:bg-slate-950/40 transition-colors">
                <td className="p-3.5 font-bold text-slate-200">
                  <div>{lab.title}</div>
                  <div className="text-[11px] font-mono text-cyan-400 font-normal">{lab.category}</div>
                </td>
                <td className="p-3.5 font-mono text-[11px] text-slate-400">{lab.type}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-950 border border-slate-800 text-slate-300">
                    {lab.difficulty}
                  </span>
                </td>
                <td className="p-3.5 font-mono font-bold text-cyan-400">
                  +{lab.xpReward} XP / +{lab.lpReward} LP
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {lab.status}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => handleViewAnalytics(lab.id)}
                    className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                    title="View Real Execution Analytics"
                  >
                    <BarChart2 className="h-3.5 w-3.5 text-cyan-400" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800">
                    <Edit3 className="h-3.5 w-3.5 text-slate-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics Modal */}
      {selectedLabAnalytics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 text-slate-100">
            <h3 className="text-base font-bold flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-cyan-400" />
              Real Learner Execution Analytics
            </h3>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Total Attempts</span>
                <span className="text-cyan-400 font-bold text-base">{selectedLabAnalytics.totalAttempts}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Pass Rate</span>
                <span className="text-emerald-400 font-bold text-base">{selectedLabAnalytics.completionRate}%</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLabAnalytics(null)}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 font-bold text-xs"
            >
              Close Analytics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
