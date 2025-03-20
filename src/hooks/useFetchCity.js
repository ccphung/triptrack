import { useEffect, useState } from 'react';

const BASE_URL_GEOCODE =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function useFetchCity(lat, lng) {
  const [geocodingError, setGeocodingError] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(
    function () {
      if (!lat || !lng) return;
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
          console.log(cityName);
        }
      }
      fetchCityData();
    },
    [lat, lng],
  );

  return { cityName, country, countryCode, geocodingError, isLoadingGeocoding };
}
