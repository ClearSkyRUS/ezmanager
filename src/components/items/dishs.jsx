import React from 'react'
import { Card, Icon, Popup, Button, Image, List } from 'semantic-ui-react'
import Loader from '../loader/loader';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';



const ListDishs = ({ dishs, products }) => (
  <div>
    <Card.Group centered >
          {dishs.map((dish, i) =>
            <Card key = {i} >
              <Card.Content>
                {(dish.image != null)
                 ? <Image floated='right' size='mini' src={dish.image} />
                 : <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/wireframe/image.png' />}
                <Card.Header>{dish.title} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'>{dish.type}</span>
                </Card.Header>
                <Card.Meta>
                  <List>
                     {dish.productsList.map((product, i) =>
                        <List.Item key={i} style={{  display: "flex"}}>
                          {products.find(x => x.id === product.id ).title + " " + product.gramm + " "}
                          {(product.cold)
                            ? <List.Icon size='tiny' name='recycle' /> 
                            : ''}
                          {(product.hot)
                            ? <List.Icon size='tiny' name='hotjar' /> 
                            : ''}
                          {(product.ganes)
                            ? <List.Icon size='tiny' name='expand arrows alternate' /> 
                            : ''}    
                        </List.Item>
                      )}
                  </List>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
               {dish.price}<Icon name = 'ruble sign'/>     <Icon name ='pie graph' />   {dish.prot}/{dish.fat}/{dish.carb}
               <Popup
                  trigger={  <Icon name= 'signup' style={{ cursor: 'pointer',   float: 'right' }}/> }
                  content={ <div /> }
                  on='click'
                />
              </Card.Content>
            </Card>
          )}
    </Card.Group>
  </div>
)



const CardDishs = ({ allDishs, products, dishs, setProducts, setDishs }) => {

    if (products == null) {
      axios.get('/products.json').then(({ data }) => {
        setProducts(data);
      })
    return ( <Loader /> )
    }
    if (allDishs == null) {
      axios.get('/dishs.json').then(({ data }) => {
        setDishs(data);
      })
    return ( <Loader /> )
    }

  return (
    <div>
        <ListDishs dishs = {dishs} products = {products} />
        <AddNewPopupButton types = {uniqBy(allDishs, 'type')} products = {products} />
    </div>
  )
}

const AddNewPopupButton = ({types,  products}) => {
  return (
    <Popup
      trigger={ <Button className = "addTogler" circular color='google plus' icon='plus' /> }
      content={ <div/> }
      on='click'
    />
   )
};
  
export default CardDishs