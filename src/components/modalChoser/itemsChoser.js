import React from 'react'
import uniqBy from 'lodash/uniqBy';
import { Checkbox, Segment, List, Modal, Button, Icon } from 'semantic-ui-react'
import Filter from 'containers/filter';

const ModalChoser = ({ items, meal, setDishsToMeal, setChecked}) => {
  return (
    <Modal.Content>
      <Modal.Content scrolling>
        <Segment>
          <Filter items={uniqBy(items, 'type.title')} /> 
        </Segment>
        <Segment>
          <List>
            {items.map((item, i) =>
              <SoloItem key={i} item={item} setChecked={setChecked} />
            )}
          </List>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={e => setDishsToMeal(meal, items.filter( o => o.checked === true))}>
          Добавить <Icon name='right chevron' />
        </Button>
      </Modal.Actions>
    </Modal.Content>
  )
}

const SoloItem = ({item, setChecked}) => (
  <List.Item>
    <Checkbox label={item.title} checked={item.checked === true} onChange={e => setChecked(item)} /> <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {item.type.title}</span>
  </List.Item>
)

export default ModalChoser