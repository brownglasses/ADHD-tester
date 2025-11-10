/**
 * 라우트 경로 상수
 * 하드코딩을 방지하기 위해 모든 라우트 경로를 여기서 관리
 */

export const ROUTES = {
  // 메인
  LANDING: "/",
  
  // 인증
  LOGIN: "/login",
  
  // ASRS 설문 (1단계: 현재 증상)
  ASRS_INTRO: "/asrs/intro",
  ASRS_TEST: "/asrs/test",
  ASRS_COMPLETE: "/asrs/complete",
  
  // 기능 저하 평가 (2단계)
  IMPAIRMENT_TEST: "/impairment/test",
  IMPAIRMENT_COMPLETE: "/impairment/complete",
  
  // WURS 설문 (3단계: 과거 증상)
  WURS_INTRO: "/wurs/intro",
  WURS_TEST: "/wurs/test",
  WURS_COMPLETE: "/wurs/complete",
  
  // 결과 (3단계)
  RESULT: "/result",
  
  // 병원 정보
  HOSPITAL: "/hospital",
  
  // 기타
  PRIVACY: "/privacy",
  FAQ: "/faq",
};

