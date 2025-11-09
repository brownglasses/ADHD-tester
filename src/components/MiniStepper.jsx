import styled from "styled-components";

/**
 * 미니 Stepper 컴포넌트
 * 헤더에 들어가는 가벼운 진행 상태 표시 (작은 점들)
 * 
 * @param {number} currentStep - 현재 단계 (0부터 시작)
 * @param {array} steps - 단계 목록 [{ label: "단계명" }]
 * @param {string} label - 라벨 텍스트 (기본: "전체 진행")
 */
function MiniStepper({ currentStep = 0, steps = [], label = "전체 진행" }) {
  return (
    <Container>
      <Label>{label}</Label>
      <Dots>
        {steps.map((step, index) => (
          <Dot
            key={index}
            active={index === currentStep}
            completed={index < currentStep}
            title={step.label}
          />
        ))}
      </Dots>
    </Container>
  );
}

export default MiniStepper;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Dots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, active, completed }) => {
    if (active) return theme.colors.primary;
    if (completed) return theme.colors.success;
    return theme.colors.border.medium;
  }};
  transition: all ${({ theme }) => theme.transition.fast};
  cursor: help;
  position: relative;

  ${({ active, theme }) =>
    active &&
    `
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
    width: 10px;
    height: 10px;
  `}
`;


