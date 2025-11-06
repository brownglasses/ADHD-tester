import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@styles/GlobalStyles";
import theme from "@styles/theme";
import { ROUTES } from "@constants/routes";

// Pages (나중에 생성될 예정)
// import Landing from "@pages/Landing/Landing";
// import Login from "@pages/Auth/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>홈 페이지 (준비중)</div>} />
          {/* 페이지 컴포넌트 생성 후 추가 예정 */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

