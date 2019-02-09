import React from 'react';
import { Button, Image, List, Icon, Popup } from 'semantic-ui-react';
import Loader from '../loader/loader';
import axios from 'axios';


const OrderItem = ({ order, clients }) => (
    <List.Item>
      <List.Content floated='right'>
        {order.date}
      </List.Content>
      <List.Content>
        <Icon name="cart" />
        {clients.find(x => x.id === order.clientId ).name + ": " + clients.find(x => x.id === order.clientId ).tel}
      </List.Content>
      <List>
        {order.cart.map((cart, i) =>
            <List.Item key = {i}>
              {cart.name + ", на " + cart.quanity + " дней, Скидка " + cart.sale + "%" }
            </List.Item>)}
      </List>
    </List.Item>
)

const OrdersList = ({ orders, clients, setOrders, setClients }) => {
  if (orders == null) {
      axios.get('/orders.json').then(({ data }) => {
        setOrders(data);
      })
    return ( <Loader /> )
    }
    if (clients == null) {
      axios.get('/clients.json').then(({ data }) => {
        setClients(data);
      })
    return ( <Loader /> )
    }

  return(
    <div>
      <List divided verticalAlign='middle'>
          {orders.map((order, i) =>
            <OrderItem key={i} order = {order} clients = {clients} /> )}
      </List>
      <AddNewPopupButton />
    </div>
  )
}

const AddNewPopupButton = ({types,  products}) => {
  return (
    <Popup
      trigger={ <Button className = "addTogler" circular color='google plus' icon='plus' /> }
      content={ <div/> }
      on='click'
    />
   )
};

export default OrdersList
