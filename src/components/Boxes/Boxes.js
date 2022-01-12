import React from 'react';

import InfoBox from './InfoBox';
import { prettyPrintStat } from '../../util/util';
import { useGlobalContext } from '../../context/conext';

const Boxes = () => {
  const { countryInfo, casesType, setCasesType } = useGlobalContext();
  return (
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
        isGreen
      />

      <InfoBox
        title="Deaths"
        cases={prettyPrintStat(countryInfo.todayDeaths)}
        total={prettyPrintStat(countryInfo.deaths)}
        onClick={(e) => setCasesType('deaths')}
        active={casesType === 'deaths'}
      />
    </div>
  );
};

export default Boxes;
