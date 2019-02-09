import React from 'react'
import { Card, Icon, Comment, Popup, Button } from 'semantic-ui-react'
import Loader from '../loader/loader';
import { AddNewPopupContent, ChangePopupContent} from '../popupContent/product';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';


const AddNewPopupButton = ({ products }) => {
  return (
    <Popup
      trigger={ <Button className = "addTogler" circular color='google plus' icon='plus' /> }
      content={ <AddNewPopupContent products = {products}/> }
      on='click'
    />
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

const ListProducts = ({ products, allProducts }) => {
  return (
    <Card.Group centered itemsPerRow={8}>
          {products.map((product, i) =>
                    <Popup key = {i+1}
                    trigger={ 
                        <Comment.Group className = "product">
                          <ProductCard product={product} />
                        </Comment.Group>}
                    content={ <ChangePopupContent product = {product} types = {uniqBy(allProducts, 'type')} /> }
                    position='bottom left'
                    on='click'
                    />
          )}
    </Card.Group>
  )
}

const CardProduct = ({ products, setProducts, allProducts }) => {

  if (products == null) {
    axios.get('/products.json').then(({ data }) => {
      setProducts(data);
    })
    return (  
      <Comment.Group>
          <Comment>
            <Comment.Content >
              <Loader />
            </Comment.Content>
          </Comment>
      </Comment.Group>
    )
  }

  return (
    <div>
        <ListProducts products = {products} allProducts = { allProducts } />
        <AddNewPopupButton products = {uniqBy(allProducts, 'type')} />
    </div>
  )
}
  
export default CardProduct
