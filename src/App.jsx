import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layout/RootLayout";
import BotApi from "./pages/Bot";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<RootLayout />} />
        <Route exact path="transcription" element={<Dashboard />} />
        <Route exact path="botapi" element={<BotApi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
