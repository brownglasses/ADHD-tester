# 📄 페이지 가이드

> 이 문서는 프로젝트의 모든 페이지에 대한 정보를 담고 있습니다.
> 새로운 페이지를 추가하거나 기존 페이지를 수정할 때 참고하세요.

---

## 📑 목차

- [Landing 페이지](#-landing-페이지)
- [ASRS Intro 페이지](#-asrs-intro-페이지)
- [ASRS Test 페이지](#-asrs-test-페이지)
- [페이지 작성 가이드](#-페이지-작성-가이드)
- [공통 패턴](#-공통-패턴)

---

## 🏠 Landing 페이지

**경로:** `src/pages/Landing/Landing.jsx`  
**라우트:** `/` (ROUTES.LANDING)  
**목적:** ADHD 스크리너의 메인 홈페이지, 서비스 소개 및 검사 시작 유도

### 페이지 구조

```
Landing
├── Hero Section         - 메인 비주얼 + CTA
├── Process Section      - 검사 3단계 소개
├── Info Section         - 주요 정보 (시간, 보안, 과학적 근거)
├── Disclaimer Section   - 중요 안내사항
├── CTA Section          - 재차 검사 시작 유도
└── Footer               - 푸터 링크
```

### 사용된 컴포넌트

| 컴포넌트  | 용도                  | 주요 Props                              |
| --------- | --------------------- | --------------------------------------- |
| `Button`  | CTA 버튼              | `size="lg"`, `variant="secondary"`      |
| `Card`    | 정보 카드, Disclaimer | `variant`, `padding`, `hoverable`       |
| `Stepper` | 검사 과정 시각화      | `currentStep={-1}`, `steps={testSteps}` |

### 주요 섹션 상세

#### 1. Hero Section

```jsx
<HeroSection>
  - 그라데이션 배경 (primaryLight → white) - 🌱 이모지 (플로팅 애니메이션) -
  타이틀: "ADHD 자가 스크리닝" - 서브타이틀: "당신의 첫걸음을 응원합니다" - CTA
  버튼: "검사 시작하기" (accent 색상)
</HeroSection>
```

**ADHD 친화적 디자인:**

- 명확한 메시지 (간결한 문구)
- 큰 CTA 버튼 (최소 터치 영역 준수)
- 부드러운 애니메이션 (3초 플로팅)

#### 2. Process Section

```jsx
<ProcessSection>
  - Stepper: 3단계 시각화 (데스크톱만) - ProcessCards: 각 단계 상세 설명 1. 현재
  증상 (ASRS 설문) 2. 과거 증상 (WURS 설문) 3. 결과 확인 (종합 분석)
</ProcessSection>
```

**특징:**

- Stepper는 모바일에서 숨김 (복잡도 감소)
- 카드는 항상 표시 (그리드 레이아웃)

#### 3. Info Section

```jsx
<InfoSection>
  - 3개의 InfoCard (그리드) - ⏱️ 약 10분 소요 - 🔒 안전한 개인정보 - 📊 과학적
  근거 기반
</InfoSection>
```

**배경:** 회색 배경 (background.secondary)으로 구분

#### 4. Disclaimer Section

```jsx
<DisclaimerCard variant="secondary">
  - ⚠️ 아이콘 - 제목: "중요 안내사항" - 본문: "진단" 용어 사용 금지 강조 -
  리스트: 3가지 주의사항
</DisclaimerCard>
```

**핵심 메시지:**

- "선별 도구"임을 명확히 표시
- 의학적 진단 대체 불가
- 전문의 상담 권장

#### 5. Footer

```jsx
<Footer>- FooterLinks: FAQ | 개인정보처리방침 | 병원 찾기 - Copyright</Footer>
```

### 반응형 디자인

| 브레이크포인트      | 변경사항                            |
| ------------------- | ----------------------------------- |
| Desktop (>1024px)   | 기본 레이아웃, Stepper 표시         |
| Tablet (768-1024px) | 그리드 2열, Stepper 숨김            |
| Mobile (<768px)     | 그리드 1열, Stepper 숨김, 폰트 축소 |

### 네비게이션 플로우

```
Landing
  └─ "검사 시작하기" 클릭
       └─> ROUTES.ASRS_INTRO (ASRS 설문 인트로)
```

**TODO:**

- 로그인 체크 로직 추가 필요
- 비로그인 시 로그인 페이지로 리다이렉트

### 애니메이션

```css
/* 플로팅 애니메이션 (이모지) */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
duration: 3s, ease-in-out, infinite;
```

### 접근성

- ✅ semantic HTML (section, footer)
- ✅ 버튼 포커스 스타일
- ✅ 충분한 색상 대비
- ✅ 명확한 라벨

### 개발 시 주의사항

1. **"진단" 용어 절대 사용 금지** - "선별", "스크리닝", "확인" 사용
2. **CTA 버튼 명확성** - "검사 시작하기" 유지
3. **Stepper 상태** - `currentStep={-1}` (모든 단계 비활성)
4. **이모지 사용** - 텍스트 과부하 방지
5. **간결한 문구** - ADHD 사용자 고려

---

## 📋 ASRS Intro 페이지

**경로:** `src/pages/Asrs/AsrsIntro.jsx`  
**라우트:** `/asrs/intro` (ROUTES.ASRS_INTRO)  
**목적:** ASRS 검사 시작 전 필수 안내문 및 검사 구성 설명

### 페이지 구조

```
AsrsIntro
├── Header                 - 돌아가기 버튼 + 단계 배지
├── Disclaimer Card        - 필수 안내문 (의학적 진단 아님 강조)
├── Main Card
│   ├── Title              - 검사명 및 출처
│   ├── Test Structure     - 3단계 구성 안내
│   └── Info Section       - 답변 시 유의사항
└── Footer Note            - 중단 가능 안내
```

### 주요 섹션 상세

#### 1. Disclaimer Card (필수 안내문)

```jsx
<DisclaimerCard>
  - ⚠️ 아이콘 - "중요 안내사항" 제목 - 4개 단락: 1. '참고용 선별 검사'임을 명시
  2. '의학적 진단 아님' 강조 3. ASRS-v1.1 및 DSM-5 기반 명시 4. 전문의 상담 권장
  (하이라이트)
</DisclaimerCard>
```

**핵심 메시지:**

- "진단" 용어 절대 사용 금지 ⚠️
- "선별 검사", "참고용" 강조
- WHO 및 DSM-5의 과학적 근거 명시

#### 2. Test Structure Section (검사 구성)

```jsx
<TestStructureSection>
  - 1단계: 증상 선별 질문 (18문항, 5-7분) - 2단계: 기능 저하 평가 (3문항, 1-2분)
  - 3단계: 아동기 발달력 확인 (1문항, 1분)
</TestStructureSection>
```

**특징:**

- 각 단계별 문항 수 및 소요 시간 명시
- 출처 정보 포함 (WHO ASRS-v1.1, DSM-5)
- 단계별 목적 설명

#### 3. Info Section (유의사항)

```jsx
<InfoSection>
  - ⏱️ 총 소요 시간: 약 7-10분 - 💭 솔직한 답변 (정답 없음) - 🔒 개인정보 보호
  (암호화) - 📊 과학적 근거 (WHO, DSM-5)
</InfoSection>
```

### 사용된 컴포넌트

| 컴포넌트 | 용도              | 주요 Props                         |
| -------- | ----------------- | ---------------------------------- |
| `Card`   | 메인 카드, 안내문 | `variant`, `padding`               |
| `Button` | CTA 버튼          | `size="lg"`, `variant="secondary"` |

### 네비게이션 플로우

```
AsrsIntro
  ├─ "돌아가기" → ROUTES.LANDING
  └─ "검사 시작하기" → ROUTES.ASRS_TEST
```

### 디자인 특징

- **Disclaimer Card 강조:** accent 색상 테두리, 중앙 배치
- **단계별 배지:** 원형 배지로 시각화 (1단계, 2단계, 3단계)
- **명확한 정보 계층:** 아이콘 + 제목 + 설명 구조

### 개발 시 주의사항

1. **"진단" 용어 절대 금지** - "선별", "확인", "평가" 사용
2. **안내문 필수 표시** - 사용자가 반드시 읽도록 상단 배치
3. **출처 명시** - WHO, DSM-5 신뢰성 강조
4. **과학적 근거** - 검증된 척도 기반임을 명시

---

## 📝 ASRS Test 페이지

**경로:** `src/pages/Asrs/AsrsTest.jsx`  
**라우트:** `/asrs/test` (ROUTES.ASRS_TEST)  
**목적:** ASRS 검사 실시 (3단계 구조)

### 페이지 구조

```
AsrsTest
├── Header                 - 나가기 버튼 + MiniStepper
├── ProgressBar           - 전체 진행률 (22문항)
├── StageBadge            - 현재 단계 표시
├── InstructionCard       - 각 단계 첫 질문에만 표시
├── QuestionCard          - 질문 및 답변 선택
│   ├── QuestionHeader    - 번호 + 카테고리 배지
│   ├── Question          - 질문 내용
│   ├── AnswerSection     - RadioGroup
│   └── ButtonGroup       - 이전/다음 버튼
└── Hint                  - 단계별 힌트
```

### 3단계 구조

#### 1단계: 증상 선별 질문 (18문항)

```
- 출처: WHO ASRS-v1.1 (Part A 6문항 + Part B 12문항)
- 답변 척도: 전혀 없음 / 드물게 / 가끔 / 자주 / 매우 자주 (0-4점)
- 평가 영역: 부주의, 과잉행동, 충동성
- 지시문: "최근 6개월 동안의 경험을 답변해 주세요"
```

**Part A (1-6번):** 핵심 증상
**Part B (7-18번):** 추가 증상

#### 2단계: 기능 저하 평가 (3문항)

```
- 출처: DSM-5 진단 기준 'D항' (기능 저하)
- 답변 척도: 예 / 아니오
- 평가 영역: 학업/직업, 대인관계, 일상 관리
- 지시문: "증상으로 인한 실제 삶의 어려움"
```

#### 3단계: 아동기 발달력 확인 (1문항)

```
- 출처: DSM-5 진단 기준 'B항' (발병 시기)
- 답변 척도: 예 / 아니오 / 잘 모르겠음
- 평가 시점: 만 12세 이전
- 지시문: "과거를 회상해 볼 때"
```

### 주요 기능

#### 단계 전환 로직

```javascript
// 현재 단계 (1, 2, 3)
const [currentStage, setCurrentStage] = useState(1);

// 단계 내 질문 인덱스
const [currentIndex, setCurrentIndex] = useState(0);

// 마지막 질문 → 다음 단계
if (isLastQuestionInStage && !isLastStage) {
  setCurrentStage(currentStage + 1);
  setCurrentIndex(0);
}

// 전체 완료
if (isLastQuestionInStage && isLastStage) {
  handleComplete();
}
```

#### 답변 관리

```javascript
// 3개의 독립된 답변 상태
const [symptomAnswers, setSymptomAnswers] = useState({}); // 1단계
const [impairmentAnswers, setImpairmentAnswers] = useState({}); // 2단계
const [childhoodAnswer, setChildhoodAnswer] = useState(null); // 3단계
```

#### 진행률 표시

```javascript
// 전체 22문항 기준
const getTotalProgress = () => {
  let completed = 0;
  const total = 22; // 18 + 3 + 1

  // 완료된 단계 계산
  if (currentStage > 1) completed += 18;
  if (currentStage > 2) completed += 3;
  // ...

  return { current: completed, total };
};
```

### 사용된 컴포넌트

| 컴포넌트      | 용도                | 주요 Props                              |
| ------------- | ------------------- | --------------------------------------- |
| `ProgressBar` | 전체 진행률         | `current`, `total`, `variant="primary"` |
| `MiniStepper` | 전체 검사 단계 표시 | `currentStep={0}`, `steps`              |
| `Card`        | 질문 카드, 지시문   | `padding="xl"`                          |
| `RadioGroup`  | 답변 선택 (세로)    | `direction="vertical"`, `fullWidth`     |
| `RadioOption` | 개별 라디오 버튼    | `value`, `label`, `fullWidth`           |
| `Button`      | 이전/다음 버튼      | `variant="outline"`, `disabled`         |

### 단계별 지시문

```javascript
// InstructionCard: 각 단계 첫 질문에만 표시
{
  currentIndex === 0 && (
    <InstructionCard>{ASRS_INSTRUCTIONS[currentStage]}</InstructionCard>
  );
}
```

### 단계별 힌트

```javascript
// 1단계: "최근 6개월 동안의 경험을 솔직하게..."
// 2단계: "실제 삶에서 겪는 어려움에 대해..."
// 3단계: "기억이 불확실하면 '잘 모르겠음' 선택..."
```

### 네비게이션 플로우

```
AsrsTest
  ├─ "나가기" (확인 후) → ROUTES.LANDING
  ├─ "이전" → 이전 질문 또는 이전 단계 마지막 질문
  ├─ "다음" → 다음 질문
  ├─ "다음 단계" → 2단계 또는 3단계
  └─ "완료" → TODO: 결과 페이지 또는 다음 검사
```

### 데이터 구조

#### symptomAnswers (1단계)

```javascript
{
  1: 2,  // 질문 1 → "가끔"
  2: 3,  // 질문 2 → "자주"
  // ... 18번까지
}
```

#### impairmentAnswers (2단계)

```javascript
{
  1: "yes",  // 학업/직업
  2: "no",   // 대인관계
  3: "yes",  // 일상 관리
}
```

#### childhoodAnswer (3단계)

```javascript
"yes" | "no" | "unknown";
```

### 반응형 디자인

| 브레이크포인트   | 변경사항                  |
| ---------------- | ------------------------- |
| Desktop (>768px) | 기본 레이아웃             |
| Mobile (<768px)  | 버튼 세로 배치, 폰트 축소 |

### 접근성

- ✅ RadioGroup 키보드 네비게이션
- ✅ 답변 미선택 시 경고
- ✅ 명확한 진행률 표시
- ✅ 단계별 지시문 제공

### 개발 시 주의사항

1. **1화면 1과업 준수** - 한 번에 한 질문만 표시
2. **답변 필수 확인** - 미선택 시 다음 버튼 비활성화
3. **단계 전환 명확화** - "다음 단계" 버튼 텍스트로 명시
4. **진행률 정확성** - 전체 22문항 기준 계산
5. **데이터 분리** - 3개 단계의 답변을 독립적으로 관리
6. **중단 경고** - 나가기 시 확인 메시지

### TODO

- [ ] Zustand store에 답변 저장
- [ ] 결과 페이지로 이동
- [ ] 임시 저장 기능 (선택사항)

---

## 📝 페이지 작성 가이드

새로운 페이지를 만들 때 다음 구조를 따르세요:

### 1. 파일 구조

```
src/pages/
└── PageName/
    ├── PageName.jsx       # 메인 컴포넌트
    ├── components/        # 페이지 전용 컴포넌트 (선택)
    └── index.js          # export (선택)
```

### 2. 컴포넌트 템플릿

```jsx
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { ROUTES } from "@constants/routes";

/**
 * PageName 페이지
 * 간단한 설명
 */
function PageName() {
  const navigate = useNavigate();

  return <Container>{/* 페이지 내용 */}</Container>;
}

export default PageName;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;
```

### 3. Import 순서

```jsx
// 1. React 관련
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 2. 외부 라이브러리
import styled from "styled-components";

// 3. 컴포넌트
import Button from "@components/Button";
import Card from "@components/Card";

// 4. Store
import { useTestStore } from "@store/useTestStore";

// 5. Utils/Constants
import { ROUTES } from "@constants/routes";
```

### 4. 스타일 컴포넌트 네이밍

```jsx
// ✅ Good - 의미있는 이름
const HeroSection = styled.section``;
const CTAButton = styled(Button)``;
const ProcessCard = styled(Card)``;

// ❌ Bad - 의미없는 이름
const Div1 = styled.div``;
const Container2 = styled.div``;
```

---

## 🎨 공통 패턴

### 섹션 구분

```jsx
// 배경색으로 섹션 구분
<Section>                    // 기본 (white)
<Section $secondary>         // 회색 배경
<Section $gradient>          // 그라데이션

// 또는 직접 지정
background: ${({ theme }) => theme.colors.background.secondary};
```

### 최대 너비 컨테이너

```jsx
const ContentContainer = styled.div`
  max-width: 1200px; // 큰 컨텐츠
  max-width: 900px; // 중간 컨텐츠
  max-width: 600px; // 작은 컨텐츠
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;
```

### 반응형 그리드

```jsx
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
```

### CTA 버튼 스타일

```jsx
// Primary Action
<Button size="lg" variant="secondary">
  주요 행동
</Button>

// Secondary Action
<Button size="md" variant="outline">
  보조 행동
</Button>
```

### 텍스트 계층 구조

```jsx
// 페이지 타이틀
font-size: ${({ theme }) => theme.fontSize["4xl"]};
font-weight: ${({ theme }) => theme.fontWeight.bold};

// 섹션 타이틀
font-size: ${({ theme }) => theme.fontSize["3xl"]};
font-weight: ${({ theme }) => theme.fontWeight.bold};

// 서브 타이틀
font-size: ${({ theme }) => theme.fontSize["2xl"]};
font-weight: ${({ theme }) => theme.fontWeight.semibold};

// 본문
font-size: ${({ theme }) => theme.fontSize.base};
line-height: 1.6;
```

---

## 🔄 업데이트 기록

- 2024.11.09 v2: MVP 범위 조정 - CPT 제거
  - 검사 구조 변경: 4단계 → 3단계 (ASRS + WURS + 결과)
  - CPT 관련 내용 전체 제거
  - 소요 시간 조정: 15분 → 10분
- 2024.11.09: ASRS Intro 및 Test 페이지 문서화
  - 필수 안내문 및 3단계 구조 반영
  - WHO ASRS-v1.1 및 DSM-5 기반 질문 추가
  - 상세 사용 가이드 및 주의사항 작성
- 2024.11.07: 초안 작성 (Landing 페이지)

---

## 📌 다음 작업

- [x] ASRS Intro 페이지 문서화
- [x] ASRS Test 페이지 문서화
- [ ] Login 페이지 문서화
- [ ] WURS 페이지 문서화
- [ ] Result 페이지 문서화
