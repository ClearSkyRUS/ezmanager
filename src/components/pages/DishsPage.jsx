import React from 'react';
import Filter from '../../containers/filter';
import CardDishs from '../items/dishs';
import { Segment } from 'semantic-ui-react';

const DishsPage = ({ dishs, allDishs, products, setDishs, setProducts  }) => (
                  <div>
                    <Segment>
                      <Filter items = {allDishs} />
                    </Segment>
                    <Segment>
                     	<CardDishs  dishs = {dishs} products = {products} allDishs = {allDishs} setDishs = {setDishs} setProducts = {setProducts} />
                    </Segment>
                  </div>
);

export default DishsPage;
