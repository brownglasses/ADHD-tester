/**
 * 디자인 시스템 테마
 * 모든 색상, 폰트, 간격 등은 이 파일에서 관리
 */

const theme = {
  // 색상
  colors: {
    // Primary (메인 컬러 - Calm Green 캄 그린)
    primary: "#96BE80",
    primaryHover: "#7FA96A",
    primaryLight: "#E8F2E2", // 더 자연스러운 연한 녹색

    // Accent (강조 컬러 - Supportive Orange 서포티브 오렌지)
    accent: "#FFDDAA",
    accentHover: "#FFD088",

    // Secondary (기존 호환성 유지)
    secondary: "#FFDDAA",
    secondaryHover: "#FFD088",

    // 텍스트
    text: {
      primary: "#3D4A3D", // 약간 녹색 톤의 Charcoal
      secondary: "#6B7B6B", // 약간 녹색 톤의 Gray
      disabled: "#C5CFC5", // 약간 녹색 톤의 Light Gray
      white: "#FFFFFF",
    },

    // 배경
    background: {
      primary: "#FFFFFF",
      secondary: "#F7FAF5", // 아주 연한 녹색 톤
      tertiary: "#EFF5EB", // 연한 녹색 배경
    },

    // 상태 색상
    success: "#7FA96A", // Primary Hover와 동일 (일관성)
    warning: "#FFB347", // 부드러운 오렌지
    error: "#E57373", // 부드러운 레드
    info: "#64B5F6", // 부드러운 블루

    // 테두리
    border: {
      light: "#E1E8DD", // 약간 녹색 톤
      medium: "#C1D0BA", // 녹색 톤의 중간 테두리
      dark: "#8FA382", // 녹색 톤의 진한 테두리
    },
  },

  // 폰트 크기
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // 폰트 굵기
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 간격
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  // 보더 라운드 (더 동글동글한 느낌)
  borderRadius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    full: "9999px",
  },

  // 그림자
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
  },

  // 트랜지션
  transition: {
    fast: "150ms ease-in-out",
    base: "300ms ease-in-out",
    slow: "500ms ease-in-out",
  },

  // 브레이크포인트 (반응형)
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    modal: 2000,
    toast: 3000,
    tooltip: 4000,
  },
};

export default theme;

