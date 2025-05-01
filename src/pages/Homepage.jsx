import { useSelector } from 'react-redux';
import TravelItem from '../components/TravelItem';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getTravels, getExpenses } from '../store';

function Homepage() {
  const navigate = useNavigate();
  const travels = useSelector(getTravels);
  const expenses = useSelector(getExpenses);

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-[1048px] flex-col justify-center">
        <div className="rounded-lg bg-violet-400 px-3 py-5 text-center">
          <h1 className="bordertext-center mb-2 mt-5 rounded-lg text-[1.5em] text-stone-100">
            Mes voyages
          </h1>
          <button
            className="input mx-auto mt-5 flex w-[14em] items-center py-2 hover:bg-slate-100"
            onClick={() => navigate('/new-travel')}
          >
            <Plus /> Nouveau voyage
          </button>
        </div>

        <div className="mx-4 mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {travels
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => {
              const expensesByTravel = expenses.filter(
                (expense) => String(expense.travelId) === String(item.id),
              );
              return (
                <TravelItem
                  className="relative"
                  key={item.id}
                  item={item}
                  expenses={expensesByTravel}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
