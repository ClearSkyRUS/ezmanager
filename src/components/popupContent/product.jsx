import React, { Component } from 'react'
import { Button, Form, Input, Radio } from 'semantic-ui-react';

class AddNewPopupContent extends Component {

  state = {
    "title": '',
    "type": '',
    "otherType": '',
    "prot": '',
    "fat": '',
    "carb": '',
    "price": '',
    "cold": '',
    "hot": '',
    "ganes": ''
  }

  setTitle = (e) => { this.setState({title: e.target.value}) };
  setType = (e, {value}) => { this.setState({type: value}) };
  setOtherType = (e) => { this.setState({otherType: e.target.value}) };
  setProt = (e) => { this.setState({ prot: e.target.value }) };
  setFat = (e) => { this.setState({ fat: e.target.value }) };
  setCarb = (e) => { this.setState({ carb: e.target.value }) };
  setPrice = (e) => { this.setState({price: e.target.value}) };
  setLossCold = (e) => { this.setState({cold: e.target.value}) };
  setLossHot = (e) => { this.setState({hot: e.target.value}) };
  setGanes = (e) => { this.setState({ganes: e.target.value}) };

  render() {
    const { title, type, otherType, prot, fat, carb, price, cold, hot, ganes} = this.state;
    const { products, onAdd } = this.props;
      return (
      <div> 
         <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={title}
              onChange={this.setTitle}
              placeholder='Название' />
            </Form.Group>
          </Form>
          <Form size='mini'>
            <label>Тип</label>
            <div>
            <Form.Group style = {{    flexWrap: "wrap"}} >
              {products.map((product, i) =>
                  <Form.Field key = {i}
                    control={Radio}
                    label={ product.type }
                    value={ product.type }
                    checked={type === product.type }
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              )}
                <Form.Field
                    control={Radio}
                    label= 'Другой'
                    value= 'Другой'
                    checked={type === 'Другой'}
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              {(type === 'Другой')
                ? <Form.Field control={Input} label='Другой' value={otherType}  onChange={this.setOtherType} />
                : ''
              } 
            </Form.Group>
            </div>
            <label>Параметры</label>
            <Form.Group>
              <Form.Input icon='ruble sign' placeholder='Цена за кг' width={8}  value={price}  onChange={this.setPrice}  type = 'number'/>
              <Form.Input icon='pie graph' placeholder='Белки' width={8} value={prot}  onChange={this.setProt} type = 'number' />
              <Form.Input icon='pie graph' placeholder='Жиры' width={8} value={fat}  onChange={this.setFat} type = 'number' />
              <Form.Input icon='pie graph' placeholder='Углеводы' width={8} value={carb}  onChange={this.setCarb} type = 'number' />
            </Form.Group>
            <label>Потери/привар %</label>
            <Form.Group>
              <Form.Input icon='recycle' placeholder='Пот. холодные' width={6} type = 'number' value={cold}  onChange={this.setLossCold} />
              <Form.Input icon='hotjar' placeholder='Пот. горячие' width={6}  type = 'number' value={hot}  onChange={this.setLossHot} />
              <Form.Input icon='expand arrows alternate' placeholder='Привар' width={6}  type = 'number' value={ganes}  onChange={this.setGanes} />
            </Form.Group>
            <Button positive onClick = {onAdd.bind(this, this.state)} style={{ cursor: 'pointer',   float: 'right' }}>
            Добавить
            </Button>
          </Form>
         </div> 
       )
    }
};

class ChangePopupContent extends Component {
  state = {
     "_id": this.props.product._id,
    "title": this.props.product.title,
    "type": this.props.product.type,
    "otherType": '',
    "prot": this.props.product.prot,
    "fat": this.props.product.fat,
    "carb": this.props.product.carb,
    "price": this.props.product.price,
    "cold": this.props.product.cold,
    "hot": this.props.product.hot,
    "ganes": this.props.product.ganes
  }

  setTitle = (e) => { this.setState({title: e.target.value}) };
  setType = (e, {value}) => { this.setState({type: value}) };
  setOtherType = (e) => { this.setState({otherType: e.target.value}) };
  setProt = (e) => { this.setState({ prot: e.target.value }) };
  setFat = (e) => { this.setState({ fat: e.target.value }) };
  setCarb = (e) => { this.setState({ carb: e.target.value }) };
  setPrice = (e) => { this.setState({price: e.target.value}) };
  setLossCold = (e) => { this.setState({cold: e.target.value}) };
  setLossHot = (e) => { this.setState({hot: e.target.value}) };
  setGanes = (e) => { this.setState({ganes: e.target.value}) };

  render() {
    const { title, type, otherType, prot, fat, carb, price, cold, hot, ganes} = this.state;
    const { product, types, onRemove, onUp } = this.props;
      return(
         <div> 
         <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={title}
              onChange={this.setTitle}
              placeholder='Название' />
            </Form.Group>
          </Form>
          <Form size='mini'>
            <label>Тип</label>
            <div>
            <Form.Group style = {{    flexWrap: "wrap"}} >
              {types.map((product, i) =>
                  <Form.Field key = {i}
                    control={Radio}
                    label={ product.type }
                    value={ product.type }
                    checked={type === product.type }
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              )}
                <Form.Field
                    control={Radio}
                    label= 'Другой'
                    value= 'Другой'
                    checked={type === 'Другой'}
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              {(type === 'Другой')
                ? <Form.Field control={Input} label='Другой' value={otherType}  onChange={this.setOtherType} />
                : ''
              } 
            </Form.Group>
            </div>
            <label>Параметры</label>
            <Form.Group>
              <Form.Input icon='ruble sign' placeholder='Цена за кг' width={8}  value={price}  onChange={this.setPrice}  type = 'number'/>
              <Form.Input icon='pie graph' placeholder='Белки' width={8} value={prot}  onChange={this.setProt} type = 'number' />
              <Form.Input icon='pie graph' placeholder='Жиры' width={8} value={fat}  onChange={this.setFat} type = 'number' />
              <Form.Input icon='pie graph' placeholder='Углеводы' width={8} value={carb}  onChange={this.setCarb} type = 'number' />
            </Form.Group>
            <label>Потери/привар %</label>
            <Form.Group>
              <Form.Input icon='recycle' placeholder='Пот. холодные' width={6} type = 'number' value={cold}  onChange={this.setLossCold} />
              <Form.Input icon='hotjar' placeholder='Пот. горячие' width={6}  type = 'number' value={hot}  onChange={this.setLossHot} />
              <Form.Input icon='expand arrows alternate' placeholder='Привар' width={6}  type = 'number' value={ganes}  onChange={this.setGanes} />
            </Form.Group>
            <Button positive onClick = {onUp.bind(this, this.state)} style={{ cursor: 'pointer',   float: 'right' }}>Изменить</Button>
            <Button negative onClick = {onRemove.bind(this, product._id)} style={{ cursor: 'pointer',   float: 'right' }}>Удалить</Button>
          </Form>
         </div> 
        )
  }
};

export { ChangePopupContent, AddNewPopupContent};