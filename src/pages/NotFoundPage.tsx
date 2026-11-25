import { ArrowRight, Compass } from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';

interface NotFoundPageProps {
  invalidPath: string;
  onBackHome: () => void;
}

export function NotFoundPage({ invalidPath, onBackHome }: NotFoundPageProps) {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-8 sm:p-12 text-center max-w-xl mx-auto my-6 space-y-5"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto">
        <Compass className="w-6 h-6" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h1 id="not-found-heading" className="text-xl font-bold text-slate-900 dark:text-slate-50">
          المسار المطلوب غير موجود
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          لم يتم العثور على الصفحة{' '}
          <BilingualTerm mono className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
            {invalidPath}
          </BilingualTerm>{' '}
          ضمن أقسام المرحلة الأولى.
        </p>
      </div>

      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
      >
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
        <span>العودة إلى لوحة التحكم</span>
      </button>
    </section>
  );
}
