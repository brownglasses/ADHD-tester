# 📘 구현 가이드

> **작성일:** 2025-01-09  
> **버전:** 1.0.0  
> **목적:** 점수 계산, PDF 생성, 차트, 병원 찾기 기능 구현 완료 및 사용 방법 안내

---

## 📋 목차

1. [구현 완료 내역](#구현-완료-내역)
2. [필수 패키지 설치](#필수-패키지-설치)
3. [파일 구조](#파일-구조)
4. [사용 방법](#사용-방법)
5. [테스트 방법](#테스트-방법)
6. [주의사항](#주의사항)
7. [다음 단계](#다음-단계)

---

## 구현 완료 내역

### ✅ 1. 점수 계산 로직 (`src/utils/scoring.js`)

**기능:**

- ASRS 점수 계산 및 해석 (Part A/B, 하위 유형)
- 기능 저하 평가 계산 (DSM-5 Criterion D)
- WURS 점수 계산 및 해석
- 종합 위험도 평가 및 DSM-5 기준 충족 여부
- 맞춤형 권장사항 생성

**의학적 근거:**

- WHO ASRS-v1.1 (Harvard Medical School 2024)
- DSM-5 / DSM-5-TR (APA 2022)
- WURS-25 (Ward et al. 1993)

---

### ✅ 2. 카테고리 분석 (`src/utils/categoryAnalysis.js`)

**ASRS 3개 영역:**

- 부주의 (9문항)
- 과잉행동 (5문항)
- 충동성 (4문항)

**WURS 7개 카테고리:**

- 🎯 주의력
- ⚡ 과잉행동
- 🚀 충동성
- 💭 정서 조절
- 🎭 행동 문제
- 👥 사회성
- 📚 학업

---

### ✅ 3. PDF 생성 (`src/utils/pdfGenerator.js`)

**포함 내용:**

- 종합 평가 결과
- 상세 점수 표
- DSM-5 기준 충족 여부
- ADHD 하위 유형
- 권장사항 리스트
- 페이지 번호 및 Disclaimer

---

### ✅ 4. 병원 데이터 (`src/constants/hospitals.js`)

**기능:**

- 전국 주요 병원 15개 정보
- 지도 검색 URL 생성 (네이버, 카카오, 구글)
- 지역별 필터링

---

### ✅ 5. 컴포넌트

**CategoryAnalysis.jsx** - 카테고리별 상세 분석 UI

**차트 컴포넌트:**

- `AsrsRadarChart.jsx` - ASRS 3개 영역 레이더 차트
- `WursBarChart.jsx` - WURS 7개 카테고리 바 차트
- `ComprehensiveComparisonChart.jsx` - 3개 검사 종합 비교 차트

---

### ✅ 6. 페이지

**Result.jsx** - 종합 결과 페이지

- 종합 평가 카드
- DSM-5 기준 충족 여부
- 다음 단계 권장사항
- 상세 점수 표시
- 카테고리별 분석
- 시각화 차트
- PDF 다운로드
- 병원 찾기 버튼

**Hospital.jsx** - 병원 찾기 페이지

- 지도 검색 (네이버, 카카오, 구글)
- 지역별 병원 목록
- 진료 준비 가이드

---

## 필수 패키지 설치

### 1. Chart 라이브러리 (Recharts)

```bash
npm install recharts
```

### 2. PDF 생성 라이브러리

```bash
npm install jspdf jspdf-autotable
```

### 3. 모든 패키지 한 번에 설치

```bash
npm install recharts jspdf jspdf-autotable
```

---

## 파일 구조

```
adhd_test_web/
├── src/
│   ├── utils/
│   │   ├── scoring.js                 # ✅ NEW - 점수 계산 로직
│   │   ├── categoryAnalysis.js        # ✅ NEW - 카테고리 분석
│   │   └── pdfGenerator.js            # ✅ NEW - PDF 생성
│   │
│   ├── constants/
│   │   ├── routes.js                  # ✅ UPDATED - RESULT, HOSPITAL 추가됨
│   │   └── hospitals.js               # ✅ NEW - 병원 데이터
│   │
│   ├── components/
│   │   ├── CategoryAnalysis.jsx      # ✅ NEW - 카테고리 분석 컴포넌트
│   │   └── charts/                    # ✅ NEW - 차트 디렉토리
│   │       ├── AsrsRadarChart.jsx
│   │       ├── WursBarChart.jsx
│   │       └── ComprehensiveComparisonChart.jsx
│   │
│   ├── pages/
│   │   ├── Result/
│   │   │   └── Result.jsx             # ✅ NEW - 종합 결과 페이지
│   │   └── Hospital/
│   │       └── Hospital.jsx           # ✅ NEW - 병원 찾기 페이지
│   │
│   └── App.jsx                        # ✅ UPDATED - 라우트 추가
│
└── docs/
    ├── SCORING_GUIDE.md               # ✅ NEW - 점수 계산 가이드
    └── IMPLEMENTATION_GUIDE.md        # ✅ NEW - 이 문서
```

---

## 사용 방법

### 1. 패키지 설치

```bash
cd adhd_test_web
npm install recharts jspdf jspdf-autotable
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 검사 플로우 테스트

1. **시작:** `http://localhost:5173/`
2. **ASRS Intro:** `/asrs/intro`
3. **ASRS Test:** `/asrs/test` (18문항)
4. **ASRS Complete:** `/asrs/complete`
5. **기능 저하:** `/impairment/test` (3문항)
6. **기능 저하 완료:** `/impairment/complete`
7. **WURS Intro:** `/wurs/intro`
8. **WURS Test:** `/wurs/test` (25문항)
9. **WURS Complete:** `/wurs/complete`
10. **결과:** `/result` ⭐ **NEW**
11. **병원 찾기:** `/hospital` ⭐ **NEW**

---

### 4. WursComplete에서 Result로 이동 연결

`src/pages/Wurs/WursComplete.jsx`를 수정하여 Result 페이지로 이동하도록 설정:

```javascript
import { ROUTES } from "@constants/routes";

// 버튼 클릭 시
const handleViewResult = () => {
  navigate(ROUTES.RESULT);
};

// 버튼 추가
<Button onClick={handleViewResult}>📊 종합 결과 보기</Button>;
```

---

## 테스트 방법

### 1. 점수 계산 테스트

**개발자 콘솔에서 직접 테스트:**

```javascript
import { calculateAllScores } from "@utils/scoring";

// 테스트 데이터
const asrsAnswers = {
  1: 4,
  2: 4,
  3: 4,
  4: 4,
  5: 4,
  6: 4,
  7: 3,
  8: 3,
  9: 3,
  10: 2,
  11: 2,
  12: 2,
  13: 1,
  14: 1,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
};

const impairmentAnswers = {
  1: "yes",
  2: "yes",
  3: "no",
};

const wursAnswers = {
  1: 4,
  2: 4,
  3: 3,
  4: 4,
  5: 3,
  // ... (총 25개)
};

const result = calculateAllScores(asrsAnswers, impairmentAnswers, wursAnswers);
console.log(result);
```

### 2. PDF 생성 테스트

```javascript
import { generateResultPDF } from "@utils/pdfGenerator";

generateResultPDF(result);
// → "ADHD_검사결과_2025-01-09.pdf" 다운로드됨
```

### 3. 카테고리 분석 테스트

```javascript
import {
  analyzeASRSCategories,
  analyzeWURSCategories,
} from "@utils/categoryAnalysis";

const asrsCategories = analyzeASRSCategories(asrsAnswers);
const wursCategories = analyzeWURSCategories(wursAnswers);

console.log(asrsCategories);
console.log(wursCategories);
```

---

## 주의사항

### ⚠️ 1. 의학적 Disclaimer 필수

모든 결과 페이지와 PDF에는 반드시 다음 문구를 포함해야 합니다:

```
이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.
정확한 진단은 정신건강의학과 전문의와 상담하세요.
```

### ⚠️ 2. 데이터 유효성 검사

Result 페이지는 다음을 확인합니다:

- ASRS 답변 존재 여부
- 기능 저하 답변 존재 여부
- WURS 답변 존재 여부

답변이 없으면 자동으로 Landing 페이지로 리다이렉트됩니다.

### ⚠️ 3. 병원 정보 업데이트

`src/constants/hospitals.js`의 병원 정보는 참고용입니다.
실제 운영 전에 각 병원의 정보를 확인하고 업데이트하세요:

- 전화번호
- 주소
- 홈페이지
- 진료 가능 여부

### ⚠️ 4. 차트 렌더링

Recharts는 반응형 차트를 제공하지만, 작은 화면에서는 가독성이 떨어질 수 있습니다.
모바일 환경에서 테스트하고 필요시 스타일을 조정하세요.

---

## 다음 단계

### 📝 TODO

1. **WursComplete → Result 연결**

   - `src/pages/Wurs/WursComplete.jsx`에 "종합 결과 보기" 버튼 추가
   - `navigate(ROUTES.RESULT)` 구현

2. **Firebase 연동 (선택사항)**

   - 결과 저장 기능
   - 사용자 계정별 결과 관리
   - 결과 히스토리 조회

3. **추가 기능 (선택사항)**

   - 결과 이메일 전송
   - 결과 공유 링크 생성
   - 재검사 기능
   - 결과 비교 (이전 vs 현재)

4. **UI 개선**

   - 로딩 애니메이션 추가
   - 에러 처리 개선
   - 접근성 개선 (ARIA labels)

5. **테스트 코드 작성**
   - 점수 계산 로직 단위 테스트
   - 컴포넌트 테스트
   - E2E 테스트

---

## 🎉 구현 완료!

모든 핵심 기능이 구현되었습니다! 🚀

### 구현된 기능 요약

✅ 점수 계산 로직 (의학적 근거 기반)  
✅ 카테고리별 상세 분석  
✅ PDF 생성 및 다운로드  
✅ 병원 찾기 및 지도 검색  
✅ 시각화 차트 (레이더, 바, 비교)  
✅ 종합 결과 페이지  
✅ 라우팅 설정

### 다음은?

1. 패키지 설치: `npm install recharts jspdf jspdf-autotable`
2. WursComplete 페이지에 Result 이동 버튼 추가
3. 전체 플로우 테스트
4. 모바일 반응형 테스트
5. 병원 정보 업데이트

---

## 📞 문의

구현 중 문제가 발생하면 다음을 확인하세요:

1. **패키지 설치 확인**

   ```bash
   npm list recharts jspdf jspdf-autotable
   ```

2. **import 경로 확인**

   - `@utils` 경로가 정상 작동하는지 확인
   - `vite.config.js`의 alias 설정 확인

3. **콘솔 에러 확인**

   - 브라우저 개발자 도구 → Console 탭
   - 에러 메시지 확인 및 해결

4. **문서 참조**
   - `docs/SCORING_GUIDE.md` - 점수 계산 상세 가이드
   - `docs/UI_CONSISTENCY_GUIDE.md` - UI 규칙
   - `docs/CODE_GUIDE.md` - 코딩 규칙

---

**Happy Coding! 🎊**
