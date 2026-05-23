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
import Donation from './pages/Donation';
import DonationDetail from './pages/DonationDetail';
import DonationGuide from './pages/DonationGuide';
import LegalPage from './pages/LegalPage';
import PaymentInstruction from './pages/PaymentInstruction';

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
          <Route path="/donasi" element={<Donation />} />
          <Route path="/cara-berdonasi" element={<DonationGuide />} />
          <Route path="/donasi/:slug" element={<DonationDetail />} />
          <Route path="/payment/:orderId" element={<PaymentInstruction />} />
          <Route path="/syarat-ketentuan" element={<LegalPage type="terms" />} />
          <Route path="/kebijakan-privasi" element={<LegalPage type="privacy" />} />
          <Route path="/kebijakan-pengembalian-dana" element={<LegalPage type="refund" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
