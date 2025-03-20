import { useEffect, useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

export function useFetchPosition(lat, lng, setLng, setLat) {
  const [position, setPosition] = useState([48.82, 2.45]);

  const {
    isLoading: isLoadingPosition,
    position: geolocalisationPostion,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(
    function () {
      if (geolocalisationPostion) {
        setPosition([geolocalisationPostion.lat, geolocalisationPostion.lng]);
        setLat(geolocalisationPostion.lat);
        setLng(geolocalisationPostion.lng);
      }
    },
    [geolocalisationPostion],
  );

  return { lat, lng, position, setPosition, getPosition };
}
