import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { profileService } from '../services/profileService';
import { SkillAnalysis } from '../types';

export const DashboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await profileService.getAnalysis();
        setAnalysis(res);
      } catch (err) {
        console.warn('Dashboard analysis fetch fallback:', err);
      }
    };
    loadDashboardData();
  }, []);

  // Calculate dynamic stats for "Your Learning Pulse"
  const xp = userProfile?.xp || 0;
  const overallMastery = Math.min(100, Math.max(5, Math.round((xp / 1200) * 100)));
  const skillsCount = userProfile?.streak ? Math.min(12, Math.max(3, userProfile.streak + 2)) : 5;
  const masteredCount = Math.floor(xp / 400) || 1;
  const skillPoints = userProfile?.learningPoints || 0;

  // Calculate SVG dashoffset based on overallMastery (radius of 100 is circumference of 2*pi*r = 628)
  const strokeDashoffset = 628 - (628 * overallMastery) / 100;

  return (
    <div className="min-h-screen bg-[#040609] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Dynamic Hero Layout exactly matching screenshot */}
        <div className="grid lg:grid-cols-12 gap-8 items-center border-b border-[#121824]/80 pb-12">
          
          {/* Left Side: Learn, Prove, Earn */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0c1a16] border border-[#143224] px-4.5 py-1.5 text-[11px] font-extrabold text-[#34d399] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              SMART EDUCATION ECOSYSTEM
            </div>

            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                Learn.
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent leading-none tracking-tight">
                Prove.
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                Earn.
              </h1>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Welcome back, <span className="text-white font-bold">{userProfile?.name || 'Learner'}</span>! 
              You are currently Level {userProfile?.levelNumber || 1} ({userProfile?.level || 'Explorer'}). 
              Continue proving your expertise across computer networks and security labs to gain SkillPoints.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Link
                to="/learn-store"
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02]"
              >
                Start Learning →
              </Link>
              
              <Link
                to="/labs"
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#090d14] border border-[#162133] px-7 py-3.5 text-xs font-black uppercase tracking-wider text-slate-200 hover:bg-[#121926] transition-all"
              >
                Explore Labs
              </Link>
            </div>
          </div>

          {/* Right Side: Your Learning Pulse Dashboard Widget with live user values */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-[32px] border border-[#162133] bg-[#090e15] p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white tracking-tight">
                  Your Learning Pulse
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0c1a16] border border-[#143224] px-2.5 py-0.5 text-[10px] font-black uppercase text-[#10b981] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  Active
                </span>
              </div>

              {/* Concentric Gauge */}
              <div className="my-8 flex items-center justify-center relative">
                <div className="w-56 h-56 rounded-full border border-slate-800/40 flex items-center justify-center p-3 relative">
                  <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/10 animate-[spin_120s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border border-slate-800/60" />
                  <div className="absolute inset-6 rounded-full border border-[#182335]/30 shadow-inner" />
                  
                  {/* Outer gradient arc representation */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="#141923"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="url(#pulseGradDash)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="628"
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="pulseGradDash" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inside Text Dial */}
                  <div className="w-40 h-40 rounded-full bg-[#05070a] border border-[#151f2f] flex flex-col items-center justify-center text-center shadow-lg relative z-10">
                    <span className="text-4xl font-black text-white tracking-tight">{overallMastery}%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      Overall Mastery
                    </span>
                  </div>
                </div>

                {/* Floating State Indicator */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-2 flex items-center gap-1.5 rounded-full bg-[#0d121c] border border-[#1c2a3f] px-3.5 py-1.5 text-[11px] font-bold text-slate-200 shadow-xl">
                  <span>🧠</span>
                  <span>Ready to Learn</span>
                </div>

                {/* Left Floating Action Button */}
                <div className="absolute left-0 bottom-4">
                  <Link 
                    to="/learn-store"
                    className="flex items-center gap-1 bg-[#05080c] hover:bg-[#0b1018] border border-[#192437] rounded-full py-1.5 px-3.5 text-[10px] font-extrabold text-white tracking-wide transition-colors"
                  >
                    <span>✦</span> Start your journey
                  </Link>
                </div>
              </div>

              {/* Stats panels at bottom */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-[#131a26]/80 bg-[#05080d] p-3 text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                    Skills
                  </span>
                  <span className="text-lg font-black text-white mt-1 block">
                    {String(skillsCount).padStart(2, '0')}
                  </span>
                </div>

                <div className="rounded-2xl border border-[#131a26]/80 bg-[#05080d] p-3 text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                    Mastered
                  </span>
                  <span className="text-lg font-black text-white mt-1 block">
                    {String(masteredCount).padStart(2, '0')}
                  </span>
                </div>

                <div className="rounded-2xl border border-[#131a26]/80 bg-[#05080d] p-3 text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                    SkillPoints
                  </span>
                  <span className="text-lg font-black text-white mt-1 block">{skillPoints}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* AI Learning Recommendation & Comprehensive Student Analytics */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Detailed Analytics Matrix */}
          <div className="lg:col-span-7 rounded-2xl border border-[#162133] bg-[#090e15] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>📊</span> Student Performance & Skill Matrix
              </h3>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                Streak: {userProfile?.streak || 1} Days 🔥
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Theoretical Knowledge</span>
                  <span className="text-cyan-400 font-mono">{analysis?.theoryScore || 85}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: `${analysis?.theoryScore || 85}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Practice Quiz Accuracy</span>
                  <span className="text-emerald-400 font-mono">{analysis?.practiceScore || 78}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${analysis?.practiceScore || 78}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">VLSM & Network Application</span>
                  <span className="text-blue-400 font-mono">{analysis?.applicationScore || 80}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div className="h-full bg-blue-400 rounded-full transition-all duration-500" style={{ width: `${analysis?.applicationScore || 80}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Simulation Engineering</span>
                  <span className="text-purple-400 font-mono">{analysis?.simulationScore || 72}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: `${analysis?.simulationScore || 72}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block mb-1">Strong Area</span>
                <span className="text-xs font-bold text-white">Computer Networks & Subnetting</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block mb-1">Needs Practice</span>
                <span className="text-xs font-bold text-white">{analysis?.weakArea || 'Exception Handling & Multithreading'}</span>
              </div>
            </div>
          </div>

          {/* Right: AI Mentor Pulse Recommendations */}
          <div className="lg:col-span-5 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 via-[#090e15] to-[#090e15] p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                <h3 className="text-sm font-extrabold text-purple-200 tracking-tight flex items-center gap-2">
                  <span>🤖</span> AI Mentor Diagnosis
                </h3>
                <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Active Guide</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {analysis?.recommendations?.[0] || 'Your subnetting mental math is strong! I recommend spending 15 minutes reviewing exception handling and circuit logic labs to maximize your mastery index.'}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Next Steps:</span>
                {(analysis?.recommendations || [
                  'Practice calculating magic numbers for subnet masks',
                  'Run the 3D Circuit Lab simulation',
                  'Complete a 5-question Quiz in Computer Networks'
                ]).slice(0, 3).map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-purple-950/30 border border-purple-500/20 p-2.5 rounded-xl">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Total Skill Points: <strong className="text-amber-400">{skillPoints} SP</strong></span>
              <Link
                to="/subjects"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20"
              >
                Ask Mentor Now 💬
              </Link>
            </div>
          </div>
        </div>

        {/* Course Domains Grid Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Active Learning Curriculum
            </h2>
            <Link to="/subjects" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider">
              View All 125 Courses →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Flagship Computer Networks module */}
            <div className="rounded-2xl border border-[#131f31] bg-[#090e15] p-6 shadow-lg hover:border-cyan-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-black text-cyan-400 text-xs tracking-wider">CN-01</span>
                <span className="rounded-full bg-[#0c1a16] border border-[#143224] px-2.5 py-0.5 text-[10px] font-black text-[#10b981] uppercase tracking-wide">
                  Flagship Module
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                Computer Networks
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
                Subnetting, CIDR notation, subnet masks, bitwise ANDing, and router topology.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-bold">Progress</span>
                  <span className="font-mono font-bold text-cyan-400">73%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 w-[73%]" />
                </div>
              </div>

              <Link
                to="/learn/computer-networks"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#182335] border border-[#243552] py-2.5 text-xs font-bold text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all text-center"
              >
                Continue Subnetting Lessons
              </Link>
            </div>

            {/* Cybersecurity Essentials */}
            <div className="rounded-2xl border border-[#131f31] bg-[#090e15] p-6 shadow-lg hover:border-blue-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-black text-slate-500 text-xs tracking-wider">SEC-04</span>
                <span className="rounded-full bg-[#0d121c] border border-[#1a2536] px-2.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase">
                  Intermediate
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors">
                Cybersecurity Essentials
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
                Zero-trust auth, packet inspection, custom rules, firewalls, and security defense.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-bold">Progress</span>
                  <span className="font-mono font-bold text-blue-400">61%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 w-[61%]" />
                </div>
              </div>

              <Link
                to="/subjects"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#182335] border border-[#243552] py-2.5 text-xs font-bold text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all text-center"
              >
                Launch Security Labs
              </Link>
            </div>

            {/* Python Data Structures */}
            <div className="rounded-2xl border border-[#131f31] bg-[#090e15] p-6 shadow-lg hover:border-purple-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-black text-slate-500 text-xs tracking-wider">PY-02</span>
                <span className="rounded-full bg-[#0d121c] border border-[#1a2536] px-2.5 py-0.5 text-[10px] font-bold text-slate-400 uppercase">
                  Beginner
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white group-hover:text-purple-400 transition-colors">
                Python & Data Structures
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-6 leading-relaxed">
                Lists, dictionaries, tuples, queues, algorithmic complexity, and dynamic solutions.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-bold">Progress</span>
                  <span className="font-mono font-bold text-purple-400">84%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 w-[84%]" />
                </div>
              </div>

              <Link
                to="/subjects"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#182335] border border-[#243552] py-2.5 text-xs font-bold text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all text-center"
              >
                Explore Code Challenges
              </Link>
            </div>

          </div>
        </div>

        {/* Quick Task Hub Navigation Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/subjects"
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#121a26] bg-[#090e15] p-4.5 hover:border-cyan-500/30 hover:bg-[#0c131d] transition-all"
          >
            <div>
              <div className="text-xs font-extrabold text-white">Quiz Center</div>
              <div className="text-[10px] text-slate-500 mt-0.5">5-Question Assessments</div>
            </div>
            <span className="text-cyan-400 text-xs font-bold">→</span>
          </Link>

          <Link
            to="/simulation"
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#121a26] bg-[#090e15] p-4.5 hover:border-cyan-500/30 hover:bg-[#0c131d] transition-all"
          >
            <div>
              <div className="text-xs font-extrabold text-white">Network Lab</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Packet Sandbox Simulator</div>
            </div>
            <span className="text-cyan-400 text-xs font-bold">→</span>
          </Link>

          <Link
            to="/competition"
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#121a26] bg-[#090e15] p-4.5 hover:border-amber-500/30 hover:bg-[#0c131d] transition-all"
          >
            <div>
              <div className="text-xs font-extrabold text-white">VLSM League</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Enterprise Subnet Challenge</div>
            </div>
            <span className="text-amber-400 text-xs font-bold">→</span>
          </Link>

          <Link
            to="/store"
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#121a26] bg-[#090e15] p-4.5 hover:border-emerald-500/30 hover:bg-[#0c131d] transition-all"
          >
            <div>
              <div className="text-xs font-extrabold text-white">Skill Store</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Redeem Earned Points</div>
            </div>
            <span className="text-emerald-400 text-xs font-bold">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
