import React from 'react';
import Filter from '../../containers/filter';
import ListClients from '../items/clients';
import { Segment } from 'semantic-ui-react';

const ClientsPage = ({ allClients, clients, setClients  }) => (
                  <div>
                    <Segment>
                      <Filter items = {allClients} />
                    </Segment>
                    <Segment>
  						<ListClients clients = {clients} setClients = {setClients} />
                    </Segment>
                  </div>
);

export default ClientsPage;
