import React from 'react'
import { Card, Icon, Modal, Button, Image, List } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import uniqBy from 'lodash/uniqBy';
import { AddNewPopupContent, ChangePopupContent} from '../popupContent/dish';


const ListDishs = ({ dishs, allDishs, products, onUp, onRemove }) => (
  <div>
    <Card.Group centered >
          {dishs.map((dish, i) =>
            <Card key = {i} >
              <Card.Content>
                {(dish.image !== '')
                 ? <Image floated='right' size='mini' src={dish.image} />
                 : <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/wireframe/image.png' />}
                <Card.Header>{dish.title} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'>{dish.type}</span>
                </Card.Header>
                <Card.Meta>
                  <List>
                     {dish.productslist.map((product, i) =>
                        <List.Item key={i} style={{  display: "flex"}}>
                          {products.find(x => x._id === product.id ).title + " " + product.gramm + " "}
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
               {dish.price}<Icon name = 'ruble sign'/>     <Icon name ='pie graph' />   {dish.prot}/{dish.fat}/{dish.carb} <Icon name ='weight' />  {dish.gramms}
                 <Modal trigger={<Icon name= 'signup' style={{ cursor: 'pointer',   float: 'right' }}/>} closeIcon>
                  <Modal.Header>Измените/Удалите блюдо</Modal.Header>
                  <Modal.Content scrolling>
                    <ChangePopupContent dish = {dish} types = {uniqBy(allDishs, 'type')} products = {products} onUp = {onUp} onRemove = {onRemove} />
                  </Modal.Content>
                </Modal>
              </Card.Content>
            </Card>
          )}
    </Card.Group>
  </div>
)



const CardDishs = ({ allDishs, products, dishs, onAdd, onUp, onRemove }) => {

    if (products && dishs)
      return (
        <div>
            <ListDishs dishs = {dishs} allDishs = {allDishs} products = {products} onUp = {onUp} onRemove = {onRemove} />
            <AddNewPopupButton types = {uniqBy(allDishs, 'type')} products = {products} onAdd = {onAdd} />
        </div>
      )
     return ( <Loader /> )
}

const AddNewPopupButton = ({types,  products, onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте блюдо</Modal.Header>
      <Modal.Content scrolling>
        <AddNewPopupContent types = {types} products = {products} onAdd = { onAdd } />
      </Modal.Content>
    </Modal>
   )
};
  
export default CardDishs