import { useEffect, useState } from 'react';

const BASE_URL_EXCHANGE =
  'https://v6.exchangerate-api.com/v6/243b273dc07f28cae48affa2/pair';

export default function useFetchExchangeRate(
  currency,
  countryCode,
  selectedCurrency,
) {
  const [exchangeRate, setExchangeRate] = useState('');
  useEffect(
    function () {
      if (currency === 'EUR') return;
      async function getExchangeRate() {
        try {
          const res = await fetch(`${BASE_URL_EXCHANGE}/EUR/${currency}`);
          const data = await res.json();
          setExchangeRate(data.conversion_rate);
        } catch (e) {
          console.log(e);
        }
      }
      getExchangeRate();
    },
    [selectedCurrency, currency, countryCode],
  );

  return { exchangeRate };
}
