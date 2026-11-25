import type { PortfolioProject } from '../types/academy';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-env-cli',
    phaseId: 0,
    titleAr: 'أداة تهيئة بيئات مشاريع الذكاء الاصطناعي',
    titleEn: 'AI Workspace Bootstrap CLI',
    descriptionAr:
      'سكربت طرفية ينشئ هيكل مشروع قياسي مع البيئة الافتراضية وملفات Git واختبارات أولية جاهزة.',
    stackEn: ['Bash', 'Python', 'Git', 'venv'],
    deliverablesAr: [
      'إنشاء هيكل مجلدات src و tests تلقائياً',
      'توليد ملف requirements.txt و .gitignore نظيف',
    ],
    defaultStatus: 'completed',
  },
  {
    id: 'proj-data-eda',
    phaseId: 4,
    titleAr: 'محلل استكشاف وتنظيف البيانات الجدولية',
    titleEn: 'Automated Tabular EDA Pipeline',
    descriptionAr:
      'خط معالجة يحلل جودة البيانات ويكشف القيم المفقودة والشاذة ويصدر تقريراً إحصائياً منظماً.',
    stackEn: ['Python', 'NumPy', 'Pandas', 'Pytest'],
    deliverablesAr: [
      'دوال تنظيف مختبرة بالوحدات Unit Tests',
      'ملخص إحصائي للتوزيعات ومعاملات الارتباط',
    ],
    defaultStatus: 'in-progress',
  },
  {
    id: 'proj-ml-churn',
    phaseId: 5,
    titleAr: 'نموذج التنبؤ بتسرب العملاء مع واجهة FastAPI',
    titleEn: 'Customer Churn Predictor API',
    descriptionAr:
      'تدريب نموذج XGBoost وتقييمه عبر F1-Score ثم تقديم التنبؤات عبر نقطة نهاية FastAPI موثقة.',
    stackEn: ['Scikit-learn', 'XGBoost', 'FastAPI', 'Pydantic'],
    deliverablesAr: [
      'مقارنة خط الأساس Baseline مع النموذج التجميعي',
      'تغليف التنبؤات في خدمة API مع التحقق من المدخلات',
    ],
    defaultStatus: 'planned',
  },
  {
    id: 'proj-rag-docs',
    phaseId: 8,
    titleAr: 'مساعد البحث المعرفي في الوثائق التقنية',
    titleEn: 'Grounded Technical Docs RAG System',
    descriptionAr:
      'نظام استرجاع معرفي يقطع الوثائق الهندسية ويسترجع المقاطع الموثقة مع إرجاع المصادر بدقة.',
    stackEn: ['Embeddings', 'Vector DB', 'RAG', 'Docker'],
    deliverablesAr: [
      'فهرسة دلالية للمستندات مع إعادة الترتيب Reranking',
      'مجموعة تقييم آلي لقياس دقة الاسترجاع والالتزام بالمصدر',
    ],
    defaultStatus: 'planned',
  },
];
