import React from 'react'
import { Card, Icon, Popup, Button, Image, List, Modal } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import { ModalProgram } from '../popupContent/program';


const CardProgram = ({ program, dishs, days, onUp, onRemove }) => (
            <Card>
              <Card.Content>
                <Card.Header>{ program.title }</Card.Header>
              </Card.Content>
              <Card.Content extra>
                 <Modal trigger={<Icon name= 'signup' style={{ cursor: 'pointer',   float: 'right' }}/>} closeIcon>
                  <Modal.Header>Изменить/удалить программу</Modal.Header>
                  <Modal.Content scrolling>
                    <ModalProgram program = { program } dishs={ dishs } days = { days } onUp = { onUp } onRemove = { onRemove } />
                  </Modal.Content>
                </Modal>
              </Card.Content>
            </Card>
)



const ProgramsList = ({ programs, days, dishs, onAdd, onUp, onRemove }) => {

    if (programs && dishs && days)
      return (
        <div>
              <Card.Group centered >
                {programs.map((program, i) =>
                <CardProgram key={i} program={program} dishs={ dishs } days = {days} onUp = {onUp} onRemove = {onRemove}/> )}
              </Card.Group>
                <AddNewPopupButton dishs={ dishs } days = {days} onAdd={ onAdd } />
        </div>
      )
     return ( <Loader /> )
}

const AddNewPopupButton = ({dishs, days, onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте программу</Modal.Header>
      <Modal.Content scrolling>
        <ModalProgram dishs={ dishs } days = {days} onAdd={ onAdd } />
      </Modal.Content>
    </Modal>
   )
};
  
export default ProgramsList