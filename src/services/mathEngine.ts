export interface Vector2D {
  x: number;
  y: number;
}

export interface VectorAnalysis {
  dotProduct: number;
  normA: number;
  normB: number;
  cosineSimilarity: number;
  angleDegrees: number;
}

export function analyzeVectors2D(a: Vector2D, b: Vector2D): VectorAnalysis {
  const dotProduct = a.x * b.x + a.y * b.y;
  const normA = Math.hypot(a.x, a.y);
  const normB = Math.hypot(b.x, b.y);
  const denom = normA * normB;
  const rawCosine = denom === 0 ? 0 : dotProduct / denom;
  const cosineSimilarity = Math.max(-1, Math.min(1, rawCosine));
  const angleDegrees = denom === 0 ? 0 : (Math.acos(cosineSimilarity) * 180) / Math.PI;

  return {
    dotProduct,
    normA,
    normB,
    cosineSimilarity,
    angleDegrees,
  };
}

export interface GradientStepPoint {
  step: number;
  w: number;
  loss: number;
  gradient: number;
}

/**
 * Simulates gradient descent on convex quadratic loss L(w) = (w - target)^2
 */
export function simulateGradientDescent(
  initialW: number,
  learningRate: number,
  steps: number,
  target = 3
): GradientStepPoint[] {
  const safeSteps = Math.max(1, Math.min(30, Math.floor(steps)));
  const points: GradientStepPoint[] = [];
  let w = initialW;

  for (let step = 0; step <= safeSteps; step++) {
    const diff = w - target;
    const loss = diff * diff;
    const gradient = 2 * diff;
    points.push({ step, w, loss, gradient });
    w = w - learningRate * gradient;
  }

  return points;
}

export function scoreAssessment(
  correctIndices: number[],
  selectedIndices: Record<number, number>
): { score: number; total: number; percent: number } {
  const total = correctIndices.length;
  let score = 0;
  for (let i = 0; i < total; i++) {
    if (selectedIndices[i] === correctIndices[i]) {
      score += 1;
    }
  }
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  return { score, total, percent };
}
