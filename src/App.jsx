import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import {Footer} from "./components/Footer"
import Home from './pages/Home';
import CreateStickerSheet from './pages/CreateStickerSheet';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="pt-16 pb-10 min-h-screen bg-pink-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateStickerSheet />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;