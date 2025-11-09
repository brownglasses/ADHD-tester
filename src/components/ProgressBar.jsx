import styled from "styled-components";

/**
 * 진행 바 컴포넌트
 * 설문 진행도, 로딩 상태 등을 시각적으로 표시
 * 
 * @param {number} current - 현재 진행 상태 (0~total)
 * @param {number} total - 전체 개수
 * @param {number} percentage - 직접 퍼센트 지정 (0~100, current/total 대신 사용)
 * @param {string} size - 바 높이 ('sm', 'md', 'lg')
 * @param {string} variant - 색상 변형 ('primary', 'accent', 'success')
 * @param {boolean} showLabel - 텍스트 라벨 표시 여부
 * @param {string} labelPosition - 라벨 위치 ('top', 'bottom', 'inside')
 * @param {string} labelFormat - 라벨 형식 ('percent', 'fraction', 'custom')
 * @param {string} customLabel - 커스텀 라벨 텍스트
 * @param {boolean} animated - 애니메이션 효과 사용 여부
 * @param {boolean} striped - 줄무늬 패턴 사용 여부
 */
function ProgressBar({
  current,
  total,
  percentage,
  size = "md",
  variant = "primary",
  showLabel = true,
  labelPosition = "top",
  labelFormat = "fraction",
  customLabel,
  animated = true,
  striped = false,
  ...rest
}) {
  // 퍼센트 계산
  const calculatedPercent = percentage !== undefined
    ? Math.min(Math.max(percentage, 0), 100)
    : current && total
    ? Math.min(Math.max((current / total) * 100, 0), 100)
    : 0;

  // 라벨 텍스트 생성
  const getLabelText = () => {
    if (customLabel) return customLabel;
    
    switch (labelFormat) {
      case "percent":
        return `${Math.round(calculatedPercent)}%`;
      case "fraction":
        return current && total ? `${current} / ${total}` : `${Math.round(calculatedPercent)}%`;
      default:
        return `${Math.round(calculatedPercent)}%`;
    }
  };

  return (
    <Container {...rest}>
      {showLabel && labelPosition === "top" && (
        <Label position="top">{getLabelText()}</Label>
      )}
      
      <BarContainer size={size}>
        <BarFill
          percent={calculatedPercent}
          variant={variant}
          animated={animated}
          striped={striped}
        >
          {showLabel && labelPosition === "inside" && (
            <Label position="inside">{getLabelText()}</Label>
          )}
        </BarFill>
      </BarContainer>
      
      {showLabel && labelPosition === "bottom" && (
        <Label position="bottom">{getLabelText()}</Label>
      )}
    </Container>
  );
}

export default ProgressBar;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  
  ${({ position, theme }) => {
    switch (position) {
      case "top":
        return `
          margin-bottom: ${theme.spacing.sm};
          text-align: right;
        `;
      case "bottom":
        return `
          margin-top: ${theme.spacing.sm};
          text-align: right;
        `;
      case "inside":
        return `
          color: ${theme.colors.text.white};
          font-size: ${theme.fontSize.xs};
          position: absolute;
          right: ${theme.spacing.sm};
          top: 50%;
          transform: translateY(-50%);
        `;
      default:
        return "";
    }
  }}
`;

const BarContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
  position: relative;
  
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `height: 6px;`;
      case "lg":
        return `height: 20px;`;
      case "md":
      default:
        return `height: 12px;`;
    }
  }}
`;

const BarFill = styled.div`
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  position: relative;
  
  /* smooth transition with easing */
  transition: ${({ animated }) => 
    animated ? "width 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease" : "none"};
  
  /* 색상 변형 */
  ${({ variant, theme }) => {
    switch (variant) {
      case "accent":
        return `background: ${theme.colors.accent};`;
      case "success":
        return `background: ${theme.colors.success};`;
      case "primary":
      default:
        return `background: ${theme.colors.primary};`;
    }
  }}
  
  /* 완료 시 반짝임 효과 */
  ${({ percent }) =>
    percent === 100 &&
    `
    animation: complete 600ms ease-in-out;
  `}
  
  @keyframes complete {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.85;
      filter: brightness(1.1);
    }
  }
  
  /* 줄무늬 패턴 */
  ${({ striped }) =>
    striped &&
    `
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 20px 20px;
      animation: ${({ animated }) => animated ? "stripe-animation 1s linear infinite" : "none"};
    `}
  
  @keyframes stripe-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 0;
    }
  }
`;


