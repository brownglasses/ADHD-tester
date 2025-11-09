import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import Stepper from "@components/Stepper";
import { ROUTES } from "@constants/routes";

/**
 * Landing 페이지
 * ADHD 스크리너의 메인 홈페이지
 */
function Landing() {
  const navigate = useNavigate();

  const testSteps = [
    { label: "현재 증상", description: "ASRS 설문" },
    { label: "과거 증상", description: "WURS 설문" },
    { label: "결과 확인", description: "종합 분석" },
  ];

  const handleStartTest = () => {
    // TODO: 로그인 확인 후 ASRS 인트로로 이동
    navigate(ROUTES.ASRS_INTRO);
  };

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <Emoji>🌱</Emoji>
          <Title>ADHD 자가 스크리닝</Title>
          <Subtitle>
            당신의 첫걸음을 응원합니다
          </Subtitle>
          <Description>
            전문적이고 검증된 척도를 기반으로<br />
            나의 상태를 확인해보세요
          </Description>
          <CTAButton onClick={handleStartTest}>
            검사 시작하기
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* Process Section */}
      <ProcessSection>
        <SectionTitle>검사 진행 과정</SectionTitle>
        <SectionSubtitle>3단계로 간편하게 진행됩니다</SectionSubtitle>
        
        <StepperWrapper>
          <Stepper currentStep={-1} steps={testSteps} variant="primary" />
        </StepperWrapper>

        <ProcessCards>
          {testSteps.map((step, index) => (
            <ProcessCard key={index} variant="default" padding="lg" hoverable>
              <StepNumber>{index + 1}</StepNumber>
              <ProcessCardTitle>{step.label}</ProcessCardTitle>
              <ProcessCardDescription>
                {step.description}
              </ProcessCardDescription>
            </ProcessCard>
          ))}
        </ProcessCards>
      </ProcessSection>

      {/* Info Section */}
      <InfoSection>
        <InfoCards>
          <InfoCard variant="primary" padding="xl">
            <InfoIcon>⏱️</InfoIcon>
            <InfoTitle>약 10분 소요</InfoTitle>
            <InfoText>
              현재와 과거의 증상에 대한<br />
              간단한 질문에 답변합니다
            </InfoText>
          </InfoCard>

          <InfoCard variant="default" padding="xl">
            <InfoIcon>🔒</InfoIcon>
            <InfoTitle>안전한 개인정보</InfoTitle>
            <InfoText>
              모든 데이터는 안전하게<br />
              암호화되어 보호됩니다
            </InfoText>
          </InfoCard>

          <InfoCard variant="default" padding="xl">
            <InfoIcon>📊</InfoIcon>
            <InfoTitle>과학적 근거 기반</InfoTitle>
            <InfoText>
              ASRS, WURS 등<br />
              검증된 척도를 사용합니다
            </InfoText>
          </InfoCard>
        </InfoCards>
      </InfoSection>

      {/* Disclaimer Section */}
      <DisclaimerSection>
        <DisclaimerCard variant="secondary" padding="xl">
          <DisclaimerIcon>⚠️</DisclaimerIcon>
          <DisclaimerTitle>중요 안내사항</DisclaimerTitle>
          <DisclaimerText>
            이 검사는 <strong>선별 도구</strong>로, 의학적 진단을 대체할 수 없습니다.<br />
            정확한 진단은 반드시 전문의와의 상담을 통해 이루어져야 합니다.
          </DisclaimerText>
          <DisclaimerList>
            <li>본 검사는 ADHD 가능성을 확인하는 도구입니다</li>
            <li>결과는 참고 자료로만 활용해 주세요</li>
            <li>증상이 있다면 전문의 상담을 권장합니다</li>
          </DisclaimerList>
        </DisclaimerCard>
      </DisclaimerSection>

      {/* CTA Section */}
      <CTASection>
        <CTATitle>지금 바로 시작하세요</CTATitle>
        <CTADescription>
          자신을 이해하는 첫걸음, 함께 시작해요
        </CTADescription>
        <Button size="lg" onClick={handleStartTest}>
          검사 시작하기
        </Button>
      </CTASection>

      {/* Footer */}
      <Footer>
        <FooterLinks>
          <FooterLink onClick={() => navigate(ROUTES.FAQ)}>자주 묻는 질문</FooterLink>
          <FooterDivider>|</FooterDivider>
          <FooterLink onClick={() => navigate(ROUTES.PRIVACY)}>개인정보처리방침</FooterLink>
          <FooterDivider>|</FooterDivider>
          <FooterLink onClick={() => navigate(ROUTES.HOSPITAL)}>병원 찾기</FooterLink>
        </FooterLinks>
        <Copyright>
          © 2024 ADHD Screener. All rights reserved.
        </Copyright>
      </Footer>
    </Container>
  );
}

export default Landing;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`;

const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primaryLight} 0%,
    ${({ theme }) => theme.colors.background.primary} 100%
  );
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Emoji = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["4xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
  }
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const CTAButton = styled(Button).attrs({
  size: "lg",
  variant: "secondary",
})`
  min-width: 200px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing["2xl"]};
`;

const ProcessSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const StepperWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const ProcessCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled(Card)`
  text-align: center;
  position: relative;
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
`;

const ProcessCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProcessCardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const InfoSection = styled.section`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  }
`;

const InfoCards = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled(Card)`
  text-align: center;
`;

const InfoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const DisclaimerSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  }
`;

const DisclaimerCard = styled(Card)`
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
`;

const DisclaimerIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DisclaimerTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DisclaimerText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;

const DisclaimerList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    padding: ${({ theme }) => theme.spacing.sm} 0;
    padding-left: ${({ theme }) => theme.spacing.lg};
    position: relative;
    line-height: 1.6;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
    }
  }
`;

const CTASection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.xl};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  }
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterDivider = styled.span`
  color: ${({ theme }) => theme.colors.border.medium};
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
`;


