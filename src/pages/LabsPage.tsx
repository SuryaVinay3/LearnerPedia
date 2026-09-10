import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lab } from '../types';
import { labService } from '../services/labService';
import { 
  FlaskConical, Search, Filter, Award, Zap, Code, Terminal, Database, Network, Shield, Cpu, Layers, Sparkles, ChevronRight, Play 
} from 'lucide-react';

export const LabsPage: React.FC = () => {
  const navigate = useNavigate();
  const [labs, setLabs] = useState<Lab[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const categories = [
    'All',
    'Programming Labs',
    'Web Development Labs',
    'Database Labs',
    'Computer Networks Labs',
    'Cybersecurity Labs',
    'Data Structures Labs',
    'Algorithm Labs',
    'Operating Systems Labs',
    'Cloud Computing Labs',
    'DevOps Labs',
    'AI / Machine Learning Labs',
    'Data Science Labs',
    'Electronics & Hardware Labs',
    'Embedded Systems & IoT Labs',
    'Computer Hardware & Architecture Labs',
    'Network Hardware Labs',
    'PCB & Circuit Design Labs',
    'Robotics Labs',
    'Chemistry Labs',
    'Physics Labs',
    'Electrical Engineering Labs',
    'Mechanical Engineering Labs',
    'Control Systems Labs',
    'Engineering Simulations'
  ];

  useEffect(() => {
    loadLabs();
  }, [selectedCategory, searchQuery]);

  const loadLabs = async () => {
    setLoading(true);
    try {
      const data = await labService.getLabs(selectedCategory, searchQuery);
      setLabs(data);
    } catch (err) {
      console.error('Failed to load labs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Labs': return <Code className="h-4 w-4 text-cyan-400" />;
      case 'Web Development Labs': return <Terminal className="h-4 w-4 text-emerald-400" />;
      case 'Database Labs': return <Database className="h-4 w-4 text-indigo-400" />;
      case 'Computer Networks Labs': return <Network className="h-4 w-4 text-cyan-400" />;
      case 'Cybersecurity Labs': return <Shield className="h-4 w-4 text-rose-400" />;
      case 'Data Structures Labs': return <Layers className="h-4 w-4 text-amber-400" />;
      case 'Algorithm Labs': return <Cpu className="h-4 w-4 text-purple-400" />;
      case 'Electronics & Hardware Labs': return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'PCB & Circuit Design Labs': return <Layers className="h-4 w-4 text-orange-400" />;
      case 'Embedded Systems & IoT Labs': return <Cpu className="h-4 w-4 text-emerald-400" />;
      case 'Robotics Labs': return <Cpu className="h-4 w-4 text-rose-400" />;
      case 'Chemistry Labs': return <FlaskConical className="h-4 w-4 text-pink-400" />;
      case 'Physics Labs': return <Zap className="h-4 w-4 text-violet-400" />;
      case 'Electrical Engineering Labs': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'Mechanical Engineering Labs': return <Layers className="h-4 w-4 text-teal-400" />;
      case 'Control Systems Labs': return <Cpu className="h-4 w-4 text-indigo-400" />;
      default: return <FlaskConical className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <FlaskConical className="h-3.5 w-3.5" /> Simulation & Experimentation Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learning Labs
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Learn by doing. Experiment with real code, inspect database queries, analyze packet transmissions, and visualize algorithm state transitions in real time.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search labs by concept, language, or title..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Labs Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : labs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-3">
          <FlaskConical className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">No Labs Found</h3>
          <p className="text-xs text-slate-500">Try adjusting your filter or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab) => (
            <div
              key={lab.id}
              className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold text-slate-300">
                    {getCategoryIcon(lab.category)}
                    {lab.category}
                  </span>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    lab.difficulty === 'Beginner'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                      : lab.difficulty === 'Intermediate'
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                      : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                  }`}>
                    {lab.difficulty}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {lab.description}
                  </p>
                </div>

                {/* Objectives */}
                {lab.objectives && lab.objectives.length > 0 && (
                  <ul className="space-y-1 pt-1 border-t border-slate-800/60">
                    {lab.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span className="truncate">{obj}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom Row: Rewards & Launch Button */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-bold font-mono">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Zap className="h-3.5 w-3.5" />
                    +{lab.xpReward} XP
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Award className="h-3.5 w-3.5" />
                    +{lab.lpReward} LP
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/labs/${lab.id}`)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-500/20 transition-all"
                >
                  Launch Lab
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
