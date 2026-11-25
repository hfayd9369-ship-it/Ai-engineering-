import { useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { DemoNotice } from '../components/DemoNotice';
import { ASSESSMENT_QUESTIONS } from '../data/assessments';
import { scoreAssessment } from '../services/mathEngine';

export function AssessmentsPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctIndices = ASSESSMENT_QUESTIONS.map((q) => q.correctIndex);
  const result = scoreAssessment(correctIndices, selectedAnswers);
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">التقييمات</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            اختبار تشخيصي قصير للتحقق الذاتي من المفاهيم التأسيسية.
          </p>
        </div>

        {submitted && (
          <div className="text-sm font-semibold tabular-nums text-slate-800 dark:text-slate-100">
            النتيجة: {result.score} من {result.total} ({result.percent}%)
          </div>
        )}
      </div>

      <DemoNotice />

      <div className="space-y-4">
        {ASSESSMENT_QUESTIONS.map((question, qIndex) => {
          const chosen = selectedAnswers[qIndex];
          const isCorrect = submitted && chosen === question.correctIndex;

          return (
            <fieldset
              key={question.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-4"
            >
              <legend className="sr-only">{question.questionAr}</legend>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    سؤال {qIndex + 1} · المرحلة {String(question.phaseId).padStart(2, '0')}
                  </span>
                  {submitted && (
                    <span
                      className={`inline-flex items-center gap-1 font-medium ${
                        isCorrect
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>إجابة صحيحة</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          <span>إجابة غير صحيحة</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {qIndex + 1}. {question.questionAr}
                </h2>

                {question.codeContext && (
                  <pre
                    dir="ltr"
                    className="rounded-lg bg-slate-950 text-slate-100 border border-slate-800 p-3 font-mono text-xs overflow-x-auto"
                  >
                    <code>{question.codeContext}</code>
                  </pre>
                )}
              </div>

              <div className="space-y-2">
                {question.optionsAr.map((opt, optIdx) => {
                  const isSelected = chosen === optIdx;
                  const showCorrectHighlight = submitted && optIdx === question.correctIndex;
                  const showWrongHighlight =
                    submitted && isSelected && optIdx !== question.correctIndex;

                  return (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-3 min-h-[44px] px-3.5 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                        showCorrectHighlight
                          ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                          : showWrongHighlight
                            ? 'border-rose-500/60 bg-rose-500/10 text-rose-800 dark:text-rose-200'
                            : isSelected
                              ? 'border-blue-600 bg-blue-600/10 text-slate-900 dark:text-slate-100'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleSelectOption(qIndex, optIdx)}
                        className="accent-blue-600 shrink-0"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200 dark:border-slate-800">
                  التفسير: {question.explanationAr}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={answeredCount === 0}
            className="min-h-[44px] px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-semibold transition-colors"
          >
            تصحيح التقييم ({answeredCount} من {ASSESSMENT_QUESTIONS.length})
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-800 dark:text-slate-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>إعادة المحاولة</span>
          </button>
        )}
      </div>
    </div>
  );
}
