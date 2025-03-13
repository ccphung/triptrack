import CreateExpense from './pages/CreateExpense';
import Homepage from './pages/Homepage';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import History from './pages/History';
import MapView from './components/MapView';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="new-expense" element={<CreateExpense />} />
        <Route path="history" element={<History />} />
        <Route path="map" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
