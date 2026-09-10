import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { Lesson } from '../types';
import { CheckpointModal } from '../components/CheckpointModal';
import { useAuth } from '../contexts/AuthContext';

export const LearningModulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userProfile, refreshProfile } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeCheckpoint, setActiveCheckpoint] = useState<any | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await courseService.getLessons(id || 'computer-networks');
        setLessons(data);
      } catch (err) {
        console.warn('Error fetching lessons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [id]);

  const currentLesson = lessons[currentIndex];

  const handleNext = async () => {
    if (!currentLesson) return;

    try {
      await courseService.completeLesson(id || 'computer-networks', currentLesson.id);
      await refreshProfile();
    } catch (e) {
      console.warn('Complete lesson error:', e);
    }

    if (currentIndex === 3 || currentIndex === 6) {
      try {
        const chk = await courseService.getRandomCheckpoint(currentLesson.id);
        setActiveCheckpoint(chk);
      } catch {
        setActiveCheckpoint({
          id: 'chk-192-26',
          lessonId: currentLesson.id,
          question: 'In CIDR notation 192.168.1.0/26, how many usable host IP addresses are available?',
          options: ['30', '62', '126', '254']
        });
      }
    }

    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading Subnetting Educational Cards...
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center text-slate-300">
        Lesson not found. <Link to="/subjects" className="text-cyan-400 underline">Return to subjects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/subjects"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span>Back to Subjects</span>
          </Link>

          <div className="text-xs font-semibold text-slate-400">
            Card <span className="text-cyan-400">{currentIndex + 1}</span> of {lessons.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }}
          />
        </div>

        {/* Educational Lesson Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3 py-1 text-xs font-bold text-cyan-300 border border-cyan-800">
              <span>Computer Networks</span>
            </div>

            {userProfile?.completedLessons?.includes(currentLesson.id) && (
              <span className="text-xs font-bold text-emerald-400">
                Completed
              </span>
            )}
          </div>

          <div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              {currentLesson.title}
            </h1>
            <p className="text-sm text-cyan-400 font-medium mt-1">
              {currentLesson.summary}
            </p>
          </div>

          {/* Card Body Text */}
          <div className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
            {currentLesson.content}
          </div>

          {/* Formula Highlight Box if Present */}
          {currentLesson.formula && (
            <div className="rounded-2xl bg-cyan-950/40 p-4 border border-cyan-800/60 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Core Mathematical Formula
                </span>
                <span className="font-mono text-sm font-bold text-cyan-200">
                  {currentLesson.formula}
                </span>
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div>
            <h3 className="font-heading text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Key Conceptual Takeaways
            </h3>
            <div className="space-y-2">
              {currentLesson.keyTakeaways?.map((takeaway, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-xl bg-slate-950 p-3 text-xs text-slate-300 border border-slate-800"
                >
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Navigation Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="rounded-xl bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-40"
            >
              Previous Card
            </button>

            {currentIndex < lessons.length - 1 ? (
              <button
                onClick={handleNext}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <span>Next Concept Card</span>
              </button>
            ) : (
              <Link
                to={`/quiz/${id || 'computer-networks'}`}
                className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>Take Practice Quiz</span>
              </Link>
            )}
          </div>

        </div>

        {/* Quick Action Links */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/simulation"
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-cyan-500/50 transition-colors"
          >
            <div>
              <div className="text-sm font-bold text-white">Interactive Network Lab</div>
              <div className="text-xs text-slate-400">Test PC, Switch, Router ICMP packet delivery</div>
            </div>
          </Link>

          <Link
            to="/quiz/computer-networks"
            className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-purple-500/50 transition-colors"
          >
            <div>
              <div className="text-sm font-bold text-white">5-Question Practice Assessment</div>
              <div className="text-xs text-slate-400">Timed quiz with hint tracking & point rewards</div>
            </div>
          </Link>
        </div>

      </div>

      {/* Hidden Checkpoint Modal */}
      {activeCheckpoint && (
        <CheckpointModal
          checkpoint={activeCheckpoint}
          onClose={() => setActiveCheckpoint(null)}
        />
      )}
    </div>
  );
};
