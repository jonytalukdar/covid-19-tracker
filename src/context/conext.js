import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const useGlobalContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  //states
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

  const context = {
    countries,
    country,
    countryInfo,
    mapCenter,
    mapZoom,
    casesType,
    setCountry,
    setCasesType,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default ContextProvider;
