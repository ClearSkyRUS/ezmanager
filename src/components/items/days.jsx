import React from 'react'
import { Card, Icon, Button, List, Modal, Header, Grid } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import { AddNewPopupContent, ChangePopupContent} from '../popupContent/day';

const CartDay = ({ dishs, day, onUp, onRemove }) => (
  <Card >
        <Card.Content>
        <Card.Header>{day.title}</Card.Header>
              <List divided horizontal>
                <Grid columns={2} divided>
                {day.meals.map((meal, i) =>
                <Grid.Column key={i} width = {8}>
                  <List.Item  >
                  <List.Content>
                    <Header as='h4' color='olive'>
                      {meal.title}:
                    </Header>
                  </List.Content>
                  <List>
                      {meal.meal.map((dish, j) =>
                        <List.Item key={j} >
                          <List.Content>
                            <Header as='h5' color='teal'>
                              { dish.type}
                              {(dish.main === 1)
                                ? <Icon name='check circle outline' size='tiny' />
                                : ''}
                            </Header>
                          </List.Content>
                          <List size='mini' >
                            {dish.dishs.map((item, k) => 
                                <List.Item key={k} >
                                    <List.Content style={{ fontSize: "xx-small" }}>
                                              <List.Header> {item.value} </List.Header>
                                              <List.Description>
                                               {dishs.find(x => x._id === item.id ).type}
                                              </List.Description>
                                    </List.Content>
                                </List.Item>
                              )}
                          </List>
                        </List.Item> )}
                    </List>
                  </List.Item>
                  </Grid.Column>
                )}
              </Grid>
           </List>
    </Card.Content>
    <Card.Content extra>
        <Modal trigger={ <Icon name= 'signup' style={{ cursor: 'pointer',   float: 'right' }}/>} closeIcon>
                  <Modal.Header>Измените/Удалите день</Modal.Header>
                  <Modal.Content scrolling>
                    <ChangePopupContent day = {day} dishs = {dishs} onUp = {onUp} onRemove = {onRemove} />
                  </Modal.Content>
        </Modal>
    </Card.Content>
  </Card>
)



const ListDays = ({ days, dishs, onAdd, onUp, onRemove }) => {

    if (days && dishs)
       return (
        <div>
          <Card.Group centered >
          {days.map((day, i) =>
              <CartDay dishs = {dishs}  day = {day} onUp = {onUp} onRemove = {onRemove} key = {i} />
            )}
          </Card.Group>
          <AddNewPopupButton dishs={ dishs } days = {days} onAdd={ onAdd } />
        </div>
      )
     return ( <Loader /> )
}

const AddNewPopupButton = ({dishs, days,  onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте день</Modal.Header>
      <Modal.Content scrolling>
        <AddNewPopupContent dishs = {dishs} days = {days} onAdd = { onAdd } />
      </Modal.Content>
    </Modal>
   )
};
  
export default ListDays