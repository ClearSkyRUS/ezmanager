import React from 'react';
import ProgramsList from 'components/items/programs';
import Filter from 'containers/filter';
import { Segment } from 'semantic-ui-react';

const ProgramPage = ({ programs, settings, ApiPath, fetchRemoveItem, fetchAddItem, fetchUpItem }) => (
                  <div>
                    <Segment>
                      <Filter />
                    </Segment>
                    <Segment>
                      <ProgramsList programs = {programs} ApiPath={ApiPath} settings = {settings} onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment>
                  </div>
);

export default ProgramPage;
