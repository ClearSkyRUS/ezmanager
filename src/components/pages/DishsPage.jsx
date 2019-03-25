import React from 'react';
import Filter from 'containers/filter';
import CardDishs from 'components/items/dishs';
import { Segment } from 'semantic-ui-react';

const DishsPage = ({ dishs, allDishs, products, fetchRemoveDish, fetchAddDish, fetchUpDish }) => (
                  <div>
                    <Segment>
                      <Filter items = {allDishs} />
                    </Segment>
                    <Segment>
                     	<CardDishs  dishs = {dishs} products = {products} allDishs = {allDishs} onAdd = {fetchAddDish} onUp = {fetchUpDish} onRemove = {fetchRemoveDish} />
                    </Segment>
                  </div>
);

export default DishsPage;
