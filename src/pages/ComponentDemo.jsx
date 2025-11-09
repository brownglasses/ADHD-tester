import { useState } from "react";
import styled from "styled-components";
import Button from "@components/Button";
import Card from "@components/Card";
import { RadioGroup, RadioOption } from "@components/RadioGroup";
import ProgressBar from "@components/ProgressBar";
import Stepper from "@components/Stepper";

/**
 * 컴포넌트 데모 페이지
 * 개발 중 컴포넌트를 쉽게 테스트하기 위한 페이지
 */
function ComponentDemo() {
  // Radio 컴포넌트 데모용 상태
  const [selectedValue1, setSelectedValue1] = useState("sometimes");
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState("3");
  const [selectedValue4, setSelectedValue4] = useState("agree");

  // ProgressBar 컴포넌트 데모용 상태
  const [progress, setProgress] = useState(3);
  const totalSteps = 6;

  // Stepper 컴포넌트 데모용 상태
  const [currentStep, setCurrentStep] = useState(0);
  const testSteps = [
    { label: "현재 증상", description: "ASRS 설문" },
    { label: "일상 기능", description: "생활 패턴" },
    { label: "과거 증상", description: "WURS 설문" },
    { label: "집중력 확인", description: "CPT 과제" },
  ];

  return (
    <Container>
      <Title>🎨 컴포넌트 데모</Title>

      {/* Button 컴포넌트 */}
      <Section>
        <SectionTitle>Button 컴포넌트</SectionTitle>

        <SubSection>
          <Label>기본 버튼 (Primary)</Label>
          <ButtonGroup>
            <Button size="sm">작은 버튼</Button>
            <Button size="md">중간 버튼</Button>
            <Button size="lg">큰 버튼</Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>보조 버튼 (Secondary)</Label>
          <ButtonGroup>
            <Button variant="secondary" size="sm">
              작은 버튼
            </Button>
            <Button variant="secondary" size="md">
              중간 버튼
            </Button>
            <Button variant="secondary" size="lg">
              큰 버튼
            </Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>아웃라인 버튼 (Outline)</Label>
          <ButtonGroup>
            <Button variant="outline" size="sm">
              작은 버튼
            </Button>
            <Button variant="outline" size="md">
              중간 버튼
            </Button>
            <Button variant="outline" size="lg">
              큰 버튼
            </Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>전체 너비 버튼</Label>
          <Button fullWidth>전체 너비 버튼</Button>
          <Button variant="secondary" fullWidth>
            전체 너비 보조 버튼
          </Button>
        </SubSection>

        <SubSection>
          <Label>비활성화 상태</Label>
          <ButtonGroup>
            <Button disabled>비활성화</Button>
            <Button variant="secondary" disabled>
              비활성화
            </Button>
            <Button variant="outline" disabled>
              비활성화
            </Button>
          </ButtonGroup>
        </SubSection>
      </Section>

      {/* Card 컴포넌트 */}
      <Section>
        <SectionTitle>Card 컴포넌트</SectionTitle>

        <SubSection>
          <Label>기본 카드 (Default)</Label>
          <Card>
            <CardTitle>기본 카드</CardTitle>
            <CardText>
              이것은 기본 스타일의 카드입니다. 가장 일반적으로 사용되며,
              깔끔한 흰색 배경과 적당한 그림자를 가지고 있습니다.
            </CardText>
          </Card>
        </SubSection>

        <SubSection>
          <Label>Primary 카드 (강조)</Label>
          <Card variant="primary">
            <CardTitle>Primary 카드</CardTitle>
            <CardText>
              중요한 정보나 강조가 필요한 내용에 사용됩니다. 부드러운 새싹
              연두색 배경이 특징입니다.
            </CardText>
          </Card>
        </SubSection>

        <SubSection>
          <Label>Secondary 카드 (보조)</Label>
          <Card variant="secondary">
            <CardTitle>Secondary 카드</CardTitle>
            <CardText>
              보조 정보나 덜 중요한 내용에 사용됩니다. 은은한 회색 배경이
              특징입니다.
            </CardText>
          </Card>
        </SubSection>

        <SubSection>
          <Label>Outlined 카드 (테두리)</Label>
          <Card variant="outlined">
            <CardTitle>Outlined 카드</CardTitle>
            <CardText>
              투명한 배경에 테두리만 있는 카드입니다. 간결한 디자인이
              필요할 때 사용합니다.
            </CardText>
          </Card>
        </SubSection>

        <SubSection>
          <Label>패딩 크기 비교</Label>
          <CardGrid>
            <Card padding="sm">
              <SmallText>작은 패딩 (sm)</SmallText>
            </Card>
            <Card padding="md">
              <SmallText>중간 패딩 (md)</SmallText>
            </Card>
            <Card padding="lg">
              <SmallText>큰 패딩 (lg)</SmallText>
            </Card>
            <Card padding="xl">
              <SmallText>특대 패딩 (xl)</SmallText>
            </Card>
          </CardGrid>
        </SubSection>

        <SubSection>
          <Label>그림자 크기 비교</Label>
          <CardGrid>
            <Card shadow="none">
              <SmallText>그림자 없음</SmallText>
            </Card>
            <Card shadow="sm">
              <SmallText>작은 그림자</SmallText>
            </Card>
            <Card shadow="md">
              <SmallText>중간 그림자</SmallText>
            </Card>
            <Card shadow="lg">
              <SmallText>큰 그림자</SmallText>
            </Card>
          </CardGrid>
        </SubSection>

        <SubSection>
          <Label>인터랙티브 카드</Label>
          <CardGrid>
            <Card hoverable>
              <CardTitle>Hoverable 카드</CardTitle>
              <CardText>마우스를 올려보세요! 살짝 떠오릅니다.</CardText>
            </Card>
            <Card clickable hoverable onClick={() => alert("카드 클릭!")}>
              <CardTitle>Clickable 카드</CardTitle>
              <CardText>클릭해보세요! 이벤트가 발생합니다.</CardText>
            </Card>
          </CardGrid>
        </SubSection>

        <SubSection>
          <Label>카드 안에 버튼 넣기</Label>
          <Card>
            <CardTitle>질문 카드 예시</CardTitle>
            <CardText>
              최근 6개월 동안, 일을 마무리하는 데 어려움을 겪은 적이
              얼마나 자주 있었습니까?
            </CardText>
            <ButtonGroup style={{ marginTop: "1rem" }}>
              <Button size="sm" variant="outline">
                전혀 없음
              </Button>
              <Button size="sm" variant="outline">
                가끔
              </Button>
              <Button size="sm" variant="outline">
                자주
              </Button>
              <Button size="sm" variant="outline">
                매우 자주
              </Button>
            </ButtonGroup>
          </Card>
        </SubSection>
      </Section>

      {/* Radio 컴포넌트 */}
      <Section>
        <SectionTitle>Radio 컴포넌트 (선택지)</SectionTitle>

        <SubSection>
          <Label>기본 수평 레이아웃</Label>
          <RadioGroup
            name="demo1"
            value={selectedValue1}
            onChange={setSelectedValue1}
            direction="horizontal"
          >
            <RadioOption
              name="demo1"
              value="never"
              currentValue={selectedValue1}
              onChange={setSelectedValue1}
              label="전혀 없음"
            />
            <RadioOption
              name="demo1"
              value="sometimes"
              currentValue={selectedValue1}
              onChange={setSelectedValue1}
              label="가끔"
            />
            <RadioOption
              name="demo1"
              value="often"
              currentValue={selectedValue1}
              onChange={setSelectedValue1}
              label="자주"
            />
            <RadioOption
              name="demo1"
              value="always"
              currentValue={selectedValue1}
              onChange={setSelectedValue1}
              label="매우 자주"
            />
          </RadioGroup>
        
        </SubSection>

        <SubSection>
          <Label>수직 레이아웃 (전체 너비)</Label>
          <RadioGroup
            name="demo2"
            value={selectedValue2}
            onChange={setSelectedValue2}
            direction="vertical"
            fullWidth
          >
            <RadioOption
              name="demo2"
              value="strongly-disagree"
              currentValue={selectedValue2}
              onChange={setSelectedValue2}
              label="전혀 그렇지 않다"
              fullWidth
            />
            <RadioOption
              name="demo2"
              value="disagree"
              currentValue={selectedValue2}
              onChange={setSelectedValue2}
              label="그렇지 않다"
              fullWidth
            />
            <RadioOption
              name="demo2"
              value="neutral"
              currentValue={selectedValue2}
              onChange={setSelectedValue2}
              label="보통이다"
              fullWidth
            />
            <RadioOption
              name="demo2"
              value="agree"
              currentValue={selectedValue2}
              onChange={setSelectedValue2}
              label="그렇다"
              fullWidth
            />
            <RadioOption
              name="demo2"
              value="strongly-agree"
              currentValue={selectedValue2}
              onChange={setSelectedValue2}
              label="매우 그렇다"
              fullWidth
            />
          </RadioGroup>

        </SubSection>

        <SubSection>  
          <Label>크기 비교</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <SmallLabel>작은 크기 (sm)</SmallLabel>
              <RadioGroup name="size-sm" direction="horizontal">
                <RadioOption
                  name="size-sm"
                  value="1"
                  currentValue="1"
                  onChange={() => {}}
                  label="옵션 1"
                  size="sm"
                />
                <RadioOption
                  name="size-sm"
                  value="2"
                  currentValue="1"
                  onChange={() => {}}
                  label="옵션 2"
                  size="sm"
                />
                <RadioOption
                  name="size-sm"
                  value="3"
                  currentValue="1"
                  onChange={() => {}}
                  label="옵션 3"
                  size="sm"
                />
              </RadioGroup>
            </div>
            <div>
              <SmallLabel>중간 크기 (md)</SmallLabel>
              <RadioGroup name="size-md" direction="horizontal">
                <RadioOption
                  name="size-md"
                  value="1"
                  currentValue="2"
                  onChange={() => {}}
                  label="옵션 1"
                  size="md"
                />
                <RadioOption
                  name="size-md"
                  value="2"
                  currentValue="2"
                  onChange={() => {}}
                  label="옵션 2"
                  size="md"
                />
                <RadioOption
                  name="size-md"
                  value="3"
                  currentValue="2"
                  onChange={() => {}}
                  label="옵션 3"
                  size="md"
                />
              </RadioGroup>
            </div>
            <div>
              <SmallLabel>큰 크기 (lg)</SmallLabel>
              <RadioGroup name="size-lg" direction="horizontal">
                <RadioOption
                  name="size-lg"
                  value="1"
                  currentValue="3"
                  onChange={() => {}}
                  label="옵션 1"
                  size="lg"
                />
                <RadioOption
                  name="size-lg"
                  value="2"
                  currentValue="3"
                  onChange={() => {}}
                  label="옵션 2"
                  size="lg"
                />
                <RadioOption
                  name="size-lg"
                  value="3"
                  currentValue="3"
                  onChange={() => {}}
                  label="옵션 3"
                  size="lg"
                />
              </RadioGroup>
            </div>
          </div>
        </SubSection>

        <SubSection>
          <Label>비활성화 상태</Label>
          <RadioGroup name="disabled-demo" direction="horizontal">
            <RadioOption
              name="disabled-demo"
              value="1"
              currentValue="2"
              onChange={() => {}}
              label="정상"
            />
            <RadioOption
              name="disabled-demo"
              value="2"
              currentValue="2"
              onChange={() => {}}
              label="선택됨"
            />
            <RadioOption
              name="disabled-demo"
              value="3"
              currentValue="2"
              onChange={() => {}}
              label="비활성화"
              disabled
            />
          </RadioGroup>
        </SubSection>

        <SubSection>
          <Label>실제 설문 예시 (ASRS 질문)</Label>
          <Card padding="xl">
            <QuestionTitle>
              질문 1. 최근 6개월 동안, 일을 마무리하는 데 어려움을 겪은 적이
              얼마나 자주 있었습니까?
            </QuestionTitle>
            <RadioGroup
              name="demo3"
              value={selectedValue3}
              onChange={setSelectedValue3}
              direction="horizontal"
              fullWidth
            >
              <RadioOption
                name="demo3"
                value="0"
                currentValue={selectedValue3}
                onChange={setSelectedValue3}
                label="전혀 없음"
                fullWidth
              />
              <RadioOption
                name="demo3"
                value="1"
                currentValue={selectedValue3}
                onChange={setSelectedValue3}
                label="드물게"
                fullWidth
              />
              <RadioOption
                name="demo3"
                value="2"
                currentValue={selectedValue3}
                onChange={setSelectedValue3}
                label="가끔"
                fullWidth
              />
              <RadioOption
                name="demo3"
                value="3"
                currentValue={selectedValue3}
                onChange={setSelectedValue3}
                label="자주"
                fullWidth
              />
              <RadioOption
                name="demo3"
                value="4"
                currentValue={selectedValue3}
                onChange={setSelectedValue3}
                label="매우 자주"
                fullWidth
              />
            </RadioGroup>
          </Card>
        </SubSection>

        <SubSection>
          <Label>카드와 결합 (수직 레이아웃)</Label>
          <Card padding="xl">
            <QuestionTitle>
              질문 2. 다음 중 당신의 의견은 무엇입니까?
            </QuestionTitle>
            <RadioGroup
              name="demo4"
              value={selectedValue4}
              onChange={setSelectedValue4}
              direction="vertical"
              fullWidth
            >
              <RadioOption
                name="demo4"
                value="strongly-disagree"
                currentValue={selectedValue4}
                onChange={setSelectedValue4}
                label="전혀 그렇지 않다"
                fullWidth
              />
              <RadioOption
                name="demo4"
                value="disagree"
                currentValue={selectedValue4}
                onChange={setSelectedValue4}
                label="그렇지 않다"
                fullWidth
              />
              <RadioOption
                name="demo4"
                value="neutral"
                currentValue={selectedValue4}
                onChange={setSelectedValue4}
                label="보통이다"
                fullWidth
              />
              <RadioOption
                name="demo4"
                value="agree"
                currentValue={selectedValue4}
                onChange={setSelectedValue4}
                label="그렇다"
                fullWidth
              />
              <RadioOption
                name="demo4"
                value="strongly-agree"
                currentValue={selectedValue4}
                onChange={setSelectedValue4}
                label="매우 그렇다"
                fullWidth
              />
            </RadioGroup>
          </Card>
        </SubSection>
      </Section>

      {/* ProgressBar 컴포넌트 */}
      <Section>
        <SectionTitle>ProgressBar 컴포넌트</SectionTitle>

        <SubSection>
          <Label>기본 진행 바 (퍼센트)</Label>
          <ProgressBar percentage={0} />
          <ProgressBar percentage={25} />
          <ProgressBar percentage={50} />
          <ProgressBar percentage={75} />
          <ProgressBar percentage={100} />
        </SubSection>

        <SubSection>
          <Label>스텝 기반 진행 바 (설문용)</Label>
          <ProgressBar current={progress} total={totalSteps} />
          <ButtonGroup style={{ marginTop: "1rem" }}>
            <Button
              size="sm"
              onClick={() => setProgress(Math.max(0, progress - 1))}
              disabled={progress === 0}
            >
              이전
            </Button>
            <Button
              size="sm"
              onClick={() => setProgress(Math.min(totalSteps, progress + 1))}
              disabled={progress === totalSteps}
            >
              다음
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress(0)}
            >
              초기화
            </Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>크기 비교</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <SmallLabel>작은 크기 (sm)</SmallLabel>
              <ProgressBar percentage={60} size="sm" />
            </div>
            <div>
              <SmallLabel>중간 크기 (md)</SmallLabel>
              <ProgressBar percentage={60} size="md" />
            </div>
            <div>
              <SmallLabel>큰 크기 (lg)</SmallLabel>
              <ProgressBar percentage={60} size="lg" />
            </div>
          </div>
        </SubSection>

        <SubSection>
          <Label>색상 변형</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <SmallLabel>Primary (기본)</SmallLabel>
              <ProgressBar percentage={70} variant="primary" />
            </div>
            <div>
              <SmallLabel>Accent (강조)</SmallLabel>
              <ProgressBar percentage={70} variant="accent" />
            </div>
            <div>
              <SmallLabel>Success (완료)</SmallLabel>
              <ProgressBar percentage={70} variant="success" />
            </div>
          </div>
        </SubSection>

        <SubSection>
          <Label>라벨 위치</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <SmallLabel>위쪽 (top)</SmallLabel>
              <ProgressBar
                current={4}
                total={10}
                labelPosition="top"
              />
            </div>
            <div>
              <SmallLabel>아래쪽 (bottom)</SmallLabel>
              <ProgressBar
                current={4}
                total={10}
                labelPosition="bottom"
              />
            </div>
            <div>
              <SmallLabel>내부 (inside)</SmallLabel>
              <ProgressBar
                current={4}
                total={10}
                size="lg"
                labelPosition="inside"
              />
            </div>
          </div>
        </SubSection>

        <SubSection>
          <Label>라벨 형식</Label>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <SmallLabel>분수 형식 (3 / 6)</SmallLabel>
              <ProgressBar
                current={3}
                total={6}
                labelFormat="fraction"
              />
            </div>
            <div>
              <SmallLabel>퍼센트 형식 (50%)</SmallLabel>
              <ProgressBar
                current={3}
                total={6}
                labelFormat="percent"
              />
            </div>
            <div>
              <SmallLabel>커스텀 라벨</SmallLabel>
              <ProgressBar
                percentage={65}
                customLabel="질문 4 / 6"
              />
            </div>
          </div>
        </SubSection>

        <SubSection>
          <Label>줄무늬 패턴 (애니메이션)</Label>
          <ProgressBar
            percentage={60}
            striped
            animated
            size="lg"
          />
        </SubSection>

        <SubSection>
          <Label>라벨 없는 버전</Label>
          <ProgressBar
            percentage={45}
            showLabel={false}
          />
        </SubSection>

        <SubSection>
          <Label>실제 설문 예시</Label>
          <Card padding="xl">
            <QuestionTitle>
              질문 {progress} / {totalSteps}
            </QuestionTitle>
            <ProgressBar
              current={progress}
              total={totalSteps}
              variant="primary"
              size="md"
              labelFormat="fraction"
            />
            <div style={{ marginTop: "1.5rem" }}>
              <QuestionText>
                최근 6개월 동안, 일을 마무리하는 데 어려움을 겪은 적이
                얼마나 자주 있었습니까?
              </QuestionText>
              <RadioGroup
                name="demo-progress"
                direction="horizontal"
                fullWidth
                style={{ marginTop: "1rem" }}
              >
                <RadioOption
                  name="demo-progress"
                  value="0"
                  currentValue={null}
                  onChange={() => {}}
                  label="전혀 없음"
                  fullWidth
                />
                <RadioOption
                  name="demo-progress"
                  value="1"
                  currentValue={null}
                  onChange={() => {}}
                  label="드물게"
                  fullWidth
                />
                <RadioOption
                  name="demo-progress"
                  value="2"
                  currentValue={null}
                  onChange={() => {}}
                  label="가끔"
                  fullWidth
                />
                <RadioOption
                  name="demo-progress"
                  value="3"
                  currentValue={null}
                  onChange={() => {}}
                  label="자주"
                  fullWidth
                />
              </RadioGroup>
            </div>
            <ButtonGroup style={{ marginTop: "1.5rem" }}>
              <Button
                variant="outline"
                onClick={() => setProgress(Math.max(1, progress - 1))}
                disabled={progress === 1}
              >
                이전
              </Button>
              <Button
                onClick={() => setProgress(Math.min(totalSteps, progress + 1))}
                disabled={progress === totalSteps}
              >
                {progress === totalSteps ? "완료" : "다음"}
              </Button>
            </ButtonGroup>
          </Card>
        </SubSection>
      </Section>

      {/* Stepper 컴포넌트 */}
      <Section>
        <SectionTitle>Stepper 컴포넌트 (단계별 진행)</SectionTitle>

        <SubSection>
          <Label>기본 Stepper (4단계)</Label>
          <Stepper currentStep={currentStep} steps={testSteps} />
          <ButtonGroup style={{ marginTop: "1.5rem" }}>
            <Button
              size="sm"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              이전
            </Button>
            <Button
              size="sm"
              onClick={() =>
                setCurrentStep(Math.min(testSteps.length - 1, currentStep + 1))
              }
              disabled={currentStep === testSteps.length - 1}
            >
              다음
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentStep(0)}
            >
              초기화
            </Button>
          </ButtonGroup>
        </SubSection>

        <SubSection>
          <Label>설명 없는 간단한 버전</Label>
          <Stepper
            currentStep={1}
            steps={[
              { label: "정보 입력" },
              { label: "설문 응답" },
              { label: "결과 확인" },
            ]}
          />
        </SubSection>

        <SubSection>
          <Label>Accent 색상</Label>
          <Stepper
            currentStep={2}
            steps={[
              { label: "Step 1" },
              { label: "Step 2" },
              { label: "Step 3" },
              { label: "Step 4" },
            ]}
            variant="accent"
          />
        </SubSection>

        <SubSection>
          <Label>클릭 가능한 Stepper</Label>
          <Stepper
            currentStep={currentStep}
            steps={testSteps}
            clickable
            onStepClick={(index) => setCurrentStep(index)}
          />
          <SmallText style={{ marginTop: "1rem", textAlign: "center" }}>
            💡 각 단계를 클릭해보세요!
          </SmallText>
        </SubSection>

        <SubSection>
          <Label>수직 레이아웃</Label>
          <div style={{ maxWidth: "300px" }}>
            <Stepper
              currentStep={1}
              steps={[
                { label: "회원가입", description: "계정 생성" },
                { label: "본인인증", description: "신원 확인" },
                { label: "추가정보", description: "프로필 작성" },
                { label: "완료", description: "가입 완료" },
              ]}
              orientation="vertical"
            />
          </div>
        </SubSection>

        <SubSection>
          <Label>실제 설문 예시 (ADHD 검사 프로세스)</Label>
          <Card padding="xl">
            <div style={{ marginBottom: "2rem" }}>
              <Stepper
                currentStep={currentStep}
                steps={testSteps}
                variant="primary"
              />
            </div>

            <QuestionTitle>
              {testSteps[currentStep].label} - {testSteps[currentStep].description}
            </QuestionTitle>

            <QuestionText style={{ marginBottom: "1.5rem" }}>
              {currentStep === 0 &&
                "최근 6개월 동안의 증상에 대해 질문드립니다. 각 문항에 솔직하게 답변해 주세요."}
              {currentStep === 1 &&
                "일상생활에서의 기능과 패턴에 대해 알려주세요."}
              {currentStep === 2 &&
                "어린 시절(12세 이전)의 증상에 대해 회상해 주세요."}
              {currentStep === 3 &&
                "집중력 테스트를 진행합니다. 화면에 나타나는 글자를 주의 깊게 관찰해 주세요."}
            </QuestionText>

            <ProgressBar
              current={currentStep + 1}
              total={testSteps.length}
              variant="primary"
              size="sm"
              labelFormat="fraction"
              style={{ marginBottom: "1.5rem" }}
            />

            {currentStep < 3 && (
              <RadioGroup name="demo-stepper" direction="vertical" fullWidth>
                <RadioOption
                  name="demo-stepper"
                  value="1"
                  currentValue={null}
                  onChange={() => {}}
                  label="전혀 그렇지 않다"
                  fullWidth
                />
                <RadioOption
                  name="demo-stepper"
                  value="2"
                  currentValue={null}
                  onChange={() => {}}
                  label="가끔 그렇다"
                  fullWidth
                />
                <RadioOption
                  name="demo-stepper"
                  value="3"
                  currentValue={null}
                  onChange={() => {}}
                  label="자주 그렇다"
                  fullWidth
                />
              </RadioGroup>
            )}

            {currentStep === 3 && (
              <div
                style={{
                  padding: "3rem",
                  background: "#f8f9fa",
                  borderRadius: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "#4A4A4A",
                  }}
                >
                  X
                </div>
                <SmallText style={{ marginTop: "1rem" }}>
                  X가 나타나면 키를 눌러주세요
                </SmallText>
              </div>
            )}

            <ButtonGroup style={{ marginTop: "1.5rem" }}>
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                이전 단계
              </Button>
              <Button
                onClick={() =>
                  setCurrentStep(
                    Math.min(testSteps.length - 1, currentStep + 1)
                  )
                }
                disabled={currentStep === testSteps.length - 1}
              >
                {currentStep === testSteps.length - 1 ? "완료" : "다음 단계"}
              </Button>
            </ButtonGroup>
          </Card>
        </SubSection>
      </Section>

      {/* 여기에 다른 컴포넌트들 추가 예정 */}
    </Container>
  );
}

export default ComponentDemo;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.background.secondary};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["4xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  text-align: center;
`;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
`;

const SubSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const SmallText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin: 0;
`;



const QuestionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SmallLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const QuestionText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

