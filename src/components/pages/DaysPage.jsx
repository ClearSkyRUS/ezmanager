import React from 'react';
import Filter from '../../containers/filter';
import ListDays from '../items/days';
import { Segment } from 'semantic-ui-react';

const DaysPage = ({ days, dishs, allDays, setDishs, setDays }) => (
                  <div>
                    <Segment>
                      <Filter items = {allDays} />
                    </Segment>
                    <Segment>
  						<ListDays days = {days} dishs = {dishs} setDays = {setDays} setDishs = {setDishs} />
                    </Segment>
                  </div>
);

export default DaysPage;
