# UI 일관성 규칙 (UI Consistency Rules)

> **목적:** ASRS, Impairment, WURS 검사 페이지의 UI를 통일하여 일관된 사용자 경험 제공

**버전:** 2.0.0  
**작성일:** 2025-01-09  
**상태:** ✅ 적용 완료

---

## 📋 목차

1. [핵심 원칙](#핵심-원칙)
2. [페이지 타입별 규칙](#페이지-타입별-규칙)
3. [컴포넌트 규칙](#컴포넌트-규칙)
4. [스타일 규칙](#스타일-규칙)
5. [체크리스트](#체크리스트)

---

## 핵심 원칙

### 원칙 1: 동일한 컴포넌트는 동일한 방식으로

같은 기능을 하는 컴포넌트는 모든 페이지에서 동일한 구조와 스타일을 사용한다.

### 원칙 2: 예측 가능한 사용자 경험

사용자가 한 페이지에서 학습한 패턴은 다른 페이지에서도 동일하게 작동해야 한다.

### 원칙 3: 1화면 1과업

각 화면은 하나의 명확한 목적을 가지며, 불필요한 요소를 배제한다.

### 원칙 4: 명확한 피드백

사용자의 모든 행동에 즉각적이고 명확한 피드백을 제공한다.

---

## 페이지 타입별 규칙

## 📄 Rule 1: Intro 페이지 (검사 소개)

### 1.1 필수 구조

```
✅ 항상 포함해야 하는 요소:
- Header (BackButton + Badge)
- MainCard (Icon + Title + Subtitle + Description)
- TestStructureSection (검사 구성 상세)
- InfoSection (답변 시 유의사항)
- ButtonGroup (돌아가기 + 시작하기)

⚠️ 조건부 포함:
- DisclaimerCard (ASRS Intro에만)
- WarningBox (필요 시)
```

### 1.2 Header 규칙

```jsx
✅ DO:
<Header>
  <BackButton onClick={handleBack}>← 돌아가기</BackButton>
  <Badge>검사 단계 표시</Badge>
</Header>

❌ DON'T:
- BackButton 없이 Badge만 사용
- Badge 없이 BackButton만 사용
- 다른 버튼 추가
```

### 1.3 Icon 규칙

```jsx
✅ DO:
- 크기: 64px (font-size)
- 이모지 사용
- 각 검사별로 다른 아이콘 사용 가능

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
```

### 1.4 ButtonGroup 규칙

```jsx
✅ DO:
- 항상 2개 버튼
- 왼쪽: 돌아가기 (outline)
- 오른쪽: 검사 시작하기 (primary)

<ButtonGroup>
  <Button variant="outline" onClick={handleBack}>돌아가기</Button>
  <Button size="lg" onClick={handleStart}>검사 시작하기</Button>
</ButtonGroup>

❌ DON'T:
- 1개 또는 3개 이상의 버튼
- 버튼 순서 변경
- variant 변경
```

---

## 📝 Rule 2: Test 페이지 (실제 검사)

### 2.1 필수 구조

```
✅ 고정 순서로 포함:
1. Header (ExitButton + MiniStepper)
2. ProgressBar
3. StageBadge
4. InstructionCard (첫 질문에만)
5. QuestionCardContainer
   └─ QuestionCard
      ├─ QuestionHeader
      ├─ QuestionText
      ├─ HintBox (선택적)
      ├─ AnswerSection
      └─ ButtonGroup
6. Hint (하단)
```

### 2.2 Header 규칙 ⭐ 중요

```jsx
✅ DO: 항상 ExitButton + MiniStepper
<Header>
  <ExitButton onClick={handleExit}>← 나가기</ExitButton>
  <MiniStepper
    currentStep={currentStepIndex}
    steps={testSteps}
    label="검사명 진행 중"
  />
</Header>

❌ DON'T:
- MiniStepper만 사용 (ExitButton 없이)
- 다른 레이아웃 구조 사용
```

**Styled Component:**

```css
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;
```

### 2.3 Progress 표시 규칙 ⭐ 중요

```jsx
✅ DO: ProgressBar 컴포넌트 사용
<ProgressBar
  current={currentIndex + 1}
  total={totalQuestions}
  variant="primary"
  size="md"
  labelFormat="fraction"
/>

❌ DON'T:
- 커스텀 ProgressSection 사용
- percent 계산해서 직접 전달
- 다른 Progress 표시 방법
```

### 2.4 StageBadge 규칙 ⭐ 중요

```jsx
✅ DO: 동일한 스타일과 구조
<StageBadge>
  검사 단계 이름
  <StageProgress>(n/total)</StageProgress>
</StageBadge>

❌ DON'T:
- 다른 배경색 사용 (primaryLight만 사용)
- 다른 텍스트 색 사용 (primary만 사용)
- 진행 상황 표시 방법 변경
```

**Styled Component:**

```css
const StageBadge = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StageProgress = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  opacity: 0.8;
`;
```

### 2.5 InstructionCard 규칙 ⭐ 중요

```jsx
✅ DO: 첫 질문(currentIndex === 0)에만 표시
{currentIndex === 0 && (
  <InstructionCard padding="lg">
    <InstructionIcon>📊</InstructionIcon>
    <InstructionText>{INSTRUCTION_TEXT}</InstructionText>
  </InstructionCard>
)}

❌ DON'T:
- 모든 질문에 표시
- 다른 조건으로 표시/숨김
- 다른 배경색 사용 (accent만 사용)
```

**Styled Component:**

```css
const InstructionCard = styled(Card)`
  background: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InstructionIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InstructionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.8;
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
```

### 2.6 QuestionCard 규칙

```jsx
✅ DO: 동일한 구조 유지
<QuestionCard padding="xl">
  <QuestionHeader>
    <QuestionNumber>질문 {n} / {total}</QuestionNumber>
    <CategoryBadge>{category}</CategoryBadge>
  </QuestionHeader>
  <QuestionText>{question}</QuestionText>
  <HintBox> {/* 선택적 */}
    <HintIcon>💡</HintIcon>
    <HintText>{hint}</HintText>
  </HintBox>
  <AnswerSection>
    <RadioGroup>{/* RadioOptions */}</RadioGroup>
  </AnswerSection>
  <ButtonGroup>{/* 버튼들 */}</ButtonGroup>
</QuestionCard>

❌ DON'T:
- 구조 순서 변경
- 필수 요소 생략
```

### 2.7 ButtonGroup 규칙 (Test 페이지)

```jsx
✅ DO: 2개 버튼만
<ButtonGroup>
  <Button
    variant="outline"
    onClick={handlePrevious}
    disabled={!canGoPrevious || isTransitioning}
  >
    이전
  </Button>
  <Button
    onClick={handleNext}
    disabled={!hasAnswer || isTransitioning}
  >
    {isLastQuestion ? "완료" : "다음"}
  </Button>
</ButtonGroup>

❌ DON'T:
- 나가기 버튼을 ButtonGroup에 포함 (Header의 ExitButton 사용)
- 3개 이상의 버튼
- 화살표 이모지 사용 (← →)
```

**Styled Component:**

```css
const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;
```

### 2.8 Hint 규칙 (하단)

```jsx
✅ DO: 모든 Test 페이지에 추가
<Hint>
  💡 힌트: 정답은 없습니다. 솔직하게 답변해 주세요.
</Hint>

❌ DON'T:
- Hint 생략
- 다른 스타일 사용
```

**Styled Component:**

```css
const Hint = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.6;
`;
```

### 2.9 애니메이션 규칙

```jsx
✅ DO: slideOutToLeft + slideInFromRight
- 현재 카드: slideOutToLeft (400ms)
- 다음 카드: slideInFromRight (400ms)
- cubic-bezier(0.4, 0, 0.2, 1) 사용

❌ DON'T:
- 다른 방향으로 슬라이드
- 다른 타이밍 함수 사용
- fade만 사용
```

### 2.10 QuestionCardContainer 규칙

```css
✅ DO:
const QuestionCardContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 750px;  /* 고정 */
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 650px;  /* 고정 */
  }
`;

❌ DON'T:
- 다른 min-height 값 사용
- position: relative 제거
```

---

## 🎉 Rule 3: Complete 페이지 (완료 축하)

### 3.1 필수 구조

```
✅ 고정 순서로 포함:
1. CelebrationCard
   ├─ IconWrapper (CelebrationIcon)
   ├─ Title
   ├─ Subtitle
   ├─ ProgressSection
   │  ├─ ProgressTitle
   │  └─ StepIndicator (4단계)
   ├─ MessageBox
   ├─ BreakNotice
   ├─ CountdownSection
   └─ ButtonGroup
```

### 3.2 StepIndicator 규칙 ⭐ 중요

```jsx
✅ DO: 모든 Complete 페이지는 동일한 4단계 구조
<StepIndicator>
  <Step $completed data-completed>
    <StepIcon>✓</StepIcon>
    <StepLabel>ASRS</StepLabel>
    <StepDescription>18문항 완료</StepDescription>
  </Step>
  <StepConnector />
  <Step $completed data-completed>
    <StepIcon>✓</StepIcon>
    <StepLabel>기능 저하</StepLabel>
    <StepDescription>3문항 완료</StepDescription>
  </Step>
  <StepConnector />
  <Step $completed data-completed>
    <StepIcon>✓</StepIcon>
    <StepLabel>WURS</StepLabel>
    <StepDescription>25문항 완료</StepDescription>
  </Step>
  <StepConnector />
  <Step $current data-current>
    <StepIcon>4</StepIcon>
    <StepLabel>결과</StepLabel>
    <StepDescription>종합 분석</StepDescription>
  </Step>
</StepIndicator>

❌ DON'T:
- 3단계 구조 사용 (기능 저하 단계 누락)
- 단계 순서 변경
- StepDescription 생략
```

**Styled Components:**

```css
const StepIcon = styled.div`
  width: 40px;
  height: 40px;  /* 고정 크기 */
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StepDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;
```

### 3.3 Countdown 규칙 ⭐ 중요

```jsx
✅ DO: 모든 Complete 페이지는 8초 통일
const [countdown, setCountdown] = useState(8);

// CountdownFill percentage 계산
<CountdownFill $percentage={(8 - countdown) * 12.5} />

❌ DON'T:
- 다른 카운트다운 시간 사용
- 다른 percentage 계산식 사용
```

### 3.4 CelebrationIcon 규칙

```jsx
✅ DO: 각 단계별 차별화
- AsrsComplete: 🎉
- ImpairmentComplete: ✨
- WursComplete: 🎊

const CelebrationIcon = styled.div`
  font-size: 80px;
  animation: ${bounce} 1s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 64px;
  }
`;
```

### 3.5 ButtonGroup 규칙 (Complete 페이지)

```jsx
✅ DO: 2개 버튼
<ButtonGroup>
  <Button variant="outline" onClick={() => navigate(ROUTES.LANDING)}>
    나중에 하기
  </Button>
  <Button onClick={handleSkip} size="lg" fullWidth>
    다음 단계로 →
  </Button>
</ButtonGroup>

❌ DON'T:
- 1개 버튼만 사용
- variant 변경
- fullWidth 제거
```

---

## 컴포넌트 규칙

## 🎨 Rule 4: 색상 규칙

### 4.1 InstructionCard

```css
✅ DO: accent 배경
background: ${({ theme }) => theme.colors.accent};
border: 2px solid ${({ theme }) => theme.colors.accent};
color: ${({ theme }) => theme.colors.text.primary};

❌ DON'T:
- primaryLight 배경 사용
- border 생략
- 다른 색상 조합
```

### 4.2 StageBadge

```css
✅ DO: primaryLight 배경 + primary 텍스트
background: ${({ theme }) => theme.colors.primaryLight};
color: ${({ theme }) => theme.colors.primary};

❌ DON'T:
- accent 배경 사용
- white 텍스트 사용
```

### 4.3 HintBox (질문 내)

```css
✅ DO:
background: ${({ theme }) => theme.colors.background.tertiary};
color: ${({ theme }) => theme.colors.text.secondary};

❌ DON'T:
- primaryLight 배경 사용
```

### 4.4 Hint (하단)

```css
✅ DO:
background: ${({ theme }) => theme.colors.primaryLight};
color: ${({ theme }) => theme.colors.text.secondary};

❌ DON'T:
- background.tertiary 사용
```

### 4.5 DisclaimerCard

```css
✅ DO:
background: ${({ theme }) => theme.colors.background.primary};
border: 2px solid ${({ theme }) => theme.colors.accent};
color: ${({ theme }) => theme.colors.text.secondary};
```

### 4.6 WarningBox

```css
✅ DO:
background: ${({ theme }) => theme.colors.background.tertiary};
border: 2px solid ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.text.primary};
```

---

## 📏 Rule 5: 크기 규칙

### 5.1 아이콘 크기

| 컴포넌트                | 크기                     | 사용처                    |
| ----------------------- | ------------------------ | ------------------------- |
| **Icon (Intro)**        | `64px`                   | Intro 페이지 메인 아이콘  |
| **CelebrationIcon**     | `80px` / `64px` (mobile) | Complete 페이지           |
| **StepIcon (Complete)** | `40px × 40px`            | Complete 페이지 진행 표시 |
| **InstructionIcon**     | `1.5rem`                 | Test 페이지 지시문        |
| **MessageIcon**         | `2xl`                    | Complete 페이지 메시지    |

### 5.2 컨테이너 크기

```css
✅ DO:
const QuestionCardContainer = styled.div`
  min-height: 750px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 650px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
`;
```

### 5.3 간격 규칙

| 용도               | 값                  |
| ------------------ | ------------------- |
| **Section 간격**   | `spacing.xl`        |
| **Button 간격**    | `spacing.md`        |
| **Icon-Text 간격** | `spacing.md`        |
| **Card padding**   | `xl` (QuestionCard) |

---

## 🔤 Rule 6: 타이포그래피 규칙

### 6.1 폰트 크기

| 텍스트 타입         | Font Size              | Font Weight | Color                       |
| ------------------- | ---------------------- | ----------- | --------------------------- |
| **Page Title**      | `3xl` / `2xl` (mobile) | `bold`      | `text.primary` or `primary` |
| **Subtitle**        | `lg` or `base`         | `normal`    | `text.secondary`            |
| **Question Text**   | `2xl` / `xl` (tablet)  | `semibold`  | `text.primary`              |
| **QuestionNumber**  | `sm`                   | `medium`    | `text.secondary`            |
| **InstructionText** | `sm`                   | `medium`    | `text.primary`              |
| **Hint/Warning**    | `sm` or `base`         | `normal`    | `text.secondary`            |

### 6.2 Line Height

```css
✅ DO:
- InstructionText: line-height: 1.8
- Question Text: line-height: 1.6
- Hint Text: line-height: 1.6
- Description: line-height: 1.8
```

---

## ⚡ Rule 7: 애니메이션 규칙

### 7.1 Question Transition

```css
✅ DO:
@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 타이밍 */
animation: slideOutToLeft 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
animation: slideInFromRight 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;

❌ DON'T:
- 다른 방향 사용 (up/down)
- 다른 duration 사용
- linear 또는 ease 사용
```

### 7.2 CelebrationIcon Animation

```css
✅ DO:
@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

animation: ${bounce} 1s ease-in-out infinite;
```

### 7.3 StepIcon (Current) Animation

```css
✅ DO:
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

animation: ${pulse} 2s ease-in-out infinite;
```

---

## 🔧 Rule 8: 반응형 규칙

### 8.1 Breakpoints

```javascript
✅ DO: theme.breakpoints 사용
- mobile: 768px
- tablet: 1024px
- desktop: 1280px

@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  /* Mobile styles */
}

@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
  /* Tablet styles */
}
```

### 8.2 Mobile 레이아웃

```css
✅ DO:
- ButtonGroup: flex-direction: column
- Header: flex-direction: column, align-items: flex-start
- StepIndicator: flex-direction: column, align-items: stretch
- Font sizes: 1단계 작게 (3xl → 2xl, xl → lg)

❌ DON'T:
- 구조 변경
- 요소 숨김 (display: none)
```

---

## 📋 체크리스트

### Intro 페이지 체크리스트

- [ ] Header에 BackButton + Badge 있음
- [ ] Icon 크기 64px
- [ ] MainCard 구조 완전함
- [ ] ButtonGroup 2개 버튼 (돌아가기 + 시작하기)
- [ ] DisclaimerCard (ASRS에만) 또는 생략
- [ ] 반응형 레이아웃 적용

### Test 페이지 체크리스트

- [ ] Header에 ExitButton + MiniStepper 있음
- [ ] ProgressBar 컴포넌트 사용 (current, total props)
- [ ] StageBadge (primaryLight 배경, primary 텍스트)
- [ ] InstructionCard 첫 질문(currentIndex === 0)에만 표시
- [ ] InstructionCard accent 배경 + 2px border
- [ ] QuestionCardContainer min-height: 750px
- [ ] ButtonGroup 2개 버튼만 (이전 + 다음)
- [ ] 하단 Hint 있음
- [ ] 애니메이션 (slideOutToLeft + slideInFromRight)
- [ ] 반응형 레이아웃 적용

### Complete 페이지 체크리스트

- [ ] StepIndicator 4단계 구조 (ASRS → 기능 저하 → WURS → 결과)
- [ ] StepIcon 크기 40px × 40px
- [ ] StepDescription 있음
- [ ] Countdown 8초
- [ ] CountdownFill percentage: (8 - countdown) \* 12.5
- [ ] CelebrationIcon 크기 80px / 64px (mobile)
- [ ] ButtonGroup 2개 버튼 (나중에 + 다음 단계)
- [ ] ProgressTitle 있음
- [ ] 반응형 레이아웃 적용

---

## ✅ 규칙 준수 예시

### ✅ GOOD: ImpairmentTest (규칙 준수)

```jsx
function ImpairmentTest() {
  // ... state

  return (
    <Container>
      <ContentWrapper>
        {/* ✅ Rule 2.2: Header */}
        <Header>
          <ExitButton onClick={handleExit}>← 나가기</ExitButton>
          <MiniStepper currentStep={1} steps={testSteps} />
        </Header>

        {/* ✅ Rule 2.3: ProgressBar */}
        <ProgressBar
          current={currentIndex + 1}
          total={totalQuestions}
          variant="primary"
        />

        {/* ✅ Rule 2.4: StageBadge */}
        <StageBadge>
          기능 저하 평가
          <StageProgress>
            ({currentIndex + 1}/{totalQuestions})
          </StageProgress>
        </StageBadge>

        {/* ✅ Rule 2.5: InstructionCard 첫 질문만 */}
        {currentIndex === 0 && (
          <InstructionCard padding="lg">
            <InstructionIcon>📊</InstructionIcon>
            <InstructionText>{INSTRUCTION}</InstructionText>
          </InstructionCard>
        )}

        {/* ✅ QuestionCard */}
        <QuestionCardContainer>
          <QuestionCard>
            {/* ... */}
            {/* ✅ Rule 2.7: ButtonGroup 2개 */}
            <ButtonGroup>
              <Button variant="outline" onClick={handlePrevious}>
                이전
              </Button>
              <Button onClick={handleNext}>다음</Button>
            </ButtonGroup>
          </QuestionCard>
        </QuestionCardContainer>

        {/* ✅ Rule 2.8: Hint */}
        <Hint>💡 힌트: 솔직하게 답변해 주세요.</Hint>
      </ContentWrapper>
    </Container>
  );
}
```

### ❌ BAD: 규칙 위반 예시

```jsx
function BadTest() {
  return (
    <Container>
      {/* ❌ Rule 2.2 위반: ExitButton 없음 */}
      <Header>
        <MiniStepper currentStep={1} steps={testSteps} />
      </Header>

      {/* ❌ Rule 2.3 위반: 커스텀 Progress */}
      <ProgressSection>
        <ProgressHeader>
          <ProgressLabel>단계명</ProgressLabel>
          <ProgressCount>
            {n} / {total}
          </ProgressCount>
        </ProgressHeader>
        <ProgressBar percent={progress} />
      </ProgressSection>

      {/* ❌ Rule 2.5 위반: 항상 표시 */}
      <InstructionCard>
        <InstructionText>{INSTRUCTION}</InstructionText>
      </InstructionCard>

      {/* ❌ Rule 2.7 위반: 3개 버튼 */}
      <ButtonGroup>
        <Button onClick={handlePrevious}>← 이전</Button>
        <Button onClick={handleExit}>나가기</Button>
        <Button onClick={handleNext}>다음 →</Button>
      </ButtonGroup>

      {/* ❌ Rule 2.8 위반: Hint 없음 */}
    </Container>
  );
}
```

---

## 🎯 Quick Reference (빠른 참조)

### Test 페이지 필수 체크

```
1. ✅ Header = ExitButton + MiniStepper
2. ✅ ProgressBar (current, total)
3. ✅ StageBadge (primaryLight 배경)
4. ✅ InstructionCard (첫 질문만, accent 배경)
5. ✅ ButtonGroup (2개: 이전 + 다음)
6. ✅ Hint (하단)
7. ✅ min-height: 750px
```

### Complete 페이지 필수 체크

```
1. ✅ StepIndicator (4단계: ASRS → 기능 저하 → WURS → 결과)
2. ✅ StepIcon (40px × 40px)
3. ✅ StepDescription (문항수 표시)
4. ✅ Countdown (8초)
5. ✅ ButtonGroup (2개: 나중에 + 다음 단계)
```

### 스타일 필수 체크

```
1. ✅ InstructionCard: accent 배경
2. ✅ StageBadge: primaryLight 배경 + primary 텍스트
3. ✅ Hint: primaryLight 배경
4. ✅ HintBox: background.tertiary
5. ✅ QuestionCardContainer: min-height 750px
```

---

## 📝 변경 이력

### v2.0.0 (2025-01-09) - 현재 버전

- 규칙 기반으로 전면 재작성
- DO / DON'T 예시 추가
- 빠른 참조 섹션 추가
- 체크리스트 강화

### v1.0.0 (2025-01-09)

- 초기 UI 일관성 가이드 작성
- 현재 상태 분석 및 수정 사항 정리

---

**마지막 업데이트:** 2025-01-09  
**담당:** ADHD Test Web UI 팀  
**상태:** ✅ 모든 규칙 적용 완료
