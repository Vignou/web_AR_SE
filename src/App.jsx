import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import DashBoardPage from "./Pages/DashBoardPage";
import AboutUsPage from "./Pages/AboutUsPage";
import CreateARPage from "./Pages/CreateARPage";
import ARObjectsPage from "./Pages/ARObjectsPage";
import Signup from "./Pages/Signup";
import MakeARPage from "./Pages/MakeARPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/create" element={<CreateARPage />} />
          <Route path="/make" element={<MakeARPage />} />
          <Route path="/arobjects" element={<ARObjectsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
