import React from 'react';
import uniqBy from 'lodash/uniqBy';
import Filter from 'containers/filter';
import ListClients from 'components/items/clients';
import { Segment } from 'semantic-ui-react';

const ClientsPage = ({ allClients, clients, ApiPath, setClients, fetchRemoveItem, fetchAddItem, fetchUpItem  }) => (
                  <div>
                    <Segment>
                      <Filter />
                    </Segment>
                    <Segment>
  						<ListClients clients = {clients} ApiPath={ApiPath} onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment>
                  </div>
);

export default ClientsPage;
