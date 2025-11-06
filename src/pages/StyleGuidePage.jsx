import styled from "styled-components";

/**
 * 스타일 가이드 시각화 페이지
 * 모든 컬러, 타이포그래피, 간격 등을 한눈에 확인
 */
function StyleGuidePage() {
  return (
    <Container>
      <Header>
        <Title>🎨 ADHD 스크리너 스타일 가이드</Title>
        <Subtitle>디자인 시스템 시각화</Subtitle>
      </Header>

      {/* 컬러 시스템 */}
      <Section>
        <SectionTitle>컬러 시스템</SectionTitle>

        <SubSection>
          <SubTitle>Primary Colors - Sprout Green (새싹 연두)</SubTitle>
          <ColorGrid>
            <ColorCard color="#C3D9A5">
              <ColorBox color="#C3D9A5" />
              <ColorInfo>
                <ColorName>Primary</ColorName>
                <ColorCode>#C3D9A5</ColorCode>
                <ColorDesc>Sprout Green - 새싹 연두</ColorDesc>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#B0C890">
              <ColorBox color="#B0C890" />
              <ColorInfo>
                <ColorName>Primary Hover</ColorName>
                <ColorCode>#B0C890</ColorCode>
                <ColorDesc>진한 새싹 연두</ColorDesc>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#E8F0DC">
              <ColorBox color="#E8F0DC" />
              <ColorInfo>
                <ColorName>Primary Light</ColorName>
                <ColorCode>#E8F0DC</ColorCode>
                <ColorDesc>연한 새싹 연두</ColorDesc>
              </ColorInfo>
            </ColorCard>
          </ColorGrid>
        </SubSection>

        <SubSection>
          <SubTitle>Accent Colors - Supportive Orange (서포티브 오렌지)</SubTitle>
          <ColorGrid>
            <ColorCard color="#FFDDAA">
              <ColorBox color="#FFDDAA" />
              <ColorInfo>
                <ColorName>Accent</ColorName>
                <ColorCode>#FFDDAA</ColorCode>
                <ColorDesc>Supportive Orange - CTA용</ColorDesc>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#FFD088">
              <ColorBox color="#FFD088" />
              <ColorInfo>
                <ColorName>Accent Hover</ColorName>
                <ColorCode>#FFD088</ColorCode>
                <ColorDesc>진한 서포티브 오렌지</ColorDesc>
              </ColorInfo>
            </ColorCard>
          </ColorGrid>
        </SubSection>

        <SubSection>
          <SubTitle>State Colors (상태 색상)</SubTitle>
          <ColorGrid>
            <ColorCard color="#4CAF50">
              <ColorBox color="#4CAF50" />
              <ColorInfo>
                <ColorName>Success</ColorName>
                <ColorCode>#4CAF50</ColorCode>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#FFC107">
              <ColorBox color="#FFC107" />
              <ColorInfo>
                <ColorName>Warning</ColorName>
                <ColorCode>#FFC107</ColorCode>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#F44336">
              <ColorBox color="#F44336" />
              <ColorInfo>
                <ColorName>Error</ColorName>
                <ColorCode>#F44336</ColorCode>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#2196F3">
              <ColorBox color="#2196F3" />
              <ColorInfo>
                <ColorName>Info</ColorName>
                <ColorCode>#2196F3</ColorCode>
              </ColorInfo>
            </ColorCard>
          </ColorGrid>
        </SubSection>

        <SubSection>
          <SubTitle>Neutral Colors (중립 색상)</SubTitle>
          <ColorGrid>
            <ColorCard color="#4A4A4A">
              <ColorBox color="#4A4A4A" />
              <ColorInfo>
                <ColorName>Charcoal</ColorName>
                <ColorCode>#4A4A4A</ColorCode>
                <ColorDesc>기본 텍스트</ColorDesc>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#A1A1A1">
              <ColorBox color="#A1A1A1" />
              <ColorInfo>
                <ColorName>Stone Gray</ColorName>
                <ColorCode>#A1A1A1</ColorCode>
                <ColorDesc>보조 텍스트</ColorDesc>
              </ColorInfo>
            </ColorCard>
            <ColorCard color="#F8F9FA">
              <ColorBox color="#F8F9FA" />
              <ColorInfo>
                <ColorName>Cloud White</ColorName>
                <ColorCode>#F8F9FA</ColorCode>
                <ColorDesc>메인 배경</ColorDesc>
              </ColorInfo>
            </ColorCard>
          </ColorGrid>
        </SubSection>
      </Section>

      {/* 타이포그래피 */}
      <Section>
        <SectionTitle>타이포그래피</SectionTitle>

        <SubSection>
          <SubTitle>폰트 크기</SubTitle>
          <TypographyList>
            <TypographyItem>
              <TypeSize size="4xl">제목 1 (4xl)</TypeSize>
              <TypeInfo>2.25rem / 36px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="3xl">제목 2 (3xl)</TypeSize>
              <TypeInfo>1.875rem / 30px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="2xl">제목 3 (2xl)</TypeSize>
              <TypeInfo>1.5rem / 24px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="xl">소제목 (xl)</TypeSize>
              <TypeInfo>1.25rem / 20px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="lg">강조 텍스트 (lg)</TypeSize>
              <TypeInfo>1.125rem / 18px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="base">본문 텍스트 (base)</TypeSize>
              <TypeInfo>1rem / 16px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="sm">보조 텍스트 (sm)</TypeSize>
              <TypeInfo>0.875rem / 14px</TypeInfo>
            </TypographyItem>
            <TypographyItem>
              <TypeSize size="xs">캡션 (xs)</TypeSize>
              <TypeInfo>0.75rem / 12px</TypeInfo>
            </TypographyItem>
          </TypographyList>
        </SubSection>

        <SubSection>
          <SubTitle>폰트 굵기</SubTitle>
          <TypographyList>
            <WeightItem weight="300">Light (300)</WeightItem>
            <WeightItem weight="400">Regular (400)</WeightItem>
            <WeightItem weight="500">Medium (500)</WeightItem>
            <WeightItem weight="600">Semibold (600)</WeightItem>
            <WeightItem weight="700">Bold (700)</WeightItem>
          </TypographyList>
        </SubSection>
      </Section>

      {/* 간격 시스템 */}
      <Section>
        <SectionTitle>간격 시스템 (8px 기준)</SectionTitle>
        <SpacingList>
          <SpacingItem>
            <SpacingBox size="xs" />
            <SpacingInfo>
              <SpacingName>xs</SpacingName>
              <SpacingValue>4px (0.25rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
          <SpacingItem>
            <SpacingBox size="sm" />
            <SpacingInfo>
              <SpacingName>sm</SpacingName>
              <SpacingValue>8px (0.5rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
          <SpacingItem>
            <SpacingBox size="md" />
            <SpacingInfo>
              <SpacingName>md</SpacingName>
              <SpacingValue>16px (1rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
          <SpacingItem>
            <SpacingBox size="lg" />
            <SpacingInfo>
              <SpacingName>lg</SpacingName>
              <SpacingValue>24px (1.5rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
          <SpacingItem>
            <SpacingBox size="xl" />
            <SpacingInfo>
              <SpacingName>xl</SpacingName>
              <SpacingValue>32px (2rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
          <SpacingItem>
            <SpacingBox size="2xl" />
            <SpacingInfo>
              <SpacingName>2xl</SpacingName>
              <SpacingValue>48px (3rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
          <SpacingItem>
            <SpacingBox size="3xl" />
            <SpacingInfo>
              <SpacingName>3xl</SpacingName>
              <SpacingValue>64px (4rem)</SpacingValue>
            </SpacingInfo>
          </SpacingItem>
        </SpacingList>
      </Section>

      {/* 그림자 */}
      <Section>
        <SectionTitle>그림자 (Shadows)</SectionTitle>
        <ShadowGrid>
          <ShadowCard shadow="sm">
            <ShadowName>Small</ShadowName>
            <ShadowValue>0 1px 2px rgba(0, 0, 0, 0.05)</ShadowValue>
          </ShadowCard>
          <ShadowCard shadow="md">
            <ShadowName>Medium</ShadowName>
            <ShadowValue>0 4px 6px rgba(0, 0, 0, 0.1)</ShadowValue>
          </ShadowCard>
          <ShadowCard shadow="lg">
            <ShadowName>Large</ShadowName>
            <ShadowValue>0 10px 15px rgba(0, 0, 0, 0.1)</ShadowValue>
          </ShadowCard>
          <ShadowCard shadow="xl">
            <ShadowName>XLarge</ShadowName>
            <ShadowValue>0 20px 25px rgba(0, 0, 0, 0.15)</ShadowValue>
          </ShadowCard>
        </ShadowGrid>
      </Section>

      {/* Border Radius */}
      <Section>
        <SectionTitle>Border Radius</SectionTitle>
        <RadiusGrid>
          <RadiusCard radius="sm">
            <RadiusName>Small (4px)</RadiusName>
          </RadiusCard>
          <RadiusCard radius="md">
            <RadiusName>Medium (8px)</RadiusName>
          </RadiusCard>
          <RadiusCard radius="lg">
            <RadiusName>Large (12px)</RadiusName>
          </RadiusCard>
          <RadiusCard radius="xl">
            <RadiusName>XLarge (16px)</RadiusName>
          </RadiusCard>
          <RadiusCard radius="full">
            <RadiusName>Full (9999px)</RadiusName>
          </RadiusCard>
        </RadiusGrid>
      </Section>
    </Container>
  );
}

export default StyleGuidePage;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
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
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
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
`;

const SubSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

// 컬러 관련
const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ColorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.primary};
`;

const ColorBox = styled.div`
  width: 100%;
  height: 80px;
  background: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const ColorInfo = styled.div`
  text-align: center;
  width: 100%;
`;

const ColorName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ColorCode = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: "Courier New", monospace;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ColorDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
`;

// 타이포그래피 관련
const TypographyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TypographyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const TypeSize = styled.div`
  font-size: ${({ theme, size }) => theme.fontSize[size]};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TypeInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: "Courier New", monospace;
`;

const WeightItem = styled.div`
  font-weight: ${({ weight }) => weight};
  font-size: ${({ theme }) => theme.fontSize.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

// 간격 관련
const SpacingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SpacingItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SpacingBox = styled.div`
  width: ${({ theme, size }) => theme.spacing[size]};
  height: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const SpacingInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const SpacingName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 60px;
`;

const SpacingValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: "Courier New", monospace;
`;

// 그림자 관련
const ShadowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ShadowCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme, shadow }) => theme.shadow[shadow]};
  text-align: center;
`;

const ShadowName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ShadowValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-family: "Courier New", monospace;
`;

// Border Radius 관련
const RadiusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const RadiusCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme, radius }) => theme.borderRadius[radius]};
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadiusName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.white};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

