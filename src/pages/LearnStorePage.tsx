import React, { useEffect, useState, useMemo } from 'react';
import { courseService } from '../services/courseService';
import { Course } from '../types';
import { CourseCard } from '../components/courses/CourseCard';
import { RoadmapView } from '../components/courses/RoadmapView';
import { CourseDetailsModal } from '../components/courses/CourseDetailsModal';
import { COURSES_CATALOG } from '../data/coursesCatalog';
import { 
  Search, LayoutGrid, Map, Filter, Sparkles, RefreshCw, Layers, SlidersHorizontal, BookOpen 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LearnStorePage: React.FC = () => {
  const { userProfile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // View Mode: Grid or Roadmap
  const [viewMode, setViewMode] = useState<'grid' | 'roadmap'>('grid');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');

  // Selected course for detail modal
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Fetch courses from API or fall back to static COURSES_CATALOG
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getCourses();
        if (data && data.length > 0) {
          setCourses(data);
        } else {
          setCourses(COURSES_CATALOG as Course[]);
        }
      } catch (err) {
        console.warn('API error fetching courses, using local catalog fallback:', err);
        setCourses(COURSES_CATALOG as Course[]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = [
    'All',
    'Computer Science',
    'Programming',
    'Web Development',
    'Databases',
    'Computer Networks',
    'Cybersecurity',
    'Cloud Computing',
    'DevOps',
    'AI / Machine Learning',
    'Data Science'
  ];

  // Filtering Logic
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // 1. Search filter across title, category, description, skills, tags
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        c.title?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.skills?.some(s => s.toLowerCase().includes(q)) ||
        c.tags?.some(t => t.toLowerCase().includes(q));

      // 2. Category Filter
      const matchesCategory = selectedCategory === 'All' || 
        c.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        c.domain?.toLowerCase() === selectedCategory.toLowerCase();

      // 3. Difficulty Filter
      const cDiff = c.difficulty || c.level || 'Intermediate';
      const matchesDifficulty = selectedDifficulty === 'All' || cDiff.toLowerCase() === selectedDifficulty.toLowerCase();

      // 4. Price / SP Cost Filter
      const price = c.price ?? 0;
      const spCost = price === 0 ? 0 : price * 5;
      let matchesPrice = true;
      if (selectedPriceFilter === 'Free') matchesPrice = spCost === 0;
      else if (selectedPriceFilter === 'Under 250 SP') matchesPrice = spCost > 0 && spCost < 250;
      else if (selectedPriceFilter === '250–500 SP') matchesPrice = spCost >= 250 && spCost <= 500;
      else if (selectedPriceFilter === '500+ SP') matchesPrice = spCost > 500;

      // 5. Status Filter
      const status = (c.status || 'PUBLISHED').toUpperCase().replace(' ', '_');
      let matchesStatus = true;
      if (selectedStatusFilter === 'Available Now') matchesStatus = status === 'PUBLISHED';
      else if (selectedStatusFilter === 'Coming Soon') matchesStatus = status === 'COMING_SOON';
      else if (selectedStatusFilter === 'Draft') matchesStatus = status === 'DRAFT';

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice && matchesStatus;
    });
  }, [courses, searchQuery, selectedCategory, selectedDifficulty, selectedPriceFilter, selectedStatusFilter]);

  // Sorting Logic
  const sortedCourses = useMemo(() => {
    const list = [...filteredCourses];
    if (sortBy === 'Price: Low to High') {
      return list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    }
    if (sortBy === 'Price: High to Low') {
      return list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }
    if (sortBy === 'Difficulty') {
      const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      return list.sort((a, b) => (rank[a.difficulty || 'Intermediate'] || 2) - (rank[b.difficulty || 'Intermediate'] || 2));
    }
    if (sortBy === 'A-Z') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'Newest') {
      return list.reverse();
    }
    // Default Recommended
    return list;
  }, [filteredCourses, sortBy]);

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage) || 1;
  const paginatedCourses = sortedCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Recommendations based on user profile
  const userCompletedCount = userProfile?.completedLessons?.length || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-950 px-3.5 py-1 text-xs font-semibold text-cyan-300 border border-cyan-800/60 mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>{courses.length}+ Technical Courses</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Learn Store
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Explore your learning roadmap across 10 specialized technical domains.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('roadmap')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'roadmap'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="h-4 w-4" />
              <span>Roadmap View</span>
            </button>
          </div>
        </div>

        {/* AI Personal Recommendation Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Recommended For You
              </h3>
              {userCompletedCount > 0 ? (
                <p className="text-xs text-slate-300 mt-0.5">
                  Based on your completed modules ({userCompletedCount}), we recommend starting with <strong className="text-white">IPv4 Addressing</strong> and progressing to <strong className="text-white">Subnetting and Supernetting</strong>.
                </p>
              ) : (
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete a few learning activities or quizzes to get personalized course recommendations.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Search & Filtering Control Toolbar */}
        <div className="space-y-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          
          {/* Top Search Row */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search courses, skills, topics..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {/* Difficulty Dropdown */}
              <select
                value={selectedDifficulty}
                onChange={(e) => { setSelectedDifficulty(e.target.value); setCurrentPage(1); }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Price Filter */}
              <select
                value={selectedPriceFilter}
                onChange={(e) => { setSelectedPriceFilter(e.target.value); setCurrentPage(1); }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="All">All Costs</option>
                <option value="Free">Free</option>
                <option value="Under 250 SP">Under 250 SP</option>
                <option value="250–500 SP">250–500 SP</option>
                <option value="500+ SP">500+ SP</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => { setSelectedStatusFilter(e.target.value); setCurrentPage(1); }}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Available Now">Available Now</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Draft">Draft</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-400 font-semibold focus:outline-none"
              >
                <option value="Recommended">Recommended</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Difficulty">Difficulty</option>
                <option value="A-Z">A-Z</option>
                <option value="Newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content View Area */}
        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
            <span>Loading 125+ course catalog...</span>
          </div>
        ) : viewMode === 'roadmap' ? (
          <RoadmapView
            courses={courses}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        ) : (
          <div>
            {/* Active Count Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
              <span>Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses</span>
              {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedPriceFilter !== 'All' || selectedStatusFilter !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setSelectedPriceFilter('All');
                    setSelectedStatusFilter('All');
                  }}
                  className="text-cyan-400 font-bold hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Course Cards Responsive Grid (4 columns on desktop) */}
            {paginatedCourses.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3">
                <p className="text-slate-400 text-xs">No courses match your selected search or filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                    setSelectedPriceFilter('All');
                    setSelectedStatusFilter('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewDetails={(c) => setSelectedCourse(c)}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};
