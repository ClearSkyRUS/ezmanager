import React from 'react';
import Filter from 'containers/filter';
import ListDishTypes from 'components/items/dishTypes';
import { Segment } from 'semantic-ui-react';

const DishTypesPage = ({ dishTypes, ApiPath, fetchRemoveItem, fetchAddItem, fetchUpItem  }) => (
                  <div>
                    <Segment>
                      <Filter />
                    </Segment> 
                    <Segment>
  						<ListDishTypes dishTypes = {dishTypes} ApiPath = {ApiPath} onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment>
                  </div>
);

export default DishTypesPage;
