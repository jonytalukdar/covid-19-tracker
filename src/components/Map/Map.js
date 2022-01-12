import { useState, useMemo } from 'react';

import DisplayPosition from './DisplayPosition';
import './Map.css';

import { MapContainer, TileLayer } from 'react-leaflet';

import Circle from './Circle';

function Map({ countries, casesType, center, zoom }) {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle countries={countries} casesType={casesType} />
      </MapContainer>
    ),
    [center, zoom, countries, casesType]
  );

  return (
    <div className="map">
      {map ? <DisplayPosition center={center} zoom={zoom} map={map} /> : null}
      {displayMap}
    </div>
  );
}

export default Map;
