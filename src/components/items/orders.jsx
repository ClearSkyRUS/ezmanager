import React from 'react';
import { Button, Image, List, Icon, Popup, Modal, Label } from 'semantic-ui-react';
import Loader from 'components/loader/loader';
import { OrderModalContent } from '../popupContent/order';


const OrderItem = ({ order, clients, programs, onUp, onRemove }) => {

  return (
    <List.Item>
      <List.Content floated='right'>
        <Modal trigger={<Button size='small' circular icon='edit' />} closeIcon>
          <Modal.Header>Удалить/изменить заказ</Modal.Header>
          <Modal.Content scrolling>
            <OrderModalContent order={order} clients = {clients} programs = {programs} onUp = {onUp} onRemove = {onRemove}  />
          </Modal.Content>
        </Modal>
      </List.Content>
      <List.Content>
        <Icon name="cart" />
        <Label size='mini' basic>{order.date}</Label>
        <Label size='mini' basic> {clients.find(x => x._id === order.client).tel} </Label>
        <Label size='mini' basic> {order.totalprice}  <Icon name="rub" /> { order.bonuses } <Icon name="bitcoin" /> { " " + order.totalsale + " % "} </Label>
      </List.Content>
      <List.Content>
         <Button.Group size='mini'>
          <Button negative onClick={onUp.bind(this, order, "Не оплачен")} basic={order.status !== "Не оплачен"} >
            Не оплачен
          </Button>
          <Button color='yellow' onClick={onUp.bind(this, order, "Оплачен")}  basic={order.status !== "Оплачен"} >
            Оплачен
          </Button>
          <Button positive onClick={onUp.bind(this, order, "Завершен")} basic={order.status !== "Завершен"}>
            Завершен
          </Button>
        </Button.Group>
      </List.Content>
      <List>
        {order.cart.map((cart, i) =>
            <List.Item key = {i}>
              <div>{cart.name + ", Программа: " + programs.find(x => x._id === cart.program).title + " " + cart.option + " Ккал, на " + cart.quanity + " дней" }</div>
              <div>
              {cart.days.map((day, j) =>
                <Label key={j} size='mini' basic> 
                  {(typeof(day) === "string")
                    ? day.substr(8,2) +"." + day.substr(5,2)
                    : day.getDate() +"." + (parseFloat(day.getMonth()+1))
                  }
                </Label>
              )}
              </div>
            </List.Item>)}
      </List>
    </List.Item>
)}

const OrdersList = ({ orders, clients, programs, onAdd, onUp, onRemove }) => {
  if (orders && programs && clients)
  return(
    <div>
      <List divided verticalAlign='middle'>
          {orders.map((order, i) =>
            <OrderItem key={i} order = {order} clients = {clients} programs = {programs} onUp={onUp} onRemove ={onRemove} /> )}
      </List>
      <AddNewPopupButton clients = {clients} programs = {programs} onAdd={onAdd}  />
    </div>
  )
return ( <Loader /> )
}

const AddNewPopupButton = ({clients, programs, onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Новый заказ</Modal.Header>
      <Modal.Content scrolling>
        <OrderModalContent clients = {clients} programs = {programs} onAdd={onAdd}  />
      </Modal.Content>
    </Modal>
   )
};

export default OrdersList
