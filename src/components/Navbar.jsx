'use client';

import { LuggageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <h1 className="my-5 flex items-center justify-center text-3xl text-violet-800">
      <button className="flex items-center" onClick={() => navigate('/')}>
        TripTrack
        <LuggageIcon />
      </button>
    </h1>
  );
}

export default Navbar;
