import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import News from './pages/News';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-amber-50">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/program" element={<Programs />} />
          <Route path="/galeri" element={<Gallery />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/berita" element={<News />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;