export type RouteId =
  | 'dashboard'
  | 'roadmap'
  | 'classroom'
  | 'courses'
  | 'code-lab'
  | 'math-lab'
  | 'projects'
  | 'assessments'
  | 'notes'
  | 'settings';

export type ThemeMode = 'dark' | 'light';

export interface NavItem {
  id: RouteId;
  path: string;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  iconName:
    | 'LayoutDashboard'
    | 'Map'
    | 'BookOpen'
    | 'Library'
    | 'Code2'
    | 'Sigma'
    | 'FolderKanban'
    | 'ClipboardCheck'
    | 'StickyNote'
    | 'Settings';
}

export interface Lesson {
  id: string;
  phaseId: number;
  order: number;
  titleAr: string;
  titleEn: string;
  durationMinutes: number;
  summaryAr: string;
  objectivesAr: string[];
  keyTermsEn: string[];
  sampleCode?: string;
}

export interface RoadmapPhase {
  id: number;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  estimatedHours: number;
  lessons: Lesson[];
}

export interface CourseModule {
  id: string;
  phaseId: number;
  titleAr: string;
  titleEn: string;
  levelAr: 'تأسيسي' | 'متوسط' | 'متقدم';
  lessonsCount: number;
  estimatedHours: number;
  descriptionAr: string;
  topicsEn: string[];
}

export interface CodeSnippet {
  id: string;
  titleAr: string;
  titleEn: string;
  phaseId: number;
  language: 'python' | 'bash';
  descriptionAr: string;
  code: string;
}

export interface MathTopic {
  id: string;
  titleAr: string;
  titleEn: string;
  formulaLatexLike: string;
  explanationAr: string;
  useCaseAr: string;
}

export type ProjectStatus = 'planned' | 'in-progress' | 'completed';

export interface PortfolioProject {
  id: string;
  phaseId: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  stackEn: string[];
  deliverablesAr: string[];
  defaultStatus: ProjectStatus;
}

export interface AssessmentQuestion {
  id: string;
  phaseId: number;
  questionAr: string;
  codeContext?: string;
  optionsAr: string[];
  correctIndex: number;
  explanationAr: string;
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  phaseId: number;
  updatedAt: string;
}

export interface MissionTask {
  id: string;
  titleAr: string;
  titleEn: string;
  estimatedMinutes: number;
}

export interface DailyMission {
  dateLabelAr: string;
  titleAr: string;
  descriptionAr: string;
  targetLessonId: string;
  tasks: MissionTask[];
}

export interface AcademyProgressState {
  completedLessonIds: string[];
  activeLessonId: string;
  dailyMinutesLogged: number;
  dailyTargetMinutes: number;
  completedMissionTaskIds: string[];
  projectStatuses: Record<string, ProjectStatus>;
  notes: StudyNote[];
}

export interface CurriculumMetrics {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  currentPhase: RoadmapPhase;
  completedPhasesCount: number;
  totalPhasesCount: number;
  completedProjectsCount: number;
  totalProjectsCount: number;
  dailyTargetPercent: number;
}
