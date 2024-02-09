import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layout/RootLayout";
import BotApi from "./pages/Bot";
import RealTimeTranscriptions from "./components/RealTimeTranscriptions";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/DesignLayouts/Footer";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/4df78f2cd73d6b26.css'
import './css/9de8ffd37fa1f51c.css'
import './css/ae0f6b176f8a446a.css'
import './css/e8cbe8880d17257b.css'


function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>

        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<RootLayout />} />
        <Route exact path="/transcription" element={<Dashboard />} />
        <Route exact path="/botapi" element={<BotApi />} />
        <Route exact path="/realtimetranscriptions" element={<RealTimeTranscriptions />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
