import React from 'react';

export const LearningPointsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Learning Points (LP) Virtual Economy</h1>
        <p className="text-slate-400 text-xs mt-0.5">Control issuance rates, conversion ratios, and atomic server-side LP transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Lesson Earning Rate</h3>
            <span className="text-amber-400 font-mono font-bold text-sm">+25 LP</span>
          </div>
          <p className="text-slate-400 text-xs">Granted automatically upon server-verified completion of any curriculum lesson.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quiz Perfect Bonus</h3>
            <span className="text-amber-400 font-mono font-bold text-sm">+50 LP</span>
          </div>
          <p className="text-slate-400 text-xs">Awarded for achieving 100% accuracy on first quiz assessment try.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Daily Streak Multiplier</h3>
            <span className="text-amber-400 font-mono font-bold text-sm">1.5x</span>
          </div>
          <p className="text-slate-400 text-xs">Active multiplier applied to LP earned when student streak exceeds 7 days.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Atomic LP Transaction Policy</h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300 font-mono">
          <p>✔ All LP deductions (Store Purchases, Cheat Sheet Unlocks) execute inside Firestore server transactions.</p>
          <p>✔ Client-side attempts to submit arbitrary LP increments are rejected by security middleware.</p>
          <p>✔ Complete transaction ledger recorded in `learningPointTransactions` Firestore collection.</p>
        </div>
      </div>
    </div>
  );
};
