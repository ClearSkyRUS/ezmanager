import React from 'react';
import ProgramsList from '../items/programs';
import Filter from '../../containers/filter';
import { Segment } from 'semantic-ui-react';

const ProgramPage = ({ programs, setPrograms }) => (
                  <div>
                    <Segment>
                      <Filter  />
                    </Segment>
                    <Segment>
                      <ProgramsList programs = {programs} setPrograms = {setPrograms} />
                    </Segment>
                  </div>
);

export default ProgramPage;
