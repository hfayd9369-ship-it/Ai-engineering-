import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { BilingualTerm } from '../components/BilingualTerm';
import { DemoNotice } from '../components/DemoNotice';
import { MATH_TOPICS } from '../data/labs';
import { analyzeVectors2D, simulateGradientDescent } from '../services/mathEngine';

export function MathLabPage() {
  const [ax, setAx] = useState(3);
  const [ay, setAy] = useState(2);
  const [bx, setBx] = useState(1);
  const [by, setBy] = useState(4);

  const [learningRate, setLearningRate] = useState(0.2);
  const [initialW, setInitialW] = useState(-3);

  const vectorAnalysis = useMemo(
    () => analyzeVectors2D({ x: ax, y: ay }, { x: bx, y: by }),
    [ax, ay, bx, by]
  );

  const gdPoints = useMemo(
    () => simulateGradientDescent(initialW, learningRate, 8, 3),
    [initialW, learningRate]
  );

  const mapCoord = (val: number) => 120 + val * 20;
  const mapCoordY = (val: number) => 120 - val * 20;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">مختبر الرياضيات</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          أداة تفاعلية لاستكشاف مفاهيم الجبر الخطي و{' '}
          <BilingualTerm mono>Gradient Descent</BilingualTerm> الأساسية في الذكاء الاصطناعي.
        </p>
      </div>

      <DemoNotice text="المرحلة الأولى: محاكاة رياضية تفاعلية تعمل محلياً في المتصفح (متجهات ثنائية الأبعاد ومسار الانحدار المتدرج)." />

      {/* Interactive Split: Vector Explorer & Gradient Descent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Vector Dot Product Explorer */}
        <section
          aria-labelledby="vector-lab-heading"
          className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2
                id="vector-lab-heading"
                className="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                مستكشف الضرب النقطي والتشابه الجيبي
              </h2>
              <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                2D Vector Dot Product & Cosine Similarity
              </BilingualTerm>
            </div>
            <button
              type="button"
              onClick={() => {
                setAx(3);
                setAy(2);
                setBx(1);
                setBy(4);
              }}
              aria-label="إعادة ضبط قيم المتجهات"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 240 240"
              className="w-56 h-56 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              role="img"
              aria-label="رسم بياني للمتجهين a و b في المستوى الديكارتي"
            >
              {/* Grid lines */}
              <line x1="0" y1="120" x2="240" y2="120" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
              <line x1="120" y1="0" x2="120" y2="240" stroke="currentColor" className="text-slate-300 dark:text-slate-700" strokeWidth="1" />
              {/* Vector A */}
              <line
                x1="120"
                y1="120"
                x2={mapCoord(ax)}
                y2={mapCoordY(ay)}
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx={mapCoord(ax)} cy={mapCoordY(ay)} r="4" fill="#2563eb" />
              {/* Vector B */}
              <line
                x1="120"
                y1="120"
                x2={mapCoord(bx)}
                y2={mapCoordY(by)}
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx={mapCoord(bx)} cy={mapCoordY(by)} r="4" fill="#10b981" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <label className="space-y-1">
              <span className="flex justify-between text-slate-600 dark:text-slate-300">
                <BilingualTerm mono>a.x</BilingualTerm>
                <span className="font-mono tabular-nums">{ax}</span>
              </span>
              <input
                type="range"
                min={-5}
                max={5}
                step={1}
                value={ax}
                onChange={(e) => setAx(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </label>
            <label className="space-y-1">
              <span className="flex justify-between text-slate-600 dark:text-slate-300">
                <BilingualTerm mono>a.y</BilingualTerm>
                <span className="font-mono tabular-nums">{ay}</span>
              </span>
              <input
                type="range"
                min={-5}
                max={5}
                step={1}
                value={ay}
                onChange={(e) => setAy(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </label>
            <label className="space-y-1">
              <span className="flex justify-between text-slate-600 dark:text-slate-300">
                <BilingualTerm mono>b.x</BilingualTerm>
                <span className="font-mono tabular-nums">{bx}</span>
              </span>
              <input
                type="range"
                min={-5}
                max={5}
                step={1}
                value={bx}
                onChange={(e) => setBx(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </label>
            <label className="space-y-1">
              <span className="flex justify-between text-slate-600 dark:text-slate-300">
                <BilingualTerm mono>b.y</BilingualTerm>
                <span className="font-mono tabular-nums">{by}</span>
              </span>
              <input
                type="range"
                min={-5}
                max={5}
                step={1}
                value={by}
                onChange={(e) => setBy(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </label>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Dot Product</div>
              <div className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {vectorAnalysis.dotProduct.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Cosine Sim</div>
              <div className="font-mono text-sm font-bold tabular-nums text-blue-600 dark:text-blue-400">
                {vectorAnalysis.cosineSimilarity.toFixed(3)}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">الزاوية</div>
              <div className="font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {vectorAnalysis.angleDegrees.toFixed(1)}°
              </div>
            </div>
          </div>
        </section>

        {/* Gradient Descent Explorer */}
        <section
          aria-labelledby="gd-lab-heading"
          className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2
                id="gd-lab-heading"
                className="text-base font-bold text-slate-900 dark:text-slate-100"
              >
                محاكاة الانحدار المتدرج
              </h2>
              <BilingualTerm mono className="text-xs text-slate-500 dark:text-slate-400">
                L(w) = (w - 3)²
              </BilingualTerm>
            </div>
            <button
              type="button"
              onClick={() => {
                setLearningRate(0.2);
                setInitialW(-3);
              }}
              aria-label="إعادة ضبط معاملات الانحدار المتدرج"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <label className="space-y-1">
              <span className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>معدل التعلم (η)</span>
                <span className="font-mono tabular-nums">{learningRate.toFixed(2)}</span>
              </span>
              <input
                type="range"
                min={0.05}
                max={0.95}
                step={0.05}
                value={learningRate}
                onChange={(e) => setLearningRate(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </label>
            <label className="space-y-1">
              <span className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>الوزن الابتدائي (w₀)</span>
                <span className="font-mono tabular-nums">{initialW}</span>
              </span>
              <input
                type="range"
                min={-5}
                max={7}
                step={1}
                value={initialW}
                onChange={(e) => setInitialW(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </label>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-medium text-start">الخطوة</th>
                  <th className="px-3 py-2 font-medium text-end">w</th>
                  <th className="px-3 py-2 font-medium text-end">Gradient</th>
                  <th className="px-3 py-2 font-medium text-end">Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/80 font-mono tabular-nums">
                {gdPoints.slice(0, 6).map((pt) => (
                  <tr key={pt.step}>
                    <td className="px-3 py-2 text-slate-600 dark:text-slate-300">#{pt.step}</td>
                    <td className="px-3 py-2 text-end text-slate-900 dark:text-slate-100">
                      {pt.w.toFixed(3)}
                    </td>
                    <td className="px-3 py-2 text-end text-slate-600 dark:text-slate-300">
                      {pt.gradient.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-end text-blue-600 dark:text-blue-400">
                      {pt.loss.toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Key Math Reference Cards */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
          القوانين الرياضية المرجعية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MATH_TOPICS.map((topic) => (
            <article
              key={topic.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 space-y-3"
            >
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {topic.titleAr}
                </h3>
                <BilingualTerm className="text-xs text-slate-500 dark:text-slate-400">
                  {topic.titleEn}
                </BilingualTerm>
              </div>
              <div
                dir="ltr"
                className="font-mono text-xs p-3 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 overflow-x-auto"
              >
                {topic.formulaLatexLike}
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {topic.explanationAr}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
                التطبيق: {topic.useCaseAr}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
