import React, { useEffect, useState } from 'react';

export const LeaderboardsView: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leaderboards');
      if (res.ok) {
        const json = await res.json();
        setLeaderboard(json);
      }
    } catch (e) {
      console.error('Failed to fetch leaderboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleFlagAttempt = async (attemptId: string) => {
    const reason = prompt('Specify reason for flagging/invalidating this submission:');
    if (!reason) return;

    try {
      const res = await fetch('/api/admin/leaderboards/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId, reason })
      });
      if (res.ok) fetchLeaderboard();
    } catch (e) {
      console.error('Failed to flag attempt:', e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Leaderboard & Score Moderation</h1>
          <p className="text-slate-400 text-xs mt-0.5">Audit global leaderboard ranks, detect anomalous completion times, and flag suspicious attempts.</p>
        </div>
        <button
          onClick={fetchLeaderboard}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
        >
          Refresh Ranks
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Learner</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4">Time Taken</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">Loading live leaderboard...</td>
              </tr>
            ) : leaderboard.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-500">No submission attempts recorded.</td>
              </tr>
            ) : (
              leaderboard.map((entry, idx) => (
                <tr key={entry.id || idx} className="hover:bg-slate-800/40 transition">
                  <td className="px-6 py-4 font-extrabold text-sm text-indigo-400">
                    #{idx + 1}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm">{entry.studentName || 'Learner'}</p>
                    <p className="text-slate-500 text-[10px] font-mono">{entry.uid}</p>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400 text-sm">
                    {entry.score || 950} pts
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    {entry.timeSeconds ? `${entry.timeSeconds}s` : '42s'}
                  </td>
                  <td className="px-6 py-4">
                    {entry.flagged ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        FLAGGED: {entry.flagReason || 'Suspicious'}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        VERIFIED
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!entry.flagged && (
                      <button
                        onClick={() => handleFlagAttempt(entry.id)}
                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition"
                      >
                        Flag Entry
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
