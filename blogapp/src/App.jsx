import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home.jsx";
import Blog from "./page/Blog/Blog.jsx";
import DeVs from "./page/DeVs/DeVs.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/deVs" element={<DeVs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
