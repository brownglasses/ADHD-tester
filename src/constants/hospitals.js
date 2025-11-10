/**
 * 병원 찾기 관련 상수
 * - 지도 검색 URL
 * - 추천 병원 목록
 */

/**
 * 지도 검색 URL 생성 함수
 */
export const HOSPITAL_SEARCH_URLS = {
  naver: "https://map.naver.com/v5/search/정신건강의학과",
  kakao: "https://map.kakao.com/?q=정신건강의학과",
  google: "https://www.google.com/maps/search/정신건강의학과",

  /**
   * 네이버 지도 검색 URL 생성
   * @param {string} keyword - 검색 키워드
   * @param {string} region - 지역 (선택사항)
   * @returns {string} 검색 URL
   */
  getNaverSearchUrl: (keyword, region) => {
    const query = region ? `${region} ${keyword}` : keyword;
    return `https://map.naver.com/v5/search/${encodeURIComponent(query)}`;
  },

  /**
   * 카카오맵 검색 URL 생성
   * @param {string} keyword - 검색 키워드
   * @param {string} region - 지역 (선택사항)
   * @returns {string} 검색 URL
   */
  getKakaoSearchUrl: (keyword, region) => {
    const query = region ? `${region} ${keyword}` : keyword;
    return `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
  },
};

/**
 * 전국 주요 ADHD 진료 병원 목록
 * 실제 운영 시 병원 정보를 확인하여 업데이트 필요
 */
export const RECOMMENDED_HOSPITALS = [
  {
    id: 1,
    name: "서울대학교병원 정신건강의학과",
    region: "서울",
    phone: "02-2072-2972",
    website: "http://www.snuh.org",
    address: "서울특별시 종로구 대학로 101",
    features: ["성인 ADHD 전문", "종합검사 가능", "약물치료", "인지행동치료"],
  },
  {
    id: 2,
    name: "삼성서울병원 정신건강의학과",
    region: "서울",
    phone: "02-3410-3583",
    website: "http://www.samsunghospital.com",
    address: "서울특별시 강남구 일원로 81",
    features: ["ADHD 전문 클리닉", "성인/청소년", "심리검사", "약물치료"],
  },
  {
    id: 3,
    name: "세브란스병원 정신건강의학과",
    region: "서울",
    phone: "02-2228-5114",
    website: "http://www.severance.or.kr",
    address: "서울특별시 서대문구 연세로 50-1",
    features: ["ADHD 클리닉", "종합검사", "심리치료", "약물치료"],
  },
  {
    id: 4,
    name: "서울아산병원 정신건강의학과",
    region: "서울",
    phone: "02-3010-3410",
    website: "http://www.amc.seoul.kr",
    address: "서울특별시 송파구 올림픽로43길 88",
    features: ["성인 ADHD", "심리평가", "약물치료", "인지행동치료"],
  },
  {
    id: 5,
    name: "가톨릭대학교 서울성모병원",
    region: "서울",
    phone: "02-2258-5114",
    website: "http://www.cmcseoul.or.kr",
    address: "서울특별시 서초구 반포대로 222",
    features: ["ADHD 진단", "심리검사", "상담", "약물치료"],
  },
  {
    id: 6,
    name: "경희대학교병원 정신건강의학과",
    region: "서울",
    phone: "02-958-8556",
    website: "http://www.khmc.or.kr",
    address: "서울특별시 동대문구 경희대로 23",
    features: ["ADHD 클리닉", "심리평가", "상담치료"],
  },
  {
    id: 7,
    name: "고려대학교 안암병원",
    region: "서울",
    phone: "02-920-5354",
    website: "http://www.anam.kumc.or.kr",
    address: "서울특별시 성북구 고려대로 73",
    features: ["성인 ADHD", "심리검사", "약물치료"],
  },
  {
    id: 8,
    name: "분당서울대병원 정신건강의학과",
    region: "경기",
    phone: "031-787-7114",
    website: "http://www.snubh.org",
    address: "경기도 성남시 분당구 구미로 173번길 82",
    features: ["ADHD 전문", "종합검사", "상담", "약물치료"],
  },
  {
    id: 9,
    name: "아주대학교병원 정신건강의학과",
    region: "경기",
    phone: "031-219-5180",
    website: "http://www.ajoumc.or.kr",
    address: "경기도 수원시 영통구 월드컵로 164",
    features: ["ADHD 진단", "심리평가", "치료"],
  },
  {
    id: 10,
    name: "인천성모병원 정신건강의학과",
    region: "인천",
    phone: "032-280-5114",
    website: "http://www.cmcis.or.kr",
    address: "인천광역시 부평구 동수로 56",
    features: ["ADHD 클리닉", "심리검사", "상담"],
  },
  {
    id: 11,
    name: "부산대학교병원 정신건강의학과",
    region: "부산",
    phone: "051-240-7314",
    website: "http://www.pnuh.or.kr",
    address: "부산광역시 서구 구덕로 179",
    features: ["성인 ADHD", "심리평가", "약물치료"],
  },
  {
    id: 12,
    name: "칠곡경북대학교병원",
    region: "대구",
    phone: "053-200-2171",
    website: "http://www.knuch.or.kr",
    address: "대구광역시 북구 호국로 807",
    features: ["ADHD 진단", "심리검사", "치료"],
  },
  {
    id: 13,
    name: "전남대학교병원 정신건강의학과",
    region: "광주",
    phone: "062-220-5170",
    website: "http://www.cnuh.com",
    address: "광주광역시 동구 제봉로 42",
    features: ["ADHD 클리닉", "심리평가", "상담"],
  },
  {
    id: 14,
    name: "충남대학교병원 정신건강의학과",
    region: "대전",
    phone: "042-280-7280",
    website: "http://www.cnuh.co.kr",
    address: "대전광역시 중구 문화로 282",
    features: ["성인 ADHD", "심리검사", "약물치료"],
  },
  {
    id: 15,
    name: "울산대학교병원 정신건강의학과",
    region: "울산",
    phone: "052-250-7070",
    website: "http://www.uuh.ulsan.kr",
    address: "울산광역시 동구 방어진순환도로 877",
    features: ["ADHD 진단", "심리평가", "치료"],
  },
];

/**
 * 지역 목록 (검색 필터용)
 */
export const REGIONS = [
  "전체",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "대전",
  "광주",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];


