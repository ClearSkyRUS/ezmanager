import React from 'react';
import Filter from 'containers/filter';
import ListOrders from 'components/items/orders';
import { Segment } from 'semantic-ui-react';

const OrdersPage = ({ orders, clients, programs, fetchRemoveItem, fetchAddItem, fetchUpItem, ApiPath }) => (
                  <div>
                  	<Segment>
                      <Filter />
                    </Segment>
                    <Segment>
  						<ListOrders orders = {orders} clients = {clients} ApiPath={ApiPath} programs ={programs} onRemove = {fetchRemoveItem} onAdd = {fetchAddItem} onUp = {fetchUpItem} />
                    </Segment>
                  </div>
);

export default OrdersPage;
