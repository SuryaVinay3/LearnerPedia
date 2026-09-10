import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      id="theme-toggle-btn"
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
        isDark
          ? 'bg-[#0d121c]/90 hover:bg-[#151c2c] text-amber-400 border border-[#1b2535] hover:border-amber-400/40 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300/80 hover:border-slate-400 shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="h-4.5 w-4.5 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-4.5 w-4.5 transition-transform duration-200 hover:-rotate-12" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
};
