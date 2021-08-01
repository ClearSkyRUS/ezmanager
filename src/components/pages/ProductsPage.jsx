import React from 'react';
import uniqBy from 'lodash/uniqBy';
import ProductCard from 'components/items/product';
import Filter from 'containers/filter';
import { Segment } from 'semantic-ui-react';

const PageProduct = ({ products, allProducts, ApiPath, fetchRemoveItem, fetchAddItem, fetchUpItem }) => (
                  <div>
                    <Segment>
                      <Filter items = {uniqBy(allProducts, 'type')} />
                    </Segment>
                    <Segment>
                      <ProductCard products = {products} allProducts = {allProducts} ApiPath = {ApiPath} onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment>
                  </div>
);

export default PageProduct;
