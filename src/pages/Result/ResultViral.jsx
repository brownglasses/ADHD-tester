import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";
import NameInputModal from "@components/NameInputModal";
import { calculateAllScores } from "@utils/scoring";
import { ROUTES } from "@constants/routes";
import useTestStore from "@store/useTestStore";
import { generateResultPDF } from "@utils/pdfGenerator";

/**
 * 바이럴 스타일 결과 페이지
 * - 개인화된 스토리텔링
 * - 친근하고 부드러운 톤
 * - 공감과 인사이트 중심
 */
function ResultViral() {
  const navigate = useNavigate();
  const asrsStore = useTestStore((state) => state.asrs);
  const impairmentStore = useTestStore((state) => state.impairment);
  const wursStore = useTestStore((state) => state.wurs);

  const [showNameModal, setShowNameModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [result, setResult] = useState(null);
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
    setLoading(false);
  }, [asrsStore.answers, impairmentStore.answers, wursStore.answers, navigate]);

  const handleNameSubmit = (name) => {
    setUserName(name);
    setShowNameModal(false);
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    generateResultPDF(result, {
      name: userName || "익명",
      date: new Date(),
    });
  };

  const handleGoToHospital = () => {
    navigate(ROUTES.HOSPITAL);
  };

  if (loading || !result) {
    return (
      <Container>
        <LoadingMessage>✨ 결과를 분석하고 있어요...</LoadingMessage>
      </Container>
    );
  }

  const { asrs, impairment, wurs, comprehensive } = result;
  const hasHighSymptoms = comprehensive.urgency === "high";
  const hasModerateSymptoms = comprehensive.urgency === "moderate";

  return (
    <>
      <NameInputModal isOpen={showNameModal} onSubmit={handleNameSubmit} />
      
      <Container>
        {/* 1. 개인화된 인트로 */}
        <IntroSection>
          <IntroEmoji>💭</IntroEmoji>
          <IntroTitle>
            {userName}님,<br />
            혹시 이런 적 있으셨나요?
          </IntroTitle>
          <IntroQuestions>
            <Question>📌 중요한 일을 자꾸 까먹는다</Question>
            <Question>⏰ 마감이 임박해야 일을 시작한다</Question>
            <Question>💬 대화 중 딴생각이 자주 든다</Question>
            <Question>🎯 시작한 일을 끝까지 완수하기 어렵다</Question>
          </IntroQuestions>
          <IntroMessage>
            이런 경험들, 단순히 "의지가 약해서"가 아닐 수 있어요
          </IntroMessage>
        </IntroSection>

        {/* 2. 데이터 분석 결과 - 스토리텔링 */}
        <StorySection>
          <SectionTitle>📊 {userName}님의 이야기</SectionTitle>
          
          <StoryCard highlight={hasHighSymptoms || hasModerateSymptoms}>
            <CardEmoji>{hasHighSymptoms ? "🎯" : hasModerateSymptoms ? "💡" : "🌱"}</CardEmoji>
            <CardTitle>
              {hasHighSymptoms && `${userName}님, 지금 많이 힘드시죠?`}
              {hasModerateSymptoms && `${userName}님, 이런 상황이 익숙하신가요?`}
              {!hasHighSymptoms && !hasModerateSymptoms && `${userName}님은 잘 관리하고 계세요!`}
            </CardTitle>
            <CardContent>
              {hasHighSymptoms && (
                <>
                  오늘 검사 결과, {userName}님은 여러 영역에서 ADHD 특성이 나타났어요.
                  <br /><br />
                  <HighlightText>
                    • ASRS 점수: {asrs.totalScore}점 / 72점 중<br />
                    • 일상 기능 저하: {impairment.yesCount}개 영역<br />
                    • 아동기 증상: {wurs.totalScore > 46 ? "관찰됨" : "일부 나타남"}
                  </HighlightText>
                  <br />
                  이 수치들이 말해주는 건, {userName}님이 겪어온 어려움이<br />
                  <Strong>"노력 부족"이 아니라 "뇌의 특성"</Strong>일 가능성이 높다는 거예요.
                </>
              )}
              {hasModerateSymptoms && (
                <>
                  {userName}님의 검사 결과를 보니, 일부 영역에서 ADHD 특성이 보이네요.
                  <br /><br />
                  <HighlightText>
                    • ASRS 점수: {asrs.totalScore}점<br />
                    • 일상 기능: {impairment.yesCount}개 영역에서 영향<br />
                    • 아동기부터: {wurs.totalScore > 46 ? "증상 있음" : "일부 증상"}
                  </HighlightText>
                  <br />
                  완벽하게 딱 떨어지진 않지만, 주의 깊게 살펴볼 필요가 있어요.
                </>
              )}
              {!hasHighSymptoms && !hasModerateSymptoms && (
                <>
                  좋은 소식이에요! 현재 {userName}님은 주요 ADHD 증상이 관찰되지 않았어요.
                  <br /><br />
                  하지만 일상에서 불편함을 느끼신다면, 그것도 충분히 중요해요.
                </>
              )}
            </CardContent>
          </StoryCard>

          {/* 세부 분석 - Collapsible */}
          <DetailToggle>
            <ToggleButton onClick={() => {
              const detail = document.getElementById("detail-section");
              detail.style.display = detail.style.display === "none" ? "block" : "none";
            }}>
              📈 세부 점수 자세히 보기
            </ToggleButton>
          </DetailToggle>

          <DetailSection id="detail-section" style={{ display: "none" }}>
            <DetailGrid>
              <DetailCard>
                <DetailEmoji>🎯</DetailEmoji>
                <DetailTitle>현재 증상</DetailTitle>
                <DetailScore>{asrs.totalScore} / 72점</DetailScore>
                <DetailDescription>{asrs.riskLevel}</DetailDescription>
              </DetailCard>
              <DetailCard>
                <DetailEmoji>💼</DetailEmoji>
                <DetailTitle>일상 영향</DetailTitle>
                <DetailScore>{impairment.yesCount} / 3개</DetailScore>
                <DetailDescription>{impairment.description}</DetailDescription>
              </DetailCard>
              <DetailCard>
                <DetailEmoji>👶</DetailEmoji>
                <DetailTitle>아동기 증상</DetailTitle>
                <DetailScore>{wurs.totalScore} / 100점</DetailScore>
                <DetailDescription>{wurs.description}</DetailDescription>
              </DetailCard>
            </DetailGrid>
          </DetailSection>
        </StorySection>

        {/* 3. 반응형 질문 - 인사이트 도출 */}
        <InsightSection>
          <SectionTitle>🤔 이런 생각 해보셨나요?</SectionTitle>
          
          <InsightCard>
            <InsightQuestion>
              "다른 사람들은 다 잘하는데,<br />
              왜 나만 이렇게 힘들까?"
            </InsightQuestion>
            <InsightAnswer>
              {hasHighSymptoms || hasModerateSymptoms ? (
                <>
                  {userName}님, 그건 {userName}님 탓이 아니에요.<br />
                  ADHD는 <Strong>뇌의 실행 기능</Strong>과 관련된 특성이에요.
                  <br /><br />
                  마치 시력이 나쁜 사람에게 "왜 잘 안 보이냐"고 묻지 않는 것처럼,<br />
                  집중과 실행에 어려움을 겪는 것도 "의지"의 문제가 아니랍니다.
                </>
              ) : (
                <>
                  {userName}님은 지금 잘하고 계세요!<br />
                  하지만 만약 불편함이 있다면, 그것도 충분히 살펴볼 가치가 있어요.
                </>
              )}
            </InsightAnswer>
          </InsightCard>

          <InsightCard>
            <InsightQuestion>
              "이제라도 알게 되면,<br />
              뭐가 달라질까?"
            </InsightQuestion>
            <InsightAnswer>
              정확한 이해는 <Strong>변화의 첫걸음</Strong>이에요.
              <br /><br />
              💊 적절한 치료와 전략으로 삶의 질이 크게 개선될 수 있어요<br />
              🎯 나에게 맞는 방식을 찾으면, 강점을 더 발휘할 수 있어요<br />
              💚 자기 비난에서 벗어나, 자신을 이해하게 돼요
            </InsightAnswer>
          </InsightCard>
        </InsightSection>

        {/* 4. 서비스 가치 제시 - 자연스럽게 */}
        <ValueSection>
          <ValueEmoji>🤝</ValueEmoji>
          <ValueTitle>
            {userName}님의 다음 여정을 함께할게요
          </ValueTitle>
          <ValueMessage>
            ADHD는 혼자 끌어안기엔 너무 무거운 주제예요.<br />
            하지만 적절한 도움을 받으면, 충분히 잘 살아갈 수 있어요.
          </ValueMessage>

          <CTACard>
            <CTATitle>🏥 전문가와 상담하기</CTATitle>
            <CTADescription>
              검사 결과를 전문의와 함께 살펴보고,<br />
              {userName}님에게 맞는 솔루션을 찾아보세요
            </CTADescription>
            <CTAButton>
              <Button size="lg" onClick={handleGoToHospital}>
                병원 찾아보기
              </Button>
            </CTAButton>
          </CTACard>

          <SubActions>
            <SubAction onClick={handleDownloadPDF}>
              📄 결과 PDF로 저장하기
            </SubAction>
            <SubAction onClick={() => navigate(ROUTES.LANDING)}>
              🏠 처음으로 돌아가기
            </SubAction>
          </SubActions>
        </ValueSection>

        {/* 5. 마무리 - 서비스 존재 이유 & 추가 가치 */}
        <FinalSection>
          <FinalCard>
            <FinalTitle>A. 왜 이 서비스를 만들었을까요?</FinalTitle>
            <FinalContent>
              많은 분들이 "나는 왜 이럴까?" 하고 자책하며 살아가요.<br />
              하지만 그 이유를 알게 되면, 자책이 아닌 <Strong>이해와 성장</Strong>으로 나아갈 수 있어요.
              <br /><br />
              우리는 {userName}님 같은 분들이 자신을 더 잘 이해하고,<br />
              필요한 도움을 쉽게 찾을 수 있도록 돕고 싶었어요.
            </FinalContent>
          </FinalCard>

          <FinalCard>
            <FinalTitle>B. 여기서 끝이 아니에요</FinalTitle>
            <FinalContent>
              이 검사는 <Strong>시작점</Strong>일 뿐이에요.<br />
              진짜 변화는 전문가와 함께 당신만의 전략을 찾아갈 때 일어나요.
              <br /><br />
              💚 올바른 진단과 치료<br />
              🎯 자신에게 맞는 생활 전략<br />
              🤝 이해하는 사람들과의 연결
              <br /><br />
              {userName}님의 다음 걸음을 응원할게요!
            </FinalContent>
          </FinalCard>
        </FinalSection>

        <DisclaimerBox>
          ⚠️ 이 결과는 선별 검사로, 의학적 진단이 아니에요. 정확한 진단은 전문의와 상담해주세요.
        </DisclaimerBox>
      </Container>
    </>
  );
}

export default ResultViral;

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
  padding: ${({ theme }) => theme.spacing["2xl"]} ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

// Intro Section
const IntroSection = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 600ms ease-out;
`;

const IntroEmoji = styled.div`
  font-size: 56px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const IntroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize["2xl"]};
  }
`;

const IntroQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  text-align: left;
`;

const Question = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
`;

const IntroMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  margin: 0;
`;

// Story Section
const StorySection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 700ms ease-out 200ms both;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StoryCard = styled.div`
  background: ${({ highlight, theme }) =>
    highlight ? "#FFF5E8" : theme.colors.background.primary};
  border: 3px solid
    ${({ highlight, theme }) =>
      highlight ? theme.colors.accent : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const CardEmoji = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const CardContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  text-align: center;
`;

const HighlightText = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: left;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const Strong = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

// Detail Section
const DetailToggle = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ToggleButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DetailSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DetailCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const DetailEmoji = styled.div`
  font-size: 36px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DetailTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DetailScore = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DetailDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Insight Section
const InsightSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 800ms ease-out 400ms both;
`;

const InsightCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const InsightQuestion = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  line-height: 1.6;
`;

const InsightAnswer = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  text-align: center;
`;

// Value Section
const ValueSection = styled.section`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 900ms ease-out 600ms both;
`;

const ValueEmoji = styled.div`
  font-size: 56px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ValueTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const ValueMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
`;

const CTACard = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CTATitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const CTADescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

const CTAButton = styled.div`
  display: flex;
  justify-content: center;
`;

const SubActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const SubAction = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  text-decoration: underline;
  transition: color ${({ theme }) => theme.transition.base};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// Final Section
const FinalSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
  animation: ${fadeIn} 1000ms ease-out 800ms both;
`;

const FinalCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FinalTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const FinalContent = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
`;

// Disclaimer
const DisclaimerBox = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0.8;
`;

// Loading
const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;


