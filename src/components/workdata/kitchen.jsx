import React from 'react'
import TextArea from 'react-textarea-autosize';
import { List, Label, Accordion, Icon, Form, Checkbox, Header } from 'semantic-ui-react'

const DishsList = ({dishs, setDishReady, showHideTechMap}) => (
	<div>
		<List divided horizontal>
			{dishs.filter(o => !o.ready).map((dish, i) => 
				<DishItem key={i} dish={dish} setDishReady={setDishReady} showHideTechMap={showHideTechMap}/>
			)}
		</List>
		 <Header as='h3' color='green' dividing>
		   Готово:
		  </Header>
		  <List divided horizontal>
			{dishs.filter(o => o.ready).map((dish, i) => 
				<DishItem key={i} dish={dish} setDishReady={setDishReady} showHideTechMap={showHideTechMap}/>
			)}
		</List>
	</div>
)

const DishItem = ({dish, setDishReady, showHideTechMap}) => (
	<List.Item style={{ verticalAlign: 'top', marginBottom: '20px', borderTop: '#4183c4 solid', width: '280px'}}>
		<List.Content floated='right'>
            {(dish.count) ? (dish.count + " Шт") : (dish.gram.toFixed(0) + " Гр")}
        </List.Content>
	    <List.Content>
	      <List.Header as='a'><Checkbox checked={dish.ready} onChange={setDishReady.bind(this, dish)} />   {dish.title}</List.Header>
	      	<List celled> 
	      	{dish.products.map((product, j) =>
	      		<ProductItem key={j} product={product} />
	      	)}
	      	</List>
	       	<Accordion fluid >
		        <Accordion.Title active={dish.showTehMap} onClick={showHideTechMap.bind(this, dish)}>
		        	<Icon name='dropdown' />
		        	Техпроцесс
		        </Accordion.Title>
		        <Accordion.Content active={dish.showTehMap}>
		        	<Form>
		        		<TextArea placeholder='Техпроцесс' value={ dish.tehMap } />
		        	</Form>
		        </Accordion.Content>
        	 </Accordion>
	    </List.Content>
	</List.Item>
)

const ProductItem = ({product}) => (
	<List.Item>
		<List.Content floated='right'>
			<Label basic style={{ width: "70px", textAlign: "right" }} >
				{product.gramH.toFixed(0) + " Гр"}

			</Label>
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
