import React from 'react';
import Filter from 'containers/filter';
import ListDays from 'components/items/days';
import { Segment } from 'semantic-ui-react';

const DaysPage = ({ days, dishs, allDays, fetchRemoveDay, fetchAddDay, fetchUpDay }) => (
                  <div>
                    <Segment>
                      <Filter items = {allDays} />
                    </Segment>
                    <Segment>
  						<ListDays days = {days} dishs = {dishs}  onRemove = {fetchRemoveDay} onAdd = {fetchAddDay} onUp = {fetchUpDay} />
                    </Segment>
                  </div>
);

export default DaysPage;
