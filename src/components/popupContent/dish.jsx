import React from 'react'
import { Button, Form, Input, Radio, Dropdown } from 'semantic-ui-react'

const value = 'Гарнир';
const active = false;
const handleClick = () => this.setState({ active: !active });

const AddNewPopupContent = ({ types, products }) => {

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
          {types.map((type, i) =>
              <Form.Field key = {i}
                control={Radio}
                label={ type.type }
                value={ type.type }
                checked={value === type.type }
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
        <label>Игнридиенты</label>
        <Form.Group>
          <Dropdown placeholder='Подукт' search selection options={products} />
          <Button toggle icon='recycle' active={active} onClick={handleClick} />
        </Form.Group>
        <Button positive>Добавить</Button>
      </Form>
     </div> 
   )
};

const ChangePopupContent = ({ dsish, types, products }) => {
  return(
    <div>
     
      </div>
    )
};

export { ChangePopupContent, AddNewPopupContent};