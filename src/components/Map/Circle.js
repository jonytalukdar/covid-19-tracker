import React from 'react';
import numeral from 'numeral';
import { CircleMarker, Popup } from 'react-leaflet';

import './Circle.css';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 600,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1000,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 200,
  },
};

const Circle = ({ countries, casesType }) => {
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
            pathOptions={{
              color: casesTypeColors[casesType].hex,
              fillColor: casesTypeColors[casesType].hex,
            }}
            radius={Math.floor((radius + 1) * 10)}
          >
            <Popup>
              <div className="info-container">
                <div
                  className="info-flag"
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                ></div>
                <div className="info-name">{country.country}</div>
                <div className="info-confirmed">
                  Cases: {numeral(country.cases).format('0,0')}
                </div>
                <div className="info-recovered">
                  Recovered: {numeral(country.recovered).format('0,0')}
                </div>
                <div className="info-deaths">
                  Deaths: {numeral(country.deaths).format('0,0')}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </div>
  );
};

export default Circle;
