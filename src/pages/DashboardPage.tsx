import {
  ArrowUpLeft,
  BookCheck,
  CheckCircle2,
  Circle,
  Clock,
  FolderKanban,
  Layers,
  Play,
  Plus,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import { DemoNotice } from '../components/DemoNotice';
import { StatMetric } from '../components/StatMetric';
import { DEMO_DAILY_MISSION } from '../data/dashboard';
import { ROADMAP_PHASES } from '../data/roadmap';
import { findLessonById } from '../services/curriculum';
import type { AcademyProgressState, CurriculumMetrics } from '../types/academy';

interface DashboardPageProps {
  state: AcademyProgressState;
  metrics: CurriculumMetrics;
  onContinueLearning: () => void;
  onOpenLesson: (lessonId: string) => void;
  onNavigateRoadmap: () => void;
  onLogMinutes: (minutes: number) => void;
  onToggleMissionTask: (taskId: string) => void;
}

export function DashboardPage({
  state,
  metrics,
  onContinueLearning,
  onOpenLesson,
  onNavigateRoadmap,
  onLogMinutes,
  onToggleMissionTask,
}: DashboardPageProps) {
  const activeLesson = findLessonById(ROADMAP_PHASES, state.activeLessonId);
  const completedTasksCount = DEMO_DAILY_MISSION.tasks.filter((task) =>
    state.completedMissionTaskIds.includes(task.id)
  ).length;

  return (
    <div className="space-y-6">
      {/* Hero / Academy Title + Primary CTA */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <BilingualTerm className="font-semibold text-blue-600 dark:text-blue-400">
                AI Engineer Academy
              </BilingualTerm>
              <span aria-hidden="true">·</span>
              <span>المرحلة الأولى: تأسيس المنصة</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              أكاديمية مهندس الذكاء الاصطناعي
            </h1>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              مسار تعليمي منظم من إعداد بيئة العمل وبرمجة{' '}
              <BilingualTerm mono>Python</BilingualTerm> وحتى بناء أنظمة{' '}
              <BilingualTerm mono>RAG</BilingualTerm> ونشر النماذج في بيئة الإنتاج.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onContinueLearning}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold whitespace-nowrap transition-colors"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              <span>متابعة التعلم</span>
            </button>

            <button
              type="button"
              onClick={onNavigateRoadmap}
              className="inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap transition-colors"
            >
              <span>خارطة الطريق (11 مرحلة)</span>
              <ArrowUpLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <DemoNotice />

      {/* 4-Column Curriculum KPI Strip */}
      <section aria-label="ملخص التقدم" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatMetric
          label="تقدم المنهج"
          value={`${metrics.progressPercent}%`}
          sublabel={`${metrics.completedPhasesCount} من ${metrics.totalPhasesCount} مراحل مكتملة`}
          icon={<TrendingUp className="w-4 h-4" aria-hidden="true" />}
          progressPercent={metrics.progressPercent}
        />

        <StatMetric
          label="المرحلة الحالية"
          value={`${String(metrics.currentPhase.id).padStart(2, '0')} · ${metrics.currentPhase.titleAr}`}
          sublabel={metrics.currentPhase.titleEn}
          icon={<Layers className="w-4 h-4" aria-hidden="true" />}
        />

        <StatMetric
          label="الدروس المكتملة"
          value={`${metrics.completedLessons} من ${metrics.totalLessons}`}
          sublabel={
            activeLesson
              ? `الدرس النشط: ${activeLesson.titleAr}`
              : 'اختر درساً من خارطة الطريق'
          }
          icon={<BookCheck className="w-4 h-4" aria-hidden="true" />}
        />

        <StatMetric
          label="مشاريع المعرض"
          value={`${metrics.completedProjectsCount} من ${metrics.totalProjectsCount}`}
          sublabel="مشاريع تطبيقية بنهاية المراحل"
          icon={<FolderKanban className="w-4 h-4" aria-hidden="true" />}
        />
      </section>

      {/* Main Split: Daily Mission + One-Hour Daily Target */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Daily Mission Card */}
        <section
          aria-labelledby="daily-mission-heading"
          className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 sm:p-6 flex flex-col justify-between gap-5"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {DEMO_DAILY_MISSION.dateLabelAr}
                </span>
                <span aria-hidden="true">·</span>
                <span>بيانات تجريبية</span>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                {completedTasksCount} من {DEMO_DAILY_MISSION.tasks.length} مهام
              </span>
            </div>

            <div className="space-y-1.5">
              <h2
                id="daily-mission-heading"
                className="text-lg font-bold text-slate-900 dark:text-slate-100"
              >
                {DEMO_DAILY_MISSION.titleAr}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {DEMO_DAILY_MISSION.descriptionAr}
              </p>
            </div>

            <ul className="divide-y divide-slate-200/80 dark:divide-slate-800/80 border-t border-slate-200/80 dark:border-slate-800/80">
              {DEMO_DAILY_MISSION.tasks.map((task) => {
                const isDone = state.completedMissionTaskIds.includes(task.id);
                return (
                  <li key={task.id} className="py-2.5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onToggleMissionTask(task.id)}
                      aria-pressed={isDone}
                      className="flex items-center gap-3 text-start min-h-[44px] flex-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 -mx-2 transition-colors"
                    >
                      {isDone ? (
                        <CheckCircle2
                          className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle
                          className="w-5 h-5 text-slate-400 dark:text-slate-600 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-medium ${
                            isDone
                              ? 'line-through text-slate-500 dark:text-slate-400'
                              : 'text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {task.titleAr}
                        </span>
                        <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                          {task.titleEn}
                        </BilingualTerm>
                      </span>
                    </button>
                    <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 shrink-0">
                      {task.estimatedMinutes} د
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              الدرس المرتبط بالمهمة جاهز في قاعة الدراسة
            </span>
            <button
              type="button"
              onClick={() => onOpenLesson(DEMO_DAILY_MISSION.targetLessonId)}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap shrink-0 transition-colors"
            >
              <span>بدء درس المهمة</span>
              <ArrowUpLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* One-Hour Daily Target Card */}
        <section
          aria-labelledby="daily-target-heading"
          className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 sm:p-6 flex flex-col justify-between gap-5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <h2
                  id="daily-target-heading"
                  className="text-lg font-bold text-slate-900 dark:text-slate-100"
                >
                  الهدف اليومي: ساعة واحدة
                </h2>
              </div>
              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                {metrics.dailyTargetPercent}%
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              الالتزام بساعة دراسة مركزة يومياً ({state.dailyTargetMinutes} دقيقة) يبني زخماً ثابتاً
              لإتمام مسار هندسة الذكاء الاصطناعي.
            </p>

            <div className="py-2 space-y-2.5">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
                  {state.dailyMinutesLogged}{' '}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                    من {state.dailyTargetMinutes} دقيقة
                  </span>
                </span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {state.dailyMinutesLogged >= state.dailyTargetMinutes
                    ? 'تحقق هدف اليوم'
                    : `متبقي ${Math.max(0, state.dailyTargetMinutes - state.dailyMinutesLogged)} دقيقة`}
                </span>
              </div>

              <div
                className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
                role="progressbar"
                aria-valuenow={metrics.dailyTargetPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="التقدم نحو الهدف اليومي"
              >
                <div
                  className={`h-full transition-[width] duration-200 ${
                    state.dailyMinutesLogged >= state.dailyTargetMinutes
                      ? 'bg-emerald-600 dark:bg-emerald-500'
                      : 'bg-blue-600 dark:bg-blue-500'
                  }`}
                  style={{ width: `${metrics.dailyTargetPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onLogMinutes(15)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>تسجيل 15 دقيقة</span>
            </button>

            <button
              type="button"
              onClick={() => onLogMinutes(-state.dailyMinutesLogged)}
              disabled={state.dailyMinutesLogged === 0}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>تصفير عداد اليوم</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
