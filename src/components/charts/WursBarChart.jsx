import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/**
 * WURS 바 차트 컴포넌트
 * 7개 카테고리별 점수를 막대 그래프로 표시
 */
function WursBarChart({ categoryAnalysis }) {
  const data = Object.values(categoryAnalysis).map((cat) => ({
    name: cat.name,
    icon: cat.icon,
    score: cat.score,
    maxScore: cat.maxScore,
    percentage: cat.percentage,
  }));

  const getBarColor = (percentage) => {
    if (percentage >= 75) return "#E57373"; // high
    if (percentage >= 50) return "#FFB347"; // moderate
    return "#7FA96A"; // low
  };

  return (
    <ChartContainer>
      <ChartTitle>WURS 카테고리별 바 차트</ChartTitle>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8DD" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#3D4A3D", fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            tick={{ fill: "#6B7B6B", fontSize: 10 }}
            label={{ value: "점수", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#F7FAF5",
              border: "1px solid #C1D0BA",
              borderRadius: "8px",
            }}
            formatter={(value, name, props) => [
              `${value} / ${props.payload.maxScore} (${props.payload.percentage}%)`,
              "점수",
            ]}
          />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.percentage)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <ChartLegend>
        <LegendItem>
          <LegendColor color="#7FA96A" />
          <LegendText>낮음 (0-49%)</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#FFB347" />
          <LegendText>보통 (50-74%)</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#E57373" />
          <LegendText>높음 (75-100%)</LegendText>
        </LegendItem>
      </ChartLegend>

      <ChartDescription>
        각 카테고리별로 아동기(7-10세) 증상 심각도를 표시합니다.
      </ChartDescription>
    </ChartContainer>
  );
}

export default WursBarChart;

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
  flex-wrap: wrap;
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

