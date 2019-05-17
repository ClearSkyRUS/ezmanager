import React from 'react';
import Filter from 'containers/filter';
import CardDishs from 'components/items/dishs';
import { Segment } from 'semantic-ui-react';

const DishsPage = ({ dishs, types, products, ApiPath, fetchRemoveItem, fetchAddItem, fetchUpItem }) => (
                  <div>
                    <Segment>
                      <Filter />
                    </Segment>
                    <Segment>
                     	<CardDishs  dishs = {dishs} types = {types} ApiPath={ApiPath} products = {products} onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment> 
                  </div>
);

export default DishsPage;
