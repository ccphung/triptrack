import {
  Calendar as CalendarIcon,
  PaletteIcon,
  Plane,
  PlusCircle,
  X,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/Calender';
import InputTravelers from '../components/InputTravelers';
import { createTravel } from '../slices/travelSlice';

const colors = [
  { id: 1, color: 'violet-500' },
  { id: 2, color: 'green-500' },
  { id: 3, color: 'orange-500' },
  { id: 4, color: 'blue-500' },
  { id: 5, color: 'yellow-500' },
  { id: 6, color: 'white' },
];

const colorClasses = {
  'violet-500': 'bg-violet-500',
  'green-500': 'bg-green-500',
  'orange-500': 'bg-orange-500',
  'blue-500': 'bg-blue-500',
  'yellow-500': 'bg-yellow-500',
  white: 'bg-white',
};

function CreateTravel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [travelers, setTravelers] = useState([{ id: 0, name: '' }]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selectedColor = useWatch({ control, name: 'color' });

  function handleTravelerChange(updatedTraveler) {
    setTravelers((prev) =>
      prev.map((t, i) =>
        i === updatedTraveler.id ? { ...t, name: updatedTraveler.name } : t,
      ),
    );
  }

  function handleRemoveTraveler(indexToRemove) {
    setTravelers((prev) => prev.filter((_, i) => i !== indexToRemove));
  }

  function handleAddTraveler() {
    setTravelers((prev) => [...prev, { id: prev.length, name: '' }]);
  }

  function onSubmit(data) {
    const newTravel = {
      id: nanoid(),
      title: data.title,
      date: data.date,
      color: data.color,
      travelers: travelers
        .map((t) => t.name.trim())
        .filter((name) => name !== ''),
      createdAt: new Date().toISOString(),
    };

    dispatch(createTravel(newTravel));
    navigate('/');
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 overflow-x-hidden">
      <div className="max-w-[1048px] rounded-xl p-5 shadow-md">
        <div className="mb-5 rounded-lg bg-violet-400 px-3 py-5 text-center">
          <h1 className="text-[1.2em] text-stone-100">Créer un voyage</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="xl:mr-5">
          {/* Title */}
          <div className="my-4 flex flex-row items-center">
            <label className="label flex items-center justify-center">
              <Plane />
            </label>
            <input
              type="text"
              placeholder="Titre du voyage"
              className="input w-[15rem] text-center"
              {...register('title', { required: 'Ce champ est obligatoire' })}
            />
            {errors?.title?.message && (
              <p className="ml-4 text-sm italic text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="my-4 flex flex-row items-center">
            <label className="label flex items-center justify-center">
              <CalendarIcon />
            </label>
            <Controller
              name="date"
              control={control}
              defaultValue={new Date().toISOString()}
              render={({ field }) => <Calendar field={field} />}
            />
          </div>

          {/* Travelers */}
          {travelers.map((traveler, index) => (
            <InputTravelers
              key={traveler.id}
              index={index}
              value={traveler.name}
              onChange={handleTravelerChange}
              onRemove={handleRemoveTraveler}
            />
          ))}

          <PlusCircle
            className="mx-auto mt-4 cursor-pointer text-gray-500"
            onClick={handleAddTraveler}
          />

          {/* Theme */}
          <div className="mt-5 flex flex-row items-center text-stone-700">
            <label className="label flex items-center justify-center">
              <PaletteIcon />
            </label>
            <div className="my-4 ml-3 flex flex-row">
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <div className="flex-row flex-wrap items-start justify-start space-x-4 md:flex">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={(e) => {
                          field.onChange(color.color);
                          e.preventDefault();
                        }}
                        className={`relative h-10 w-10 rounded-lg border border-slate-400 ${
                          colorClasses[color.color] || ''
                        }`}
                      >
                        {selectedColor === color.color && (
                          <span className="absolute right-1 top-1 rounded-full p-1 text-slate-800">
                            <X />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button className="mt-5 rounded-full border border-slate-200 bg-violet-400 px-6 py-3 text-lg text-white transition-all duration-300 hover:bg-violet-300 focus:outline-none focus:ring focus:ring-violet-400">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTravel;
