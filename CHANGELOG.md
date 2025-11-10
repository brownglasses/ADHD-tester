# Changelog

모든 주목할 만한 변경사항이 이 파일에 문서화됩니다.

## [Unreleased] - 2025-11-10

### ✨ Added (새로운 기능)

#### 🎯 결과 페이지 (Result Page)
- **종합 결과 분석 시스템**
  - ASRS-v1.1 (18문항) 점수 계산 및 해석
  - DSM-5 기능 저하 평가 (3문항) 분석
  - WURS 아동기 증상 회상 (25문항) 점수 계산
  - 통합 ADHD 가능성 평가 및 권고사항
  
- **카테고리별 상세 분석** (`CategoryAnalysis.jsx`)
  - ASRS: 부주의 vs 과잉행동/충동성 분석
  - WURS: 주의력, 과잉행동, 정서조절, 학습/행동, 사회성 분석
  - 각 카테고리별 점수 및 평가
  
- **시각화 차트 컴포넌트**
  - `AsrsRadarChart.jsx`: ASRS 카테고리별 레이더 차트
  - `WursBarChart.jsx`: WURS 카테고리별 바 차트
  - `ComprehensiveComparisonChart.jsx`: 전체 검사 비교 차트
  - Recharts 라이브러리 활용
  
- **PDF 다운로드 기능** (`pdfGenerator.js`)
  - 검사 결과 전체를 PDF로 저장
  - jsPDF + jspdf-autotable 라이브러리 사용
  - 상세 점수, DSM-5 기준, 권고사항 포함
  
- **병원 찾기 페이지** (`Hospital.jsx`)
  - 지역별 ADHD 전문 병원 목록
  - Naver/Kakao/Google Maps 연동
  - 병원 정보 (전화번호, 주소, 진료과목)

#### 🚀 사용자 경험 개선
- **자동 질문 진행 기능**
  - 답변 선택 시 자동으로 다음 질문으로 이동 (400ms 딜레이)
  - `AsrsTest.jsx`, `ImpairmentTest.jsx`, `WursTest.jsx`에 적용
  - 수동 "다음" 버튼 클릭 불필요

#### 📊 데이터 관리
- **Zustand Store 통합**
  - 모든 검사 답변이 `useTestStore`에 자동 저장
  - 마지막 질문 답변 시 즉시 저장 로직 추가
  - 검사 완료 시간 타임스탬프 기록

#### 📚 문서화
- `docs/SCORING_GUIDE.md`: 의학적 근거 기반 점수 계산 로직 문서
- `docs/IMPLEMENTATION_GUIDE.md`: 기능 구현 가이드
- `src/utils/scoring.js`: 점수 계산 유틸리티
- `src/utils/categoryAnalysis.js`: 카테고리 분석 유틸리티
- `src/constants/hospitals.js`: 병원 데이터 및 맵 URL 생성

### 🐛 Fixed (버그 수정)

#### Theme 속성 불일치 수정
- **문제**: Result 페이지 및 관련 컴포넌트에서 잘못된 테마 속성 사용으로 인한 TypeError
- **수정 내역**:
  1. `theme.fontSizes` → `theme.fontSize` (복수형 → 단수형)
     - 영향 받은 파일: Result.jsx, CategoryAnalysis.jsx, 모든 차트 컴포넌트
     - 총 32개 수정
  
  2. `theme.spacing.xxl` → `theme.spacing["2xl"]` (점 표기법 → 괄호 표기법)
     - 영향 받은 파일: Result.jsx
     - 총 7개 수정
  
  3. `theme.fontSize.xxl` → `theme.fontSize["2xl"]`
     - 영향 받은 파일: Result.jsx
     - 총 2개 수정
  
  4. `theme.shadows` → `theme.shadow` (복수형 → 단수형)
     - 영향 받은 파일: Result.jsx, CategoryAnalysis.jsx, Hospital.jsx
     - 모든 인스턴스 수정
  
  5. Color 속성 구조 수정:
     - `colors.textPrimary` → `colors.text.primary`
     - `colors.textSecondary` → `colors.text.secondary`
     - `colors.borderLight` → `colors.border.light`
     - `colors.backgroundPrimary` → `colors.background.primary`
     - `colors.backgroundSecondary` → `colors.background.secondary`
     - 영향 받은 파일: 모든 Result 관련 컴포넌트 (총 57개 수정)

#### 변수 충돌 해결
- **문제**: `Result.jsx`에서 `Identifier 'asrs' has already been declared` 에러
- **원인**: Zustand store에서 가져온 변수명과 result 객체 구조분해 시 변수명 충돌
- **해결**: Store 변수를 `asrsStore`, `impairmentStore`, `wursStore`로 리네이밍

#### 데이터 저장 누락 수정
- **문제**: 검사 완료 후 답변이 Zustand store에 저장되지 않음
- **원인**: `handleComplete` 함수에 "TODO" 주석만 있고 실제 저장 로직 미구현
- **해결**: 
  - 마지막 질문 답변 시 `handleAnswerChange`에서 즉시 저장
  - `useTestStore.getState().saveXxxAnswers(newAnswers)` 호출
  - 저장 후 완료 페이지로 이동

#### 라우팅 수정
- **문제**: WURS 완료 페이지에서 결과 페이지 대신 랜딩 페이지로 리다이렉트
- **원인**: `WursComplete.jsx`에 "결과 페이지 추후 구현 예정" 로직
- **해결**: `ROUTES.RESULT`로 직접 이동하도록 수정

### 🔧 Changed (변경)

#### 라우팅 구조
- `/result` → 실제 Result 페이지 (이전: ResultDebug)
- `/result-debug` → 디버그 페이지 (개발용)
- `/hospital` → 병원 찾기 페이지 추가

#### 컴포넌트 구조
- Result 페이지: 단일 거대 컴포넌트에서 모듈화된 하위 컴포넌트로 분리
- 차트 컴포넌트: 재사용 가능한 독립 컴포넌트로 추출

### 📦 Dependencies (의존성)

#### 추가된 패키지
```json
{
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.8.2",
  "recharts": "^2.10.3"
}
```

### 🔍 개발 과정 (Debugging Journey)

1. **Initial Implementation**: Result 페이지 및 관련 기능 구현
2. **Navigation Issue**: WURS 완료 후 결과 페이지 미표시 → 라우팅 수정
3. **Auto-advance Feature**: 자동 질문 진행 기능 추가
4. **White Screen Issue #1**: 데이터 접근 방식 오류 → Store 구조 파악 및 수정
5. **Variable Conflict**: 변수명 충돌 → 리네이밍
6. **White Screen Issue #2**: 데이터 저장 미구현 → 저장 로직 추가
7. **Theme Errors**: 광범위한 테마 속성 불일치 → 체계적 수정
8. **ResultDebug.jsx 활용**: 임시 디버그 페이지로 데이터 흐름 확인

### 🎓 학습 내용

#### 디버깅 방법론
- Console.log를 활용한 데이터 흐름 추적
- 임시 디버그 컴포넌트 생성으로 문제 격리
- 브라우저 개발자 도구 활용

#### 콘솔 로그 효율적 제공 방법
1. **전체 텍스트 복사** (가장 추천)
   - Console 탭에서 Ctrl+A → Ctrl+C
   - 에러 스택 트레이스 전체 포함
   - 파일명과 줄 번호 명확

2. **필터 활용**
   - Console 상단 필터창 사용
   - 특정 키워드로 관련 로그만 추출

3. **스크린샷**
   - 빠른 상황 공유용
   - 전체 맥락 파악 가능

---

## 작업 완료 체크리스트

- [x] ASRS 검사 구현
- [x] 기능 저하 검사 구현
- [x] WURS 검사 구현
- [x] 결과 페이지 구현
- [x] PDF 다운로드 기능
- [x] 카테고리별 분석
- [x] 시각화 차트
- [x] 병원 찾기 페이지
- [x] 자동 질문 진행
- [x] 테마 속성 버그 수정
- [x] 데이터 저장 로직 구현
- [x] 종합 문서화

---

## 참고 문서

- [SCORING_GUIDE.md](docs/SCORING_GUIDE.md): 점수 계산 로직 및 의학적 근거
- [IMPLEMENTATION_GUIDE.md](docs/IMPLEMENTATION_GUIDE.md): 구현 가이드
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md): 문제 해결 가이드

