import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getDates, getExpenses } from '../store';

import { formatCurrency, formatDate, formatDateHuman } from '../utils/helpers';
import ExpenseItem from './ExpenseItem';

function HistoryList({
  setIsMapOpen,
  setPosition,
  setMapPositions,
  setShowConfirmExpenseDelete,
  setExpenseToDelete,
  setShowHistory,
}) {
  const [selectedId, setSelectedId] = useState('');
  const { travelId } = useParams();

  const expenses = useSelector(getExpenses);
  const expensesByTravel = expenses.filter(
    (expense) => expense.travelId === travelId,
  );

  const dates = useSelector(getDates);
  return (
    <div className="flex">
      <div className="xl:overflow-scroll">
        {dates.map((expenseDate) => {
          const expensesByDate = expensesByTravel.filter(
            (expense) => formatDate(expense.date) === formatDate(expenseDate),
          );

          if (expensesByDate.length === 0) return null;

          return (
            <div key={expenseDate} className="mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  {formatDate(expenseDate) === formatDate(new Date())
                    ? "Aujourd'hui"
                    : formatDateHuman(expenseDate)}
                </h2>

                <p className="text-lg font-semibold">
                  {formatCurrency(
                    expensesByDate.reduce((total, expense) => {
                      const expenseInEur =
                        expense.selectedCurrency !== 'EUR'
                          ? expense.price / expense.exchangeRate
                          : expense.price;
                      return total + Number(expenseInEur);
                    }, 0),
                    'EUR',
                  )}
                </p>
              </div>

              {expensesByDate
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => (
                  <ExpenseItem
                    key={item.id}
                    item={item}
                    setIsMapOpen={setIsMapOpen}
                    setPosition={setPosition}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setMapPositions={setMapPositions}
                    setExpenseToDelete={setExpenseToDelete}
                    setShowConfirmExpenseDelete={setShowConfirmExpenseDelete}
                    setShowHistory={setShowHistory}
                  />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoryList;
