import React from 'react';
import Filter from 'containers/filter';
import ListOrders from 'components/items/orders';
import { Segment } from 'semantic-ui-react';

const OrdersPage = ({ orders, clients, programs, fetchRemoveOrder, fetchAddOrder, fetchUpOrder   }) => (
                  <div>
                  	<Segment>
                      <Filter />
                    </Segment>
                    <Segment>
  						<ListOrders orders = {orders} clients = {clients} programs ={programs} onRemove = {fetchRemoveOrder} onAdd = {fetchAddOrder} onUp = {fetchUpOrder} />
                    </Segment>
                  </div>
);

export default OrdersPage;
