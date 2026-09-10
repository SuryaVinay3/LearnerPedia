import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { loginWithEmail, registerWithEmail, logoutFirebase } from '../lib/auth';
import { UserProfile } from '../types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserProfile = async (user: User) => {
    const isAdminEmail = user.email === 'admin@learnerpedia.com' || user.email === 'suryavinay2608@gmail.com';

    // 1. Try fetching profile via backend API using Auth ID Token (uses Admin SDK, bypasses client rule issues)
    try {
      const token = await user.getIdToken(true);
      const res = await fetch('/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const role = isAdminEmail ? 'admin' : (data.role || 'student');
        const profile: UserProfile = {
          ...data,
          role,
          uid: user.uid,
          email: user.email || data.email || '',
          name: data.name || user.displayName || (isAdminEmail ? 'System Admin' : 'Learner')
        };
        setUserProfile(profile);
        return;
      }
    } catch (apiErr) {
      console.warn('API profile fetch attempt notice:', apiErr);
    }

    // 2. Client Firestore Fallback
    const userRef = doc(db, 'users', user.uid);
    try {
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        if (isAdminEmail && data.role !== 'admin') {
          const updated = { ...data, role: 'admin' as const };
          await setDoc(userRef, updated, { merge: true });
          setUserProfile(updated);
        } else {
          setUserProfile(data);
        }
      } else {
        // Create initial default user doc in Firestore
        const initialRole = isAdminEmail ? 'admin' : 'student';
        const newProfile: UserProfile = {
          uid: user.uid,
          name: user.displayName || (isAdminEmail ? 'System Admin' : 'Learner'),
          email: user.email || '',
          role: initialRole,
          accountStatus: 'active',
          xp: 120,
          learningPoints: 100,
          level: 'Explorer',
          levelNumber: 1,
          streak: 1,
          badges: ['badge-first-step'],
          completedLessons: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(userRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (err) {
      // Fallback local state profile to prevent app crash or stuck state
      const initialRole = isAdminEmail ? 'admin' : 'student';
      setUserProfile({
        uid: user.uid,
        name: user.displayName || (isAdminEmail ? 'System Admin' : 'Learner'),
        email: user.email || '',
        role: initialRole,
        accountStatus: 'active',
        xp: 100,
        learningPoints: 100,
        level: 'Explorer',
        levelNumber: 1,
        streak: 1,
        badges: ['badge-welcome'],
        completedLessons: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await fetchUserProfile(auth.currentUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await loginWithEmail(email, pass);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
      const user = await registerWithEmail(email, pass, name);
      const userRef = doc(db, 'users', user.uid);
      const newProfile: UserProfile = {
        uid: user.uid,
        name: name,
        email: email,
        role: 'student', // Default registration role student
        xp: 100,
        learningPoints: 100,
        level: 'Explorer',
        levelNumber: 1,
        streak: 1,
        badges: ['badge-welcome'],
        completedLessons: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, newProfile);
      setUserProfile(newProfile);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutFirebase();
    setCurrentUser(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
