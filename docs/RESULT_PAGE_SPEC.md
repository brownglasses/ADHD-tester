# 결과 페이지 명세서

결과 페이지(`/result`)에서 사용자에게 제공되는 정보를 정리한 문서입니다.

---

## 📊 페이지 구조

### 1. 헤더

- **제목**: "📊 검사 결과"
- **부제목**: "ADHD 자가 스크리닝 종합 결과입니다"

### 2. 면책 조항 (Disclaimer)

```
⚠️ 이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.
정확한 진단은 정신건강의학과 전문의와 상담하세요.
```

---

## 🎯 종합 평가 카드

### 표시 정보

1. **종합 평가 제목** (`comprehensive.title`)
   - 예: "ADHD 가능성이 높습니다"
2. **종합 메시지** (`comprehensive.message`)
   - 전체적인 평가 결과 설명
   - 긴급도에 따른 맞춤 메시지
3. **긴급도** (`comprehensive.urgency`)
   - `high`: 빨간색 테두리 (높음)
   - `moderate`: 주황색 테두리 (중간)
   - `low`: 파란색 테두리 (낮음)

### DSM-5 진단 기준 충족 여부

각 기준의 충족 여부를 시각적으로 표시:

#### Criterion A - 현재 증상 (ASRS)

- **설명**: 현재 증상
- **평가 기준**: ASRS 점수
- **상태**: "충족" / "미충족"

#### Criterion B - 12세 이전 발병 (WURS)

- **설명**: 12세 이전 발병
- **평가 기준**: WURS 점수
- **상태**: "충족" / "미충족"

#### Criterion D - 기능 저하

- **설명**: 기능 저하 (2개 이상 영역)
- **평가 기준**: 기능 저하 평가
- **상태**: "충족" / "미충족"

### 권장 사항 (Next Steps)

각 권장사항은 다음 정보를 포함:

- **아이콘**: 시각적 표현
- **제목**: 권장사항 제목
- **설명**: 상세 설명
- **긴급 여부**: `urgent` 플래그로 배경색 강조

**예시:**

```javascript
{
  icon: "🏥",
  title: "정신건강의학과 방문 권장",
  description: "전문의와 상담하여 정확한 진단을 받으세요.",
  urgent: true
}
```

---

## 📈 상세 점수

### 1. ASRS (현재 증상) 카드

**표시 정보:**

- 아이콘: 🎯
- 이름: "ASRS (현재 증상)"
- 점수: `{totalScore} / 72점`
- 부가 정보: `(Part A: {partAScore}/24)`
- 위험도: `{riskLevel}`
  - 예: "높은 위험", "중간 위험", "낮은 위험"
- 색상: 위험도에 따라 변경

**데이터 소스:**

```javascript
{
  totalScore: 48,        // 0-72
  partAScore: 18,        // 0-24
  riskLevel: "높은 위험",
  interpretation: "high"
}
```

### 2. 기능 저하 평가 카드

**표시 정보:**

- 아이콘: 📊
- 이름: "기능 저하 평가"
- 점수: `{yesCount} / 3개 영역`
- 설명: `{description}`
  - 예: "심각한 기능 저하", "중등도 기능 저하", "경미한 기능 저하"
- 색상: 수준에 따라 변경

**데이터 소스:**

```javascript
{
  yesCount: 3,           // 0-3
  description: "심각한 기능 저하",
  level: "severe"
}
```

### 3. WURS (아동기 증상) 카드

**표시 정보:**

- 아이콘: 👶
- 이름: "WURS (아동기 증상)"
- 점수: `{totalScore} / 100점`
- 설명: `{description}`
  - 예: "높은 가능성", "중간 가능성", "낮은 가능성"
- 색상: 수준에 따라 변경

**데이터 소스:**

```javascript
{
  totalScore: 68,        // 0-100
  description: "높은 가능성",
  interpretation: "high"
}
```

### 4. ADHD 하위 유형 분석 (조건부)

**표시 조건:** `asrs.subtype !== "unknown"`

**표시 정보:**

- 제목: "ADHD 하위 유형 분석"
- 유형 라벨:
  - "부주의형 우세" (🎯)
  - "과잉행동-충동형 우세" (⚡)
  - "복합형" (🔄)
- 세부 점수:
  - 부주의: `{inattentionScore}/36`
  - 과잉행동-충동: `{hyperactivityScore}/36`

---

## 🔍 카테고리별 상세 분석

### ASRS 카테고리 분석

**표시 카테고리:**

1. **부주의 (Inattention)**
   - 점수 및 백분율
   - 주요 증상 목록
2. **과잉행동-충동 (Hyperactivity-Impulsivity)**
   - 점수 및 백분율
   - 주요 증상 목록

**컴포넌트:** `<CategoryAnalysis type="asrs" />`

### WURS 카테고리 분석

**표시 카테고리:**

1. **주의력 문제 (Attention Problems)**
2. **과잉행동/충동성 (Hyperactivity/Impulsivity)**
3. **정서 조절 (Emotional Regulation)**
4. **학습/행동 문제 (Learning/Behavioral Problems)**
5. **사회성 문제 (Social Problems)**

각 카테고리마다:

- 점수 및 백분율
- 주요 증상 목록
- 심각도 표시

**컴포넌트:** `<CategoryAnalysis type="wurs" />`

---

## 📊 시각화 차트

### 1. ASRS 레이더 차트

**표시 내용:**

- 제목: "ASRS 카테고리별 분석"
- X축: 카테고리명
- Y축: 점수 (0-100%)
- 레이더 차트로 시각화

**컴포넌트:** `<AsrsRadarChart />`

### 2. WURS 바 차트

**표시 내용:**

- 제목: "WURS 카테고리별 분석"
- X축: 카테고리명
- Y축: 점수 (0-100%)
- 바 차트로 시각화

**컴포넌트:** `<WursBarChart />`

### 3. 종합 비교 차트 (미사용)

**컴포넌트:** `<ComprehensiveComparisonChart />`

- 현재 코드에 임포트되어 있으나 렌더링되지 않음

---

## 🎬 액션 버튼

### 1. 병원 찾기 버튼

- **텍스트**: "🏥 병원 찾기"
- **스타일**: Primary 색상, Large 크기
- **기능**: `handleGoToHospital()`
  - `/hospital` 페이지로 이동

---

## 🔙 하단 네비게이션

### 처음으로 버튼

- **텍스트**: "처음으로"
- **스타일**: Outline
- **기능**: 랜딩 페이지(`/`)로 이동

---

## 🔄 데이터 흐름

### 입력 데이터 (Zustand Store)

```javascript
{
  asrs: {
    answers: { 1: 3, 2: 4, ... },  // 18개 질문 답변
    score: null,
    interpretation: null,
    completedAt: "2025-11-10T..."
  },
  impairment: {
    answers: { 1: "yes", 2: "no", 3: "yes" },  // 3개 질문 답변
    completedAt: "2025-11-10T..."
  },
  wurs: {
    answers: { 1: 2, 2: 3, ... },  // 25개 질문 답변
    score: null,
    interpretation: null,
    completedAt: "2025-11-10T..."
  }
}
```

### 처리 과정

1. **점수 계산**: `calculateAllScores()`

   - ASRS 점수 계산
   - 기능 저하 평가
   - WURS 점수 계산
   - 종합 평가 생성

2. **카테고리 분석**
   - `analyzeASRSCategories()`: ASRS 세부 분석
   - `analyzeWURSCategories()`: WURS 세부 분석

### 출력 데이터 (result 객체)

```javascript
{
  asrs: {
    totalScore: 48,
    partAScore: 18,
    partBScore: 30,
    riskLevel: "높은 위험",
    interpretation: "high",
    subtype: "combined",
    inattentionScore: 28,
    hyperactivityScore: 20
  },
  impairment: {
    yesCount: 3,
    description: "심각한 기능 저하",
    level: "severe"
  },
  wurs: {
    totalScore: 68,
    description: "높은 가능성",
    interpretation: "high"
  },
  comprehensive: {
    title: "ADHD 가능성이 높습니다",
    message: "...",
    urgency: "high",
    dsmCriteria: {
      A: "충족",
      B: "충족",
      D: "충족"
    },
    nextSteps: [
      { icon: "🏥", title: "...", description: "...", urgent: true },
      // ...
    ]
  }
}
```

---

## 🎨 스타일링 특징

### 반응형 디자인

- 최대 너비: 1200px
- 모바일에서 버튼 그룹 세로 배치
- 그리드 자동 조정 (`minmax(250px, 1fr)`)

### 색상 시스템

- **긴급도 높음**: 빨간색 (`danger`)
- **긴급도 중간**: 주황색 (`accent`)
- **긴급도 낮음**: 파란색 (`primary`)

### 인터랙션

- 카드 호버 효과 (그림자 + 위로 이동)
- 부드러운 전환 애니메이션 (0.2s ease)

---

## ⚠️ 예외 처리

### 답변 없음

- 조건: 어떤 검사라도 답변이 없으면
- 동작: 랜딩 페이지(`/`)로 리다이렉트

### 로딩 상태

- 표시: "결과를 계산하고 있습니다..."
- 조건: `loading === true` 또는 `result === null`

---

## 📝 TODO / 개선 사항

현재 미사용 중인 기능:

- [ ] `ComprehensiveComparisonChart` 추가 (3개 검사 비교)
- [ ] 결과 공유 기능
- [ ] 결과 저장 (로컬스토리지 / 클라우드)
- [ ] 인쇄 최적화 레이아웃
