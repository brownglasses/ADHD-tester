import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { RadioGroup, RadioOption } from "@components/RadioGroup";
import ProgressBar from "@components/ProgressBar";
import MiniStepper from "@components/MiniStepper";
import { ROUTES } from "@constants/routes";
import {
  ASRS_SYMPTOM_QUESTIONS,
  ASRS_IMPAIRMENT_QUESTIONS,
  ASRS_CHILDHOOD_QUESTION,
  ASRS_SYMPTOM_OPTIONS,
  ASRS_IMPAIRMENT_OPTIONS,
  ASRS_CHILDHOOD_OPTIONS,
  ASRS_INSTRUCTIONS,
} from "@constants/asrsQuestions";

/**
 * ASRS 설문 테스트 페이지
 * 3단계 구조로 진행:
 * - 1단계: 증상 선별 질문 (18문항)
 * - 2단계: 기능 저하 평가 (3문항)
 * - 3단계: 아동기 발달력 확인 (1문항)
 */
function AsrsTest() {
  const navigate = useNavigate();

  // 현재 단계 (1, 2, 3)
  const [currentStage, setCurrentStage] = useState(1);
  // 각 단계 내 질문 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 답변 저장
  const [symptomAnswers, setSymptomAnswers] = useState({}); // 1단계
  const [impairmentAnswers, setImpairmentAnswers] = useState({}); // 2단계
  const [childhoodAnswer, setChildhoodAnswer] = useState(null); // 3단계

  // 애니메이션 상태
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextStage, setNextStage] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);

  // 전체 검사 단계 (MiniStepper용)
  const testSteps = [
    { label: "현재 증상", description: "ASRS 설문" },
    { label: "과거 증상", description: "WURS 설문" },
    { label: "결과 확인", description: "종합 분석" },
  ];

  // 현재 단계별 질문 및 답변 가져오기
  const getCurrentQuestions = () => {
    if (currentStage === 1) return ASRS_SYMPTOM_QUESTIONS;
    if (currentStage === 2) return ASRS_IMPAIRMENT_QUESTIONS;
    if (currentStage === 3) return [ASRS_CHILDHOOD_QUESTION];
    return [];
  };

  const getCurrentAnswers = () => {
    if (currentStage === 1) return symptomAnswers;
    if (currentStage === 2) return impairmentAnswers;
    if (currentStage === 3) return { 1: childhoodAnswer };
    return {};
  };

  const getCurrentOptions = () => {
    if (currentStage === 1) return ASRS_SYMPTOM_OPTIONS;
    if (currentStage === 2) return ASRS_IMPAIRMENT_OPTIONS;
    if (currentStage === 3) return ASRS_CHILDHOOD_OPTIONS;
    return [];
  };

  const getCurrentInstruction = () => {
    if (currentStage === 1) return ASRS_INSTRUCTIONS.symptom;
    if (currentStage === 2) return ASRS_INSTRUCTIONS.impairment;
    if (currentStage === 3) return ASRS_INSTRUCTIONS.childhood;
    return "";
  };

  const questions = getCurrentQuestions();
  const answers = getCurrentAnswers();
  const options = getCurrentOptions();
  const instruction = getCurrentInstruction();

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestionInStage = currentIndex === totalQuestions - 1;
  const isLastStage = currentStage === 3;
  const hasAnswer = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null;

  // 전체 진행률 계산 (22문항 기준)
  const getTotalProgress = () => {
    let completed = 0;
    const total = 22; // 18 + 3 + 1

    // 1단계 완료된 질문
    if (currentStage > 1) {
      completed += 18;
    } else {
      completed += Object.keys(symptomAnswers).length;
    }

    // 2단계 완료된 질문
    if (currentStage > 2) {
      completed += 3;
    } else if (currentStage === 2) {
      completed += Object.keys(impairmentAnswers).length;
    }

    // 3단계 완료된 질문
    if (currentStage === 3 && childhoodAnswer !== null) {
      completed += 1;
    }

    return { current: completed, total };
  };

  const { current: totalCurrent, total: totalTotal } = getTotalProgress();

  // 다음 질문 정보 가져오기 (애니메이션용)
  const getNextQuestions = () => {
    if (nextStage === 1) return ASRS_SYMPTOM_QUESTIONS;
    if (nextStage === 2) return ASRS_IMPAIRMENT_QUESTIONS;
    if (nextStage === 3) return [ASRS_CHILDHOOD_QUESTION];
    return [];
  };

  const getNextOptions = () => {
    if (nextStage === 1) return ASRS_SYMPTOM_OPTIONS;
    if (nextStage === 2) return ASRS_IMPAIRMENT_OPTIONS;
    if (nextStage === 3) return ASRS_CHILDHOOD_OPTIONS;
    return [];
  };

  const nextQuestions = isTransitioning ? getNextQuestions() : [];
  const nextOptions = isTransitioning ? getNextOptions() : [];
  const nextQuestion = isTransitioning && nextQuestions[nextIndex] ? nextQuestions[nextIndex] : null;

  // 답변 저장
  const handleAnswerChange = (value) => {
    if (currentStage === 1) {
      setSymptomAnswers({
        ...symptomAnswers,
        [currentQuestion.id]: value,
      });
    } else if (currentStage === 2) {
      setImpairmentAnswers({
        ...impairmentAnswers,
        [currentQuestion.id]: value,
      });
    } else if (currentStage === 3) {
      setChildhoodAnswer(value);
    }
  };

  // 다음 질문 또는 다음 단계
  const handleNext = () => {
    if (!hasAnswer) {
      alert("답변을 선택해 주세요.");
      return;
    }

    if (isLastQuestionInStage) {
      // 현재 단계의 마지막 질문
      if (isLastStage) {
        // 전체 검사 완료
        handleComplete();
        return;
      } else {
        // 다음 단계로 이동
        setNextStage(currentStage + 1);
        setNextIndex(0);
      }
    } else {
      // 같은 단계 내 다음 질문
      setNextStage(currentStage);
      setNextIndex(currentIndex + 1);
    }

    // 애니메이션 시작
    setIsTransitioning(true);

    // 애니메이션 완료 후 실제 상태 업데이트
    setTimeout(() => {
      if (isLastQuestionInStage) {
        if (!isLastStage) {
          setCurrentStage(currentStage + 1);
          setCurrentIndex(0);
        }
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      
      setIsTransitioning(false);
      setNextStage(null);
      setNextIndex(null);
    }, 400);
  };

  // 이전 질문
  const handlePrevious = () => {
    if (currentIndex > 0) {
      // 같은 단계 내 이전 질문
      setNextStage(currentStage);
      setNextIndex(currentIndex - 1);
    } else if (currentStage > 1) {
      // 이전 단계의 마지막 질문으로
      const prevQuestions = currentStage === 2 ? ASRS_SYMPTOM_QUESTIONS : ASRS_IMPAIRMENT_QUESTIONS;
      setNextStage(currentStage - 1);
      setNextIndex(prevQuestions.length - 1);
    }

    // 애니메이션 시작
    setIsTransitioning(true);

    // 애니메이션 완료 후 실제 상태 업데이트
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (currentStage > 1) {
        setCurrentStage(currentStage - 1);
        const prevQuestions = currentStage === 2 ? ASRS_SYMPTOM_QUESTIONS : ASRS_IMPAIRMENT_QUESTIONS;
        setCurrentIndex(prevQuestions.length - 1);
      }
      
      setIsTransitioning(false);
      setNextStage(null);
      setNextIndex(null);
    }, 400);
  };

  // 검사 완료
  const handleComplete = () => {
    // TODO: Zustand store에 저장
    console.log("=== ASRS 검사 완료 ===");
    console.log("1단계 - 증상 선별:", symptomAnswers);
    console.log("2단계 - 기능 저하:", impairmentAnswers);
    console.log("3단계 - 아동기 발달력:", childhoodAnswer);

    alert("ASRS 설문이 완료되었습니다!");
    // TODO: 결과 페이지 또는 다음 단계로 이동
    navigate(ROUTES.LANDING);
  };

  // 나가기 확인
  const handleExit = () => {
    const confirmed = window.confirm(
      "설문을 중단하시겠습니까? 지금까지의 답변은 저장되지 않습니다."
    );
    if (confirmed) {
      navigate(ROUTES.LANDING);
    }
  };

  // 단계별 제목
  const getStageTitle = () => {
    if (currentStage === 1) return "1단계: 증상 선별 질문";
    if (currentStage === 2) return "2단계: 기능 저하 평가";
    if (currentStage === 3) return "3단계: 아동기 발달력 확인";
    return "";
  };

  // 단계별 힌트
  const getStageHint = () => {
    if (currentStage === 1)
      return "💡 힌트: 정답은 없습니다. 최근 6개월 동안의 경험을 솔직하게 답변해 주세요.";
    if (currentStage === 2)
      return "💡 힌트: 증상으로 인해 실제 삶에서 겪는 어려움에 대해 답변해 주세요.";
    if (currentStage === 3)
      return "💡 힌트: 기억이 불확실하다면 '잘 모르겠음'을 선택하셔도 됩니다.";
    return "";
  };

  const canGoPrevious = currentStage > 1 || currentIndex > 0;

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <ExitButton onClick={handleExit}>← 나가기</ExitButton>
          <MiniStepper
            currentStep={0}
            steps={testSteps}
            label="1단계 ASRS 설문 진행 중"
          />
        </Header>

        {/* 전체 진행 바 */}
        <ProgressBar
          current={totalCurrent}
          total={totalTotal}
          variant="primary"
          size="md"
          labelFormat="fraction"
        />

        {/* 단계 표시 */}
        <StageBadge>
          {getStageTitle()}
          <StageProgress>
            ({currentIndex + 1}/{totalQuestions})
          </StageProgress>
        </StageBadge>

        {/* 지시문 (각 단계 첫 질문에만 표시) */}
        {currentIndex === 0 && (
          <InstructionCard padding="lg">
            <InstructionIcon>📌</InstructionIcon>
            <InstructionText>{instruction}</InstructionText>
          </InstructionCard>
        )}

        {/* 질문 카드 컨테이너 (애니메이션용) */}
        <QuestionCardContainer>
          {/* 현재 질문 (슬라이드 아웃) */}
          <QuestionCard 
            padding="xl" 
            $isExiting={isTransitioning}
          >
            <QuestionHeader>
              <QuestionNumber>
                질문 {currentIndex + 1} / {totalQuestions}
              </QuestionNumber>
              {currentQuestion.category && (
                <CategoryBadge>{currentQuestion.category}</CategoryBadge>
              )}
            </QuestionHeader>

            <Question>{currentQuestion.question}</Question>

            <AnswerSection>
              <AnswerLabel>답변을 선택해 주세요</AnswerLabel>
              <RadioGroup
                name={`stage${currentStage}_q${currentQuestion.id}`}
                value={answers[currentQuestion.id]}
                onChange={handleAnswerChange}
                direction="vertical"
                fullWidth
              >
                {options.map((option) => (
                  <RadioOption
                    key={option.value}
                    name={`stage${currentStage}_q${currentQuestion.id}`}
                    value={option.value}
                    currentValue={answers[currentQuestion.id]}
                    onChange={handleAnswerChange}
                    label={option.label}
                    fullWidth
                  />
                ))}
              </RadioGroup>
            </AnswerSection>

            {/* 버튼 그룹 */}
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!canGoPrevious || isTransitioning}
              >
                이전
              </Button>
              <Button onClick={handleNext} disabled={!hasAnswer || isTransitioning}>
                {isLastQuestionInStage && isLastStage
                  ? "완료"
                  : isLastQuestionInStage
                  ? "다음 단계"
                  : "다음"}
              </Button>
            </ButtonGroup>
          </QuestionCard>

          {/* 다음 질문 (슬라이드 인) */}
          {isTransitioning && nextQuestion && (
            <QuestionCard 
              padding="xl" 
              $isEntering={true}
            >
              <QuestionHeader>
                <QuestionNumber>
                  질문 {nextIndex + 1} / {nextQuestions.length}
                </QuestionNumber>
                {nextQuestion.category && (
                  <CategoryBadge>{nextQuestion.category}</CategoryBadge>
                )}
              </QuestionHeader>

              <Question>{nextQuestion.question}</Question>

              <AnswerSection>
                <AnswerLabel>답변을 선택해 주세요</AnswerLabel>
                <RadioGroup
                  name={`stage${nextStage}_q${nextQuestion.id}`}
                  value={undefined}
                  onChange={() => {}}
                  direction="vertical"
                  fullWidth
                >
                  {nextOptions.map((option) => (
                    <RadioOption
                      key={option.value}
                      name={`stage${nextStage}_q${nextQuestion.id}`}
                      value={option.value}
                      currentValue={undefined}
                      onChange={() => {}}
                      label={option.label}
                      fullWidth
                      disabled
                    />
                  ))}
                </RadioGroup>
              </AnswerSection>

              <ButtonGroup>
                <Button variant="outline" disabled>
                  이전
                </Button>
                <Button disabled>다음</Button>
              </ButtonGroup>
            </QuestionCard>
          )}
        </QuestionCardContainer>

        {/* 힌트 */}
        <Hint>{getStageHint()}</Hint>
      </ContentWrapper>
    </Container>
  );
}

export default AsrsTest;

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
  overflow: hidden; /* 슬라이드 애니메이션 시 카드가 화면 밖으로 나가면서 잘림 */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
`;

const ExitButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transition.fast};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const StageBadge = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StageProgress = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  opacity: 0.8;
`;

const InstructionCard = styled(Card)`
  background: ${({ theme }) => theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InstructionIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InstructionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.8;
  margin: 0;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

/* 질문 카드 컨테이너 (두 카드를 겹치게 배치) */
const QuestionCardContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 750px; /* 카드 높이 충분히 확보 */
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 650px;
  }
`;

const QuestionCard = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  
  /* 슬라이드 아웃 (왼쪽으로) */
  ${({ $isExiting }) =>
    $isExiting &&
    `
    animation: slideOutToLeft 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
  
  /* 슬라이드 인 (오른쪽에서) */
  ${({ $isEntering }) =>
    $isEntering &&
    `
    animation: slideInFromRight 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
  
  @keyframes slideOutToLeft {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
  
  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* 성능 최적화 */
  @media (prefers-reduced-motion: no-preference) {
    will-change: transform, opacity;
  }
  
  /* 접근성: 애니메이션 줄이기 선호 시 */
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: opacity 150ms ease;
    
    ${({ $isExiting }) =>
      $isExiting &&
      `
      opacity: 0;
    `}
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const QuestionNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const CategoryBadge = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

const Question = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const AnswerSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const AnswerLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Hint = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
`;
