import React from 'react';
import { Segment } from 'semantic-ui-react';
import WorkData from 'components/workdata/workdata';

const MainPage = ({ workdata, setCheckBox, dayscount, setDaysCount, refreshData, generatePDF, generateMenu }) => (
    <Segment>
    	<WorkData generateMenu={generateMenu} workdata={workdata} setCheckBox={setCheckBox} refreshData={refreshData} dayscount={dayscount} setDaysCount={setDaysCount} generatePDF={generatePDF} />
    </Segment>
);

export default MainPage;
