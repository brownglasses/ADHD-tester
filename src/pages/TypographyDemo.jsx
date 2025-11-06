import styled from "styled-components";

/**
 * Pretendard 폰트 데모 페이지
 * 다양한 굵기와 크기를 시각적으로 확인
 */
function TypographyDemo() {
  const sampleText = "Pretendard 폰트 적용 테스트";
  const sampleParagraph = "ADHD 스크리너는 사용자의 첫걸음을 돕는 신뢰할 수 있는 도구입니다. 검증된 ASRS, WURS 척도를 기반으로 전문적이면서도 친근한 경험을 제공합니다.";

  return (
    <Container>
      <Header>
        <Title>📝 Pretendard 타이포그래피</Title>
        <Subtitle>한글 가독성에 최적화된 서체</Subtitle>
      </Header>

      {/* 폰트 굵기 */}
      <Section>
        <SectionTitle>폰트 굵기 (Font Weight)</SectionTitle>
        
        <WeightDemo weight="100">
          <WeightLabel>Thin (100)</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="200">
          <WeightLabel>ExtraLight (200)</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="300">
          <WeightLabel>Light (300)</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="400">
          <WeightLabel>Regular (400) ⭐ 본문</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="500">
          <WeightLabel>Medium (500)</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="600">
          <WeightLabel>SemiBold (600) ⭐ 소제목</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="700">
          <WeightLabel>Bold (700) ⭐ 제목</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="800">
          <WeightLabel>ExtraBold (800)</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>

        <WeightDemo weight="900">
          <WeightLabel>Black (900)</WeightLabel>
          <WeightText>{sampleText}</WeightText>
        </WeightDemo>
      </Section>

      {/* 폰트 크기 */}
      <Section>
        <SectionTitle>폰트 크기 스케일</SectionTitle>

        <SizeDemo>
          <SizeText size="4xl">제목 1 (4xl / 36px)</SizeText>
          <SizeInfo>페이지 타이틀, 랜딩 헤드라인</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="3xl">제목 2 (3xl / 30px)</SizeText>
          <SizeInfo>주요 섹션 제목</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="2xl">제목 3 (2xl / 24px)</SizeText>
          <SizeInfo>하위 섹션 제목</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="xl">소제목 (xl / 20px)</SizeText>
          <SizeInfo>카드 제목, 강조 텍스트</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="lg">강조 텍스트 (lg / 18px)</SizeText>
          <SizeInfo>인트로 문구, 중요 설명</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="base">본문 텍스트 (base / 16px)</SizeText>
          <SizeInfo>기본 본문, 설명문</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="sm">보조 텍스트 (sm / 14px)</SizeText>
          <SizeInfo>캡션, 부가 정보</SizeInfo>
        </SizeDemo>

        <SizeDemo>
          <SizeText size="xs">작은 텍스트 (xs / 12px)</SizeText>
          <SizeInfo>각주, 법적 고지</SizeInfo>
        </SizeDemo>
      </Section>

      {/* 실제 사용 예시 */}
      <Section>
        <SectionTitle>실제 사용 예시</SectionTitle>

        <UsageExample>
          <ExampleTitle>ADHD 자가진단 스크리닝</ExampleTitle>
          <ExampleSubtitle>첫걸음을 돕는 신뢰할 수 있는 도구</ExampleSubtitle>
          <ExampleBody>
            {sampleParagraph}
          </ExampleBody>
          <ExampleCaption>
            * 이 검사는 선별 도구이며, 의학적 진단을 대체할 수 없습니다.
          </ExampleCaption>
        </UsageExample>
      </Section>

      {/* 한글-영문 조화 */}
      <Section>
        <SectionTitle>한글-영문 조화 테스트</SectionTitle>
        <MixedText>
          <MixedLine>ADHD (Attention Deficit Hyperactivity Disorder) 주의력결핍 과잉행동장애</MixedLine>
          <MixedLine>ASRS (Adult ADHD Self-Report Scale) 성인 ADHD 자가보고 척도</MixedLine>
          <MixedLine>WURS (Wender Utah Rating Scale) 웬더 유타 평가 척도</MixedLine>
          <MixedLine>CPT (Continuous Performance Test) 지속 수행 검사</MixedLine>
        </MixedText>
      </Section>
    </Container>
  );
}

export default TypographyDemo;

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.background.secondary};
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["4xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
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
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const WeightDemo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WeightLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  min-width: 200px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const WeightText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ weight }) => weight};
  flex: 1;
`;

const SizeDemo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  padding-left: ${({ theme }) => theme.spacing.lg};
`;

const SizeText = styled.div`
  font-size: ${({ theme, size }) => theme.fontSize[size]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SizeInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const UsageExample = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const ExampleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ExampleSubtitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ExampleBody = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const ExampleCaption = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.disabled};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const MixedText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MixedLine = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

