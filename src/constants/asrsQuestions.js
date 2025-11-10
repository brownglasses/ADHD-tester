/**
 * ASRS (Adult ADHD Self-Report Scale) 질문 데이터
 * WHO에서 개발한 성인 ADHD 자가보고 척도 v1.1
 * 
 * 표준 ASRS 18문항으로 구성:
 * - Part A: 핵심 증상 (6문항)
 * - Part B: 추가 증상 (12문항)
 */

/**
 * ASRS Part A - 1차 핵심 증상 (6문항)
 * 부주의 증상을 평가하는 핵심 질문
 */
export const ASRS_PART_A = [
  {
    id: 1,
    question: "어떤 일의 세부적인 사항에 대해 주의를 기울이지 못하거나, 부주의한 실수를 저지르는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "A",
  },
  {
    id: 2,
    question: "주의력을 지속적으로 유지하는 데 어려움을 겪는 경우가 얼마나 자주 있습니까? (예: 대화, 독서, 긴 분량의 과제)",
    category: "부주의",
    part: "A",
  },
  {
    id: 3,
    question: "다른 사람이 직접 이야기할 때, 마치 딴생각을 하는 것처럼 보여 경청하지 않는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "A",
  },
  {
    id: 4,
    question: "지시 사항을 끝까지 따르지 못하고, 일이나 과제를 마무리 짓지 못하는 경우가 얼마나 자주 있습니까? (예: 시작은 하지만 금방 집중력을 잃음)",
    category: "부주의",
    part: "A",
  },
  {
    id: 5,
    question: "체계가 필요한 과제나 활동(예: 보고서 작성, 서류 정리, 마감일 준수)을 조직화하는 데 어려움을 겪는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "A",
  },
  {
    id: 6,
    question: "지속적인 정신적 노력이 필요한 일(예: 학업, 서류 작업)을 피하거나 망설이는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "A",
  },
];

/**
 * ASRS Part B - 추가 증상 (12문항)
 * 부주의, 과잉행동, 충동성을 평가하는 추가 질문
 */
export const ASRS_PART_B = [
  {
    id: 7,
    question: "과제나 활동에 필요한 물건(예: 학용품, 열쇠, 지갑, 서류, 안경, 휴대폰)을 잃어버리는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "B",
  },
  {
    id: 8,
    question: "외부의 자극(주변의 소리나 광경)에 의해 쉽게 산만해지는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "B",
  },
  {
    id: 9,
    question: "일상적으로 해야 할 일(예: 약속 지키기, 청구서 납부하기)을 잊어버리는 경우가 얼마나 자주 있습니까?",
    category: "부주의",
    part: "B",
  },
  {
    id: 10,
    question: "가만히 앉아 있는 동안에도 손발을 만지작거리거나 몸을 꿈틀거리는 경우가 얼마나 자주 있습니까?",
    category: "과잉행동",
    part: "B",
  },
  {
    id: 11,
    question: "가만히 앉아 있어야 하는 상황(예: 회의, 강의)에서 자리를 뜨는 경우가 얼마나 자주 있습니까?",
    category: "과잉행동",
    part: "B",
  },
  {
    id: 12,
    question: "안절부절못하거나 '가만히 있기 힘든' 느낌을 받는 경우가 얼마나 자주 있습니까?",
    category: "과잉행동",
    part: "B",
  },
  {
    id: 13,
    question: "조용히 여가 활동에 참여하거나 즐기기 어려운 경우가 얼마나 자주 있습니까?",
    category: "과잉행동",
    part: "B",
  },
  {
    id: 14,
    question: "마치 '모터가 달린 것처럼' 끊임없이 움직이거나, 너무 오래 가만히 있으면 불편함을 느끼는 경우가 얼마나 자주 있습니까?",
    category: "과잉행동",
    part: "B",
  },
  {
    id: 15,
    question: "지나치게 말을 많이 하는 경우가 얼마나 자주 있습니까?",
    category: "충동성",
    part: "B",
  },
  {
    id: 16,
    question: "대화 중에 질문이 채 끝나기도 전에 성급하게 대답하는 경우가 얼마나 자주 있습니까?",
    category: "충동성",
    part: "B",
  },
  {
    id: 17,
    question: "자신의 차례를 기다리기 어려운 경우가 얼마나 자주 있습니까?",
    category: "충동성",
    part: "B",
  },
  {
    id: 18,
    question: "다른 사람의 활동(대화나 게임 등)에 불쑥 끼어들거나 방해하는 경우가 얼마나 자주 있습니까?",
    category: "충동성",
    part: "B",
  },
];

/**
 * 전체 ASRS 질문 (Part A + Part B)
 */
export const ASRS_QUESTIONS = [...ASRS_PART_A, ...ASRS_PART_B];

/**
 * 기능 저하 평가 질문 (DSM-5 진단 기준 'D항')
 */
export const IMPAIRMENT_QUESTIONS = [
  {
    id: 1,
    question: "학업 성취나 업무 성과가 기대치보다 현저히 낮거나, 잠재력을 발휘하는 데 심각한 어려움을 겪고 있습니까?",
    category: "학업/직업",
    domain: "academic_work",
  },
  {
    id: 2,
    question: "가족, 친구, 연인과의 관계를 시작하거나 유지하는 데 심각한 문제가 반복되고 있습니까?",
    category: "대인 관계",
    domain: "relationship",
  },
  {
    id: 3,
    question: "시간 약속, 금전 관리, 집안일, 마감일 준수 등 스스로의 삶을 꾸리고 관리하는 데 큰 어려움이 있습니까?",
    category: "일상 관리",
    domain: "daily_life",
  },
];

/**
 * 응답 옵션 (0-4점 척도)
 */
export const ASRS_OPTIONS = [
  { value: 0, label: "전혀 없음" },
  { value: 1, label: "드물게" },
  { value: 2, label: "가끔" },
  { value: 3, label: "자주" },
  { value: 4, label: "매우 자주" },
];

/**
 * 기능 저하 평가 응답 옵션 (예/아니오)
 */
export const IMPAIRMENT_OPTIONS = [
  { value: "yes", label: "예" },
  { value: "no", label: "아니오" },
];

/**
 * ASRS 검사 지시문
 */
export const ASRS_INSTRUCTION = 
  "다음 질문들은 지난 6개월 동안 귀하가 어떻게 느끼고 행동했는지를 알아보기 위한 것입니다. 각 질문을 잘 읽고, 귀하에게 가장 잘 해당되는 칸에 표시해 주십시오.";

/**
 * 기능 저하 평가 지시문
 */
export const IMPAIRMENT_INSTRUCTION = 
  "앞서 답한 증상들로 인해, 귀하의 실제 삶에 다음과 같은 어려움이 지속적으로 발생하고 있습니까?";

// ===== 결과 해석 기준 =====

/**
 * ASRS Part A 결과 해석 기준
 * 4개 이상 (자주 또는 매우 자주): ADHD 가능성 높음
 */
export const ASRS_PART_A_THRESHOLD = 4;

/**
 * ASRS 전체 점수 해석 기준
 * 총점 기준 (참고용)
 */
export const ASRS_TOTAL_THRESHOLD = {
  low: 24,    // 24점 미만: 낮은 가능성
  medium: 48, // 24-48점: 중간 가능성
  high: 48,   // 48점 이상: 높은 가능성
};

/**
 * ASRS 결과 메시지
 */
export const ASRS_RESULT_MESSAGES = {
  high: {
    title: "ADHD 증상 가능성이 확인되었습니다",
    description:
      "검사 결과 ADHD 증상이 확인되었습니다. 정확한 평가를 위해 정신건강의학과 전문의 상담을 권장드립니다.",
    emoji: "🔔",
  },
  medium: {
    title: "ADHD 증상이 일부 확인되었습니다",
    description:
      "일부 ADHD 증상이 확인되었습니다. 일상생활에 불편함이 있다면 전문의 상담을 고려해 보세요.",
    emoji: "💡",
  },
  low: {
    title: "ADHD 증상 가능성이 낮습니다",
    description:
      "검사 결과 ADHD 증상이 뚜렷하게 나타나지 않았습니다. 다만 일상생활에 어려움이 있다면 전문의 상담을 고려해 보세요.",
    emoji: "✅",
  },
};


