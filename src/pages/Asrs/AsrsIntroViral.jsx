import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";
import { ROUTES } from "@constants/routes";

/**
 * ASRS 설문 인트로 페이지 (바이럴 스타일)
 * 친근하고 공감적인 톤으로 검사 안내
 */
function AsrsIntroViral() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(ROUTES.ASRS_TEST);
  };

  const handleBack = () => {
    navigate(ROUTES.LANDING);
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <BackButton onClick={handleBack}>← 돌아가기</BackButton>
        </Header>

        {/* 메인 카드 */}
        <MainCard>
          <Emoji>🎯</Emoji>
          <Title>5분이면 충분해요</Title>
          <Subtitle>자, 시작해볼까요?</Subtitle>

          <Description>
            어려운 질문은 없어요. 최근 6개월 동안의 나를 떠올리며,
            <br />
            솔직하게 답해주시면 돼요 ✨
          </Description>

          {/* 이런 사람들이 많이 했어요 */}
          <InfoCard>
            <InfoIcon>👥</InfoIcon>
            <InfoTitle>이런 분들이 많이 체크하셨어요</InfoTitle>
            <InfoList>
              <InfoItem>📌 "중요한 일을 자꾸 잊어버려요"</InfoItem>
              <InfoItem>⏰ "마감 직전에야 일을 시작해요"</InfoItem>
              <InfoItem>💭 "집중이 잘 안 돼요"</InfoItem>
              <InfoItem>🎯 "시작한 일을 끝내기 어려워요"</InfoItem>
            </InfoList>
          </InfoCard>

          {/* 검사 구성 - 간단하게 */}
          <StepsCard>
            <StepsTitle>🗺️ 전체 여정 (총 3단계, 약 15분)</StepsTitle>
            <StepsGrid>
              <StepItem>
                <StepEmoji>1️⃣</StepEmoji>
                <StepInfo>
                  <StepLabel>지금 나는?</StepLabel>
                  <StepTime>18개 질문 • 5분</StepTime>
                </StepInfo>
              </StepItem>
              <StepItem>
                <StepEmoji>2️⃣</StepEmoji>
                <StepInfo>
                  <StepLabel>일상 영향</StepLabel>
                  <StepTime>3개 질문 • 2분</StepTime>
                </StepInfo>
              </StepItem>
              <StepItem>
                <StepEmoji>3️⃣</StepEmoji>
                <StepInfo>
                  <StepLabel>어렸을 때는?</StepLabel>
                  <StepTime>25개 질문 • 7분</StepTime>
                </StepInfo>
              </StepItem>
            </StepsGrid>
          </StepsCard>

          {/* 안내 사항 */}
          <TipsSection>
            <TipsTitle>💡 시작하기 전에 알아두면 좋아요</TipsTitle>
            <TipsList>
              <Tip>
                <TipIcon>✨</TipIcon>
                <TipText>
                  편하게 앉아서, 최근 6개월을 떠올려보세요
                </TipText>
              </Tip>
              <Tip>
                <TipIcon>💬</TipIcon>
                <TipText>
                  정답은 없어요. 솔직한 답변이 가장 좋아요
                </TipText>
              </Tip>
              <Tip>
                <TipIcon>⏸️</TipIcon>
                <TipText>
                  언제든 멈추고 다시 시작할 수 있어요
                </TipText>
              </Tip>
            </TipsList>
          </TipsSection>

          {/* 작은 Disclaimer */}
          <DisclaimerBox>
            💚 참고만 해주세요: 이 체크는 선별 도구일 뿐, 의학적 진단은 아니에요.
            <br />
            정확한 진단은 전문의와 상담해주세요!
          </DisclaimerBox>

          {/* 버튼 */}
          <ButtonGroup>
            <Button variant="outline" onClick={handleBack}>
              아직 고민중이에요
            </Button>
            <Button size="lg" onClick={handleStart}>
              시작할게요! ✨
            </Button>
          </ButtonGroup>
        </MainCard>

        {/* 하단 메시지 */}
        <FooterMessage>
          🔒 답변은 안전하게 보관돼요. 걱정하지 마세요!
        </FooterMessage>
      </ContentWrapper>
    </Container>
  );
}

export default AsrsIntroViral;

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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background.secondary} 0%,
    ${({ theme }) => theme.colors.background.primary} 50%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  transition: color ${({ theme }) => theme.transition.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MainCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["3xl"]};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  text-align: center;
  animation: ${fadeIn} 600ms ease-out;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing["2xl"]};
  }
`;

const Emoji = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
`;

// Info Card
const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: left;
`;

const InfoIcon = styled.div`
  font-size: 36px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

// Steps Card
const StepsCard = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StepsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StepEmoji = styled.div`
  font-size: 36px;
`;

const StepInfo = styled.div`
  text-align: center;
`;

const StepLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StepTime = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Tips Section
const TipsSection = styled.div`
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TipsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Tip = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const TipIcon = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

const TipText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

// Disclaimer
const DisclaimerBox = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.9;
`;

// Buttons
const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterMessage = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

