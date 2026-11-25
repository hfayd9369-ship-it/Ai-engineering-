import { useCallback, useEffect, useMemo, useState } from 'react';
import { INITIAL_DEMO_PROGRESS } from '../data/dashboard';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import { ROADMAP_PHASES } from '../data/roadmap';
import { computeCurriculumMetrics } from '../services/curriculum';
import { readStorageJson, writeStorageJson } from '../services/storage';
import type { AcademyProgressState, ProjectStatus, StudyNote } from '../types/academy';

const PROGRESS_STORAGE_KEY = 'ai_academy_progress_v1';

export function useAcademyState() {
  const [state, setState] = useState<AcademyProgressState>(() =>
    readStorageJson<AcademyProgressState>(PROGRESS_STORAGE_KEY, INITIAL_DEMO_PROGRESS)
  );

  useEffect(() => {
    writeStorageJson(PROGRESS_STORAGE_KEY, state);
  }, [state]);

  const metrics = useMemo(
    () => computeCurriculumMetrics(ROADMAP_PHASES, state, PORTFOLIO_PROJECTS.length),
    [state]
  );

  const toggleLessonCompleted = useCallback((lessonId: string) => {
    setState((prev) => {
      const exists = prev.completedLessonIds.includes(lessonId);
      const completedLessonIds = exists
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return { ...prev, completedLessonIds };
    });
  }, []);

  const setActiveLessonId = useCallback((lessonId: string) => {
    setState((prev) => ({ ...prev, activeLessonId: lessonId }));
  }, []);

  const logStudyMinutes = useCallback((minutes: number) => {
    setState((prev) => ({
      ...prev,
      dailyMinutesLogged: Math.max(0, prev.dailyMinutesLogged + minutes),
    }));
  }, []);

  const setDailyTargetMinutes = useCallback((minutes: number) => {
    setState((prev) => ({
      ...prev,
      dailyTargetMinutes: Math.max(15, Math.min(240, minutes)),
    }));
  }, []);

  const toggleMissionTask = useCallback((taskId: string) => {
    setState((prev) => {
      const exists = prev.completedMissionTaskIds.includes(taskId);
      const completedMissionTaskIds = exists
        ? prev.completedMissionTaskIds.filter((id) => id !== taskId)
        : [...prev.completedMissionTaskIds, taskId];
      return { ...prev, completedMissionTaskIds };
    });
  }, []);

  const updateProjectStatus = useCallback((projectId: string, status: ProjectStatus) => {
    setState((prev) => ({
      ...prev,
      projectStatuses: {
        ...prev.projectStatuses,
        [projectId]: status,
      },
    }));
  }, []);

  const addNote = useCallback((input: { title: string; content: string; phaseId: number }) => {
    const newNote: StudyNote = {
      id: `note-${Date.now()}`,
      title: input.title.trim(),
      content: input.content.trim(),
      phaseId: input.phaseId,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setState((prev) => ({
      ...prev,
      notes: [newNote, ...prev.notes],
    }));
  }, []);

  const deleteNote = useCallback((noteId: string) => {
    setState((prev) => ({
      ...prev,
      notes: prev.notes.filter((note) => note.id !== noteId),
    }));
  }, []);

  const resetDemoProgress = useCallback(() => {
    setState(INITIAL_DEMO_PROGRESS);
  }, []);

  return {
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
  };
}
