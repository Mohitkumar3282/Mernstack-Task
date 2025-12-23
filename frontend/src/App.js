import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyDetail from "./pages/CompanyDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
