import React from 'react';

import { FormControl, Select, MenuItem } from '@mui/material';
import { useGlobalContext } from '../context/conext';

const Header = () => {
  const { country, setCountry, countries } = useGlobalContext();
  return (
    <div className="app-header">
      <h2>Covid-19 Tracker</h2>

      <FormControl>
        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries &&
            countries.map((country) => (
              <MenuItem key={country.country} value={country.countryInfo.iso2}>
                {country.country}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;
