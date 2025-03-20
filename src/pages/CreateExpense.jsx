import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { CiGps } from 'react-icons/ci';

import MapView from '../components/MapView';
import { createExpense } from '../slices/expenseSlice';
import { nanoid } from 'nanoid';

import { useFetchCity } from '../hooks/useFetchCity';
import useFetchExchangeRate from '../hooks/useFetchExchangeRate';
import { useFetchPosition } from '../hooks/useFetchPosition';
import { useFetchCurrency } from '../hooks/useFetchCurrency';
import Calendar from '../components/Calender';
import { formatCurrency } from '../utils/helpers';

const categories = [
  { id: 1, name: 'Restauration' },
  { id: 2, name: 'Shopping' },
  { id: 3, name: 'Transport' },
  { id: 4, name: 'Activité' },
  { id: 5, name: 'Autre' },
];

function CreateExpense() {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState,
  } = useForm();
  const { errors } = formState;

  const price = watch('price');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { travelId } = useParams();

  const { position, getPosition } = useFetchPosition(lat, lng, setLng, setLat);

  const { cityName, country, isLoadingGeocoding, countryCode } = useFetchCity(
    lat,
    lng,
  );

  const currency = useFetchCurrency(countryCode);

  const { exchangeRate } = useFetchExchangeRate(
    currency,
    countryCode,
    selectedCurrency,
  );

  function onSubmit(data) {
    console.log(data);

    const newExpense = {
      id: nanoid(),
      title: data.title,
      note: data.note,
      country,
      cityName,
      countryCode,
      date: data.date,
      price: data.price,
      category: data.category,
      lat,
      lng,
      position: [lat, lng],
      selectedCurrency,
      exchangeRate,
      createdAt: new Date().toISOString(),
      currency,
      travelId,
    };

    dispatch(createExpense(newExpense));
    navigate(-1);
  }

  useEffect(() => {
    if (cityName) {
      setValue('city', cityName);
      clearErrors('city');
    }
  }, [cityName, setValue, clearErrors]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <div className="max-w-[1048px] rounded-xl p-5 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="xl:mr-5">
          <div className="flex flex-col items-stretch">
            <div className="mb-5 flex flex-col self-center">
              <input
                autoFocus
                type="text"
                placeholder="  Titre de la dépense"
                className="input w-[15rem] text-center"
                id="title"
                {...register('title', { required: 'Ce champ est obligatoire' })}
              />
              {errors?.title?.message && (
                <p className="text-sm italic text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex max-w-sm flex-row items-center">
              <label htmlFor="price" className="label">
                Montant
              </label>
              <input
                type="number"
                placeholder="Ajouter un montant"
                className="input"
                id="price"
                {...register('price', {
                  required: 'Ce champ est obligatoire',
                  min: {
                    value: 1,
                    message: 'Le montant doit être au moins égal à 1',
                  },
                })}
                step="0.01"
              />{' '}
              {currency === 'EUR' || currency === '' ? (
                <span className="text-stone-500">EUR</span>
              ) : (
                <div>
                  <select
                    className="text-stone-500"
                    name="currency"
                    id="currency"
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <option value="EUR">EUR</option>
                    <option value={currency}>{currency}</option>
                  </select>
                </div>
              )}
            </div>
            {errors?.price?.message && (
              <p className="text-sm italic text-red-500">
                {errors.price.message}
              </p>
            )}

            {selectedCurrency === 'EUR' &&
              currency !== 'EUR' &&
              exchangeRate &&
              price && (
                <p className="text-end italic text-slate-500">
                  ({formatCurrency(price * exchangeRate, currency)})
                </p>
              )}

            {selectedCurrency !== 'EUR' &&
              currency !== 'EUR' &&
              exchangeRate &&
              price && (
                <p className="text-end italic text-slate-500">
                  ({formatCurrency(price / exchangeRate, 'EUR')})
                </p>
              )}

            <div className="my-4 flex flex-row items-center">
              <label htmlFor="date" className="label">
                Date
              </label>

              <Controller
                name="date"
                control={control}
                defaultValue={new Date().toISOString()}
                render={({ field }) => <Calendar field={field} />}
              />
            </div>

            <div className="my-4 flex flex-row items-center">
              <label htmlFor="category" className="label">
                Catégorie
              </label>
              <Controller
                name="category"
                control={control}
                defaultValue={categories[0].name}
                render={({ field }) => (
                  <select {...field} className="input">
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="flex flex-row items-center">
              <label htmlFor="city" className="label">
                Ville
              </label>
              <Controller
                name="city"
                control={control}
                rules={{ required: 'La ville est requise' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={
                      isLoadingGeocoding ? 'Chargement....' : cityName
                    }
                    disabled
                    required
                    className="input"
                    value={cityName}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              <button
                onClick={(e) => {
                  getPosition();
                  e.preventDefault();
                }}
              >
                <CiGps />
              </button>
            </div>
            {errors?.city?.message && (
              <p className="text-sm italic text-red-500">
                {errors.city.message}
              </p>
            )}

            <div className="mt-5 flex flex-row items-center text-stone-700">
              <label htmlFor="note" className="label">
                Note
              </label>
              <textarea
                type="text"
                placeholder=""
                id="note"
                {...register('note')}
                className="input"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="md:py-3; mt-5 rounded-full border border-stone-200 bg-violet-600 px-4 py-2 text-sm text-stone-50 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-violet-400 md:px-6">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      <div className="">
        <MapView
          position={position}
          mapLat={lat}
          mapLng={lng}
          setLat={setLat}
          setLng={setLng}
          zoom="6"
        />
      </div>
    </div>
  );
}

export default CreateExpense;
