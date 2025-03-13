import { useSelector } from 'react-redux';
import { getTotalExpense } from '../store';
import { useNavigate } from 'react-router-dom';
function Homepage() {
  const expense = useSelector((state) => state.expense.expense);
  const totalExpense = useSelector(getTotalExpense);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div className="flex max-w-[1048px] flex-col justify-center">
        <div className="mb-8 mt-8 flex flex-col items-center">
          <h1 className="mb-2 text-violet-800">Compte</h1>
          <p>Vous avez dépensé :</p>
          <h2 className="text-[3em]">{totalExpense} €</h2>
          <div className="flex items-center">
            <button
              onClick={() => navigate('/history')}
              className="rounded-full bg-stone-800 px-4 py-2 text-slate-100"
            >
              Voir historique
            </button>
            <div className="flex items-center justify-center">
              <button
                className="ml-5 flex h-10 w-10 items-center justify-center rounded-full bg-violet-800 text-xl text-slate-100"
                onClick={() => navigate('/new-expense')}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm">Dernières dépenses : </p>
        <div className="min-h-[200px] bg-stone-100">
          {expense
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <div key={item.id} className="m-2 bg-stone-200 px-4 py-1">
                <div className="flex items-center">
                  <p className="text-lg font-semibold"> {item.price}€</p>
                  <p className="ml-2"> {item.title}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
