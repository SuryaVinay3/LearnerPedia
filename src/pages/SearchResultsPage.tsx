import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, ArrowRight, Sparkles, BookOpen, Cpu, ShieldAlert, BadgeHelp, HelpCircle, GraduationCap, Map, RotateCcw } from 'lucide-react';
import { apiRequest } from '../services/apiClient';


interface SearchResult {
  id: string;
  type: 'course' | 'lesson' | 'topic' | 'lab' | 'simulation' | 'question' | 'competition' | 'cheatsheet' | 'store' | 'roadmap' | 'ai_knowledge';
  title: string;
  description: string;
  category: string;
  url: string;
  difficulty?: string;
  skills: string[];
  relevance_score: number;
}

const CATEGORIES = ["All", "Courses", "Lessons", "Labs", "Simulations", "Questions", "Competitions", "Cheat Sheets", "Store", "Roadmaps", "AI Knowledge"];

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryParam = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [inputQuery, setInputQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('relevance'); // relevance, alpha, updated
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch search results from backend API (Section 4 / 18)
  const fetchResults = async () => {
    if (!queryParam.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setError('');
    try {
      let endpoint = `/search?q=${encodeURIComponent(queryParam)}&category=${encodeURIComponent(selectedCategory)}&limit=40`;
      if (selectedDifficulty !== 'All') {
        endpoint += `&difficulty=${encodeURIComponent(selectedDifficulty)}`;
      }
      
      const data = await apiRequest(endpoint);
      let list = data.results || [];

      // Sort client-side based on user sort selection (Section 4)
      if (sortBy === 'alpha') {
        list.sort((a: SearchResult, b: SearchResult) => a.title.localeCompare(b.title));
      } else if (sortBy === 'updated') {
        // Mock recent update scores sorting
        list.sort((a: SearchResult, b: SearchResult) => b.id.localeCompare(a.id));
      }

      setResults(list);
      setTotal(data.total || 0);
    } catch (err: any) {
      setError(err.message || 'Universal Search engine is temporarily offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [queryParam, selectedCategory, selectedDifficulty, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    setSearchParams({ q: inputQuery, category: selectedCategory });
  };

  // Maps result type to visual icon
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="text-blue-400 w-4 h-4" />;
      case 'lab':
        return <Cpu className="text-emerald-400 w-4 h-4" />;
      case 'roadmap':
        return <Map className="text-sky-400 w-4 h-4" />;
      case 'ai_knowledge':
        return <Sparkles className="text-indigo-400 w-4 h-4" />;
      case 'question':
        return <HelpCircle className="text-amber-400 w-4 h-4" />;
      default:
        return <GraduationCap className="text-purple-400 w-4 h-4" />;
    }
  };

  const handleAction = (item: SearchResult) => {
    if (item.type === 'course') {
      navigate(`/courses/${item.id.replace('course-', '')}`);
    } else if (item.type === 'lab') {
      navigate(`/labs/${item.id.replace('lab-', '')}`);
    } else if (item.type === 'roadmap') {
      navigate(`/learn-store?tab=roadmaps`);
    } else if (item.type === 'ai_knowledge') {
      // Open AI Trainer widget context
      const chatToggle = document.getElementById('ai-trainer-toggle-btn');
      if (chatToggle) {
        chatToggle.click();
      }
    } else {
      navigate(`/courses`);
    }
  };

  const triggerAIBubble = () => {
    const chatToggle = document.getElementById('ai-trainer-toggle-btn');
    if (chatToggle) {
      chatToggle.click();
    }
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-100 flex flex-col font-sans">

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Title Block */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Search LearnerPedia
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Discover courses, dynamic lab simulations, expert roadmaps, exam practice, and expert trainer guidelines.
          </p>
        </div>

        {/* Global Search Bar Controls (Section 4) */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl w-full bg-[#0d131f]/60 border border-[#1e293b]/70 rounded-2xl flex items-center p-1.5 shadow-xl shadow-slate-950/20 backdrop-blur-md">
          <Search className="text-slate-400 ml-4 w-5 h-5" />
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Search everything..."
            className="flex-1 bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none px-3"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white transition-all cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Categories Tab Row (Section 3 / 4) */}
        <div className="border-b border-[#111928] pb-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none max-w-full pb-2 sm:pb-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchParams({ q: queryParam, category: cat });
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#182335] text-blue-400 border border-blue-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#0d121c]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorter and Filters Controls (Section 4) */}
          <div className="flex items-center gap-4 w-full sm:w-auto self-end">
            {/* Sort Control */}
            <div className="flex items-center gap-1.5 bg-[#0a0f18] border border-[#1b2535]/50 px-2.5 py-1.5 rounded-lg text-xs text-slate-300">
              <ArrowUpDown size={13} className="text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-xs text-slate-300 cursor-pointer pr-1"
              >
                <option value="relevance" className="bg-[#05070a]">Sort: Relevance</option>
                <option value="alpha" className="bg-[#05070a]">Sort: A - Z</option>
                <option value="updated" className="bg-[#05070a]">Sort: Recently Updated</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 bg-[#0a0f18] border border-[#1b2535]/50 px-2.5 py-1.5 rounded-lg text-xs text-slate-300">
              <SlidersHorizontal size={13} className="text-slate-500" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-xs text-slate-300 cursor-pointer pr-1"
              >
                <option value="All" className="bg-[#05070a]">Difficulty: All</option>
                <option value="Beginner" className="bg-[#05070a]">Beginner</option>
                <option value="Intermediate" className="bg-[#05070a]">Intermediate</option>
                <option value="Advanced" className="bg-[#05070a]">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Feedback & Stats banner */}
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>
            {queryParam ? (
              <>Showing <strong>{total}</strong> results for <span className="text-blue-400">"{queryParam}"</span></>
            ) : (
              "Please enter a search phrase to query the platform catalogs"
            )}
          </span>
          {results.length > 0 && (
            <span className="text-slate-500 font-mono">Matched index database</span>
          )}
        </div>

        {/* Loading / Error States (Section 36) */}
        {loading && (
          <div className="py-20 text-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-xs text-slate-400 font-semibold">Searching LearnerPedia databases...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-center text-xs text-red-400">
            {error}
          </div>
        )}

        {/* RESULTS CARD GRID (Section 4) */}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#090d16]/75 border border-[#1e293b]/50 hover:border-slate-700/60 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:shadow-slate-950/40"
              >
                {/* Upper Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                      {getResultIcon(item.type)}
                      <span>{item.type}</span>
                    </span>
                    
                    {/* Relevance score badge (Section 5) */}
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-[#0a1f14] border border-[#123122] px-2 py-0.5 rounded-full" title="Computed Relevance Index">
                      {Math.round(item.relevance_score * 100)}% Match
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Metadata row */}
                <div className="pt-3 border-t border-slate-900/50 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                    <span className="px-1.5 py-0.5 bg-[#091522] border border-[#152e47] text-[9px] rounded font-semibold text-blue-400">
                      {item.category}
                    </span>
                    {item.difficulty && (
                      <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-[9px] rounded font-semibold text-slate-400">
                        {item.difficulty}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAction(item)}
                    className="flex items-center gap-1 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-all group-hover:translate-x-0.5 cursor-pointer"
                  >
                    <span>
                      {item.type === 'course' && 'Open Course'}
                      {item.type === 'lab' && 'Open Lab'}
                      {item.type === 'roadmap' && 'Open Roadmap'}
                      {item.type === 'ai_knowledge' && 'Ask Trainer'}
                      {!['course', 'lab', 'roadmap', 'ai_knowledge'].includes(item.type) && 'Explore'}
                    </span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO RESULTS EXPERIENTIAL STATE (Section 22) */}
        {!loading && !error && queryParam && results.length === 0 && (
          <div className="p-8 sm:p-12 bg-[#090d16]/40 border border-[#1e293b]/40 rounded-2xl text-center max-w-xl mx-auto space-y-6">
            <div className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500 text-lg">
              ?
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">No exact results found for "{queryParam}"</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check spelling mistakes, use fewer keywords, or search by a broader subject category.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-900 space-y-3 text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Try searching:</span>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                <li>Double checking key syntax (e.g., Python, SQL, Subnetting)</li>
                <li>Selecting the <strong className="text-slate-300">"All"</strong> category tab first</li>
                <li>Asking our local interactive trainer details directly below</li>
              </ul>
            </div>

            {/* AI Fallback card (Section 22) */}
            <div className="p-4 bg-indigo-950/20 border border-indigo-900/30 rounded-xl flex items-center justify-between text-left gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                  Ask AI Trainer instead
                </h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Our offline learning intelligence can parse "{queryParam}" from its structured internal knowledge base topics instantly.
                </p>
              </div>
              <button
                onClick={triggerAIBubble}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-[10px] font-bold text-white rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                Ask AI
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
