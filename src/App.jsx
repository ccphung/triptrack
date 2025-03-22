import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import CreateExpense from './pages/CreateExpense';
import Homepage from './pages/Homepage';
import CreateTravel from './pages/CreateTravel';
import Error from './pages/Error';

import History from './pages/History';
import MapView from './components/MapView';
import Navbar from './components/Navbar';

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
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
