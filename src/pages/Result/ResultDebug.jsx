import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "@constants/routes";
import useTestStore from "@store/useTestStore";

/**
 * Result 페이지 디버그 버전
 * 문제 확인용
 */
function ResultDebug() {
  const navigate = useNavigate();
  const asrsStore = useTestStore((state) => state.asrs);
  const impairmentStore = useTestStore((state) => state.impairment);
  const wursStore = useTestStore((state) => state.wurs);

  useEffect(() => {
    console.log("=== Result 페이지 디버그 ===");
    console.log("ASRS Store:", asrsStore);
    console.log("ASRS Answers:", asrsStore?.answers);
    console.log("ASRS Answers Keys:", Object.keys(asrsStore?.answers || {}));
    console.log("Impairment Store:", impairmentStore);
    console.log("Impairment Answers:", impairmentStore?.answers);
    console.log("WURS Store:", wursStore);
    console.log("WURS Answers:", wursStore?.answers);
    console.log("WURS Answers Keys:", Object.keys(wursStore?.answers || {}));
  }, [asrsStore, impairmentStore, wursStore]);

  const hasAsrsData = asrsStore?.answers && Object.keys(asrsStore.answers).length > 0;
  const hasImpairmentData = impairmentStore?.answers && Object.keys(impairmentStore.answers).length > 0;
  const hasWursData = wursStore?.answers && Object.keys(wursStore.answers).length > 0;

  return (
    <Container>
      <Title>🔍 Result 페이지 디버그</Title>
      
      <DebugSection>
        <SectionTitle>데이터 확인</SectionTitle>
        <DataCheck success={hasAsrsData}>
          ASRS 답변: {hasAsrsData ? `✅ ${Object.keys(asrsStore.answers).length}개` : "❌ 없음"}
        </DataCheck>
        <DataCheck success={hasImpairmentData}>
          기능 저하 답변: {hasImpairmentData ? `✅ ${Object.keys(impairmentStore.answers).length}개` : "❌ 없음"}
        </DataCheck>
        <DataCheck success={hasWursData}>
          WURS 답변: {hasWursData ? `✅ ${Object.keys(wursStore.answers).length}개` : "❌ 없음"}
        </DataCheck>
      </DebugSection>

      <DebugSection>
        <SectionTitle>상세 데이터 (콘솔 확인)</SectionTitle>
        <InfoText>F12를 눌러 개발자 도구 콘솔을 확인하세요</InfoText>
      </DebugSection>

      <ButtonGroup>
        <Button onClick={() => navigate(ROUTES.LANDING)}>
          홈으로 돌아가기
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default ResultDebug;

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary || "#f5f5f5"};
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
`;

const DebugSection = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const DataCheck = styled.div`
  font-size: 16px;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: ${({ success }) => (success ? "#e8f5e9" : "#ffebee")};
  color: ${({ success }) => (success ? "#2e7d32" : "#c62828")};
  font-weight: 500;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: #96BE80;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #7FA96A;
    transform: translateY(-2px);
  }
`;


