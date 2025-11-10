/**
 * 카테고리별 상세 분석 유틸리티
 * ASRS와 WURS의 증상을 카테고리별로 분류하여 분석
 */

/**
 * ASRS 카테고리별 상세 분석
 * @param {Object} answers - ASRS 답변 객체
 * @returns {Object} 카테고리별 분석 결과
 */
export function analyzeASRSCategories(answers) {
  const categories = {
    inattention: {
      name: "부주의",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      description: "집중력, 주의력, 조직화 능력",
    },
    hyperactivity: {
      name: "과잉행동",
      items: [10, 11, 12, 13, 14],
      description: "안절부절, 가만히 있지 못함",
    },
    impulsivity: {
      name: "충동성",
      items: [15, 16, 17, 18],
      description: "성급함, 참을성 부족",
    },
  };

  const analysis = {};

  for (const [key, category] of Object.entries(categories)) {
    const score = category.items.reduce(
      (sum, id) => sum + (answers[id] || 0),
      0
    );
    const maxScore = category.items.length * 4;
    const percentage = (score / maxScore) * 100;

    let level = "low";
    if (percentage >= 75) level = "high";
    else if (percentage >= 50) level = "moderate";

    analysis[key] = {
      name: category.name,
      description: category.description,
      score,
      maxScore,
      percentage: Math.round(percentage),
      level,
      items: category.items.map((id) => ({
        id,
        value: answers[id] || 0,
      })),
    };
  }

  return analysis;
}

/**
 * WURS 카테고리별 상세 분석
 * @param {Object} answers - WURS 답변 객체
 * @returns {Object} 카테고리별 분석 결과
 */
export function analyzeWURSCategories(answers) {
  const categories = {
    attention: {
      name: "주의력",
      items: [1, 4, 24, 25],
      icon: "🎯",
    },
    hyperactivity: {
      name: "과잉행동",
      items: [3, 17],
      icon: "⚡",
    },
    impulsivity: {
      name: "충동성",
      items: [16],
      icon: "🚀",
    },
    emotion: {
      name: "정서 조절",
      items: [2, 5, 6, 7, 8, 10, 12, 13, 14, 15],
      icon: "💭",
    },
    behavior: {
      name: "행동 문제",
      items: [9, 11, 22],
      icon: "🎭",
    },
    social: {
      name: "사회성",
      items: [20, 21, 23],
      icon: "👥",
    },
    academic: {
      name: "학업",
      items: [18, 19],
      icon: "📚",
    },
  };

  const analysis = {};

  for (const [key, category] of Object.entries(categories)) {
    const score = category.items.reduce(
      (sum, id) => sum + (answers[id] || 0),
      0
    );
    const maxScore = category.items.length * 4;
    const percentage = (score / maxScore) * 100;

    analysis[key] = {
      name: category.name,
      icon: category.icon,
      score,
      maxScore,
      percentage: Math.round(percentage),
      itemCount: category.items.length,
    };
  }

  return analysis;
}

/**
 * 카테고리 수준 판단 헬퍼 함수
 * @param {number} percentage - 백분율
 * @returns {string} 수준 ("low" | "moderate" | "high")
 */
export function getCategoryLevel(percentage) {
  if (percentage >= 75) return "high";
  if (percentage >= 50) return "moderate";
  return "low";
}


