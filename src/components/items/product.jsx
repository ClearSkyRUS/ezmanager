import React from 'react'
import { Card, Icon, Comment, Modal, Button } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import { AddNewPopupContent, ChangePopupContent} from '../popupContent/product';
import uniqBy from 'lodash/uniqBy';


const AddNewPopupButton = ({ products, onAdd }) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте продукт</Modal.Header>
      <Modal.Content scrolling>
        <AddNewPopupContent products = {products} onAdd = { onAdd } />
      </Modal.Content>
    </Modal>
   )
};

const ProductCard = ({ product }) => {
  return(
            <Comment>
              <Comment.Content className = "productItem">
                <Comment.Author as='a'>{product.title}</Comment.Author>
                  <Comment.Metadata>
                    <span>{product.type}</span>
                  </Comment.Metadata>
                <Comment.Text>{product.price}<Icon name = 'ruble sign'/>     <Icon name ='pie graph' />   {product.prot}/{product.fat}/{product.carb} </Comment.Text>
              </Comment.Content>
            </Comment>
    )
}

const ListProducts = ({ products, allProducts, onRemove, onUp }) => {
  return (
    <Card.Group centered itemsPerRow={8}>
          {products.map((product, i) =>
                  <Modal key={i} trigger={
                      <Comment.Group className = "product" >
                          <ProductCard product={product} />
                        </Comment.Group>}
                        closeIcon >
                    <Modal.Header>Изменить/Удалить продукт</Modal.Header>
                    <Modal.Content scrolling>
                       <ChangePopupContent product = {product} types = {uniqBy(allProducts, 'type')} onRemove = {onRemove} onUp = { onUp } />
                    </Modal.Content>
                  </Modal>
          )}
    </Card.Group>
  )
}

const CardProduct = ({ products, onRemove, allProducts, onAdd, onUp }) => {

  if (products)
     return (
        <div>
            <ListProducts products = {products} allProducts = { allProducts } onRemove = { onRemove } onUp = { onUp } />
            <AddNewPopupButton products = {uniqBy(allProducts, 'type')} onAdd = { onAdd }  />
        </div>
      )
  return (<Loader />)
}
  
export default CardProduct
