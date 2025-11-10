import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";
import { ROUTES } from "@constants/routes";

/**
 * WURS 설문 인트로 페이지 (바이럴 스타일)
 * 친근하고 공감적인 톤으로 아동기 회상 검사 안내
 */
function WursIntroViral() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(ROUTES.WURS_TEST);
  };

  const handleBack = () => {
    navigate(ROUTES.IMPAIRMENT_COMPLETE);
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <BackButton onClick={handleBack}>← 돌아가기</BackButton>
          <Badge>마지막 단계 💪</Badge>
        </Header>

        {/* 메인 카드 */}
        <MainCard>
          <Emoji>🧒</Emoji>
          <Title>어렸을 때를 떠올려볼까요?</Title>
          <Subtitle>7-10살, 초등학교 저학년 시절이에요</Subtitle>

          <Description>
            "옛날 생각이 잘 안 나는데?" 괜찮아요!
            <br />
            어렴풋이 기억나는 대로 답해주시면 돼요 ✨
          </Description>

          {/* 왜 과거를 묻나요? */}
          <WhyCard>
            <WhyIcon>🤔</WhyIcon>
            <WhyTitle>왜 어린 시절 이야기를 물어볼까요?</WhyTitle>
            <WhyContent>
              ADHD는 어릴 때부터 시작되는 특성이에요.
              <br />
              그래서 과거를 살펴보는 게 중요하답니다!
              <br /><br />
              <Strong>기억이 안 나도 괜찮아요</Strong>
              <br />
              부모님께 여쭤보거나, 어렴풋한 기억으로 답해도 충분해요.
            </WhyContent>
          </WhyCard>

          {/* 검사 정보 */}
          <InfoCard>
            <InfoTitle>📋 이번 단계는요</InfoTitle>
            <InfoGrid>
              <InfoItem>
                <InfoEmoji>📝</InfoEmoji>
                <InfoLabel>질문 수</InfoLabel>
                <InfoValue>25개</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoEmoji>⏱️</InfoEmoji>
                <InfoLabel>소요 시간</InfoLabel>
                <InfoValue>약 7분</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoEmoji>🎯</InfoEmoji>
                <InfoLabel>답변 방식</InfoLabel>
                <InfoValue>5단계 선택</InfoValue>
              </InfoItem>
            </InfoGrid>
          </InfoCard>

          {/* 답변 팁 */}
          <TipsSection>
            <TipsTitle>💡 이렇게 답해보세요</TipsTitle>
            <TipsList>
              <Tip>
                <TipIcon>👨‍👩‍👧</TipIcon>
                <TipText>
                  <TipTitle>기억이 잘 안 나면</TipTitle>
                  부모님이나 형제자매에게 물어보는 것도 좋아요
                </TipText>
              </Tip>
              <Tip>
                <TipIcon>✨</TipIcon>
                <TipText>
                  <TipTitle>어렴풋이라도 괜찮아요</TipTitle>
                  완벽한 기억이 아니어도 괜찮답니다
                </TipText>
              </Tip>
              <Tip>
                <TipIcon>🎈</TipIcon>
                <TipText>
                  <TipTitle>7-10살 나를 떠올려보세요</TipTitle>
                  학교 다닐 때, 집에서, 친구들과 놀 때...
                </TipText>
              </Tip>
            </TipsList>
          </TipsSection>

          {/* 예시 질문 */}
          <ExampleCard>
            <ExampleTitle>📌 이런 질문들이 나와요</ExampleTitle>
            <ExampleList>
              <ExampleItem>"집중하기 어려웠나요?"</ExampleItem>
              <ExampleItem>"가만히 앉아있기 힘들었나요?"</ExampleItem>
              <ExampleItem>"충동적이었나요?"</ExampleItem>
              <ExampleItem>"감정 조절이 어려웠나요?"</ExampleItem>
            </ExampleList>
            <ExampleNote>
              💚 7-10살 시절을 떠올리며 답해주세요!
            </ExampleNote>
          </ExampleCard>

          {/* 버튼 */}
          <ButtonGroup>
            <Button variant="outline" onClick={handleBack} size="lg">
              잠깐, 돌아갈래요
            </Button>
            <Button onClick={handleStart} size="lg">
              마지막 단계 시작! 🚀
            </Button>
          </ButtonGroup>
        </MainCard>

        {/* 하단 메시지 */}
        <FooterMessage>
          🎉 거의 다 왔어요! 조금만 더 힘내세요!
        </FooterMessage>
      </ContentWrapper>
    </Container>
  );
}

export default WursIntroViral;

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
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

const Badge = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
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

// Why Card
const WhyCard = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: left;
`;

const WhyIcon = styled.div`
  font-size: 36px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const WhyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const WhyContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  text-align: center;
`;

const Strong = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

// Info Card
const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoEmoji = styled.div`
  font-size: 32px;
`;

const InfoLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const InfoValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
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
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Tip = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const TipIcon = styled.div`
  font-size: 28px;
  flex-shrink: 0;
`;

const TipText = styled.div`
  flex: 1;
`;

const TipTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// Example Card
const ExampleCard = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 2px dashed ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ExampleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const ExampleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ExampleItem = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-left: ${({ theme }) => theme.spacing.md};
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExampleNote = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
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

