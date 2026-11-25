import { useState } from 'react';
import { Check, Copy, RotateCcw } from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import { DemoNotice } from '../components/DemoNotice';
import { CODE_SNIPPETS } from '../data/labs';

export function CodeLabPage() {
  const [selectedId, setSelectedId] = useState(CODE_SNIPPETS[0].id);
  const selectedSnippet =
    CODE_SNIPPETS.find((item) => item.id === selectedId) ?? CODE_SNIPPETS[0];

  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const s of CODE_SNIPPETS) {
      map[s.id] = s.code;
    }
    return map;
  });

  const [copied, setCopied] = useState(false);

  const currentCode = drafts[selectedSnippet.id] ?? selectedSnippet.code;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleResetSnippet = () => {
    setDrafts((prev) => ({
      ...prev,
      [selectedSnippet.id]: selectedSnippet.code,
    }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">مختبر الكود</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          مساحة مراجعة وتعديل النماذج البرمجية الأساسية لبيئة{' '}
          <BilingualTerm mono>Python</BilingualTerm>.
        </p>
      </div>

      <DemoNotice text="المرحلة الأولى: عرض وتحرير ونسخ القوالب البرمجية المرجعية محلياً. تشغيل بيئة Python التفاعلية سيتم إضافته في المرحلة الثانية." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Snippet Selector */}
        <aside
          aria-label="قوالب الكود المرجعية"
          className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            النماذج المتاحة ({CODE_SNIPPETS.length})
          </div>
          <ul className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
            {CODE_SNIPPETS.map((snippet) => {
              const isSelected = snippet.id === selectedSnippet.id;
              return (
                <li key={snippet.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(snippet.id)}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`w-full min-h-[56px] px-4 py-3 text-start transition-colors ${
                      isSelected
                        ? 'bg-blue-600/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="text-sm font-medium">{snippet.titleAr}</div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <BilingualTerm mono>{snippet.language}</BilingualTerm>
                      <span aria-hidden="true">·</span>
                      <span>المرحلة {String(snippet.phaseId).padStart(2, '0')}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Code Editor Workspace */}
        <section className="lg:col-span-8 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {selectedSnippet.titleAr}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedSnippet.descriptionAr}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleResetSnippet}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>استعادة الأصل</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
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
          </div>

          <div className="p-4 sm:p-5 space-y-2">
            <label htmlFor="code-lab-editor" className="block text-xs text-slate-500 dark:text-slate-400">
              محرر المسودة (<BilingualTerm mono>{selectedSnippet.titleEn}</BilingualTerm>)
            </label>
            <textarea
              id="code-lab-editor"
              dir="ltr"
              spellCheck={false}
              rows={12}
              value={currentCode}
              onChange={(e) =>
                setDrafts((prev) => ({
                  ...prev,
                  [selectedSnippet.id]: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm leading-relaxed p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
