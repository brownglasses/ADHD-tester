import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import CategoryAnalysis from "@components/CategoryAnalysis";
import AsrsRadarChart from "@components/charts/AsrsRadarChart";
import WursBarChart from "@components/charts/WursBarChart";
import ComprehensiveComparisonChart from "@components/charts/ComprehensiveComparisonChart";
import { calculateAllScores } from "@utils/scoring";
import { analyzeASRSCategories, analyzeWURSCategories } from "@utils/categoryAnalysis";
import { generateResultPDF } from "@utils/pdfGenerator";
import { ROUTES } from "@constants/routes";
import useTestStore from "@store/useTestStore";

/**
 * 종합 결과 페이지
 * - ASRS, 기능 저하, WURS 종합 결과
 * - 카테고리별 상세 분석
 * - 시각화 차트 (레이더, 바, 비교)
 * - PDF 다운로드
 * - 병원 찾기
 */
function Result() {
  const navigate = useNavigate();
  // Store에서 답변 데이터 가져오기
  const asrsStore = useTestStore((state) => state.asrs);
  const impairmentStore = useTestStore((state) => state.impairment);
  const wursStore = useTestStore((state) => state.wurs);

  const [result, setResult] = useState(null);
  const [asrsCategories, setAsrsCategories] = useState(null);
  const [wursCategories, setWursCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 답변이 없으면 랜딩 페이지로 리다이렉트
    if (
      !asrsStore.answers ||
      Object.keys(asrsStore.answers).length === 0 ||
      !impairmentStore.answers ||
      Object.keys(impairmentStore.answers).length === 0 ||
      !wursStore.answers ||
      Object.keys(wursStore.answers).length === 0
    ) {
      navigate(ROUTES.LANDING);
      return;
    }

    // 점수 계산
    const calculatedResult = calculateAllScores(
      asrsStore.answers,
      impairmentStore.answers,
      wursStore.answers
    );
    setResult(calculatedResult);

    // 카테고리 분석
    const asrsAnalysis = analyzeASRSCategories(asrsStore.answers);
    const wursAnalysis = analyzeWURSCategories(wursStore.answers);
    setAsrsCategories(asrsAnalysis);
    setWursCategories(wursAnalysis);

    setLoading(false);
  }, [asrsStore.answers, impairmentStore.answers, wursStore.answers, navigate]);

  const handleDownloadPDF = () => {
    if (!result) return;
    generateResultPDF(result, {
      name: "익명",
      date: new Date(),
    });
  };

  const handleGoToHospital = () => {
    navigate(ROUTES.HOSPITAL);
  };

  if (loading || !result) {
    return (
      <Container>
        <LoadingMessage>결과를 계산하고 있습니다...</LoadingMessage>
      </Container>
    );
  }

  // result 객체에서 점수 결과 추출
  const { asrs, impairment, wurs, comprehensive } = result;

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <Title>📊 검사 결과</Title>
        <Subtitle>ADHD 자가 스크리닝 종합 결과입니다</Subtitle>
      </Header>

      {/* Disclaimer */}
      <DisclaimerBox>
        <DisclaimerIcon>⚠️</DisclaimerIcon>
        <DisclaimerText>
          이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.
          <br />
          정확한 진단은 정신건강의학과 전문의와 상담하세요.
        </DisclaimerText>
      </DisclaimerBox>

      {/* 종합 평가 */}
      <ComprehensiveCard urgency={comprehensive.urgency}>
        <ComprehensiveTitle>{comprehensive.title}</ComprehensiveTitle>
        <ComprehensiveMessage>{comprehensive.message}</ComprehensiveMessage>

        {/* DSM-5 기준 충족 여부 */}
        <DSMCriteriaBox>
          <DSMTitle>DSM-5 진단 기준 충족 여부</DSMTitle>
          <DSMGrid>
            <DSMItem met={comprehensive.dsmCriteria.A === "충족"}>
              <DSMLabel>Criterion A</DSMLabel>
              <DSMDescription>현재 증상 (ASRS)</DSMDescription>
              <DSMStatus>{comprehensive.dsmCriteria.A}</DSMStatus>
            </DSMItem>
            <DSMItem met={comprehensive.dsmCriteria.B === "충족"}>
              <DSMLabel>Criterion B</DSMLabel>
              <DSMDescription>12세 이전 발병 (WURS)</DSMDescription>
              <DSMStatus>{comprehensive.dsmCriteria.B}</DSMStatus>
            </DSMItem>
            <DSMItem met={comprehensive.dsmCriteria.D === "충족"}>
              <DSMLabel>Criterion D</DSMLabel>
              <DSMDescription>기능 저하 (2개 이상 영역)</DSMDescription>
              <DSMStatus>{comprehensive.dsmCriteria.D}</DSMStatus>
            </DSMItem>
          </DSMGrid>
        </DSMCriteriaBox>

        {/* 다음 단계 권장사항 */}
        <NextStepsBox>
          <NextStepsTitle>권장 사항</NextStepsTitle>
          <NextStepsList>
            {comprehensive.nextSteps.map((step, index) => (
              <NextStepItem key={index} urgent={step.urgent}>
                <StepIcon>{step.icon}</StepIcon>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </NextStepItem>
            ))}
          </NextStepsList>
        </NextStepsBox>
      </ComprehensiveCard>

      {/* 상세 점수 */}
      <Section>
        <SectionTitle>📈 상세 점수</SectionTitle>
        <ScoreGrid>
          <ScoreCard>
            <ScoreIcon>🎯</ScoreIcon>
            <ScoreName>ASRS (현재 증상)</ScoreName>
            <ScoreValue>
              {asrs.totalScore} / 72점
              <ScoreDetail>(Part A: {asrs.partAScore}/24)</ScoreDetail>
            </ScoreValue>
            <ScoreLevel level={asrs.interpretation}>
              {asrs.riskLevel}
            </ScoreLevel>
          </ScoreCard>

          <ScoreCard>
            <ScoreIcon>📊</ScoreIcon>
            <ScoreName>기능 저하 평가</ScoreName>
            <ScoreValue>
              {impairment.yesCount} / 3개 영역
            </ScoreValue>
            <ScoreLevel level={impairment.level}>
              {impairment.description}
            </ScoreLevel>
          </ScoreCard>

          <ScoreCard>
            <ScoreIcon>👶</ScoreIcon>
            <ScoreName>WURS (아동기 증상)</ScoreName>
            <ScoreValue>{wurs.totalScore} / 100점</ScoreValue>
            <ScoreLevel level={wurs.interpretation}>
              {wurs.description}
            </ScoreLevel>
          </ScoreCard>
        </ScoreGrid>

        {/* ASRS 하위 유형 */}
        {asrs.subtype !== "unknown" && (
          <SubtypeBox>
            <SubtypeTitle>ADHD 하위 유형 분석</SubtypeTitle>
            <SubtypeContent>
              <SubtypeLabel>
                {getSubtypeLabel(asrs.subtype)} (
                {getSubtypeEmoji(asrs.subtype)})
              </SubtypeLabel>
              <SubtypeScores>
                <SubtypeScoreItem>
                  부주의: {asrs.inattentionScore}/36
                </SubtypeScoreItem>
                <SubtypeScoreItem>
                  과잉행동-충동: {asrs.hyperactivityScore}/36
                </SubtypeScoreItem>
              </SubtypeScores>
            </SubtypeContent>
          </SubtypeBox>
        )}
      </Section>

      {/* 카테고리별 분석 */}
      {asrsCategories && (
        <Section>
          <CategoryAnalysis categories={asrsCategories} type="asrs" />
        </Section>
      )}

      {wursCategories && (
        <Section>
          <CategoryAnalysis categories={wursCategories} type="wurs" />
        </Section>
      )}

      {/* 시각화 차트 */}
      <Section>
        <SectionTitle>📊 시각화 분석</SectionTitle>
        {asrsCategories && <AsrsRadarChart categoryAnalysis={asrsCategories} />}
        {wursCategories && <WursBarChart categoryAnalysis={wursCategories} />}
        
      </Section>

      {/* 하단 액션 버튼 */}
      <ActionButtonGroup>
        <Button variant="accent" size="lg" onClick={handleDownloadPDF}>
          📄 PDF로 저장하기
        </Button>
        <Button size="lg" onClick={handleGoToHospital}>
          🏥 병원 찾기
        </Button>
      </ActionButtonGroup>

      {/* 추가 정보 */}
      <InfoBox>
        <InfoTitle>💡 다음 단계는?</InfoTitle>
        <InfoList>
          <InfoItem>
            1. 위의 "PDF로 저장하기" 버튼을 눌러 결과를 저장하세요
          </InfoItem>
          <InfoItem>
            2. "병원 찾기"에서 근처 정신건강의학과를 검색하세요
          </InfoItem>
          <InfoItem>
            3. 병원 예약 시 "성인 ADHD 진단 상담"이라고 말씀하세요
          </InfoItem>
          <InfoItem>
            4. 진료 시 저장한 PDF 결과를 가져가시면 도움이 됩니다
          </InfoItem>
        </InfoList>
      </InfoBox>

      <BottomButtonGroup>
        <Button variant="outline" onClick={() => navigate(ROUTES.LANDING)}>
          처음으로
        </Button>
      </BottomButtonGroup>
    </Container>
  );
}

/**
 * 하위 유형 라벨 변환
 */
function getSubtypeLabel(subtype) {
  const labels = {
    inattentive: "부주의형 우세",
    hyperactive: "과잉행동-충동형 우세",
    combined: "복합형",
  };
  return labels[subtype] || subtype;
}

/**
 * 하위 유형 이모지
 */
function getSubtypeEmoji(subtype) {
  const emojis = {
    inattentive: "🎯",
    hyperactive: "⚡",
    combined: "🔄",
  };
  return emojis[subtype] || "❓";
}

export default Result;

// Styled Components

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const DisclaimerBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accentLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DisclaimerIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  flex-shrink: 0;
`;

const DisclaimerText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

const ComprehensiveCard = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 2px solid
    ${({ urgency, theme }) => {
      if (urgency === "high") return theme.colors.danger;
      if (urgency === "moderate") return theme.colors.accent;
      return theme.colors.primary;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const ComprehensiveTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const ComprehensiveMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  white-space: pre-line;
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
  text-align: center;
`;

const DSMCriteriaBox = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DSMTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const DSMGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DSMItem = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 2px solid
    ${({ met, theme }) => (met ? theme.colors.primary : theme.colors.borderMedium)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const DSMLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DSMDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DSMStatus = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const NextStepsBox = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const NextStepsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const NextStepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NextStepItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, urgent }) =>
    urgent ? theme.colors.dangerLight : theme.colors.bgWhite};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const StepIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StepDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight};
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }
`;

const ScoreIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ScoreName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ScoreValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ScoreDetail = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ScoreLevel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ level, theme }) => {
    if (level === "high" || level === "severe") return theme.colors.danger;
    if (level === "moderate" || level === "significant")
      return theme.colors.accent;
    return theme.colors.primary;
  }};
  font-weight: 500;
`;

const SubtypeBox = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SubtypeTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const SubtypeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SubtypeLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const SubtypeScores = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SubtypeScoreItem = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoBox = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 2;
  padding-left: ${({ theme }) => theme.spacing.md};
  position: relative;

  &:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const BottomButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["2xl"]};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

