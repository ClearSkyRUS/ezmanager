import React from 'react';
import { Segment, List, Input, Icon, Button } from 'semantic-ui-react';
import Loader from 'components/loader/loader';

var InputVlaue = 0;
const ChangeValue = (value) => {
	InputVlaue = value
	console.log(InputVlaue)
}


const DaysQueryPage = ({ daysQuery, ApiPath, fetchAddItem, fetchUpItem }) => {
	if (daysQuery)
	return(
		<div>
			<Segment style={{hight: "200px"}}>
				<span style={{fontSize: "large"}} >
		    		{"Очередь дней"}
		  		</span>
		  		<Button circular onClick={e => fetchAddItem(ApiPath, '')} basic size='small' icon='refresh'  style={{marginLeft: "20px"}} />
		  		<Input size='small' onChange={e => ChangeValue(e.target.value)} icon={<Icon onClick={e => fetchUpItem( ApiPath, '', {new: parseFloat(InputVlaue)})} name='sign out' circular link />} style={{width: "70px", float: "right"}}/>
			</Segment> 
			<Segment>
		  		<List celled>
		  			{daysQuery.map((day, i) =>
			  			<List.Item key={i}>
			  				<List.Content floated='right'>
			  					{day.date.substring(8,10) + '.' + day.date.substring(5,7)}
			  				</List.Content>
			  				{(i < 7) ? <List.Icon color='green' name='check circle outline' /> : <List.Icon color='green' name='pencil' /> }
			  				<List.Content>
			  					<List.Header>
			  						{day.day.title}
			  					</List.Header>
			  				</List.Content>
			  			</List.Item>
			  		)}
		  		</List>
	  		</Segment>
	    </div>
    )
	return(<Loader/>)
}

export default DaysQueryPage;
