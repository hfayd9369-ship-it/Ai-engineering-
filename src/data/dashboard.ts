import type { AcademyProgressState, DailyMission } from '../types/academy';

export const DEMO_DAILY_MISSION: DailyMission = {
  dateLabelAr: 'مهمة اليوم',
  titleAr: 'إتقان هياكل البيانات و List Comprehensions في Python',
  descriptionAr:
    'أكمل درس القوائم والقواميس، ثم جرّب نموذج الكود المرجعي وأضف ملخصاً قصيراً في دفتر الملاحظات.',
  targetLessonId: 'p1-l1',
  tasks: [
    {
      id: 'm-task-1',
      titleAr: 'مراجعة الدرس التفاعلي في قاعة الدراسة',
      titleEn: 'Data Structures & Comprehensions',
      estimatedMinutes: 25,
    },
    {
      id: 'm-task-2',
      titleAr: 'معاينة وتعديل مثال Python في مختبر الكود',
      titleEn: 'Code Lab Snippet Practice',
      estimatedMinutes: 20,
    },
    {
      id: 'm-task-3',
      titleAr: 'تدوين نقطة تعلم واحدة أو حل سؤال التقييم',
      titleEn: 'Notes & Self-Check',
      estimatedMinutes: 15,
    },
  ],
};

export const INITIAL_DEMO_PROGRESS: AcademyProgressState = {
  completedLessonIds: ['p0-l1', 'p0-l2', 'p0-l3'],
  activeLessonId: 'p1-l1',
  dailyMinutesLogged: 35,
  dailyTargetMinutes: 60,
  completedMissionTaskIds: ['m-task-1'],
  projectStatuses: {
    'proj-env-cli': 'completed',
    'proj-data-eda': 'in-progress',
    'proj-ml-churn': 'planned',
    'proj-rag-docs': 'planned',
  },
  notes: [
    {
      id: 'note-demo-1',
      title: 'لماذا نستخدم البيئة الافتراضية venv؟',
      content:
        'تمنع تعارض إصدارات المكتبات بين المشاريع المختلفة وتجعل ملف requirements.txt دقيقاً عند النشر.',
      phaseId: 0,
      updatedAt: '2026-11-24',
    },
    {
      id: 'note-demo-2',
      title: 'ملاحظة سريعة حول List Comprehension',
      content:
        'تستخدم لتحويل أو تصفية القوائم في سطر واحد أوضح وأسرع غالباً من حلقة for التقليدية مع append.',
      phaseId: 1,
      updatedAt: '2026-11-24',
    },
  ],
};
