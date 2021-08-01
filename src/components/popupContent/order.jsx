import React, { Component } from 'react'
import { Button, Form, Input, Icon, Label, Table, Popup } from 'semantic-ui-react';
import { OrderModel } from 'const';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';


class OrderModalContent extends Component {
 constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    var order = []
    var client = {"value": ''}
    var program = {"value": ''}
    if (this.props.order) {
      order = this.props.order
      client = this.props.clients.find(x => x._id === this.props.order.client)
      program = this.props.programs.find(x => x._id === this.props.order.cart[0].program)
      for ( var day of order.cart[0].days) {
        if (typeof(day) === "string")
          order.cart[0].days[order.cart[0].days.indexOf(day)] = new Date(day.substr(0,10));
      }
    } else {
      order = OrderModel
      var date = new Date()
      order.date = (formatDate(date))
    }
    var awibleDate = new Date()
    if (awibleDate.getHours() > 21) {
      awibleDate.setDate(awibleDate.getDate()+2)
    } else {
      awibleDate.setDate(awibleDate.getDate()+1)
    }
    this.state = {  
      "order": order,
      "saleAfter5Days": 10, 
      "client": client,
      "program": program,
      "chosenItem": [],
      "disabledDays" :
        {
          after: new Date(2017, 1, 1),
          before: new Date(awibleDate.getFullYear(), awibleDate.getMonth(), awibleDate.getDate()),
        }
    };
  }

setClient= (e, {value}) => {
  this.setState({ order: { ...this.state.order, client:  this.props.clients.find(x => x.value === value )._id}, client: this.props.clients.find(x => x.value === value )})
  this.setCartItemName(this.props.clients.find(x => x.value === value ).name)
};
setCartItemName = (name) => {
  var newData = [...this.state.order.cart];
     newData[0].name =  name;
    this.setState({newData})
}
setProgram = (e, {value}) => {
   var newData = [...this.state.order.cart];
     newData[0].program =  this.props.programs.find(x => x.value === value )._id;
    this.setState({newData})
    this.setState({program: this.props.programs.find(x => x.value === value )})
}
setOption = (item, option) => {
  item.option = option.cal;
  if (item.quanity !== 0) {
    item.price = option.price * item.quanity
  } else {
    item.price = option.price
  }
   this.setState({item})
   this.setQuanity(item.quanity)
}
setQuanity = (quanity) => {
  var newData = [...this.state.order.cart];
  if (quanity !== 0) {
    if (newData[0].quanity !== 0) 
      newData[0].price = newData[0].price/newData[0].quanity 

     newData[0].quanity =  parseFloat(quanity);
     newData[0].price =   newData[0].price * parseFloat(quanity);
  } else {
    newData[0].price = newData[0].price/newData[0].quanity 
    newData[0].quanity =  0;
  }

  this.setState({newData})
  this.calculateTotal()
}
SetChosenItem = (item) => {
  this.setState({chosenItem: item})
}
setBonuses = (e) => {
  var points = parseFloat(e.target.value)
  if (this.state.client.points < points)
    points = this.state.client.points
  this.setState({order: { ...this.state.order, bonuses: points}});
} 
handleDayClick(day, {selected}) {
  if (day > this.state.disabledDays.before) {
    var item = this.state.chosenItem;
    if (selected) {
      const selectedIndex = item.days.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      item.days.splice(selectedIndex, 1);
    } else {
     item.days.push(day);
    }
    this.setState({ item });
    this.setQuanity(item.days.length)
  }
}
calculateTotal = () => {
  var {saleAfter5Days, order, client} = this.state
  var totalDays = 0;
  order.totalsale = 0;
  if (client)
    order.totalsale = client.sale
  totalDays = order.cart.reduce((days, mass) => days + mass.days.length, 0);
  order.totalprice = order.cart.reduce((price, mass) => price + mass.price, 0);
  if (totalDays > 4 && order.totalsale<91)
    order.totalsale = order.totalsale + saleAfter5Days

  order.totalprice =  order.totalprice * ((100-order.totalsale)/100)

    order.totalprice = order.totalprice - order.bonuses

  this.setState({ order })
}
render() {
      const { order, program, client } = this.state;
      const { clients, programs, onAdd, onUp, onRemove, ApiPath } = this.props;
      return (
      	<Form size='tiny'>
          <Label basic  style = {{marginBottom: "10px"}} >{"Дата заказа: " + order.date}</Label>
          <Form.Group>
            <Form.Select value = {client.value} options={clients} onChange={ this.setClient } placeholder='Клиент...'  search selection />
          </Form.Group>
          <Form.Group>
            <Table basic='very'>
              <Table.Body>
                {order.cart.map((item, i) => 
                  <Table.Row key = {i}>
                    <Table.Cell> <Input value={item.name} onChange={e => this.setCartItemName(e.target.value)} placeholder='Имя...' /> </Table.Cell>
                    <Table.Cell><Form.Select value = {program.value} options={programs} onChange={ this.setProgram } placeholder='Программа...'  search selection /></Table.Cell>
                    <Table.Cell>
                      {(program.value !== '')
                        ? program.options.map((option, j) =>
                            <Button key = {j} size='mini' onClick={e => this.setOption(item, option)} active={item.option === option.cal} basic >{option.cal} </Button>
                          )
                        : ''}
                    </Table.Cell>
                    <Table.Cell>
                     <Popup
                        trigger={<Button basic onClick={e=>this.SetChosenItem(item)} icon='calendar alternate outline' circular />}
                        content={<DayPicker localeUtils={MomentLocaleUtils} selectedDays={item.days} disabledDays={this.state.disabledDays} locale={'ru'} onDayClick={this.handleDayClick} />}
                        on='click'
                      />
                    </Table.Cell>
                    <Table.Cell> <Label basic style={{ width: '80px'}} >{"Дней: " + item.quanity}</Label> </Table.Cell>
                    <Table.Cell> <Label basic style={{ width: '80px'}} >{item.price} <Icon name='rub' /></Label> </Table.Cell>
                  </Table.Row> )}
              </Table.Body>
            </Table>
          </Form.Group>

          <Form.Group>
            {(client.value !== '')
            ? <span> 
                <Label.Group size='large'>
                  <Label basic>
                    {"Счет клиента: " + client.check}  <Icon name="rub" /> { client.points } <Icon name="bitcoin" /> { " " + client.sale + " % "}
                  </Label>
                </Label.Group>
                <Form.Field control={Input} 
                  value={order.bonuses}
                  onChange={this.setBonuses}
                  disabled={client.points === 0}
                  placeholder='Использовать'
                  icon='bitcoin' 
                  style = {{width: "100px"}} 
                  type = "number"/>
            </span>
            : ''}
            <span> 
                <Label.Group size='large'>
                  <Label basic>
                    {"К оплате: " + order.totalprice} <Icon name="rub" /> { "Начисление: " + order.totalprice*0.1 } <Icon name="bitcoin" /> { "Скидка: " + order.totalsale + " %"}
                  </Label>
                </Label.Group>
            </span>
            <span style={{ marginRight: "5px", marginLeft: "auto"}} > 
            {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.order)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath, this.state.order._id, this.state.order)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.order._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div>
                : ''}
            </span> 
          </Form.Group>
        </Form>
      )
  }
}

function formatDate(date) {
  var hh = date.getHours();
  if (hh < 10) hh = '0' + hh;

  var mi = date.getMinutes();
  if (mi < 10) mi = '0' + mi;

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return hh + ':' + mi + " " + dd + '.' + mm + '.' + yy;
}

export { OrderModalContent };