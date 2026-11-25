import { Info } from 'lucide-react';

interface DemoNoticeProps {
  text?: string;
}

export function DemoNotice({
  text = 'بيانات تجريبية للمرحلة الأولى (Phase 1 Demo Data) — التقدم والملاحظات تُحفظ محلياً في المتصفح.',
}: DemoNoticeProps) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 rounded-lg px-3.5 py-2.5">
      <Info className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}
