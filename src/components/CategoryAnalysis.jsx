import styled from "styled-components";

/**
 * 카테고리별 상세 분석 컴포넌트
 * ASRS 또는 WURS의 카테고리별 점수를 시각화
 */
function CategoryAnalysis({ categories, type = "asrs" }) {
  return (
    <AnalysisContainer>
      <SectionTitle>
        {type === "asrs" ? "ASRS 영역별 분석" : "WURS 카테고리별 분석"}
      </SectionTitle>

      {Object.entries(categories).map(([key, category]) => (
        <CategoryCard key={key}>
          <CategoryHeader>
            <CategoryName>
              {category.icon && <span>{category.icon}</span>}
              {category.name}
            </CategoryName>
            <CategoryScore>
              {category.score} / {category.maxScore}
              <ScorePercentage>({category.percentage}%)</ScorePercentage>
            </CategoryScore>
          </CategoryHeader>

          {category.description && (
            <CategoryDescription>{category.description}</CategoryDescription>
          )}

          <ProgressBarWrapper>
            <ProgressFill
              percentage={category.percentage}
              level={category.level || getCategoryLevel(category.percentage)}
            />
          </ProgressBarWrapper>
        </CategoryCard>
      ))}
    </AnalysisContainer>
  );
}

/**
 * 카테고리 수준 판단
 * @param {number} percentage - 백분율
 * @returns {string} 수준
 */
const getCategoryLevel = (percentage) => {
  if (percentage >= 75) return "high";
  if (percentage >= 50) return "moderate";
  return "low";
};

export default CategoryAnalysis;

// Styled Components

const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primaryLight};
`;

const CategoryCard = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.md};
    transform: translateY(-2px);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CategoryName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  span {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const CategoryScore = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ScorePercentage = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CategoryDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.xs} 0 ${({ theme }) => theme.spacing.md};
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background: ${({ level, theme }) => {
    if (level === "high") return theme.colors.danger;
    if (level === "moderate") return theme.colors.accent;
    return theme.colors.primary;
  }};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: width 0.5s ease, background 0.3s ease;
`;

