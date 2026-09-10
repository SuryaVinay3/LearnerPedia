import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { competitionService } from '../services/competitionService';
import { useAuth } from '../contexts/AuthContext';

export const CompetitionPage: React.FC = () => {
  const { refreshProfile } = useAuth();
  
  const [allocations, setAllocations] = useState({
    Sales: { network: '192.168.10.0', mask: '/25' },
    Engineering: { network: '192.168.10.128', mask: '/26' },
    Support: { network: '192.168.10.192', mask: '/27' },
  });

  const [timeSeconds, setTimeSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await competitionService.getLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        console.warn('Leaderboard fetch fallback:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (result) return;
    const interval = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [result]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await competitionService.submitCompetition(
        'subnetting-challenge',
        allocations,
        timeSeconds,
        0
      );
      setResult(res);

      if (res.success) {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#06b6d4', '#10b981'],
        });
        await refreshProfile();
        const updatedLb = await competitionService.getLeaderboard();
        setLeaderboard(updatedLb);
      }
    } catch (err) {
      console.error('Competition submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-950 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-800/60 mb-2">
              <span>Competitive Learning League</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Enterprise VLSM Subnet Challenge
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-slate-900 p-3 border border-slate-800 text-xs font-semibold text-cyan-400">
            <span>Time Elapsed: {Math.floor(timeSeconds / 60)}m {timeSeconds % 60}s</span>
          </div>
        </div>

        {/* Challenge Scenario & Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Submission Form */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h2 className="font-heading text-lg font-bold text-white mb-1">
                Enterprise Scenario
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Base Network: <span className="font-mono text-cyan-300 font-bold">192.168.10.0/24</span>. Allocate subnets without host address overlap.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sales Department */}
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span>Sales Department</span>
                  <span className="text-amber-400">Requires 100 Hosts</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={allocations.Sales.network}
                    onChange={(e) => setAllocations({ ...allocations, Sales: { ...allocations.Sales, network: e.target.value } })}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white"
                    placeholder="Network ID"
                  />
                  <input
                    type="text"
                    value={allocations.Sales.mask}
                    onChange={(e) => setAllocations({ ...allocations, Sales: { ...allocations.Sales, mask: e.target.value } })}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white"
                    placeholder="CIDR Mask"
                  />
                </div>
              </div>

              {/* Engineering Department */}
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span>Engineering Department</span>
                  <span className="text-amber-400">Requires 50 Hosts</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={allocations.Engineering.network}
                    onChange={(e) => setAllocations({ ...allocations, Engineering: { ...allocations.Engineering, network: e.target.value } })}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white"
                    placeholder="Network ID"
                  />
                  <input
                    type="text"
                    value={allocations.Engineering.mask}
                    onChange={(e) => setAllocations({ ...allocations, Engineering: { ...allocations.Engineering, mask: e.target.value } })}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white"
                    placeholder="CIDR Mask"
                  />
                </div>
              </div>

              {/* Support Department */}
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span>Support Department</span>
                  <span className="text-amber-400">Requires 20 Hosts</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={allocations.Support.network}
                    onChange={(e) => setAllocations({ ...allocations, Support: { ...allocations.Support, network: e.target.value } })}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white"
                    placeholder="Network ID"
                  />
                  <input
                    type="text"
                    value={allocations.Support.mask}
                    onChange={(e) => setAllocations({ ...allocations, Support: { ...allocations.Support, mask: e.target.value } })}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-mono text-white"
                    placeholder="CIDR Mask"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50"
              >
                <span>{submitting ? 'Evaluating Solution...' : 'Submit Subnet Allocations'}</span>
              </button>
            </form>

            {/* Results Feedback */}
            {result && (
              <div className="rounded-2xl bg-emerald-950/60 p-4 border border-emerald-800 text-xs text-emerald-200 space-y-1">
                <div className="font-bold text-sm text-emerald-300">Solution Verified! Score: {result.score}</div>
                <div>Awarded +{result.xpEarned} XP and +{result.lpEarned} LP to your wallet balance.</div>
              </div>
            )}
          </div>

          {/* Live Leaderboard Table */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-4">
            <h2 className="font-heading text-lg font-bold text-white">
              Live League Standings
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Rank</th>
                    <th className="pb-3 font-semibold">Student</th>
                    <th className="pb-3 font-semibold">Score</th>
                    <th className="pb-3 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaderboard.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 font-bold text-amber-400">#{entry.rank}</td>
                      <td className="py-3 font-semibold text-white">
                        {entry.studentName}
                        <div className="text-[10px] text-slate-400 font-normal">{entry.badge}</div>
                      </td>
                      <td className="py-3 font-mono font-bold text-cyan-300">{entry.score} pts</td>
                      <td className="py-3 text-slate-400">{entry.timeTaken}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
