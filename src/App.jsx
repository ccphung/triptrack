import CreateExpense from './pages/CreateExpense';
import Homepage from './pages/Homepage';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import History from './pages/History';
import MapView from './components/MapView';
import Navbar from './components/Navbar';
import CreateTravel from './pages/CreateTravel';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new-travel" element={<CreateTravel />} />
        <Route path="/travel/:travelId" element={<History />} />
        <Route
          path="/travel/:travelId/new-expense"
          element={<CreateExpense />}
        />
        <Route path="map" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
