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
import Map from './components/Map/Map';
import 'leaflet/dist/leaflet.css';
import { prettyPrintStat } from './util/util';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [mapZoom, setMapZoom] = useState(12);
  const [casesType, setCasesType] = useState('cases');

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

    if (data.countryInfo) {
      setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
    }
    setMapZoom(5);
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
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            onClick={(e) => setCasesType('cases')}
            active={casesType === 'cases'}
          />

          <InfoBox
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            onClick={(e) => setCasesType('recovered')}
            active={casesType === 'recovered'}
          />

          <InfoBox
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            onClick={(e) => setCasesType('deaths')}
            active={casesType === 'deaths'}
          />
        </div>

        <Map
          countries={countries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>

      {/* right side */}
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={countries} />
          <h3>Worldwide New Cases</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
