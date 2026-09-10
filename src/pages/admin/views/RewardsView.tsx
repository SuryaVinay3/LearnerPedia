import React from 'react';

export const RewardsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h1 className="text-xl font-bold text-white">Student Rewards & Redemptions</h1>
        <p className="text-slate-400 text-xs mt-0.5">Fulfill student LP reward claims, coupon redemptions, and physical gear distribution.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Claim ID</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Item Claimed</th>
              <th className="px-6 py-4">LP Spent</th>
              <th className="px-6 py-4">Fulfillment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            <tr className="hover:bg-slate-800/40 transition">
              <td className="px-6 py-4 text-indigo-400 font-bold">CLM-9281</td>
              <td className="px-6 py-4 font-sans font-semibold text-white">Jane Learner</td>
              <td className="px-6 py-4 font-sans text-slate-300">Network Engineer Sticker Pack</td>
              <td className="px-6 py-4 text-amber-400 font-bold">300 LP</td>
              <td className="px-6 py-4 font-sans">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PENDING SHIPPING
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
