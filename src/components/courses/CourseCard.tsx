import React, { useState } from 'react';
import { Course } from '../../types';
import { 
  Cpu, Code, Globe, Database, Network, Shield, Cloud, GitBranch, Brain, BarChart3, 
  Clock, Award, Zap, Lock, ChevronRight, CheckCircle2, AlertCircle, Eye
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
  onEnroll?: (course: Course) => void;
  isEnrolled?: boolean;
}

export const getCategoryIcon = (category: string) => {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('network')) return <Network className="h-5 w-5 text-cyan-400" />;
  if (cat.includes('cyber') || cat.includes('security')) return <Shield className="h-5 w-5 text-emerald-400" />;
  if (cat.includes('prog') || cat.includes('c++') || cat.includes('python')) return <Code className="h-5 w-5 text-blue-400" />;
  if (cat.includes('web') || cat.includes('html') || cat.includes('react')) return <Globe className="h-5 w-5 text-violet-400" />;
  if (cat.includes('data') && cat.includes('science')) return <BarChart3 className="h-5 w-5 text-pink-400" />;
  if (cat.includes('database') || cat.includes('sql')) return <Database className="h-5 w-5 text-amber-400" />;
  if (cat.includes('cloud') || cat.includes('aws')) return <Cloud className="h-5 w-5 text-sky-400" />;
  if (cat.includes('devops') || cat.includes('docker') || cat.includes('git')) return <GitBranch className="h-5 w-5 text-indigo-400" />;
  if (cat.includes('ai') || cat.includes('machine') || cat.includes('intelligence')) return <Brain className="h-5 w-5 text-fuchsia-400" />;
  return <Cpu className="h-5 w-5 text-cyan-400" />;
};

export const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetails, onEnroll, isEnrolled }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const normalizedStatus = (course.status || 'PUBLISHED').toUpperCase().replace(' ', '_');
  const isPublished = normalizedStatus === 'PUBLISHED';
  const isComingSoon = normalizedStatus === 'COMING_SOON';
  const isDraft = normalizedStatus === 'DRAFT';

  // Difficulty badge colors
  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
      case 'Intermediate':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60';
      case 'Advanced':
        return 'bg-purple-950/80 text-purple-300 border-purple-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const spCost = course.price === 0 || course.price === undefined ? 0 : course.price * 5;
  const formattedPrice = spCost === 0 ? 'FREE' : `${spCost} SP`;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 hover:-translate-y-1">
      
      {/* Top Header: Category Icon & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
              {getCategoryIcon(course.category)}
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                {course.category}
              </span>
              <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border mt-0.5 ${getDifficultyColor(course.difficulty || course.level)}`}>
                {course.difficulty || course.level || 'Intermediate'}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          {isPublished && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-800/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              PUBLISHED
            </span>
          )}
          {isComingSoon && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-950 px-2.5 py-1 text-[10px] font-bold text-amber-300 border border-amber-800/80">
              <Clock className="h-3 w-3" />
              COMING SOON
            </span>
          )}
          {isDraft && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400 border border-slate-700">
              <Lock className="h-3 w-3" />
              DRAFT
            </span>
          )}
        </div>

        {/* Course Title */}
        <h3 className="font-heading text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mt-1">
          {course.title}
        </h3>

        {/* Duration & Lesson Count Metadata */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-slate-500" />
            {course.duration || course.estimatedDuration || '8 Hours'}
          </span>
          {course.totalLessons && course.totalLessons > 0 ? (
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              {course.totalLessons} Lessons
            </span>
          ) : (
            <span className="text-slate-500 italic">Curriculum available</span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
          {course.description}
        </p>

        {/* Skills Gained Tags */}
        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {course.skills.slice(0, 3).map((skill) => (
              <span 
                key={skill} 
                className="rounded-md bg-slate-950 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-800"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="rounded-md bg-slate-950/60 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 border border-slate-800">
                +{course.skills.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer: Price & Action Buttons */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
        {/* Price Tag */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
            Price
          </span>
          <span className={`text-base font-extrabold ${course.price === 0 ? 'text-emerald-400' : 'text-white'}`}>
            {formattedPrice}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(course)}
            className="flex items-center gap-1 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
            title="View Course Details & Curriculum"
          >
            <Eye className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Details</span>
          </button>

          {isPublished ? (
            <button
              onClick={() => onEnroll ? onEnroll(course) : onViewDetails(course)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-95"
            >
              {isEnrolled ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Continue
                </>
              ) : (
                <>
                  Start Learning
                  <ChevronRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          ) : isComingSoon ? (
            <button
              onClick={() => onViewDetails(course)}
              className="flex items-center gap-1 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 px-3.5 py-2 text-xs font-semibold text-amber-300 transition-colors"
            >
              Roadmap
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              disabled
              className="rounded-xl bg-slate-800/50 border border-slate-700/50 px-3 py-2 text-xs font-semibold text-slate-500 cursor-not-allowed"
            >
              Protected
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
