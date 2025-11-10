# 🔧 Troubleshooting Guide

이 문서는 개발 중 발생한 문제들과 해결 방법을 정리합니다.

---

## 📑 목차

1. [테마 속성 오류](#1-테마-속성-오류)
2. [데이터 저장 및 불러오기](#2-데이터-저장-및-불러오기)
3. [라우팅 문제](#3-라우팅-문제)
4. [변수 충돌](#4-변수-충돌)
5. [디버깅 팁](#5-디버깅-팁)

---

## 1. 테마 속성 오류

### 🚨 문제: `Cannot read properties of undefined (reading 'lg')`

**증상:**

```
Result.jsx:361 Uncaught TypeError: Cannot read properties of undefined (reading 'lg')
```

**원인:**
Styled-components에서 잘못된 테마 속성을 참조하여 발생. `theme.js`의 실제 구조와 컴포넌트에서 사용하는 속성명이 불일치.

### ✅ 해결 방법

#### 1) fontSize 속성 (복수형 → 단수형)

❌ **잘못된 사용:**

```javascript
font-size: ${({ theme }) => theme.fontSizes.lg};
```

✅ **올바른 사용:**

```javascript
font-size: ${({ theme }) => theme.fontSize.lg};
```

#### 2) spacing의 특수 크기 (점 표기법 → 괄호 표기법)

❌ **잘못된 사용:**

```javascript
padding: ${({ theme }) => theme.spacing.xxl};
```

✅ **올바른 사용:**

```javascript
padding: ${({ theme }) => theme.spacing["2xl"]};
```

**이유:** `2xl` 같은 속성명은 숫자로 시작하므로 점 표기법 사용 불가

#### 3) shadow 속성 (복수형 → 단수형)

❌ **잘못된 사용:**

```javascript
box-shadow: ${({ theme }) => theme.shadows.lg};
```

✅ **올바른 사용:**

```javascript
box-shadow: ${({ theme }) => theme.shadow.lg};
```

#### 4) colors 속성 (평면 → 중첩 구조)

❌ **잘못된 사용:**

```javascript
color: ${({ theme }) => theme.colors.textPrimary};
background: ${({ theme }) => theme.colors.backgroundSecondary};
border: 1px solid ${({ theme }) => theme.colors.borderLight};
```

✅ **올바른 사용:**

```javascript
color: ${({ theme }) => theme.colors.text.primary};
background: ${({ theme }) => theme.colors.background.secondary};
border: 1px solid ${({ theme }) => theme.colors.border.light};
```

### 🔍 실제 테마 구조 확인

항상 `src/styles/theme.js`를 참조하여 정확한 속성명 사용:

```javascript
// theme.js의 실제 구조
export const theme = {
  colors: {
    text: { primary, secondary, disabled },
    background: { primary, secondary, tertiary },
    border: { light, medium, dark },
    // ...
  },
  fontSize: { xs, sm, md, lg, xl, "2xl", "3xl" },
  spacing: { xs, sm, md, lg, xl, "2xl", "3xl" },
  shadow: { sm, md, lg, xl },
  // ...
};
```

### 🛠️ 대량 수정 방법

Find & Replace로 프로젝트 전체 수정:

```bash
# VS Code에서
Ctrl + Shift + H (Find in Files)

Find: theme\.fontSizes
Replace: theme.fontSize

Find: theme\.shadows
Replace: theme.shadow
```

---

## 2. 데이터 저장 및 불러오기

### 🚨 문제: 검사 완료 후 결과 페이지가 흰 화면

**증상:**

- 모든 질문에 답변했는데 결과 페이지가 빈 화면
- Console에서 "ASRS Answers: {}" (빈 객체)

**원인:**
답변이 Zustand store에 저장되지 않음. `handleComplete` 함수에 저장 로직 미구현.

### ✅ 해결 방법

#### 마지막 질문 답변 시 즉시 저장

```javascript
const handleAnswerChange = (value) => {
  const newAnswers = {
    ...answers,
    [currentQuestion.id]: value,
  };
  setAnswers(newAnswers);

  setTimeout(() => {
    if (isLastQuestion) {
      // ✅ 마지막 질문: Store에 저장 후 완료 페이지로
      const { saveAsrsAnswers } = useTestStore.getState();
      saveAsrsAnswers(newAnswers);
      console.log("✅ ASRS 저장 완료:", newAnswers);
      navigate(ROUTES.ASRS_COMPLETE);
    } else {
      // 다음 질문으로 이동
      setCurrentIndex(currentIndex + 1);
    }
  }, 400);
};
```

#### 중요 포인트

1. **state 업데이트 후 바로 저장**: `setAnswers` 후 비동기로 저장하지 말 것
2. **newAnswers 사용**: 최신 상태를 저장
3. **console.log로 확인**: 저장 시점과 데이터 확인

### 🔍 데이터 흐름 디버깅

```javascript
// 디버그 컴포넌트 예시
const ResultDebug = () => {
  const { asrs, impairment, wurs } = useTestStore();

  console.log("ASRS Store:", asrs);
  console.log("ASRS Answers:", asrs.answers);
  console.log("ASRS Keys:", Object.keys(asrs.answers));

  return (
    <div>
      <h1>데이터 확인</h1>
      <p>ASRS: {Object.keys(asrs.answers).length > 0 ? "✅" : "❌"}</p>
      <p>
        Impairment: {Object.keys(impairment.answers).length > 0 ? "✅" : "❌"}
      </p>
      <p>WURS: {Object.keys(wurs.answers).length > 0 ? "✅" : "❌"}</p>
    </div>
  );
};
```

---

## 3. 라우팅 문제

### 🚨 문제: 검사 완료 후 랜딩 페이지로 돌아감

**증상:**
"결과 페이지는 추후 구현 예정입니다!" 알림 후 메인 페이지로 이동

**원인:**
`WursComplete.jsx`에 임시 코드가 남아있음

### ✅ 해결 방법

```javascript
// WursComplete.jsx
const handleNext = () => {
  // ❌ 잘못된 코드
  // alert("결과 페이지는 추후 구현 예정입니다!");
  // navigate(ROUTES.LANDING);

  // ✅ 올바른 코드
  navigate(ROUTES.RESULT);
};
```

### 📝 개발 시 주의사항

- TODO 주석이 있는 부분은 반드시 구현 완료 확인
- 임시 alert/console.log는 배포 전 제거
- 라우팅 경로는 `src/constants/routes.js` 참조

---

## 4. 변수 충돌

### 🚨 문제: `Identifier 'asrs' has already been declared`

**증상:**

```
Result.jsx:86 Identifier 'asrs' has already been declared
```

**원인:**
같은 스코프에서 변수명 중복 선언

```javascript
// ❌ 잘못된 코드
const { asrs, impairment, wurs } = useTestStore();
// ... 후에
const { asrs, impairment, wurs } = result; // 충돌!
```

### ✅ 해결 방법

Store에서 가져온 변수는 다른 이름 사용:

```javascript
// ✅ 올바른 코드
const {
  asrs: asrsStore,
  impairment: impairmentStore,
  wurs: wursStore,
} = useTestStore();

// 나중에 result에서 가져올 때는 원래 이름 사용 가능
const { asrs, impairment, wurs, comprehensive } = result;
```

---

## 5. 디버깅 팁

### 🎯 효율적인 디버깅 전략

#### 1) Console.log 전략

**체계적인 로그 추가:**

```javascript
console.log("=== 함수 시작 ===");
console.log("입력값:", input);
console.log("처리 후:", processed);
console.log("=== 함수 종료 ===");
```

**이모지 활용으로 가독성 향상:**

```javascript
console.log("✅ 저장 완료:", data);
console.log("⚠️ 경고:", warning);
console.log("❌ 에러:", error);
console.log("🔍 디버그:", debug);
```

#### 2) 임시 디버그 컴포넌트

문제를 격리하여 확인:

```javascript
// src/pages/Result/ResultDebug.jsx
const ResultDebug = () => {
  const store = useTestStore();

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🔍 Store 상태 확인</h1>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};
```

라우팅에 임시 추가:

```javascript
<Route path="/debug" element={<ResultDebug />} />
```

#### 3) React DevTools 활용

1. **Components 탭**: 컴포넌트 props/state 실시간 확인
2. **Profiler 탭**: 렌더링 성능 분석
3. **Hook 검사**: useState, useEffect 등 상태 추적

#### 4) Network 탭

- API 호출 확인
- 응답 데이터 검증
- 에러 상태 코드 확인

### 🚨 흔한 실수들

#### Styled-components Props 전달

❌ **DOM에 전달되는 커스텀 prop:**

```javascript
const Button = styled.button`
  // urgency, variant, fullWidth 같은 커스텀 prop이 DOM에 전달됨
`;

<Button urgency="high" variant="primary" fullWidth />;
// Warning: unknown prop "urgency"
```

✅ **Transient props 사용 ($ 접두사):**

```javascript
const Button = styled.button`
  ${({ $urgency }) => ...}
`;

<Button $urgency="high" $variant="primary" $fullWidth />
```

#### useEffect 의존성 배열

❌ **빠진 의존성:**

```javascript
useEffect(() => {
  doSomething(value);
}, []); // value가 변경되어도 실행 안 됨
```

✅ **올바른 의존성:**

```javascript
useEffect(() => {
  doSomething(value);
}, [value]);
```

### 📊 콘솔 로그 효율적으로 공유하기

#### 방법 1: 전체 텍스트 복사 (추천)

1. Console 탭에서 **Ctrl + A** (전체 선택)
2. **Ctrl + C** (복사)
3. 그대로 붙여넣기

**장점:**

- 에러 스택 트레이스 전체 포함
- 파일명과 줄 번호 명확
- 맥락 파악 용이

#### 방법 2: 필터 활용

Console 상단 필터창에 입력:

- `✅` → 성공 로그만
- `Error` → 에러만
- `Result.jsx` → 특정 파일만

#### 방법 3: Save as...

Console에서 우클릭 → "Save as..." → 로그 파일 저장

### 🔧 디버깅 체크리스트

문제 발생 시 확인할 사항:

- [ ] Console에 에러 메시지가 있는가?
- [ ] Network 탭에서 API 호출이 성공했는가?
- [ ] React DevTools에서 props/state가 올바른가?
- [ ] 브라우저 캐시를 지웠는가? (Ctrl + Shift + R)
- [ ] 최신 코드가 반영되었는가? (HMR 확인)
- [ ] 의존성 패키지가 설치되었는가? (`npm install`)

### 💡 브라우저 캐시 문제

테마나 스타일이 제대로 적용되지 않을 때:

1. **강력 새로고침**: Ctrl + Shift + R (Windows) / Cmd + Shift + R (Mac)
2. **캐시 완전 삭제**: F12 → Network 탭 → "Disable cache" 체크
3. **개발 서버 재시작**: 터미널에서 Ctrl + C → `npm run dev`

---

## 📚 추가 리소스

- [React DevTools 가이드](https://react.dev/learn/react-developer-tools)
- [Chrome DevTools 문서](https://developer.chrome.com/docs/devtools/)
- [Styled-components 디버깅](https://styled-components.com/docs/tooling#debugging)
- [Zustand 디버깅](https://github.com/pmndrs/zustand#debugging)

---

## 🆘 도움이 더 필요하다면?

1. **Console 로그 전체 복사** → 전체 맥락 파악
2. **스크린샷** → 시각적 문제 확인
3. **코드 스니펫** → 구체적 문제 지점 파악
4. **재현 단계** → 문제 발생 시나리오

이 정보들을 제공하면 더 빠르게 해결할 수 있습니다! 😊
