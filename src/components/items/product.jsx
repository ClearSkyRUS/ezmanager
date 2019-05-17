import React from 'react'
import { Icon, Modal, Button, List } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import { ProductModal } from '../popupContent/product';
import uniqBy from 'lodash/uniqBy';


const AddNewPopupButton = ({ products, onAdd, ApiPath }) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте продукт</Modal.Header>
      <Modal.Content scrolling>
        <ProductModal products = {products} onAdd = { onAdd } ApiPath = {ApiPath} />
      </Modal.Content>
    </Modal>
   )
};

const ListProducts = ({ products, allProducts, ApiPath, onRemove, onUp }) => {
  return (
    <List celled>
          {products.map((product, i) =>
                  <Modal key={i} trigger={
                      <List.Item>
                          <List.Content floated='right'>
                             {product.price}<Icon name = 'ruble sign'/> 
                          </List.Content>
                          <List.Content>
                             <List.Header>{product.title} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {product.type}</span></List.Header>
                             <Icon name ='pie graph' />   {product.prot}/{product.fat}/{product.carb} 
                          </List.Content>
                        </List.Item>}
                      closeIcon >
                    <Modal.Header>Изменить/Удалить продукт</Modal.Header>
                    <Modal.Content scrolling>
                       <ProductModal product = {product} products = {uniqBy(allProducts, 'type')} ApiPath = {ApiPath} types = {uniqBy(allProducts, 'type')} onRemove = {onRemove} onUp = { onUp } />
                    </Modal.Content>
                  </Modal>
          )}
    </List>
  )
}

const CardProduct = ({ products, ApiPath, onRemove, allProducts, onAdd, onUp }) => {

  if (products)
     return (
        <div>
            <ListProducts products = {products} allProducts = { allProducts } onRemove = { onRemove } onUp = { onUp } ApiPath = {ApiPath} />
            <AddNewPopupButton products = {uniqBy(allProducts, 'type')} onAdd = { onAdd } ApiPath = {ApiPath} />
        </div>
      )
  return (<Loader />)
}
  
export default CardProduct
