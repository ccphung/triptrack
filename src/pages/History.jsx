import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Plus, Trash, X } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { useScreenWidth } from '../hooks/useScreenWidth';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import MapView from '../components/MapView';
import HistoryList from '../components/HistoryList';
import Chart from '../components/Chart';
import {
  deleteExpense,
  deleteExpensesByTravelId,
} from '../slices/expenseSlice';
import { deleteTravel } from '../slices/travelSlice';
import { getExpenses, getTravels } from '../store';

function History() {
  const [showConfirmTravelDelete, setShowConfirmTravelDelete] = useState(false);
  const [showConfirmExpenseDelete, setShowConfirmExpenseDelete] =
    useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [mapPositions, setMapPositions] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [position, setPosition] = useState([]);
  const [showHistory, setShowHistory] = useState(true);

  const { travelId } = useParams();
  const navigate = useNavigate();

  const expenses = useSelector(getExpenses);
  const travels = useSelector(getTravels);

  const currentTravel = travels.filter((travel) => travel.id === travelId);
  const expensesByTravel = expenses.filter(
    (expense) => expense.travelId === travelId,
  );

  function handleDelete() {
    setShowConfirmTravelDelete(true);
  }

  const windownWidth = useScreenWidth();

  const zoomMap = windownWidth < 960 ? 12 : 6;

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center ${
          showConfirmTravelDelete || showConfirmExpenseDelete ? 'blur-md' : ''
        } m-5 flex flex-col items-center`}
      >
        <div className="w-[100%] max-w-[1048px] xl:w-[80%]">
          <div className="rounded-lg bg-violet-400 p-1 text-center">
            <h1 className="bordertext-center mb-2 mt-5 rounded-lg text-[1.5em] text-stone-100">
              {currentTravel[0].title}
            </h1>
            <Chart />
            {expensesByTravel.length === 0 && (
              <p className="text-center text-lg text-stone-100">
                Commencez par ajouter une nouvelle dépense
              </p>
            )}
            <h2 className="my-2 text-center text-[2em]">
              {formatCurrency(
                expensesByTravel.reduce((total, expense) => {
                  const expenseInEur =
                    expense.selectedCurrency !== 'EUR'
                      ? expense.price / expense.exchangeRate
                      : expense.price;
                  return total + Number(expenseInEur);
                }, 0),
                'EUR',
              )}
            </h2>

            <div className="flex items-center justify-between">
              <button
                className="input mb-2 flex w-[14em] items-center hover:bg-slate-100"
                onClick={() => navigate(`new-expense`)}
              >
                <Plus /> Nouvelle dépense
              </button>

              <button
                className="flex w-[14em] items-center justify-center text-sm text-stone-700 hover:underline"
                onClick={handleDelete}
              >
                <Trash className="w-3" /> Supprimer ce voyage
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {showHistory && (
              <HistoryList
                setIsMapOpen={setIsMapOpen}
                setPosition={setPosition}
                setMapPositions={setMapPositions}
                mapPositions={mapPositions}
                setShowConfirmExpenseDelete={setShowConfirmExpenseDelete}
                setExpenseToDelete={setExpenseToDelete}
                setShowHistory={setShowHistory}
              />
            )}
            <div className="lt-8 relative mt-8">
              {isMapOpen && (
                <>
                  <div className="relative">
                    <MapView
                      position={position}
                      mapPositions={mapPositions}
                      expenses={expensesByTravel}
                      setMapPositions={setMapPositions}
                      setPosition={setPosition}
                      zoomMap={zoomMap}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setIsMapOpen(false);
                      setShowHistory(true);
                    }}
                    className="absolute right-[10%] top-[5%] z-[1000] flex items-center justify-center rounded-full p-1 text-xl hover:bg-violet-400 hover:text-slate-100"
                  >
                    <X />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showConfirmTravelDelete && (
        <Modal
          onClose={() => setShowConfirmTravelDelete(false)}
          id={travelId}
          actions={[deleteTravel, deleteExpensesByTravelId]}
          url="/"
        />
      )}
      {showConfirmExpenseDelete && (
        <Modal
          onClose={() => setShowConfirmExpenseDelete(false)}
          id={expenseToDelete}
          actions={[deleteExpense]}
        />
      )}
    </>
  );
}

export default History;
