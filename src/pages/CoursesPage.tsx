import { useMemo, useState } from 'react';
import { ArrowUpLeft, Search } from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import { DemoNotice } from '../components/DemoNotice';
import { COURSES_CATALOG } from '../data/courses';
import { ROADMAP_PHASES } from '../data/roadmap';

type LevelFilter = 'الكل' | 'تأسيسي' | 'متوسط' | 'متقدم';

interface CoursesPageProps {
  onOpenLesson: (lessonId: string) => void;
  onNavigateRoadmap: () => void;
}

export function CoursesPage({ onOpenLesson, onNavigateRoadmap }: CoursesPageProps) {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('الكل');

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COURSES_CATALOG.filter((course) => {
      const matchesLevel = levelFilter === 'الكل' || course.levelAr === levelFilter;
      const matchesQuery =
        q === '' ||
        course.titleAr.toLowerCase().includes(q) ||
        course.titleEn.toLowerCase().includes(q) ||
        course.topicsEn.some((t) => t.toLowerCase().includes(q));
      return matchesLevel && matchesQuery;
    });
  }, [query, levelFilter]);

  const levels: LevelFilter[] = ['الكل', 'تأسيسي', 'متوسط', 'متقدم'];

  const handleStartCourse = (phaseId: number) => {
    const phase = ROADMAP_PHASES.find((p) => p.id === phaseId);
    const firstLesson = phase?.lessons[0];
    if (firstLesson) {
      onOpenLesson(firstLesson.id);
    } else {
      onNavigateRoadmap();
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">مكتبة الدورات</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          فهرس الوحدات التدريبية المرتبطة بمراحل المسار الهندسي.
        </p>
      </div>

      <DemoNotice />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="course-search-input" className="sr-only">
            ابحث في الدورات والموضوعات
          </label>
          <Search
            className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="course-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم الدورة أو التقنية (مثل Python, RAG)..."
            className="w-full min-h-[44px] pr-10 pl-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div
          role="group"
          aria-label="تصفية حسب المستوى"
          className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit"
        >
          {levels.map((level) => {
            const active = levelFilter === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setLevelFilter(level)}
                aria-pressed={active}
                className={`min-h-[38px] px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            لم يتم العثور على دورات مطابقة لبحثك.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setLevelFilter('الكل');
            }}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
          >
            إعادة ضبط البحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  <span>المرحلة {String(course.phaseId).padStart(2, '0')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.levelAr}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.lessonsCount} دروس</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.estimatedHours} ساعات</span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {course.titleAr}
                  </h2>
                  <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                    {course.titleEn}
                  </BilingualTerm>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {course.descriptionAr}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3">
                <BilingualTerm mono className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {course.topicsEn.join(' · ')}
                </BilingualTerm>

                <button
                  type="button"
                  onClick={() => handleStartCourse(course.phaseId)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap shrink-0 transition-colors"
                >
                  <span>بدء الدراسة</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
