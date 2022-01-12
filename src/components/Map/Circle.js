import React from 'react';

import { CircleMarker, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

const Circle = ({ countries, casesType = 'recovered' }) => {
  return (
    <div>
      {countries.map((country, i) => {
        const radius =
          Math.sqrt(country[casesType]) / casesTypeColors[casesType].multiplier;

        return (
          <CircleMarker
            key={i}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.floor((radius + 1) * 10)}
          >
            <Popup>
              <h1>I am a popup</h1>
            </Popup>
          </CircleMarker>
        );
      })}
    </div>
  );
};

export default Circle;
