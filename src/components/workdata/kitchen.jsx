import React from 'react'
import { List, Label, Checkbox, Icon, Header, Card } from 'semantic-ui-react'

const DishsList = ({dishs}) => (
	<Card.Group centered>
		{dishs.map((dish, i) => 
			<DishCard key={i} dish={dish} />
		)}
	</Card.Group>
)

const DishCard = ({dish}) => (
	<Card>
	    <Card.Content>
	      <Card.Header>{dish.title}</Card.Header>
	      <Card.Meta>
	        {dish.gram.toFixed(0) + " Гр"}
	      </Card.Meta>
	      <Card.Description>
	      	<List divided verticalAlign='middle'>
	      	{dish.products.map((product, j) =>
	      		<ProductItem key={j} product={product} />
	      	)}
	      	</List>
	      </Card.Description>
	    </Card.Content>
	</Card>
)

const ProductItem = ({product}) => (
	<List.Item>
		<List.Content floated='right'>
			<Label basic style={{ width: "70px", textAlign: "right" }} >{product.gram.toFixed(0) + " Гр "}</Label>
		</List.Content>
	    <List.Content style={{  display: "flex"}}>
	      	{product.title}
	      	  {(product.cold)
                ? <List.Icon size='tiny' name='recycle' /> 
                : ''}
              {(product.hot)
                ? <List.Icon size='tiny' name='hotjar' /> 
                : ''}
              {(product.ganes)
                ? <List.Icon size='tiny' name='expand arrows alternate' /> 
                : ''}   
	    </List.Content>
	</List.Item>
)

export default DishsList
