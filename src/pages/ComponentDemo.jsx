import styled from "styled-components";
import Button from "@components/Button";

/**
 * 컴포넌트 데모 페이지
 * 개발 중 컴포넌트를 쉽게 테스트하기 위한 페이지
 */
function ComponentDemo() {
  return (
    <Container>
      <Title>🎨 컴포넌트 데모</Title>

      {/* Button 컴포넌트 */}
      <Section>
        <SectionTitle>Button 컴포넌트</SectionTitle>

        <SubSection>
          <Label>기본 버튼 (Primary)</Label>
          <ButtonGroup>
            <Button size="sm">작은 버튼</Button>
            <Button size="md">중간 버튼</Button>
            <Button size="lg">큰 버튼</Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>보조 버튼 (Secondary)</Label>
          <ButtonGroup>
            <Button variant="secondary" size="sm">
              작은 버튼
            </Button>
            <Button variant="secondary" size="md">
              중간 버튼
            </Button>
            <Button variant="secondary" size="lg">
              큰 버튼
            </Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>아웃라인 버튼 (Outline)</Label>
          <ButtonGroup>
            <Button variant="outline" size="sm">
              작은 버튼
            </Button>
            <Button variant="outline" size="md">
              중간 버튼
            </Button>
            <Button variant="outline" size="lg">
              큰 버튼
            </Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>전체 너비 버튼</Label>
          <Button fullWidth>전체 너비 버튼</Button>
          <Button variant="secondary" fullWidth>
            전체 너비 보조 버튼
          </Button>
        </SubSection>

        <SubSection>
          <Label>비활성화 상태</Label>
          <ButtonGroup>
            <Button disabled>비활성화</Button>
            <Button variant="secondary" disabled>
              비활성화
            </Button>
            <Button variant="outline" disabled>
              비활성화
            </Button>
          </ButtonGroup>
        </SubSection>
      </Section>

      {/* 여기에 다른 컴포넌트들 추가 예정 */}
    </Container>
  );
}

export default ComponentDemo;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.background.secondary};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["4xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  text-align: center;
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
`;

const SubSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

