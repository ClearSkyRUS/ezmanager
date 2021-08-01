import React from 'react';
import ListDays from 'components/items/days';
import { Segment } from 'semantic-ui-react';

const DaysPage = ({ days, dishs, ApiPath, fetchRemoveItem, fetchAddItem, fetchUpItem }) => (
                  <div>
                    <Segment>
  						<ListDays days = {days} dishs = {dishs} ApiPath = {ApiPath}  onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment>
                  </div>
);

export default DaysPage;
