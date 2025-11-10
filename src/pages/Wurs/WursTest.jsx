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
  WURS_QUESTIONS,
  WURS_OPTIONS,
  WURS_INSTRUCTION,
  WURS_HINT,
} from "@constants/wursQuestions";
import useTestStore from "@store/useTestStore";

/**
 * WURS 설문 테스트 페이지
 * 아동기(7-10세) ADHD 증상 회상 검사
 * - 총 25문항
 * - 5점 척도 (0-4점)
 */
function WursTest() {
  const navigate = useNavigate();

  // 현재 질문 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 답변 저장 (questionId: value)
  const [answers, setAnswers] = useState({});

  // 애니메이션 상태
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(null);

  // 전체 검사 단계 (MiniStepper용)
  const testSteps = [
    { label: "현재 증상", description: "ASRS 완료" },
    { label: "과거 증상", description: "WURS 설문" },
    { label: "결과 확인", description: "종합 분석" },
  ];

  const currentQuestion = WURS_QUESTIONS[currentIndex];
  const totalQuestions = WURS_QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasAnswer = answers[currentQuestion.id] !== undefined;
  const canGoPrevious = currentIndex > 0;

  // 답변 저장
  const handleAnswerChange = (value) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(newAnswers);

    // 답변 선택 후 자동으로 다음 질문으로 이동 (400ms 딜레이)
    setTimeout(() => {
      if (isLastQuestion) {
        // 마지막 질문: Store에 저장 후 완료 페이지로
        const { saveWursAnswers } = useTestStore.getState();
        saveWursAnswers(newAnswers);
        console.log("✅ WURS 저장 완료:", newAnswers);
        navigate(ROUTES.WURS_COMPLETE);
      } else {
        setNextIndex(currentIndex + 1);
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setIsTransitioning(false);
          setNextIndex(null);
        }, 400);
      }
    }, 400);
  };

  // 다음 질문
  const handleNext = () => {
    if (!hasAnswer) {
      alert("답변을 선택해 주세요.");
      return;
    }

    if (isLastQuestion) {
      // 검사 완료
      handleComplete();
      return;
    }

    // 다음 질문으로 이동
    setNextIndex(currentIndex + 1);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setIsTransitioning(false);
      setNextIndex(null);
    }, 400);
  };

  // 이전 질문
  const handlePrevious = () => {
    if (!canGoPrevious) return;

    setNextIndex(currentIndex - 1);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setIsTransitioning(false);
      setNextIndex(null);
    }, 400);
  };

  // 검사 완료
  const handleComplete = () => {
    // 이미 handleAnswerChange에서 저장했으므로 여기서는 이동만
    console.log("=== WURS 검사 완료 ===");
    navigate(ROUTES.WURS_COMPLETE);
  };

  // 점수 계산
  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  // 나가기
  const handleExit = () => {
    if (window.confirm("검사를 중단하시겠습니까? 진행 상황이 저장되지 않습니다.")) {
      navigate(ROUTES.LANDING);
    }
  };

  // 다음 질문 데이터 (애니메이션용)
  const nextQuestion = isTransitioning && WURS_QUESTIONS[nextIndex]
    ? WURS_QUESTIONS[nextIndex]
    : null;

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <ExitButton onClick={handleExit}>← 나가기</ExitButton>
          <MiniStepper
            currentStep={1}
            steps={testSteps}
            label="2단계 WURS 설문 진행 중"
          />
        </Header>

        {/* 진행 바 */}
        <ProgressBar
          current={Object.keys(answers).length}
          total={totalQuestions}
          variant="primary"
          size="md"
          labelFormat="fraction"
        />

        {/* 배지 */}
        <StageBadge>
          아동기 증상 회상
          <StageProgress>
            ({currentIndex + 1}/{totalQuestions})
          </StageProgress>
        </StageBadge>

        {/* 지시문 (첫 질문에만 표시) */}
        {currentIndex === 0 && (
          <InstructionCard padding="lg">
            <InstructionIcon>📌</InstructionIcon>
            <InstructionText>{WURS_INSTRUCTION}</InstructionText>
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
              <AnswerLabel>7-10세 시절을 떠올리며 선택해 주세요</AnswerLabel>
              <RadioGroup
                name={`wurs_q${currentQuestion.id}`}
                value={answers[currentQuestion.id]}
                onChange={handleAnswerChange}
                direction="vertical"
                fullWidth
              >
                {WURS_OPTIONS.map((option) => (
                  <RadioOption
                    key={option.value}
                    name={`wurs_q${currentQuestion.id}`}
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
                {isLastQuestion ? "완료" : "다음"}
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
                  질문 {nextIndex + 1} / {totalQuestions}
                </QuestionNumber>
                {nextQuestion.category && (
                  <CategoryBadge>{nextQuestion.category}</CategoryBadge>
                )}
              </QuestionHeader>

              <Question>{nextQuestion.question}</Question>

              <AnswerSection>
                <AnswerLabel>7-10세 시절을 떠올리며 선택해 주세요</AnswerLabel>
                <RadioGroup
                  name={`wurs_q${nextQuestion.id}`}
                  value={undefined}
                  onChange={() => {}}
                  direction="vertical"
                  fullWidth
                >
                  {WURS_OPTIONS.map((option) => (
                    <RadioOption
                      key={option.value}
                      name={`wurs_q${nextQuestion.id}`}
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
        <Hint>{WURS_HINT}</Hint>
      </ContentWrapper>
    </Container>
  );
}

export default WursTest;

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
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme}) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: stretch;
  }
`;

const ExitButton = styled.button`
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
  min-height: 750px;
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
  
  /* 기본 상태: 정상 위치에 완전히 보임 */
  transform: translateX(0);
  opacity: 1;
  
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

const CategoryBadge = styled.span`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const Question = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const AnswerSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Hint = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  line-height: 1.6;
`;

