import { useMemo, useState } from 'react';
import { CheckCircle2, Clock, CircleDashed } from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import { DemoNotice } from '../components/DemoNotice';
import { PORTFOLIO_PROJECTS } from '../data/projects';
import type { ProjectStatus } from '../types/academy';

interface ProjectsPageProps {
  projectStatuses: Record<string, ProjectStatus>;
  onUpdateProjectStatus: (projectId: string, status: ProjectStatus) => void;
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planned: 'مخطط',
  'in-progress': 'قيد التنفيذ',
  completed: 'مكتمل',
};

export function ProjectsPage({ projectStatuses, onUpdateProjectStatus }: ProjectsPageProps) {
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all');

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((proj) => {
      const currentStatus = projectStatuses[proj.id] ?? proj.defaultStatus;
      return filter === 'all' || currentStatus === filter;
    });
  }, [filter, projectStatuses]);

  const filterButtons: { id: 'all' | ProjectStatus; label: string }[] = [
    { id: 'all', label: 'الكل' },
    { id: 'in-progress', label: 'قيد التنفيذ' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'planned', label: 'مخطط' },
  ];

  const renderStatusIcon = (status: ProjectStatus) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />;
    }
    if (status === 'in-progress') {
      return <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />;
    }
    return <CircleDashed className="w-4 h-4 text-slate-400" aria-hidden="true" />;
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">المشاريع</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          مشاريع تطبيقية لبناء معرض أعمال هندسي متدرج عبر مراحل المنهج.
        </p>
      </div>

      <DemoNotice />

      <div
        role="group"
        aria-label="تصفية المشاريع حسب الحالة"
        className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit"
      >
        {filterButtons.map((btn) => {
          const active = filter === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              aria-pressed={active}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                active
                  ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            لا توجد مشاريع في هذه الحالة حالياً.
          </p>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
          >
            عرض جميع المشاريع
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => {
            const status = projectStatuses[project.id] ?? project.defaultStatus;
            return (
              <article
                key={project.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>المرحلة {String(project.phaseId).padStart(2, '0')}</span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                      {renderStatusIcon(status)}
                      <span>{STATUS_LABELS[status]}</span>
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {project.titleAr}
                    </h2>
                    <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                      {project.titleEn}
                    </BilingualTerm>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.descriptionAr}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {project.deliverablesAr.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-blue-600 dark:text-blue-400">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <BilingualTerm mono className="text-[11px] text-slate-500 dark:text-slate-400">
                    {project.stackEn.join(' · ')}
                  </BilingualTerm>

                  <label className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">الحالة:</span>
                    <select
                      aria-label={`تحديث حالة مشروع ${project.titleAr}`}
                      value={status}
                      onChange={(e) =>
                        onUpdateProjectStatus(project.id, e.target.value as ProjectStatus)
                      }
                      className="min-h-[40px] px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="planned">مخطط</option>
                      <option value="in-progress">قيد التنفيذ</option>
                      <option value="completed">مكتمل</option>
                    </select>
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
