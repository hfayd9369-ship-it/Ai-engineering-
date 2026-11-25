import type {
  AcademyProgressState,
  CurriculumMetrics,
  Lesson,
  RoadmapPhase,
} from '../types/academy';

export function flattenLessons(phases: RoadmapPhase[]): Lesson[] {
  return phases.flatMap((phase) => phase.lessons);
}

export function findLessonById(phases: RoadmapPhase[], lessonId: string): Lesson | null {
  for (const phase of phases) {
    const match = phase.lessons.find((lesson) => lesson.id === lessonId);
    if (match) {
      return match;
    }
  }
  return null;
}

export function getAdjacentLessons(
  phases: RoadmapPhase[],
  lessonId: string
): { previous: Lesson | null; next: Lesson | null } {
  const all = flattenLessons(phases);
  const index = all.findIndex((item) => item.id === lessonId);
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export function isPhaseCompleted(phase: RoadmapPhase, completedLessonIds: string[]): boolean {
  if (phase.lessons.length === 0) {
    return false;
  }
  const completedSet = new Set(completedLessonIds);
  return phase.lessons.every((lesson) => completedSet.has(lesson.id));
}

export function getPhaseProgress(
  phase: RoadmapPhase,
  completedLessonIds: string[]
): { completed: number; total: number; percent: number } {
  const completedSet = new Set(completedLessonIds);
  const total = phase.lessons.length;
  const completed = phase.lessons.filter((lesson) => completedSet.has(lesson.id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

export function computeCurriculumMetrics(
  phases: RoadmapPhase[],
  progress: AcademyProgressState,
  totalProjectsCount: number
): CurriculumMetrics {
  const allLessons = flattenLessons(phases);
  const validLessonIds = new Set(allLessons.map((l) => l.id));
  const uniqueCompleted = new Set(
    progress.completedLessonIds.filter((id) => validLessonIds.has(id))
  );

  const totalLessons = allLessons.length;
  const completedLessons = uniqueCompleted.size;
  const progressPercent =
    totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  const completedPhasesCount = phases.filter((phase) =>
    isPhaseCompleted(phase, progress.completedLessonIds)
  ).length;

  const activeLesson = findLessonById(phases, progress.activeLessonId);
  const firstIncompletePhase =
    phases.find((phase) => !isPhaseCompleted(phase, progress.completedLessonIds)) ??
    phases[phases.length - 1];

  const currentPhase =
    (activeLesson ? phases.find((p) => p.id === activeLesson.phaseId) : undefined) ??
    firstIncompletePhase;

  const completedProjectsCount = Object.values(progress.projectStatuses).filter(
    (status) => status === 'completed'
  ).length;

  const safeTarget = Math.max(1, progress.dailyTargetMinutes);
  const dailyTargetPercent = Math.min(
    100,
    Math.round((progress.dailyMinutesLogged / safeTarget) * 100)
  );

  return {
    totalLessons,
    completedLessons,
    progressPercent,
    currentPhase,
    completedPhasesCount,
    totalPhasesCount: phases.length,
    completedProjectsCount,
    totalProjectsCount,
    dailyTargetPercent,
  };
}
