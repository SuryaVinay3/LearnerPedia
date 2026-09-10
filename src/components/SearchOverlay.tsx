import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Cpu, HelpCircle, Trophy, Sparkles, Map, Trash2, Clock, Command, ArrowRight } from 'lucide-react';
import { apiRequest } from '../services/apiClient';
import { useAuth } from '../contexts/AuthContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

interface SuggestionItem {
  text: string;
  type: string;
  id: string;
}

const STATIC_POPULAR = ["Python", "Java", "SQL", "Subnetting", "Cybersecurity", "Cloud Computing", "Docker", "Machine Learning"];

const CATEGORIES = ["All", "Courses", "Lessons", "Labs", "Simulations", "Questions", "Competitions", "Cheat Sheets", "Store", "Roadmaps", "AI Knowledge"];

export function SearchOverlay({ isOpen, onClose, initialQuery = '' }: SearchOverlayProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('All');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      loadRecentSearches();
      setQuery(initialQuery);
    } else {
      setQuery('');
      setSuggestions([]);
      setActiveIndex(-1);
    }
  }, [isOpen, initialQuery]);

  // Load Search History (Section 8)
  const loadRecentSearches = async () => {
    if (currentUser) {
      try {
        const data = await apiRequest('/search/history');
        setRecentSearches((data.history || []).map((h: any) => h.query));
      } catch (e) {
        // Fallback to localStorage if unauthorized or server error
        const local = localStorage.getItem('recentSearches');
        setRecentSearches(local ? JSON.parse(local) : []);
      }
    } else {
      const local = localStorage.getItem('recentSearches');
      setRecentSearches(local ? JSON.parse(local) : []);
    }
  };

  // Add keyword to Search History
  const saveSearchQuery = async (searchWord: string) => {
    if (!searchWord.trim()) return;
    const cleanWord = searchWord.trim();

    if (currentUser) {
      try {
        await apiRequest('/search/history', {
          method: 'POST',
          body: JSON.stringify({ query: cleanWord })
        });
      } catch (e) {
        console.warn('Could not save search history to server');
      }
    }

    // Always update local storage as fallback/mirror
    let local = localStorage.getItem('recentSearches');
    let list: string[] = local ? JSON.parse(local) : [];
    list = [cleanWord, ...list.filter(item => item !== cleanWord)].slice(0, 8);
    localStorage.setItem('recentSearches', JSON.stringify(list));
    setRecentSearches(list);
  };

  // Clear single recent search item
  const clearRecentItem = async (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    if (currentUser) {
      try {
        await apiRequest(`/search/history?query=${encodeURIComponent(item)}`, {
          method: 'DELETE'
        });
      } catch (err) {
        console.warn('Failed server history clear');
      }
    }
    const filtered = recentSearches.filter(i => i !== item);
    localStorage.setItem('recentSearches', JSON.stringify(filtered));
    setRecentSearches(filtered);
  };

  // Clear entire recent search history
  const clearAllRecent = async () => {
    if (currentUser) {
      try {
        await apiRequest('/search/history', { method: 'DELETE' });
      } catch (err) {
        console.warn('Failed clearing all server history');
      }
    }
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  // Trigger real search query typing suggestions (Section 7 / 24)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await apiRequest(`/search/suggestions?q=${encodeURIComponent(query)}`);
        setSuggestions(response.suggestions || []);
        setActiveIndex(-1);
      } catch (err) {
        console.error('Suggestions fetch failed:', err);
      } finally {
        setLoading(false);
      }
    }, 250); // Optimized debounce between 250ms - 350ms (Section 1 / 24)

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSearchSubmit = (searchWord: string) => {
    if (!searchWord.trim()) return;
    saveSearchQuery(searchWord);
    onClose();
    navigate(`/search?q=${encodeURIComponent(searchWord)}&category=${encodeURIComponent(activeCategory)}`);
  };

  // Keyboard navigation & accessibility handlers (Section 37)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        handleSearchSubmit(query);
      }
    }
  };

  const handleSuggestionClick = (item: SuggestionItem) => {
    saveSearchQuery(item.text);
    onClose();

    // Route matching rules (Section 30)
    if (item.type === 'course') {
      navigate(`/courses/${item.id}`);
    } else if (item.type === 'lab') {
      navigate(`/labs/${item.id}`);
    } else if (item.type === 'roadmap') {
      navigate(`/learn-store?tab=roadmaps`);
    } else if (item.type === 'ai_knowledge') {
      // Trigger AI Trainer bubble directly
      onClose();
      const chatToggle = document.getElementById('ai-trainer-toggle-btn');
      if (chatToggle) {
        chatToggle.click();
      }
    } else {
      navigate(`/search?q=${encodeURIComponent(item.text)}`);
    }
  };

  // Maps result types to icons
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen size={14} className="text-blue-400" />;
      case 'lab': return <Cpu size={14} className="text-emerald-400" />;
      case 'roadmap': return <Map size={14} className="text-sky-400" />;
      case 'ai_knowledge': return <Sparkles size={14} className="text-indigo-400" />;
      default: return <HelpCircle size={14} className="text-slate-400" />;
    }
  };

  const handleAskAITrainer = () => {
    onClose();
    const chatToggle = document.getElementById('ai-trainer-toggle-btn');
    if (chatToggle) {
      chatToggle.click();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-10 lg:p-20 overflow-y-auto"
          onKeyDown={handleKeyDown}
        >
          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="w-full max-w-3xl bg-slate-900/90 border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header Row */}
            <div className="p-4 border-b border-slate-800/50 flex items-center gap-3">
              <Search className="text-slate-400 w-5 h-5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, lessons, labs, roadmaps or ask AI..."
                className="flex-1 bg-transparent border-none text-white text-base placeholder-slate-500 focus:outline-none"
              />
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-slate-950 border border-slate-800 text-slate-500 font-mono rounded">ESC</span>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                title="Close Search Overlay"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Tabs Section (Section 3) */}
            <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/20 flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dynamic Results & Suggestions Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
              {query.trim().length > 0 ? (
                // SEARCHING STATE: Show live suggestions
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">SUGGESTIONS</p>
                    {loading && <span className="text-[10px] text-emerald-400 animate-pulse">Searching...</span>}
                  </div>

                  {suggestions.length > 0 ? (
                    <div className="space-y-1">
                      {suggestions.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSuggestionClick(item)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                            idx === activeIndex
                              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                              : 'bg-slate-950/20 border-slate-800/40 hover:border-slate-700/50 hover:bg-slate-800/30 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {getTypeIcon(item.type)}
                            <span className="text-xs font-semibold">{item.text}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/35 uppercase font-mono tracking-wider">
                              {item.type}
                            </span>
                            <ArrowRight size={12} className="text-slate-500" />
                          </div>
                        </div>
                      ))}

                      {/* Unified Ask AI integration row (Section 13 / 14) */}
                      <div
                        onClick={() => handleAskAITrainer()}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-900/10 to-sky-900/10 border border-indigo-500/20 hover:border-indigo-500/40 hover:from-indigo-900/20 text-indigo-300 cursor-pointer mt-4"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles size={14} className="text-indigo-400 animate-pulse" />
                          <span className="text-xs font-bold">Ask AI Trainer about "{query}"</span>
                        </div>
                        <ArrowRight size={12} className="text-indigo-400" />
                      </div>
                    </div>
                  ) : (
                    !loading && (
                      <div className="py-8 text-center text-slate-500 text-xs">
                        No immediate suggestions matching "{query}". Press <strong>Enter</strong> for full relational search.
                      </div>
                    )
                  )}
                </div>
              ) : (
                // IDLE STATE: Show Recent Searches & Popular Topics (Section 8 / 9)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                  {/* Recent Searches (Section 8) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                        <Clock size={11} className="text-slate-400" />
                        RECENT SEARCH HISTORY
                      </p>
                      {recentSearches.length > 0 && (
                        <button
                          onClick={clearAllRecent}
                          className="text-[9px] font-bold text-red-400 hover:text-red-300 transition cursor-pointer"
                        >
                          CLEAR ALL
                        </button>
                      )}
                    </div>

                    {recentSearches.length > 0 ? (
                      <div className="space-y-1">
                        {recentSearches.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSearchSubmit(item)}
                            className="w-full flex items-center justify-between px-3 py-2 bg-slate-950/20 hover:bg-slate-800/40 border border-slate-800/40 hover:border-slate-700/50 rounded-xl cursor-pointer text-xs text-slate-300"
                          >
                            <span>{item}</span>
                            <button
                              onClick={(e) => clearRecentItem(e, item)}
                              className="p-1 text-slate-500 hover:text-red-400 transition cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-slate-500 text-xs italic">
                        No search history recorded. Start typing to search LearnerPedia.
                      </div>
                    )}
                  </div>

                  {/* Popular Suggested Searches (Section 9) */}
                  <div className="space-y-3 pt-6 md:pt-0 md:pl-6">
                    <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                      <Sparkles size={11} className="text-emerald-400" />
                      POPULAR SUGGESTED TOPICS
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {STATIC_POPULAR.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => handleSearchSubmit(chip)}
                          className="px-3 py-1.5 bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/10 text-slate-300 hover:text-emerald-400 text-xs rounded-xl transition-all duration-200 cursor-pointer"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Keyboard shortcuts footer */}
            <div className="p-3 bg-slate-950/50 border-t border-slate-800/30 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Command size={10} />
                <span>Press <strong>Enter</strong> to search globally</span>
              </span>
              <span>Use <strong>↑ ↓</strong> arrows to navigate</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
