import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import styles from './MapView.module.css';

function MapView({ setLat, setLng, position, zoom }) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      className={styles.map}
    >
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup></Popup>
      </Marker>{' '}
      <DetectClick setLat={setLat} setLng={setLng} />
    </MapContainer>
  );
}

function DetectClick({ setLat, setLng }) {
  useMapEvents({
    click: (e) => {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);

  return null;
}

export default MapView;
