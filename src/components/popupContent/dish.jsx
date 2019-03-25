import React, { Component } from 'react'
import { Button, Form, Input, Radio, Icon, Table, Label } from 'semantic-ui-react';
import { calcalculate, productParams } from 'core';

class AddNewPopupContent extends Component {

  state = {
    "newDish": {
        "title": '',
        "type": '',
        "otherType": '',
        "image": '',
        "gramms": '',
        "cal": '',
        "prot": '',
        "fat": '',
        "carb": '',
        "price": '',
        "productslist": []
      },
     "addProduct": {
        "id": '',
        "value": '',
        "gramm": '',
        "prot": '',
        "fat": '',
        "carb": '',
        "price": '',
        "cold": false,
        "hot": false,
        "ganes": false
      }
  }

  setTitle = (e) => { this.setState({ newDish: { ...this.state.newDish, title: e.target.value}})};
  setType = (e, {value}) => { this.setState({ newDish: { ...this.state.newDish, type: value}})};
  setOtherType = (e) => { this.setState({ newDish: { ...this.state.newDish, otherType: e.target.value}})};

  setId= (e, {value}) => { this.setState({ addProduct: { ...this.state.addProduct, id:  this.props.products.find(x => x.value === value )._id, value: value}})};
  setProduct = () =>  { 
      var newData = [...this.state.newDish.productslist, this.state.addProduct];
      this.setState({newDish: { ...this.state.newDish, productslist: newData }});

      this.setState({addProduct: { ...this.state.addProduct, id: '',  value: ''}});
  };
  delProduct = (i) => {
     var newData = this.state.newDish.productslist;
    newData.splice(i, 1);
    this.setState({newDish: { ...this.state.newDish, productslist: newData }});
    this.sum();
  };
  setLossesCold = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].cold = !newData[i].cold
      this.calculateParams(newData, i);
      this.sum();
  };
  setLossesHot = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].hot = !newData[i].hot
      this.calculateParams(newData, i);
      this.sum();
  };
  setGanes = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].ganes = !newData[i].ganes
      this.calculateParams(newData, i);
      this.sum();
  };

  setNewProductGramm = (gramm, i) => {
      var newData = [...this.state.newDish.productslist];
      newData[i].gramm = parseFloat(gramm)
      this.calculateParams(newData, i);
      this.sum();
  };
  calculateParams = (newData, i) => {
      newData[i].prot = productParams(newData[i].id, newData[i].hot, false, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).prot/100, this.props.products).toFixed(1);
      newData[i].fat = productParams(newData[i].id, newData[i].hot, false, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).fat/100, this.props.products).toFixed(1);
      newData[i].carb = productParams(newData[i].id, newData[i].hot, false, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).carb/100, this.props.products).toFixed(1);
      newData[i].price = productParams(newData[i].id, newData[i].hot, newData[i].cold, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).price/1000, this.props.products).toFixed(2);
      this.setState({newData});
  }
  sum = () => {
    var gramms = this.state.newDish.productslist.reduce((gramms, product) => gramms + parseFloat(product.gramm), 0);
    var prot = this.state.newDish.productslist.reduce((prot, product) => prot + parseFloat(product.prot), 0);
    var fat = this.state.newDish.productslist.reduce((fat, product) => fat + parseFloat(product.fat), 0);
    var carb = this.state.newDish.productslist.reduce((carb, product) => carb + parseFloat(product.carb), 0);
    var cal = calcalculate(prot, fat, carb);
    var price = this.state.newDish.productslist.reduce((price, product) => price + parseFloat(product.price), 0);
    this.setState({newDish: { ...this.state.newDish, cal: cal.toFixed(1), gramms: gramms.toFixed(1), prot: prot.toFixed(1), fat: fat.toFixed(1), carb: carb.toFixed(1), price: price.toFixed(2) }});
  }

  render() {
    const { newDish, addProduct } = this.state;
    const { types, products, onAdd } = this.props;
      return (
      <div> 
         <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={newDish.title}
              onChange={this.setTitle}
              placeholder='Название' />
            </Form.Group>
          </Form>
          <Form size='mini'>
            <label>Тип</label>
            <div>
            <Form.Group style = {{    flexWrap: "wrap"}} >
              {types.map((dish, i) =>
                  <Form.Field key = {i}
                    control={Radio}
                    label={ dish.type }
                    value={ dish.type }
                    checked={newDish.type === dish.type }
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              )}
                <Form.Field
                    control={Radio}
                    label= 'Другой'
                    value= 'Другой'
                    checked={newDish.type === 'Другой'}
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              {(newDish.type === 'Другой')
                ? <Form.Field control={Input} label='Другой' value={newDish.otherType}  onChange={this.setOtherType} />
                : ''
              } 
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
                          <span>{products.find(x => x._id === product.id ).title}</span>
                        </Table.Cell>
                        <Table.Cell className = "FlexImprotant" style = {{ minWidth: "180px", maxWidth: "250px", display: "flex!important" }} >
                          <Form.Input  icon='weight' placeholder='Грамм' width={12}  value={product.gramm}  onChange={e => this.setNewProductGramm( e.target.value, i)}  type = 'number'/>
                        {(products.find(x => x._id === product.id ).cold === 0 ? ''
                          : <Button size='mini' toggle active={ product.cold } onClick={e => this.setLossesCold(i) } circular icon='recycle' />
                          )}
                        {(products.find(x => x._id === product.id ).hot === 0 ? ''
                          : <Button size='mini' toggle active={ product.hot } onClick={e => this.setLossesHot(i) } circular icon='hotjar' />
                        )}
                        {(products.find(x => x._id === product.id ).ganes === 0 ? ''
                          : <Button size='mini' toggle active={ product.ganes } onClick={e => this.setGanes(i) } circular icon='expand arrows alternate' />
                        )}
                        </Table.Cell>
                        <Table.Cell style = {{ textAlign: "center" }} >
                           <Label.Group size='mini'>
                            <Label basic>
                              {(product.ganes)
                            ? Math.round((product.gramm/(products.find(x => x._id === product.id ).ganes/100))*10)/10
                            : Math.round((product.gramm
                            + (product.gramm+ product.gramm * products.find(x => x._id === product.id ).hot/100 * product.hot) * products.find(x => x._id === product.id ).cold/100 * product.cold
                            + product.gramm * products.find(x => x._id === product.id ).hot/100 * product.hot)*10)/10} <Icon name='weight' />
                            </Label>
                            <Label basic>
                              {product.prot + " Б " + product.fat + " Ж " + product.carb + " У "} <Icon name='pie graph' />
                            </Label>
                            <Label basic>
                              {product.price} <Icon name='rub' />
                            </Label>
                          </Label.Group>
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
                  {newDish.gramms} <Icon name='weight' />
                </Label>
                <Label basic>
                  {newDish.cal + " Ккал " + newDish.prot + " Б " + newDish.fat + " Ж " + newDish.carb + " У "} <Icon name='pie graph' />
                </Label>
                <Label basic>
                  {newDish.price} <Icon name='rub' />
                </Label>
              </Label.Group>
            </Form.Group>
                <Button positive onClick = {onAdd.bind(this, this.state.newDish)} style={{ cursor: 'pointer',   float: 'right' }} >
                Добавить
                </Button>
          </Form>
         </div> 
       )
    }
};

class ChangePopupContent extends Component {
state = {
    "newDish": {
        "_id": this.props.dish._id,
        "title": this.props.dish.title,
        "type": this.props.dish.type,
        "otherType": '',
        "image": null,
        "gramms": this.props.dish.gramms,
        "cal": this.props.dish.cal,
        "prot": this.props.dish.prot,
        "fat": this.props.dish.fat,
        "carb": this.props.dish.carb,
        "price": this.props.dish.price,
        "productslist": this.props.dish.productslist
      },
     "addProduct": {
        "id": '',
        "value": '',
        "gramm": '',
        "prot": '',
        "fat": '',
        "carb": '',
        "price": '',
        "cold": false,
        "hot": false,
        "ganes": false
      }
  }

  setTitle = (e) => { this.setState({ newDish: { ...this.state.newDish, title: e.target.value}})};
  setType = (e, {value}) => { this.setState({ newDish: { ...this.state.newDish, type: value}})};
  setOtherType = (e) => { this.setState({ newDish: { ...this.state.newDish, otherType: e.target.value}})};

  setId= (e, {value}) => { this.setState({ addProduct: { ...this.state.addProduct, id:  this.props.products.find(x => x.value === value )._id, value: value}})};
  setProduct = () =>  { 
      var newData = [...this.state.newDish.productslist, this.state.addProduct];
      this.setState({newDish: { ...this.state.newDish, productslist: newData }});
      this.setState({addProduct: { ...this.state.addProduct, id: '',  value: ''}});
  };
  delProduct = (i) => {
     var newData = this.state.newDish.productslist;
    newData.splice(i, 1);
    this.setState({newDish: { ...this.state.newDish, productslist: newData }});
    this.sum();
  };
  setLossesCold = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].cold = !newData[i].cold
      this.calculateParams(newData, i);
      this.sum();
  };
  setLossesHot = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].hot = !newData[i].hot
      this.calculateParams(newData, i);
      this.sum();
  };
  setGanes = (i) => { 
    var newData = [...this.state.newDish.productslist];
      newData[i].ganes = !newData[i].ganes
      this.calculateParams(newData, i);
      this.sum();
  };

  setNewProductGramm = (gramm, i) => {
      var newData = [...this.state.newDish.productslist];
      newData[i].gramm = parseFloat(gramm)
      this.calculateParams(newData, i);
      this.sum();
  };
  calculateParams = (newData, i) => {
      newData[i].prot = productParams(newData[i].id, newData[i].hot, false, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).prot/100, this.props.products).toFixed(1);
      newData[i].fat = productParams(newData[i].id, newData[i].hot, false, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).fat/100, this.props.products).toFixed(1);
      newData[i].carb = productParams(newData[i].id, newData[i].hot, false, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).carb/100, this.props.products).toFixed(1);
      newData[i].price = productParams(newData[i].id, newData[i].hot, newData[i].cold, newData[i].ganes, newData[i].gramm, this.props.products.find(x => x._id === newData[i].id).price/1000, this.props.products).toFixed(2);
      this.setState({newData});
  }
  sum = () => {
    var gramms = this.state.newDish.productslist.reduce((gramm, product) => gramm + parseFloat(product.gramm), 0);
    var prot = this.state.newDish.productslist.reduce((prot, product) => prot + parseFloat(product.prot), 0);
    var fat = this.state.newDish.productslist.reduce((fat, product) => fat + parseFloat(product.fat), 0);
    var carb = this.state.newDish.productslist.reduce((carb, product) => carb + parseFloat(product.carb), 0);
    var cal = calcalculate(prot, fat, carb);
    var price = this.state.newDish.productslist.reduce((price, product) => price + parseFloat(product.price), 0);
    this.setState({newDish: { ...this.state.newDish, cal: cal.toFixed(1), gramms: gramms, prot: prot.toFixed(1), fat: fat.toFixed(1), carb: carb.toFixed(1), price: price.toFixed(2) }});
  }

  render() {
    const { newDish, addProduct } = this.state;
    const { types, dish, products, onUp, onRemove } = this.props;
      return (
      <div> 
         <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} 
              value={newDish.title}
              onChange={this.setTitle}
              placeholder='Название' />
            </Form.Group>
          </Form>
          <Form size='mini'>
            <label>Тип</label>
            <div>
            <Form.Group style = {{    flexWrap: "wrap"}} >
              {types.map((dish, i) =>
                  <Form.Field key = {i}
                    control={Radio}
                    label={ dish.type }
                    value={ dish.type }
                    checked={newDish.type === dish.type }
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              )}
                <Form.Field
                    control={Radio}
                    label= 'Другой'
                    value= 'Другой'
                    checked={newDish.type === 'Другой'}
                     onChange={this.setType}
                      style = {{    marginTop: "5px"}}
                  />
              {(newDish.type === 'Другой')
                ? <Form.Field control={Input} label='Другой' value={newDish.otherType}  onChange={this.setOtherType} />
                : ''
              } 
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
                          <span>{products.find(x => x._id === product.id ).title}</span>
                        </Table.Cell>
                        <Table.Cell className = "FlexImprotant" style = {{ minWidth: "180px", maxWidth: "250px", display: "flex!important" }} >
                          <Form.Input  icon='weight' placeholder='Грамм' width={12}  value={product.gramm}  onChange={e => this.setNewProductGramm( e.target.value, i)}  type = 'number'/>
                        {(products.find(x => x._id === product.id ).cold === 0 ? ''
                          : <Button size='mini' toggle active={ product.cold } onClick={e => this.setLossesCold(i) } circular icon='recycle' />
                          )}
                        {(products.find(x => x._id === product.id ).hot === 0 ? ''
                          : <Button size='mini' toggle active={ product.hot } onClick={e => this.setLossesHot(i) } circular icon='hotjar' />
                        )}
                        {(products.find(x => x._id === product.id ).ganes === 0 ? ''
                          : <Button size='mini' toggle active={ product.ganes } onClick={e => this.setGanes(i) } circular icon='expand arrows alternate' />
                        )}
                        </Table.Cell>
                        <Table.Cell style = {{ textAlign: "center" }} >
                           <Label.Group size='mini'>
                            <Label basic>
                              {(product.ganes)
                            ? Math.round((product.gramm/(products.find(x => x._id === product.id ).ganes/100))*10)/10
                            : Math.round((product.gramm
                            + (product.gramm+ product.gramm * products.find(x => x._id === product.id ).hot/100 * product.hot) * products.find(x => x._id === product.id ).cold/100 * product.cold
                            + product.gramm * products.find(x => x._id === product.id ).hot/100 * product.hot)*10)/10} <Icon name='weight' />
                            </Label>
                            <Label basic>
                              {product.prot + " Б " + product.fat + " Ж " + product.carb + " У "} <Icon name='pie graph' />
                            </Label>
                            <Label basic>
                              {product.price} <Icon name='rub' />
                            </Label>
                          </Label.Group>
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
                  {newDish.gramms} <Icon name='weight' />
                </Label>
                <Label basic>
                  {newDish.cal + " Ккал " + newDish.prot + " Б " + newDish.fat + " Ж " + newDish.carb + " У "} <Icon name='pie graph' />
                </Label>
                <Label basic>
                  {newDish.price} <Icon name='rub' />
                </Label>
              </Label.Group>
            </Form.Group>
                <Button positive onClick = {onUp.bind(this, newDish)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Изменить
                </Button>
                <Button negative onClick = {onRemove.bind(this, dish._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Удалить
                </Button>
          </Form>
         </div> 
       )
    }
};


export { ChangePopupContent, AddNewPopupContent};