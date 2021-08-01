import React from 'react'
import { List, Label, Checkbox, Icon, Header } from 'semantic-ui-react'

const BuyList = ({buylist, setChecked}) => (
	<div>
		 
		<Label basic style={{ width: "150px", textAlign: "center" }} >{'Сумма: ' + buylist.totalPrice.toFixed(0) + ' '}<Icon name='rub' /></Label>
		<List>
			{buylist.products.filter(o => o.gramneed !== o.gramhave).map((product, i) => 
				<PrioductItem key={i} product={product} setChecked={setChecked} />
			)}
		</List>
		 <Header as='h3' color='green' dividing>
		   Куплено:
		  </Header>
		<List>
			{buylist.products.filter(o => o.gramneed === o.gramhave).map((product, i) => 
				<PrioductItem key={i} product={product} setChecked={setChecked} />
			)}
		</List>
	</div>
)

const PrioductItem = ({ product, setChecked }) => {
	console.log(product.gramhave === product.gramneed)
	return (
		<List.Item>
			<List.Content floated='right'>
				<Label basic style={{ width: "80px", textAlign: "right" }} >{product.gramneed.toFixed(0) + " Гр "}</Label>
		        <Label basic style={{ width: "80px", textAlign: "right" }} >{product.price.toFixed(0) + " "}<Icon name='rub' /></Label>
			</List.Content>
	    	<List.Content>
	      		<Checkbox label={product.title} checked={product.gramneed === product.gramhave} onChange={setChecked.bind(this, product)} />
	    	</List.Content>
	    </List.Item>
	)
}

export default BuyList
