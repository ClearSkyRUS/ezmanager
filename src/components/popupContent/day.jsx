import React, { Component } from 'react'
import { Button, Form, Input, Icon, Accordion, List, Checkbox } from 'semantic-ui-react';
import { JustDayMas } from 'const';


class AddNewPopupContent extends Component {
  state = {
    "newDay": {
        "title": this.props.days.length + 1 + " День",
        "type": 'Простой',
        "active": 1,
        "meals": JustDayMas
    },
     "addDish": {
        "id": '',
        "value": ''
      },
     "addMeal": {
        "type": '',
        "dishs": []
      },
      "menuDay": {
        "activeItem": -1
      },
      "dropMeals": {
        "activeItem": -1
      }
   }
  setTitle = (e) => { this.setState({ newDay: { ...this.state.newDay, title: e.target.value}})};
  setType = (e) => { this.setState({ addMeal: { ...this.state.addMeal, type: e.target.value}})};
  delMeal = (i, j) => {
    var newData = [...this.state.newDay.meals];
     newData[i].meal.splice(j, 1);
    this.setState({newData})
    this.setState({ dropMeals: { ...this.state.dropMeals, activeItem: -1 }})
  };
   delDish = (i, j, k) => {
    var newData = [...this.state.newDay.meals];
     newData[i].meal[j].dishs.splice(k, 1);
    this.setState({newData})
  };
  setMeal = (i) =>  { 
      var newData = [...this.state.newDay.meals];
      newData[i].meal.push(this.state.addMeal);
      this.setState({newData})
      this.setState({ addMeal: { ...this.state.addMeal, type: ''}})
  };
  changeDrop = (i) => { 
    this.setState({ dropMeals: { ...this.state.dropMeals, activeItem: -1 }})
    if (this.state.menuDay.activeItem === i)
      i = -1;
    this.setState({ menuDay: { ...this.state.menuDay, activeItem: i }})
  };
   changeDropMeals = (i) => { 
    if (this.state.dropMeals.activeItem === i)
      i = -1;
    this.setState({ dropMeals: { ...this.state.dropMeals, activeItem: i }})
  };
   setId= (e, {value}) => { this.setState({ addDish: { ...this.state.addDish, id:  this.props.dishs.find(x => x.value === value )._id, value: value}})};
   setDish = (i, j) =>  { 
        var newData = [...this.state.newDay.meals];
      newData[i].meal[j].dishs.push(this.state.addDish);
      this.setState({newData})
      this.setState({ addDish: { ...this.state.addDish, value: ''}})
  };
  setMain = (i, j) => {
        var newData = [...this.state.newDay.meals];
        for (var meal of newData[i].meal) {
           meal.main = 0;
        }
      newData[i].meal[j].main = 1;
      this.setState({newData})
  }

 render() {
      const { newDay, addDish, addMeal, menuDay, dropMeals } = this.state;
      const { dishs, onAdd } = this.props;
      return (
        <div>
           <Form size='mini' >
                            <Form.Group  style = {{display: "flex", padding: "10px" }} >
                               <Input  value={newDay.title}
                                onChange={this.setTitle}
                                placeholder='Номер' />
                            </Form.Group>
            </Form>
           <Accordion styled fluid>
             {newDay.meals.map((meal, i) =>
              <div key = { i } >
                <Accordion.Title active={menuDay.activeItem === i} index={i} onClick={e => this.changeDrop(i)}>
                  <Icon name='dropdown' />
                  { meal.title }
                </Accordion.Title>
                <Accordion.Content active={menuDay.activeItem === i} >
                    <Form size='mini' >
                            <Form.Group  style = {{display: "flex"}} >
                               <Input value={addMeal.type}
                                onChange={this.setType}
                                placeholder='Добавте вариант...'
                                style = {{paddingRight: "5px"}} />
                              <Button size='tiny' onClick={e => this.setMeal(i) } circular icon='plus' style={{ cursor: 'pointer' }} />
                            </Form.Group>
                    </Form>
                  <Accordion.Accordion>
                    {meal.meal.map((dish, j) =>
                      <div key = { j } >
                         <Accordion.Title active={dropMeals.activeItem === j} index={j} onClick={e => this.changeDropMeals(j)}>
                            <Icon name='dropdown' />
                            { dish.type } <Checkbox radio checked ={dish.main === 1} onChange ={e => this.setMain(i, j)} />
                            <Icon size='small' onClick={e => this.delMeal(i, j) } name='trash' circular style ={{  cursor: 'pointer',   float: "right" }} />
                         </Accordion.Title>
                         <Accordion.Content  active={dropMeals.activeItem === j} style={{    paddingBottom: "0.5em"}}>
                          <Form size='mini' >
                            <Form.Group  style = {{display: "flex"}} >
                              <Form.Select options={dishs} value = {addDish.value} onChange={this.setId } placeholder='Выберете блюдо...'  search selection />
                              <Button size='tiny' onClick={e => this.setDish(i, j) } circular icon='plus' style={{ cursor: 'pointer' }} />
                            </Form.Group>
                            </Form>
                              <List size='small' celled ordered >
                                 {dish.dishs.map((item, k) => 
                                    <List.Item  key= {k}  >
                                        <List.Content style={{  paddingBottom: "0.5em"}}>
                                          <List.Header> {item.value}
                                            <Icon size='small' onClick={e => this.delDish(i, j, k) } name='trash' circular style ={{ cursor: 'pointer',    float: "right" }} />
                                          </List.Header>
                                          <List.Description>
                                           {dishs.find(x => x._id === item.id ).type}
                                          </List.Description>
                                        </List.Content>
                                    </List.Item>
                                  )}
                              </List>
                         </Accordion.Content>
                      </div>
                    )}
                  </Accordion.Accordion>
                </Accordion.Content>
              </div>
              )}
            </Accordion>
             <Button positive onClick = {onAdd.bind(this, this.state.newDay)} style={{ cursor: 'pointer',   float: 'right', marginTop: '10px' }} >
                Добавить
             </Button>
        </div>
       )
    }
};

class ChangePopupContent extends Component {
  state = {
    "newDay": this.props.day,
     "addDish": {
        "id": '',
        "value": ''
      },
     "addMeal": {
        "type": '',
        "dishs": []
      },
      "menuDay": {
        "activeItem": -1
      },
      "dropMeals": {
        "activeItem": -1
      }
   }
  setTitle = (e) => { this.setState({ newDay: { ...this.state.newDay, title: e.target.value}})};
  setType = (e) => { this.setState({ addMeal: { ...this.state.addMeal, type: e.target.value}})};
  delMeal = (i, j) => {
    var newData = [...this.state.newDay.meals];
     newData[i].meal.splice(j, 1);
    this.setState({newData})
    this.setState({ dropMeals: { ...this.state.dropMeals, activeItem: -1 }})
  };
     delDish = (i, j, k) => {
    var newData = [...this.state.newDay.meals];
     newData[i].meal[j].dishs.splice(k, 1);
    this.setState({newData})
  };
  setMeal = (i) =>  { 
      var newData = [...this.state.newDay.meals];
      newData[i].meal.push(this.state.addMeal);
      this.setState({newData})
      this.setState({ addMeal: { ...this.state.addMeal, type: ''}})
  };
  changeDrop = (i) => { 
    this.setState({ dropMeals: { ...this.state.dropMeals, activeItem: -1 }})
    if (this.state.menuDay.activeItem === i)
      i = -1;
    this.setState({ menuDay: { ...this.state.menuDay, activeItem: i }})
  };
   changeDropMeals = (i) => { 
    if (this.state.dropMeals.activeItem === i)
      i = -1;
    this.setState({ dropMeals: { ...this.state.dropMeals, activeItem: i }})
  };
   setId= (e, {value}) => { this.setState({ addDish: { ...this.state.addDish, id:  this.props.dishs.find(x => x.value === value )._id, value: value}})};
   setDish = (i, j) =>  { 
        var newData = [...this.state.newDay.meals];
      newData[i].meal[j].dishs.push(this.state.addDish);
      this.setState({newData})
      this.setState({ addDish: { ...this.state.addDish, value: ''}})
  };
    setMain = (i, j) => {
        var newData = [...this.state.newDay.meals];
        for (var meal of newData[i].meal) {
           meal.main = 0;
        }
      newData[i].meal[j].main = 1;
      this.setState({newData})
  }

 render() {
      const { newDay, addDish, addMeal, menuDay, dropMeals } = this.state;
      const { dishs, day, onUp, onRemove } = this.props;
      return (
        <div>
           <Form size='mini' >
                            <Form.Group  style = {{display: "flex", padding: "10px" }} >
                               <Input  value={newDay.title}
                                onChange={this.setTitle}
                                placeholder='Номер' />
                            </Form.Group>
            </Form>
           <Accordion styled fluid>
             {newDay.meals.map((meal, i) =>
              <div key = { i } >
                <Accordion.Title active={menuDay.activeItem === i} index={i} onClick={e => this.changeDrop(i)}>
                  <Icon name='dropdown' />
                  { meal.title } 
                </Accordion.Title>
                <Accordion.Content active={menuDay.activeItem === i} >
                    <Form size='mini' >
                            <Form.Group  style = {{display: "flex"}} >
                               <Input value={addMeal.type}
                                onChange={this.setType}
                                placeholder='Добавте вариант...'
                                style = {{paddingRight: "5px"}} />
                              <Button size='tiny' onClick={e => this.setMeal(i) } circular icon='plus' style={{ cursor: 'pointer' }} />
                            </Form.Group>
                    </Form>
                  <Accordion.Accordion>
                    {meal.meal.map((dish, j) =>
                      <div key = { j } >
                         <Accordion.Title active={dropMeals.activeItem === j} index={j} onClick={e => this.changeDropMeals(j)}>
                            <Icon name='dropdown' />
                            { dish.type } <Checkbox radio checked ={dish.main === 1} onChange ={e => this.setMain(i, j)} />
                            <Icon size='small' onClick={e => this.delMeal(i, j) } name='trash' circular style ={{  cursor: 'pointer',   float: "right" }} />
                         </Accordion.Title>
                         <Accordion.Content  active={dropMeals.activeItem === j} style={{    paddingBottom: "0.5em"}}>
                          <Form size='mini' >
                            <Form.Group  style = {{display: "flex"}} >
                              <Form.Select options={dishs} value = {addDish.value} onChange={this.setId } placeholder='Выберете блюдо...'  search selection />
                              <Button size='tiny' onClick={e => this.setDish(i, j) } circular icon='plus' style={{ cursor: 'pointer' }} />
                            </Form.Group>
                            </Form>
                              <List size='small' celled ordered >
                                 {dish.dishs.map((item, k) => 
                                    <List.Item  key= {k}  >
                                        <List.Content style={{  paddingBottom: "0.5em"}}>
                                          <List.Header> {item.value} 
                                            <Icon size='small' onClick={e => this.delDish(i, j, k) } name='trash' circular style ={{ cursor: 'pointer',    float: "right" }} />
                                          </List.Header>
                                          <List.Description>
                                           {dishs.find(x => x._id === item.id ).type}
                                          </List.Description>
                                        </List.Content>
                                    </List.Item>
                                  )}
                              </List>
                         </Accordion.Content>
                      </div>
                    )}
                  </Accordion.Accordion>
                </Accordion.Content>
              </div>
              )}
            </Accordion>
               <Button positive onClick = {onUp.bind(this, newDay)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Изменить
                </Button>
                <Button negative onClick = {onRemove.bind(this, day._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Удалить
                </Button>
        </div>
       )
    }
};


export { ChangePopupContent, AddNewPopupContent};