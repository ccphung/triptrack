// Utiliser format currency de fast react pizza

import { useSelector } from 'react-redux';
import { getExpenses } from '../store';
import { useState } from 'react';
import MapView from '../components/MapView';

function History() {
  const expense = useSelector(getExpenses);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [position, setPosition] = useState([]);

  function handleOpenMap(item) {
    setIsMapOpen(true);
    setPosition([item.lat, item.lng]);
    console.log(item.position);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-2 text-violet-800">Historique</h1>
      <div className="flex">
        <div className="max-w-[1048px]">
          {expense.map((item, index) => (
            <div key={index}>
              <div className="mb-2 flex w-[400px] flex-col overflow-hidden whitespace-nowrap bg-slate-200 px-4 py-2">
                <div>
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="text-sm text-stone-500">
                        {item.date} à {item.cityName}
                      </p>
                      <img
                        className="w-5"
                        src={`https://flagsapi.com/${item.countryCode}/flat/64.png`}
                        alt="flag"
                      />
                    </div>

                    <div className="ju flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-500">
                          {item.category.emoji}
                        </p>
                        <p>{item.title}</p>
                      </div>
                      <p className="text-xl font-semibold"> {item.price} €</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {item.note && (
                      <p className="ml-2 text-sm text-stone-800">
                        Note: <span className="p-2 italic">{item.note}</span>
                      </p>
                    )}
                  </div>{' '}
                  <div className="flex items-center justify-center">
                    <button
                      className="mt-3 bg-violet-500 px-4 py-2 text-sm text-slate-100 transition-colors duration-100"
                      onClick={() => handleOpenMap(item)}
                    >
                      Voir sur la map
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          {isMapOpen && (
            <>
              <div className="relative">
                <MapView position={position} zoom={12} />
              </div>
              <button
                onClick={() => setIsMapOpen(false)}
                className="absolute right-[10%] top-[5%] z-[1000] flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-stone-100 hover:bg-violet-500"
              >
                X
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
