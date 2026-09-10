import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lab } from '../types';
import { labService } from '../services/labService';
import { LabEngine } from '../components/labs/LabEngine';
import { 
  ArrowLeft, FlaskConical, Award, Zap, CheckCircle2, Sparkles, HelpCircle, BookOpen, MessageSquare 
} from 'lucide-react';

export const LabDetailPage: React.FC = () => {
  const { labId } = useParams<{ labId: string }>();
  const navigate = useNavigate();
  const [lab, setLab] = useState<Lab | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Completion Modal State
  const [completionModal, setCompletionModal] = useState<{
    show: boolean;
    score: number;
    xpEarned: number;
    lpEarned: number;
    feedback?: string;
  } | null>(null);

  useEffect(() => {
    if (labId) loadLab();
  }, [labId]);

  const loadLab = async () => {
    setLoading(true);
    try {
      const data = await labService.getLabById(labId!);
      setLab(data);
    } catch (err) {
      console.error('Failed to load lab:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLabCompleted = (score: number, xp: number, lp: number, feedback?: string) => {
    setCompletionModal({
      show: true,
      score,
      xpEarned: xp,
      lpEarned: lp,
      feedback
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-8">
        <div className="flex items-center gap-3 font-mono text-cyan-400 font-bold animate-pulse">
          <FlaskConical className="h-6 w-6" />
          Initializing Isolated Lab Sandbox Environment...
        </div>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 p-8 space-y-4">
        <button
          onClick={() => navigate('/labs')}
          className="flex items-center gap-2 text-xs font-bold text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Labs
        </button>
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-200">Lab Not Found</h2>
          <p className="text-xs text-slate-400">The requested lab configuration could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Bar Navigation & Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/labs')}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                {lab.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {lab.difficulty}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-0.5">{lab.title}</h1>
          </div>
        </div>

        {/* Rewards Badge */}
        <div className="flex items-center gap-3 font-mono text-xs font-bold bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
          <span className="flex items-center gap-1 text-cyan-400">
            <Zap className="h-4 w-4" />
            +{lab.xpReward} XP
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <Award className="h-4 w-4" />
            +{lab.lpReward} LP
          </span>
        </div>
      </div>

      {/* Lab Overview Banner & Instructions */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-cyan-400" />
          Lab Objectives & Instructions
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {lab.instructions}
        </p>

        {lab.objectives && lab.objectives.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-xs">
            {lab.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{obj}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Lab Engine Component */}
      <LabEngine lab={lab} onComplete={handleLabCompleted} />

      {/* Completion Celebration Modal */}
      {completionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Lab Completed!</h2>
              <p className="text-xs text-slate-300">
                {completionModal.feedback || 'You have successfully executed and passed all verification checks for this lab.'}
              </p>
            </div>

            {/* Score & Rewards Box */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block">XP Earned</span>
                <span className="text-cyan-400 font-bold text-lg flex items-center justify-center gap-1">
                  <Zap className="h-4 w-4" /> +{completionModal.xpEarned}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block">SP / LP Earned</span>
                <span className="text-amber-400 font-bold text-lg flex items-center justify-center gap-1">
                  <Award className="h-4 w-4" /> +{completionModal.lpEarned} SP
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => navigate('/labs')}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <FlaskConical className="h-4 w-4" />
                Try Another Lab
              </button>

              <button
                onClick={() => navigate('/subjects')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-emerald-400" />
                Practice Questions
              </button>

              <button
                onClick={() => navigate('/ai-trainer')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4 text-indigo-400" />
                Ask AI Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
