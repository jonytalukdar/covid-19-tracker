import { useEffect, useState } from 'react';

import './App.css';
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  const getCountries = async () => {
    const response = await fetch(`https://disease.sh/v3/covid-19/countries`);
    const data = await response.json();

    setCountries(data);
  };

  useEffect(() => {
    getCountries();
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
                  <MenuItem
                    key={country.country}
                    value={country.countryInfo.iso2}
                  >
                    {country.country}
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

        <Map />
      </div>

      {/* right side */}
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={countries} />
          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
