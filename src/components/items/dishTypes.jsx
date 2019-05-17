import React from 'react';
import { Button, Image, List, Icon, Modal, Label } from 'semantic-ui-react';
import Loader from 'components/loader/loader';
import { DishTypesModalContent } from '../popupContent/dishType';

const DishTypeItem = ({ dishType, ApiPath, onUp, onRemove }) => (
    <Modal trigger={
      <List.Item>
        <List.Content> 
          <List.Header>{dishType.title} <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {dishType.unit}</span></List.Header>
          {(dishType.unit === "Гр")
            ? (dishType.portions.map((portionItem, i) => <Label key={i} basic> {portionItem.after} Ккал: {portionItem.value} Гр </Label>))
            : (<div><Label basic>max {dishType.max + ' '}{(dishType.unit === '%') ? 'Гр' : 'Шт'}</Label>
              <Label basic>min {dishType.min + ' '}{(dishType.unit === '%') ? 'Гр' : 'Шт'}</Label></div>)} 
        </List.Content>
      </List.Item>}
    closeIcon >
      <Modal.Header>Изменить/Удалить тип блюда</Modal.Header>
      <Modal.Content scrolling>
        <DishTypesModalContent dishType = {dishType} ApiPath={ApiPath} onRemove = {onRemove} onUp = { onUp } />
      </Modal.Content>
    </Modal>
)

const ListDishTypes = ({ dishTypes, ApiPath, onAdd, onUp, onRemove }) => {
  if (dishTypes)
  return(
    <div>
      <List celled>
          {dishTypes.map((dishType, i) =>
            <DishTypeItem key={i} dishType = {dishType} ApiPath={ApiPath} onUp = {onUp} onRemove = {onRemove} /> )}
      </List>
      <AddNewPopupButton onAdd = {onAdd} ApiPath={ApiPath} />
    </div>
  )
  return ( <Loader /> )
}

const AddNewPopupButton = ({ onAdd, ApiPath }) => {
  return (
     <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Новый тип блюда</Modal.Header>
      <Modal.Content scrolling>
        <DishTypesModalContent onAdd = {onAdd}  ApiPath={ApiPath} />
      </Modal.Content>
    </Modal>
   )
};

export default ListDishTypes
