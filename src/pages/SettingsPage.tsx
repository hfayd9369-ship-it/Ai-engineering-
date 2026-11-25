import { useState } from 'react';
import { Moon, RotateCcw, Sun } from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import type { ThemeMode } from '../types/academy';

interface SettingsPageProps {
  theme: ThemeMode;
  onSetTheme: (theme: ThemeMode) => void;
  dailyTargetMinutes: number;
  onSetDailyTargetMinutes: (minutes: number) => void;
  onResetDemoProgress: () => void;
}

export function SettingsPage({
  theme,
  onSetTheme,
  dailyTargetMinutes,
  onSetDailyTargetMinutes,
  onResetDemoProgress,
}: SettingsPageProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [resetDoneMessage, setResetDoneMessage] = useState(false);

  const targetOptions = [30, 45, 60, 90];

  const handleConfirmReset = () => {
    onResetDemoProgress();
    setConfirmingReset(false);
    setResetDoneMessage(true);
    setTimeout(() => setResetDoneMessage(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">الإعدادات</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          تخصيص مظهر الواجهة والهدف اليومي وإدارة بيانات العرض التجريبية.
        </p>
      </div>

      {/* Theme Setting */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">مظهر التطبيق</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            المظهر الداكن هو الافتراضي، مع إمكانية التبديل إلى المظهر الفاتح في أي وقت.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onSetTheme('dark')}
            aria-pressed={theme === 'dark'}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-600/10 text-blue-600 dark:text-blue-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Moon className="w-4 h-4" aria-hidden="true" />
            <span>المظهر الداكن (الافتراضي)</span>
          </button>

          <button
            type="button"
            onClick={() => onSetTheme('light')}
            aria-pressed={theme === 'light'}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-600/10 text-blue-700 dark:text-blue-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Sun className="w-4 h-4" aria-hidden="true" />
            <span>المظهر الفاتح</span>
          </button>
        </div>
      </section>

      {/* Daily Study Target */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            الهدف اليومي للدراسة
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            الهدف الموصى به في الأكاديمية هو 60 دقيقة (ساعة واحدة) يومياً.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {targetOptions.map((mins) => {
            const active = dailyTargetMinutes === mins;
            return (
              <button
                key={mins}
                type="button"
                onClick={() => onSetDailyTargetMinutes(mins)}
                aria-pressed={active}
                className={`min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium tabular-nums transition-colors ${
                  active
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {mins} دقيقة
              </button>
            );
          })}
        </div>
      </section>

      {/* Language & RTL Info */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-2">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          اللغة واتجاه الواجهة
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          اللغة الافتراضية: العربية مع دعم كامل لاتجاه{' '}
          <BilingualTerm mono>RTL</BilingualTerm>، مع الإبقاء على المصطلحات الهندسية والأكواد
          باللغة الإنجليزية (<BilingualTerm mono>LTR</BilingualTerm>).
        </p>
      </section>

      {/* Reset Demo Progress */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            إدارة البيانات التجريبية
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            إعادة جميع الدروس والملاحظات وساعات الدراسة اليومية إلى الحالة التجريبية الافتراضية.
          </p>
        </div>

        {!confirmingReset ? (
          <button
            type="button"
            onClick={() => setConfirmingReset(true)}
            className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>استعادة البيانات التجريبية الافتراضية</span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleConfirmReset}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
            >
              تأكيد الاستعادة
            </button>
            <button
              type="button"
              onClick={() => setConfirmingReset(false)}
              className="min-h-[44px] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              إلغاء
            </button>
          </div>
        )}

        {resetDoneMessage && (
          <p role="status" className="text-xs text-emerald-600 dark:text-emerald-400">
            تمت استعادة البيانات التجريبية بنجاح.
          </p>
        )}
      </section>
    </div>
  );
}
