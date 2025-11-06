import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    line-height: 1.6;
    font-size: ${({ theme }) => theme.fontSize.base};
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* 공통 요소 스타일 */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSize["4xl"]};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize["3xl"]};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      font-size: ${({ theme }) => theme.fontSize["2xl"]};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  /* 스크롤바 스타일 (선택사항) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.medium};
    border-radius: ${({ theme }) => theme.borderRadius.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.border.dark};
    }
  }

  /* 포커스 스타일 - 접근성 향상 */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* 공감 기반 UX: 불필요한 애니메이션 제거 (사용자가 선호하는 경우) */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

export default GlobalStyles;

