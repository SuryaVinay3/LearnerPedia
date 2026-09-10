import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { Course } from '../types';

export const SubjectsPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Search, filter, pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        setCourses(data);
      } catch (err) {
        console.warn('Error fetching courses from API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ['All', 'Computer Science', 'Programming Languages', 'Web Development', 'Databases & SQL', 'Networking & Security', 'Cloud Computing', 'DevOps & CI/CD', 'AI & Data Science'];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-800/60 mb-3">
            <span>{courses.length} Interactive Learning Tracks</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
            150+ Practical Technical Domains
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Select any learning module to access bite-sized concept cards, hidden knowledge checkpoints, and interactive packet simulation labs.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800/80 p-4 rounded-2xl">
          <input
            type="text"
            placeholder="Search 150+ curriculum modules..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-80 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subjects Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading 150+ course catalog...</div>
        ) : paginatedCourses.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs space-y-2">
            <p>No courses found for the current search filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-cyan-400 font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl hover:border-cyan-500/50 transition-all group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 font-bold text-cyan-400 text-sm">
                      {course.icon || course.title.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-950/80 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-800/50">
                      <span>+{course.lpReward || 150} LP</span>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="mt-6 space-y-2 text-xs text-slate-400">
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span>Category</span>
                      <span className="font-semibold text-slate-200">{course.category}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span>Difficulty Level</span>
                      <span className="font-semibold text-cyan-300">{course.level}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span>Total Lessons</span>
                      <span className="font-semibold text-slate-200">{course.totalLessons || 5} Concept Cards</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to={`/learn/${course.id}`}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
                  >
                    <span>Launch Learning Track</span>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-xs text-slate-400">
            <div>
              Showing <span className="font-bold text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold text-white">{Math.min(currentPage * itemsPerPage, filteredCourses.length)}</span> of <span className="font-bold text-white">{filteredCourses.length}</span> learning tracks
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl disabled:opacity-40 hover:bg-slate-800 text-white font-semibold"
              >
                Previous
              </button>
              <span className="px-2 font-bold text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl disabled:opacity-40 hover:bg-slate-800 text-white font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
