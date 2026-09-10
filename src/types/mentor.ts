export type MentorMode = 
  | 'socratic'        // Asks thought-provoking questions, guides step-by-step
  | 'coach'           // Motivating, goal-oriented, focuses on streaks & mastery
  | 'explainer'       // Clear conceptual breakdowns with analogies & diagrams
  | 'practice'        // Quizzes, drills, calculations, and active testing
  | 'troubleshooter'; // Debugs circuit labs, subnet configs, and errors

export type MentorState = 
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'explaining'
  | 'encouraging'
  | 'challenging'
  | 'proud';

export interface PracticeCard {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic?: string;
}

export interface FormulaCard {
  title: string;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  example: string;
  tip?: string;
}

export interface DiagnosticCard {
  issue: string;
  symptom: string;
  suggestedFix: string;
  relatedLabId?: string;
}

export interface RecommendedStep {
  title: string;
  type: 'course' | 'lesson' | 'lab' | 'quiz' | 'store';
  link: string;
  reason: string;
  xpReward?: number;
}

export interface MentorMessage {
  id: string;
  sender: 'student' | 'mentor';
  text: string;
  timestamp: string;
  mode?: MentorMode;
  mentorState?: MentorState;
  practiceCard?: PracticeCard;
  formulaCard?: FormulaCard;
  diagnosticCard?: DiagnosticCard;
  recommendedStep?: RecommendedStep;
  suggestedFollowUps?: string[];
  isProactive?: boolean;
}

export interface MentorStudentContext {
  pagePath: string;
  pageTitle?: string;
  courseId?: string;
  lessonId?: string;
  labId?: string;
  subject?: string;
  lastQuizErrors?: {
    questionText: string;
    selectedAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
  lastSimulationErrors?: string[];
  preferredLanguage?: string;
  studentName?: string;
  studentLevel?: string;
  xp?: number;
  streak?: number;
  mode?: MentorMode;
}

export interface ProactiveAlert {
  id: string;
  title: string;
  message: string;
  triggerType: 'quiz_mistake' | 'simulation_error' | 'streak_milestone' | 'inactivity' | 'recommendation';
  actionPrompt: string;
  timestamp: string;
  contextData?: any;
}
