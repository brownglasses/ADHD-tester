import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { ROUTES } from "@constants/routes";

/**
 * WURS 설문 인트로 페이지
 * 테스트 시작 전 안내문 표시
 * - 아동기 회상 검사 설명
 * - 검사 구성 안내
 * - 출처 및 신뢰성 정보
 */
function WursIntro() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(ROUTES.WURS_TEST);
  };

  const handleBack = () => {
    // 기능 저하 평가 완료 페이지로 돌아가기
    navigate(ROUTES.IMPAIRMENT_COMPLETE);
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <BackButton onClick={handleBack}>← 돌아가기</BackButton>
          <Badge>2단계: 과거 증상 평가</Badge>
        </Header>

        {/* 메인 카드 */}
        <MainCard padding="xl">
          <Icon>🧒</Icon>
          <Title>아동기 ADHD 증상 회상 검사</Title>
          <Subtitle>Wender Utah Rating Scale (WURS)</Subtitle>

          <Description>
            이 검사는 <strong>7-10세 어린 시절</strong>의 ADHD 증상을 회상하여
            평가합니다. ADHD는 아동기에 시작되는 신경발달 장애이므로, 과거
            증상을 확인하는 것이 중요합니다.
          </Description>

          {/* 검사 구성 */}
          <TestStructureSection>
            <SectionTitle>📝 검사 구성</SectionTitle>
            <InfoBox>
              <InfoTitle>총 25문항</InfoTitle>
              <InfoContent>
                <InfoItem>• 소요 시간: 약 5-7분</InfoItem>
                <InfoItem>
                  • 답변 방식: 5점 척도 (전혀 없었다 ~ 매우 심했다)
                </InfoItem>
                <InfoItem>
                  • 평가 시기: <strong>7-10세 어린 시절</strong>
                </InfoItem>
              </InfoContent>
            </InfoBox>
          </TestStructureSection>

          {/* 안내 사항 */}
          <InfoSection>
            <SectionTitle>💡 검사 전 안내</SectionTitle>
            <InfoList>
              <InfoListItem>
                <InfoIcon>👨‍👩‍👧</InfoIcon>
                <InfoText>
                  <InfoTextTitle>기억이 잘 나지 않는다면</InfoTextTitle>
                  부모님이나 형제자매에게 물어보거나, 어렴풋이 기억나는 것을
                  바탕으로 응답하세요.
                </InfoText>
              </InfoListItem>

              <InfoListItem>
                <InfoIcon>🎯</InfoIcon>
                <InfoText>
                  <InfoTextTitle>정확한 기억이 중요합니다</InfoTextTitle>
                  7-10세 시절의 자신을 떠올리며, 최대한 솔직하게 답변해 주세요.
                </InfoText>
              </InfoListItem>

              <InfoListItem>
                <InfoIcon>📊</InfoIcon>
                <InfoText>
                  <InfoTextTitle>과학적 근거</InfoTextTitle>
                  Wender Utah Rating Scale은 성인 ADHD 진단에 널리 사용되는
                  검증된 도구입니다 (Wender, 1993).
                </InfoText>
              </InfoListItem>

              <InfoListItem>
                <InfoIcon>🔒</InfoIcon>
                <InfoText>
                  <InfoTextTitle>안전한 검사</InfoTextTitle>
                  모든 답변은 안전하게 저장되며, 언제든지 결과를 확인할 수
                  있습니다.
                </InfoText>
              </InfoListItem>
            </InfoList>
          </InfoSection>

          {/* 중요 안내 */}
          <WarningBox>
            <WarningIcon>⚠️</WarningIcon>
            <WarningText>
              <strong>기억이 전혀 나지 않는다면?</strong>
              <br />
              "전혀 없었다"를 선택하거나, 부모님께 여쭤보신 후 진행하세요.
            </WarningText>
          </WarningBox>

          {/* 버튼 그룹 */}
          <ButtonGroup>
            <Button variant="outline" onClick={handleBack} size="lg">
              이전으로
            </Button>
            <Button onClick={handleStart} size="lg" fullWidth>
              검사 시작하기 →
            </Button>
          </ButtonGroup>
        </MainCard>
      </ContentWrapper>
    </Container>
  );
}

export default WursIntro;

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
  max-width: 800px;
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
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const MainCard = styled(Card)`
  text-align: center;
`;

const Icon = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TestStructureSection = styled.div`
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const InfoTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoItem = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

const InfoSection = styled.div`
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InfoListItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const InfoIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  flex-shrink: 0;
`;

const InfoText = styled.div`
  flex: 1;
`;

const InfoTextTitle = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const WarningBox = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: left;
`;

const WarningIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  flex-shrink: 0;
`;

const WarningText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;


