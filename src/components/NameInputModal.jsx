import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "@components/Button";

/**
 * 이름 입력 모달
 * Result 페이지 진입 시 사용자 이름을 입력받아 개인화된 결과 제공
 */
function NameInputModal({ isOpen, onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("이름을 입력해주세요 😊");
      return;
    }

    if (name.trim().length < 2) {
      setError("이름은 2글자 이상 입력해주세요");
      return;
    }

    onSubmit(name.trim());
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalContent>
          <Emoji>👋</Emoji>
          <Title>잠깐만요!</Title>
          <Description>
            결과를 보여드리기 전에,
            <br />
            어떻게 불러드리면 될까요?
          </Description>

          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="이름 또는 닉네임을 입력해주세요"
                autoFocus
                maxLength={20}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </InputWrapper>

            <ButtonWrapper>
              <Button type="submit" size="lg" disabled={!name.trim()}>
                결과 보러가기 ✨
              </Button>
            </ButtonWrapper>
          </Form>

          <HelpText>
            💡 입력하신 이름은 이 페이지에서만 사용되며 저장되지 않아요
          </HelpText>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
}

export default NameInputModal;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${fadeIn} 300ms ease-out;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadow.xl};
  max-width: 500px;
  width: 100%;
  animation: ${slideUp} 400ms ease-out;
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing["3xl"]};
  text-align: center;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing["2xl"]};
  }
`;

const Emoji = styled.div`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing["2xl"]};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const Form = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSize.lg};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  transition: all ${({ theme }) => theme.transition.base};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.base};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ButtonWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HelpText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;


