import React from 'react';

export const XpStreaksView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-xl font-bold text-white">XP & Streak Mechanics Configuration</h1>
        <p className="text-slate-400 text-xs mt-0.5">Define level tiers, XP multipliers, and streak grace period freeze rules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Experience Level Progression</h3>
          <div className="space-y-3 text-xs">
            {[
              { level: 'Level 1: Explorer', xp: '0 - 250 XP', color: 'text-slate-300' },
              { level: 'Level 2: Apprentice', xp: '251 - 750 XP', color: 'text-indigo-400' },
              { level: 'Level 3: Specialist', xp: '751 - 1,500 XP', color: 'text-emerald-400' },
              { level: 'Level 4: Master Architect', xp: '1,501+ XP', color: 'text-purple-400' },
            ].map((lvl, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className={`font-bold ${lvl.color}`}>{lvl.level}</span>
                <span className="font-mono text-slate-400">{lvl.xp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Streak Policy & Freeze Shield</h3>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-3 text-slate-300">
            <div className="flex justify-between items-center">
              <span>Daily Activity Threshold</span>
              <span className="font-bold text-emerald-400">1 Completed Lesson / Sim</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Streak Freeze Grace Period</span>
              <span className="font-bold text-indigo-400">36 Hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Streak Shield Store Item</span>
              <span className="font-bold text-amber-400">150 LP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
