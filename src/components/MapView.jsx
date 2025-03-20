import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import styles from './MapView.module.css';

function MapView({
  setLat,
  setLng,
  position,
  mapPositions,
  expenses,
  zoomMap = '6',
}) {
  return (
    <MapContainer
      center={position}
      zoom={zoomMap}
      scrollWheelZoom={true}
      className={styles.map}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

      {mapPositions?.map((mapPosition, index) => (
        <Marker key={index} position={mapPosition}>
          {mapPosition &&
          position &&
          mapPosition.toString() === position.toString()
            ? console.log(mapPosition)
            : console.log(expenses)}
        </Marker>
      ))}

      <DetectClick setLat={setLat} setLng={setLng} />
    </MapContainer>
  );
}

function DetectClick({ setLat, setLng }) {
  useMapEvents({
    click: (e) => {
      if (setLat) {
        setLat(e.latlng.lat);
      }
      if (setLng) {
        setLng(e.latlng.lng);
      }
    },
  });
}
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);

  return null;
}

export default MapView;
