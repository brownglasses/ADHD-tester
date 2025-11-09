import styled from "styled-components";

/**
 * 공통 버튼 컴포넌트
 * 
 * @param {string} variant - 버튼 스타일 ('primary', 'secondary', 'outline')
 * @param {string} size - 버튼 크기 ('sm', 'md', 'lg')
 * @param {boolean} fullWidth - 전체 너비 사용 여부
 * @param {boolean} disabled - 비활성화 여부
 * @param {function} onClick - 클릭 핸들러
 * @param {ReactNode} children - 버튼 내용
 */
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  ...rest
}) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

// Styled Components
const StyledButton = styled.button`
  /* 기본 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  border: none;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  
  /* 클릭 애니메이션을 위한 설정 */
  position: relative;
  overflow: hidden;

  /* 크기별 스타일 */
  ${({ size, theme }) => {
    switch (size) {
      case "sm":
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSize.sm};
          min-height: 36px;
        `;
      case "lg":
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.fontSize.lg};
          min-height: 52px;
        `;
      case "md":
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSize.base};
          min-height: 44px; /* 터치 영역 최소 크기 */
        `;
    }
  }}

  /* 변형별 스타일 */
  ${({ variant, theme }) => {
    switch (variant) {
      case "secondary":
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.text.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.secondaryHover};
          }
        `;
      case "outline":
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryLight};
          }
        `;
      case "primary":
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.text.white};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: ${theme.shadow.md};
          }
        `;
    }
  }}

  /* 비활성화 상태 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* 활성화 상태 (클릭) */
  &:active:not(:disabled) {
    transform: scale(0.98);
    transition: transform 100ms ease;
  }

  /* 포커스 스타일 (접근성) */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* 클릭 시 ripple 효과 */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 500ms ease, height 500ms ease, opacity 500ms ease;
    opacity: 0;
  }

  &:active:not(:disabled)::after {
    width: 300px;
    height: 300px;
    opacity: 0.3;
    transition: width 0ms, height 0ms, opacity 400ms ease;
  }
`;

