import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { ROUTES } from "@constants/routes";

/**
 * ASRS 설문 인트로 페이지
 * 테스트 시작 전 필수 안내문 표시
 * - 서비스 목적 및 한계 고지
 * - 검사 구성 안내
 * - 출처 및 신뢰성 정보
 */
function AsrsIntro() {
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
          <Badge>검사 시작 전 안내</Badge>
        </Header>

        {/* 필수 안내문 카드 */}
        <DisclaimerCard variant="secondary" padding="xl">
          <DisclaimerIcon>⚠️</DisclaimerIcon>
          <DisclaimerTitle>중요 안내사항</DisclaimerTitle>
          <DisclaimerContent>
            <DisclaimerParagraph>
              본 테스트는 성인 ADHD에 대한 이해를 돕고, 전문의와의 상담 필요성을
              판단하기 위한 <strong>'참고용 선별 검사'</strong>입니다.
            </DisclaimerParagraph>
            <DisclaimerParagraph>
              이 결과는 <strong>의학적 진단이 아니며</strong>, 그 어떤 의학적
              소견도 대체할 수 없습니다.
            </DisclaimerParagraph>
            <DisclaimerParagraph>
              본 테스트는 세계보건기구(WHO)가 개발한{" "}
              <strong>ASRS-v1.1</strong>과 미국 정신의학회의{" "}
              <strong>DSM-5</strong> 진단 기준을 바탕으로 구성되었습니다.
            </DisclaimerParagraph>
            <DisclaimerHighlight>
              📌 정확한 진단과 치료는 반드시 정신건강의학과 전문의와 상의하십시오.
            </DisclaimerHighlight>
          </DisclaimerContent>
        </DisclaimerCard>

        {/* 메인 카드 - 검사 구성 안내 */}
        <MainCard padding="xl">
          <Icon>📋</Icon>
          <Title>성인 ADHD 종합 선별 검사</Title>
          <Subtitle>ASRS + 기능 저하 평가 + WURS</Subtitle>

          <Description>
            이 검사는 <strong>현재 증상, 기능 저하, 과거 증상</strong>을 종합적으로 평가하여
            <br />
            성인 ADHD 가능성을 정확하게 선별합니다.
          </Description>

          {/* 검사 구성 */}
          <TestStructureSection>
            <SectionTitle>📝 전체 검사 구성 (총 46문항, 약 15-20분)</SectionTitle>
            <StepList>
              <StepItem>
                <StepNumber>1단계</StepNumber>
                <StepContent>
                  <StepTitle>ASRS 증상 선별 (18문항)</StepTitle>
                  <StepDescription>
                    <strong>약 5-8분 소요</strong>
                    <br />
                    • Part A (6문항): 핵심 부주의 증상
                    <br />
                    • Part B (12문항): 과잉행동/충동성 증상
                    <br />
                    <em>출처: WHO ASRS-v1.1, DSM-5 진단 기준</em>
                  </StepDescription>
                </StepContent>
              </StepItem>

              <StepItem>
                <StepNumber>2단계</StepNumber>
                <StepContent>
                  <StepTitle>기능 저하 평가 (3문항)</StepTitle>
                  <StepDescription>
                    <strong>약 2-3분 소요</strong>
                    <br />
                    • 학업/직업 성과
                    <br />
                    • 대인 관계
                    <br />
                    • 일상 관리 능력
                    <br />
                    <em>출처: DSM-5 진단 기준 'D항' (기능 저하)</em>
                  </StepDescription>
                </StepContent>
              </StepItem>

              <StepItem>
                <StepNumber>3단계</StepNumber>
                <StepContent>
                  <StepTitle>WURS 아동기 증상 회상 (25문항)</StepTitle>
                  <StepDescription>
                    <strong>약 5-7분 소요</strong>
                    <br />
                    • 7-10세 시절의 행동 및 감정 패턴
                    <br />
                    • ADHD 진단의 핵심 요건: 아동기 증상 확인
                    <br />
                    <em>출처: Wender Utah Rating Scale, DSM-5 'B항'</em>
                  </StepDescription>
                </StepContent>
              </StepItem>
            </StepList>
          </TestStructureSection>

          {/* 안내 사항 */}
          <InfoSection>
            <SectionTitle>💡 답변 시 유의사항</SectionTitle>
            <InfoList>
              <InfoItem>
                <InfoIcon>⏱️</InfoIcon>
                <InfoText>
                  <strong>총 소요 시간:</strong> 약 15-20분 (총 46문항)
                </InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>💭</InfoIcon>
                <InfoText>
                  <strong>솔직한 답변:</strong> 옳고 그른 답은 없습니다. 최근
                  6개월 동안의 경험을 떠올리며 가장 가까운 답변을 선택해 주세요.
                </InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>🔒</InfoIcon>
                <InfoText>
                  <strong>개인정보 보호:</strong> 모든 답변은 안전하게
                  암호화되어 저장됩니다.
                </InfoText>
              </InfoItem>
              <InfoItem>
                <InfoIcon>📊</InfoIcon>
                <InfoText>
                  <strong>과학적 근거:</strong> WHO와 DSM-5의 검증된 척도를
                  사용합니다.
                </InfoText>
              </InfoItem>
            </InfoList>
          </InfoSection>

          {/* 버튼 */}
          <ButtonGroup>
            <Button variant="outline" onClick={handleBack}>
              돌아가기
            </Button>
            <Button size="lg" variant="secondary" onClick={handleStart}>
              검사 시작하기
            </Button>
          </ButtonGroup>
        </MainCard>

        {/* 하단 추가 안내 */}
        <FooterNote>
          검사 도중 언제든지 중단할 수 있습니다. 중단 시 답변은 저장되지
          않습니다.
        </FooterNote>
      </ContentWrapper>
    </Container>
  );
}

export default AsrsIntro;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  transition: color ${({ theme }) => theme.transition.fast};

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
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

// Disclaimer Card
const DisclaimerCard = styled(Card)`
  border: 2px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.background.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DisclaimerIcon = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DisclaimerTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DisclaimerContent = styled.div`
  text-align: left;
`;

const DisclaimerParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;

const DisclaimerHighlight = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

// Main Card
const MainCard = styled(Card)`
  text-align: center;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-style: italic;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

// Test Structure Section
const TestStructureSection = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  text-align: left;
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StepItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const StepNumber = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.primary};
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;

// Info Section
const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  text-align: left;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InfoText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const FooterNote = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;
