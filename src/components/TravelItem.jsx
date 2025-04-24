import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDateHuman } from '../utils/helpers';
import { Calendar, LucideBanknote, Paperclip } from 'lucide-react';

function TravelItem({ item, expenses }) {
  const navigate = useNavigate();
  const colorClasses = {
    'violet-500': 'border-r-violet-500',
    'green-500': 'border-r-green-500',
    'orange-500': 'border-r-orange-500',
    'blue-500': 'border-r-blue-500',
    'yellow-500': 'border-r-yellow-500',
    white: 'border-r-white',
  };
  return (
    <button onClick={() => navigate(`/travel/${item.id}`)}>
      <div
        className={`relative my-2 flex flex-row rounded-lg border border-r-8 p-5 shadow-sm hover:bg-slate-50 ${colorClasses[item.color] || ''}`}
      >
        <div className="items-star ml-5 flex flex-col justify-start">
          <p className="text-center text-lg text-slate-800">{item.title}</p>
          <div className="text-md flex text-center text-slate-500">
            <Calendar className="mr-2 w-4" />
            {formatDateHuman(item.date)}
          </div>

          <div className="text-md flex justify-stretch text-center text-slate-500">
            <LucideBanknote className="mr-2 w-4" />
            {formatCurrency(
              expenses.reduce((total, expense) => {
                const expenseInEur =
                  expense.selectedCurrency !== 'EUR'
                    ? expense.price / expense.exchangeRate
                    : expense.price;
                return total + Number(expenseInEur);
              }, 0),
              'EUR',
            )}
          </div>

          <div className="text-md flex text-center text-slate-500">
            <Paperclip className="mr-2 w-4" />
            {expenses.length} dépenses
          </div>
        </div>
      </div>
    </button>
  );
}

export default TravelItem;
