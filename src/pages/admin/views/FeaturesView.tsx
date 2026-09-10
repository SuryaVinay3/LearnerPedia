import React, { useEffect, useState } from 'react';
import { FeatureFlags } from '../../../types';

export const FeaturesView: React.FC = () => {
  const [flags, setFlags] = useState<FeatureFlags>({
    quickLearn: true,
    simulations: true,
    competitions: true,
    leaderboards: true,
    aiAnalysis: true,
    streaks: true,
    learningPoints: true,
    cheatSheets: true,
    rewards: true,
    certificates: true,
    notifications: true,
    experimentalFeatures: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchFlags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/features');
      if (res.ok) {
        const json = await res.json();
        setFlags(json);
      }
    } catch (e) {
      console.error('Failed to fetch feature flags:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const handleToggle = (key: keyof FeatureFlags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/features', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flags)
      });
      if (res.ok) {
        alert('Feature flags updated platform-wide!');
      }
    } catch (e) {
      console.error('Failed to save flags:', e);
    } finally {
      setSaving(false);
    }
  };

  const flagLabels: { key: keyof FeatureFlags; title: string; desc: string }[] = [
    { key: 'quickLearn', title: 'QuickLearn Free Curriculum', desc: 'Allow free access to core learning modules and quizzes.' },
    { key: 'simulations', title: 'Interactive Network Simulations', desc: 'Enable virtual network topology sandbox challenges.' },
    { key: 'competitions', title: 'Live Arena Competitions', desc: 'Enable live timed tournaments and multiplayer speed contests.' },
    { key: 'leaderboards', title: 'Global Leaderboards', desc: 'Display competitive ranking leaderboards.' },
    { key: 'aiAnalysis', title: 'AI Learning Analytics', desc: 'Provide personalized AI analysis & performance radar charts.' },
    { key: 'streaks', title: 'Daily Streaks & Shields', desc: 'Track daily learning streaks and streak freezes.' },
    { key: 'learningPoints', title: 'Learning Points (LP) System', desc: 'Enable virtual currency earning and redemption.' },
    { key: 'cheatSheets', title: 'Cheat Sheets Store Section', desc: 'Allow learners to unlock cheat sheet study guides.' },
    { key: 'rewards', title: 'Rewards Catalogue', desc: 'Enable reward redemptions in store.' },
    { key: 'certificates', title: 'Official Certificates', desc: 'Enable certificate generation upon course completion.' },
    { key: 'experimentalFeatures', title: 'Experimental Beta Features', desc: 'Enable unreleased experimental UI components.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Platform Feature Toggles</h1>
          <p className="text-slate-400 text-xs mt-0.5">Enable or disable core modules dynamically across student applications.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition"
        >
          {saving ? 'Saving...' : 'Save Flag Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <p className="text-slate-500 text-xs col-span-full py-8 text-center">Loading feature flags...</p>
        ) : (
          flagLabels.map((item) => (
            <div key={item.key} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-md">
              <div className="space-y-1 pr-4">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-slate-400 text-xs">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(item.key)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 shrink-0 ${
                  flags[item.key] ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    flags[item.key] ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
