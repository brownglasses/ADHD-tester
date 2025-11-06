# 🎨 ADHD 스크리너 스타일 가이드

> 이 문서는 프로젝트의 디자인 시스템과 스타일 가이드를 정의합니다.

---

## 📐 디자인 원칙

### 1. 공감 기반 UX

- 사용자는 이미 지쳐있다는 것을 전제
- 인지적 부담을 최소화하는 명료한 디자인
- 불필요한 장식이나 애니메이션 지양

### 2. 신뢰와 전문성

- 의료/헬스케어 분야의 신뢰감
- 검증된 척도 기반의 전문성
- 차분하고 안정적인 색상

### 3. 접근성 우선

- WCAG 2.1 AA 이상의 색상 대비
- 충분한 터치 영역 (최소 44px × 44px)
- 스크린 리더 호환

---

## 🎨 컬러 시스템

### 브랜드 철학

우리의 컬러는 사용자를 자극하거나 산만하게 해서는 안 됩니다.
새싹이 돋아나는 듯한 부드러운 연두색을 중심으로, 사용자가 편안하고 차분한 상태에서 검사에 집중할 수 있도록 돕습니다.

### Primary Color (메인 컬러) - Sprout Green (새싹 연두)

```
Primary:       #C3D9A5  (Sprout Green - 새싹 연두)
Primary Hover: #B0C890  (진한 새싹 연두 - 호버)
Primary Light: #E8F0DC  (연한 새싹 연두 - 배경)
```

**특징:**

- 🌱 너무 밝지 않고 채도가 낮은 편안한 파스텔 톤
- 🌿 '성장', '새로운 시작'의 느낌
- 👁️ 눈을 편안하게 하여 집중을 도움
- ✨ 친근하면서도 전문적인 인상

**사용처:**

- 메인 버튼 배경
- 아이콘
- 진행 바
- 강조 요소

### Accent Color (강조 컬러) - Supportive Orange (서포티브 오렌지)

```
Accent:       #FFDDAA  (Supportive Orange - 서포티브 오렌지)
Accent Hover: #FFD088  (진한 서포티브 오렌지)
```

**특징:**

- 🧡 따뜻하고 부드러운 파스텔 톤 (살구색에 가까움)
- 💫 Sprout Green과 조화롭게 어울림
- 🤝 긍정적이고 지지해주는 느낌
- ⭐ 주목도를 높이면서도 자극적이지 않음

**사용처:**

- CTA(Call to Action) 버튼: "검사 시작하기", "결과 확인하기"
- 중요한 알림
- 강조가 필요한 핵심 요소

### Neutral Colors (중립 색상)

```
Charcoal (차콜):      #4A4A4A  (기본 텍스트)
Stone Gray (스톤):    #A1A1A1  (보조 텍스트)
Light Gray (연회색):  #CCCCCC  (비활성)
Pure White (순백):    #FFFFFF  (카드, 버튼 텍스트)

Cloud White (배경):   #F8F9FA  (메인 배경)
Light Cloud (배경):   #F0F2F5  (섹션 배경)
```

**특징:**

- 📖 순수 검은색(#000) 대신 부드러운 차콜 사용
- 👀 흰 배경의 눈부심 감소 (Cloud White)
- 💤 장시간 사용에도 눈의 피로 최소화
- ♿ WCAG AA 대비 기준 준수

### State Colors (상태 색상)

```
Success: #4CAF50  (성공 - 완료, 통과)
Warning: #FFC107  (경고 - 주의 필요)
Error:   #F44336  (오류 - 실패, 위험)
Info:    #2196F3  (정보 - 안내)
```

### Border Colors (테두리)

```
Border Light:  #E0E0E0  (연한 테두리)
Border Medium: #BDBDBD  (중간 테두리)
Border Dark:   #757575  (진한 테두리)
```

---

## 📝 타이포그래피

### 폰트 패밀리

```css
Primary Font: Pretendard Variable, Pretendard

Fallback: -apple-system, BlinkMacSystemFont, system-ui,
Roboto, "Helvetica Neue", "Segoe UI",
"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
sans-serif
```

**Pretendard 선택 이유:**

- 🇰🇷 한글 최적화 가독성 (본고딕 기반)
- 📏 일관된 자간과 행간
- ⚖️ 균형잡힌 한글-영문 조화
- 📱 Variable Font 지원 (가변 굵기)
- 🚀 CDN을 통한 빠른 로딩
- ♿ 웹 접근성 고려 설계

**기술적 장점:**

- 9가지 굵기(100~900) 제공
- CJK(한중일) 문자 완벽 지원
- 시스템 폰트와 자연스러운 fallback

### 폰트 크기 스케일

| 용도                 | 크기     | 픽셀 | 사용처                |
| -------------------- | -------- | ---- | --------------------- |
| **xs** (extra small) | 0.75rem  | 12px | 캡션, 작은 레이블     |
| **sm** (small)       | 0.875rem | 14px | 보조 텍스트           |
| **base** (기본)      | 1rem     | 16px | 본문 텍스트           |
| **lg** (large)       | 1.125rem | 18px | 강조 텍스트           |
| **xl**               | 1.25rem  | 20px | 소제목                |
| **2xl**              | 1.5rem   | 24px | 제목 3                |
| **3xl**              | 1.875rem | 30px | 제목 2                |
| **4xl**              | 2.25rem  | 36px | 제목 1, 페이지 타이틀 |

### 폰트 굵기

```
Light:     300  (거의 사용 안 함)
Regular:   400  (본문)
Medium:    500  (강조)
Semibold:  600  (소제목)
Bold:      700  (제목)
```

### 줄 간격

```
본문: 1.6 (편안한 읽기)
제목: 1.3 (간결함)
```

---

## 📏 간격 시스템 (Spacing)

8px 기준의 간격 시스템:

```
xs:  4px   (0.25rem)  - 아주 작은 간격
sm:  8px   (0.5rem)   - 작은 간격
md:  16px  (1rem)     - 기본 간격
lg:  24px  (1.5rem)   - 큰 간격
xl:  32px  (2rem)     - 섹션 간격
2xl: 48px  (3rem)     - 큰 섹션 간격
3xl: 64px  (4rem)     - 페이지 간격
```

---

## 🔲 컴포넌트 스타일

### 버튼 (Button)

**크기:**

- Small: 36px 높이, 8px-16px 패딩
- Medium: 44px 높이, 16px-24px 패딩 (기본)
- Large: 52px 높이, 24px-32px 패딩

**Border Radius:**

- 8px (중간 라운드 - 친근하면서 전문적)

**상태:**

- Hover: 1px 위로 이동 + 그림자
- Active: 원위치
- Disabled: 50% 투명도

### 입력 필드 (Input)

**높이:** 44px (터치 영역)
**Border:** 1px solid #E0E0E0
**Border Radius:** 8px
**Focus:** 2px solid Primary Color

### 카드 (Card)

**배경:** #FFFFFF
**Border Radius:** 12px
**그림자:** 0 4px 6px rgba(0, 0, 0, 0.1)
**패딩:** 24px

---

## 🎭 그림자 (Shadows)

```
Small:  0 1px 2px rgba(0, 0, 0, 0.05)   - 미세한 깊이
Medium: 0 4px 6px rgba(0, 0, 0, 0.1)    - 카드, 버튼
Large:  0 10px 15px rgba(0, 0, 0, 0.1)  - 모달
XLarge: 0 20px 25px rgba(0, 0, 0, 0.15) - 드롭다운
```

---

## 🔄 애니메이션

### 트랜지션 속도

```
Fast: 150ms   - 버튼 호버, 작은 변화
Base: 300ms   - 일반적인 상태 변화
Slow: 500ms   - 페이지 전환, 큰 변화
```

### Easing

```
ease-in-out (기본)
```

### 원칙

- **최소한의 애니메이션**: 공감 기반 UX 원칙
- **prefers-reduced-motion 존중**: 사용자 설정 우선
- **의미 있는 애니메이션만**: 장식 금지

---

## 📱 반응형 디자인

### 브레이크포인트

```
Mobile:  < 480px   (모바일)
Tablet:  < 768px   (태블릿)
Desktop: < 1024px  (데스크톱)
Wide:    >= 1280px (와이드 스크린)
```

### 원칙

- Mobile First 접근
- 1화면 1과업 (특히 모바일)
- 최소 터치 영역 44px × 44px

---

## ♿ 접근성 가이드

### 색상 대비

- 텍스트/배경: 최소 4.5:1 (WCAG AA)
- 큰 텍스트: 최소 3:1
- UI 요소: 최소 3:1

### 포커스 표시

```css
outline: 2px solid Primary Color
outline-offset: 2px
```

### 대체 텍스트

- 모든 이미지에 alt 속성
- 아이콘 버튼에 aria-label

---

## 🚫 하지 말아야 할 것

### 색상

- ❌ 너무 밝거나 형광색 (눈의 피로)
- ❌ 빨강/초록만으로 구분 (색약/색맹 고려)
- ❌ 낮은 대비 색상

### 레이아웃

- ❌ 한 화면에 너무 많은 정보
- ❌ 작은 터치 영역 (< 44px)
- ❌ 복잡한 네비게이션

### 애니메이션

- ❌ 불필요한 장식 애니메이션
- ❌ 빠르게 깜빡이는 효과
- ❌ 자동 재생되는 비디오

---

## 📚 참고 자료

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://material.io/design)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

## 🔄 업데이트 기록

- 2024.11.06 v3: 타이포그래피 업데이트

  - Primary Font: Pretendard로 변경
  - 한글 가독성 최적화
  - Variable Font 지원 (9가지 굵기)
  - CDN을 통한 빠른 로딩

- 2024.11.06 v2: 브랜드 컬러 파스텔 톤 업데이트

  - Primary Color: Sprout Green (#C3D9A5) - 부드러운 파스텔 톤
  - Accent Color: Supportive Orange (#FFDDAA) - 따뜻한 살구색
  - Text & Background: 눈의 피로를 줄이는 차분한 톤 적용
  - 브랜드 철학 명시: "친근함, 안정감, 집중"

- 2024.11.06 v1: 초안 작성
  - Primary Color: 건강한 연두색 (#7CB342)
  - 기본 컬러 시스템 정의
  - 타이포그래피 및 간격 시스템 정의
