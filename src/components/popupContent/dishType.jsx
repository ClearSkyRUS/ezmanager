import React, { Component } from 'react'
import { Button, Form, Input, Label, Icon } from 'semantic-ui-react';


class DishTypesModalContent extends Component {
  constructor(props) {
    super(props);

    var dishType = []
    if (this.props.dishType) {
      dishType = this.props.dishType
    } else {
      dishType = {
        "title": '',
        "unit": '%',
        "max": '',
        "min": '',
        "portions": []
      }
    }
    this.state = {  
      "dishType": dishType,
      "portion": {
        "after": '',
        "value": ''
      }
    };
  }
  setTitle = (e) => {this.setState({dishType: { ...this.state.dishType, title: e.target.value}})}
  setUnit = (value) => {this.setState({dishType: { ...this.state.dishType, unit: value}})}
  setMax = (e) => {this.setState({dishType: { ...this.state.dishType, max: e.target.value}})}
  setMin = (e) => {this.setState({dishType: { ...this.state.dishType, min: e.target.value}})}
  addPortion = () => {
    var newData = [...this.state.dishType.portions];
    var portion = this.state.portion;
    if (!isNaN(portion.after) && !isNaN(portion.value) && portion.value != '' && portion.after != '') {
      newData.push(portion);
      this.setState({dishType: { ...this.state.dishType, portions: newData}})
      this.clearPortion()
    }  else
      alert('Проция не настроена!') 
  }

  deleteportion = (i) => {
    var newData = [...this.state.dishType.portions];
    newData.splice(i, 1);
    this.setState({dishType: { ...this.state.dishType, portions: newData}})
  }

  clearPortion = () => {this.setState({portion: { ...this.state.portion, after: '', value: ''}})}

  setPortionAfter = (e) => {this.setState({portion: { ...this.state.portion, after: e.target.value}})}
  setPortionValue = (e) => {this.setState({portion: { ...this.state.portion, value: e.target.value}})}
  
  render() {
      const { dishType, portion } = this.state;
      const { onAdd, onUp, onRemove, ApiPath } = this.props;
      return (
      	<Form>
            <Form.Group widths='equal'>
              <Form.Input value={dishType.title}
              label='Тип'
              onChange={this.setTitle}
              placeholder='Тип' />
            </Form.Group>
            <Form.Group size='small'>
              <Button.Group>
                <Button size='small' basic toggle active={ dishType.unit === "%" } onClick={e => this.setUnit("%") } circular >%</Button>
                <Button size='small' basic toggle active={ dishType.unit === "Шт" } onClick={e => this.setUnit("Шт") } circular >Шт</Button>
                <Button size='small' basic toggle active={ dishType.unit === "Гр" } onClick={e => this.setUnit("Гр") } circular >Гр</Button>
              </Button.Group>
            </Form.Group>
            <Form.Group>
              <Form.Field disabled={dishType.unit === "Гр"}>
                <label>Макс и мин порции в {(dishType.unit === "Шт") ? 'Шт' : 'Гр'}</label>
                <Form.Group>
                  <Form.Input value={dishType.max} onChange={this.setMax} placeholder='max'  type='number' style = {{width: "120px"}}/>
                  <Form.Input value={dishType.min} onChange={this.setMin}placeholder='min' type='number' style = {{width: "120px"}}/>
                </Form.Group>
              </Form.Field>
            </Form.Group>
            <Form.Group> 
              <Form.Field disabled={dishType.unit !== "Гр"}>
                <label>Фиксированые порции</label>
                <Form.Group>
                  <Form.Input value={portion.after} onChange={this.setPortionAfter} placeholder='После, Ккал' type='number' style = {{width: "120px"}}/>
                  <Form.Input value={portion.value} onChange={this.setPortionValue} placeholder='Кол-во, Гр' type='number' style = {{width: "120px"}}/>
                  <Button size='large' basic onClick={this.addPortion} circular icon='plus'/>
                </Form.Group>
              </Form.Field>
            </Form.Group>
            <Form.Field disabled={dishType.unit !== "Гр"}>
                  {dishType.portions.map((portionItem, i) =>
                    <Label key={i} basic>
                      {portionItem.after} Ккал: {portionItem.value} Гр
                      <Icon name='delete' onClick={e=>this.deleteportion(i)} />
                    </Label>
                  )}
            </Form.Field>

            {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.dishType)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath, this.state.dishType._id, this.state.dishType)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.dishType._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div>
                : ''}
        </Form>
      )
  }
}


export { DishTypesModalContent };