import { ErrorBoundary } from './components/ErrorBoundary';
import { LayoutShell } from './components/LayoutShell';
import { useAcademyState } from './hooks/useAcademyState';
import { useRouter } from './hooks/useRouter';
import { useTheme } from './hooks/useTheme';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { ClassroomPage } from './pages/ClassroomPage';
import { CodeLabPage } from './pages/CodeLabPage';
import { CoursesPage } from './pages/CoursesPage';
import { DashboardPage } from './pages/DashboardPage';
import { MathLabPage } from './pages/MathLabPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NotesPage } from './pages/NotesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SettingsPage } from './pages/SettingsPage';

function AcademyShell() {
  const { pathname, isValidRoute, activeRoute, navigate } = useRouter();
  const { theme, setTheme, toggleTheme } = useTheme();
  const {
    state,
    metrics,
    toggleLessonCompleted,
    setActiveLessonId,
    logStudyMinutes,
    setDailyTargetMinutes,
    toggleMissionTask,
    updateProjectStatus,
    addNote,
    deleteNote,
    resetDemoProgress,
  } = useAcademyState();

  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    navigate('/classroom');
  };

  const handleContinueLearning = () => {
    navigate('/classroom');
  };

  const renderPage = () => {
    if (!isValidRoute || !activeRoute) {
      return <NotFoundPage invalidPath={pathname} onBackHome={() => navigate('/')} />;
    }

    switch (activeRoute.id) {
      case 'dashboard':
        return (
          <DashboardPage
            state={state}
            metrics={metrics}
            onContinueLearning={handleContinueLearning}
            onOpenLesson={handleOpenLesson}
            onNavigateRoadmap={() => navigate('/roadmap')}
            onLogMinutes={logStudyMinutes}
            onToggleMissionTask={toggleMissionTask}
          />
        );
      case 'roadmap':
        return (
          <RoadmapPage
            completedLessonIds={state.completedLessonIds}
            activeLessonId={state.activeLessonId}
            onToggleLesson={toggleLessonCompleted}
            onOpenLesson={handleOpenLesson}
          />
        );
      case 'classroom':
        return (
          <ClassroomPage
            activeLessonId={state.activeLessonId}
            completedLessonIds={state.completedLessonIds}
            onToggleLesson={toggleLessonCompleted}
            onSelectLesson={setActiveLessonId}
            onNavigate={navigate}
          />
        );
      case 'courses':
        return (
          <CoursesPage
            onOpenLesson={handleOpenLesson}
            onNavigateRoadmap={() => navigate('/roadmap')}
          />
        );
      case 'code-lab':
        return <CodeLabPage />;
      case 'math-lab':
        return <MathLabPage />;
      case 'projects':
        return (
          <ProjectsPage
            projectStatuses={state.projectStatuses}
            onUpdateProjectStatus={updateProjectStatus}
          />
        );
      case 'assessments':
        return <AssessmentsPage />;
      case 'notes':
        return (
          <NotesPage notes={state.notes} onAddNote={addNote} onDeleteNote={deleteNote} />
        );
      case 'settings':
        return (
          <SettingsPage
            theme={theme}
            onSetTheme={setTheme}
            dailyTargetMinutes={state.dailyTargetMinutes}
            onSetDailyTargetMinutes={setDailyTargetMinutes}
            onResetDemoProgress={resetDemoProgress}
          />
        );
    }
  };

  return (
    <LayoutShell
      activeRoute={activeRoute}
      currentPath={pathname}
      theme={theme}
      onToggleTheme={toggleTheme}
      onNavigate={navigate}
      onContinueLearning={handleContinueLearning}
    >
      {renderPage()}
    </LayoutShell>
  );
}

export default function App() {
  const handleResetRoute = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <ErrorBoundary onResetRoute={handleResetRoute}>
      <AcademyShell />
    </ErrorBoundary>
  );
}
