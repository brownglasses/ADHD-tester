/**
 * WURS (Wender Utah Rating Scale) 질문 데이터
 * 
 * 아동기(7-10세) ADHD 증상 회상 검사
 * - 총 25문항
 * - 5점 척도 (0-4점)
 * - 출처: Wender Utah Rating Scale (1993)
 */

// WURS 25문항
export const WURS_QUESTIONS = [
  {
    id: 1,
    question: "집중력 문제가 있었다 (집중하기 어려웠다)",
    category: "주의력",
  },
  {
    id: 2,
    question: "불안했거나 걱정이 많았다",
    category: "정서",
  },
  {
    id: 3,
    question: "신경질적이었거나 안절부절 못했다",
    category: "과잉행동",
  },
  {
    id: 4,
    question: "주의력이 부족했다 (쉽게 산만해졌다)",
    category: "주의력",
  },
  {
    id: 5,
    question: "화를 잘 냈다",
    category: "정서",
  },
  {
    id: 6,
    question: "슬프거나 우울했다",
    category: "정서",
  },
  {
    id: 7,
    question: "감정 기복이 심했다 (기분이 자주 바뀌었다)",
    category: "정서",
  },
  {
    id: 8,
    question: "화를 내거나 짜증을 부렸다",
    category: "정서",
  },
  {
    id: 9,
    question: "고집이 세거나 완고했다",
    category: "행동",
  },
  {
    id: 10,
    question: "슬프거나 불행했다",
    category: "정서",
  },
  {
    id: 11,
    question: "불복종했다 (말을 잘 듣지 않았다)",
    category: "행동",
  },
  {
    id: 12,
    question: "자존감이 낮았다 (자신감이 부족했다)",
    category: "정서",
  },
  {
    id: 13,
    question: "짜증을 잘 냈다",
    category: "정서",
  },
  {
    id: 14,
    question: "기분이 자주 바뀌었다",
    category: "정서",
  },
  {
    id: 15,
    question: "화를 잘 냈다 (분노 조절이 어려웠다)",
    category: "정서",
  },
  {
    id: 16,
    question: "충동적이었다 (생각 없이 행동했다)",
    category: "충동성",
  },
  {
    id: 17,
    question: "과잉행동이 있었다 (가만히 있지 못했다)",
    category: "과잉행동",
  },
  {
    id: 18,
    question: "학교 성적이 나빴다 또는 학습 문제가 있었다",
    category: "학업",
  },
  {
    id: 19,
    question: "학교에 적응하기 어려웠다",
    category: "학업",
  },
  {
    id: 20,
    question: "친구들과 어울리기 어려웠다",
    category: "사회성",
  },
  {
    id: 21,
    question: "놀림을 받거나 괴롭힘을 당했다",
    category: "사회성",
  },
  {
    id: 22,
    question: "반사회적 행동을 했다 (거짓말, 싸움 등)",
    category: "행동",
  },
  {
    id: 23,
    question: "형제자매나 친구들과 싸웠다",
    category: "사회성",
  },
  {
    id: 24,
    question: "조직화/정리가 어려웠다",
    category: "주의력",
  },
  {
    id: 25,
    question: "과제나 일을 끝까지 마치기 어려웠다",
    category: "주의력",
  },
];

// WURS 답변 옵션 (0-4점 척도)
export const WURS_OPTIONS = [
  { value: 0, label: "전혀 없었다" },
  { value: 1, label: "약간 있었다" },
  { value: 2, label: "보통이었다" },
  { value: 3, label: "많이 있었다" },
  { value: 4, label: "매우 심했다" },
];

// WURS 지시문
export const WURS_INSTRUCTION = `다음은 **7-10세 사이의 어린 시절**을 떠올리며 답해주세요.

당시 자신의 행동과 감정이 어땠는지, 최대한 솔직하게 응답해 주시기 바랍니다.

**기억이 잘 나지 않는다면:**
- 부모님이나 형제자매의 이야기를 참고하셔도 됩니다
- 어렴풋이 기억나는 것이 있다면 그것을 바탕으로 응답하세요
- 전혀 기억이 나지 않으면 "전혀 없었다"를 선택하세요`;

// WURS 점수 해석 기준
export const WURS_THRESHOLD = {
  low: 36,      // 36점 미만: 낮음
  moderate: 46, // 36-45점: 중간
  high: 46,     // 46점 이상: 높음
};

// WURS 결과 메시지
export const WURS_RESULT_MESSAGES = {
  low: {
    title: "아동기 ADHD 증상: 낮음",
    description: "7-10세 시절 ADHD 증상이 거의 나타나지 않았던 것으로 보입니다.",
    color: "success",
  },
  moderate: {
    title: "아동기 ADHD 증상: 중간",
    description: "7-10세 시절 일부 ADHD 증상이 있었던 것으로 보입니다. 전문가 상담을 권장합니다.",
    color: "warning",
  },
  high: {
    title: "아동기 ADHD 증상: 높음",
    description: "7-10세 시절 뚜렷한 ADHD 증상이 있었던 것으로 보입니다. 전문의 진단을 강력히 권장합니다.",
    color: "danger",
  },
};

// WURS 카테고리별 분류
export const WURS_CATEGORIES = {
  attention: "주의력",
  hyperactivity: "과잉행동",
  impulsivity: "충동성",
  emotion: "정서",
  behavior: "행동",
  social: "사회성",
  academic: "학업",
};

// WURS 힌트
export const WURS_HINT = "💡 기억이 잘 나지 않는다면 부모님께 여쭤보거나, 어렴풋이 기억나는 것을 바탕으로 응답하세요.";

