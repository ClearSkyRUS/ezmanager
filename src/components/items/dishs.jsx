import React from 'react'
import { Icon, Modal, Button, Image, List } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import uniqBy from 'lodash/uniqBy';
import { DishModal } from '../popupContent/dish';


const ListDishs = ({ dishs, products, ApiPath, types, onUp, onRemove }) => (
  <div>
    <List celled>
          {dishs.map((dish, i) =>
             <Modal key = {i} trigger={
                  <List.Item>
                    <List.Content floated='right'>
                      {dish.price.toFixed(0)}<Icon name = 'ruble sign'/>     
                    </List.Content>
                    {(dish.image !== '')
                    ? <Image avatar src={dish.image} />
                    : <Image avatar src='https://react.semantic-ui.com/images/wireframe/image.png' />}
                    <List.Content> 
                      <List.Header>{dish.title} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'>{dish.type.title}</span></List.Header>
                      <Icon name ='pie graph' />   {dish.prot.toFixed(0)}/{dish.fat.toFixed(0)}/{dish.carb.toFixed(0)}
                    </List.Content>
                  </List.Item>} closeIcon> 
             <Modal.Header>Измените/Удалите блюдо</Modal.Header>
                  <Modal.Content scrolling>
                    <DishModal dish = {dish} types = {types} ApiPath={ApiPath} products = {products} onUp = {onUp} onRemove = {onRemove} />
                  </Modal.Content>
              </Modal>
          )}
    </List>
  </div>
)


const CardDishs = ({ dishs, products, ApiPath, types, onAdd, onUp, onRemove }) => {

    if (dishs)
      return (
        <div>
            <ListDishs dishs = {dishs} types = {types} ApiPath={ApiPath} products = {products} onUp = {onUp} onRemove = {onRemove} />
            <AddNewPopupButton types = {types} products = {products} ApiPath={ApiPath} onAdd = {onAdd} />
        </div>
      )
     return ( <Loader /> )
}

const AddNewPopupButton = ({types,  products, ApiPath, onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте блюдо</Modal.Header>
      <Modal.Content scrolling>
        <DishModal types = {types} products = {products} ApiPath={ApiPath} onAdd = { onAdd } />
      </Modal.Content>
    </Modal>
   )
};
  
export default CardDishs