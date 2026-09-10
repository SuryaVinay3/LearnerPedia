export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'trainer' | 'admin';
  accountStatus?: 'active' | 'suspended' | 'deactivated' | 'archived';
  xp: number;
  learningPoints: number;
  level: string;
  levelNumber: number;
  streak: number;
  badges: string[];
  completedLessons: string[];
  createdAt?: string;
  updatedAt?: string;
  lastActive?: string;
}

export interface Course {
  id: string;
  title: string;
  slug?: string;
  description: string;
  icon?: string;
  category: string;
  domain?: string;
  subcategory?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  totalLessons?: number;
  lpReward?: number;
  xpReward?: number;
  progress?: number;
  status?: 'PUBLISHED' | 'COMING_SOON' | 'DRAFT' | 'ARCHIVED' | 'published' | 'draft' | 'archived' | 'Coming Soon' | 'Published' | 'Draft';
  prerequisites?: string[];
  learningObjectives?: string[];
  skills?: string[];
  instructors?: string[];
  estimatedDuration?: string;
  duration?: string;
  tags?: string[];
  price?: number;
  currency?: string;
  thumbnail?: string;
  certificateEligible?: boolean;
  certificateAvailable?: boolean;
  simulationAvailable?: boolean;
  competitionAvailable?: boolean;
  modulesCount?: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  summary: string;
  content: string;
  keyTakeaways: string[];
  formula?: string;
  checkpointId?: string;
  status?: 'draft' | 'published' | 'archived';
  resources?: { name: string; url: string; type: string }[];
}

export interface QuestionItem {
  id: string;
  type: 'mcq' | 'multi' | 'true_false' | 'scenario' | 'coding' | 'networking' | 'simulation';
  question: string;
  options: string[];
  correctAnswer: string | number | string[];
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  skill: string;
  tags: string[];
  hint: string;
  timeLimit: number;
  xpReward: number;
  lpReward: number;
}

export interface Checkpoint {
  id: string;
  lessonId: string;
  topic?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
  lpReward?: number;
  xpReward?: number;
  skillTested?: string;
  minPerformance?: number;
  rewardRange?: string;
  cooldownSeconds?: number;
  frequency?: string;
}

export type LabType =
  | 'CODE_EXECUTION'
  | 'WEB_PLAYGROUND'
  | 'SQL_PLAYGROUND'
  | 'NETWORK_SIMULATION'
  | 'CYBERSECURITY_SIMULATION'
  | 'ALGORITHM_VISUALIZATION'
  | 'DATA_STRUCTURE_VISUALIZATION'
  | 'CLOUD_SIMULATION'
  | 'DEVOPS_SIMULATION'
  | 'ML_EXPERIMENT'
  | 'DATA_ANALYSIS'
  | 'OS_SIMULATION'
  | 'CONCEPT_SIMULATION'
  | 'DRAG_DROP_SIMULATION'
  | 'CIRCUIT_LOGIC'
  | 'CIRCUIT_ANALOG'
  | 'PCB_LAYOUT'
  | 'MICROCONTROLLER'
  | 'COMP_ASSEMBLY'
  | 'CPU_SIM'
  | 'NETWORK_ROUTER'
  | 'NETWORK_TOPOLOGY'
  | 'IOT_NET'
  | 'ROBOTICS'
  | 'CHEM_LAB'
  | 'CHEM_PH'
  | 'CHEM_TITRATION'
  | 'CHEM_MOLECULAR'
  | 'PHYS_MECHANICS'
  | 'PHYS_ELECTRICAL'
  | 'PHYS_ELECTROMAGNET'
  | 'PHYS_THERMO'
  | 'MECH_MACHINES'
  | 'CONTROL_SYSTEM';

export interface LabTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

export interface Lab {
  id: string;
  title: string;
  slug?: string;
  courseId?: string;
  lessonId?: string;
  category: string;
  description: string;
  type: LabType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  instructions: string;
  starterCode?: string;
  language?: string;
  testCases?: LabTestCase[];
  expectedOutput?: string;
  variables?: Record<string, any>;
  simulationConfig?: Record<string, any>;
  hints: string[];
  solution?: string;
  evaluationRules?: Record<string, any>;
  xpReward: number;
  lpReward: number;
  prerequisites?: string[];
  status: 'PUBLISHED' | 'COMING_SOON' | 'DRAFT' | 'ARCHIVED';
  createdAt?: string;
  updatedAt?: string;
}

export interface LabAttempt {
  id?: string;
  userId: string;
  labId: string;
  startedAt: string;
  completedAt?: string;
  score: number;
  status: 'started' | 'passed' | 'failed';
  executionData?: any;
  errors?: string[];
  hintsUsed: number;
  timeSpent: number;
  passedTests: number;
  totalTests: number;
  xpEarned?: number;
  lpEarned?: number;
  aiFeedback?: string;
}

export interface LabAnalytics {
  labId: string;
  totalAttempts: number;
  uniqueLearners: number;
  completionRate: number;
  averageScore: number;
  averageTimeSeconds: number;
  failureRate: number;
  hintsUsedCount: number;
  commonErrors: string[];
  testsPassRate: number;
}

export interface SimulationItem {
  id: string;
  title: string;
  subject: string;
  scenario: string;
  variables: Record<string, any>;
  actions: string[];
  rules: string[];
  successConditions: string[];
  failureConditions: string[];
  scoring: Record<string, number>;
  hints: string[];
  feedback: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  published: boolean;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description?: string;
  category?: string;
  difficulty?: string;
  targetPrefix?: number;
  requiredHosts?: number;
  timeLimitSeconds?: number;
  xpReward?: number;
  lpReward?: number;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  hint: string;
}

export interface QuizAttempt {
  id?: string;
  uid: string;
  quizId: string;
  score: number;
  accuracy: number;
  timeTaken: number;
  hintsUsed: number;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
  lpEarned: number;
  createdAt: string;
}

export interface SimulationConfig {
  pca_ip: string;
  pca_mask: string;
  pca_gateway: string;
  router_int1_ip: string;
  router_int2_ip: string;
  router_mask: string;
  server_ip: string;
  server_mask: string;
  server_gateway: string;
}

export interface SimulationAttempt {
  id?: string;
  uid: string;
  simulationId: string;
  configuration: SimulationConfig;
  success: boolean;
  attempts: number;
  hintsUsed: number;
  timeTaken: number;
  score: number;
  diagnostics?: string[];
  errors?: string[];
  xpEarned?: number;
  lpEarned?: number;
  createdAt: string;
}

export interface Competition {
  id: string;
  title: string;
  type: 'Quiz' | 'Coding' | 'Networking' | 'Cybersecurity' | 'Simulation' | 'Mixed';
  status: 'draft' | 'upcoming' | 'live' | 'completed' | 'archived';
  scenario: string;
  subnetRange?: string;
  requirements?: {
    dept: string;
    hostsNeeded: number;
  }[];
  questionsCount?: number;
  lpReward: number;
  xpReward: number;
  badgeReward?: string;
  timeLimitSeconds: number;
  startTime?: string;
  endTime?: string;
  maxParticipants?: number;
  participantsCount?: number;
  tieBreakerRule?: string;
}

export interface CompetitionAttempt {
  id?: string;
  uid: string;
  competitionId: string;
  studentName: string;
  allocations: Record<string, { subnet: string; mask: string; usableHosts: number }>;
  score: number;
  accuracy: number;
  timeTaken: number;
  challengesCompleted?: number;
  xpEarned?: number;
  lpEarned?: number;
  badge?: string;
  flagged?: boolean;
  flagReason?: string;
  createdAt: string;
}

export interface LearningPointTransaction {
  id?: string;
  uid: string;
  activityType: string;
  activityId: string;
  points: number;
  description: string;
  createdAt: string;
}

export interface CheatSheet {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lpPrice: number;
  xpRequirement?: number;
  pdfUrl?: string;
  previewText: string;
  contentMarkdown?: string;
  published: boolean;
  downloadsCount?: number;
  purchased?: boolean;
  createdAt?: string;
}

export interface CheatSheetPurchase {
  id?: string;
  uid: string;
  cheatSheetId: string;
  title: string;
  lpPrice: number;
  purchasedAt: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  discountName: string;
  discountType: 'percentage' | 'fixed_lp';
  amount: number;
  startDate: string;
  endDate: string;
  applicableCategories: string[];
  applicableProducts: string[];
  usageLimit: number;
  timesUsed: number;
  active: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  category: string;
  lpCost: number;
  icon?: string;
  downloadUrl?: string;
  previewText?: string;
  requiredLevel?: number;
  requiredStreak?: number;
  active?: boolean;
}

export interface RewardRedemption {
  id?: string;
  uid: string;
  rewardId: string;
  rewardTitle: string;
  lpCost: number;
  redeemedAt: string;
}

export interface Certificate {
  id: string;
  uid: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  certificateCode: string;
  status: 'issued' | 'revoked';
  completionRequirementsMet: {
    lessonsCompleted: boolean;
    finalAssessmentPassed: boolean;
    simulationsCompleted: boolean;
  };
}

export interface AuditLog {
  id: string;
  adminUid: string;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  details?: string;
  previousValue?: any;
  newValue?: any;
}

export interface FeatureFlags {
  quickLearn: boolean;
  simulations: boolean;
  competitions: boolean;
  leaderboards: boolean;
  aiAnalysis: boolean;
  streaks: boolean;
  learningPoints: boolean;
  cheatSheets: boolean;
  rewards: boolean;
  certificates: boolean;
  notifications: boolean;
  experimentalFeatures: boolean;
}

export interface NotificationBroadcast {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'students' | 'trainers' | 'course_users' | 'inactive';
  courseId?: string;
  sentAt: string;
  sentBy: string;
}

export interface AdminDashboardOverview {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalCourses: number;
  publishedCourses: number;
  totalLessons: number;
  totalSimulations: number;
  activeCompetitions: number;
  completedCompetitions: number;
  certificatesIssued: number;
  totalXpEarned: number;
  totalLpEarned: number;
  lpRedeemed: number;
  storePurchasesCount: number;
}

export interface SkillAnalysis {
  theoryScore: number;
  practiceScore: number;
  applicationScore: number;
  simulationScore: number;
  weakArea: string;
  recommendations: string[];
}

