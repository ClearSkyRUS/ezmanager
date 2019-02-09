import React from 'react';
import { Button, Image, List, Icon, Popup } from 'semantic-ui-react';
import Loader from '../loader/loader';
import axios from 'axios';


const ClientItem = ({ client }) => (
    <List.Item>
      <List.Content floated='right'>
        <Button>Add</Button>
      </List.Content>
      {(client.gender === "f")
        ? <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png' />
        : <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png' />}
      <List.Content>{client.name + client.sale + "%"}</List.Content>
       <List.Content style={{ paddingTop: "5px"}}> {"Счет: " + client.check}  <Icon name="rub" /> { client.points } <Icon name="bitcoin" /> </List.Content>
       <List.Content style={{ paddingTop: "5px" }}> <Icon name="mobile alternate"/> {client.tel} 
      </List.Content>
      <List.Content style={{ paddingTop: "5px" }}>
       <Icon name="home" /> {"ул." + client.adres[0].street + ", д." + client.adres[0].number}
       {(client.adres[0].aport != null)
        ? (", кв." +client.adres[0].aport)
        : ''}
        {(client.adres[0].pod != null)
        ? (", под." +client.adres[0].pod)
        : ''}
         {(client.adres[0].domophone != null)
        ? (", домоф." +client.adres[0].domophone)
        : ''}
      </List.Content>

    </List.Item>
)

const ListClients = ({ clients, setClients }) => {
  if (clients == null) {
      axios.get('/clients.json').then(({ data }) => {
        setClients(data);
      })
    return ( <Loader /> )
    }

  return(
    <div>
      <List divided verticalAlign='middle'>
          {clients.map((client, i) =>
            <ClientItem key={i} client = {client} /> )}
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

export default ListClients
