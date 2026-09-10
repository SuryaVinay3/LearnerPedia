import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { courseService } from '../services/courseService';
import { useAuth } from '../contexts/AuthContext';

interface CheckpointModalProps {
  checkpoint: {
    id: string;
    lessonId: string;
    question: string;
    options: string[];
  };
  onClose: () => void;
  onSuccess?: () => void;
}

export const CheckpointModal: React.FC<CheckpointModalProps> = ({
  checkpoint,
  onClose,
  onSuccess,
}) => {
  const { refreshProfile } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    correct: boolean;
    explanation: string;
    lpEarned: number;
    xpEarned: number;
  } | null>(null);

  const handleSubmit = async () => {
    if (!selectedOption) return;
    setSubmitting(true);
    try {
      const res = await courseService.submitCheckpoint(checkpoint.id, selectedOption, 30);
      setResult(res);

      if (res.correct) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981'],
        });
        await refreshProfile();
      }
    } catch (err) {
      console.error('Checkpoint submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/80">
        
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-heading text-lg font-bold text-white">
            Quick Knowledge Challenge
          </h3>
          <p className="text-xs text-cyan-400 font-medium mt-0.5">
            Verify your comprehension to earn bonus Learning Points!
          </p>
        </div>

        {/* Question Text */}
        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 mb-5">
          <p className="text-sm font-semibold text-slate-200 leading-relaxed">
            {checkpoint.question}
          </p>
        </div>

        {/* Options */}
        {!result ? (
          <div className="space-y-2.5 mb-6">
            {checkpoint.options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedOption(opt)}
                className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left text-sm font-medium transition-all ${
                  selectedOption === opt
                    ? 'bg-cyan-950/80 text-cyan-300 border-2 border-cyan-500 shadow-md shadow-cyan-950'
                    : 'bg-slate-800/60 text-slate-300 border border-slate-700/60 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    selectedOption === opt
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        ) : (
          /* Result Feedback Card */
          <div className="mb-6 space-y-4">
            <div
              className={`rounded-xl p-4 border ${
                result.correct
                  ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-800 text-rose-200'
              }`}
            >
              <div className="mb-2 font-heading font-bold text-base">
                {result.correct ? 'Correct Answer!' : 'Not quite right'}
              </div>

              <p className="text-xs leading-relaxed text-slate-300 mb-3">
                {result.explanation}
              </p>

              {result.correct && (
                <div className="flex items-center gap-3 text-xs font-semibold pt-2 border-t border-emerald-800/60">
                  <span className="text-emerald-400">+{result.lpEarned} SP</span>
                  <span className="text-purple-300">+{result.xpEarned} XP</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end">
          {!result ? (
            <button
              type="button"
              disabled={!selectedOption || submitting}
              onClick={handleSubmit}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              {submitting ? 'Verifying...' : 'Submit Answer'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onSuccess) onSuccess();
              }}
              className="rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              Continue Lesson
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
