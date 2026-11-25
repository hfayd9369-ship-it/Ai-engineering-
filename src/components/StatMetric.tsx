import type { ReactNode } from 'react';

interface StatMetricProps {
  label: string;
  value: string;
  sublabel?: string;
  icon?: ReactNode;
  progressPercent?: number;
}

export function StatMetric({
  label,
  value,
  sublabel,
  icon,
  progressPercent,
}: StatMetricProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-4 sm:p-5 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
        {icon && <span className="text-slate-400 dark:text-slate-500">{icon}</span>}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight tabular-nums text-slate-900 dark:text-slate-50">
          {value}
        </div>
        {sublabel && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{sublabel}</p>
        )}
      </div>

      {typeof progressPercent === 'number' && (
        <div className="pt-1">
          <div
            className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label}
          >
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-[width] duration-200"
              style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
