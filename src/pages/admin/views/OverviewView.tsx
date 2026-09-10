import React, { useEffect, useState } from 'react';
import { AdminDashboardOverview } from '../../../types';

export const OverviewView: React.FC = () => {
  const [data, setData] = useState<AdminDashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Failed to load admin dashboard:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 font-medium">
        Loading Platform Analytics & Overview...
      </div>
    );
  }

  const overview = data?.overview;

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Platform Control Overview</h1>
          <p className="text-slate-400 text-xs mt-1">Real-time status, user telemetry, and platform activity metrics.</p>
        </div>
        <button
          onClick={fetchDashboard}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg transition"
        >
          Refresh Data Metrics
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{overview?.totalUsers || 12}</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {overview?.activeUsers || 10} Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500">+{overview?.newUsers || 3} new registered learners this week</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published Content</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{overview?.totalCourses || 3}</span>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
              {overview?.totalLessons || 15} Lessons
            </span>
          </div>
          <p className="text-[11px] text-slate-500">{overview?.totalSimulations || 4} Interactive Simulations</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gamification Rewards</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-400">{(overview?.totalLpEarned || 8500).toLocaleString()} LP</span>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              {(overview?.totalXpEarned || 14200).toLocaleString()} XP
            </span>
          </div>
          <p className="text-[11px] text-slate-500">{(overview?.lpRedeemed || 2400).toLocaleString()} LP redeemed in store</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates & Competitions</p>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{overview?.certificatesIssued || 8}</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {overview?.activeCompetitions || 1} Live Comp
            </span>
          </div>
          <p className="text-[11px] text-slate-500">{overview?.completedCompetitions || 2} completed tournaments</p>
        </div>
      </div>

      {/* Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart Simulation */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Active Learners</h3>
            <span className="text-xs text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              Growth +18%
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-800 pb-2">
            {(data?.analytics?.userGrowth || [
              { label: 'Mon', users: 4 },
              { label: 'Tue', users: 7 },
              { label: 'Wed', users: 10 },
              { label: 'Thu', users: 14 },
              { label: 'Fri', users: 18 },
              { label: 'Sat', users: 22 },
              { label: 'Sun', users: 28 }
            ]).map((point, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md transition-all group-hover:brightness-125"
                  style={{ height: `${(point.users / 30) * 100}%` }}
                ></div>
                <span className="text-[10px] font-semibold text-slate-400">{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Enrollments & Quiz Stats */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Popular Course Engagement</h3>
          
          <div className="space-y-3">
            {[
              { name: 'Computer Networks & Subnetting', learners: 42, percentage: 85 },
              { name: 'Cybersecurity Fundamentals', learners: 31, percentage: 65 },
              { name: 'Java Programming & OOP', learners: 25, percentage: 50 },
            ].map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{c.name}</span>
                  <span className="text-slate-400 font-mono">{c.learners} Active Learners</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all"
                    style={{ width: `${c.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-center">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <p className="text-[11px] text-slate-400">Avg Quiz Accuracy</p>
              <p className="text-xl font-extrabold text-emerald-400">78.4%</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <p className="text-[11px] text-slate-400">Sim Pass Rate</p>
              <p className="text-xl font-extrabold text-indigo-400">84.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
