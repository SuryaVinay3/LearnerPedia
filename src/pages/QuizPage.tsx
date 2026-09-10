import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { quizService } from '../services/quizService';
import { QuizQuestion, QuizAttempt } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { refreshProfile } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hintsUsed, setHintsUsed] = useState<Record<number, boolean>>({});
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [attemptResult, setAttemptResult] = useState<{
    score: number;
    accuracy: number;
    xpEarned: number;
    lpEarned: number;
    correctAnswers: number;
    totalQuestions: number;
    attempt: QuizAttempt;
  } | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await quizService.getQuizQuestions(id || 'computer-networks');
        setQuestions(data);
      } catch (err) {
        console.warn('Error fetching quiz questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (attemptResult || loading) return;
    const interval = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [attemptResult, loading]);

  const handleSelectOption = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleUseHint = (qId: number, hintText?: string) => {
    if (!hintsUsed[qId]) {
      setHintsUsed((prev) => ({ ...prev, [qId]: true }));
    }
    setActiveHint(hintText || 'Consider converting the octets to binary or applying 2^(32 - CIDR) - 2.');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const totalHints = Object.keys(hintsUsed).length;
    try {
      const res = await quizService.submitQuiz(
        id || 'computer-networks',
        answers,
        timeSeconds,
        totalHints
      );
      setAttemptResult(res);

      if (res.accuracy >= 70) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981', '#a855f7'],
        });
      }
      await refreshProfile();
    } catch (err) {
      console.error('Quiz submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Loading Practice Assessment...
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>

          {!attemptResult && (
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 border border-slate-800 text-cyan-400">
                <span>{Math.floor(timeSeconds / 60)}m {timeSeconds % 60}s</span>
              </div>

              <div className="text-slate-400">
                Question <span className="text-cyan-400 font-bold">{currentIdx + 1}</span> of {questions.length}
              </div>
            </div>
          )}
        </div>

        {/* Main Quiz Card */}
        {!attemptResult ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Question Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-800 mb-3">
                <span>Subnetting Assessment</span>
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.text}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full flex items-center gap-3 rounded-2xl p-4 text-left text-xs sm:text-sm font-medium transition-all ${
                    answers[currentQ.id] === idx
                      ? 'bg-cyan-950/80 text-cyan-300 border-2 border-cyan-500 shadow-md shadow-cyan-950'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      answers[currentQ.id] === idx
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            {/* Hint Box */}
            {activeHint && (
              <div className="rounded-2xl bg-amber-950/40 p-4 border border-amber-800/60 text-amber-200 text-xs leading-relaxed">
                <div>
                  <span className="font-bold text-amber-300">Hint: </span>
                  {activeHint}
                </div>
              </div>
            )}

            {/* Card Footer Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleUseHint(currentQ.id, currentQ.hint)}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>{hintsUsed[currentQ.id] ? 'View Hint Again' : 'Need a Hint? (-15 pts)'}</span>
              </button>

              <div className="flex items-center gap-3">
                {currentIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIdx(currentIdx - 1);
                      setActiveHint(null);
                    }}
                    className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                  >
                    Previous
                  </button>
                )}

                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    disabled={answers[currentQ.id] === undefined}
                    onClick={() => {
                      setCurrentIdx(currentIdx + 1);
                      setActiveHint(null);
                    }}
                    className="rounded-xl bg-cyan-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors disabled:opacity-40"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={Object.keys(answers).length < questions.length || submitting}
                    onClick={handleSubmit}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-40"
                  >
                    {submitting ? 'Evaluating...' : 'Submit Assessment'}
                  </button>
                )}
              </div>
            </div>

          </div>
        ) : (
          /* Results Evaluation Card */
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl space-y-6 text-center">
            
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950 text-cyan-400 font-bold border border-cyan-800">
              Score
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Assessment Completed!
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Your performance scores have been verified and recorded to your profile ledger.
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Accuracy</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">{attemptResult.accuracy}%</div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Correct Answers</div>
                <div className="text-2xl font-bold text-white mt-1">{attemptResult.correctAnswers}/{attemptResult.totalQuestions}</div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">XP Earned</div>
                <div className="text-2xl font-bold text-purple-400 mt-1">+{attemptResult.xpEarned}</div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">SP Earned</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">+{attemptResult.lpEarned} SP</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/analysis"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/20"
              >
                <span>View AI Skill Matrix</span>
              </Link>

              <Link
                to="/simulation"
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                <span>Practice in Network Lab</span>
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
