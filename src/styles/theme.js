/**
 * 디자인 시스템 테마
 * 모든 색상, 폰트, 간격 등은 이 파일에서 관리
 */

const theme = {
  // 색상
  colors: {
    // Primary (메인 컬러 - 신뢰감을 주는 블루 계열)
    primary: "#4A90E2",
    primaryHover: "#357ABD",
    primaryLight: "#E3F2FD",

    // Secondary (보조 컬러)
    secondary: "#7B68EE",
    secondaryHover: "#6A5ACD",

    // 텍스트
    text: {
      primary: "#333333",
      secondary: "#666666",
      disabled: "#999999",
      white: "#FFFFFF",
    },

    // 배경
    background: {
      primary: "#FFFFFF",
      secondary: "#F8F9FA",
      tertiary: "#F0F0F0",
    },

    // 상태 색상
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",

    // 테두리
    border: {
      light: "#E0E0E0",
      medium: "#BDBDBD",
      dark: "#757575",
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

  // 보더 라운드
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
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

