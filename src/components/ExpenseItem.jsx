import {
  CarTaxiFront,
  FileQuestion,
  Gamepad,
  PizzaIcon,
  ShoppingBagIcon,
  X,
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExpenses } from '../store';
import { useScreenWidth } from '../hooks/useScreenWidth';

function ExpenseItem({
  item,
  setIsMapOpen,
  setPosition,
  selectedId,
  setSelectedId,
  setMapPositions,
  setExpenseToDelete,
  setShowConfirmExpenseDelete,
  setShowHistory,
}) {
  const { travelId } = useParams();
  const expenses = useSelector(getExpenses);

  const expensesByTravel = expenses.filter(
    (expense) => expense.travelId === travelId,
  );

  const windowWidth = useScreenWidth();

  function handleOpenMap(item) {
    setIsMapOpen(true);
    setPosition([item.lat, item.lng]);
    setSelectedId(item.id);
    setMapPositions(
      expensesByTravel.map((expense) => [expense.lat, expense.lng]),
    );
    if (windowWidth < 960) setShowHistory(false);
  }

  return (
    <div>
      <div key={item.date + item.title} className="relative bg-slate-100 p-4">
        <button onClick={() => handleOpenMap(item)}>
          <div
            className={`mx-2 w-[17rem] overflow-hidden whitespace-nowrap rounded-lg bg-slate-50 py-2 shadow-lg ${item.id === selectedId ? 'border-r-4 border-r-green-500' : ''}`}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                {item.category === 'Restauration' && (
                  <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-slate-50">
                    <PizzaIcon className="w-8" />
                  </div>
                )}
                {item.category === 'Shopping' && (
                  <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-pink-700 text-slate-50">
                    <ShoppingBagIcon className="w-8" />
                  </div>
                )}
                {item.category === 'Transport' && (
                  <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-slate-50">
                    <CarTaxiFront className="w-8" />
                  </div>
                )}
                {item.category === 'Activité' && (
                  <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-600 text-slate-50">
                    <Gamepad className="w-8" />
                  </div>
                )}
                {item.category === 'Autre' && (
                  <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-slate-50">
                    <FileQuestion className="w-8" />
                  </div>
                )}
                <div className="flex flex-col items-start justify-center">
                  <p>{item.title}</p>
                  <div className="flex">
                    <p className="text-sm text-stone-500">{item.cityName}</p>
                    <img
                      className="ml-2 w-5"
                      src={`https://flagsapi.com/${item.countryCode}/flat/64.png`}
                      alt="flag"
                    />
                  </div>
                </div>
              </div>

              {item.currency === 'EUR' && item.selectedCurrency === 'EUR' && (
                <p>{formatCurrency(item.price, 'EUR')}</p>
              )}

              {item.currency !== 'EUR' && (
                <div className="flex flex-col items-end justify-end">
                  {item.selectedCurrency === 'EUR' && (
                    <p>{formatCurrency(item.price, 'EUR')} </p>
                  )}

                  {item.selectedCurrency !== 'EUR' && (
                    <p>
                      {formatCurrency(
                        item.price / item.exchangeRate,
                        'EUR',
                      )}{' '}
                    </p>
                  )}

                  {item.selectedCurrency !== 'EUR' && (
                    <p className="text-sm text-stone-500">
                      {formatCurrency(item.price, item.selectedCurrency)}
                    </p>
                  )}
                  {item.selectedCurrency === 'EUR' && (
                    <p className="text-sm text-stone-500">
                      {formatCurrency(
                        item.price * item.exchangeRate,
                        item.currency,
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
            {item.note && (
              <p className="mb-5 ml-2 text-start text-sm text-stone-800">
                Note: <span className="p-2 italic">{item.note}</span>
              </p>
            )}
          </div>
        </button>
        <button
          className="absolute right-8"
          onClick={() => {
            setExpenseToDelete(item.id);
            setShowConfirmExpenseDelete(true);
          }}
        >
          <X className="w-5 text-stone-500" />
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
