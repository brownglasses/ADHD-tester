import styled from "styled-components";

/**
 * Stepper 컴포넌트
 * 여러 단계로 이루어진 프로세스의 진행 상태를 시각적으로 표시
 * 
 * @param {number} currentStep - 현재 단계 (0부터 시작)
 * @param {array} steps - 단계 목록 [{ label: "단계명", description?: "설명" }]
 * @param {string} variant - 색상 변형 ('primary', 'accent')
 * @param {string} orientation - 방향 ('horizontal', 'vertical')
 * @param {boolean} clickable - 클릭으로 단계 이동 가능 여부
 * @param {function} onStepClick - 단계 클릭 핸들러
 */
function Stepper({
  currentStep = 0,
  steps = [],
  variant = "primary",
  orientation = "horizontal",
  clickable = false,
  onStepClick,
  ...rest
}) {
  const handleStepClick = (index) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <StepperContainer orientation={orientation} {...rest}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <StepWrapper key={index} orientation={orientation}>
            <StepIndicator
              isCompleted={isCompleted}
              isCurrent={isCurrent}
              isUpcoming={isUpcoming}
              variant={variant}
              clickable={clickable}
              onClick={() => handleStepClick(index)}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
            >
              <StepCircle
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isUpcoming={isUpcoming}
                variant={variant}
              >
                {isCompleted ? (
                  <CheckIcon>✓</CheckIcon>
                ) : (
                  <StepNumber
                    isCompleted={isCompleted}
                    isCurrent={isCurrent}
                    isUpcoming={isUpcoming}
                  >
                    {index + 1}
                  </StepNumber>
                )}
              </StepCircle>
              <StepLabel
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isUpcoming={isUpcoming}
              >
                {step.label}
                {step.description && (
                  <StepDescription>{step.description}</StepDescription>
                )}
              </StepLabel>
            </StepIndicator>

            {/* 연결선 (마지막 스텝 제외) */}
            {index < steps.length - 1 && (
              <StepConnector
                orientation={orientation}
                isCompleted={index < currentStep}
                variant={variant}
              />
            )}
          </StepWrapper>
        );
      })}
    </StepperContainer>
  );
}

export default Stepper;

// Styled Components
const StepperContainer = styled.div`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "vertical" ? "column" : "row"};
  align-items: ${({ orientation }) =>
    orientation === "vertical" ? "flex-start" : "center"};
  width: 100%;
  gap: 0;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "vertical" ? "column" : "row"};
  align-items: center;
  flex: ${({ orientation }) => (orientation === "vertical" ? "0" : "1")};
  position: relative;

  &:last-child {
    flex: ${({ orientation }) => (orientation === "vertical" ? "0" : "0")};
  }
`;

const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  transition: all ${({ theme }) => theme.transition.fast};
  z-index: 1;

  ${({ clickable }) =>
    clickable &&
    `
    &:hover {
      transform: scale(1.05);
    }
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  transition: all ${({ theme }) => theme.transition.base};
  border: 3px solid;

  ${({ isCompleted, isCurrent, isUpcoming, variant, theme }) => {
    if (isCompleted) {
      // 완료된 단계
      const bgColor =
        variant === "accent" ? theme.colors.accent : theme.colors.primary;
      return `
        background: ${bgColor};
        border-color: ${bgColor};
        color: ${theme.colors.text.white};
      `;
    } else if (isCurrent) {
      // 현재 단계
      const borderColor =
        variant === "accent" ? theme.colors.accent : theme.colors.primary;
      return `
        background: ${theme.colors.background.primary};
        border-color: ${borderColor};
        color: ${borderColor};
        box-shadow: 0 0 0 4px ${
          variant === "accent"
            ? "rgba(255, 221, 170, 0.2)"
            : "rgba(195, 217, 165, 0.2)"
        };
      `;
    } else {
      // 대기 중인 단계
      return `
        background: ${theme.colors.background.secondary};
        border-color: ${theme.colors.border.light};
        color: ${theme.colors.text.disabled};
      `;
    }
  }}
`;

const StepNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const CheckIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const StepLabel = styled.div`
  text-align: center;
  white-space: nowrap;
  transition: all ${({ theme }) => theme.transition.fast};

  ${({ isCompleted, isCurrent, isUpcoming, theme }) => {
    if (isCompleted || isCurrent) {
      return `
        color: ${theme.colors.text.primary};
        font-weight: ${theme.fontWeight.semibold};
      `;
    } else {
      return `
        color: ${theme.colors.text.disabled};
        font-weight: ${theme.fontWeight.regular};
      `;
    }
  }}

  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const StepDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const StepConnector = styled.div`
  flex: 1;
  transition: all ${({ theme }) => theme.transition.base};

  ${({ orientation, isCompleted, variant, theme }) => {
    const completedColor =
      variant === "accent" ? theme.colors.accent : theme.colors.primary;
    const defaultColor = theme.colors.border.light;

    if (orientation === "vertical") {
      return `
        width: 3px;
        height: 40px;
        margin-left: 18px;
        background: ${isCompleted ? completedColor : defaultColor};
      `;
    } else {
      return `
        height: 3px;
        min-width: 40px;
        margin: 0 -4px;
        background: ${isCompleted ? completedColor : defaultColor};
      `;
    }
  }}
`;



