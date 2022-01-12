import React from 'react';

import './App.css';

import Map from './components/Map/Map';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';

import Boxes from './components/Boxes/Boxes';
import RightSide from './components/RightSide';

function App() {
  return (
    <div className="app">
      <div className="app-left">
        <Header />
        <Boxes />
        <Map />
      </div>

      {/* right side */}
      <RightSide />
    </div>
  );
}

export default App;
