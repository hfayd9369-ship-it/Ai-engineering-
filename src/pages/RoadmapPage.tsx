import { useMemo, useState } from 'react';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import { DemoNotice } from '../components/DemoNotice';
import { PhaseAccordion } from '../components/PhaseAccordion';
import { ROADMAP_PHASES } from '../data/roadmap';
import { getPhaseProgress } from '../services/curriculum';

type RoadmapFilter = 'all' | 'in-progress' | 'completed' | 'upcoming';

interface RoadmapPageProps {
  completedLessonIds: string[];
  activeLessonId: string;
  onToggleLesson: (lessonId: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export function RoadmapPage({
  completedLessonIds,
  activeLessonId,
  onToggleLesson,
  onOpenLesson,
}: RoadmapPageProps) {
  const [expandedIds, setExpandedIds] = useState<number[]>([0, 1]);
  const [filter, setFilter] = useState<RoadmapFilter>('all');

  const filteredPhases = useMemo(() => {
    return ROADMAP_PHASES.filter((phase) => {
      const { completed, total } = getPhaseProgress(phase, completedLessonIds);
      if (filter === 'completed') {
        return total > 0 && completed === total;
      }
      if (filter === 'in-progress') {
        return completed > 0 && completed < total;
      }
      if (filter === 'upcoming') {
        return completed === 0;
      }
      return true;
    });
  }, [completedLessonIds, filter]);

  const allExpanded =
    filteredPhases.length > 0 &&
    filteredPhases.every((phase) => expandedIds.includes(phase.id));

  const toggleExpandPhase = (phaseId: number) => {
    setExpandedIds((prev) =>
      prev.includes(phaseId) ? prev.filter((id) => id !== phaseId) : [...prev, phaseId]
    );
  };

  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedIds([]);
    } else {
      setExpandedIds(filteredPhases.map((p) => p.id));
    }
  };

  const filterOptions: { id: RoadmapFilter; label: string }[] = [
    { id: 'all', label: 'الكل (11)' },
    { id: 'in-progress', label: 'قيد الدراسة' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'upcoming', label: 'قادم' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            خارطة طريق مهندس الذكاء الاصطناعي
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            11 مرحلة متدرجة من إعداد بيئة العمل حتى معرض الأعمال الاحترافي. اضغط على أي مرحلة لعرض
            دروسها.
          </p>
        </div>

        <button
          type="button"
          onClick={toggleExpandAll}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap shrink-0 transition-colors"
        >
          {allExpanded ? (
            <>
              <ChevronsDownUp className="w-4 h-4" aria-hidden="true" />
              <span>طي جميع المراحل</span>
            </>
          ) : (
            <>
              <ChevronsUpDown className="w-4 h-4" aria-hidden="true" />
              <span>توسيع جميع المراحل</span>
            </>
          )}
        </button>
      </div>

      <DemoNotice />

      <div
        role="group"
        aria-label="تصفية مراحل خارطة الطريق"
        className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit"
      >
        {filterOptions.map((option) => {
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={isActive}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {filteredPhases.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            لا توجد مراحل مطابقة للتصفية الحالية.
          </p>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
          >
            عرض جميع المراحل
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPhases.map((phase) => (
            <PhaseAccordion
              key={phase.id}
              phase={phase}
              isExpanded={expandedIds.includes(phase.id)}
              onToggleExpand={toggleExpandPhase}
              completedLessonIds={completedLessonIds}
              activeLessonId={activeLessonId}
              onToggleLesson={onToggleLesson}
              onOpenLesson={onOpenLesson}
            />
          ))}
        </div>
      )}
    </div>
  );
}
