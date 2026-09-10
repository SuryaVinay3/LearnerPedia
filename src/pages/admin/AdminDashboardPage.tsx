import React, { useState } from 'react';
import { AdminLayout, AdminTab } from './AdminLayout';
import { OverviewView } from './views/OverviewView';
import { UsersView } from './views/UsersView';
import { CoursesView } from './views/CoursesView';
import { LessonsView } from './views/LessonsView';
import { LabsAdminView } from './views/LabsAdminView';
import { QuestionsView } from './views/QuestionsView';
import { CheckpointsView } from './views/CheckpointsView';
import { SimulationsView } from './views/SimulationsView';
import { CompetitionsView } from './views/CompetitionsView';
import { LeaderboardsView } from './views/LeaderboardsView';
import { LearningPointsView } from './views/LearningPointsView';
import { XpStreaksView } from './views/XpStreaksView';
import { CheatSheetsView } from './views/CheatSheetsView';
import { StoreView } from './views/StoreView';
import { DiscountsView } from './views/DiscountsView';
import { RewardsView } from './views/RewardsView';
import { CertificatesView } from './views/CertificatesView';
import { FeaturesView } from './views/FeaturesView';
import { NotificationsView } from './views/NotificationsView';
import { AuditLogsView } from './views/AuditLogsView';
import { ReportsView } from './views/ReportsView';
import { AnalyticsView } from './views/AnalyticsView';
import { SettingsView } from './views/SettingsView';
import { KnowledgeBaseView } from './views/KnowledgeBaseView';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'users':
        return <UsersView />;
      case 'courses':
        return <CoursesView />;
      case 'lessons':
        return <LessonsView />;
      case 'labs':
        return <LabsAdminView />;
      case 'questions':
        return <QuestionsView />;
      case 'checkpoints':
        return <CheckpointsView />;
      case 'simulations':
        return <SimulationsView />;
      case 'competitions':
        return <CompetitionsView />;
      case 'leaderboards':
        return <LeaderboardsView />;
      case 'learning-points':
        return <LearningPointsView />;
      case 'xp-streaks':
        return <XpStreaksView />;
      case 'cheat-sheets':
        return <CheatSheetsView />;
      case 'store':
        return <StoreView />;
      case 'discounts':
        return <DiscountsView />;
      case 'rewards':
        return <RewardsView />;
      case 'certificates':
        return <CertificatesView />;
      case 'features':
        return <FeaturesView />;
      case 'notifications':
        return <NotificationsView />;
      case 'audit-logs':
        return <AuditLogsView />;
      case 'reports':
        return <ReportsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-kb':
        return <KnowledgeBaseView />;
      default:
        return <OverviewView />;
    }
  };


  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderTabContent()}
    </AdminLayout>
  );
};
