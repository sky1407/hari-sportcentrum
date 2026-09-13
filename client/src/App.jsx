import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VenuePage from './pages/VenuePage';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0f14] font-sans text-white antialiased">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/:slug" element={<VenuePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
