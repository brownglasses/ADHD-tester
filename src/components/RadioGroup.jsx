import styled from "styled-components";

/**
 * Radio 그룹 컴포넌트
 * 여러 개의 선택지를 그룹으로 관리
 * 
 * @param {string} name - Radio 그룹 이름 (필수)
 * @param {string|number} value - 현재 선택된 값
 * @param {function} onChange - 값 변경 핸들러
 * @param {string} direction - 레이아웃 방향 ('horizontal', 'vertical')
 * @param {string} size - 선택지 크기 ('sm', 'md', 'lg')
 * @param {boolean} fullWidth - 전체 너비 사용 여부
 * @param {ReactNode} children - RadioOption 컴포넌트들
 */
function RadioGroup({
  name,
  value,
  onChange,
  direction = "horizontal",
  size = "md",
  fullWidth = false,
  children,
  ...rest
}) {
  return (
    <StyledRadioGroup
      direction={direction}
      fullWidth={fullWidth}
      role="radiogroup"
      {...rest}
    >
      {children}
    </StyledRadioGroup>
  );
}

/**
 * Radio 옵션 컴포넌트
 * RadioGroup 내부에서 개별 선택지로 사용
 * 
 * @param {string} name - Radio 그룹 이름 (필수)
 * @param {string|number} value - 이 옵션의 값 (필수)
 * @param {string|number} currentValue - 현재 선택된 값
 * @param {function} onChange - 값 변경 핸들러
 * @param {string} label - 라벨 텍스트 (필수)
 * @param {string} size - 크기 ('sm', 'md', 'lg')
 * @param {boolean} disabled - 비활성화 여부
 * @param {boolean} fullWidth - 전체 너비 사용 여부
 */
function RadioOption({
  name,
  value,
  currentValue,
  onChange,
  label,
  size = "md",
  disabled = false,
  fullWidth = false,
  ...rest
}) {
  const isChecked = value === currentValue;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleChange();
    }
  };

  return (
    <StyledRadioOption
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      isChecked={isChecked}
      onClick={handleChange}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="radio"
      aria-checked={isChecked}
      aria-disabled={disabled}
      {...rest}
    >
      <HiddenInput
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <RadioCircle isChecked={isChecked} size={size}>
        {isChecked && <RadioDot />}
      </RadioCircle>
      <RadioLabel size={size}>{label}</RadioLabel>
    </StyledRadioOption>
  );
}

export { RadioGroup, RadioOption };

// Styled Components
const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === "vertical" ? "column" : "row"};
  gap: ${({ theme, direction }) =>
    direction === "vertical" ? theme.spacing.md : theme.spacing.sm};
  flex-wrap: ${({ direction }) => (direction === "horizontal" ? "wrap" : "nowrap")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

const StyledRadioOption = styled.label`
  /* 기본 스타일 */
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all ${({ theme }) => theme.transition.fast};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.primaryLight : theme.colors.background.primary};
  border: 2px solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.colors.primary : theme.colors.border.light};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  /* 크기별 패딩 */
  ${({ size, theme }) => {
    switch (size) {
      case "sm":
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          min-height: 40px;
        `;
      case "lg":
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          min-height: 60px;
        `;
      case "md":
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          min-height: 48px;
        `;
    }
  }}

  /* 호버 효과 */
  &:hover:not([aria-disabled="true"]) {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }

  /* 포커스 스타일 (접근성) */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* 활성화 상태 (클릭) */
  &:active:not([aria-disabled="true"]) {
    transform: translateY(0);
  }

  /* 선택 시 펄스 애니메이션 */
  ${({ isChecked, theme }) =>
    isChecked &&
    `
    animation: selectPulse 300ms ease-in-out;
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  `}

  @keyframes selectPulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const RadioCircle = styled.div`
  /* 기본 스타일 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.colors.primary : theme.colors.border.medium};
  background: ${({ theme }) => theme.colors.background.primary};
  transition: all ${({ theme }) => theme.transition.fast};
  flex-shrink: 0;

  /* 크기별 스타일 */
  ${({ size }) => {
    switch (size) {
      case "sm":
        return `
          width: 18px;
          height: 18px;
        `;
      case "lg":
        return `
          width: 26px;
          height: 26px;
        `;
      case "md":
      default:
        return `
          width: 22px;
          height: 22px;
        `;
    }
  }}
`;

const RadioDot = styled.div`
  width: 50%;
  height: 50%;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  animation: scaleIn 0.2s ease-in-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const RadioLabel = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  user-select: none;

  /* 크기별 폰트 */
  ${({ size, theme }) => {
    switch (size) {
      case "sm":
        return `font-size: ${theme.fontSize.sm};`;
      case "lg":
        return `font-size: ${theme.fontSize.lg};`;
      case "md":
      default:
        return `font-size: ${theme.fontSize.base};`;
    }
  }}
`;

