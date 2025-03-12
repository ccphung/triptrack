import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../slices/expenseSlice';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView';

import Calender from '../components/Calender';
import { formatDate } from '../utils/helpers';
import { useMapEvent, useMapEvents } from 'react-leaflet';

const categories = [
  { id: 1, name: 'Restauration', emoji: '🍕' },
  { id: 2, name: 'Shopping', emoji: '👜' },
  { id: 3, name: 'Transport', emoji: '🚋' },
  { id: 4, name: 'Activité', emoji: '🎳' },
  { id: 5, name: 'Autre', emoji: '❓' },
];

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function CreateExpense() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [position, setPosition] = useState([52.505, -0.09]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState('');
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
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

  function handleSelectCategory(e) {
    const selectedCategory = categories.find(
      (cat) => cat.id === Number(e.target.value),
    );
    setCategory(selectedCategory);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(position);

    const newExpense = {
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
    };

    dispatch(addItem(newExpense));
    navigate('/');
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[1048px]">
        <form onSubmit={handleSubmit} className="xl:mr-5">
          <div className="flex flex-col items-end">
            <div className="flex flex-col text-stone-700">
              <input
                autoFocus
                type="text"
                placeholder="Titre de la dépense"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input mb-8 w-72 rounded-xl p-2 text-3xl accent-violet-500 focus:outline-none focus:ring-offset-2"
              />
            </div>

            <div className="flex flex-row items-center text-stone-700">
              <label htmlFor="title" className="mr-4 text-lg">
                Montant (€)
              </label>
              <input
                type="number"
                placeholder="Ajouter un montant"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input w-72 rounded-xl p-1 text-lg accent-violet-500 focus:outline-none focus:ring focus:ring-violet-500 focus:ring-offset-2"
              />
            </div>

            <div className="my-4 flex flex-row items-center">
              <p className="mr-4 text-lg text-stone-700">Date</p>
              <Calender
                onSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>

            <div className="my-4 flex flex-row text-stone-700">
              <label htmlFor="category" className="mr-4 text-lg">
                Catégorie
              </label>
              <select
                name="category"
                value={category.id}
                className="input w-72 rounded-xl border p-1 text-lg accent-violet-500 focus:outline-none focus:ring focus:ring-violet-500 focus:ring-offset-2"
                onChange={handleSelectCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row items-center text-stone-700">
              <label htmlFor="title" className="mr-4 text-lg">
                Emplacement
              </label>
              <input
                type="text"
                placeholder="Ajouter une position"
                value={cityName}
                onChange={() => setPosition([lat, lng])}
                className="input w-72 rounded-xl p-1 text-lg accent-violet-500 focus:outline-none focus:ring focus:ring-violet-500 focus:ring-offset-2"
              />
            </div>

            <div className="mt-5 flex flex-row text-stone-700">
              <label htmlFor="note" className="mr-4 text-lg">
                Note
              </label>
              <textarea
                type="text"
                placeholder=""
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input mb-8 w-72 rounded-xl border p-2 text-sm accent-violet-500 focus:outline-none focus:ring focus:ring-violet-500 focus:ring-offset-2"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button className="rounded-full bg-violet-500 px-4 py-2 text-white transition-all duration-300 hover:bg-violet-400">
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
