import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { INITIAL_DEMO_PROGRESS } from '../data/dashboard';
import { NAV_ITEMS } from '../data/navigation';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import { ROADMAP_PHASES } from '../data/roadmap';
import { DashboardPage } from '../pages/DashboardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RoadmapPage } from '../pages/RoadmapPage';
import {
  computeCurriculumMetrics,
  findLessonById,
  getAdjacentLessons,
  getPhaseProgress,
} from './curriculum';
import { analyzeVectors2D, scoreAssessment, simulateGradientDescent } from './mathEngine';
import { getPathByRouteId, normalizePathname, resolveRoute } from './router';

test('navigation defines all 10 required sections with unique paths', () => {
  assert.equal(NAV_ITEMS.length, 10);
  const paths = new Set(NAV_ITEMS.map((item) => item.path));
  assert.equal(paths.size, 10);
});

test('router resolves valid routes, trailing slashes, /dashboard alias, and invalid routes', () => {
  assert.equal(normalizePathname('/roadmap/'), '/roadmap');
  assert.equal(resolveRoute('/').route?.id, 'dashboard');
  assert.equal(resolveRoute('/dashboard').route?.id, 'dashboard');
  assert.equal(resolveRoute('/math-lab').route?.id, 'math-lab');
  assert.equal(getPathByRouteId('settings'), '/settings');

  const invalid = resolveRoute('/non-existent-page');
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.route, null);
  assert.equal(invalid.normalizedPath, '/non-existent-page');
});

test('roadmap contains exact 11 phases from 0 to 10 with lessons', () => {
  assert.equal(ROADMAP_PHASES.length, 11);
  ROADMAP_PHASES.forEach((phase, index) => {
    assert.equal(phase.id, index);
    assert.ok(phase.lessons.length > 0, `Phase ${index} should have lessons`);
  });
});

test('curriculum metrics and adjacent lesson traversal calculate accurately', () => {
  const metrics = computeCurriculumMetrics(
    ROADMAP_PHASES,
    INITIAL_DEMO_PROGRESS,
    PORTFOLIO_PROJECTS.length
  );
  assert.equal(metrics.totalPhasesCount, 11);
  assert.equal(metrics.completedPhasesCount, 1);
  assert.equal(metrics.completedLessons, 3);
  assert.equal(metrics.currentPhase.id, 1);
  assert.equal(metrics.completedProjectsCount, 1);
  assert.equal(metrics.dailyTargetPercent, 58);

  const p0Progress = getPhaseProgress(ROADMAP_PHASES[0], INITIAL_DEMO_PROGRESS.completedLessonIds);
  assert.equal(p0Progress.percent, 100);

  const adj = getAdjacentLessons(ROADMAP_PHASES, 'p1-l1');
  assert.equal(adj.previous?.id, 'p0-l3');
  assert.equal(adj.next?.id, 'p1-l2');
  assert.equal(findLessonById(ROADMAP_PHASES, 'missing'), null);
});

test('math engine computes vector dot product, gradient descent, and quiz score', () => {
  const parallel = analyzeVectors2D({ x: 3, y: 0 }, { x: 5, y: 0 });
  assert.equal(parallel.dotProduct, 15);
  assert.ok(Math.abs(parallel.cosineSimilarity - 1) < 1e-9);
  assert.ok(Math.abs(parallel.angleDegrees) < 1e-6);

  const orthogonal = analyzeVectors2D({ x: 1, y: 0 }, { x: 0, y: 2 });
  assert.equal(orthogonal.dotProduct, 0);
  assert.ok(Math.abs(orthogonal.angleDegrees - 90) < 1e-6);

  const gd = simulateGradientDescent(-3, 0.25, 5, 3);
  assert.equal(gd.length, 6);
  assert.ok(gd[5].loss < gd[0].loss);

  const quiz = scoreAssessment([1, 2, 0], { 0: 1, 1: 0, 2: 0 });
  assert.equal(quiz.score, 2);
  assert.equal(quiz.total, 3);
  assert.equal(quiz.percent, 67);
});

test('core pages render cleanly with Arabic RTL content and required sections', () => {
  const metrics = computeCurriculumMetrics(
    ROADMAP_PHASES,
    INITIAL_DEMO_PROGRESS,
    PORTFOLIO_PROJECTS.length
  );

  const dashboardHtml = renderToStaticMarkup(
    createElement(DashboardPage, {
      state: INITIAL_DEMO_PROGRESS,
      metrics,
      onContinueLearning: () => {},
      onOpenLesson: () => {},
      onNavigateRoadmap: () => {},
      onLogMinutes: () => {},
      onToggleMissionTask: () => {},
    })
  );
  assert.ok(dashboardHtml.includes('AI Engineer Academy'));
  assert.ok(dashboardHtml.includes('أكاديمية مهندس الذكاء الاصطناعي'));
  assert.ok(dashboardHtml.includes('متابعة التعلم'));
  assert.ok(dashboardHtml.includes('مهمة اليوم'));

  const roadmapHtml = renderToStaticMarkup(
    createElement(RoadmapPage, {
      completedLessonIds: INITIAL_DEMO_PROGRESS.completedLessonIds,
      activeLessonId: INITIAL_DEMO_PROGRESS.activeLessonId,
      onToggleLesson: () => {},
      onOpenLesson: () => {},
    })
  );
  assert.ok(roadmapHtml.includes('Environment Setup'));
  assert.ok(roadmapHtml.includes('Professional Portfolio'));
  assert.ok(roadmapHtml.includes('aria-expanded="true"'));

  const notFoundHtml = renderToStaticMarkup(
    createElement(NotFoundPage, {
      invalidPath: '/bad-route',
      onBackHome: () => {},
    })
  );
  assert.ok(notFoundHtml.includes('/bad-route'));
  assert.ok(notFoundHtml.includes('العودة إلى لوحة التحكم'));
});
