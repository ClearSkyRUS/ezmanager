import React from 'react'
import { Card, Icon, Button, List, Modal, Header, Grid, Tab } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import BuyList from 'components/workdata/buylist';
import KitchenList from 'components/workdata/kitchen';
import PortionList from 'components/workdata/portions';
import InfoBar from 'components/workdata/infobar';

const WorkData = ({ workdata, setCheckBox, dayscount, setDaysCount, refreshData, generatePDF, generateMenu }) => {

	if (workdata) {
		const content = [
		  { menuItem: 'Кухня', render: () => <Tab.Pane><KitchenList dishs = {workdata.DishsToCook} /></Tab.Pane> },
		  { menuItem: 'Порции', render: () => <Tab.Pane><PortionList programs={workdata.Programs}  dishs = {workdata.DishsToCook} /></Tab.Pane> },
		  { menuItem: 'Покупки', render: () => <Tab.Pane><BuyList buylist = {workdata.BuyList} setChecked={setCheckBox} /></Tab.Pane> }
		]
	  	return(
	  		<div>
		  		<InfoBar generateMenu={generateMenu} workdata={workdata} dayscount={dayscount} refreshData={refreshData} setDaysCount={setDaysCount} generatePDF={generatePDF} />
		    	<Tab panes={content} workdata = {workdata} />
	    	</div>
	  	)
	}
	return ( <Loader /> )
}


export default WorkData