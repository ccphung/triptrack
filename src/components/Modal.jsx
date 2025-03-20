import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Modal({ id, actions = [], onClose, url = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDelete() {
    actions.forEach((action) => dispatch(action(id)));
    navigate(url);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative z-10 flex h-[200px] w-[25rem] flex-col justify-between overflow-auto scroll-smooth rounded-lg bg-slate-50 p-10 shadow-lg [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
        <p className="text-center">Êtes vous sûr de vouloir supprimer ?</p>

        <div className="flex items-end justify-end">
          <button
            className="label w-[6rem] px-1 py-1 hover:bg-slate-500"
            onClick={handleDelete}
          >
            Confirmer
          </button>
          <button
            className="input w-[6rem] px-1 py-1 hover:bg-stone-100"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
