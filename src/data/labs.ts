import type { CodeSnippet, MathTopic } from '../types/academy';

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'snip-python-clean',
    titleAr: 'تصفية البيانات وتوحيد النوعيات في Python',
    titleEn: 'Python Type Hints & Comprehensions',
    phaseId: 1,
    language: 'python',
    descriptionAr: 'مثال تأسيسي يوضح استخدام Type Hints و List Comprehension لحساب الدرجات المقبولة.',
    code: `def filter_passing_scores(scores: list[int], threshold: int = 75) -> list[int]:
    """Return scores meeting or exceeding the passing threshold."""
    return [score for score in scores if score >= threshold]


if __name__ == "__main__":
    sample_scores = [62, 78, 91, 74, 85]
    print("Passing:", filter_passing_scores(sample_scores))`,
  },
  {
    id: 'snip-numpy-dot',
    titleAr: 'حساب التشابه باستخدام NumPy',
    titleEn: 'NumPy Vector Dot Product & Cosine Similarity',
    phaseId: 4,
    language: 'python',
    descriptionAr: 'نموذج لحساب التشابه الجيبي Cosine Similarity بين متجهين لتمثيل النصوص.',
    code: `import numpy as np


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    if denom == 0:
        return 0.0
    return float(np.dot(a, b) / denom)


v1 = np.array([0.8, 0.2, 0.5])
v2 = np.array([0.7, 0.3, 0.4])
print(f"Similarity: {cosine_similarity(v1, v2):.4f}")`,
  },
  {
    id: 'snip-pytorch-linear',
    titleAr: 'نموذج خطي مبسط في PyTorch',
    titleEn: 'Minimal PyTorch Linear Layer',
    phaseId: 6,
    language: 'python',
    descriptionAr: 'تهيئة طبقة خطية وحساب التمرير الأمامي Forward Pass على موتر تجريبي.',
    code: `import torch
import torch.nn as nn

layer = nn.Linear(in_features=4, out_features=2)
inputs = torch.tensor([[1.0, 0.5, -0.2, 0.8]])
outputs = layer(inputs)

print("Output shape:", outputs.shape)
print("Values:", outputs.detach().numpy())`,
  },
  {
    id: 'snip-env-setup',
    titleAr: 'تهيئة البيئة الافتراضية عبر الطرفية',
    titleEn: 'Virtual Environment CLI Setup',
    phaseId: 0,
    language: 'bash',
    descriptionAr: 'الأوامر القياسية لإنشاء بيئة Python معزولة وتثبيت الحزم الأساسية.',
    code: `python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install numpy pandas scikit-learn pytest`,
  },
];

export const MATH_TOPICS: MathTopic[] = [
  {
    id: 'math-dot-product',
    titleAr: 'الضرب النقطي للمتجهات',
    titleEn: 'Vector Dot Product',
    formulaLatexLike: 'a · b = a₁b₁ + a₂b₂ = ||a|| ||b|| cos(θ)',
    explanationAr:
      'يقيس مدى توافق اتجاه متجهين في الفضاء، وهو الأساس في حساب التشابه الدلالي وآلية الانتباه Self-Attention.',
    useCaseAr: 'البحث الدلالي Semantic Search وطبقات الشبكات العصبية Dense Layers.',
  },
  {
    id: 'math-gradient-descent',
    titleAr: 'قاعدة تحديث الانحدار المتدرج',
    titleEn: 'Gradient Descent Update Rule',
    formulaLatexLike: 'wₙₑₓₜ = w - η · (∂L / ∂w)',
    explanationAr:
      'تُحدَّث الأوزان في الاتجاه المعاكس لميل دالة الخسارة بمقدار يتحكم فيه معدل التعلم Learning Rate (η).',
    useCaseAr: 'تدريب نماذج الانحدار والشبكات العصبية لتقليل الخطأ.',
  },
  {
    id: 'math-mse',
    titleAr: 'متوسط مربع الخطأ',
    titleEn: 'Mean Squared Error (MSE)',
    formulaLatexLike: 'L = (1/n) Σ (yᵢ - ŷᵢ)²',
    explanationAr:
      'يقيس متوسط مربع الفروق بين القيم الحقيقية والمتوقعة، ويعاقب الأخطاء الكبيرة بشكل مضاعف.',
    useCaseAr: 'تقييم نماذج التنبؤ المستمر Regression Models.',
  },
];
