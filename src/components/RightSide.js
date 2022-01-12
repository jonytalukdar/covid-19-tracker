import React from 'react';

import LineGraph from './Graph/LineGraph';
import Table from './Table/Table';

import { Card, CardContent } from '@mui/material';
import { useGlobalContext } from '../context/conext';

const RightSide = () => {
  const { countries, casesType } = useGlobalContext();
  return (
    <Card className="app-right">
      <CardContent>
        <h3>Live Cases By Country</h3>
        <Table countries={countries} />
        <h3>Worldwide New {casesType}</h3>
        <LineGraph casesType={casesType} />
      </CardContent>
    </Card>
  );
};

export default RightSide;
