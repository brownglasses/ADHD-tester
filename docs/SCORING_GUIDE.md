# 📊 ADHD 스크리닝 점수 계산 및 해석 가이드

> **작성일:** 2025-01-09  
> **버전:** 1.0.0  
> **목적:** ASRS, 기능 저하 평가, WURS 점수 계산 로직 및 의학적 근거 제공

---

## 📋 목차

1. [개요](#개요)
2. [ASRS 점수 계산](#asrs-점수-계산)
3. [기능 저하 평가](#기능-저하-평가)
4. [WURS 점수 계산](#wurs-점수-계산)
5. [종합 해석 로직](#종합-해석-로직)
6. [코드 구현 예시](#코드-구현-예시)

---

## 개요

### 검사 구성

```
총 46문항, 약 15-20분 소요

1. ASRS (18문항) → 현재 증상 평가
2. 기능 저하 평가 (3문항) → DSM-5 기준 D항
3. WURS (25문항) → 아동기 증상 회상

→ 종합 결과 분석
```

### 의학적 근거

| 검사           | 출처                                   | 공식 문서                                               |
| -------------- | -------------------------------------- | ------------------------------------------------------- |
| **ASRS-v1.1**  | WHO (World Health Organization)        | WHO Composite International Diagnostic Interview (2001) |
| **DSM-5 기준** | APA (American Psychiatric Association) | DSM-5 (2013), DSM-5-TR (2022)                           |
| **WURS-25**    | Ward, Wender, Reimherr (1993)          | American Journal of Psychiatry, 150:885-890             |

### ⚠️ 중요 원칙

1. **"진단" 용어 절대 금지** → "선별", "가능성", "평가" 사용
2. **Disclaimer 필수 표시** → 의학적 진단 아님 명시
3. **전문의 상담 권장** → 모든 결과에 권장사항 포함
4. **과학적 근거 명시** → 출처 및 기준 투명하게 공개

---

## ASRS 점수 계산

### 1. ASRS 구조

```
ASRS-v1.1 (WHO 공식 버전)
├── Part A: 핵심 증상 (6문항)
│   └── 가장 예측력 높은 질문
└── Part B: 추가 증상 (12문항)
    └── DSM 기준 기반 추가 질문

총 18문항, 각 0-4점 척도
```

### 2. 답변 척도

| 점수    | 라벨      | 설명       |
| ------- | --------- | ---------- |
| **0점** | 전혀 없음 | Never      |
| **1점** | 드물게    | Rarely     |
| **2점** | 가끔      | Sometimes  |
| **3점** | 자주      | Often      |
| **4점** | 매우 자주 | Very Often |

### 3. 점수 계산 방법

#### 3-1. Part A 점수 (0-24점)

```javascript
// Part A: 질문 1-6번
const partAScore =
  answers[1] + answers[2] + answers[3] + answers[4] + answers[5] + answers[6];

// 범위: 0-24점
```

#### 3-2. Part B 점수 (0-48점)

```javascript
// Part B: 질문 7-18번
const partBScore =
  answers[7] +
  answers[8] +
  answers[9] +
  answers[10] +
  answers[11] +
  answers[12] +
  answers[13] +
  answers[14] +
  answers[15] +
  answers[16] +
  answers[17] +
  answers[18];

// 범위: 0-48점
```

#### 3-3. 전체 점수 (0-72점)

```javascript
const totalScore = partAScore + partBScore;

// 범위: 0-72점
```

### 4. 해석 기준 (의학적 근거)

#### 4-1. Part A 기준 (Primary Screening)

**✅ Part A가 가장 중요** (Harvard Medical School, 2024)

| Part A 점수   | 해석            | 의학적 의미                      |
| ------------- | --------------- | -------------------------------- |
| **14점 이상** | **높은 가능성** | ADHD 양성 선별 (Screen Positive) |
| **10-13점**   | 중간 (음성)     | 고위험 음성 (High Negative)      |
| **0-9점**     | 낮음            | 저위험 음성 (Low Negative)       |

**근거:**

- Kessler et al. (2007): Part A cutoff ≥14점 = 최적 민감도/특이도
- 2024년 WHO/Harvard 권장 기준: 0-24점 척도 사용

#### 4-2. 전체 점수 기준 (참고용)

| 전체 점수 (0-72) | 해석          | 설명                       |
| ---------------- | ------------- | -------------------------- |
| **48점 이상**    | 높은 가능성   | 뚜렷한 ADHD 증상 패턴      |
| **36-47점**      | 중간 가능성   | 일부 ADHD 증상 확인        |
| **24-35점**      | 경미한 가능성 | 경미한 증상 또는 주의 필요 |
| **24점 미만**    | 낮은 가능성   | ADHD 가능성 낮음           |

**참고:** 전체 점수는 보조 지표이며, **Part A가 1차 선별 기준**입니다.

### 5. ADHD 하위 유형 분류

#### 5-1. 부주의형 (Inattentive)

```javascript
// 부주의 문항: 1-9번
const inattentionScore =
  answers[1] +
  answers[2] +
  answers[3] +
  answers[4] +
  answers[5] +
  answers[6] +
  answers[7] +
  answers[8] +
  answers[9];

// 최대: 36점
// 18점 이상: 부주의 우세형
```

#### 5-2. 과잉행동-충동형 (Hyperactive-Impulsive)

```javascript
// 과잉행동/충동성 문항: 10-18번
const hyperactivityScore =
  answers[10] +
  answers[11] +
  answers[12] +
  answers[13] +
  answers[14] +
  answers[15] +
  answers[16] +
  answers[17] +
  answers[18];

// 최대: 36점
// 18점 이상: 과잉행동-충동 우세형
```

#### 5-3. 복합형 (Combined)

```
inattentionScore >= 18 && hyperactivityScore >= 18
→ 복합형 (Combined Type)
```

---

## 기능 저하 평가

### 1. DSM-5 진단 기준 'D항'

```
DSM-5 ADHD 진단 기준 (2013, 2022)

Criterion D:
"증상이 2개 이상의 환경(예: 학교/직장, 가정, 사회적 상황)에서
사회적, 학업적, 또는 직업적 기능에 분명한 장애를 초래해야 한다."
```

**핵심:** 증상만으로는 불충분 → **실제 삶의 어려움** 필수 확인

### 2. 평가 영역 (3문항)

| 질문 ID | 영역      | 평가 내용                          |
| ------- | --------- | ---------------------------------- |
| **1번** | 학업/직업 | 성취도 저하, 잠재력 발휘 어려움    |
| **2번** | 대인 관계 | 관계 시작/유지의 반복적 문제       |
| **3번** | 일상 관리 | 시간/금전 관리, 마감일 준수 어려움 |

### 3. 답변 척도

```
예/아니오 (Yes/No) 이분법
- "예" (yes) = 해당 영역에서 유의미한 기능 저하 있음
- "아니오" (no) = 기능 저하 없거나 경미함
```

### 4. 해석 기준

#### 4-1. 점수 계산

```javascript
// "예" 응답 개수 계산
const impairmentCount =
  (answers[1] === "yes" ? 1 : 0) +
  (answers[2] === "yes" ? 1 : 0) +
  (answers[3] === "yes" ? 1 : 0);

// 범위: 0-3개
```

#### 4-2. 해석

| "예" 개수 | 해석               | DSM-5 기준 충족            |
| --------- | ------------------ | -------------------------- |
| **3개**   | 심각한 기능 저하   | ✅ 충족 (모든 영역)        |
| **2개**   | 유의미한 기능 저하 | ✅ 충족 (2개 영역)         |
| **1개**   | 경미한 기능 저하   | ⚠️ 불충분 (추가 평가 필요) |
| **0개**   | 기능 저하 없음     | ❌ 미충족                  |

**DSM-5 진단 요건:**

- **최소 2개 이상의 영역**에서 기능 저하 필요
- 1개 이하 = ADHD 진단 불가 (증상만으로는 부족)

### 5. 의학적 의미

```
ASRS 점수가 높아도 기능 저하가 없으면?
→ ADHD 진단 불가 (DSM-5 기준 미충족)

기능 저하 ≥ 2개 영역 + ASRS 양성
→ ADHD 가능성 매우 높음 (전문의 상담 강력 권장)
```

---

## WURS 점수 계산

### 1. WURS-25 구조

```
WURS-25 (Wender Utah Rating Scale - 25 item version)
- 총 25문항
- 아동기 (7-10세) 증상 회상
- 5점 척도 (0-4점)
- 최대 점수: 100점
```

**목적:** DSM-5 기준 'B항' 충족 확인

```
Criterion B:
"여러 부주의 또는 과잉행동-충동 증상이 12세 이전에 존재했어야 한다."
```

### 2. 답변 척도

| 점수    | 라벨        | 설명        |
| ------- | ----------- | ----------- |
| **0점** | 전혀 없었다 | Not at all  |
| **1점** | 약간 있었다 | Mildly      |
| **2점** | 보통이었다  | Moderately  |
| **3점** | 많이 있었다 | Quite a bit |
| **4점** | 매우 심했다 | Very much   |

### 3. 점수 계산

```javascript
// 전체 25문항 합산
let wursTotal = 0;
for (let i = 1; i <= 25; i++) {
  wursTotal += answers[i]; // 각 0-4점
}

// 범위: 0-100점
```

### 4. 해석 기준 (의학적 근거)

#### 4-1. Cutoff 점수

| WURS 총점     | 해석     | 의학적 의미             | 민감도/특이도         |
| ------------- | -------- | ----------------------- | --------------------- |
| **46점 이상** | **높음** | 아동기 ADHD 강력히 시사 | 85% / 76%             |
| **36-45점**   | 중간     | 일부 아동기 증상 확인   | 96% / 96% (cutoff 36) |
| **36점 미만** | 낮음     | 아동기 ADHD 가능성 낮음 | -                     |

**근거:**

- Ward et al. (1993): Original cutoff = 46점
- Sensitivity 85%, Specificity 76% (cutoff ≥46)
- Alternative cutoff = 36점 (더 높은 민감도)

#### 4-2. 우리 프로젝트 기준

```javascript
function interpretWURS(score) {
  if (score >= 46) {
    return {
      level: "high",
      title: "아동기 ADHD 증상: 높음",
      description: "7-10세 시절 뚜렷한 ADHD 증상이 있었던 것으로 보입니다.",
      recommendation:
        "성인 ADHD 가능성이 높습니다. 전문의 진단을 강력히 권장합니다.",
      dsmCriterionB: "충족", // DSM-5 Criterion B
    };
  } else if (score >= 36) {
    return {
      level: "moderate",
      title: "아동기 ADHD 증상: 중간",
      description: "7-10세 시절 일부 ADHD 증상이 있었던 것으로 보입니다.",
      recommendation: "전문가 상담을 권장합니다.",
      dsmCriterionB: "부분 충족",
    };
  } else {
    return {
      level: "low",
      title: "아동기 ADHD 증상: 낮음",
      description:
        "7-10세 시절 ADHD 증상이 거의 나타나지 않았던 것으로 보입니다.",
      recommendation: "아동기 ADHD 가능성은 낮습니다.",
      dsmCriterionB: "미충족",
    };
  }
}
```

### 5. 카테고리별 분석 (선택사항)

```javascript
// 카테고리별 점수 계산 (더 상세한 분석)
const categories = {
  attention: [1, 4, 24, 25], // 주의력 (4문항)
  hyperactivity: [3, 17], // 과잉행동 (2문항)
  impulsivity: [16], // 충동성 (1문항)
  emotion: [2, 5, 6, 7, 8, 10, 12, 13, 14, 15], // 정서 (10문항)
  behavior: [9, 11, 22], // 행동 (3문항)
  social: [20, 21, 23], // 사회성 (3문항)
  academic: [18, 19], // 학업 (2문항)
};

function getCategoryScores(answers) {
  const scores = {};
  for (const [category, items] of Object.entries(categories)) {
    scores[category] = items.reduce((sum, id) => sum + answers[id], 0);
  }
  return scores;
}
```

---

## 종합 해석 로직

### 1. DSM-5 진단 기준 (참고용)

```
DSM-5 성인 ADHD 진단 기준 (APA, 2013)

✅ Criterion A: 증상 (5개 이상, 6개월 이상)
   - 부주의 또는 과잉행동-충동 증상

✅ Criterion B: 발병 시기
   - 12세 이전 증상 시작

✅ Criterion C: 환경
   - 2개 이상 환경에서 증상 존재

✅ Criterion D: 기능 저하
   - 사회적/학업적/직업적 기능 장애

✅ Criterion E: 배제
   - 다른 정신질환으로 설명되지 않음
```

**⚠️ 주의:** 우리는 진단하지 않습니다. 선별만 합니다.

### 2. 종합 점수 계산 함수

```javascript
/**
 * 종합 ADHD 선별 결과 계산
 * @param {Object} asrsAnswers - ASRS 답변 (1-18번)
 * @param {Object} impairmentAnswers - 기능 저하 답변 (1-3번)
 * @param {Object} wursAnswers - WURS 답변 (1-25번)
 * @returns {Object} 종합 결과 및 해석
 */
function calculateComprehensiveResult(
  asrsAnswers,
  impairmentAnswers,
  wursAnswers
) {
  // 1. ASRS 점수 계산
  const asrsResult = calculateASRS(asrsAnswers);

  // 2. 기능 저하 평가
  const impairmentResult = calculateImpairment(impairmentAnswers);

  // 3. WURS 점수 계산
  const wursResult = calculateWURS(wursAnswers);

  // 4. 종합 해석
  const comprehensiveInterpretation = interpretComprehensive(
    asrsResult,
    impairmentResult,
    wursResult
  );

  return {
    asrs: asrsResult,
    impairment: impairmentResult,
    wurs: wursResult,
    comprehensive: comprehensiveInterpretation,
    timestamp: new Date().toISOString(),
  };
}
```

### 3. ASRS 계산 함수

```javascript
function calculateASRS(answers) {
  // Part A 점수 (1-6번)
  const partAScore = [1, 2, 3, 4, 5, 6].reduce(
    (sum, id) => sum + (answers[id] || 0),
    0
  );

  // Part B 점수 (7-18번)
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

  // 해석
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
```

### 4. 기능 저하 계산 함수

```javascript
function calculateImpairment(answers) {
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
```

### 5. WURS 계산 함수

```javascript
function calculateWURS(answers) {
  // 전체 점수
  const totalScore = Object.values(answers).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  // 카테고리별 점수 (선택사항)
  const categories = {
    attention: [1, 4, 24, 25],
    hyperactivity: [3, 17],
    impulsivity: [16],
    emotion: [2, 5, 6, 7, 8, 10, 12, 13, 14, 15],
    behavior: [9, 11, 22],
    social: [20, 21, 23],
    academic: [18, 19],
  };

  const categoryScores = {};
  for (const [category, items] of Object.entries(categories)) {
    categoryScores[category] = items.reduce(
      (sum, id) => sum + (answers[id] || 0),
      0
    );
  }

  // 해석
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
    categoryScores, // 카테고리별 상세
    interpretation, // "low" | "moderate" | "high"
    description,
    recommendation,
    criterionB: totalScore >= 36 ? "충족" : "미충족", // DSM-5 Criterion B
  };
}
```

### 6. 종합 해석 함수

```javascript
function interpretComprehensive(asrsResult, impairmentResult, wursResult) {
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
```

### 7. 다음 단계 권장사항

```javascript
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
```

---

## 코드 구현 예시

### 1. Zustand Store 활용

```javascript
// src/utils/scoring.js

import {
  ASRS_PART_A_THRESHOLD,
  ASRS_TOTAL_THRESHOLD,
  WURS_THRESHOLD,
} from "@constants/asrsQuestions";

/**
 * 전체 점수 계산 및 해석
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

// (위 함수들 포함)
```

### 2. Result 페이지에서 사용

```javascript
// src/pages/Result/Result.jsx

import { useEffect, useState } from "react";
import useTestStore from "@store/useTestStore";
import { calculateAllScores } from "@utils/scoring";

function Result() {
  const [result, setResult] = useState(null);

  const asrsAnswers = useTestStore((state) => state.asrs.answers);
  const impairmentAnswers = useTestStore((state) => state.impairment.answers);
  const wursAnswers = useTestStore((state) => state.wurs.answers);

  useEffect(() => {
    // 점수 계산
    const calculatedResult = calculateAllScores(
      asrsAnswers,
      impairmentAnswers,
      wursAnswers
    );

    setResult(calculatedResult);

    // Zustand에 저장
    useTestStore
      .getState()
      .completeAsrs(
        calculatedResult.asrs.totalScore,
        calculatedResult.asrs.interpretation
      );

    useTestStore
      .getState()
      .completeWurs(
        calculatedResult.wurs.totalScore,
        calculatedResult.wurs.interpretation
      );
  }, []);

  if (!result) return <div>계산 중...</div>;

  return (
    <Container>
      {/* ASRS 결과 */}
      <ScoreCard>
        <h2>ASRS 결과</h2>
        <Score>{result.asrs.totalScore} / 72점</Score>
        <RiskLevel level={result.asrs.interpretation}>
          {result.asrs.riskLevel}
        </RiskLevel>
      </ScoreCard>

      {/* 기능 저하 결과 */}
      <ScoreCard>
        <h2>기능 저하 평가</h2>
        <YesCount>{result.impairment.yesCount} / 3개 영역</YesCount>
        <Description>{result.impairment.description}</Description>
      </ScoreCard>

      {/* WURS 결과 */}
      <ScoreCard>
        <h2>WURS 결과</h2>
        <Score>{result.wurs.totalScore} / 100점</Score>
        <Description>{result.wurs.description}</Description>
      </ScoreCard>

      {/* 종합 해석 */}
      <ComprehensiveCard urgency={result.comprehensive.urgency}>
        <Title>{result.comprehensive.title}</Title>
        <Message>{result.comprehensive.message}</Message>

        {/* 다음 단계 */}
        <NextSteps>
          {result.comprehensive.nextSteps.map((step, index) => (
            <Step key={index} urgent={step.urgent}>
              <StepIcon>{step.icon}</StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Step>
          ))}
        </NextSteps>
      </ComprehensiveCard>
    </Container>
  );
}
```

---

## 추가 기능 구현 가이드

### 1. PDF 다운로드 (결과 저장)

#### 1-1. 필요 라이브러리

```bash
npm install jspdf jspdf-autotable
```

#### 1-2. PDF 생성 함수

```javascript
// src/utils/pdfGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * 검사 결과를 PDF로 생성
 * @param {Object} result - calculateAllScores()의 결과
 * @param {Object} userInfo - 사용자 정보 (이름, 날짜 등)
 */
export function generateResultPDF(result, userInfo = {}) {
  const doc = new jsPDF();
  const { asrs, impairment, wurs, comprehensive } = result;

  // 한글 폰트 설정 (필요시)
  // doc.addFont('NanumGothic.ttf', 'NanumGothic', 'normal');
  // doc.setFont('NanumGothic');

  // 1. 헤더
  doc.setFontSize(20);
  doc.text("ADHD 자가 스크리닝 결과", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text(`검사일: ${new Date().toLocaleDateString("ko-KR")}`, 105, 30, {
    align: "center",
  });

  // 2. Disclaimer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "※ 이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.",
    105,
    40,
    { align: "center" }
  );
  doc.setTextColor(0, 0, 0);

  let yPosition = 55;

  // 3. 종합 결과
  doc.setFontSize(14);
  doc.setFillColor(150, 190, 128); // primaryLight
  doc.rect(15, yPosition - 5, 180, 10, "F");
  doc.text("종합 평가", 105, yPosition, { align: "center" });
  yPosition += 15;

  doc.setFontSize(12);
  doc.text(comprehensive.title, 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  const messageLines = doc.splitTextToSize(comprehensive.message, 170);
  doc.text(messageLines, 20, yPosition);
  yPosition += messageLines.length * 7 + 10;

  // 4. 상세 점수
  doc.autoTable({
    startY: yPosition,
    head: [["검사", "점수", "해석"]],
    body: [
      [
        "ASRS (현재 증상)",
        `${asrs.totalScore} / 72점\n(Part A: ${asrs.partAScore}/24)`,
        asrs.riskLevel,
      ],
      [
        "기능 저하 평가",
        `${impairment.yesCount} / 3개 영역`,
        impairment.description,
      ],
      ["WURS (아동기 증상)", `${wurs.totalScore} / 100점`, wurs.description],
    ],
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [150, 190, 128] },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // 5. DSM-5 기준 충족 여부
  doc.setFontSize(12);
  doc.text("DSM-5 진단 기준 충족 여부", 20, yPosition);
  yPosition += 10;

  doc.autoTable({
    startY: yPosition,
    head: [["기준", "내용", "상태"]],
    body: [
      ["Criterion A", "현재 증상 (ASRS)", comprehensive.dsmCriteria.A],
      ["Criterion B", "12세 이전 발병 (WURS)", comprehensive.dsmCriteria.B],
      ["Criterion D", "기능 저하 (2개 이상 영역)", comprehensive.dsmCriteria.D],
    ],
    theme: "striped",
    styles: { fontSize: 9, cellPadding: 4 },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // 6. 하위 유형 (ASRS)
  if (asrs.subtype !== "unknown") {
    doc.setFontSize(10);
    doc.text(`ADHD 하위 유형: ${getSubtypeLabel(asrs.subtype)}`, 20, yPosition);
    yPosition += 7;
    doc.text(`부주의 점수: ${asrs.inattentionScore}/36`, 25, yPosition);
    yPosition += 7;
    doc.text(
      `과잉행동-충동 점수: ${asrs.hyperactivityScore}/36`,
      25,
      yPosition
    );
    yPosition += 15;
  }

  // 7. 다음 단계 권장사항
  doc.setFontSize(12);
  doc.text("권장 사항", 20, yPosition);
  yPosition += 10;

  comprehensive.nextSteps.forEach((step, index) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(10);
    doc.text(`${step.icon} ${step.title}`, 20, yPosition);
    yPosition += 7;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(step.description, 25, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
  });

  // 8. 푸터
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`${i} / ${pageCount}`, 105, 290, { align: "center" });
    doc.text(
      "본 결과는 의학적 진단이 아니며, 전문의 상담을 권장합니다.",
      105,
      285,
      { align: "center" }
    );
  }

  // PDF 저장
  const filename = `ADHD_검사결과_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  doc.save(filename);
}

function getSubtypeLabel(subtype) {
  const labels = {
    inattentive: "부주의형 우세",
    hyperactive: "과잉행동-충동형 우세",
    combined: "복합형",
  };
  return labels[subtype] || subtype;
}
```

#### 1-3. Result 페이지에서 사용

```javascript
import { generateResultPDF } from "@utils/pdfGenerator";

function Result() {
  const [result, setResult] = useState(null);

  const handleDownloadPDF = () => {
    if (!result) return;

    generateResultPDF(result, {
      name: "익명",
      date: new Date(),
    });
  };

  return (
    <Container>
      {/* 결과 표시 */}

      <ButtonGroup>
        <Button onClick={handleDownloadPDF} variant="accent">
          📄 PDF로 저장하기
        </Button>
        <Button onClick={() => navigate(ROUTES.HOSPITAL)}>🏢 병원 찾기</Button>
      </ButtonGroup>
    </Container>
  );
}
```

---

### 2. 카테고리별 상세 분석

#### 2-1. ASRS 카테고리별 분석

```javascript
// src/utils/categoryAnalysis.js

/**
 * ASRS 카테고리별 상세 분석
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
```

#### 2-2. 카테고리 분석 표시 컴포넌트

```javascript
// src/components/CategoryAnalysis.jsx

function CategoryAnalysis({ categories, type = "asrs" }) {
  return (
    <AnalysisContainer>
      <SectionTitle>
        {type === "asrs" ? "ASRS 영역별 분석" : "WURS 카테고리별 분석"}
      </SectionTitle>

      {Object.entries(categories).map(([key, category]) => (
        <CategoryCard key={key}>
          <CategoryHeader>
            {category.icon && <CategoryIcon>{category.icon}</CategoryIcon>}
            <CategoryName>{category.name}</CategoryName>
            <CategoryScore>
              {category.score} / {category.maxScore}
              <Percentage>({category.percentage}%)</Percentage>
            </CategoryScore>
          </CategoryHeader>

          <ProgressBarWrapper>
            <ProgressFill
              percentage={category.percentage}
              level={category.level || getCategoryLevel(category.percentage)}
            />
          </ProgressBarWrapper>

          {category.description && (
            <CategoryDescription>{category.description}</CategoryDescription>
          )}
        </CategoryCard>
      ))}
    </AnalysisContainer>
  );
}

const getCategoryLevel = (percentage) => {
  if (percentage >= 75) return "high";
  if (percentage >= 50) return "moderate";
  return "low";
};
```

---

### 3. 시각화 차트

#### 3-1. 필요 라이브러리

```bash
npm install recharts
```

#### 3-2. 레이더 차트 (ASRS 영역별)

```javascript
// src/components/charts/AsrsRadarChart.jsx

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function AsrsRadarChart({ categoryAnalysis }) {
  const data = Object.values(categoryAnalysis).map((cat) => ({
    category: cat.name,
    value: cat.percentage,
    fullMark: 100,
  }));

  return (
    <ChartContainer>
      <ChartTitle>ASRS 영역별 프로필</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#E1E8DD" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "#3D4A3D", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#6B7B6B", fontSize: 10 }}
          />
          <Radar
            name="점수"
            dataKey="value"
            stroke="#96BE80"
            fill="#96BE80"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      <ChartLegend>
        <LegendItem>
          <LegendColor color="#96BE80" />
          <LegendText>현재 증상 수준</LegendText>
        </LegendItem>
      </ChartLegend>
    </ChartContainer>
  );
}
```

#### 3-3. 바 차트 (WURS 카테고리별)

```javascript
// src/components/charts/WursBarChart.jsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

function WursBarChart({ categoryAnalysis }) {
  const data = Object.entries(categoryAnalysis).map(([key, cat]) => ({
    name: cat.name,
    score: cat.score,
    maxScore: cat.maxScore,
    percentage: cat.percentage,
  }));

  const getBarColor = (percentage) => {
    if (percentage >= 75) return "#E57373"; // high
    if (percentage >= 50) return "#FFB347"; // moderate
    return "#7FA96A"; // low
  };

  return (
    <ChartContainer>
      <ChartTitle>WURS 카테고리별 점수</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8DD" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#3D4A3D", fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fill: "#6B7B6B", fontSize: 10 }}
            label={{ value: "점수", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#F7FAF5",
              border: "1px solid #C1D0BA",
              borderRadius: "8px",
            }}
            formatter={(value, name, props) => [
              `${value} / ${props.payload.maxScore} (${props.payload.percentage}%)`,
              "점수",
            ]}
          />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.percentage)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

#### 3-4. 종합 비교 차트 (3개 검사)

```javascript
// src/components/charts/ComprehensiveComparisonChart.jsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ComprehensiveComparisonChart({ asrs, impairment, wurs }) {
  const data = [
    {
      name: "ASRS\n(현재 증상)",
      percentage: Math.round((asrs.totalScore / 72) * 100),
      score: asrs.totalScore,
      max: 72,
    },
    {
      name: "기능 저하",
      percentage: Math.round((impairment.yesCount / 3) * 100),
      score: impairment.yesCount,
      max: 3,
    },
    {
      name: "WURS\n(아동기)",
      percentage: Math.round((wurs.totalScore / 100) * 100),
      score: wurs.totalScore,
      max: 100,
    },
  ];

  return (
    <ChartContainer>
      <ChartTitle>종합 검사 결과 비교</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8DD" />
          <XAxis type="number" domain={[0, 100]} unit="%" />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fill: "#3D4A3D", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.score} / ${props.payload.max} (${value}%)`,
              "점수",
            ]}
          />
          <Bar dataKey="percentage" fill="#96BE80" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
```

---

### 4. 병원 찾기 링크 연동

#### 4-1. 병원 데이터 구조

```javascript
// src/constants/hospitals.js

export const HOSPITAL_SEARCH_URLS = {
  naver: "https://map.naver.com/v5/search/정신건강의학과",
  kakao: "https://map.kakao.com/?q=정신건강의학과",
  google: "https://www.google.com/maps/search/정신건강의학과",

  // 지역별 검색 URL 생성 함수
  getNaverSearchUrl: (keyword, region) => {
    const query = region ? `${region} ${keyword}` : keyword;
    return `https://map.naver.com/v5/search/${encodeURIComponent(query)}`;
  },

  getKakaoSearchUrl: (keyword, region) => {
    const query = region ? `${region} ${keyword}` : keyword;
    return `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
  },
};

// 전국 주요 ADHD 진료 병원 (예시)
export const RECOMMENDED_HOSPITALS = [
  {
    id: 1,
    name: "서울대학교병원 정신건강의학과",
    region: "서울",
    phone: "02-2072-2972",
    website: "http://www.snuh.org",
    address: "서울특별시 종로구 대학로 101",
    features: ["성인 ADHD 전문", "종합검사 가능", "약물치료", "인지행동치료"],
  },
  {
    id: 2,
    name: "삼성서울병원 정신건강의학과",
    region: "서울",
    phone: "02-3410-3583",
    website: "http://www.samsunghospital.com",
    address: "서울특별시 강남구 일원로 81",
    features: ["ADHD 전문 클리닉", "성인/청소년", "심리검사", "약물치료"],
  },
  // ... 더 많은 병원 정보
];
```

#### 4-2. 병원 찾기 페이지

```javascript
// src/pages/Hospital/Hospital.jsx

import { useState } from "react";
import {
  HOSPITAL_SEARCH_URLS,
  RECOMMENDED_HOSPITALS,
} from "@constants/hospitals";

function Hospital() {
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("정신건강의학과 ADHD");

  const regions = [
    "전체",
    "서울",
    "경기",
    "인천",
    "부산",
    "대구",
    "대전",
    "광주",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  const filteredHospitals =
    selectedRegion === "전체"
      ? RECOMMENDED_HOSPITALS
      : RECOMMENDED_HOSPITALS.filter((h) => h.region === selectedRegion);

  const handleMapSearch = (provider) => {
    let url;
    switch (provider) {
      case "naver":
        url = HOSPITAL_SEARCH_URLS.getNaverSearchUrl(
          searchKeyword,
          selectedRegion !== "전체" ? selectedRegion : null
        );
        break;
      case "kakao":
        url = HOSPITAL_SEARCH_URLS.getKakaoSearchUrl(
          searchKeyword,
          selectedRegion !== "전체" ? selectedRegion : null
        );
        break;
      default:
        url = HOSPITAL_SEARCH_URLS.google;
    }
    window.open(url, "_blank");
  };

  return (
    <Container>
      <Header>
        <Title>병원 찾기</Title>
        <Subtitle>ADHD 진료가 가능한 정신건강의학과를 찾아보세요</Subtitle>
      </Header>

      {/* 지도 검색 */}
      <MapSearchSection>
        <SectionTitle>🗺️ 지도에서 찾기</SectionTitle>
        <SearchInputWrapper>
          <RegionSelect
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </RegionSelect>
          <SearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색 키워드 입력"
          />
        </SearchInputWrapper>

        <MapButtonGroup>
          <MapButton onClick={() => handleMapSearch("naver")} color="#03C75A">
            <MapIcon>📍</MapIcon>
            네이버 지도
          </MapButton>
          <MapButton onClick={() => handleMapSearch("kakao")} color="#FEE500">
            <MapIcon>📍</MapIcon>
            카카오맵
          </MapButton>
          <MapButton onClick={() => handleMapSearch("google")} color="#4285F4">
            <MapIcon>📍</MapIcon>
            구글 지도
          </MapButton>
        </MapButtonGroup>
      </MapSearchSection>

      {/* 추천 병원 목록 */}
      <RecommendedSection>
        <SectionTitle>🏥 추천 병원</SectionTitle>
        <SectionDescription>
          ADHD 전문 진료가 가능한 병원 목록입니다. 예약 전 전화로 확인하세요.
        </SectionDescription>

        <HospitalGrid>
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id}>
              <HospitalName>{hospital.name}</HospitalName>
              <HospitalRegion>{hospital.region}</HospitalRegion>

              <HospitalInfo>
                <InfoRow>
                  <InfoIcon>📞</InfoIcon>
                  <InfoText>{hospital.phone}</InfoText>
                </InfoRow>
                <InfoRow>
                  <InfoIcon>📍</InfoIcon>
                  <InfoText>{hospital.address}</InfoText>
                </InfoRow>
                {hospital.website && (
                  <InfoRow>
                    <InfoIcon>🌐</InfoIcon>
                    <InfoLink href={hospital.website} target="_blank">
                      홈페이지 방문
                    </InfoLink>
                  </InfoRow>
                )}
              </HospitalInfo>

              <FeatureTags>
                {hospital.features.map((feature, index) => (
                  <FeatureTag key={index}>{feature}</FeatureTag>
                ))}
              </FeatureTags>

              <ButtonGroup>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${hospital.phone}`)}
                >
                  전화하기
                </Button>
                <Button size="sm" onClick={() => handleMapSearch("naver")}>
                  지도보기
                </Button>
              </ButtonGroup>
            </HospitalCard>
          ))}
        </HospitalGrid>
      </RecommendedSection>

      {/* 진료 준비 가이드 */}
      <GuideSection>
        <SectionTitle>📋 진료 준비 가이드</SectionTitle>
        <GuideList>
          <GuideItem>
            <GuideIcon>1️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>검사 결과 지참</GuideTitle>
              <GuideDescription>
                본 웹사이트의 검사 결과를 PDF로 저장하여 가져가세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>

          <GuideItem>
            <GuideIcon>2️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>증상 메모 준비</GuideTitle>
              <GuideDescription>
                언제부터, 어떤 상황에서, 어떤 어려움이 있는지 구체적으로
                메모하세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>

          <GuideItem>
            <GuideIcon>3️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>건강보험증 지참</GuideTitle>
              <GuideDescription>
                건강보험 적용 시 진료비 부담이 줄어듭니다.
              </GuideDescription>
            </GuideContent>
          </GuideItem>

          <GuideItem>
            <GuideIcon>4️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>예약 필수</GuideTitle>
              <GuideDescription>
                대부분의 병원에서 예약제로 운영되므로 미리 전화 예약하세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>
        </GuideList>
      </GuideSection>

      <DisclaimerBox>
        <DisclaimerIcon>ℹ️</DisclaimerIcon>
        <DisclaimerText>
          병원 정보는 참고용이며, 진료 가능 여부와 대기 시간은 병원에 직접
          문의하세요.
        </DisclaimerText>
      </DisclaimerBox>
    </Container>
  );
}
```

#### 4-3. Result 페이지에서 병원 찾기 연동

```javascript
// Result 페이지에서 바로 연결
<ButtonGroup>
  <Button onClick={handleDownloadPDF} variant="outline">
    📄 결과 저장
  </Button>
  <Button onClick={() => navigate(ROUTES.HOSPITAL)}>🏥 병원 찾기</Button>
</ButtonGroup>
```

---

## 📚 참고 문헌

### 공식 문서

1. **WHO ASRS-v1.1**

   - Kessler, R.C., et al. (2007). "Validity of the World Health Organization Adult ADHD Self-Report Scale (ASRS) Screener." _International Journal of Methods in Psychiatric Research_, 16(2), 52-65.
   - Harvard Medical School (2024). "ASRS v1.1 Scoring Update."

2. **DSM-5**

   - American Psychiatric Association (2013). _Diagnostic and Statistical Manual of Mental Disorders_ (5th ed.).
   - American Psychiatric Association (2022). _DSM-5-TR_ (Text Revision).

3. **WURS-25**
   - Ward, M.F., Wender, P.H., & Reimherr, F.W. (1993). "The Wender Utah Rating Scale: An aid in the retrospective diagnosis of childhood Attention Deficit Hyperactivity Disorder." _American Journal of Psychiatry_, 150, 885-890.

### 온라인 리소스

- [NovoPsych ASRS Assessment](https://novopsych.com/assessments/diagnosis/adult-adhd-self-report-scale/)
- [NovoPsych WURS-25](https://novopsych.com/assessments/diagnosis/wender-utah-rating-scale-25/)
- [DSM-5 ADHD Criteria - ADDRC](https://www.addrc.org/dsm-5-criteria-for-adhd/)

---

## 📝 버전 기록

- **v1.0.0** (2025-01-09): 초안 작성
  - ASRS, 기능 저하, WURS 점수 계산 로직
  - 의학적 근거 및 cutoff 기준 정리
  - 종합 해석 알고리즘
  - 코드 구현 예시

---

**마지막 업데이트:** 2025-01-09  
**작성자:** ADHD Test Web 개발팀  
**상태:** ✅ 검토 완료 - 구현 준비됨
