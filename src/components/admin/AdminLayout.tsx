import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import {
  LayoutDashboard,
  Users,
  LineChart,
  BookOpen,
  FileText,
  HelpCircle,
  Flag,
  Cpu,
  FileCode,
  Trophy,
  BarChart2,
  Zap,
  ShoppingBag,
  Tag,
  Gift,
  Award,
  ToggleLeft,
  Bell,
  ShieldAlert,
  FileDown,
  Settings,
  Menu,
  X,
  GraduationCap,
  ExternalLink,
  LogOut,
  Coins,
  CheckCircle2
} from 'lucide-react';

export type AdminTab = 
  | 'overview' 
  | 'users' 
  | 'courses' 
  | 'lessons' 
  | 'labs'
  | 'questions' 
  | 'checkpoints' 
  | 'simulations' 
  | 'competitions' 
  | 'leaderboards' 
  | 'learning-points' 
  | 'xp-streaks' 
  | 'cheat-sheets' 
  | 'store' 
  | 'discounts' 
  | 'rewards' 
  | 'certificates' 
  | 'features' 
  | 'notifications' 
  | 'audit-logs' 
  | 'reports' 
  | 'analytics'
  | 'settings'
  | 'ai-kb';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const storedAdminUser = localStorage.getItem('admin_user') ? JSON.parse(localStorage.getItem('admin_user')!) : null;
  const adminDisplayName = storedAdminUser?.name || userProfile?.name || 'Administrator';
  const adminDisplayEmail = storedAdminUser?.email || userProfile?.email || 'admin@gmail.com';

  const handleAdminLogout = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
    } catch (e) {
      console.warn('Logout API notification notice:', e);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      sessionStorage.removeItem('admin_token');
      await logout();
      navigate('/admin/login');
    }
  };

  const menuSections = [
    {
      title: 'CORE PLATFORM',
      items: [
        { id: 'overview' as AdminTab, label: 'Overview Dashboard', icon: LayoutDashboard, badge: 'Live' },
        { id: 'users' as AdminTab, label: 'User Management', icon: Users },
        { id: 'analytics' as AdminTab, label: 'AI Analytics & Insights', icon: LineChart, badge: 'AI' },
      ]
    },
    {
      title: 'CURRICULAR CONTENT',
      items: [
        { id: 'courses' as AdminTab, label: 'Courses Catalog', icon: BookOpen },
        { id: 'lessons' as AdminTab, label: 'Lessons', icon: FileText },
        { id: 'labs' as AdminTab, label: 'Universal Labs', icon: Cpu, badge: 'New' },
        { id: 'questions' as AdminTab, label: 'Question Bank', icon: HelpCircle },
        { id: 'checkpoints' as AdminTab, label: 'Hidden Checkpoints', icon: Flag },
        { id: 'simulations' as AdminTab, label: 'Network Simulations', icon: Cpu },
        { id: 'cheat-sheets' as AdminTab, label: 'Cheat Sheets', icon: FileCode },
        { id: 'ai-kb' as AdminTab, label: 'AI Knowledge Base', icon: Cpu, badge: 'AI' },
      ]
    },
    {
      title: 'GAMIFICATION & ECONOMY',
      items: [
        { id: 'competitions' as AdminTab, label: 'Competitions', icon: Trophy },
        { id: 'leaderboards' as AdminTab, label: 'Leaderboard Control', icon: BarChart2 },
        { id: 'learning-points' as AdminTab, label: 'Learning Points (LP)', icon: Coins },
        { id: 'xp-streaks' as AdminTab, label: 'XP & Streaks', icon: Zap },
        { id: 'store' as AdminTab, label: 'Store & Products', icon: ShoppingBag },
        { id: 'discounts' as AdminTab, label: 'Discount Codes', icon: Tag },
        { id: 'rewards' as AdminTab, label: 'Reward Catalogue', icon: Gift },
        { id: 'certificates' as AdminTab, label: 'Certificate Manager', icon: Award },
      ]
    },
    {
      title: 'SYSTEM CONTROL',
      items: [
        { id: 'features' as AdminTab, label: 'Feature Toggles', icon: ToggleLeft },
        { id: 'notifications' as AdminTab, label: 'Broadcast Notifications', icon: Bell },
        { id: 'audit-logs' as AdminTab, label: 'Audit Trail Logs', icon: ShieldAlert },
        { id: 'reports' as AdminTab, label: 'Data Reports & Export', icon: FileDown },
        { id: 'settings' as AdminTab, label: 'System Settings', icon: Settings },
      ]
    }
  ];

  const handleTabClick = (id: AdminTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation Bar */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50 transition-colors duration-200">
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Sidebar Toggle (Desktop) */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2.5">
            <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">LearnerPedia</span>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 rounded-full uppercase tracking-wider">
                Admin Control Center
              </span>
            </div>
          </div>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          <div className="hidden lg:flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Firebase Engine Online</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition"
          >
            <span>Student App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{adminDisplayName}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{adminDisplayEmail}</p>
            </div>
            <button
              onClick={handleAdminLogout}
              className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 border border-red-500/20 rounded-lg transition flex items-center space-x-1 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Admin Navigation Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto p-4 shrink-0 transition-all duration-200
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${!sidebarOpen && 'md:hidden'}
        `}>
          <div className="space-y-6">
            {menuSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase px-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6 space-y-1 text-xs text-slate-500 text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-400">LearnerPedia Admin v2.5</p>
            <p className="text-[10px]">Role: System Administrator</p>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  );
};

