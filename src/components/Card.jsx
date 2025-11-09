import styled from "styled-components";

/**
 * 공통 카드 컴포넌트
 * 
 * @param {string} variant - 카드 스타일 ('default', 'primary', 'secondary', 'outlined')
 * @param {string} padding - 패딩 크기 ('sm', 'md', 'lg', 'xl')
 * @param {string} shadow - 그림자 크기 ('none', 'sm', 'md', 'lg')
 * @param {boolean} hoverable - 호버 효과 사용 여부
 * @param {boolean} clickable - 클릭 가능 여부 (커서 포인터)
 * @param {function} onClick - 클릭 핸들러
 * @param {ReactNode} children - 카드 내용
 */
function Card({
  variant = "default",
  padding = "lg",
  shadow = "md",
  hoverable = false,
  clickable = false,
  onClick,
  children,
  ...rest
}) {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      shadow={shadow}
      hoverable={hoverable}
      clickable={clickable}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledCard>
  );
}

export default Card;

// Styled Components
const StyledCard = styled.div`
  /* 기본 스타일 */
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: all ${({ theme }) => theme.transition.base};
  
  /* 패딩 */
  ${({ padding, theme }) => {
    switch (padding) {
      case "sm":
        return `padding: ${theme.spacing.md};`;
      case "md":
        return `padding: ${theme.spacing.lg};`;
      case "xl":
        return `padding: ${theme.spacing.xl};`;
      case "lg":
      default:
        return `padding: ${theme.spacing.lg};`;
    }
  }}

  /* 그림자 */
  ${({ shadow, theme }) => {
    switch (shadow) {
      case "none":
        return "box-shadow: none;";
      case "sm":
        return `box-shadow: ${theme.shadow.sm};`;
      case "lg":
        return `box-shadow: ${theme.shadow.lg};`;
      case "md":
      default:
        return `box-shadow: ${theme.shadow.md};`;
    }
  }}

  /* 변형별 스타일 */
  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return `
          background: ${theme.colors.primaryLight};
          border: 2px solid ${theme.colors.primary};
        `;
      case "secondary":
        return `
          background: ${theme.colors.background.secondary};
          border: 1px solid ${theme.colors.border.light};
        `;
      case "outlined":
        return `
          background: transparent;
          border: 2px solid ${theme.colors.border.medium};
        `;
      case "default":
      default:
        return `
          background: ${theme.colors.background.primary};
        `;
    }
  }}

  /* 클릭 가능 */
  ${({ clickable }) =>
    clickable &&
    `
      cursor: pointer;
    `}

  /* 호버 효과 */
  ${({ hoverable, theme }) =>
    hoverable &&
    `
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadow.lg};
      }
    `}

  /* 포커스 스타일 (접근성) */
  ${({ clickable, theme }) =>
    clickable &&
    `
      &:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 2px;
      }
    `}
`;


