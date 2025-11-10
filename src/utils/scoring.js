/**
 * ADHD 스크리닝 점수 계산 및 해석 유틸리티
 * 
 * WHO ASRS-v1.1, DSM-5, WURS-25 기반
 * 의학적 근거: docs/SCORING_GUIDE.md 참조
 */

/**
 * ASRS 점수 계산 및 해석
 * @param {Object} answers - ASRS 답변 객체 {1: 0-4, 2: 0-4, ...}
 * @returns {Object} ASRS 결과
 */
export function calculateASRS(answers) {
  // Part A 점수 (1-6번) - 핵심 증상
  const partAScore = [1, 2, 3, 4, 5, 6].reduce(
    (sum, id) => sum + (answers[id] || 0),
    0
  );

  // Part B 점수 (7-18번) - 추가 증상
  const partBScore = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].reduce(
    (sum, id) => sum + (answers[id] || 0),
    0
  );

  // 전체 점수
  const totalScore = partAScore + partBScore;

  // 하위 유형 점수
  const inattentionScore = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce(
    (sum, id) => sum + (answers[id] || 0),
    0
  );

  const hyperactivityScore = [10, 11, 12, 13, 14, 15, 16, 17, 18].reduce(
    (sum, id) => sum + (answers[id] || 0),
    0
  );

  // 해석 (Part A 기준 - WHO/Harvard 2024 권장)
  let interpretation = "";
  let riskLevel = "";

  if (partAScore >= 14) {
    interpretation = "high";
    riskLevel = "ADHD 증상 가능성이 높습니다";
  } else if (partAScore >= 10) {
    interpretation = "moderate";
    riskLevel = "ADHD 증상이 일부 확인됩니다";
  } else {
    interpretation = "low";
    riskLevel = "ADHD 증상 가능성이 낮습니다";
  }

  // 하위 유형 판단
  let subtype = "unknown";
  if (inattentionScore >= 18 && hyperactivityScore >= 18) {
    subtype = "combined"; // 복합형
  } else if (inattentionScore >= 18) {
    subtype = "inattentive"; // 부주의형
  } else if (hyperactivityScore >= 18) {
    subtype = "hyperactive"; // 과잉행동-충동형
  }

  return {
    partAScore, // 0-24
    partBScore, // 0-48
    totalScore, // 0-72
    inattentionScore, // 0-36
    hyperactivityScore, // 0-36
    interpretation, // "low" | "moderate" | "high"
    riskLevel,
    subtype, // "inattentive" | "hyperactive" | "combined" | "unknown"
    criterionA: partAScore >= 14 ? "충족" : "미충족", // DSM-5 Criterion A
  };
}

/**
 * 기능 저하 평가 계산
 * @param {Object} answers - 기능 저하 답변 객체 {1: "yes"/"no", ...}
 * @returns {Object} 기능 저하 결과
 */
export function calculateImpairment(answers) {
  // "예" 응답 개수
  const yesCount = [1, 2, 3].filter((id) => answers[id] === "yes").length;

  // 영역별 상세
  const domains = {
    academic_work: answers[1] === "yes", // 학업/직업
    relationship: answers[2] === "yes", // 대인관계
    daily_life: answers[3] === "yes", // 일상 관리
  };

  // 해석
  let level = "";
  let description = "";
  let recommendation = "";

  if (yesCount >= 3) {
    level = "severe";
    description = "모든 생활 영역에서 심각한 어려움이 확인되었습니다.";
    recommendation = "즉시 전문의 상담을 권장합니다.";
  } else if (yesCount >= 2) {
    level = "significant";
    description = "여러 생활 영역에서 유의미한 어려움이 확인되었습니다.";
    recommendation = "전문의 상담을 강력히 권장합니다.";
  } else if (yesCount === 1) {
    level = "mild";
    description = "일부 생활 영역에서 어려움이 확인되었습니다.";
    recommendation = "필요시 전문가 상담을 고려하세요.";
  } else {
    level = "none";
    description = "일상생활에 뚜렷한 어려움은 확인되지 않았습니다.";
    recommendation = "현재 기능 저하는 없는 것으로 보입니다.";
  }

  return {
    yesCount, // 0-3
    domains, // { academic_work, relationship, daily_life }
    level, // "none" | "mild" | "significant" | "severe"
    description,
    recommendation,
    criterionD: yesCount >= 2 ? "충족" : "미충족", // DSM-5 Criterion D
  };
}

/**
 * WURS 점수 계산 및 해석
 * @param {Object} answers - WURS 답변 객체 {1: 0-4, 2: 0-4, ...}
 * @returns {Object} WURS 결과
 */
export function calculateWURS(answers) {
  // 전체 점수 (1-25번)
  const totalScore = Object.values(answers).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  // 해석 (Ward et al. 1993)
  let interpretation = "";
  let description = "";
  let recommendation = "";

  if (totalScore >= 46) {
    interpretation = "high";
    description = "7-10세 시절 뚜렷한 ADHD 증상이 있었던 것으로 보입니다.";
    recommendation =
      "성인 ADHD 가능성이 높습니다. 전문의 진단을 강력히 권장합니다.";
  } else if (totalScore >= 36) {
    interpretation = "moderate";
    description = "7-10세 시절 일부 ADHD 증상이 있었던 것으로 보입니다.";
    recommendation = "전문가 상담을 권장합니다.";
  } else {
    interpretation = "low";
    description =
      "7-10세 시절 ADHD 증상이 거의 나타나지 않았던 것으로 보입니다.";
    recommendation = "아동기 ADHD 가능성은 낮습니다.";
  }

  return {
    totalScore, // 0-100
    interpretation, // "low" | "moderate" | "high"
    description,
    recommendation,
    criterionB: totalScore >= 36 ? "충족" : "미충족", // DSM-5 Criterion B
  };
}

/**
 * 종합 해석 및 위험도 평가
 * @param {Object} asrsResult - calculateASRS 결과
 * @param {Object} impairmentResult - calculateImpairment 결과
 * @param {Object} wursResult - calculateWURS 결과
 * @returns {Object} 종합 해석
 */
export function interpretComprehensive(
  asrsResult,
  impairmentResult,
  wursResult
) {
  const { interpretation: asrsLevel, criterionA } = asrsResult;
  const { criterionD, yesCount } = impairmentResult;
  const { interpretation: wursLevel, criterionB } = wursResult;

  // DSM-5 기준 충족 여부
  const criteriaA_met = criterionA === "충족";
  const criteriaB_met = criterionB === "충족";
  const criteriaD_met = criterionD === "충족";

  // 종합 위험도 계산
  let overallRisk = "";
  let title = "";
  let message = "";
  let urgency = ""; // "high" | "moderate" | "low"

  // 케이스 1: 모든 기준 충족 (가장 높은 위험)
  if (criteriaA_met && criteriaB_met && criteriaD_met) {
    overallRisk = "very_high";
    title = "🔔 ADHD 가능성이 매우 높습니다";
    message = `검사 결과 현재 증상(ASRS), 아동기 증상(WURS), 기능 저하(DSM-5) 모두에서 ADHD 특성이 확인되었습니다.

**정신건강의학과 전문의 진단을 강력히 권장드립니다.**

이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.`;
    urgency = "high";
  }
  // 케이스 2: ASRS + 기능 저하 충족 (높은 위험)
  else if (criteriaA_met && criteriaD_met) {
    overallRisk = "high";
    title = "⚠️ ADHD 가능성이 높습니다";
    message = `현재 증상과 일상생활의 어려움이 확인되었습니다.

**전문의 상담을 권장드립니다.**

${
  wursLevel === "low"
    ? "다만 아동기 증상 회상 점수는 낮게 나왔습니다. 기억이 불확실하거나 증상이 성인기에 시작되었을 가능성도 있으니 전문의와 상의하세요."
    : ""
}`;
    urgency = "high";
  }
  // 케이스 3: ASRS만 충족 (중간 위험)
  else if (criteriaA_met) {
    overallRisk = "moderate";
    title = "💡 ADHD 증상이 일부 확인되었습니다";
    message = `현재 ADHD 증상이 확인되었으나, ${
      yesCount < 2
        ? "일상생활의 뚜렷한 어려움은 확인되지 않았습니다."
        : "아동기 증상 회상 점수는 낮게 나왔습니다."
    }

불편함이 지속된다면 전문가 상담을 고려해 보세요.`;
    urgency = "moderate";
  }
  // 케이스 4: 기능 저하만 충족 (경미한 위험)
  else if (criteriaD_met) {
    overallRisk = "low_to_moderate";
    title = "🤔 일상생활의 어려움이 확인되었습니다";
    message = `일상생활에 어려움이 있으나, ADHD 증상 점수는 낮게 나왔습니다.

다른 원인(우울증, 불안장애, 수면 문제 등)일 가능성도 있으니, 전문가 상담을 권장합니다.`;
    urgency = "moderate";
  }
  // 케이스 5: 모두 미충족 (낮은 위험)
  else {
    overallRisk = "low";
    title = "✅ ADHD 증상 가능성이 낮습니다";
    message = `검사 결과 ADHD 증상이 뚜렷하게 나타나지 않았습니다.

다만 일상생활에 지속적인 어려움이 있다면, 다른 원인에 대한 전문가 상담을 고려해 보세요.`;
    urgency = "low";
  }

  return {
    overallRisk, // "very_high" | "high" | "moderate" | "low_to_moderate" | "low"
    title,
    message,
    urgency, // "high" | "moderate" | "low"
    dsmCriteria: {
      A: criterionA, // "충족" | "미충족"
      B: criterionB,
      D: criterionD,
    },
    nextSteps: generateNextSteps(overallRisk, urgency),
  };
}

/**
 * 다음 단계 권장사항 생성
 * @param {string} overallRisk - 종합 위험도
 * @param {string} urgency - 긴급도
 * @returns {Array} 권장사항 배열
 */
function generateNextSteps(overallRisk, urgency) {
  const baseSteps = [
    {
      icon: "🏥",
      title: "전문의 상담",
      description: "정신건강의학과 전문의 진단을 받으세요",
      priority: urgency === "high" ? 1 : 2,
    },
    {
      icon: "📄",
      title: "검사 결과 저장",
      description: "PDF로 저장하여 진료 시 제출하세요",
      priority: 1,
    },
    {
      icon: "📚",
      title: "ADHD 정보 학습",
      description: "신뢰할 수 있는 자료로 ADHD를 이해하세요",
      priority: 3,
    },
    {
      icon: "🏢",
      title: "병원 찾기",
      description: "근처 정신건강의학과를 찾아보세요",
      priority: urgency === "high" ? 1 : 3,
    },
  ];

  // 위험도별 추가 권장사항
  if (overallRisk === "very_high" || overallRisk === "high") {
    baseSteps.unshift({
      icon: "⚠️",
      title: "빠른 조치 필요",
      description:
        "가능한 빠른 시일 내에 전문의 진단을 받으시길 강력히 권장합니다.",
      priority: 0,
      urgent: true,
    });
  }

  return baseSteps.sort((a, b) => a.priority - b.priority);
}

/**
 * 전체 점수 계산 및 해석 (메인 함수)
 * @param {Object} asrsAnswers - ASRS 답변
 * @param {Object} impairmentAnswers - 기능 저하 답변
 * @param {Object} wursAnswers - WURS 답변
 * @returns {Object} 종합 결과
 */
export function calculateAllScores(
  asrsAnswers,
  impairmentAnswers,
  wursAnswers
) {
  const asrs = calculateASRS(asrsAnswers);
  const impairment = calculateImpairment(impairmentAnswers);
  const wurs = calculateWURS(wursAnswers);
  const comprehensive = interpretComprehensive(asrs, impairment, wurs);

  return {
    asrs,
    impairment,
    wurs,
    comprehensive,
    calculatedAt: new Date().toISOString(),
  };
}


