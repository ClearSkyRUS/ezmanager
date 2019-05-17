import React from 'react';
import { Segment } from 'semantic-ui-react';
import WorkData from 'components/workdata/workdata';

const MainPage = ({ workdata, setCheckBox, dayscount, setDaysCount, refreshData, generatePDF, generateMenu, setDishReady, showHideTechMap }) => (
    <Segment>
    	<WorkData generateMenu={generateMenu} workdata={workdata} setDishReady={setDishReady} showHideTechMap={showHideTechMap} setCheckBox={setCheckBox} refreshData={refreshData} dayscount={dayscount} setDaysCount={setDaysCount} generatePDF={generatePDF} />
    </Segment>
);

export default MainPage;
