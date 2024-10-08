import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Searchcoin from './components/Searchcoin';
import CardDetail from './components/CardDetail';

export default function App() {
  return (
    <Router>
      <main className="bg-gray-900 mt-16 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Searchcoin />} />
          <Route path="/detail" element={<CardDetail />} />
        </Routes>
      </main>
    </Router>
  );
}
