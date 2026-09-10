import React, { useState } from 'react';
import { Course } from '../../types';
import { getCategoryIcon } from './CourseCard';
import { 
  X, CheckCircle2, Clock, Award, Shield, Zap, BookOpen, Lock, ChevronDown, ChevronUp, 
  Sparkles, Check, ArrowRight 
} from 'lucide-react';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll?: (course: Course) => void;
  isEnrolled?: boolean;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
  onEnroll,
  isEnrolled
}) => {
  if (!course) return null;

  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const normalizedStatus = (course.status || 'PUBLISHED').toUpperCase().replace(' ', '_');
  const isPublished = normalizedStatus === 'PUBLISHED';
  const isComingSoon = normalizedStatus === 'COMING_SOON';

  // Sample curriculum modules based on course data
  const sampleModules = [
    {
      title: 'Module 1 — Foundations & Core Principles',
      lessons: [
        'Lesson 1 — Introduction & Scope Overview',
        'Lesson 2 — Key Terminology & Architecture',
        'Lesson 3 — Hands-on Setup & Environmental Requirements',
        'Knowledge Checkpoint 1'
      ]
    },
    {
      title: 'Module 2 — Deep-Dive Concepts & Protocols',
      lessons: [
        'Lesson 1 — Functional Mechanics & Algorithm Walkthrough',
        'Lesson 2 — Real-World Enterprise Use-Cases',
        'Lesson 3 — Troubleshooting Common Pitfalls & Configuration Errors',
        'Interactive Lab Challenge'
      ]
    },
    {
      title: 'Module 3 — Practice & Practical Application',
      lessons: [
        'Lesson 1 — Advanced Scenarios & Performance Tuning',
        'Lesson 2 — Security Hardening & Best Practices',
        'Lesson 3 — Capstone Assessment & Practical Lab'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 pr-10">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            {getCategoryIcon(course.category)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                {course.category}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-slate-300">
                {course.difficulty || course.level || 'Intermediate'}
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-white">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Metadata Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-500 block">Duration</span>
            <span className="font-bold text-slate-200">{course.duration || course.estimatedDuration || '8 Hours'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Lessons</span>
            <span className="font-bold text-slate-200">{course.totalLessons || 10} Lessons</span>
          </div>
          <div>
            <span className="text-slate-500 block">Cost</span>
            <span className="font-bold text-emerald-400">
              {course.price === 0 || course.price === undefined ? 'FREE' : `${course.price * 5} SP`}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Status</span>
            <span className={`font-bold ${isPublished ? 'text-emerald-400' : 'text-amber-300'}`}>
              {isPublished ? 'AVAILABLE NOW' : 'COMING SOON'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Course Description
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Skills Gained */}
        {course.skills && course.skills.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Skills Gained
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-slate-950 px-3 py-1 text-xs font-medium text-cyan-300 border border-slate-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Learning Objectives */}
        {course.learningObjectives && course.learningObjectives.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              What You Will Learn
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {course.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prerequisites */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Prerequisites
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.prerequisites.map((prereq) => (
                <span key={prereq} className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  {prereq}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Curriculum Outline */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Curriculum Roadmap
          </h3>
          {isPublished ? (
            <div className="space-y-2">
              {sampleModules.map((mod, idx) => (
                <div key={idx} className="rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden">
                  <button
                    onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-slate-200 hover:bg-slate-900 text-left transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-cyan-400" />
                      {mod.title}
                    </span>
                    {expandedModule === idx ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </button>
                  {expandedModule === idx && (
                    <div className="px-4 pb-3.5 space-y-2 border-t border-slate-800/60 pt-2 text-xs text-slate-400">
                      {mod.lessons.map((les, lIdx) => (
                        <div key={lIdx} className="flex items-center gap-2 pl-6">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                          <span>{les}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <Clock className="h-5 w-5 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-slate-300">Curriculum Coming Soon</p>
              <p className="text-[11px] text-slate-500">Content for this module is currently in active development.</p>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Cost</span>
            <span className="text-xl font-extrabold text-white">
              {course.price === 0 || course.price === undefined ? 'FREE' : `${course.price * 5} SP`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            {isPublished && (
              <button
                onClick={() => {
                  if (onEnroll) onEnroll(course);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
