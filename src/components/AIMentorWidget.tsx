import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useMentor } from '../contexts/MentorContext';
import { MentorMode } from '../types/mentor';
import { 
  Bot, Sparkles, MessageSquare, X, Send, Volume2, VolumeX, 
  RotateCcw, Mic, MicOff, CheckCircle2, XCircle, ChevronRight, 
  Flame, BookOpen, Wrench, GraduationCap, HelpCircle, Check, Copy,
  ArrowRight, ShieldAlert, Globe, Radio
} from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  "English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", 
  "Bengali", "Marathi", "Gujarati", "Punjabi", "Urdu", "Spanish", 
  "French", "German", "Japanese", "Korean", "Chinese"
];

const MENTOR_MODES: { id: MentorMode; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'socratic', label: 'Socratic Guide', icon: <HelpCircle size={13} />, desc: 'Guides with thoughtful questions step-by-step' },
  { id: 'coach', label: 'Progress Coach', icon: <Flame size={13} />, desc: 'Motivates, tracks streaks & goals' },
  { id: 'explainer', label: 'Concept Explainer', icon: <BookOpen size={13} />, desc: 'Deep-dive visual breakdowns & analogies' },
  { id: 'practice', label: 'Practice Partner', icon: <GraduationCap size={13} />, desc: 'Interactive quizzes, math drills & recall' },
  { id: 'troubleshooter', label: 'Lab Debugger', icon: <Wrench size={13} />, desc: 'Troubleshoots circuits & network configs' }
];

export const AIMentorWidget: React.FC = () => {
  const { currentUser } = useAuth();
  const {
    isMentorOpen,
    setIsMentorOpen,
    openMentor,
    closeMentor,
    mentorState,
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
    clearConversation,
    speakText,
    stopSpeaking,
    isSpeaking,
    isListening,
    setIsListening
  } = useMentor();

  const [input, setInput] = useState('');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (chatEndRef.current && isMentorOpen) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isMentorOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isMentorOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isMentorOpen]);

  // Handle Speech Recognition (STT)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. You can type your questions directly!");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    const langLocales: Record<string, string> = {
      English: 'en-US', Hindi: 'hi-IN', Telugu: 'te-IN', Tamil: 'ta-IN',
      Spanish: 'es-ES', French: 'fr-FR', German: 'de-DE', Japanese: 'ja-JP'
    };
    recognition.lang = langLocales[preferredLanguage] || 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      setIsListening(false);
      sendMessage(speechToText);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput('');
    sendMessage(text);
  };

  const copyFormulaText = (formula: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <>
      {/* 1. NON-INTRUSIVE PROACTIVE INTERVENTION TOAST */}
      <AnimatePresence>
        {proactiveAlert && !isMentorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 max-w-sm w-full bg-white dark:bg-[#0e1626] border border-indigo-200 dark:border-indigo-900/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-300 tracking-wide">
                    {proactiveAlert.title}
                  </h4>
                  <button
                    onClick={dismissProactiveAlert}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                    title="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {proactiveAlert.message}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const prompt = proactiveAlert.actionPrompt;
                      dismissProactiveAlert();
                      openMentor(prompt);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Explore with Mentor</span>
                    <ChevronRight size={12} />
                  </button>
                  <button
                    onClick={dismissProactiveAlert}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FLOATING LAUNCHER COMPANION BUTTON */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <AnimatePresence>
          {!isMentorOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#0c1322]/90 border border-indigo-200 dark:border-indigo-950/80 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => openMentor()}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>AI Mentor Online</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => (isMentorOpen ? closeMentor() : openMentor())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-all duration-300 cursor-pointer ${
            isMentorOpen
              ? 'bg-slate-800 text-white dark:bg-slate-700'
              : 'bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 text-white shadow-indigo-600/30'
          }`}
          title="Open AI Mentor"
          aria-label="Open AI Mentor"
        >
          {isMentorOpen ? (
            <X size={24} />
          ) : (
            <>
              {/* Dynamic Animated Avatar Orb */}
              <div className="relative flex items-center justify-center">
                <Bot size={26} />
                {mentorState === 'thinking' && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                )}
                {mentorState === 'speaking' && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-400"></span>
                  </span>
                )}
                {mentorState === 'proud' && (
                  <span className="absolute -top-1.5 -right-1.5 text-xs">✨</span>
                )}
              </div>
            </>
          )}
        </motion.button>
      </div>

      {/* 3. EXPANDABLE AI MENTOR WORKSPACE PANEL */}
      <AnimatePresence>
        {isMentorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex flex-col w-[94vw] sm:w-[480px] md:w-[520px] h-[82vh] max-h-[720px] bg-white dark:bg-[#090d16] border border-slate-200 dark:border-[#192338] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex flex-col border-b border-slate-200 dark:border-[#192338] bg-slate-50/80 dark:bg-[#0c121f]/90 px-4 py-3.5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                {/* Mentor Brand & Emotional Avatar */}
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20">
                    <Bot size={22} />
                    {/* Live State Aura */}
                    {isSpeaking && (
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                        LearnerPedia AI Mentor
                      </h3>
                      <span className="rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 px-2 py-0.5">
                        Pro Active
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      <span>
                        {mentorState === 'thinking' ? 'Analyzing concept...' :
                         mentorState === 'speaking' ? 'Guiding verbally...' :
                         mentorState === 'proud' ? 'Cheering your progress!' :
                         'Ready to guide you'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-1">
                  {/* Language Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowLangDropdown(!showLangDropdown)}
                      className="flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-[#121929] hover:bg-slate-200 dark:hover:bg-[#1a243a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 text-xs font-semibold transition-colors cursor-pointer"
                      title="Select Language"
                    >
                      <Globe size={13} className="text-indigo-500" />
                      <span className="max-w-[65px] truncate">{preferredLanguage}</span>
                    </button>

                    {showLangDropdown && (
                      <div className="absolute right-0 top-full mt-1.5 z-30 w-44 max-h-56 overflow-y-auto bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 text-xs">
                        <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/60 mb-1">
                          Select Mentor Language
                        </div>
                        {SUPPORTED_LANGUAGES.map(lang => (
                          <button
                            key={lang}
                            onClick={() => {
                              setPreferredLanguage(lang);
                              setShowLangDropdown(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                              preferredLanguage === lang
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#151e30]'
                            }`}
                          >
                            <span>{lang}</span>
                            {preferredLanguage === lang && <Check size={13} />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Voice Toggle */}
                  <button
                    onClick={() => {
                      if (voiceEnabled) {
                        stopSpeaking();
                        setVoiceEnabled(false);
                      } else {
                        setVoiceEnabled(true);
                      }
                    }}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      voiceEnabled
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                        : 'bg-slate-100 dark:bg-[#121929] border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                    title={voiceEnabled ? 'Mute Mentor Voice' : 'Enable Natural Voice Narration'}
                  >
                    {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </button>

                  {/* Reset / Clear */}
                  <button
                    onClick={clearConversation}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#121929] hover:bg-slate-200 dark:hover:bg-[#1a243a] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title="Clear Conversation History"
                  >
                    <RotateCcw size={15} />
                  </button>

                  {/* Close */}
                  <button
                    onClick={closeMentor}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#121929] hover:bg-slate-200 dark:hover:bg-[#1a243a] border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title="Close Panel"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Mode Switcher Strip */}
              <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                {MENTOR_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setMentorMode(mode.id)}
                    className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      mentorMode === mode.id
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-[#121929] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-[#18233a]'
                    }`}
                    title={mode.desc}
                  >
                    {mode.icon}
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Conversation Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40 dark:bg-[#070a12]/50">
              {/* Guest notice if not signed in */}
              {!currentUser && (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="text-amber-800 dark:text-amber-300">
                      Sign in to enable long-term memory, streak tracking, and personalized quiz reviews!
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-xs"
                  >
                    Log In
                  </Link>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'student'
                        ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/10 rounded-tr-xs'
                        : 'bg-white dark:bg-[#0f172a] text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-[#1e293b]/70 shadow-xs rounded-tl-xs'
                    }`}
                  >
                    {/* Message Text with Simple Markdown Formatting */}
                    <div className="space-y-2 whitespace-pre-wrap">
                      {msg.text.split('\n\n').map((paragraph, pIdx) => {
                        // Bold markdown parser
                        const formatted = paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIdx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={partIdx} className="font-bold text-indigo-600 dark:text-indigo-400">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        });

                        return (
                          <p key={pIdx} className="leading-relaxed">
                            {formatted}
                          </p>
                        );
                      })}
                    </div>

                    {/* Rich Interactive Card 1: Practice Question Card */}
                    {msg.practiceCard && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-950/70 text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                            <GraduationCap size={14} />
                            <span>Quick Mastery Check</span>
                          </span>
                          {msg.practiceCard.topic && (
                            <span className="text-[10px] text-slate-400">
                              {msg.practiceCard.topic}
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-slate-900 dark:text-white mb-2.5">
                          {msg.practiceCard.question}
                        </p>

                        <div className="space-y-1.5">
                          {msg.practiceCard.options.map((opt, optIdx) => {
                            const isSelected = selectedQuizAnswers[msg.id] === optIdx;
                            const isAnswered = selectedQuizAnswers[msg.id] !== undefined;
                            const isCorrect = optIdx === msg.practiceCard?.correctIndex;

                            let btnStyle = 'bg-white dark:bg-[#111927] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#18233a]';
                            if (isAnswered) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-700 text-rose-800 dark:text-rose-300 font-bold';
                              } else {
                                btnStyle = 'bg-slate-50 dark:bg-[#0c121e] border-slate-200 dark:border-slate-800/50 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isAnswered}
                                onClick={() => {
                                  setSelectedQuizAnswers(prev => ({ ...prev, [msg.id]: optIdx }));
                                }}
                                className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between text-xs cursor-pointer ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isAnswered && isCorrect && <CheckCircle2 size={14} className="text-emerald-500" />}
                                {isAnswered && isSelected && !isCorrect && <XCircle size={14} className="text-rose-500" />}
                              </button>
                            );
                          })}
                        </div>

                        {selectedQuizAnswers[msg.id] !== undefined && (
                          <div className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                            <strong>Explanation:</strong> {msg.practiceCard.explanation}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Rich Interactive Card 2: Formula Card */}
                    {msg.formulaCard && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-200 dark:border-indigo-950/70 text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            📐 {msg.formulaCard.title}
                          </span>
                          <button
                            onClick={() => copyFormulaText(msg.formulaCard!.formula)}
                            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          >
                            {copiedFormula === msg.formulaCard.formula ? (
                              <span className="text-emerald-500 font-bold flex items-center gap-1">
                                <Check size={11} /> Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Copy size={11} /> Copy
                              </span>
                            )}
                          </button>
                        </div>
                        <div className="bg-white dark:bg-[#121a2c] p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-indigo-700 dark:text-indigo-300 font-bold text-center">
                          {msg.formulaCard.formula}
                        </div>
                        {msg.formulaCard.example && (
                          <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">Example:</span> {msg.formulaCard.example}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Rich Interactive Card 3: Diagnostic Card */}
                    {msg.diagnosticCard && (
                      <div className="mt-3 p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs">
                        <div className="font-bold text-rose-700 dark:text-rose-400 mb-1">
                          🛠️ Lab Troubleshooting Guide
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mb-2">
                          <strong>Issue:</strong> {msg.diagnosticCard.issue}
                        </p>
                        <div className="bg-white dark:bg-[#111928] p-2.5 rounded-lg border border-rose-200/60 dark:border-rose-900/30 text-[11px] text-slate-600 dark:text-slate-400">
                          <strong>Suggested Action:</strong> {msg.diagnosticCard.suggestedFix}
                        </div>
                      </div>
                    )}

                    {/* Rich Interactive Card 4: Recommended Next Step */}
                    {msg.recommendedStep && (
                      <div className="mt-3 p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-xs flex items-center justify-between">
                        <div>
                          <div className="font-bold text-indigo-900 dark:text-indigo-300">
                            🎯 Next Recommended Step
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                            {msg.recommendedStep.title} ({msg.recommendedStep.reason})
                          </div>
                        </div>
                        <Link
                          to={msg.recommendedStep.link}
                          onClick={closeMentor}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 shadow-xs"
                        >
                          <span>Go</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Follow-up Prompts */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && idx === messages.length - 1 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.suggestedFollowUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => sendMessage(prompt)}
                          className="flex items-center gap-1 text-[11px] font-medium bg-white dark:bg-[#121a2c] hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1 transition-all hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer shadow-xs"
                        >
                          <span>{prompt}</span>
                          <ChevronRight size={10} className="text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs animate-pulse">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#1e293b] rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                        {mentorMode === 'socratic' ? 'Formulating Socratic thought...' : 'Mentor reflecting...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="border-t border-slate-200 dark:border-[#192338] bg-white dark:bg-[#0a0f1b] p-3"
            >
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#101728] border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 transition-colors shadow-inner">
                {/* Speech to text */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-[#18233a]'
                  }`}
                  title={isListening ? 'Stop Listening' : 'Speak to AI Mentor (Speech-to-Text)'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={
                    isListening
                      ? 'Listening to your voice...'
                      : mentorMode === 'socratic'
                      ? 'Ask a question or explain your reasoning...'
                      : 'Ask your personal mentor anything...'
                  }
                  className="flex-1 bg-transparent px-2 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-all shadow-md shadow-indigo-600/20 disabled:cursor-not-allowed cursor-pointer"
                  title="Send Question"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
