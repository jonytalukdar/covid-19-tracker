import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import './InfoBox.css';

const InfoBox = ({ title, cases, total, onClick, active }) => {
  return (
    <Card className={`box-info ${active && 'active'}`} onClick={onClick}>
      <CardContent>
        <Typography className="title">{title}</Typography>

        <h2 className="cases">{cases}</h2>

        <Typography className="total">{total} Total</Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
