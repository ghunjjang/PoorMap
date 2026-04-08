import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import MapPage from './pages/MapPage';
import CommunityPage from './pages/CommunityPage';
import DealsPage from './pages/DealsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app" id="app-root">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
