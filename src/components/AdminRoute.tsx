import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AdminRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const adminToken = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 font-medium">Verifying Administrator Credentials...</p>
        </div>
      </div>
    );
  }

  const isAdmin = 
    Boolean(adminToken) ||
    userProfile?.role === 'admin' || 
    currentUser?.email === 'admin@gmail.com' ||
    currentUser?.email === 'admin@learnerpedia.com' || 
    currentUser?.email === 'suryavinay2608@gmail.com';

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
