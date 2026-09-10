import React, { useState, useEffect } from 'react';

export const SettingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [settings, setSettings] = useState({
    platformName: 'LearnerPedia',
    logoUrl: '/favicon.ico',
    platformDescription: 'An interactive, AI-driven educational platform specializing in Computer Science, Networking, Cybersecurity, and Software Engineering.',
    defaultXpQuiz: 50,
    defaultXpSimulation: 150,
    defaultLpQuiz: 20,
    defaultLpSimulation: 50,
    streakGoalDays: 7,
    streakBonusMultiplier: 1.5,
    certificateIssuerName: 'LearnerPedia Academic Certification Authority',
    certificatePassingGradePercent: 80,
    enableEmailNotifications: true,
    enableInAppBroadcasts: true,
    systemMaintenanceMode: false,
    allowGuestSimulations: true
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        if (data && Object.keys(data).length > 0) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Platform settings updated successfully.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update platform settings.' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'An error occurred while saving configuration.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">System Settings & Configuration</h1>
        <p className="text-slate-400 text-sm">
          Manage platform branding, gamification economy thresholds, certificate policies, and system defaults.
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border text-sm flex items-center justify-between ${
          message.type === 'success'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs font-bold hover:underline">Dismiss</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. General Branding & Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>🌐</span>
            <span>Platform Branding & General Information</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Name</label>
              <input
                type="text"
                value={settings.platformName}
                onChange={e => setSettings({ ...settings, platformName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Logo URL</label>
              <input
                type="text"
                value={settings.logoUrl}
                onChange={e => setSettings({ ...settings, logoUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Description</label>
              <textarea
                value={settings.platformDescription}
                onChange={e => setSettings({ ...settings, platformDescription: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Gamification & Economy Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>⚡</span>
            <span>XP, Learning Points (LP) & Streak Rules</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default XP per Quiz</label>
              <input
                type="number"
                value={settings.defaultXpQuiz}
                onChange={e => setSettings({ ...settings, defaultXpQuiz: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default XP per Simulation</label>
              <input
                type="number"
                value={settings.defaultXpSimulation}
                onChange={e => setSettings({ ...settings, defaultXpSimulation: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default LP per Quiz</label>
              <input
                type="number"
                value={settings.defaultLpQuiz}
                onChange={e => setSettings({ ...settings, defaultLpQuiz: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Default LP per Simulation</label>
              <input
                type="number"
                value={settings.defaultLpSimulation}
                onChange={e => setSettings({ ...settings, defaultLpSimulation: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Streak Goal (Days)</label>
              <input
                type="number"
                value={settings.streakGoalDays}
                onChange={e => setSettings({ ...settings, streakGoalDays: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Streak Bonus Multiplier</label>
              <input
                type="number"
                step="0.1"
                value={settings.streakBonusMultiplier}
                onChange={e => setSettings({ ...settings, streakBonusMultiplier: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Certificate Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>📜</span>
            <span>Certificate & Academic Authority</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Issuer Authority Name</label>
              <input
                type="text"
                value={settings.certificateIssuerName}
                onChange={e => setSettings({ ...settings, certificateIssuerName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Passing Score Grade (%)</label>
              <input
                type="number"
                value={settings.certificatePassingGradePercent}
                onChange={e => setSettings({ ...settings, certificatePassingGradePercent: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 4. System Toggles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>⚙️</span>
            <span>System Toggles & Maintenance</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.systemMaintenanceMode}
                onChange={e => setSettings({ ...settings, systemMaintenanceMode: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-semibold text-white">Enable System Maintenance Mode</span>
                <p className="text-xs text-slate-400">Puts student features in read-only maintenance mode.</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowGuestSimulations}
                onChange={e => setSettings({ ...settings, allowGuestSimulations: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 focus:ring-indigo-500"
              />
              <div>
                <span className="text-sm font-semibold text-white">Allow Public / Guest Network Simulations</span>
                <p className="text-xs text-slate-400">Allows non-authenticated visitors to run sandbox simulations for free.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {saving ? 'Saving Settings...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
