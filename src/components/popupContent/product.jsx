import React from 'react'
import { Button, Form, Input, Radio } from 'semantic-ui-react'

const value = 'Рыба';

const AddNewPopupContent = ({ products }) => {
  return (
  <div> 
     <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} placeholder='Название' />
        </Form.Group>
      </Form>
      <Form size='mini'>
        <label>Тип</label>
        <Form.Group inline>
          {products.map((product, i) =>
              <Form.Field key = {i}
                control={Radio}
                label={ product.type }
                value={ product.type }
                checked={value === product.type }
              />
          )}
            <Form.Field
                control={Radio}
                label= 'Другой'
                value= 'Другой'
                checked={value === 'Другой'}
              />
          {(value === 'Другой')
            ? <Form.Field control={Input} label='Другой' />
            : ''
          } 
        </Form.Group>
        <label>Параметры</label>
        <Form.Group>
          <Form.Input icon='ruble sign' placeholder='Цена за кг' width={8} />
          <Form.Input icon='pie graph' placeholder='Б/Ж/У' width={8} />
        </Form.Group>
        <label>Потери/привар %</label>
        <Form.Group>
          <Form.Input icon='recycle' placeholder='Пот. холодные' width={5} />
          <Form.Input icon='hotjar' placeholder='Пот. горячие' width={5} />
          <Form.Input icon='expand arrows alternate' placeholder='Привар' width={5} />
        </Form.Group>
        <Button positive>Добавить</Button>
      </Form>
     </div> 
   )
};

const ChangePopupContent = ({ product, types }) => {
  return(
    <div>
     <Form>
        <Form.Group widths='equal'>
          <Form.Field control={Input} defaultValue = {product.title} />
        </Form.Group>
      </Form>
      <Form size='mini'>
        <label>Тип</label>
        <Form.Group>
          {types.map((type, i) =>
              <Form.Field key = {i}
                control={Radio}
                label={ type.type }
                value={ type.type }
                checked={product.type === type.type }
              />
            )}
            <Form.Field
                control={Radio}
                label= 'Другой'
                value= 'Другой'
                checked={value === 'Другой'}
              />
          {(value === 'Другой')
            ? <Form.Field control={Input} label='Другой' />
            : ''
          } 
        </Form.Group>
        <label>Параметры</label>
        <Form.Group>
          <Form.Input icon='ruble sign' defaultValue = {product.price} width={8} />
          <Form.Input icon='pie graph' defaultValue = {product.prot + '/' + product.fat + '/'+ product.carb} width={8} />
        </Form.Group>
         <label>Потери/привар %</label>
        <Form.Group>
          <Form.Input icon='recycle' defaultValue = {product.lossesCold} width={5} />
          <Form.Input icon='hotjar' defaultValue = {product.lossesHot} width={5} />
          <Form.Input icon='expand arrows alternate' defaultValue = {product.ganes} width={5} />
        </Form.Group>
        <Button positive>Изменить</Button>
      </Form>
      </div>
    )
};

export { ChangePopupContent, AddNewPopupContent};