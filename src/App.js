import { useEffect, useState } from 'react';

import './App.css';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

//api endpoint https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  const getCountries = async () => {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries`);
    const data = await response.json();
    const countries = data.map((country) => {
      return { name: country.country, value: country.countryInfo.iso2 };
    });

    setCountries(countries);
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="app">
      {/* header */}
      <div className="app-header">
        <h2>Covid-19 Tracker</h2>

        <FormControl>
          <Select value={country} onChange={(e) => setCountry(e.target.value)}>
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
    </div>
  );
}

export default App;
