import { ArrowUpLeft, CheckCircle2, ChevronDown, Circle } from 'lucide-react';
import { getPhaseProgress } from '../services/curriculum';
import type { RoadmapPhase } from '../types/academy';
import { BilingualTerm } from './BilingualTerm';

interface PhaseAccordionProps {
  phase: RoadmapPhase;
  isExpanded: boolean;
  onToggleExpand: (phaseId: number) => void;
  completedLessonIds: string[];
  activeLessonId: string;
  onToggleLesson: (lessonId: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export function PhaseAccordion({
  phase,
  isExpanded,
  onToggleExpand,
  completedLessonIds,
  activeLessonId,
  onToggleLesson,
  onOpenLesson,
}: PhaseAccordionProps) {
  const { completed, total, percent } = getPhaseProgress(phase, completedLessonIds);
  const phaseCode = String(phase.id).padStart(2, '0');
  const isComplete = total > 0 && completed === total;
  const panelId = `phase-panel-${phase.id}`;

  return (
    <section
      aria-labelledby={`phase-trigger-${phase.id}`}
      className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] overflow-hidden"
    >
      <button
        id={`phase-trigger-${phase.id}`}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => onToggleExpand(phase.id)}
        className="w-full min-h-[64px] px-4 sm:px-6 py-4 flex items-center justify-between gap-4 text-start hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500"
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <span
            className={`font-mono tabular-nums text-xs font-semibold px-2.5 py-1.5 rounded-md border shrink-0 ${
              isComplete
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300'
            }`}
          >
            {phaseCode}
          </span>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {phase.titleAr}
              </h2>
              <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                {phase.titleEn}
              </BilingualTerm>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
              <span>
                {completed} من {total} دروس مكتملة
              </span>
              <span aria-hidden="true">·</span>
              <span>{phase.estimatedHours} ساعات تقديرية</span>
              <span aria-hidden="true">·</span>
              <span
                className={
                  isComplete
                    ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                    : 'text-slate-600 dark:text-slate-300'
                }
              >
                {isComplete ? 'مكتملة' : `${percent}%`}
              </span>
            </div>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <div
          id={panelId}
          className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#0E1420]"
        >
          <p className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-b border-slate-200/80 dark:border-slate-800/70">
            {phase.summaryAr}
          </p>

          <ul className="divide-y divide-slate-200/80 dark:divide-slate-800/70">
            {phase.lessons.map((lesson) => {
              const isDone = completedLessonIds.includes(lesson.id);
              const isCurrent = activeLessonId === lesson.id;

              return (
                <li
                  key={lesson.id}
                  className="px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => onToggleLesson(lesson.id)}
                      aria-label={
                        isDone
                          ? `إلغاء إكمال درس ${lesson.titleAr}`
                          : `تحديد درس ${lesson.titleAr} كمكتمل`
                      }
                      aria-pressed={isDone}
                      className="min-h-[44px] min-w-[44px] -my-2 -mr-2 flex items-center justify-center rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                    >
                      {isDone ? (
                        <CheckCircle2
                          className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600" aria-hidden="true" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span
                          className={`text-sm font-medium ${
                            isDone
                              ? 'text-slate-500 dark:text-slate-400 line-through decoration-slate-400/60'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {lesson.order}. {lesson.titleAr}
                        </span>
                        <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                          {lesson.titleEn}
                        </BilingualTerm>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                        <span>{lesson.durationMinutes} دقيقة</span>
                        {isCurrent && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">
                              الدرس النشط
                            </span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <BilingualTerm mono className="text-[11px]">
                          {lesson.keyTermsEn.join(' · ')}
                        </BilingualTerm>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenLesson(lesson.id)}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700/90 bg-white dark:bg-[#111827] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap shrink-0 transition-colors self-end sm:self-center"
                  >
                    <span>فتح في قاعة الدراسة</span>
                    <ArrowUpLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
