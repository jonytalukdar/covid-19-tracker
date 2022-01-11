import React from 'react';

import './Table.css';

const Table = ({ countries }) => {
  const newCountries = [...countries];

  const sortedCountries = newCountries.sort((a, b) => b.cases - a.cases);

  return (
    <div className="table">
      <table>
        <tbody>
          {sortedCountries.map((country, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{country.country}</td>
                <td>
                  <strong>{country.cases}</strong>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
