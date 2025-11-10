# ADHD 스크리너

> 사용자의 첫걸음을 돕는 신뢰할 수 있는 ADHD 스크리닝 도구

## 📋 프로젝트 소개

ADHD 증상 자가진단을 위한 웹 기반 스크리닝 도구입니다. 검증된 의학적 척도를 기반으로 신뢰할 수 있는 결과를 제공하며, 사용자 친화적인 인터페이스로 쉽고 빠르게 자가진단을 수행할 수 있습니다.

### 주요 기능

#### 📝 검증된 검사 도구

- ✅ **ASRS-v1.1** - WHO 성인 ADHD 자가진단 척도 (18문항)
- ✅ **DSM-5 기능 저하 평가** - 일상생활 영향도 측정 (3문항)
- ✅ **WURS** - 아동기 증상 회상 척도 (25문항)

#### 📊 상세한 결과 분석

- 🎯 **종합 평가** - 의학적 근거 기반 ADHD 가능성 판정
- 📈 **카테고리별 분석** - 부주의/과잉행동/충동성 등 세부 영역 분석
- 📉 **시각화** - 레이더 차트, 바 차트로 직관적인 결과 표현
- 📄 **PDF 다운로드** - 검사 결과를 파일로 저장하여 병원 방문 시 활용

#### 🏥 실용적 기능

- 🗺️ **병원 찾기** - 지역별 ADHD 전문 병원 정보 및 지도 연동
- 🚀 **자동 진행** - 답변 선택 시 자동으로 다음 질문으로 이동
- 💾 **자동 저장** - 답변 데이터 자동 저장으로 중간에 종료해도 안전

## 🛠️ 기술 스택

### Core

- **Frontend**: React 18 + Vite
- **State Management**: Zustand
- **Styling**: styled-components
- **Routing**: React Router v6

### Libraries

- **Charts**: Recharts (레이더, 바 차트)
- **PDF**: jsPDF + jspdf-autotable
- **Backend**: Firebase (Auth + Firestore)

## 📂 프로젝트 구조

```
adhd_test_web/
├── src/
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── Landing/       # 랜딩 페이지
│   │   ├── Asrs/          # ASRS 검사
│   │   ├── Impairment/    # 기능 저하 검사
│   │   ├── Wurs/          # WURS 검사
│   │   ├── Result/        # 결과 페이지
│   │   └── Hospital/      # 병원 찾기
│   ├── components/         # 재사용 컴포넌트
│   │   ├── charts/        # 차트 컴포넌트
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── RadioGroup.jsx
│   │   └── ...
│   ├── store/             # Zustand 스토어
│   │   ├── useTestStore.js    # 검사 데이터 관리
│   │   ├── useAuthStore.js    # 인증 관리
│   │   └── useUIStore.js      # UI 상태 관리
│   ├── utils/             # 유틸리티 함수
│   │   ├── scoring.js         # 점수 계산
│   │   ├── categoryAnalysis.js # 카테고리 분석
│   │   └── pdfGenerator.js    # PDF 생성
│   ├── constants/         # 상수 데이터
│   │   ├── asrsQuestions.js   # ASRS 문항
│   │   ├── wursQuestions.js   # WURS 문항
│   │   ├── hospitals.js       # 병원 정보
│   │   └── routes.js          # 라우팅 경로
│   ├── styles/            # 전역 스타일
│   │   ├── theme.js          # 테마 정의
│   │   └── GlobalStyles.js   # 글로벌 스타일
│   └── ...
├── docs/                  # 문서
│   ├── SCORING_GUIDE.md      # 점수 계산 가이드
│   ├── IMPLEMENTATION_GUIDE.md # 구현 가이드
│   ├── UI_CONSISTENCY_GUIDE.md # UI 가이드
│   └── ...
├── CHANGELOG.md           # 변경 이력
├── TROUBLESHOOTING.md     # 문제 해결 가이드
└── README.md             # 프로젝트 소개
```

## 🚀 시작하기

### 요구사항

- Node.js 16.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone <repository-url>
cd adhd_test_web

# 의존성 설치
npm install

# 환경 변수 설정
cp config/api_keys.example.json config/api_keys.json
# api_keys.json에 필요한 API 키 입력
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 📝 개발 가이드

### 문서

프로젝트의 개발 원칙과 가이드:

- 📖 [CHANGELOG.md](CHANGELOG.md) - 변경 이력 및 버전 관리
- 🔧 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - 문제 해결 가이드
- 📊 [docs/SCORING_GUIDE.md](docs/SCORING_GUIDE.md) - 점수 계산 로직 및 의학적 근거
- 🛠️ [docs/IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md) - 기능 구현 가이드
- 🎨 [docs/UI_CONSISTENCY_GUIDE.md](docs/UI_CONSISTENCY_GUIDE.md) - UI 일관성 가이드
- 📐 [prompts/system_prompt.md](prompts/system_prompt.md) - 개발 헌법 & 5대 원칙

### 주요 컨벤션

#### 테마 사용

항상 `src/styles/theme.js`의 정확한 구조를 참조하세요:

```javascript
// ✅ 올바른 사용
theme.fontSize.lg; // 단수형
theme.shadow.md; // 단수형
theme.spacing["2xl"]; // 숫자로 시작하는 경우 괄호 표기법
theme.colors.text.primary; // 중첩 구조

// ❌ 잘못된 사용
theme.fontSizes.lg; // 복수형 ❌
theme.shadows.md; // 복수형 ❌
theme.spacing.xxl; // 점 표기법 ❌
theme.colors.textPrimary; // 평면 구조 ❌
```

자세한 내용은 [TROUBLESHOOTING.md](TROUBLESHOOTING.md#1-테마-속성-오류)를 참조하세요.

#### 상태 관리

Zustand store 사용 시:

```javascript
// Store에서 데이터 가져오기
const { asrs, impairment, wurs } = useTestStore();

// 마지막 질문 답변 시 즉시 저장
if (isLastQuestion) {
  const { saveAsrsAnswers } = useTestStore.getState();
  saveAsrsAnswers(newAnswers);
  navigate(ROUTES.ASRS_COMPLETE);
}
```

## 🎯 주요 업데이트

### v1.0.0 (2025-11-10)

- ✨ **결과 페이지 완성**: 종합 분석, 카테고리 분석, 시각화 차트
- 📄 **PDF 다운로드**: 검사 결과를 PDF로 저장
- 🏥 **병원 찾기**: 지역별 ADHD 전문 병원 정보 및 지도 연동
- 🚀 **자동 진행**: 답변 선택 시 자동으로 다음 질문으로 이동
- 🐛 **버그 수정**: 테마 속성 불일치, 데이터 저장 누락 등 해결

자세한 내용은 [CHANGELOG.md](CHANGELOG.md)를 참조하세요.

## 🐛 문제 해결

개발 중 문제가 발생하면 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)를 참조하세요.

주요 해결 방법:

- 테마 속성 오류
- 데이터 저장 및 불러오기
- 라우팅 문제
- 변수 충돌
- 디버깅 팁

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ 면책 조항 (Disclaimer)

이 도구는 **스크리닝 목적**으로만 사용되며, 의학적 진단을 대체할 수 없습니다.
ADHD 증상이 의심되는 경우 반드시 전문의와 상담하시기 바랍니다.

### 의학적 근거

본 프로젝트는 다음의 검증된 척도를 기반으로 합니다:

- **ASRS-v1.1**: WHO에서 개발한 성인 ADHD 자가보고 척도
- **DSM-5**: 미국정신의학회의 정신질환 진단 및 통계 편람 제5판
- **WURS**: Wender Utah Rating Scale, 아동기 ADHD 증상 회상 척도

자세한 의학적 근거는 [docs/SCORING_GUIDE.md](docs/SCORING_GUIDE.md)를 참조하세요.

## 📄 라이선스

Apache-2.0 License

---

Made with ❤️ for better mental health awareness
