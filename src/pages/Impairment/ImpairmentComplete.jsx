import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { ROUTES } from "@constants/routes";

/**
 * 기능 저하 평가 완료 페이지
 * 기능 저하 평가 완료 후 WURS로 전환 안내
 */
function ImpairmentComplete() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  // 자동 전환 카운트다운 (8초)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // 자동으로 다음 단계로
      handleNext();
    }
  }, [countdown]);

  const handleNext = () => {
    navigate(ROUTES.WURS_INTRO);
  };

  const handleSkip = () => {
    navigate(ROUTES.WURS_INTRO);
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 축하 카드 */}
        <CelebrationCard padding="xl">
          {/* 아이콘 */}
          <IconWrapper>
            <CelebrationIcon>✨</CelebrationIcon>
          </IconWrapper>

          {/* 메시지 */}
          <Title>2단계 완료!</Title>
          <Subtitle>기능 저하 평가를 마쳤습니다 (3문항)</Subtitle>

          {/* 진행 상황 */}
          <ProgressSection>
            <ProgressTitle>전체 진행 상황</ProgressTitle>
            <StepIndicator>
              <Step $completed>
                <StepIcon>✓</StepIcon>
                <StepLabel>ASRS</StepLabel>
                <StepDescription>18문항 완료</StepDescription>
              </Step>
              <StepConnector />
              <Step $completed>
                <StepIcon>✓</StepIcon>
                <StepLabel>기능 저하</StepLabel>
                <StepDescription>3문항 완료</StepDescription>
              </Step>
              <StepConnector />
              <Step $current>
                <StepIcon>3</StepIcon>
                <StepLabel>WURS</StepLabel>
                <StepDescription>25문항 대기</StepDescription>
              </Step>
              <StepConnector />
              <Step>
                <StepIcon>4</StepIcon>
                <StepLabel>결과</StepLabel>
                <StepDescription>종합 분석</StepDescription>
              </Step>
            </StepIndicator>
          </ProgressSection>

          {/* 격려 메시지 */}
          <MessageBox>
            <MessageIcon>🎯</MessageIcon>
            <MessageText>
              <MessageTitle>절반 이상 진행했어요!</MessageTitle>
              <MessageDescription>
                다음은 <strong>아동기 증상 회상(WURS)</strong> 검사입니다.
                <br />
                7-10세 시절을 떠올리며 25문항에 답변해 주세요.
                <br />
                <br />
                ADHD는 <strong>아동기부터 증상이 있어야</strong> 진단이 가능합니다.
                <br />
                정확한 평가를 위해 과거를 떠올려 솔직하게 답변해 주세요.
              </MessageDescription>
            </MessageText>
          </MessageBox>

          {/* 휴식 안내 */}
          <BreakNotice>
            <BreakIcon>☕</BreakIcon>
            <BreakText>
              잠시 쉬어가셔도 좋습니다. 준비되시면 아래 버튼을 눌러주세요.
            </BreakText>
          </BreakNotice>

          {/* 자동 전환 카운트다운 */}
          <CountdownSection>
            <CountdownText>
              {countdown}초 후 자동으로 다음 단계로 이동합니다
            </CountdownText>
            <CountdownBar>
              <CountdownFill $percentage={(8 - countdown) * 12.5} />
            </CountdownBar>
          </CountdownSection>

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <Button variant="outline" onClick={() => navigate(ROUTES.LANDING)}>
              나중에 하기
            </Button>
            <Button onClick={handleSkip} size="lg" fullWidth>
              다음 단계로 →
            </Button>
          </ButtonGroup>
        </CelebrationCard>
      </ContentWrapper>
    </Container>
  );
}

export default ImpairmentComplete;

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

const sparkle = keyframes`
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.2) rotate(180deg);
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
    ${({ theme }) => theme.colors.accent} 100%
  );
`;

const IconWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CelebrationIcon = styled.div`
  font-size: 80px;
  animation: ${sparkle} 2s ease-in-out infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 64px;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MessageDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

const BreakNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BreakIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const BreakText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
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
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 1s linear;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;




