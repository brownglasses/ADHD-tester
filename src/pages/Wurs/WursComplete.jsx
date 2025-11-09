import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { ROUTES } from "@constants/routes";

/**
 * WURS 완료 축하 페이지
 * WURS 검사 완료 후 사용자에게 격려 메시지 전달
 * 결과 페이지로 이동 전 마무리 안내
 */
function WursComplete() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  // 자동 전환 카운트다운 (8초)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // 자동으로 결과 페이지로
      handleNext();
    }
  }, [countdown]);

  const handleNext = () => {
    // navigate(ROUTES.RESULT);
    alert("결과 페이지는 추후 구현 예정입니다!");
    navigate(ROUTES.LANDING);
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 축하 카드 */}
        <CelebrationCard padding="xl">
          {/* 아이콘 */}
          <IconWrapper>
            <CelebrationIcon>🎊</CelebrationIcon>
          </IconWrapper>

          {/* 메시지 */}
          <Title>모든 검사를 완료했습니다!</Title>
          <Subtitle>정말 수고 많으셨어요 (총 46문항 완료)</Subtitle>

          {/* 진행 상황 */}
          <ProgressSection>
            <ProgressTitle>전체 진행 상황</ProgressTitle>
            <StepIndicator>
              <Step $completed data-completed>
                <StepIcon>✓</StepIcon>
                <StepLabel>ASRS</StepLabel>
                <StepDescription>18문항 완료</StepDescription>
              </Step>
              <StepConnector />
              <Step $completed data-completed>
                <StepIcon>✓</StepIcon>
                <StepLabel>기능 저하</StepLabel>
                <StepDescription>3문항 완료</StepDescription>
              </Step>
              <StepConnector />
              <Step $completed data-completed>
                <StepIcon>✓</StepIcon>
                <StepLabel>WURS</StepLabel>
                <StepDescription>25문항 완료</StepDescription>
              </Step>
              <StepConnector />
              <Step $current data-current>
                <StepIcon>4</StepIcon>
                <StepLabel>결과</StepLabel>
                <StepDescription>종합 분석</StepDescription>
              </Step>
            </StepIndicator>
          </ProgressSection>

          {/* 격려 메시지 */}
          <MessageBox>
            <MessageIcon>🎉</MessageIcon>
            <MessageText>
              <MessageTitle>정말 잘하셨습니다!</MessageTitle>
              <MessageDescription>
                이제 종합 결과를 확인하실 수 있습니다.
                <br />
                현재와 과거의 증상을 바탕으로 전문가 상담이 필요한지 안내해 드립니다.
              </MessageDescription>
            </MessageText>
          </MessageBox>

          {/* 안내 메시지 */}
          <InfoBox>
            <InfoIcon>ℹ️</InfoIcon>
            <InfoText>
              <InfoTitle>결과 페이지에서는</InfoTitle>
              <InfoList>
                <InfoItem>• ASRS 점수 및 해석</InfoItem>
                <InfoItem>• WURS 점수 및 해석</InfoItem>
                <InfoItem>• 종합 소견 및 권장사항</InfoItem>
                <InfoItem>• 전문의 상담 필요성 안내</InfoItem>
              </InfoList>
            </InfoText>
          </InfoBox>

          {/* 자동 전환 카운트다운 */}
          <CountdownSection>
            <CountdownText>
              {countdown}초 후 결과 페이지로 이동합니다
            </CountdownText>
            <CountdownBar>
              <CountdownFill $percentage={(8 - countdown) * 12.5} />
            </CountdownBar>
          </CountdownSection>

          {/* 버튼 */}
          <ButtonWrapper>
            <Button onClick={handleSkip} size="lg" fullWidth>
              결과 확인하기 →
            </Button>
          </ButtonWrapper>
        </CelebrationCard>
      </ContentWrapper>
    </Container>
  );
}

export default WursComplete;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const checkmark = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  animation: ${fadeIn} 600ms ease-out;
`;

const CelebrationCard = styled(Card)`
  text-align: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.primary} 0%,
    ${({ theme }) => theme.colors.successLight || theme.colors.primaryLight} 100%
  );
`;

const IconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CelebrationIcon = styled.div`
  font-size: 80px;
  animation: ${bounce} 2s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 64px;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.success || theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CompletionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.success || theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BadgeIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  animation: ${checkmark} 600ms ease-out;
`;

const BadgeText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const ProgressSection = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const ProgressTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ $completed, $current }) => ($completed || $current ? 1 : 0.4)};
  transition: opacity ${({ theme }) => theme.transition.base};
`;

const StepIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  ${Step}[data-current] & {
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const StepLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StepDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`;

const StepConnector = styled.div`
  flex: 0 0 20px;
  height: 2px;
  background: ${({ theme }) => theme.colors.border.light};
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MessageBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
  text-align: left;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const MessageIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  flex-shrink: 0;
`;

const MessageText = styled.div`
  flex: 1;
`;

const MessageTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.success || theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MessageDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

const InfoBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
  text-align: left;
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const InfoIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  flex: 1;
`;

const InfoTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InfoItem = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

const CountdownSection = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const CountdownText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CountdownBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const CountdownFill = styled.div`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme }) => theme.colors.success || theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 1s linear;
`;

const ButtonWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;


