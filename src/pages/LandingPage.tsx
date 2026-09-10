import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';

export const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#040609] text-slate-100 overflow-hidden font-sans">
      
      {/* Background Subtle Grid & Ambient Glows matching screenshot */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Section */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Green Smart Ecosystem Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0c1a16] border border-[#143224] px-4.5 py-1.5 text-[11px] font-extrabold text-[#34d399] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Smart Education Ecosystem
            </div>

            {/* Huge bold display headings exactly like the screenshot */}
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

            {/* Sub-paragraph description text */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
              A smart learning ecosystem designed to make education more effective, practical and rewarding. 
              Learn concepts, prove your ability through verification and simulations, and earn SkillPoints 
              that unlock more learning resources.
            </p>

            {/* Action Buttons with high contrast and exact gradient styles */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Start Learning →
                </button>
              )}

              <Link
                to="/labs"
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#090d14] border border-[#162133] px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-200 hover:bg-[#121926] hover:text-white transition-all shadow-md"
              >
                Explore Simulations
              </Link>
            </div>
          </div>

          {/* Right Section: "Your Learning Pulse" Dashboard Card Widget */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-[32px] border border-[#162133] bg-[#090e15] p-7 shadow-2xl relative overflow-hidden">
              {/* Card top bar with green Active pill */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white tracking-tight">
                  Your Learning Pulse
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0c1a16] border border-[#143224] px-2.5 py-0.5 text-[10px] font-black uppercase text-[#10b981] tracking-wider">
                  <span className="w-1 h-1 rounded-full bg-[#10b981]" />
                  Active
                </span>
              </div>

              {/* Central Circle Gauge Graphic exactly like the screenshot */}
              <div className="my-8 flex items-center justify-center relative">
                {/* Simulated concentric glowing arcs in CSS */}
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
                      stroke="url(#pulseGrad)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="628"
                      strokeDashoffset="628" /* 0% Mastery */
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inside Text Dial */}
                  <div className="w-40 h-40 rounded-full bg-[#05070a] border border-[#151f2f] flex flex-col items-center justify-center text-center shadow-lg relative z-10">
                    <span className="text-4xl font-black text-white tracking-tight">0%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      Overall Mastery
                    </span>
                  </div>
                </div>

                {/* Floating "Ready to Learn" state capsule */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-2 flex items-center gap-1.5 rounded-full bg-[#0d121c] border border-[#1c2a3f] px-3.5 py-1.5 text-[11px] font-bold text-slate-200 shadow-xl">
                  <span>🧠</span>
                  <span>Ready to Learn</span>
                </div>

                {/* Left Floating button "Start your journey" */}
                <div className="absolute left-0 bottom-4">
                  <button 
                    onClick={() => currentUser ? null : setShowAuthModal(true)}
                    className="flex items-center gap-1 bg-[#05080c] hover:bg-[#0b1018] border border-[#192437] rounded-full py-1.5 px-3.5 text-[10px] font-extrabold text-white tracking-wide transition-colors"
                  >
                    <span>✦</span> Start your journey
                  </button>
                </div>
              </div>

              {/* Bottom Row Stats Counters Panels */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-[#131a26]/80 bg-[#05080d] p-3 text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                    Skills
                  </span>
                  <span className="text-lg font-black text-white mt-1 block">00</span>
                </div>

                <div className="rounded-2xl border border-[#131a26]/80 bg-[#05080d] p-3 text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                    Mastered
                  </span>
                  <span className="text-lg font-black text-white mt-1 block">00</span>
                </div>

                <div className="rounded-2xl border border-[#131a26]/80 bg-[#05080d] p-3 text-center">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                    SkillPoints
                  </span>
                  <span className="text-lg font-black text-white mt-1 block">0</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};
