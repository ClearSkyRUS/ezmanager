import React from 'react';
import ProductCard from '../items/product';
import Filter from '../../containers/filter';
import { Segment } from 'semantic-ui-react';

const PageProduct = ({ products, allProducts, setProducts }) => (
                  <div>
                    <Segment>
                      <Filter items = {allProducts} />
                    </Segment>
                    <Segment>
                      <ProductCard products = {products} allProducts = {allProducts} setProducts = {setProducts} />
                    </Segment>
                  </div>
);

export default PageProduct;
