import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { MentorMessage, MentorMode, MentorState, MentorStudentContext, ProactiveAlert } from '../types/mentor';
import { sendMentorMessage, fetchProactiveAlert, fetchMentorHistory, clearMentorHistory } from '../services/aiMentorService';

interface MentorContextType {
  isMentorOpen: boolean;
  setIsMentorOpen: (open: boolean) => void;
  openMentor: (initialPrompt?: string, mode?: MentorMode) => void;
  closeMentor: () => void;
  mentorState: MentorState;
  setMentorState: (state: MentorState) => void;
  mentorMode: MentorMode;
  setMentorMode: (mode: MentorMode) => void;
  preferredLanguage: string;
  setPreferredLanguage: (lang: string) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  messages: MentorMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  proactiveAlert: ProactiveAlert | null;
  dismissProactiveAlert: () => void;
  triggerProactiveEvent: (alert: Omit<ProactiveAlert, 'id' | 'timestamp'>) => void;
  clearConversation: () => Promise<void>;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

const MentorContext = createContext<MentorContextType | undefined>(undefined);

const WELCOME_MESSAGES: Record<MentorMode, string> = {
  socratic: "Hello there! I'm your Socratic AI Mentor. Instead of just handing out rote answers, I'll guide you step-by-step with intuitive questions so you truly master every concept. What are you exploring right now?",
  coach: "Welcome back! I'm here as your learning coach. Let's look at your progress, maintain your learning streak, and crush your next milestone! Where should we focus today?",
  explainer: "Greetings! I'm your deep-dive concept explainer. Whether it's subnet masking, graph algorithms, or packet routing, I'll break it down with clear mental models and real-world analogies. What would you like explained?",
  practice: "Ready for active recall? I'm your practice sparring partner! I'll generate interactive questions, test your mental math, and diagnose tricky edge cases. Ready for a challenge?",
  troubleshooter: "Lab debugging mode active! Got a broken network packet, incorrect gateway route, or incomplete circuit? Tell me what you're trying to achieve and let's troubleshoot together!"
};

export const MentorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();

  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [mentorState, setMentorState] = useState<MentorState>('idle');
  const [mentorMode, setMentorMode] = useState<MentorMode>('socratic');
  const [preferredLanguage, setPreferredLanguage] = useState<string>(() => {
    return localStorage.getItem('learnerpedia_mentor_lang') || 'English';
  });
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    return localStorage.getItem('learnerpedia_mentor_voice') === 'true';
  });
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [proactiveAlert, setProactiveAlert] = useState<ProactiveAlert | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('learnerpedia_mentor_lang', preferredLanguage);
  }, [preferredLanguage]);

  useEffect(() => {
    localStorage.setItem('learnerpedia_mentor_voice', String(voiceEnabled));
  }, [voiceEnabled]);

  // Load initial welcome message or history
  useEffect(() => {
    if (currentUser) {
      fetchMentorHistory().then(history => {
        if (history && history.length > 0) {
          setMessages(history);
        } else {
          setMessages([
            {
              id: 'init-1',
              sender: 'mentor',
              text: WELCOME_MESSAGES[mentorMode],
              timestamp: new Date().toISOString(),
              mode: mentorMode,
              mentorState: 'speaking',
              suggestedFollowUps: [
                "Explain CIDR subnetting visually",
                "Give me a practice question",
                "Analyze my weak areas",
                "Troubleshoot my network lab"
              ]
            }
          ]);
        }
      });
    } else {
      setMessages([
        {
          id: 'init-guest',
          sender: 'mentor',
          text: "Hello! I am your LearnerPedia AI Mentor. I accompany you as you learn, practice quizzes, and run labs. Ask me anything or log in to unlock personalized memory and progress coaching!",
          timestamp: new Date().toISOString(),
          mode: 'socratic',
          mentorState: 'idle',
          suggestedFollowUps: [
            "How does subnetting work?",
            "What are the 7 OSI layers?",
            "How do I earn SkillPoints?",
            "Give me a quick networking challenge"
          ]
        }
      ]);
    }
  }, [currentUser]);

  // Handle Text-To-Speech
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (mentorState === 'speaking') {
        setMentorState('idle');
      }
    }
  }, [mentorState]);

  const speakText = useCallback((text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    // Clean markdown
    const clean = text
      .replace(/[#*`_>~]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .trim();

    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const langLocales: Record<string, string> = {
      English: 'en-US', Hindi: 'hi-IN', Telugu: 'te-IN', Tamil: 'ta-IN',
      Kannada: 'kn-IN', Malayalam: 'ml-IN', Bengali: 'bn-IN', Marathi: 'mr-IN',
      Gujarati: 'gu-IN', Punjabi: 'pa-IN', Urdu: 'ur-PK', Spanish: 'es-ES',
      French: 'fr-FR', German: 'de-DE', Japanese: 'ja-JP', Korean: 'ko-KR',
      Chinese: 'zh-CN'
    };

    utterance.lang = langLocales[preferredLanguage] || 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setMentorState('speaking');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setMentorState('idle');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setMentorState('idle');
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled, preferredLanguage]);

  // Context builder
  const buildCurrentContext = useCallback((): MentorStudentContext => {
    return {
      pagePath: location.pathname,
      pageTitle: document.title,
      preferredLanguage,
      studentName: userProfile?.name || 'Learner',
      studentLevel: (userProfile as any)?.level || 'Explorer',
      xp: userProfile?.xp || 0,
      streak: userProfile?.streak || 0,
      mode: mentorMode
    };
  }, [location.pathname, preferredLanguage, userProfile, mentorMode]);

  // Send message
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: MentorMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'student',
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setMentorState('thinking');

    try {
      const context = buildCurrentContext();
      const response = await sendMentorMessage(text.trim(), context, mentorMode, preferredLanguage);

      const mentorMsg: MentorMessage = {
        id: `mentor-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        sender: 'mentor',
        text: response.reply,
        timestamp: new Date().toISOString(),
        mode: mentorMode,
        mentorState: response.mentorState || 'speaking',
        practiceCard: response.practiceCard,
        formulaCard: response.formulaCard,
        diagnosticCard: response.diagnosticCard,
        recommendedStep: response.recommendedStep,
        suggestedFollowUps: response.suggestedFollowUps || []
      };

      setMessages(prev => [...prev, mentorMsg]);
      setMentorState(response.mentorState || 'idle');

      if (voiceEnabled) {
        speakText(response.reply);
      }
    } catch (err: any) {
      console.error('Mentor chat error:', err);
      const errorMsg: MentorMessage = {
        id: `err-${Date.now()}`,
        sender: 'mentor',
        text: "I'm reflecting on that concept. Could you rephrase your question or let me know what specific step you're working through?",
        timestamp: new Date().toISOString(),
        mentorState: 'encouraging',
        suggestedFollowUps: [
          "Explain the basics again",
          "Give me an example",
          "Show me the formula"
        ]
      };
      setMessages(prev => [...prev, errorMsg]);
      setMentorState('idle');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, buildCurrentContext, mentorMode, preferredLanguage, voiceEnabled, speakText]);

  // Open mentor with optional prompt
  const openMentor = useCallback((initialPrompt?: string, mode?: MentorMode) => {
    setIsMentorOpen(true);
    if (mode) {
      setMentorMode(mode);
    }
    if (initialPrompt) {
      setTimeout(() => {
        sendMessage(initialPrompt);
      }, 100);
    }
  }, [sendMessage]);

  const closeMentor = useCallback(() => {
    setIsMentorOpen(false);
    stopSpeaking();
  }, [stopSpeaking]);

  const dismissProactiveAlert = useCallback(() => {
    setProactiveAlert(null);
  }, []);

  const triggerProactiveEvent = useCallback((alert: Omit<ProactiveAlert, 'id' | 'timestamp'>) => {
    const fullAlert: ProactiveAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setProactiveAlert(fullAlert);
  }, []);

  const clearConversation = useCallback(async () => {
    await clearMentorHistory();
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'mentor',
        text: WELCOME_MESSAGES[mentorMode],
        timestamp: new Date().toISOString(),
        mode: mentorMode,
        mentorState: 'speaking',
        suggestedFollowUps: [
          "Give me a practice challenge",
          "Explain subnet mask bit borrowing",
          "Analyze my progress"
        ]
      }
    ]);
  }, [mentorMode]);

  // Proactive check on route change if user is logged in
  useEffect(() => {
    if (!currentUser) return;

    const timer = setTimeout(() => {
      const context = buildCurrentContext();
      fetchProactiveAlert(context).then(alert => {
        if (alert && !isMentorOpen) {
          setProactiveAlert(alert);
        }
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [location.pathname, currentUser, isMentorOpen, buildCurrentContext]);

  return (
    <MentorContext.Provider
      value={{
        isMentorOpen,
        setIsMentorOpen,
        openMentor,
        closeMentor,
        mentorState,
        setMentorState,
        mentorMode,
        setMentorMode,
        preferredLanguage,
        setPreferredLanguage,
        voiceEnabled,
        setVoiceEnabled,
        messages,
        isLoading,
        sendMessage,
        proactiveAlert,
        dismissProactiveAlert,
        triggerProactiveEvent,
        clearConversation,
        speakText,
        stopSpeaking,
        isSpeaking,
        isListening,
        setIsListening
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export const useMentor = () => {
  const context = useContext(MentorContext);
  if (!context) {
    throw new Error('useMentor must be used within a MentorProvider');
  }
  return context;
};
