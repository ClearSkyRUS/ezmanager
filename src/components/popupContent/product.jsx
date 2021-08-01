import React, { Component } from 'react'
import { Button, Form, Input, Radio } from 'semantic-ui-react';

class ProductModal extends Component {
  constructor(props) {
    super(props);

    var product = []
    if (this.props.product) {
      product = this.props.product
    } else {
      product = {
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
    }
    this.state = {  
      "product": product
    };
  }

    setTitle = (e) => { this.setState({product: {...this.state.product, title: e.target.value}})};
    setType = (e, {value}) => { this.setState({product: {...this.state.product, type: value}})};
    setOtherType = (e) => { this.setState({product: {...this.state.product, otherType: e.target.value}})};
    setProt = (e) => { this.setState({product: {...this.state.product, prot: e.target.value }})};
    setFat = (e) => { this.setState({product: {...this.state.product, fat: e.target.value }})};
    setCarb = (e) => { this.setState({ product: {...this.state.product, carb: e.target.value }})};
    setPrice = (e) => { this.setState({product: {...this.state.product, price: e.target.value}})};
    setLossCold = (e) => { this.setState({product: {...this.state.product, cold: e.target.value}})};
    setLossHot = (e) => { this.setState({product: {...this.state.product, hot: e.target.value}})};
    setGanes = (e) => { this.setState({product: {...this.state.product, ganes: e.target.value}})};

  render() {
    const { product } = this.state;
    const { products, ApiPath, onAdd, onUp, onRemove } = this.props;
      return (
      <div> 
         <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={product.title}
              onChange={this.setTitle}
              placeholder='Название' />
            </Form.Group>
          </Form>
          <Form size='mini'>
            <label>Тип</label>
            <div>
            <Form.Group style = {{    flexWrap: "wrap"}} >
              {products.map((productType, i) =>
                  <Form.Field key = {i}
                    control={Radio}
                    label={ productType.type }
                    value={ productType.type }
                    checked={product.type === productType.type }
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              )}
                <Form.Field
                    control={Radio}
                    label= 'Другой'
                    value= 'Другой'
                    checked={product.type === 'Другой'}
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              {(product.type === 'Другой')
                ? <Form.Field control={Input} label='Другой' value={product.otherType}  onChange={this.setOtherType} />
                : ''
              } 
            </Form.Group>
            </div>
            <label>Параметры</label>
            <Form.Group>
              <Form.Input icon='ruble sign' placeholder='Цена за кг' width={8}  value={product.price}  onChange={this.setPrice}  type = 'number'/>
              <Form.Input icon='pie graph' placeholder='Белки' width={8} value={product.prot}  onChange={this.setProt} type = 'number' />
              <Form.Input icon='pie graph' placeholder='Жиры' width={8} value={product.fat}  onChange={this.setFat} type = 'number' />
              <Form.Input icon='pie graph' placeholder='Углеводы' width={8} value={product.carb}  onChange={this.setCarb} type = 'number' />
            </Form.Group>
            <label>Потери/привар %</label>
            <Form.Group>
              <Form.Input icon='recycle' placeholder='Пот. холодные' width={6} type = 'number' value={product.cold}  onChange={this.setLossCold} />
              <Form.Input icon='hotjar' placeholder='Пот. горячие' width={6}  type = 'number' value={product.hot}  onChange={this.setLossHot} />
              <Form.Input icon='expand arrows alternate' placeholder='Привар' width={6}  type = 'number' value={product.ganes}  onChange={this.setGanes} />
            </Form.Group>
 
            {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.product)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath, this.state.product._id, this.state.product)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.product._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div> 
            : ''}
          </Form>
         </div>  
       )
    }
};

export { ProductModal };