import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { rewardService } from '../services/rewardService';
import { Reward } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const StorePage: React.FC = () => {
  const { userProfile, refreshProfile } = useAuth();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await rewardService.getRewards();
        setRewards(data);
      } catch (err) {
        console.warn('Error fetching rewards:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  const handleRedeem = async (reward: Reward) => {
    setMessage(null);
    setRedeemingId(reward.id);
    try {
      const res = await rewardService.redeemReward(reward.id);
      setMessage({ text: res.message, error: false });
      
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#a855f7'],
      });

      await refreshProfile();
    } catch (err: any) {
      setMessage({ text: err?.message || 'Redemption failed.', error: true });
    } finally {
      setRedeemingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950 px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-emerald-800/60 mb-2">
              <span>Educational Rewards Store</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Unlock Career & Educational Artifacts
            </h1>
          </div>

          {/* LP Wallet Balance Banner */}
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-950/80 p-4 border border-emerald-800/80 text-emerald-300 shadow-lg">
            <div>
              <div className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">Available Balance</div>
              <div className="text-xl font-extrabold text-white">{userProfile?.learningPoints || 0} LP</div>
            </div>
          </div>
        </div>

        {/* Mandatory Free Simulation Guarantee Banner */}
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 flex items-center gap-3 text-cyan-200 text-xs font-semibold">
          <span>Guarantee: Interactive packet simulation labs and core curriculum content remain 100% free for all students. Learning Points (LP) are only used to unlock optional supplemental educational artifacts.</span>
        </div>

        {/* Global Feedback Message */}
        {message && (
          <div
            className={`rounded-2xl p-4 border text-xs font-semibold flex items-center gap-2 ${
              message.error
                ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
            }`}
          >
            <span>{message.text}</span>
          </div>
        )}

        {/* Rewards Catalog Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading reward store...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {rewards.map((reward) => {
              const currentLp = userProfile?.learningPoints || 0;
              const canAfford = currentLp >= reward.lpCost;

              return (
                <div
                  key={reward.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 rounded-full bg-emerald-950 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-800">
                        <span>{reward.lpCost} LP</span>
                      </div>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-white mb-2">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {reward.description}
                    </p>

                    <div className="rounded-xl bg-slate-950 p-3 text-[11px] font-mono text-slate-400 border border-slate-800">
                      {reward.previewText}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford || redeemingId === reward.id}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-cyan-400'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {redeemingId === reward.id
                        ? 'Processing Deduction...'
                        : canAfford
                        ? `Redeem Resource (${reward.lpCost} LP)`
                        : `Requires ${reward.lpCost} LP (${reward.lpCost - currentLp} LP Needed)`}
                    </span>
                  </button>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
