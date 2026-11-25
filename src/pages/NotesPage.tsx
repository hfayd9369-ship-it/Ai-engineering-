import { useMemo, useState, type FormEvent } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { DemoNotice } from '../components/DemoNotice';
import { ROADMAP_PHASES } from '../data/roadmap';
import type { StudyNote } from '../types/academy';

interface NotesPageProps {
  notes: StudyNote[];
  onAddNote: (input: { title: string; content: string; phaseId: number }) => void;
  onDeleteNote: (noteId: string) => void;
}

export function NotesPage({ notes, onAddNote, onDeleteNote }: NotesPageProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [phaseId, setPhaseId] = useState(1);
  const [formError, setFormError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<number | 'all'>('all');

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesPhase = phaseFilter === 'all' || note.phaseId === phaseFilter;
      const matchesQuery =
        q === '' ||
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q);
      return matchesPhase && matchesQuery;
    });
  }, [notes, searchQuery, phaseFilter]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setFormError('يرجى كتابة عنوان الملاحظة ومحتواها قبل الحفظ.');
      return;
    }
    setFormError('');
    onAddNote({ title, content, phaseId });
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">الملاحظات</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          تدوين الملخصات والمفاهيم التقنية وربطها بمراحل خارطة الطريق.
        </p>
      </div>

      <DemoNotice />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* New Note Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-4"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            إضافة ملاحظة جديدة
          </h2>

          <div className="space-y-1.5">
            <label
              htmlFor="note-title"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              عنوان الملاحظة
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: الفرق بين List و Tuple"
              className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="note-phase"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              المرحلة المرتبطة
            </label>
            <select
              id="note-phase"
              value={phaseId}
              onChange={(e) => setPhaseId(Number(e.target.value))}
              className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ROADMAP_PHASES.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {String(phase.id).padStart(2, '0')} · {phase.titleAr}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="note-content"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              المحتوى
            </label>
            <textarea
              id="note-content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اكتب خلاصة ما تعلمته أو نقطة تحتاج لمراجعتها..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formError && (
            <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>حفظ الملاحظة</span>
          </button>
        </form>

        {/* Notes List */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="notes-search" className="sr-only">
                البحث في الملاحظات
              </label>
              <Search
                className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="notes-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الملاحظات..."
                className="w-full min-h-[44px] pr-10 pl-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              aria-label="تصفية الملاحظات حسب المرحلة"
              value={phaseFilter}
              onChange={(e) =>
                setPhaseFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
              }
              className="min-h-[44px] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع المراحل</option>
              {ROADMAP_PHASES.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  المرحلة {String(phase.id).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 text-center space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                لا توجد ملاحظات مطابقة حالياً
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                استخدم النموذج الجانبي لحفظ أول ملاحظة دراسية لك.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotes.map((note) => {
                const phase = ROADMAP_PHASES.find((p) => p.id === note.phaseId);
                return (
                  <article
                    key={note.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-4 sm:p-5 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {note.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                          <span>
                            المرحلة {String(note.phaseId).padStart(2, '0')}
                            {phase ? `: ${phase.titleAr}` : ''}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{note.updatedAt}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onDeleteNote(note.id)}
                        aria-label={`حذف ملاحظة ${note.title}`}
                        className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                      {note.content}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
