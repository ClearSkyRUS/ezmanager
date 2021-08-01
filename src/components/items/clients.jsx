import React from 'react';
import { Button, Image, List, Icon, Modal, Label } from 'semantic-ui-react';
import Loader from 'components/loader/loader';
import { ClientModalContent } from '../popupContent/client';

const ClientItem = ({ client, onUp, onRemove, ApiPath }) => (
    <List.Item>
      <List.Content floated='right'>
        <Modal trigger={<Button size='small' circular icon='edit' />} closeIcon>
          <Modal.Header>Удалить/изменить клиента</Modal.Header>
          <Modal.Content scrolling>
            <ClientModalContent client = {client} onUp = {onUp} onRemove = {onRemove} ApiPath={ApiPath} />
          </Modal.Content>
        </Modal>
      </List.Content>
      {(client.gender === "female")
        ? <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
        : <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png' />}
      <List.Content>{client.name}</List.Content>
       <List.Content style={{ paddingTop: "5px"}}>
        <Label.Group size='mini'>
          <Label basic>
            {"Счет: " + client.check}  <Icon name="rub" /> { client.points } <Icon name="bitcoin" /> { " " + client.sale + " % "}
          </Label>
          <Label basic>
            <Icon name="mobile alternate"/> {client.tel} 
          </Label>
          <Label basic>
            <Icon name="home" /> {"ул." + client.adres[0].street + ", д." + client.adres[0].number}
             {(client.adres[0].aport !== "")
              ? (", кв." +client.adres[0].aport)
              : ''}
              {(client.adres[0].pod !== "")
              ? (", под." +client.adres[0].pod)
              : ''}
               {(client.adres[0].domophone !== "")
              ? (", домоф." +client.adres[0].domophone)
              : ''}
          </Label>
        </Label.Group>
       </List.Content>
    </List.Item>
)

const ListClients = ({ clients, onAdd, onUp, onRemove, ApiPath }) => {
  if (clients)
  return(
    <div>
      <List divided verticalAlign='middle'>
          {clients.map((client, i) =>
            <ClientItem key={i} ApiPath={ApiPath} client = {client} onUp = {onUp} onRemove = {onRemove} /> )}
      </List>
      <AddNewPopupButton onAdd = {onAdd} ApiPath={ApiPath} />
    </div>
  )
  return ( <Loader /> )
}

const AddNewPopupButton = ({ onAdd, ApiPath }) => {
  return (
     <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Новый клиент</Modal.Header>
      <Modal.Content scrolling>
        <ClientModalContent onAdd = {onAdd} ApiPath={ApiPath} />
      </Modal.Content>
    </Modal>
   )
};

export default ListClients
