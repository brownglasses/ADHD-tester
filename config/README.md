# API Keys 설정 가이드

## 설정 방법

1. `api_keys.example.json` 파일을 복사하여 `api_keys.json` 파일을 생성합니다:

   ```bash
   cp config/api_keys.example.json config/api_keys.json
   ```

2. `api_keys.json` 파일을 열어 실제 API 키 값으로 수정합니다.

## 주의사항

⚠️ **중요**: `api_keys.json` 파일은 절대 Git에 커밋하지 마세요!

- 이 파일은 `.gitignore`에 포함되어 있어 자동으로 제외됩니다.
- 실제 API 키는 절대 공개 저장소에 올리지 마세요.

## 필요한 API 키

### OpenAI API Key

- ADHD 테스트 분석 및 추천에 사용
- https://platform.openai.com/api-keys 에서 발급

### Google Maps API Key

- 병원 위치 및 지도 표시에 사용
- https://console.cloud.google.com/ 에서 발급

### Database URL

- 데이터베이스 연결 문자열

### Secret Key

- 세션 암호화 및 보안에 사용되는 키
