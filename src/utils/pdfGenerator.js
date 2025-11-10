/**
 * PDF 생성 유틸리티
 * jsPDF와 jspdf-autotable를 사용하여 검사 결과를 PDF로 생성
 * 
 * 필요 패키지: npm install jspdf jspdf-autotable
 */

import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * 검사 결과를 PDF로 생성 및 다운로드
 * @param {Object} result - calculateAllScores()의 결과
 * @param {Object} userInfo - 사용자 정보 (선택사항)
 */
export function generateResultPDF(result, userInfo = {}) {
  const doc = new jsPDF();
  const { asrs, impairment, wurs, comprehensive } = result;

  // 한글 폰트 설정 (필요시 - 고급 기능)
  // doc.addFont('NanumGothic.ttf', 'NanumGothic', 'normal');
  // doc.setFont('NanumGothic');

  // 1. 헤더
  doc.setFontSize(20);
  doc.text("ADHD 자가 스크리닝 결과", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text(`검사일: ${new Date().toLocaleDateString("ko-KR")}`, 105, 30, {
    align: "center",
  });

  // 2. Disclaimer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "※ 이 결과는 참고용 선별 검사이며, 의학적 진단이 아닙니다.",
    105,
    40,
    { align: "center" }
  );
  doc.setTextColor(0, 0, 0);

  let yPosition = 55;

  // 3. 종합 결과
  doc.setFontSize(14);
  doc.setFillColor(150, 190, 128); // primaryLight
  doc.rect(15, yPosition - 5, 180, 10, "F");
  doc.text("종합 평가", 105, yPosition, { align: "center" });
  yPosition += 15;

  doc.setFontSize(12);
  doc.text(comprehensive.title, 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  const messageLines = doc.splitTextToSize(comprehensive.message, 170);
  doc.text(messageLines, 20, yPosition);
  yPosition += messageLines.length * 7 + 10;

  // 4. 상세 점수
  doc.autoTable({
    startY: yPosition,
    head: [["검사", "점수", "해석"]],
    body: [
      [
        "ASRS (현재 증상)",
        `${asrs.totalScore} / 72점\n(Part A: ${asrs.partAScore}/24)`,
        asrs.riskLevel,
      ],
      [
        "기능 저하 평가",
        `${impairment.yesCount} / 3개 영역`,
        impairment.description,
      ],
      ["WURS (아동기 증상)", `${wurs.totalScore} / 100점`, wurs.description],
    ],
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [150, 190, 128] },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // 5. DSM-5 기준 충족 여부
  doc.setFontSize(12);
  doc.text("DSM-5 진단 기준 충족 여부", 20, yPosition);
  yPosition += 10;

  doc.autoTable({
    startY: yPosition,
    head: [["기준", "내용", "상태"]],
    body: [
      ["Criterion A", "현재 증상 (ASRS)", comprehensive.dsmCriteria.A],
      ["Criterion B", "12세 이전 발병 (WURS)", comprehensive.dsmCriteria.B],
      ["Criterion D", "기능 저하 (2개 이상 영역)", comprehensive.dsmCriteria.D],
    ],
    theme: "striped",
    styles: { fontSize: 9, cellPadding: 4 },
  });

  yPosition = doc.lastAutoTable.finalY + 15;

  // 6. 하위 유형 (ASRS)
  if (asrs.subtype !== "unknown") {
    doc.setFontSize(10);
    doc.text(`ADHD 하위 유형: ${getSubtypeLabel(asrs.subtype)}`, 20, yPosition);
    yPosition += 7;
    doc.text(`부주의 점수: ${asrs.inattentionScore}/36`, 25, yPosition);
    yPosition += 7;
    doc.text(
      `과잉행동-충동 점수: ${asrs.hyperactivityScore}/36`,
      25,
      yPosition
    );
    yPosition += 15;
  }

  // 7. 다음 단계 권장사항
  doc.setFontSize(12);
  doc.text("권장 사항", 20, yPosition);
  yPosition += 10;

  comprehensive.nextSteps.forEach((step) => {
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
    doc.setFontSize(10);
    doc.text(`${step.icon} ${step.title}`, 20, yPosition);
    yPosition += 7;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(step.description, 25, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
  });

  // 8. 푸터
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`${i} / ${pageCount}`, 105, 290, { align: "center" });
    doc.text(
      "본 결과는 의학적 진단이 아니며, 전문의 상담을 권장합니다.",
      105,
      285,
      { align: "center" }
    );
  }

  // PDF 저장
  const filename = `ADHD_검사결과_${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  doc.save(filename);
}

/**
 * 하위 유형 라벨 변환
 * @param {string} subtype - 하위 유형 코드
 * @returns {string} 한글 라벨
 */
function getSubtypeLabel(subtype) {
  const labels = {
    inattentive: "부주의형 우세",
    hyperactive: "과잉행동-충동형 우세",
    combined: "복합형",
  };
  return labels[subtype] || subtype;
}


