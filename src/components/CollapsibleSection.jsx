import { useState } from "react";
import styled from "styled-components";

/**
 * 접힘/펼침 가능한 섹션 컴포넌트
 * Progressive Disclosure 패턴 구현
 */
function CollapsibleSection({ title, defaultOpen = false, children, icon = "" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Header onClick={toggleOpen} isOpen={isOpen}>
        <TitleWrapper>
          {icon && <Icon>{icon}</Icon>}
          <Title>{title}</Title>
        </TitleWrapper>
        <ToggleIcon isOpen={isOpen}>▼</ToggleIcon>
      </Header>
      <Content isOpen={isOpen}>
        <ContentInner>{children}</ContentInner>
      </Content>
    </Container>
  );
}

export default CollapsibleSection;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme, isOpen }) =>
    isOpen ? theme.colors.primaryLight : theme.colors.background.primary};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Icon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  text-align: left;
`;

const ToggleIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.primary};
  transition: transform ${({ theme }) => theme.transition.base};
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const Content = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "10000px" : "0")};
  overflow: hidden;
  transition: max-height ${({ theme }) => theme.transition.base};
`;

const ContentInner = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  padding-top: 0;
`;


