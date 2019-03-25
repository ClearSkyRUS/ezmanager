import React from 'react'
import { Icon, Label, Segment, Input, Button } from 'semantic-ui-react'

const InfoBar = ({workdata, dayscount, setDaysCount, refreshData, generatePDF, generateMenu }) => (
	<Segment.Inline>
		<span style={{fontSize: "large"}} >
    	{"Заказов: " + workdata.Orders.length}
  		</span>
  		<Input size='small' onChange={e=> setDaysCount(e.target.value)} icon={<Icon onClick={refreshData} name='refresh' circular link />} style={{width: "70px", float: "right"}} value={dayscount} />
  		<Button onClick={generatePDF} circular basic size='small' icon='file outline'  style={{marginRight: "20px", float: "right"}} />
  		<Button onClick={generateMenu} circular basic size='small' icon='file image outline'  style={{marginRight: "10px", float: "right"}} />
	</Segment.Inline>	
)

export default InfoBar
