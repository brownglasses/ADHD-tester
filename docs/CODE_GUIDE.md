# 🚀 ADHD 스크리너 - AI 개발 가이드 (Quick Reference)

> 이 문서는 핵심 원칙과 규칙만 담은 요약본입니다. 상세 내용은 `system_prompt.md`, `project_structure.md`, `checklist.md`를 참조하세요.

---

## 💡 프로젝트 목표

**"사용자의 첫걸음을 돕는 신뢰할 수 있는 ADHD 스크리닝 도구"**

- 가독성, 안정성, 확장성을 최우선으로
- 공감 기반 UX: 인지적 부담 최소화
- 전문성: 검증된 척도(ASRS, WURS) 기반

---

## 🛠️ 기술 스택

```
필수 기술:
├── React (함수형 컴포넌트 + Hooks만 사용)
├── Vite (빌드 도구)
├── Zustand (전역 상태 관리)
├── styled-components (스타일링)
└── Firebase (인증 & DB)
    ├── Firebase Auth (구글 + 카카오)
    └── Firestore (사용자 데이터)
```

---

## 📂 폴더 구조 핵심

```
src/
├── pages/           # 라우트 페이지 (Landing, Asrs, Wurs, Cpt, Result...)
├── components/      # 전역 재사용 컴포넌트 (Button, Modal, Header...)
├── store/          # Zustand (useAuthStore, useTestStore, useUIStore)
├── services/       # API 호출 (firebase/)
├── constants/      # 상수 데이터 (질문, 라우트, 설정)
├── utils/          # 유틸 함수
├── styles/         # 전역 스타일 (theme.js, GlobalStyles.js)
└── hooks/          # 커스텀 훅
```

**파일 배치 규칙:**

- `pages/`: 라우트 URL과 1:1 매칭되는 페이지 (Landing, Asrs, Wurs, Result)
- `components/`: 2개 이상 페이지에서 재사용
- 특정 페이지 전용 → `pages/{페이지}/` 안에 배치

---

## ✅ 5대 원칙 (반드시 준수)

### 1️⃣ 공감 기반 UX

- "사용자는 이미 지쳐있다" → 명료함 > 화려함
- 불필요한 애니메이션, 긴 텍스트 금지

### 2️⃣ 1화면 1과업

- 설문: 한 번에 한 질문만
- 결과: 한 눈에 파악 가능한 명확한 정보

### 3️⃣ 전문성을 통한 신뢰

- **"진단" 용어 절대 금지** ⚠️
- Disclaimer 명확히 표시
- 검증된 척도 기반

### 4️⃣ 적시 정보 제공

- 필요한 순간에만 정보 제공
- 긴 설명 미리 보여주지 않기

### 5️⃣ 빠른 반복

- 완벽함 < 완주
- 헌법 준수했다면 다음 기능으로

---

## 🎨 코드 작성 규칙

### 네이밍

```javascript
// 컴포넌트: PascalCase
AsrsTest.jsx;

// 함수/변수: camelCase
calculateResult, currentIndex;

// 상수: UPPER_SNAKE_CASE
ASRS_QUESTIONS, ROUTES;
```

### 컴포넌트 구조

```javascript
// ✅ 항상 이렇게
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button";
import { useTestStore } from "@store/useTestStore";
import { ASRS_QUESTIONS } from "@constants/asrsQuestions";
import styled from "styled-components";

function AsrsTest() {
  // 1. 로컬 상태
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. 전역 상태 (Zustand)
  const saveAnswer = useTestStore((state) => state.saveAsrsAnswer);

  // 3. 로직
  const handleNext = () => { ... };

  // 4. 렌더링
  return (
    <Container>
      <Title>질문 {currentIndex + 1}</Title>
      <Button onClick={handleNext}>다음</Button>
    </Container>
  );
}

export default AsrsTest;

// 5. 스타일 (하단에 배치)
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;
```

### Import 순서

1. React 관련
2. 외부 라이브러리
3. 컴포넌트 (@components, @pages)
4. Store (@store)
5. Utils/Constants (@utils, @constants)
6. 스타일

---

## 🗄️ 상태 관리

### 전역 (Zustand) - 여러 페이지에서 필요한 것만

```javascript
useAuthStore; // 사용자 인증 정보
useTestStore; // ASRS/WURS 답변 & 결과
useUIStore; // 모달, 로딩, 알림
```

### 로컬 (useState) - 컴포넌트 내부에서만

```javascript
currentIndex; // 현재 질문 번호
formInput; // 입력값
isModalOpen; // 모달 상태
```

**원칙:** "여러 페이지에서 필요한가?" → YES면 Zustand, NO면 useState

---

## 🎨 스타일링

```javascript
// ✅ styled-components 필수
const Button = styled.button`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
`;

// ❌ 금지
<div style={{ padding: "1rem" }}></div>; // inline style
```

**필수:**

- styled-components만 사용
- `theme.js`의 변수 사용 (색상, 폰트 하드코딩 금지)
- 의미있는 이름 (Div1, Div2 ❌)

---

## 🔐 Firebase & API

### 로직 분리

```javascript
// ✅ Good - services에 분리
// src/services/firebase/firestore.js
export const saveTestResult = async (userId, data) => {
  await setDoc(doc(db, "users", userId, "testResults", data.id), data);
};

// src/pages/Result/Result.jsx
import { saveTestResult } from "@services/firebase/firestore";
```

### API 키 관리

```javascript
// ✅ 환경변수 사용
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
};

// ❌ 하드코딩 금지
const config = {
  apiKey: "AIzaSy...", // ❌
};
```

### 에러 처리

```javascript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

try {
  setLoading(true);
  await signInWithGoogle();
} catch (err) {
  setError("로그인 실패");
} finally {
  setLoading(false);
}
```

---

## 🚫 절대 금지 사항

```
❌ Class 컴포넌트
❌ inline style (<div style={{...}}>)
❌ API 키 하드코딩
❌ "진단" 용어 사용
❌ 상대 경로 남발 (../../../)
❌ 전역 상태 남용
❌ 하드코딩 (질문, 라우트 등)
```

---

## 📦 필수 패키지

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-router-dom": "^6.x",
    "zustand": "^4.x",
    "styled-components": "^6.x",
    "firebase": "^10.x"
  }
}
```

---

## ⚡ 빠른 체크리스트

코드 생성 전:

- [ ] 파일 위치 결정 (pages vs components)
- [ ] 파일명 PascalCase
- [ ] 필요한 상수 확인

코드 작성 시:

- [ ] 함수형 컴포넌트
- [ ] 절대 경로 import (@components, @store...)
- [ ] 전역 vs 로컬 상태 구분
- [ ] styled-components 사용
- [ ] 하드코딩 없음

제출 전:

- [ ] 5대 원칙 준수
- [ ] console.log 제거
- [ ] 파일 경로 명시
- [ ] 추가 작업 안내

---

## 📝 응답 형식

```markdown
## 📄 생성된 파일: `src/pages/Asrs/AsrsTest.jsx`

**설명:** ASRS 설문 페이지 - 한 번에 한 질문씩 표시

**주요 기능:**

- 6개 질문 순차 표시
- Zustand에 답변 저장
- 완료 시 자동 이동

[코드]

**필요한 추가 작업:**

- `npm install zustand` 실행
- `constants/asrsQuestions.js` 생성 필요
```

---

## 🎯 핵심 원칙 한 줄 요약

> **"함수형 + Zustand + styled-components + 절대경로 + 하드코딩금지 + 진단용어금지 + 1화면1과업"**

---

**더 자세한 내용:**

- `system_prompt.md` - 상세 헌법 & 5대 원칙
- `project_structure.md` - 폴더 구조 & Firebase 설정
- `checklist.md` - 10단계 검증 체크리스트
