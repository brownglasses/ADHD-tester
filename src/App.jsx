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
import AsrsIntroOld from "@pages/Asrs/AsrsIntro";
import AsrsIntroViral from "@pages/Asrs/AsrsIntroViral";
import AsrsTest from "@pages/Asrs/AsrsTest";
import AsrsComplete from "@pages/Asrs/AsrsComplete";
import ImpairmentTest from "@pages/Impairment/ImpairmentTest";
import ImpairmentComplete from "@pages/Impairment/ImpairmentComplete";
import WursIntroOld from "@pages/Wurs/WursIntro";
import WursIntroViral from "@pages/Wurs/WursIntroViral";
import WursTest from "@pages/Wurs/WursTest";
import WursComplete from "@pages/Wurs/WursComplete";
import ResultOld from "@pages/Result/Result";
import ResultViral from "@pages/Result/ResultViral";
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
          <Route path="/asrs/intro" element={<AsrsIntroViral />} />
          <Route path="/asrs/intro-old" element={<AsrsIntroOld />} />
          <Route path="/asrs/test" element={<AsrsTest />} />
          <Route path="/asrs/complete" element={<AsrsComplete />} />

          {/* 기능 저하 평가 (2단계) */}
          <Route path="/impairment/test" element={<ImpairmentTest />} />
          <Route path="/impairment/complete" element={<ImpairmentComplete />} />

          {/* WURS 설문 (3단계: 과거 증상) */}
          <Route path="/wurs/intro" element={<WursIntroViral />} />
          <Route path="/wurs/intro-old" element={<WursIntroOld />} />
          <Route path="/wurs/test" element={<WursTest />} />
          <Route path="/wurs/complete" element={<WursComplete />} />

          {/* 결과 및 병원 찾기 */}
          <Route path="/result" element={<ResultViral />} />
          <Route path="/result-old" element={<ResultOld />} />
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

