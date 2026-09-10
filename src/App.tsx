import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { MentorProvider } from './contexts/MentorContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { LearningModulePage } from './pages/LearningModulePage';
import { QuizPage } from './pages/QuizPage';
import { SimulationPage } from './pages/SimulationPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { CompetitionPage } from './pages/CompetitionPage';
import { StorePage } from './pages/StorePage';
import { LearnStorePage } from './pages/LearnStorePage';
import { LabsPage } from './pages/LabsPage';
import { LabDetailPage } from './pages/LabDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AdminRoute } from './components/AdminRoute';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AIMentorWidget } from './components/AIMentorWidget';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <MentorProvider>
            <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
              <Routes>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                } />
                <Route path="*" element={
                  <>
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/learn-store" element={<LearnStorePage />} />
                        <Route path="/labs" element={<LabsPage />} />
                        <Route path="/labs/:labId" element={<LabDetailPage />} />
                        <Route path="/courses/:courseId" element={<LearnStorePage />} />
                        <Route path="/subjects" element={<LearnStorePage />} />
                        <Route path="/store" element={<LearnStorePage />} />
                        <Route path="/learn/:id" element={<LearningModulePage />} />
                        <Route path="/quiz/:id" element={<QuizPage />} />
                        <Route path="/simulation" element={<SimulationPage />} />
                        <Route path="/analysis" element={<AnalysisPage />} />
                        <Route path="/competition" element={<CompetitionPage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                    <AIMentorWidget />
                  </>
                } />
              </Routes>
            </div>
          </MentorProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
