import React from 'react';

import './App.css';
import { Card, CardContent } from '@mui/material';

import Table from './components/Table';
import LineGraph from './components/LineGraph';
import Map from './components/Map/Map';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import { useGlobalContext } from './context/conext';
import Boxes from './components/Boxes/Boxes';

function App() {
  const { countries, casesType } = useGlobalContext();

  return (
    <div className="app">
      <div className="app-left">
        <Header />
        <Boxes />
        <Map />
      </div>

      {/* right side */}
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={countries} />
          <h3>Worldwide New {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
