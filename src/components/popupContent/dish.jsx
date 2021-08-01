import React, { Component } from 'react'
import { Button, Form, Input, Radio, Icon, Table, Label, TextArea } from 'semantic-ui-react';
import { calcalculate, productParams } from 'core';

class DishModal extends Component {
   constructor(props) {
    super(props);

    var dish = []
    if (this.props.dish) {
      dish = this.props.dish
    } else {
      dish = {
        "title": '',
        "tehMap": '',
        "type": '',
        "image": '',
        "gramms": '',
        "productslist": []
      }
    }
    this.state = { 
      "newDish": dish,
      "addProduct": {
        "product": '',
        "value": '',
        "gramm": '',
        "cold": false,
        "hot": false,
        "ganes": false
      }
    };
  }
  setTitle = (e) => { this.setState({ newDish: { ...this.state.newDish, title: e.target.value}})};
  setTehMap = (e) => { this.setState({ newDish: { ...this.state.newDish, tehMap: e.target.value}})};
  setType = (e, {value}) => { this.setState({ newDish: { ...this.state.newDish, type: value}})};

  setId= (e, {value}) => { this.setState({ addProduct: { ...this.state.addProduct, product:  this.props.products.find(x => x.value === value )._id, value: value}})};
  setProduct = () =>  { 
      var newData = [...this.state.newDish.productslist, this.state.addProduct];
      this.setState({newDish: { ...this.state.newDish, productslist: newData }});

      this.setState({addProduct: { ...this.state.addProduct, id: '',  value: ''}});
  };
  delProduct = (i) => {
     var newData = this.state.newDish.productslist;
    newData.splice(i, 1);
    this.setState({newDish: { ...this.state.newDish, productslist: newData }});
  };
  setLossesCold = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].cold = !newData[i].cold
      this.setState({newData});
  };
  setLossesHot = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].hot = !newData[i].hot
      this.setState({newData});
  };
  setGanes = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].ganes = !newData[i].ganes
      this.setState({newData});
  };

  setNewProductGramm = (gramm, i) => {
      var newData = [...this.state.newDish.productslist];
      newData[i].gramm = parseFloat(gramm)
      this.setState({newData});
  };

  render() {
    const { newDish, addProduct } = this.state;
    const { onAdd, ApiPath, types, products, onUp, onRemove } = this.props;
      return (
      <div> 
         <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={newDish.title}
              onChange={this.setTitle}
              placeholder='Название' />
            </Form.Group>
            <TextArea placeholder='Техпроцесс' value={ newDish.tehMap } onChange={this.setTehMap} />
          </Form>
          <Form size='mini'>
            <label>Тип</label>
            <div> 
            <Form.Group style = {{    flexWrap: "wrap"}} >
              {types.map((type, i) =>
                  <Form.Field key = {i}
                    control={Radio}
                    label={ type.title }
                    value={ type._id }
                    checked={ newDish.type === type._id || newDish.type._id === type._id }
                    onChange={this.setType}  
                    style = {{    marginTop: "5px"}}
                  />
              )}
            </Form.Group>
            </div>
            <label>Продукты</label>
            <Form.Group>
              <Form.Select options={products} value = {addProduct.value} onChange={ this.setId } placeholder='Выберете продукт...'  search selection />
               <Button size='tiny' onClick={ this.setProduct } circular icon='plus' style={{ cursor: 'pointer',   float: 'right' }} />

            </Form.Group>
             <Form.Group>
               <Table basic='very' >
                  <Table.Body>
                    {newDish.productslist.map((product, i) => 
                      <Table.Row key={i}>
                        <Table.Cell>
                          <span>{(product.product.title) ? product.product.title : product.value}</span>
                        </Table.Cell>
                        <Table.Cell className = "FlexImprotant" style = {{ minWidth: "180px", maxWidth: "250px", display: "flex!important" }} >
                          <Form.Input  icon='weight' placeholder='Грамм' width={12}  value={product.gramm}  onChange={e => this.setNewProductGramm( e.target.value, i)}  type = 'number'/>
                        {((product.product.title) ? product.product.cold : products.find(o => o._id === product.product).cold) ? <Button size='mini' toggle active={ product.cold } onClick={e => this.setLossesCold(i) } circular icon='recycle' />
                          : ''
                        }
                        {((product.product.title) ? product.product.hot : products.find(o => o._id === product.product).hot) ? <Button size='mini' toggle active={ product.hot } onClick={e => this.setLossesHot(i) } circular icon='hotjar' />
                          : ''
                        }
                        {((product.product.title) ? product.product.ganes : products.find(o => o._id === product.product).ganes) ? <Button size='mini' toggle active={ product.ganes } onClick={e => this.setGanes(i) } circular icon='expand arrows alternate' />
                          : ''
                        }
                        </Table.Cell>
                        <Table.Cell style = {{ textAlign: "center" }} >
                           
                        </Table.Cell>
                        <Table.Cell>
                          <Button size="mini" onClick={e => this.delProduct(i) } circular icon='trash' style={{ cursor: 'pointer',   float: 'right' }} />
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Form.Group>
            <Form.Group style = {{ paddingTop: "10px" }}>
              <Label.Group size='large'>
                <Label basic>
                  {newDish.productslist.reduce((gramms, item) => gramms + item.gramm, 0)} <Icon name='weight' />
                </Label>
              </Label.Group>
            </Form.Group>
                {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.newDish)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath, this.state.newDish._id, this.state.newDish)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.newDish._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div>
                : ''}
          </Form>
         </div> 
       )
    }
};

export { DishModal };