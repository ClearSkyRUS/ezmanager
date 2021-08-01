import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react';
import { ClientModel } from 'const';


class ClientModalContent extends Component {
 constructor(props) {
    super(props);

    var client = []
    if (this.props.client) {
      client = this.props.client
    } else {
      client = ClientModel
    }
    this.state = {  
      "client": client
    };
  }
  setName = (e) => {this.setState({client: { ...this.state.client, name: e.target.value}})}
  setTel = (e) => {this.setState({client: { ...this.state.client, tel: parseFloat(e.target.value)}})}
  setGender = (value) => {this.setState({client: { ...this.state.client, gender: value}})}
  setStreet = (e) => {
  var newData = [...this.state.client.adres];
     newData[0].street =  e.target.value;
    this.setState({newData})
}
  setNumber = (e) => {
  var newData = [...this.state.client.adres];
     newData[0].number =  e.target.value;
    this.setState({newData})
}
  setAport = (e) => {
  var newData = [...this.state.client.adres];
     newData[0].aport =  e.target.value;
    this.setState({newData})
}
  setPod = (e) => {
  var newData = [...this.state.client.adres];
     newData[0].pod =  e.target.value;
    this.setState({newData})
}
  setDomophone = (e) => {
  var newData = [...this.state.client.adres];
     newData[0].domophone =  e.target.value;
    this.setState({newData})
}
setCheck = (e) => {this.setState({client: { ...this.state.client, check: parseFloat(e.target.value)}})}
setPoints = (e) => {this.setState({client: { ...this.state.client, points: parseFloat(e.target.value)}})}
setSale = (e) => {this.setState({client: { ...this.state.client, sale: parseFloat(e.target.value)}})}
setTime = (e) => {this.setState({client: { ...this.state.client, time: e.target.value}})}
render() {
      const { client } = this.state;
      const { onAdd, onUp, onRemove, ApiPath } = this.props;
      return (
      	<Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={client.name}
              onChange={this.setName}
              placeholder='Имя' />
              <Form.Field control={Input} 
              value={client.tel}
              onChange={this.setTel}
              placeholder='Номер телефона' />
              <Button size='large' toggle active={ client.gender === "male" } onClick={e => this.setGender("male") } circular icon='male' />
              <Button size='large' toggle active={ client.gender === "female" } onClick={e => this.setGender("female") } circular icon='female' />
            </Form.Group>
            <label>Счет</label>
            <Form.Group>
              <Form.Field control={Input} 
              value={client.check}
              onChange={this.setCheck}
              placeholder='Счет' 
              type='number'
              icon='rub' 
              style = {{width: "100px"}} />
              <Form.Field control={Input} 
              value={client.points}
              onChange={this.setPoints}
              placeholder='Бонусы'
              type='number'
              icon='bitcoin' 
              style = {{width: "100px"}} />
              <Form.Field control={Input} 
              value={client.sale}
              onChange={this.setSale}
              placeholder='Скидка' 
              type='number'
              icon='arrow alternate circle down outline'
              style = {{width: "100px"}}/>
            </Form.Group>
            <label>Адрес</label>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={client.adres[0].street}
              onChange={this.setStreet}
              placeholder='Улица' />
            </Form.Group>
            <Form.Group>
              <Form.Field control={Input} 
              value={client.adres[0].number}
              onChange={this.setNumber}
              placeholder='Дом' 
              style = {{width: "100px"}}/>
              <Form.Field control={Input} 
              value={client.adres[0].aport}
              onChange={this.setAport}
              placeholder='Квартира' 
              style = {{width: "100px"}}/>
              <Form.Field control={Input} 
              value={client.adres[0].pod}
              onChange={this.setPod}
              placeholder='Подъезд'
              style = {{width: "100px"}} />
              <Form.Field control={Input} 
              value={client.adres[0].domophone}
              onChange={this.setDomophone}
              placeholder='Домофон' 
              style = {{width: "100px"}}/>
              <Form.Field control={Input} 
              value={client.time}
              onChange={this.setTime}
              placeholder='Время' 
              style = {{width: "100px"}}/>
             </Form.Group>

            {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.client)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath, this.state.client._id, this.state.client)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.client._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div>
                : ''}
        </Form>
      )
  }
}


export { ClientModalContent };