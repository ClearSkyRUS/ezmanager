import React from 'react';
import Filter from '../../containers/filter';
import ListOrders from '../items/orders';
import { Segment } from 'semantic-ui-react';

const ClientsPage = ({ orders, clients, setOrders, setClients  }) => (
                  <div>
                  	<Segment>
                      <Filter />
                    </Segment>
                    <Segment>
  						<ListOrders orders = {orders} clients = {clients} setOrders ={setOrders} setClients = {setClients} />
                    </Segment>
                  </div>
);

export default ClientsPage;
