import React from 'react'
import { Card, Icon, Button, List, Modal, Header, Grid, Checkbox } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import { DayModal } from '../popupContent/day';

const CartDay = ({ dishs, day, onUp, onRemove, ApiPath }) => (
  <div>
  <Checkbox toggle checked={day.active} onChange = {onUp.bind(this, ApiPath, day._id, {active: !day.active})} />
  <Modal trigger={  <List.Item>
                      <List.Content> 
                        <Header size='huge'>{day.title}</Header>
                          <div>
                            <List horizontal divided size="small">
                              {day.meals.map((meal, i) =>
                                <MealItem key = {i} dishs = {dishs}  meal = {meal}/>
                              )}
                            </List>
                          </div>
                      </List.Content>
                    </List.Item> } closeIcon>
    <Modal.Header>Измените/Удалите день</Modal.Header>
    <Modal.Content scrolling>
      <DayModal day = {day} ApiPath={ApiPath} dishs = {dishs} onUp = {onUp} onRemove = {onRemove} />
    </Modal.Content>
  </Modal>
  </div>
) 


const MealItem = ({dishs, meal}) => (
  <List.Item style={{ verticalAlign: 'top', marginBottom: '5px', borderTop: '#4183c4 solid', width: '180px'}}>
    <List.Content> 
      <List.Header as = "a">{meal.title} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {meal.procent}</span></List.Header>
      <div>
        <List>
          {meal.meal.map((mealItem, i) =>
              <ListMeal key = {i} dishs = {dishs}  meal = {mealItem} />
          )}
        </List>
      </div>
    </List.Content>
  </List.Item>
)

const ListMeal = ({dishs, meal}) => (
  <List.Item style={{ verticalAlign: 'top', marginBottom: '5px'}}>
    <List.Content> 
      <List.Header>{meal.type} {(meal.main) ? <Icon color='green' name='check circle outline' /> : ''}</List.Header>
        <List.Description>
        <List>
        {meal.dishs.map((dish, i) =>
          <List.Item key={i}>
            <Icon name='right triangle' />
            <List.Content>
              <List.Description>
                {(dish.dish.title) ? dish.dish.title : dish.value} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {dish.procent}</span>
              </List.Description>
            </List.Content>
          </List.Item> 
        )}
        </List>
        </List.Description>
    </List.Content>
  </List.Item>
)

const ListDays = ({ days, dishs, ApiPath, onAdd, onUp, onRemove }) => {

    if (days)
       return (
        <div>
          <List celled >
          {days.map((day, i) =>
              <CartDay dishs = {dishs} ApiPath={ApiPath}  day = {day} onUp = {onUp} onRemove = {onRemove} key = {i} />
            )}
          </List>
          <AddNewPopupButton dishs={ dishs } ApiPath={ApiPath} days = {days} onAdd={ onAdd } />
        </div>
      )
     return ( <Loader /> )
}

const AddNewPopupButton = ({dishs, days, ApiPath, onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте день</Modal.Header>
      <Modal.Content scrolling>
        <DayModal dishs = {dishs} ApiPath={ApiPath} days = {days} onAdd = { onAdd } />
      </Modal.Content>
    </Modal>
   )
};
  
export default ListDays