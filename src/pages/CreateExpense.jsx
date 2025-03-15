import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Calender from '../components/Calender';
import MapView from '../components/MapView';
import { formatDate } from '../utils/helpers';
import { addItem } from '../slices/expenseSlice';
import { nanoid } from 'nanoid';

const categories = [
  { id: 1, name: 'Restauration', emoji: '🍕' },
  { id: 2, name: 'Shopping', emoji: '👜' },
  { id: 3, name: 'Transport', emoji: '🚋' },
  { id: 4, name: 'Activité', emoji: '🎳' },
  { id: 5, name: 'Autre', emoji: '❓' },
];

const BASE_URL_GEOCODE =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';

const BASE_URL_RESTCOUNTRIES = 'https://restcountries.com/v3.1/alpha';

const BASE_URL_EXCHANGE =
  'https://v6.exchangerate-api.com/v6/243b273dc07f28cae48affa2/pair';

function CreateExpense() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [position, setPosition] = useState([48.82, 2.45]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch position
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError('');
          const res = await fetch(
            `${BASE_URL_GEOCODE}?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode) {
            throw new Error('Une erreur est survenue');
          }
          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
          setCountryCode(data.countryCode);
          console.log(data.countryCode);
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng],
  );

  // Fetch currency
  useEffect(
    function () {
      async function fetchCurrency() {
        try {
          const res = await fetch(`${BASE_URL_RESTCOUNTRIES}/${countryCode}`);
          const data = await res.json();
          setCurrency(Object.keys(data[0].currencies)[0]);
        } catch (e) {
          console.log(e);
        }
      }
      fetchCurrency();
    },
    [countryCode],
  );

  // Fetch exchange rate
  useEffect(
    function () {
      if (currency === 'EUR') return;
      async function getExchangeRate() {
        try {
          const res = await fetch(`${BASE_URL_EXCHANGE}/EUR/${currency}`);
          const data = await res.json();
          console.log(data);
          setExchangeRate(data.conversion_rate);
        } catch (e) {
          console.log(e);
        }
      }
      getExchangeRate();
    },
    [selectedCurrency, currency],
  );

  // Set category
  function handleSelectCategory(e) {
    const selectedCategory = categories.find(
      (cat) => cat.id === Number(e.target.value),
    );
    setCategory(selectedCategory);
  }

  //Validates form
  function validateForm() {
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Le titre est requis.';
    else if (title.length < 3)
      newErrors.title = 'Le titre doit contenir au moins 3 caractères.';

    if (!price) newErrors.price = 'Le montant est requis.';
    else if (isNaN(price) || Number(price) <= 0)
      newErrors.price = 'Le montant doit être un nombre positif.';

    if (!category)
      newErrors.category = 'Veuillez sélectionner une catégorie valide.';

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  }

  // Submit new expense
  function handleSubmit(e) {
    e.preventDefault();
    console.log(position);
    // Stop submission if validation fails
    if (!validateForm()) return;

    const newExpense = {
      id: nanoid(),
      title,
      note,
      country,
      cityName,
      countryCode,
      date: formatDate(selectedDate),
      price,
      category,
      lat,
      lng,
      selectedCurrency,
      exchangeRate,
      createdAt: new Date(),
    };

    dispatch(addItem(newExpense));
    navigate('/');
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      <div className="max-w-[1048px] rounded-xl p-5 shadow-md">
        <form onSubmit={handleSubmit} className="xl:mr-5">
          <div className="flex flex-col items-end">
            <div className="mb-5 flex flex-col text-stone-700">
              <input
                autoFocus
                type="text"
                placeholder="  Titre de la dépense"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-72 rounded-xl border bg-purple-900/10 p-1 text-lg text-stone-500 accent-violet-500 focus:outline-none focus:ring focus:ring-violet-500 focus:ring-offset-2"
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="flex max-w-sm flex-row items-center text-stone-50">
              <label
                htmlFor="title"
                className="mr-4 rounded-full bg-stone-800 px-4 py-2 text-lg"
              >
                Montant
              </label>
              <input
                type="number"
                placeholder="Ajouter un montant"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input w-72 rounded-lg border-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              {currency === 'EUR' || currency === '' ? (
                'EUR'
              ) : (
                <div>
                  <select
                    name="currency"
                    id="currency"
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <option value={currency}>{currency}</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              )}
            </div>
            {errors.price && <p className="text-red-500">{errors.price}</p>}

            {currency !== 'EUR' && (
              <p className="italic text-slate-500">
                ({exchangeRate * price} en EUR)
              </p>
            )}

            <div className="my-4 flex flex-row items-center">
              <p className="mr-4 rounded-full bg-stone-800 px-4 py-2 text-lg text-stone-50">
                Date
              </p>
              <Calender
                onSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>

            <div className="my-4 flex flex-row text-stone-50">
              <label
                htmlFor="category"
                className="mr-4 rounded-full bg-stone-800 px-4 py-2 text-lg"
              >
                Catégorie
              </label>
              <select
                name="category"
                value={category.id}
                placeholder="Selectioner la catégorie"
                className="input w-72 rounded-lg border-2 border-gray-300 bg-stone-400 p-2 text-lg text-stone-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={handleSelectCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row items-center text-stone-50">
              <label
                htmlFor="title"
                className="mr-4 rounded-full bg-stone-800 px-4 py-2 text-lg"
              >
                Emplacement
              </label>
              <input
                type="text"
                placeholder="Ajouter une position"
                value={cityName}
                onChange={() => setPosition([lat, lng])}
                className="input w-72 rounded-lg border-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div className="mt-5 flex flex-row items-center text-stone-700">
              <label
                htmlFor="note"
                className="mr-4 rounded-full bg-stone-800 px-4 py-2 text-lg text-stone-50"
              >
                Note
              </label>
              <textarea
                type="text"
                placeholder=""
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input w-72 rounded-lg border-2 border-gray-300 p-2 text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="mt-7 flex items-center justify-center rounded-full bg-violet-800 px-8 py-2 text-xl text-slate-100 hover:bg-violet-800/50">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      <div className="h-[200px w-[200px]">
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
