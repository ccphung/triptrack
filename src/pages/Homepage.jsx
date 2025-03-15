import { useSelector } from 'react-redux';
import { getTotalExpense } from '../store';
import { useNavigate } from 'react-router-dom';
import { ScrollText, CirclePlus, Plus, Map } from 'lucide-react';

function Homepage() {
  const expense = useSelector((state) => state.expense.expense);
  const totalExpense = useSelector(getTotalExpense);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div className="flex max-w-[1048px] flex-col justify-center">
        <div className="mb-5 mt-8 flex flex-col items-center">
          <div className="flex items-center justify-center">
            <h1 className="ml-15 mb-5 text-[1.2em] text-violet-800">Compte</h1>
          </div>
          <p>Vous avez dépensé :</p>
          <h2 className="mb-10 text-[3em]">{totalExpense} €</h2>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => navigate('/history')}
                className="rounded-full bg-stone-800 px-4 py-2 text-slate-100 hover:bg-stone-800/50"
              >
                <ScrollText />
              </button>
              <p className="text-xs">Historique</p>
            </div>
            <div className="ml-5 flex flex-col items-center justify-center text-center">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-800 text-xl text-slate-100 hover:bg-violet-800/50"
                onClick={() => navigate('/new-expense')}
              >
                <CirclePlus />
              </button>
              <p className="text-xs">Ajouter</p>
            </div>
          </div>
        </div>
        <p className="text-sm">Dernières dépenses : </p>
        <div className="min-h-[200px] rounded-xl p-5 text-stone-600 shadow-md">
          {expense
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) => (
              <div
                key={item.id}
                className="m-2 rounded-xl bg-purple-900/10 px-4 py-1"
              >
                <div className="flex items-center">
                  <p className="text-lg font-semibold"> {item.price}€</p>
                  <p className="ml-2"> {item.title}</p>
                </div>
              </div>
            ))}
        </div>
        <section className="m-10 flex gap-5">
          <div className="flex flex-col items-center justify-center">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-800 text-xl text-slate-100 hover:bg-violet-800/50"
              onClick={() => navigate('/')}
            >
              <Plus />
            </button>
            <p className="text-xs">Créer compte</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-800 text-xl text-slate-100 hover:bg-violet-800/50"
              onClick={() => navigate('/map')}
            >
              <Map />
            </button>
            <p className="text-xs">Carte</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;
