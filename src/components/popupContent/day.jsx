import React, { Component } from 'react'
import { Button, Form, Input, Icon, Modal, Header, List, Radio, Checkbox } from 'semantic-ui-react';
import { JustDayMas } from 'const';

import ItemsChoser from 'components/modalChoser/itemsChoser';


class DayModal extends Component {
   constructor(props) {
    super(props);

    var day = []
    if (this.props.day) { 
      day = this.props.day
    } else {
      day = {
        "title": this.props.days.length + 1 + " День",
        "type": 'Простой',
        "active": false, 
        "meals": JustDayMas
      }
    }
    this.state = { 
       "day": day,
       "addDish": {
        "dish": '',
        "value": ''
        },
       "addMeal": {
          "type": '',
          "dishs": []
        }
    };
  }
  setTitle = (e) => { this.setState({ day: { ...this.state.day, title: e.target.value}})};
  setMain = (meal, mealsKey) => {
    for (var mealItem of this.state.day.meals[mealsKey].meal)
      mealItem.main = false;
    meal.main = true;
    this.setState(this.state.day.meals[mealsKey]);
  }
  setDishsToMeal = (meal, dishs) => {
    var dishsObj = [];
    for (var dish of dishs) {
      dishsObj.push({dish: dish._id, value: dish.title, procent: 100})
      dish.checked = false;
    }
    meal.dishs = [...meal.dishs, ...dishsObj];
    this.setState(meal);
  }
  setChecked = (item) => {
    item.checked = true;
    this.setState(item);
  }
  deleteDish = (meal, dish) => {
    meal.dishs.splice(meal.dishs.indexOf(dish), 1)
    this.setState(meal);
  }
  render() {
      const { day, addDish, addMeal, menuDay, dropMeals } = this.state;
      const { onAdd, ApiPath, dishs, onUp, onRemove } = this.props;
      return (
        <div>
           <Form size='mini' >
              <Form.Group  style = {{display: "flex", padding: "10px" }} >
                <Input  value={day.title}
                  onChange={this.setTitle}
                  placeholder='Номер' />
              </Form.Group>
            </Form>
            <List celled>
              {day.meals.map((mealItem, i) =>
                <MealItem key = {i} mealKey = {i} meal = {mealItem}  dishs = {dishs} deleteDish ={this.deleteDish} setChecked={this.setChecked} setMain = {this.setMain} setDishsToMeal={this.setDishsToMeal} />
              )}
            </List>
             {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.day)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath,  this.state.day._id, this.state.day)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.day._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button> 
                  </div>
                : ''}
        </div>
       )
    }
};

const MealItem = ({meal, dishs, setMain, mealKey, setDishsToMeal, setChecked, deleteDish}) => (
  <List.Item>
    <List.Content floated='right'>
      <Input size='mini' value={meal.procent} style={{ width: "50px"}} />
    </List.Content>
    <List.Content>
      <List.Header as="a">{meal.title}</List.Header>
      <List.Description>
          <List horizontal>
             {meal.meal.map((mealItem, i) =>
                <DishsItem key = {i} mealsItemKey = {mealKey} meal = {mealItem}  dishs = {dishs} deleteDish = {deleteDish} setChecked={setChecked} setMain={setMain} setDishsToMeal={setDishsToMeal} />
              )}
          </List>
      </List.Description>
    </List.Content>
  </List.Item> 
)

const DishsItem = ({meal, dishs, setMain, deleteDish, mealsItemKey, setDishsToMeal, setChecked}) => (
    <List.Item style={{ verticalAlign: 'top', marginBottom: '5px', borderTop: '#4183c4 solid', width: '180px'}}>
      <List.Content>
        <List.Header>{meal.type} <Radio checked={meal.main} onChange={e => setMain(meal, mealsItemKey)} /></List.Header>
        <List.Description> 
          <List>
            {meal.dishs.map((dishItem, i) =>
              <DishItem key = {i} dish = {dishItem}  meal = {meal} deleteDish={deleteDish} />
            )}
          </List>
          <List.Item>
            <List.Content>
              <List.Description> 
                 <Modal trigger={<Button size='tiny' circular icon='plus' style={{ cursor: 'pointer',   float: 'right' }} />} closeIcon>
                    <Modal.Header>Выберете блюдо/блюда</Modal.Header>
                    <ItemsChoser items={dishs} meal={meal} setChecked={setChecked} setDishsToMeal={setDishsToMeal} />
                  </Modal>
              </List.Description> 
            </List.Content>
          </List.Item>
        </List.Description>
      </List.Content>
    </List.Item> 
)

const DishItem = ({meal, dish, deleteDish}) => (
  <List.Item>
    <List.Content floated='right'>
      <Input size='mini' value={dish.procent} style={{ width: "50px"}} />
    </List.Content>
    <Icon name='close' onClick={e => deleteDish(meal, dish)} style={{ cursor: "pointer" }} />
    <List.Content>
      <List.Description>
        {(dish.dish.title) ? dish.dish.title : dish.value}
      </List.Description>
    </List.Content>
  </List.Item> 
)

export { DayModal };