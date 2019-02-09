import React from 'react'
import { Card, Icon, Popup, Button, Image, List } from 'semantic-ui-react'
import Loader from '../loader/loader';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';



const CartDay = ({ dishs, day }) => (
  <Card >
    <Card.Content>
        <Card.Content>
          <List>
            {day.meals.map((meal, i) =>
              <List.Item key={i} >
                {meal.name}:
                <List>
                  {meal.dishs.map((dish, i) =>
                    <List.Item key={i} >
                      {dishs.find(x => x.id === dish.id ).title } 
                      <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'>
                        {" " + dishs.find(x => x.id === dish.id ).type}
                      </span>
                    </List.Item> )}
                </List>
              </List.Item>
            )}
          </List>
        </Card.Content>
    </Card.Content>
    <Card.Content extra>
               <Popup
                  trigger={  <Icon name= 'signup' style={{ cursor: 'pointer',   float: 'right' }}/> }
                  content={ <div /> }
                  on='click'
                />
    </Card.Content>
  </Card>
)



const ListDays = ({ days, dishs, setDays, setDishs }) => {

     if (days == null) {
      axios.get('/days.json').then(({ data }) => {
        setDays(data);
      })
    return ( <Loader /> )
    }
    if (dishs == null) {
      axios.get('/dishs.json').then(({ data }) => {
        setDishs(data);
      })
    return ( <Loader /> )
    }

  return (
    <div>
    <Card.Group centered >
    {days.map((day, i) =>
        <CartDay dishs = {dishs} day = {day} key = {i} />
      )}
    </Card.Group>
        <AddNewPopupButton  />
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
  
export default ListDays