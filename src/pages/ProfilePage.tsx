import React, { useEffect, useState } from 'react';
import { profileService } from '../services/profileService';
import { UserProfile, LearningPointTransaction } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const { userProfile } = useAuth();
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<LearningPointTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfileData(data.user);
        setTransactions(data.transactions || []);
      } catch (err) {
        console.warn('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const activeUser = profileData || userProfile;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Profile Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-extrabold text-3xl shadow-xl shadow-cyan-500/20">
            {activeUser?.name?.charAt(0).toUpperCase() || 'S'}
          </div>

          <div className="text-center sm:text-left flex-1 space-y-1">
            <h1 className="font-heading text-2xl font-bold text-white">
              {activeUser?.name || 'Demo Student'}
            </h1>
            <p className="text-xs text-slate-400">{activeUser?.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="rounded-full bg-cyan-950 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-800">
                Level {activeUser?.levelNumber || 1}: {activeUser?.level || 'Explorer'}
              </span>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                Role: {activeUser?.role || 'student'}
              </span>
            </div>
          </div>

          {/* Wallet Cards */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-purple-950/60 p-4 border border-purple-800/40 text-center">
              <div className="text-[10px] text-purple-300 font-bold uppercase">Experience</div>
              <div className="text-xl font-extrabold text-white mt-0.5">{activeUser?.xp || 0} XP</div>
            </div>
            <div className="rounded-2xl bg-emerald-950/60 p-4 border border-emerald-800/50 text-center">
              <div className="text-[10px] text-emerald-300 font-bold uppercase">LP Balance</div>
              <div className="text-xl font-extrabold text-white mt-0.5">{activeUser?.learningPoints || 0} LP</div>
            </div>
          </div>
        </div>

        {/* Badges Gallery */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">
            Earned Educational Badges
          </h2>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl bg-slate-950 p-3.5 border border-slate-800 flex items-center gap-3">
              <div>
                <div className="text-xs font-bold text-white">First Step Explorer</div>
                <div className="text-[10px] text-slate-400">Completed initial subnetting card</div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-3.5 border border-slate-800 flex items-center gap-3">
              <div>
                <div className="text-xs font-bold text-white">Lab Engineer</div>
                <div className="text-[10px] text-slate-400">Executed packet routing lab</div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-3.5 border border-slate-800 flex items-center gap-3">
              <div>
                <div className="text-xs font-bold text-white">Checkpoint Victor</div>
                <div className="text-[10px] text-slate-400">Answered hidden verification challenge</div>
              </div>
            </div>
          </div>
        </div>

        {/* LP Transaction Ledger */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">
            Learning Point (LP) Audit Ledger
          </h2>

          {transactions.length === 0 ? (
            <div className="text-xs text-slate-500 italic">No point transactions recorded yet. Complete lessons or quizzes to earn LP.</div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl bg-slate-950 p-3.5 border border-slate-800 text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{tx.description}</div>
                    <div className="text-[10px] text-slate-500">{new Date(tx.createdAt).toLocaleString()}</div>
                  </div>
                  <div className={`font-mono font-bold ${tx.points >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.points >= 0 ? `+${tx.points}` : tx.points} LP
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
