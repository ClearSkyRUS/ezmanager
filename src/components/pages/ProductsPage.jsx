import React from 'react';
import ProductCard from 'components/items/product';
import Filter from 'containers/filter';
import { Segment } from 'semantic-ui-react';

const PageProduct = ({ products, allProducts, fetchRemoveProduct, fetchAddProduct, fetchUpProduct }) => (
                  <div>
                    <Segment>
                      <Filter items = {allProducts} />
                    </Segment>
                    <Segment>
                      <ProductCard products = {products} allProducts = {allProducts} onAdd = {fetchAddProduct} onUp = {fetchUpProduct} onRemove = {fetchRemoveProduct} />
                    </Segment>
                  </div>
);

export default PageProduct;
