import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import theme from "@styles/theme";
import { ROUTES } from "@constants/routes";

// Demo Pages
import ComponentDemo from "@pages/ComponentDemo";
import StyleGuidePage from "@pages/StyleGuidePage";
import TypographyDemo from "@pages/TypographyDemo";

// Pages (나중에 생성될 예정)
// import Landing from "@pages/Landing/Landing";
// import Login from "@pages/Auth/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* 개발용 페이지 */}
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="/typography" element={<TypographyDemo />} />
          <Route path="/demo" element={<ComponentDemo />} />
          
          <Route path="/" element={<div>홈 페이지 (준비중)</div>} />
          {/* 페이지 컴포넌트 생성 후 추가 예정 */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

