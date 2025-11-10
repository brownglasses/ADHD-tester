import styled from "styled-components";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

/**
 * ASRS 레이더 차트 컴포넌트
 * 부주의, 과잉행동, 충동성 3개 영역을 시각화
 */
function AsrsRadarChart({ categoryAnalysis }) {
  const data = Object.values(categoryAnalysis).map((cat) => ({
    category: cat.name,
    value: cat.percentage,
    fullMark: 100,
  }));

  return (
    <ChartContainer>
      <ChartTitle>ASRS 영역별 레이더 차트</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#E1E8DD" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "#3D4A3D", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#6B7B6B", fontSize: 10 }}
          />
          <Radar
            name="점수"
            dataKey="value"
            stroke="#96BE80"
            fill="#96BE80"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      <ChartLegend>
        <LegendItem>
          <LegendColor color="#96BE80" />
          <LegendText>증상 수준 (%)</LegendText>
        </LegendItem>
      </ChartLegend>

      <ChartDescription>
        0%에 가까울수록 증상이 적고, 100%에 가까울수록 증상이 많습니다.
      </ChartDescription>
    </ChartContainer>
  );
}

export default AsrsRadarChart;

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

const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  background: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const LegendText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ChartDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0 0;
`;

