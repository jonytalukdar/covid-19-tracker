import { useState, useMemo } from 'react';

import DisplayPosition from './DisplayPosition';
import './Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';

import Circle from './Circle';
import { useGlobalContext } from '../../context/conext';

function Map() {
  const { countries, casesType, mapCenter, mapZoom } = useGlobalContext();
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={mapZoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle />
      </MapContainer>
    ),
    [mapCenter, mapZoom]
  );

  return (
    <div className="map">
      {map ? (
        <DisplayPosition center={mapCenter} zoom={mapZoom} map={map} />
      ) : null}
      {displayMap}
    </div>
  );
}

export default Map;
