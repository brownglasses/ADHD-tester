import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { HOSPITAL_SEARCH_URLS, RECOMMENDED_HOSPITALS, REGIONS } from "@constants/hospitals";
import { ROUTES } from "@constants/routes";

/**
 * 병원 찾기 페이지
 * - 지도 검색 (네이버, 카카오, 구글)
 * - 추천 병원 목록
 * - 진료 준비 가이드
 */
function Hospital() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("정신건강의학과 ADHD");

  // 지역별 필터링
  const filteredHospitals =
    selectedRegion === "전체"
      ? RECOMMENDED_HOSPITALS
      : RECOMMENDED_HOSPITALS.filter((h) => h.region === selectedRegion);

  // 지도 검색 핸들러
  const handleMapSearch = (provider) => {
    let url;
    switch (provider) {
      case "naver":
        url = HOSPITAL_SEARCH_URLS.getNaverSearchUrl(
          searchKeyword,
          selectedRegion !== "전체" ? selectedRegion : null
        );
        break;
      case "kakao":
        url = HOSPITAL_SEARCH_URLS.getKakaoSearchUrl(
          searchKeyword,
          selectedRegion !== "전체" ? selectedRegion : null
        );
        break;
      default:
        url = HOSPITAL_SEARCH_URLS.google;
    }
    window.open(url, "_blank");
  };

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <BackButton onClick={() => navigate(-1)}>← 뒤로 가기</BackButton>
        <Title>🏥 병원 찾기</Title>
        <Subtitle>ADHD 진료가 가능한 정신건강의학과를 찾아보세요</Subtitle>
      </Header>

      {/* 지도 검색 섹션 */}
      <Section>
        <SectionTitle>🗺️ 지도에서 찾기</SectionTitle>
        <SectionDescription>
          원하시는 지역의 정신건강의학과를 지도에서 검색하세요
        </SectionDescription>

        <SearchInputWrapper>
          <RegionSelect
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </RegionSelect>
          <SearchInput
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색 키워드 입력"
          />
        </SearchInputWrapper>

        <MapButtonGroup>
          <MapButton onClick={() => handleMapSearch("naver")} color="#03C75A">
            <MapIcon>📍</MapIcon>
            네이버 지도
          </MapButton>
          <MapButton onClick={() => handleMapSearch("kakao")} color="#FEE500">
            <MapIcon>📍</MapIcon>
            카카오맵
          </MapButton>
          <MapButton onClick={() => handleMapSearch("google")} color="#4285F4">
            <MapIcon>📍</MapIcon>
            구글 지도
          </MapButton>
        </MapButtonGroup>
      </Section>

      {/* 추천 병원 목록 */}
      <Section>
        <SectionTitle>🏢 추천 병원 목록</SectionTitle>
        <SectionDescription>
          ADHD 전문 진료가 가능한 병원 목록입니다. 예약 전 전화로 확인하세요.
        </SectionDescription>

        <HospitalGrid>
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.id}>
              <HospitalName>{hospital.name}</HospitalName>
              <HospitalRegion>{hospital.region}</HospitalRegion>

              <HospitalInfo>
                <InfoRow>
                  <InfoIcon>📞</InfoIcon>
                  <InfoText>{hospital.phone}</InfoText>
                </InfoRow>
                <InfoRow>
                  <InfoIcon>📍</InfoIcon>
                  <InfoText>{hospital.address}</InfoText>
                </InfoRow>
                {hospital.website && (
                  <InfoRow>
                    <InfoIcon>🌐</InfoIcon>
                    <InfoLink
                      href={hospital.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      홈페이지 바로가기
                    </InfoLink>
                  </InfoRow>
                )}
              </HospitalInfo>

              <FeatureTags>
                {hospital.features.map((feature, index) => (
                  <FeatureTag key={index}>{feature}</FeatureTag>
                ))}
              </FeatureTags>

              <ButtonGroup>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`tel:${hospital.phone}`)}
                >
                  전화하기
                </Button>
                <Button size="sm" onClick={() => handleMapSearch("naver")}>
                  지도보기
                </Button>
              </ButtonGroup>
            </HospitalCard>
          ))}
        </HospitalGrid>

        {filteredHospitals.length === 0 && (
          <EmptyMessage>
            선택한 지역({selectedRegion})에 등록된 병원이 없습니다.
            <br />
            "전체"를 선택하거나 지도 검색을 이용해보세요.
          </EmptyMessage>
        )}
      </Section>

      {/* 진료 준비 가이드 */}
      <Section>
        <SectionTitle>📋 진료 준비 가이드</SectionTitle>
        <GuideList>
          <GuideItem>
            <GuideIcon>1️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>검사 결과 준비</GuideTitle>
              <GuideDescription>
                방금 완료한 검사 결과를 PDF로 저장하여 출력하거나 모바일로
                가져가세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>

          <GuideItem>
            <GuideIcon>2️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>증상 메모 준비</GuideTitle>
              <GuideDescription>
                언제부터, 어떤 상황에서, 어떤 어려움이 있는지 구체적으로
                메모하세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>

          <GuideItem>
            <GuideIcon>3️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>예약 시 문의사항</GuideTitle>
              <GuideDescription>
                "성인 ADHD 진단이 가능한지", "초진 대기 시간은 얼마나 되는지"
                미리 확인하세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>

          <GuideItem>
            <GuideIcon>4️⃣</GuideIcon>
            <GuideContent>
              <GuideTitle>진료 당일</GuideTitle>
              <GuideDescription>
                신분증, 검사 결과, 메모를 지참하고, 솔직하게 증상을 설명하세요.
              </GuideDescription>
            </GuideContent>
          </GuideItem>
        </GuideList>
      </Section>

      {/* Disclaimer */}
      <DisclaimerBox>
        <DisclaimerIcon>ℹ️</DisclaimerIcon>
        <DisclaimerText>
          병원 정보는 참고용이며, 진료 가능 여부와 대기 시간은 병원에 직접
          문의하세요.
        </DisclaimerText>
      </DisclaimerBox>

      {/* 하단 버튼 */}
      <BottomButtonGroup>
        <Button variant="outline" onClick={() => navigate(ROUTES.LANDING)}>
          홈으로
        </Button>
        <Button onClick={() => navigate(-1)}>결과로 돌아가기</Button>
      </BottomButtonGroup>
    </Container>
  );
}

export default Hospital;

// Styled Components

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.bgWhite};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const SectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const SearchInputWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RegionSelect = styled.select`
  flex: 0 0 150px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.borderMedium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme }) => theme.colors.bgWhite};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.borderMedium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const MapButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const MapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgWhite};
  border: 2px solid ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ color }) => color}22;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

const MapIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const HospitalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const HospitalCard = styled.div`
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

const HospitalName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const HospitalRegion = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HospitalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const InfoIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-shrink: 0;
`;

const InfoText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

const InfoLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  line-height: 1.5;

  &:hover {
    text-decoration: underline;
  }
`;

const FeatureTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureTag = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
`;

const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const GuideItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const GuideIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  flex-shrink: 0;
`;

const GuideContent = styled.div`
  flex: 1;
`;

const GuideTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const GuideDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

const DisclaimerBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accentLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DisclaimerIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  flex-shrink: 0;
`;

const DisclaimerText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
`;

const BottomButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

