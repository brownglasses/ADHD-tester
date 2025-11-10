import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import CollapsibleSection from "@components/CollapsibleSection";
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
 * 종합 결과 페이지 (개선된 UX)
 * - Hero Section: 격려 메시지
 * - 핵심 결과: 간단명료하게
 * - Primary CTA: 병원 찾기 강조
 * - Progressive Disclosure: Collapsible Sections
 * - 지지적이고 따뜻한 톤
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
      {/* Hero Section - 격려 메시지 */}
      <HeroSection>
        <HeroIcon>🌱</HeroIcon>
        <HeroTitle>검사를 완료하셨습니다</HeroTitle>
        <HeroSubtitle>
          자신을 이해하려는 첫걸음을 내딛으셨습니다.
          <br />
          이것만으로도 큰 용기입니다.
        </HeroSubtitle>
      </HeroSection>

      {/* 핵심 결과 - 간단명료하게 */}
      <CoreResultCard urgency={comprehensive.urgency}>
        <ResultIcon>{getUrgencyIcon(comprehensive.urgency)}</ResultIcon>
        <ResultTitle>당신의 결과</ResultTitle>
        <ResultMessage>{getSupportiveMessage(comprehensive)}</ResultMessage>
        <ResultDescription>
          {getSimpleDescription(comprehensive)}
        </ResultDescription>
      </CoreResultCard>

      {/* Primary CTA - 병원 찾기 강조 */}
      <PrimaryCTASection>
        <CTAIcon>💚</CTAIcon>
        <CTATitle>다음 단계</CTATitle>
        <CTAMessage>
          전문가와 상담하시면 더 정확한 진단과<br />
          맞춤 치료를 받으실 수 있습니다
        </CTAMessage>
        <PrimaryButton onClick={handleGoToHospital}>
          🏥 병원 찾기
        </PrimaryButton>
        <SecondaryLink onClick={handleDownloadPDF}>
          📄 PDF로 저장하기
        </SecondaryLink>
      </PrimaryCTASection>

      {/* 격려 메시지 */}
      <EncouragementCard>
        <EncouragementIcon>💪</EncouragementIcon>
        <EncouragementTitle>알아두세요</EncouragementTitle>
        <EncouragementMessage>ADHD는 관리 가능한 상태입니다</EncouragementMessage>
        <EncouragementList>
          <EncouragementItem>적절한 치료와 전략으로 큰 개선이 가능합니다</EncouragementItem>
          <EncouragementItem>많은 성공한 사람들이 ADHD를 가지고 있습니다</EncouragementItem>
          <EncouragementItem>조기 발견과 관리가 중요합니다</EncouragementItem>
        </EncouragementList>
      </EncouragementCard>

      {/* 상세 점수 - Collapsible */}
      <CollapsibleSection title="상세 점수 보기" icon="📊" defaultOpen={false}>
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

        {/* DSM-5 기준 - 전문가용 정보 */}
        <DSMCriteriaBox>
          <DSMTitle>의학적 기준 분석 결과 (DSM-5)</DSMTitle>
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
      </CollapsibleSection>

      {/* 카테고리별 분석 - Collapsible */}
      {(asrsCategories || wursCategories) && (
        <CollapsibleSection title="카테고리 분석 보기" icon="📈" defaultOpen={false}>
          {asrsCategories && (
            <CategoryAnalysisWrapper>
              <CategoryAnalysis categories={asrsCategories} type="asrs" />
            </CategoryAnalysisWrapper>
          )}

          {wursCategories && (
            <CategoryAnalysisWrapper>
              <CategoryAnalysis categories={wursCategories} type="wurs" />
            </CategoryAnalysisWrapper>
          )}
        </CollapsibleSection>
      )}

      {/* 시각화 차트 - Collapsible */}
      {(asrsCategories || wursCategories) && (
        <CollapsibleSection title="시각화로 보기" icon="📉" defaultOpen={false}>
          {asrsCategories && (
            <ChartWrapper>
              <AsrsRadarChart categoryAnalysis={asrsCategories} />
            </ChartWrapper>
          )}
          {wursCategories && (
            <ChartWrapper>
              <WursBarChart categoryAnalysis={wursCategories} />
            </ChartWrapper>
          )}
        </CollapsibleSection>
      )}

      {/* Secondary CTA - 병원 찾기 재차 강조 */}
      <SecondaryCTASection>
        <Button size="lg" onClick={handleGoToHospital}>
          🏥 병원 찾기
        </Button>
      </SecondaryCTASection>

      {/* Disclaimer - 하단으로 이동 */}
      <DisclaimerBox>
        <DisclaimerIcon>⚠️</DisclaimerIcon>
        <DisclaimerText>
          이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.
          정확한 진단은 정신건강의학과 전문의와 상담하세요.
        </DisclaimerText>
      </DisclaimerBox>

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

/**
 * 긴급도에 따른 아이콘 반환 (지지적이고 따뜻하게)
 */
function getUrgencyIcon(urgency) {
  const icons = {
    high: "🤝", // 함께 (지지)
    moderate: "💡", // 통찰
    low: "🌱", // 성장
  };
  return icons[urgency] || "💚";
}

/**
 * 지지적인 메시지 생성 (문제 중심 → 해결 중심)
 */
function getSupportiveMessage(comprehensive) {
  const messages = {
    high: "ADHD 특성이 관찰됩니다",
    moderate: "ADHD 증상이 일부 나타납니다",
    low: "현재 주요 증상이 관찰되지 않습니다",
  };
  return messages[comprehensive.urgency] || comprehensive.title;
}

/**
 * 간단한 설명 생성 (핵심만 전달)
 */
function getSimpleDescription(comprehensive) {
  const descriptions = {
    high: "여러 영역에서 ADHD 특성이 나타났습니다.\n전문가와 함께 살펴보시면 도움이 됩니다.",
    moderate: "일부 영역에서 주의가 필요합니다.\n추가 평가를 고려해보시는 것을 권장합니다.",
    low: "현재 검사에서는 주요 증상이 관찰되지 않습니다.\n다만 불편함이 있다면 전문가 상담을 고려해보세요.",
  };
  return descriptions[comprehensive.urgency] || comprehensive.message;
}

export default Result;

// Styled Components

// Fade-in animation
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

// Subtle pulse animation for CTA
const subtlePulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background.secondary} 0%,
    ${({ theme }) => theme.colors.background.primary} 30%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.md};
  }
`;

// Hero Section
const HeroSection = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]} 0;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 500ms ease-out;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  }
`;

const HeroIcon = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

// Core Result Card
const CoreResultCard = styled.div`
  background: ${({ urgency, theme }) => {
    if (urgency === "high") return "#FFF5E8"; // 연한 살구색
    if (urgency === "moderate") return "#FFF9F0";
    return theme.colors.background.tertiary;
  }};
  border: 4px solid
    ${({ urgency, theme }) => {
      if (urgency === "high") return theme.colors.warning; // #FFB347
      if (urgency === "moderate") return theme.colors.accent;
      return theme.colors.primary;
    }};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  text-align: center;
  animation: ${fadeIn} 600ms ease-out 200ms both;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing["2xl"]};
  }
`;

const ResultIcon = styled.div`
  font-size: 72px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ResultTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const ResultMessage = styled.div`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const ResultDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  white-space: pre-line;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

// Primary CTA Section
const PrimaryCTASection = styled.section`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  text-align: center;
  animation: ${fadeIn} 700ms ease-out 400ms both;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing["2xl"]};
  }
`;

const CTAIcon = styled.div`
  font-size: 56px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CTATitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const CTAMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const PrimaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing["2xl"]};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.base};
  box-shadow: ${({ theme }) => theme.shadow.md};
  min-height: 60px;
  animation: ${subtlePulse} 1.5s ease-in-out infinite;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const SecondaryLink = styled.button`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  font-size: ${({ theme }) => theme.fontSize.base};
  cursor: pointer;
  text-decoration: underline;
  transition: color ${({ theme }) => theme.transition.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Encouragement Card
const EncouragementCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 800ms ease-out 600ms both;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const EncouragementIcon = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EncouragementTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const EncouragementMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const EncouragementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EncouragementItem = styled.li`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  padding-left: ${({ theme }) => theme.spacing.xl};
  position: relative;

  &:before {
    content: "✓";
    position: absolute;
    left: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

// Score Grid
const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ScoreCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  text-align: center;
  transition: all ${({ theme }) => theme.transition.base};

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
    if (level === "high" || level === "severe") return theme.colors.warning;
    if (level === "moderate" || level === "significant")
      return theme.colors.accent;
    return theme.colors.primary;
  }};
  font-weight: 500;
`;

// Subtype
const SubtypeBox = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-top: ${({ theme }) => theme.spacing.xl};
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
  flex-wrap: wrap;
`;

const SubtypeScoreItem = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// DSM Criteria
const DSMCriteriaBox = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const DSMTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const DSMGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DSMItem = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid
    ${({ met, theme }) => (met ? theme.colors.primary : theme.colors.border.medium)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
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

// Category Analysis & Chart Wrappers
const CategoryAnalysisWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ChartWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// Secondary CTA
const SecondaryCTASection = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
`;

// Disclaimer
const DisclaimerBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.8;
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

// Bottom Button
const BottomButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

// Loading
const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

