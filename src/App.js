import { useEffect, useState } from 'react';

import './App.css';
import { FormControl, MenuItem, Select } from '@mui/material';
import InfoBox from './components/InfoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  console.log(countryInfo);

  const getCountriesName = async () => {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries`);
    const data = await response.json();
    const countries = data.map((country) => {
      return { name: country.country, value: country.countryInfo.iso2 };
    });
    setCountries(countries);
  };

  useEffect(() => {
    getCountriesName();
  }, []);

  const getCountyInfo = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setCountryInfo(data);
  };

  useEffect(() => {
    let url;
    if (country === 'worldwide') {
      url = 'https://disease.sh/v3/covid-19/all';
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${country}`;
    }
    getCountyInfo(url);
  }, [country]);

  return (
    <div className="app">
      <div className="app-left">
        {/* header */}
        <div className="app-header">
          <h2>Covid-19 Tracker</h2>

          <FormControl>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries &&
                countries.map((country) => (
                  <MenuItem key={country.name} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        {/* info box */}
        <div className="app-stats">
          <InfoBox
            title="Corona Virus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
      </div>

      <div className="app-right">
        <h2>this is app right sides</h2>
      </div>
    </div>
  );
}

export default App;
