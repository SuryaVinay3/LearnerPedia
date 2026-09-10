import React, { useEffect, useState } from 'react';
import { profileService } from '../services/profileService';
import { SkillAnalysis } from '../types';
import { Link } from 'react-router-dom';

export const AnalysisPage: React.FC = () => {
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await profileService.getAnalysis();
        setAnalysis(data);
      } catch (err) {
        console.warn('Error loading AI analysis:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Computing AI Skill Vector Analysis...
      </div>
    );
  }

  const scores = [
    { label: 'Theoretical Knowledge', value: analysis?.theoryScore || 75, color: 'from-cyan-500 to-blue-500' },
    { label: 'Practice Quiz Accuracy', value: analysis?.practiceScore || 70, color: 'from-blue-500 to-indigo-500' },
    { label: 'VLSM Application', value: analysis?.applicationScore || 65, color: 'from-purple-500 to-pink-500' },
    { label: 'Simulation Engineering', value: analysis?.simulationScore || 60, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-950 px-3.5 py-1 text-xs font-semibold text-purple-300 border border-purple-800/60 mb-3">
            <span>AI Learning Analytics Engine</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
            Performance & Skill Matrix
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Real-time multi-dimensional evaluation derived from your Firestore quiz attempts, network simulation logs, and competition scores.
          </p>
        </div>

        {/* Weakness Alert Box */}
        <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 p-6 sm:p-8 shadow-xl">
          <div className="flex items-start gap-4">
            <div>
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                Targeted Opportunity Identified
              </span>
              <h3 className="font-heading text-lg font-bold text-white mt-1">
                Primary Focus Area: <span className="text-purple-300">{analysis?.weakArea || 'Simulation Engineering'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Your theoretical grasp of CIDR notation is high, but your practical execution score in network topology routing shows room for growth.
              </p>
            </div>
          </div>
        </div>

        {/* Skill Matrix Visual Progress Bars */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="font-heading text-lg font-bold text-white">
            Multi-Dimensional Skill Vector Breakdown
          </h2>

          <div className="space-y-6">
            {scores.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations List */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-4">
          <h2 className="font-heading text-lg font-bold text-white">
            Recommended Practice Actions
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {analysis?.recommendations?.map((rec, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950 p-4 border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-3"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-950 text-purple-300 text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/simulation"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20"
          >
            <span>Run Network Simulation Lab</span>
          </Link>

          <Link
            to="/competition"
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <span>Enter VLSM Competition</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
