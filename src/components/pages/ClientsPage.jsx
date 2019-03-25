import React from 'react';
import Filter from 'containers/filter';
import ListClients from 'components/items/clients';
import { Segment } from 'semantic-ui-react';

const ClientsPage = ({ allClients, clients, setClients, fetchRemoveClient, fetchAddClient, fetchUpClient  }) => (
                  <div>
                    <Segment>
                      <Filter items = {allClients} />
                    </Segment>
                    <Segment>
  						<ListClients clients = {clients} onRemove = {fetchRemoveClient} onAdd = {fetchAddClient} onUp = {fetchUpClient} />
                    </Segment>
                  </div>
);

export default ClientsPage;
