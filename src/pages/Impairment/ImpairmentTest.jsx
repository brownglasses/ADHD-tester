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
  IMPAIRMENT_QUESTIONS,
  IMPAIRMENT_OPTIONS,
  IMPAIRMENT_INSTRUCTION,
} from "@constants/asrsQuestions";
import useTestStore from "@store/useTestStore";

/**
 * 기능 저하 평가 테스트 페이지
 * ASRS 이후 실제 삶의 어려움 평가 (3문항)
 */
function ImpairmentTest() {
  const navigate = useNavigate();

  // 현재 질문 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 답변 저장 {questionId: value}
  const [answers, setAnswers] = useState({});

  // 애니메이션 상태
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(null);

  // 전체 검사 단계 (MiniStepper용)
  const testSteps = [
    { label: "ASRS 증상", description: "18문항 완료" },
    { label: "기능 저하", description: "3문항 진행중" },
    { label: "WURS 아동기", description: "25문항 대기" },
    { label: "결과 확인", description: "종합 분석" },
  ];

  const currentQuestion = IMPAIRMENT_QUESTIONS[currentIndex];
  const totalQuestions = IMPAIRMENT_QUESTIONS.length;
  const hasAnswer = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  // 다음 질문 (애니메이션용)
  const nextQuestion = nextIndex !== null ? IMPAIRMENT_QUESTIONS[nextIndex] : null;

  // 답변 선택
  const handleAnswerSelect = (value) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(newAnswers);

    // 답변 선택 후 자동으로 다음 질문으로 이동 (400ms 딜레이)
    setTimeout(() => {
      if (isLastQuestion) {
        // 마지막 질문: Store에 저장 후 완료 페이지로
        const { saveImpairmentAnswers } = useTestStore.getState();
        saveImpairmentAnswers(newAnswers);
        console.log("✅ 기능 저하 저장 완료:", newAnswers);
        navigate(ROUTES.IMPAIRMENT_COMPLETE);
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
    if (currentIndex === 0) {
      // 첫 문항이면 ASRS 마지막으로 돌아가기
      const confirmed = window.confirm(
        "이전 단계(ASRS)로 돌아가시겠습니까?"
      );
      if (confirmed) {
        navigate(ROUTES.ASRS_TEST);
      }
      return;
    }

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
    // 이미 handleAnswerSelect에서 저장했으므로 여기서는 이동만
    console.log("=== 기능 저하 평가 완료 ===");
    navigate(ROUTES.IMPAIRMENT_COMPLETE);
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

  const canGoPrevious = currentIndex > 0;

  return (
    <Container>
      <ContentWrapper>
        {/* 헤더 */}
        <Header>
          <ExitButton onClick={handleExit}>← 나가기</ExitButton>
          <MiniStepper
            currentStep={1}
            steps={testSteps}
            label="기능 저하 평가 진행 중"
          />
        </Header>

        {/* 전체 진행 바 */}
        <ProgressBar
          current={currentIndex + 1}
          total={totalQuestions}
          variant="primary"
          size="md"
          labelFormat="fraction"
        />

        {/* 단계 표시 */}
        <StageBadge>
          기능 저하 평가
          <StageProgress>
            ({currentIndex + 1}/{totalQuestions})
          </StageProgress>
        </StageBadge>

        {/* 지시문 (첫 질문에만 표시) */}
        {currentIndex === 0 && (
          <InstructionCard padding="lg">
            <InstructionIcon>📊</InstructionIcon>
            <InstructionText>{IMPAIRMENT_INSTRUCTION}</InstructionText>
          </InstructionCard>
        )}

        {/* 질문 카드 (애니메이션) */}
        <QuestionCardContainer>
          {/* 현재 질문 카드 (슬라이드 아웃) */}
          <QuestionCard padding="xl" $isExiting={isTransitioning}>
            {/* 질문 번호 및 카테고리 */}
            <QuestionHeader>
              <QuestionNumber>Q{currentQuestion.id}</QuestionNumber>
              <CategoryBadge>
                {currentQuestion.category}
              </CategoryBadge>
            </QuestionHeader>

            {/* 질문 내용 */}
            <QuestionText>{currentQuestion.question}</QuestionText>

            {/* 안내 메시지 */}
            <HintBox>
              <HintIcon>💡</HintIcon>
              <HintText>
                "지속적으로" 발생하는 어려움에 대해 답변해 주세요.
                <br />
                일시적이거나 가끔 있는 어려움은 "아니오"를 선택하세요.
              </HintText>
            </HintBox>

            {/* 답변 옵션 */}
            <AnswerSection>
              <RadioGroup>
                {IMPAIRMENT_OPTIONS.map((option) => (
                  <RadioOption
                    key={option.value}
                    name={`question-${currentQuestion.id}`}
                    value={option.value}
                    label={option.label}
                    currentValue={answers[currentQuestion.id]}
                    onChange={handleAnswerSelect}
                    disabled={false}
                  />
                ))}
              </RadioGroup>
            </AnswerSection>

            {/* 네비게이션 버튼 */}
            <ButtonGroup>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={!canGoPrevious || isTransitioning}
              >
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={!hasAnswer || isTransitioning}
              >
                {isLastQuestion ? "완료" : "다음"}
              </Button>
            </ButtonGroup>
          </QuestionCard>

          {/* 다음 질문 카드 (슬라이드 인) - 애니메이션용 */}
          {isTransitioning && nextQuestion && (
            <QuestionCard padding="xl" $isEntering={true}>
              {/* 질문 번호 및 카테고리 */}
              <QuestionHeader>
                <QuestionNumber>Q{nextQuestion.id}</QuestionNumber>
                <CategoryBadge>
                  {nextQuestion.category}
                </CategoryBadge>
              </QuestionHeader>

              {/* 질문 내용 */}
              <QuestionText>{nextQuestion.question}</QuestionText>

              {/* 안내 메시지 */}
              <HintBox>
                <HintIcon>💡</HintIcon>
                <HintText>
                  "지속적으로" 발생하는 어려움에 대해 답변해 주세요.
                </HintText>
              </HintBox>

              {/* 답변 옵션 */}
              <AnswerSection>
                <RadioGroup>
                  {IMPAIRMENT_OPTIONS.map((option) => (
                    <RadioOption
                      key={option.value}
                      name={`question-${nextQuestion.id}`}
                      value={option.value}
                      label={option.label}
                      currentValue={answers[nextQuestion.id]}
                      onChange={() => {}}
                      disabled={true}
                    />
                  ))}
                </RadioGroup>
              </AnswerSection>

              {/* 네비게이션 버튼 */}
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
        <Hint>
          💡 힌트: 정답은 없습니다. 지속적으로 발생하는 어려움에 대해 솔직하게 답변해 주세요.
        </Hint>
      </ContentWrapper>
    </Container>
  );
}

export default ImpairmentTest;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
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

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
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

const QuestionCardContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 700px;
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
  
  ${({ $isExiting }) =>
    $isExiting &&
    `
    animation: slideOutToLeft 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
  
  ${({ $isEntering }) =>
    $isEntering &&
    `
    animation: slideInFromRight 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `}
  
  @keyframes slideOutToLeft {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
  
  @keyframes slideInFromRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const QuestionNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const CategoryBadge = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const QuestionText = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const HintBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HintIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  flex-shrink: 0;
`;

const HintText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

const AnswerSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  ${RadioGroup} {
    max-width: 400px;
    width: 100%;
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
