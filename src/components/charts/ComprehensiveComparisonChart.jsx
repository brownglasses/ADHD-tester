import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * 종합 비교 차트 컴포넌트
 * ASRS, 기능 저하, WURS 3개 검사를 백분율로 비교
 */
function ComprehensiveComparisonChart({ asrs, impairment, wurs }) {
  const data = [
    {
      name: "ASRS\n(현재 증상)",
      percentage: Math.round((asrs.totalScore / 72) * 100),
      score: asrs.totalScore,
      max: 72,
    },
    {
      name: "기능 저하",
      percentage: Math.round((impairment.yesCount / 3) * 100),
      score: impairment.yesCount,
      max: 3,
    },
    {
      name: "WURS\n(아동기)",
      percentage: Math.round((wurs.totalScore / 100) * 100),
      score: wurs.totalScore,
      max: 100,
    },
  ];

  return (
    <ChartContainer>
      <ChartTitle>3개 검사 종합 비교</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8DD" />
          <XAxis type="number" domain={[0, 100]} unit="%" />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fill: "#3D4A3D", fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.score} / ${props.payload.max} (${value}%)`,
              "점수",
            ]}
            contentStyle={{
              backgroundColor: "#F7FAF5",
              border: "1px solid #C1D0BA",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="percentage" fill="#96BE80" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <ChartDescription>
        각 검사 결과를 백분율(%)로 환산하여 비교한 차트입니다.
      </ChartDescription>

      <ComparisonGuide>
        <GuideItem>
          <GuideIcon>🎯</GuideIcon>
          <GuideText>
            <strong>ASRS:</strong> 현재 성인기 ADHD 증상 (18문항)
          </GuideText>
        </GuideItem>
        <GuideItem>
          <GuideIcon>📊</GuideIcon>
          <GuideText>
            <strong>기능 저하:</strong> 일상생활 어려움 영역 (3개 영역)
          </GuideText>
        </GuideItem>
        <GuideItem>
          <GuideIcon>👶</GuideIcon>
          <GuideText>
            <strong>WURS:</strong> 아동기(7-10세) 증상 회상 (25문항)
          </GuideText>
        </GuideItem>
      </ComparisonGuide>
    </ChartContainer>
  );
}

export default ComprehensiveComparisonChart;

// Styled Components

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const ChartDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ComparisonGuide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const GuideItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const GuideIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  flex-shrink: 0;
`;

const GuideText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`;

