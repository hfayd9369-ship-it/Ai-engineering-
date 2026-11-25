import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Code2,
  Copy,
  Map,
  StickyNote,
} from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import { DemoNotice } from '../components/DemoNotice';
import { ROADMAP_PHASES } from '../data/roadmap';
import { findLessonById, getAdjacentLessons } from '../services/curriculum';

interface ClassroomPageProps {
  activeLessonId: string;
  completedLessonIds: string[];
  onToggleLesson: (lessonId: string) => void;
  onSelectLesson: (lessonId: string) => void;
  onNavigate: (path: string) => void;
}

export function ClassroomPage({
  activeLessonId,
  completedLessonIds,
  onToggleLesson,
  onSelectLesson,
  onNavigate,
}: ClassroomPageProps) {
  const [copied, setCopied] = useState(false);

  const lesson = findLessonById(ROADMAP_PHASES, activeLessonId) ?? ROADMAP_PHASES[0].lessons[0];
  const phase = ROADMAP_PHASES.find((p) => p.id === lesson.phaseId) ?? ROADMAP_PHASES[0];
  const isCompleted = completedLessonIds.includes(lesson.id);
  const { previous, next } = getAdjacentLessons(ROADMAP_PHASES, lesson.id);

  const handleCopyCode = async () => {
    if (!lesson.sampleCode) return;
    try {
      await navigator.clipboard.writeText(lesson.sampleCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>
            المرحلة {String(phase.id).padStart(2, '0')}: {phase.titleAr}
          </span>
          <span aria-hidden="true">·</span>
          <BilingualTerm>{phase.titleEn}</BilingualTerm>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{lesson.durationMinutes} دقيقة</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('/roadmap')}
          className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 w-fit transition-colors"
        >
          <Map className="w-3.5 h-3.5" aria-hidden="true" />
          <span>العودة لخارطة الطريق</span>
        </button>
      </div>

      <DemoNotice />

      <article className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 sm:p-7 space-y-6">
        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">
              {lesson.order}. {lesson.titleAr}
            </h1>
            <BilingualTerm className="text-sm text-slate-500 dark:text-slate-400">
              {lesson.titleEn}
            </BilingualTerm>
          </div>

          <button
            type="button"
            onClick={() => onToggleLesson(lesson.id)}
            aria-pressed={isCompleted}
            className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
              isCompleted
                ? 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>الدرس مكتمل</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" aria-hidden="true" />
                <span>تحديد كمكتمل</span>
              </>
            )}
          </button>
        </header>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">ملخص الدرس</h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {lesson.summaryAr}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            الأهداف التعليمية
          </h2>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {lesson.objectivesAr.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-1">
                  0{idx + 1}.
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            المصطلحات التقنية الأساسية
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
            {lesson.keyTermsEn.map((term, idx) => (
              <span key={term} className="inline-flex items-center gap-2">
                <BilingualTerm mono>{term}</BilingualTerm>
                {idx < lesson.keyTermsEn.length - 1 && (
                  <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>

        {lesson.sampleCode && (
          <section className="space-y-2.5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                مثال تطبيقي
              </h2>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>
            <pre
              dir="ltr"
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 p-4 overflow-x-auto text-xs leading-relaxed font-mono"
            >
              <code>{lesson.sampleCode}</code>
            </pre>
          </section>
        )}

        <footer className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('/code-lab')}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>فتح مختبر الكود</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/notes')}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              <StickyNote className="w-4 h-4" aria-hidden="true" />
              <span>تدوين ملاحظة</span>
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <button
              type="button"
              disabled={!previous}
              onClick={() => previous && onSelectLesson(previous.id)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              <span>الدرس السابق</span>
            </button>
            <button
              type="button"
              disabled={!next}
              onClick={() => next && onSelectLesson(next.id)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-xs font-medium text-white transition-colors"
            >
              <span>الدرس التالي</span>
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
