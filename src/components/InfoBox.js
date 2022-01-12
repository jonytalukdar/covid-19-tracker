import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import './InfoBox.css';

const InfoBox = ({ title, cases, total, onClick, active, isGreen }) => {
  return (
    <Card
      className={`box-info ${active && 'active'} ${isGreen && 'green'}`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className="title">{title}</Typography>

        <h2 className={`cases ${isGreen && 'green'}`}>{cases}</h2>

        <Typography className={`total ${isGreen && 'green'}`}>
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
