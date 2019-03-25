import React from 'react';
import ProgramsList from 'components/items/programs';
import Filter from 'containers/filter';
import { Segment } from 'semantic-ui-react';

const ProgramPage = ({ allPrograms, programs, days, dishs, fetchRemoveProgram, fetchAddProgram, fetchUpProgram }) => (
                  <div>
                    <Segment>
                      <Filter items = {allPrograms} />
                    </Segment>
                    <Segment>
                      <ProgramsList programs = {programs} days = {days} dishs = {dishs} onRemove = {fetchRemoveProgram} onAdd = {fetchAddProgram} onUp = {fetchUpProgram}  />
                    </Segment>
                  </div>
);

export default ProgramPage;
