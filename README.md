# ADHD 스크리너

> 사용자의 첫걸음을 돕는 신뢰할 수 있는 ADHD 스크리닝 도구

## 📋 프로젝트 소개

ADHD 증상 자가진단을 위한 웹 기반 스크리닝 도구입니다. 검증된 ASRS, WURS 척도와 CPT(Continuous Performance Test)를 기반으로 하여 신뢰할 수 있는 결과를 제공합니다.

### 주요 기능

- ✅ **ASRS 설문** - 성인 ADHD 자가진단 척도
- ✅ **WURS 설문** - 아동기 회상 ADHD 척도
- ✅ **CPT 과제** - 주의력 테스트
- ✅ **결과 분석** - 종합적인 스크리닝 결과 제공
- ✅ **병원 정보** - 가까운 ADHD 진료 병원 안내

## 🛠️ 기술 스택

- **Frontend**: React 18 + Vite
- **State Management**: Zustand
- **Styling**: styled-components
- **Backend**: Firebase (Auth + Firestore)
- **Routing**: React Router v6

## 📂 프로젝트 구조

```
src/
├── pages/           # 페이지 컴포넌트
├── components/      # 재사용 컴포넌트
├── store/          # Zustand 스토어
├── services/       # API 서비스 (Firebase, Kakao)
├── constants/      # 상수 데이터
├── utils/          # 유틸리티 함수
├── styles/         # 전역 스타일
├── hooks/          # 커스텀 훅
└── assets/         # 정적 파일
```

## 📝 개발 가이드

프로젝트의 개발 원칙과 가이드는 `prompts/` 폴더를 참조하세요:

- `system_prompt.md` - 개발 헌법 & 5대 원칙
- `project_structure.md` - 상세 프로젝트 구조
- `checklist.md` - 코드 검증 체크리스트

## ⚠️ 면책 조항 (Disclaimer)

이 도구는 **스크리닝 목적**으로만 사용되며, 의학적 진단을 대체할 수 없습니다.
ADHD 증상이 의심되는 경우 반드시 전문의와 상담하시기 바랍니다.

## 📄 라이선스

Apache-2.0 License

---

Made with ❤️ for better mental health awareness
