import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import theme from "@styles/theme";
import { ROUTES } from "@constants/routes";

// Demo Pages
import ComponentDemo from "@pages/ComponentDemo";
import StyleGuidePage from "@pages/StyleGuidePage";
import TypographyDemo from "@pages/TypographyDemo";

// Pages
import Landing from "@pages/Landing/Landing";
import AsrsIntro from "@pages/Asrs/AsrsIntro";
import AsrsTest from "@pages/Asrs/AsrsTest";
import AsrsComplete from "@pages/Asrs/AsrsComplete";
import ImpairmentTest from "@pages/Impairment/ImpairmentTest";
import ImpairmentComplete from "@pages/Impairment/ImpairmentComplete";
import WursIntro from "@pages/Wurs/WursIntro";
import WursTest from "@pages/Wurs/WursTest";
import WursComplete from "@pages/Wurs/WursComplete";
import Result from "@pages/Result/Result";
import ResultDebug from "@pages/Result/ResultDebug";
import Hospital from "@pages/Hospital/Hospital";
// import Login from "@pages/Auth/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Landing />} />

          {/* ASRS 설문 (1단계: 현재 증상) */}
          <Route path="/asrs/intro" element={<AsrsIntro />} />
          <Route path="/asrs/test" element={<AsrsTest />} />
          <Route path="/asrs/complete" element={<AsrsComplete />} />

          {/* 기능 저하 평가 (2단계) */}
          <Route path="/impairment/test" element={<ImpairmentTest />} />
          <Route path="/impairment/complete" element={<ImpairmentComplete />} />

          {/* WURS 설문 (3단계: 과거 증상) */}
          <Route path="/wurs/intro" element={<WursIntro />} />
          <Route path="/wurs/test" element={<WursTest />} />
          <Route path="/wurs/complete" element={<WursComplete />} />

          {/* 결과 및 병원 찾기 */}
          <Route path="/result" element={<Result />} />
          <Route path="/result-debug" element={<ResultDebug />} />
          <Route path="/hospital" element={<Hospital />} />

          {/* 개발용 페이지 */}
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="/typography" element={<TypographyDemo />} />
          <Route path="/demo" element={<ComponentDemo />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

