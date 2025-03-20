import { useEffect, useState } from 'react';

const BASE_URL_RESTCOUNTRIES = 'https://restcountries.com/v3.1/alpha';

export function useFetchCurrency(countryCode) {
  const [currency, setCurrency] = useState('EUR');
  useEffect(
    function () {
      if (!countryCode) return;
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
  return currency;
}
