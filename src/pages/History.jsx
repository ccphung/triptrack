import { useSelector } from 'react-redux';
import { getDates, getExpenses } from '../store';
import { useState } from 'react';
import MapView from '../components/MapView';
import { formatDate, formatDateHuman } from '../utils/helpers';

function History() {
  const expenses = useSelector(getExpenses);
  const dates = useSelector(getDates);
  const formattedToday = formatDate(new Date());

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
          {dates.map((expenseDate) => (
            <div key={expenseDate} className="mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  {expenseDate === formattedToday
                    ? "Aujourd'hui"
                    : formatDateHuman(expenseDate)}
                </h2>

                <p className="text-lg font-semibold">
                  {expenses
                    .filter((expense) => expense.date === expenseDate)
                    .reduce(
                      (total, expense) => total + Number(expense.price),
                      0,
                    )}{' '}
                  EUR
                </p>
              </div>

              {expenses
                .filter((expense) => expense.date === expenseDate)
                .map((item) => (
                  <div
                    key={item.date + item.title}
                    className="bg-stone-100 p-4"
                  >
                    <div className="mb-2 w-[400px] overflow-hidden whitespace-nowrap bg-slate-200 px-4 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-500">
                            {item.category.emoji}
                          </p>
                          <p>
                            {item.title}{' '}
                            <div className="flex">
                              <p className="text-sm text-stone-500">
                                {item.cityName}
                              </p>
                              <img
                                className="ml-2 w-5"
                                src={`https://flagsapi.com/${item.countryCode}/flat/64.png`}
                                alt="flag"
                              />
                            </div>
                          </p>
                        </div>
                        <p>
                          {item.price} {item.selectedCurrency}
                        </p>
                      </div>
                      {item.note && (
                        <p className="ml-2 text-sm text-stone-800">
                          Note: <span className="p-2 italic">{item.note}</span>
                        </p>
                      )}
                      <div className="flex justify-center">
                        <button
                          className="mt-3 bg-violet-500 px-4 py-2 text-sm text-slate-100 transition-colors duration-100"
                          onClick={() => handleOpenMap(item)}
                        >
                          Voir sur la carte
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                className="absolute right-[10%] top-[5%] z-[1000] flex h-6 w-6 items-center justify-center rounded-full bg-violet-800 text-stone-100 hover:bg-violet-800"
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
