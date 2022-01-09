import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="box-info">
      <CardContent>
        <Typography className="title">{title}</Typography>

        <h2 className="cases">{cases}</h2>

        <Typography className="total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
