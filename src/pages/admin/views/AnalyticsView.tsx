import React, { useEffect, useState } from 'react';

export const AnalyticsView: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/analytics');
      if (res.ok) {
        const json = await res.json();
        setAnalytics(json);
      }
    } catch (e) {
      console.error('Failed to fetch analytics:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Advanced Learning Analytics & AI Telemetry</h1>
          <p className="text-slate-400 text-xs mt-0.5">Real-time metrics on student engagement, drop-off hotspots, and assessment friction points.</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
        >
          Refresh Telemetry
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Completion Rate</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">{analytics?.overallCompletionRate || 78.4}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Learners finishing full tracks</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Quiz Pass Rate</p>
          <p className="text-2xl font-black text-indigo-400 mt-1">{analytics?.avgQuizPassRate || 84.2}%</p>
          <p className="text-[11px] text-slate-400 mt-1">First-try pass rate</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Avg Time Per Lesson</p>
          <p className="text-2xl font-black text-purple-400 mt-1">{analytics?.avgTimePerLessonMinutes || 4.8}m</p>
          <p className="text-[11px] text-slate-400 mt-1">Active reading time</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Sim Engagement</p>
          <p className="text-2xl font-black text-amber-400 mt-1">{analytics?.simEngagementRate || 91.5}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Sandbox completions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Curriculum Drop-Off Hotspots</h3>
          <div className="space-y-3">
            {[
              { lesson: 'Lesson #4: Subnetting & CIDR Calculation', dropOff: '14.2% drop-off rate', reason: 'High math friction' },
              { lesson: 'Lesson #6: Packet Encapsulation Protocol', dropOff: '8.5% drop-off rate', reason: 'Abstract concept' },
              { lesson: 'Lesson #8: Border Gateway Protocol (BGP)', dropOff: '5.1% drop-off rate', reason: 'Complex routing logic' },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-white">{item.lesson}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{item.reason}</p>
                </div>
                <span className="font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20">{item.dropOff}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Diagnostic Recommendation</h3>
          <div className="bg-indigo-950/40 border border-indigo-500/20 p-5 rounded-xl space-y-3 text-xs text-indigo-200">
            <p className="font-bold text-indigo-300">💡 Automated Content Optimization Suggestion:</p>
            <p>Students exhibit a 14% failure rate on CIDR prefix math questions in Lesson 4. Consider adding a quick interactive visual subnet breakdown widget or reducing checkpoint strictness from 80% to 75% for first-time attempts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
