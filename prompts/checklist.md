# ✅ AI 코드 생성 체크리스트

> 이 체크리스트는 AI가 코드를 생성할 때마다 **반드시** 확인해야 하는 항목들입니다.
> 모든 항목을 통과해야만 코드를 사용자에게 제출할 수 있습니다.

---

## 🎯 단계 1: 코드 생성 전 (Pre-Flight Check)

**요구사항 이해**

- [ ] 사용자의 요청이 명확한가?
- [ ] 어떤 페이지/컴포넌트를 만들어야 하는지 파악했는가?
- [ ] 이 기능이 기존 기능과 중복되지 않는가?
- [ ] 필요한 데이터(상수, API)를 확인했는가?

**파일 위치 결정**

- [ ] `pages/` vs `components/` 구분이 명확한가?
  - 라우트 페이지인가? → `pages/`
  - 2개 이상 페이지에서 재사용되는가? → `components/`
  - 특정 페이지 전용인가? → 해당 `pages/{Page}/` 안에 배치
- [ ] 파일명이 PascalCase인가? (예: `AsrsTest.jsx`)
- [ ] 폴더 구조가 `project_structure.md`를 따르는가?

---

## 🧩 단계 2: 컴포넌트 작성 (Component Creation)

### ✅ 기본 구조

- [ ] 함수형 컴포넌트로 작성했는가? (Class 컴포넌트 ❌)
- [ ] export default를 사용했는가?
- [ ] 컴포넌트명이 파일명과 일치하는가?

```javascript
// ✅ Good
function AsrsTest() {
  return <div>...</div>;
}
export default AsrsTest;

// ❌ Bad
class AsrsTest extends Component { ... }
```

### ✅ Import 순서 & 경로

- [ ] import 순서가 올바른가?
  1. React 관련
  2. 외부 라이브러리
  3. 내부 컴포넌트 (@components, @pages)
  4. Store (@store)
  5. Utils/Constants (@utils, @constants)
  6. 스타일

```javascript
// ✅ Good
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import { useTestStore } from "@store/useTestStore";
import { ASRS_QUESTIONS } from "@constants/asrsQuestions";
import { Container, Title } from "./AsrsTest.styles";
```

- [ ] 절대 경로(`@components`, `@pages` 등)를 사용했는가?
- [ ] 상대 경로(`../../`)는 최대한 피했는가?

### ✅ Props 설계

- [ ] Props가 명시적으로 정의되어 있는가?
- [ ] Props 개수가 3개 이하인가? (많으면 리팩토링 고려)
- [ ] Props에 기본값이 필요하면 설정했는가?

```javascript
// ✅ Good
function QuestionCard({ question, onAnswer, isActive }) {
  // ...
}

// ❌ Bad - 너무 많은 props
function QuestionCard({ q, a, b, c, d, e, f, g }) {
  // ...
}
```

### ✅ 단일 책임 원칙 (SRP)

- [ ] 이 컴포넌트가 **하나의 역할**만 수행하는가?
- [ ] 너무 많은 기능이 있다면 분리해야 하는가?

```javascript
// ❌ Bad - AsrsTest가 너무 많은 일을 함
function AsrsTest() {
  // 설문 로직 + 점수 계산 + Firebase 저장 + 결과 표시
}

// ✅ Good - 각 역할을 분리
function AsrsTest() {
  // 설문 로직만
}
function ResultPage() {
  // 결과 표시만
}
```

---

## 🗄️ 단계 3: 상태 관리 (State Management)

### ✅ 로컬 vs 전역 상태 판단

- [ ] 이 상태가 **여러 페이지**에서 필요한가?
  - YES → Zustand (`useTestStore`, `useAuthStore`, `useUIStore`)
  - NO → `useState` 또는 `useReducer`

**전역 상태로 관리해야 하는 것:**

- [ ] 사용자 인증 정보 (`useAuthStore`)
- [ ] ASRS/WURS/CPT 답변 & 결과 (`useTestStore`)
- [ ] 모달, 로딩 상태 (`useUIStore`)

**로컬 상태로 관리해야 하는 것:**

- [ ] 현재 질문 인덱스
- [ ] 폼 입력값
- [ ] 애니메이션 상태
- [ ] 모달 열림/닫힘 (특정 컴포넌트 전용인 경우)

```javascript
// ✅ Good - 로컬 상태
function AsrsTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const saveAnswer = useTestStore((state) => state.saveAsrsAnswer); // 전역
}

// ❌ Bad - 불필요한 전역 상태
const useTestStore = create((set) => ({
  currentQuestionIndex: 0, // ❌ 이건 로컬 상태여야 함
}));
```

### ✅ Zustand Store 사용법

- [ ] Store에서 필요한 것만 구독하는가? (불필요한 리렌더링 방지)
- [ ] Store 업데이트 함수는 액션(동사)으로 네이밍했는가?

```javascript
// ✅ Good - 필요한 것만 구독
const answers = useTestStore((state) => state.asrsAnswers);
const saveAnswer = useTestStore((state) => state.saveAsrsAnswer);

// ❌ Bad - 전체 store 구독 (불필요한 리렌더링)
const store = useTestStore();
```

---

## 🎨 단계 4: 스타일링 (Styling)

### ✅ styled-components 사용

- [ ] **반드시** styled-components를 사용했는가? (CSS, inline style ❌)
- [ ] 스타일 컴포넌트는 파일 하단 또는 별도 `.styles.js` 파일에 정의했는가?
- [ ] 스타일 컴포넌트명이 의미있는 이름인가? (Div1, Div2 ❌)

```javascript
// ✅ Good
import styled from "styled-components";

function AsrsTest() {
  return (
    <Container>
      <Title>ASRS 설문</Title>
      <QuestionBox>...</QuestionBox>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

// ❌ Bad
<div style={{ padding: "2rem" }}></div>; // inline style ❌
```

### ✅ 테마 변수 사용

- [ ] 색상, 폰트 크기는 `theme.js`의 변수를 사용했는가?
- [ ] 하드코딩된 색상 값이 없는가? (`#333` ❌)

```javascript
// ✅ Good
const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// ❌ Bad
const Title = styled.h1`
  font-size: 32px;
  color: #333;
`;
```

### ✅ 반응형 고려

- [ ] 모바일 화면을 고려했는가?
- [ ] 폰트 크기가 너무 작지 않은가? (최소 14px)
- [ ] 터치 영역이 충분한가? (버튼 최소 44px × 44px)

---

## 🔐 단계 5: Firebase & API 연동

### ✅ Firebase 관련 로직 분리

- [ ] Firebase 호출 로직이 `services/firebase/` 안에 있는가?
- [ ] 컴포넌트에서 직접 Firebase를 호출하지 않았는가?

```javascript
// ✅ Good
// src/services/firebase/firestore.js
export const saveTestResult = async (userId, testData) => {
  const docRef = doc(db, "users", userId, "testResults", testData.id);
  await setDoc(docRef, testData);
};

// src/pages/Result/Result.jsx
import { saveTestResult } from "@services/firebase/firestore";

function Result() {
  const handleSave = async () => {
    await saveTestResult(user.uid, results);
  };
}

// ❌ Bad - 컴포넌트에서 직접 Firebase 호출
function Result() {
  const handleSave = async () => {
    await setDoc(doc(db, "users", user.uid), data); // ❌
  };
}
```

### ✅ API 키 관리

- [ ] API 키가 하드코딩되어 있지 않은가?
- [ ] 환경변수(`import.meta.env.VITE_XXX`)를 사용했는가?
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는가?

```javascript
// ✅ Good
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
};

// ❌ Bad
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXX", // ❌ 하드코딩
};
```

### ✅ 에러 처리

- [ ] try-catch로 에러를 처리했는가?
- [ ] 에러 발생 시 사용자에게 피드백을 제공하는가?
- [ ] 로딩 상태를 표시하는가?

```javascript
// ✅ Good
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleLogin = async () => {
  setLoading(true);
  setError(null);
  try {
    await signInWithGoogle();
  } catch (err) {
    setError("로그인에 실패했습니다. 다시 시도해주세요.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

---

## 📐 단계 6: 상수 & 하드코딩

### ✅ 하드코딩 금지

- [ ] 질문 데이터가 `constants/` 폴더에 정의되어 있는가?
- [ ] 라우트 경로가 `constants/routes.js`를 사용하는가?
- [ ] 설정값(CPT 타이머 등)이 `constants/cptConfig.js`에 있는가?

```javascript
// ✅ Good
import { ASRS_QUESTIONS } from "@constants/asrsQuestions";
import { ROUTES } from "@constants/routes";

function AsrsTest() {
  const questions = ASRS_QUESTIONS;
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(ROUTES.WURS_INTRO);
  };
}

// ❌ Bad
function AsrsTest() {
  const questions = [
    { id: 1, text: "질문 1" }, // ❌ 하드코딩
  ];

  navigate("/wurs/intro"); // ❌ 라우트 하드코딩
}
```

---

## 🧪 단계 7: 사용자 경험 (UX) 검증

### ✅ 5대 원칙 준수

**[제 1원칙] 공감 기반 UX**

- [ ] 불필요한 애니메이션이나 화려한 효과를 제거했는가?
- [ ] 텍스트가 명료하고 간결한가?
- [ ] 사용자가 혼란스러워할 요소가 없는가?

**[제 2원칙] 1화면 1과업**

- [ ] 한 화면에 한 가지 작업만 요구하는가?
- [ ] ASRS/WURS는 한 번에 한 질문만 표시하는가?
- [ ] CPT 화면에 불필요한 UI(진행 바, 타이머)가 없는가?

**[제 3원칙] 전문성을 통한 신뢰**

- [ ] "진단"이라는 단어를 사용하지 않았는가?
- [ ] Disclaimer(주의사항)가 명확히 표시되는가?
- [ ] 검증된 척도(ASRS, WURS)를 기반으로 하는가?

**[제 4원칙] 적시 정보 제공**

- [ ] 긴 설명을 미리 보여주지 않았는가?
- [ ] 정보를 필요한 시점에 제공하는가?

**[제 5원칙] 빠른 반복**

- [ ] 완벽하지 않아도 헌법을 준수했다면 완료로 간주하는가?
- [ ] 과도한 최적화에 집착하지 않았는가?

---

## ⚡ 단계 8: 성능 & 최적화 (Optional)

**이 단계는 필수가 아닙니다. 헌법과 원칙을 준수했다면 넘어가도 됩니다.**

- [ ] 무거운 연산이 있다면 `useMemo`를 고려했는가?
- [ ] 불필요한 리렌더링이 발생하지 않는가?
- [ ] 이미지를 최적화했는가?

---

## 🚫 단계 9: 금지 사항 확인

### ❌ 절대 하지 말아야 할 것들

- [ ] Class 컴포넌트를 사용하지 않았는가?
- [ ] inline style을 사용하지 않았는가?
- [ ] API 키를 하드코딩하지 않았는가?
- [ ] "진단"이라는 단어를 사용하지 않았는가?
- [ ] 외부 라이브러리를 무분별하게 추가하지 않았는가?
- [ ] 상대 경로(`../../../`)를 남발하지 않았는가?
- [ ] 전역 상태를 남용하지 않았는가?

---

## 📝 단계 10: 코드 제출 전 최종 체크

### ✅ 최종 확인

- [ ] 코드에 console.log가 남아있지 않은가?
- [ ] 주석은 꼭 필요한 것만 있는가?
- [ ] 파일 경로를 명시했는가?
- [ ] 사용자에게 어떤 파일을 만들었는지 설명했는가?
- [ ] 추가로 필요한 작업(npm install 등)을 안내했는가?

### ✅ 응답 형식

사용자에게 코드를 제출할 때 다음 형식을 따르는가?

```
## 📄 생성된 파일: `src/pages/Asrs/AsrsTest.jsx`

**설명:** ASRS 설문 페이지 - 한 번에 한 질문씩 표시

**주요 기능:**
- 6개 질문 순차 표시
- Zustand에 답변 저장
- 모든 질문 완료 시 자동 이동

[코드]

**필요한 추가 작업:**
- `npm install zustand` 실행 필요
- `constants/asrsQuestions.js` 파일 생성 필요
```

---

## ✅ 체크리스트 통과!

위의 모든 항목을 확인했다면, 코드를 자신있게 제출하세요! 🎉

**중요:** 헌법(`system_prompt.md`)과 5대 원칙을 항상 최우선으로 합니다.
