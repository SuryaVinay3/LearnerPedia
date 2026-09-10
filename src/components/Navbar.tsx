import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMentor } from '../contexts/MentorContext';
import { AuthModal } from './AuthModal';
import { SearchOverlay } from './SearchOverlay';
import { ThemeToggle } from './ThemeToggle';
import { Search, Shield, Bot } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const { openMentor, isMentorOpen } = useMentor();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isHomeActive = location.pathname === '/' || location.pathname === '/dashboard';
  const isLearningActive = location.pathname === '/learn-store' || location.pathname.startsWith('/learn/');
  const isSimulationActive = location.pathname === '/labs' || location.pathname.startsWith('/labs/') || location.pathname === '/simulation';
  const isKnowledgeCheckActive = location.pathname === '/subjects' || location.pathname.startsWith('/quiz/');
  const isSkillStoreActive = location.pathname === '/store';

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-[#121824]/80 bg-white/95 dark:bg-[#05070a]/95 backdrop-blur-md py-3.5 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform font-black text-base">
                L
              </div>
              <span className="font-sans text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white hidden sm:inline-block">
                LearnerPedia
              </span>
            </Link>

            {/* Universal Search Trigger */}
            <div className="flex items-center">
              {/* Desktop Input Selector */}
              <div
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2.5 w-40 lg:w-48 xl:w-56 px-3 py-1.5 bg-slate-100 dark:bg-[#090d16]/80 hover:bg-slate-200/80 dark:hover:bg-[#0d131f] border border-slate-200 dark:border-[#1e293b]/50 hover:border-slate-300 dark:hover:border-slate-700/60 rounded-xl text-slate-500 dark:text-slate-400 text-xs transition-all cursor-pointer shadow-inner select-none"
              >
                <Search size={13} className="text-slate-500 dark:text-slate-400" />
                <span className="flex-1 text-slate-500 dark:text-slate-400 text-left font-medium">Search...</span>
                <span className="text-[9px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 px-1 rounded shadow-xs">⌘K</span>
              </div>

              {/* Mobile Button Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#090d16]/80 hover:bg-slate-200 dark:hover:bg-[#0d131f] border border-slate-200 dark:border-[#1e293b]/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-xs"
                title="Open Universal Search"
                aria-label="Open Universal Search"
              >
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* Center Pill Navigation Group */}
          <nav className="hidden md:flex items-center bg-slate-100/90 dark:bg-[#0d121c]/80 border border-slate-200/90 dark:border-[#1b2535]/50 rounded-full px-1.5 py-1 text-xs gap-1 shadow-inner">
            <Link
              to="/dashboard"
              className={`rounded-full px-4.5 py-2 font-medium tracking-wide transition-all ${
                isHomeActive
                  ? 'bg-white dark:bg-[#182335] text-indigo-600 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/learn-store"
              className={`rounded-full px-4.5 py-2 font-medium tracking-wide transition-all ${
                isLearningActive
                  ? 'bg-white dark:bg-[#182335] text-indigo-600 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Learning
            </Link>

            <Link
              to="/labs"
              className={`rounded-full px-4.5 py-2 font-medium tracking-wide transition-all ${
                isSimulationActive
                  ? 'bg-white dark:bg-[#182335] text-indigo-600 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Simulation
            </Link>

            <Link
              to="/subjects"
              className={`rounded-full px-4.5 py-2 font-medium tracking-wide transition-all ${
                isKnowledgeCheckActive
                  ? 'bg-white dark:bg-[#182335] text-indigo-600 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Knowledge Check
            </Link>

            <Link
              to="/store"
              className={`rounded-full px-4.5 py-2 font-medium tracking-wide transition-all ${
                isSkillStoreActive
                  ? 'bg-white dark:bg-[#182335] text-indigo-600 dark:text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              Skill Store
            </Link>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* AI Mentor Trigger Button */}
            <button
              onClick={() => openMentor()}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                isMentorOpen
                  ? 'bg-indigo-600 text-white shadow-indigo-600/25 ring-2 ring-indigo-400'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 hover:scale-105'
              }`}
              title="Open AI Mentor"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <Bot size={13} className="text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold">Mentor</span>
            </button>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Admin Portal Button */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-[#0d121c]/90 border border-slate-200 dark:border-[#1b2535] hover:border-indigo-500/50 hover:bg-slate-200/80 dark:hover:bg-[#121927] px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-xs"
              title="Admin Portal"
            >
              <Shield size={13} className="text-indigo-600 dark:text-indigo-400" />
              <span>Admin</span>
            </Link>

            {currentUser && userProfile ? (
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* SP Token Pill */}
                <Link
                  to="/store"
                  className="flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-[#0c1c15] border border-emerald-200 dark:border-[#123122] px-3 sm:px-3.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-[#10b981] transition-transform hover:scale-[1.02] shadow-xs"
                  title="Your SkillPoints Balance"
                >
                  <span className="text-emerald-600 dark:text-[#10b981]">✦</span>
                  <span>{userProfile.learningPoints || 0} SP</span>
                </Link>

                {/* Profile Link */}
                <Link
                  to="/profile"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-extrabold text-sm text-white shadow-md hover:scale-105 transition-transform"
                  title="View Profile"
                >
                  {userProfile.name.charAt(0).toUpperCase()}
                </Link>

                {/* Sign Out */}
                <button
                  onClick={() => logout()}
                  className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95 cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}

      {/* Universal Search Overlay Modal */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

