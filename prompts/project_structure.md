# 📁 ADHD 스크리너 프로젝트 구조

## 🏗️ 전체 폴더 구조

```
adhd_test_web/
├── public/                          # 정적 파일
│   ├── favicon.ico
│   └── logo.png
│
├── src/
│   ├── main.jsx                     # 앱 진입점
│   ├── App.jsx                      # 라우팅 루트
│   │
│   ├── pages/                       # 페이지 컴포넌트 (라우트 단위)
│   │   ├── Landing/
│   │   │   ├── Landing.jsx         # 랜딩 페이지
│   │   │   └── LandingHero.jsx     # 랜딩 페이지 전용 하위 컴포넌트
│   │   │
│   │   ├── Auth/
│   │   │   └── Login.jsx           # 로그인 페이지
│   │   │
│   │   ├── Asrs/
│   │   │   ├── AsrsIntro.jsx       # ASRS 설명 페이지
│   │   │   ├── AsrsTest.jsx        # ASRS 설문 페이지
│   │   │   └── QuestionCard.jsx    # ASRS 전용 질문 카드
│   │   │
│   │   ├── Wurs/
│   │   │   ├── WursIntro.jsx
│   │   │   └── WursTest.jsx
│   │   │
│   │   ├── Cpt/
│   │   │   ├── CptIntro.jsx
│   │   │   └── CptTest.jsx         # CPT 과제 실행 페이지
│   │   │
│   │   ├── Result/
│   │   │   ├── Result.jsx          # 최종 결과 페이지
│   │   │   ├── ScoreCard.jsx       # 결과 전용 점수 카드
│   │   │   └── HospitalMap.jsx     # 병원 지도 컴포넌트
│   │   │
│   │   ├── Hospital/
│   │   │   └── HospitalList.jsx    # 병원 목록 페이지
│   │   │
│   │   ├── Privacy/
│   │   │   └── PrivacyPolicy.jsx   # 개인정보 처리방침
│   │   │
│   │   └── Faq/
│   │       └── Faq.jsx              # FAQ 페이지
│   │
│   ├── components/                  # 전역 재사용 컴포넌트
│   │   ├── Button.jsx              # 공통 버튼
│   │   ├── ProgressBar.jsx         # 진행률 바
│   │   ├── Modal.jsx               # 모달
│   │   ├── Header.jsx              # 헤더
│   │   ├── Footer.jsx              # 푸터
│   │   └── Loading.jsx             # 로딩 스피너
│   │
│   ├── store/                       # Zustand 전역 상태 관리
│   │   ├── useAuthStore.js         # 인증 상태 (유저 정보)
│   │   ├── useTestStore.js         # 테스트 답변 & 결과 (ASRS, WURS, CPT)
│   │   └── useUIStore.js           # UI 상태 (모달, 로딩 등)
│   │
│   ├── services/                    # 외부 API & Firebase 통신
│   │   ├── firebase/
│   │   │   ├── config.js           # Firebase 초기화 설정
│   │   │   ├── auth.js             # 인증 관련 (로그인/로그아웃)
│   │   │   ├── firestore.js        # Firestore CRUD
│   │   │   └── functions.js        # Firebase Functions 호출 (카카오 인증용)
│   │   │
│   │   └── kakao/
│   │       └── kakaoAuth.js        # 카카오 SDK 로그인 로직
│   │
│   ├── utils/                       # 유틸리티 함수
│   │   ├── calculateScore.js       # 점수 계산 로직
│   │   ├── formatDate.js           # 날짜 포맷팅
│   │   └── validators.js           # 입력 검증
│   │
│   ├── constants/                   # 상수 데이터
│   │   ├── asrsQuestions.js        # ASRS 질문 데이터
│   │   ├── wursQuestions.js        # WURS 질문 데이터
│   │   ├── cptConfig.js            # CPT 타이머/설정 상수
│   │   └── routes.js               # 라우트 경로 상수
│   │
│   ├── styles/                      # 전역 스타일
│   │   ├── GlobalStyles.js         # styled-components GlobalStyle
│   │   ├── theme.js                # 테마 변수 (색상, 폰트 등)
│   │   └── reset.css               # CSS 리셋
│   │
│   ├── hooks/                       # 커스텀 훅
│   │   ├── useAuth.js              # 인증 관련 훅
│   │   ├── useTimer.js             # CPT 타이머 훅
│   │   └── useLocalStorage.js      # localStorage 동기화 훅
│   │
│   └── assets/                      # 이미지, 폰트 등
│       ├── images/
│       └── fonts/
│
├── functions/                       # Firebase Cloud Functions (카카오 인증 변환)
│   ├── index.js
│   └── package.json
│
├── config/                          # API 키 & 설정
│   ├── api_keys.json               # ⚠️ Git에 올라가지 않음
│   ├── api_keys.example.json       # 템플릿
│   └── README.md
│
├── prompts/                         # AI 프롬프트 파일들
│   ├── system_prompt.md
│   ├── user_prompt.md
│   └── project_structure.md
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 📋 파일 배치 규칙

### ✅ **pages/ 디렉토리**

- **원칙:** 라우트 URL과 1:1 매칭되는 페이지 컴포넌트만 배치
- **하위 컴포넌트:** 해당 페이지에서만 사용되는 컴포넌트는 같은 폴더 안에 배치
- **예시:** `QuestionCard.jsx`가 ASRS에서만 쓰인다면 → `pages/Asrs/QuestionCard.jsx`

### ✅ **components/ 디렉토리**

- **원칙:** 2개 이상의 페이지에서 재사용되는 컴포넌트만 배치
- **예시:** `Button`, `Modal`, `ProgressBar`, `Header`

### ✅ **store/ 디렉토리**

- **원칙:** Zustand 스토어는 도메인별로 분리
- `useAuthStore` - 사용자 인증 상태
- `useTestStore` - 설문/CPT 답변 & 결과
- `useUIStore` - 모달, 로딩, 알림 등 UI 상태

### ✅ **services/ 디렉토리**

- **원칙:** 외부 API 호출 로직은 컴포넌트에서 분리
- Firebase, 카카오 등 서비스별로 폴더 구분

### ✅ **constants/ 디렉토리**

- **원칙:** 하드코딩 금지! 모든 질문 데이터, 설정값은 상수로 관리
- ASRS/WURS 질문, CPT 타이머 설정, 라우트 경로 등

---

## 🔐 Firebase & 인증 구조

### 1. **Firebase 설정 파일**

```javascript
// src/services/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ API 키는 config/api_keys.json에서 불러옴
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "...",
  projectId: "...",
  // ...
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 2. **인증 흐름**

```
구글 로그인:
  사용자 클릭 → Firebase Auth (Google Provider) → 완료 ✅

카카오 로그인:
  사용자 클릭
  → 카카오 SDK (kakaoAuth.js)
  → 카카오 토큰 받기
  → Firebase Functions 호출 (functions/index.js)
  → Firebase Custom Token 생성
  → Firebase Auth 로그인 완료 ✅
```

### 3. **Firestore 데이터 구조**

```
users/{userId}/
  - profile: {
      displayName, email, provider, createdAt, lastVisit
    }
  - testResults/{testId}/
      - metadata: { startedAt, completedAt }
      - asrs: { answers: [], score: number, interpretation: string }
      - wurs: { answers: [], score: number }
      - cpt: {
          correctCount, missCount, falseAlarmCount,
          averageReactionTime, result: string
        }
```

---

## 🚫 Git에 절대 올리지 않을 파일들

```gitignore
# Firebase 설정 (실제 키 포함된 것만)
config/api_keys.json
.env
.env.local

# Firebase Functions 의존성
functions/node_modules/

# Firebase 로컬 에뮬레이터
.firebase/
firebase-debug.log
firestore-debug.log
```

---

## 🔄 라우팅 구조 (React Router 기준)

```javascript
// src/constants/routes.js
export const ROUTES = {
  LANDING: "/",
  LOGIN: "/login",
  ASRS_INTRO: "/asrs/intro",
  ASRS_TEST: "/asrs/test",
  WURS_INTRO: "/wurs/intro",
  WURS_TEST: "/wurs/test",
  CPT_INTRO: "/cpt/intro",
  CPT_TEST: "/cpt/test",
  RESULT: "/result",
  HOSPITAL: "/hospital",
  PRIVACY: "/privacy",
  FAQ: "/faq",
};
```

```javascript
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING} element={<Landing />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        {/* ... */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 📦 필수 패키지 (package.json)

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "zustand": "^4.x",
    "styled-components": "^6.x",
    "firebase": "^10.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

**카카오 로그인:**

```html
<!-- public/index.html -->
<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
```

---

## ✅ AI 코드 생성 시 체크사항

파일을 생성할 때 반드시 다음을 확인:

1. [ ] 파일이 올바른 폴더에 위치하는가? (pages vs components)
2. [ ] import 경로가 정확한가? (상대경로 vs 절대경로)
3. [ ] 상수는 constants/에서 불러오는가? (하드코딩 금지)
4. [ ] Firebase 관련 로직은 services/firebase/에 있는가?
5. [ ] 전역 상태는 Zustand store를 사용하는가?
6. [ ] styled-components를 사용하는가?
7. [ ] API 키는 환경변수로 관리하는가?

---

## 💡 추가 참고사항

### **절대 경로 import 설정 (vite.config.js)**

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@constants": path.resolve(__dirname, "./src/constants"),
    },
  },
});
```

이렇게 하면 import가 깔끔해집니다:

```javascript
// ❌ Before
import Button from "../../../components/Button";

// ✅ After
import Button from "@components/Button";
```
