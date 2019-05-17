import React from 'react'
import { Card, Icon, Button, Modal, List } from 'semantic-ui-react'
import Loader from 'components/loader/loader';
import { ModalProgram } from '../popupContent/program';


const ProgramItem = ({ program, settings, ApiPath, onUp, onRemove }) => (
  <Modal size='large' trigger={
            <List.Item>
              <List.Content floated="right">
              </List.Content>
              <List.Content> 
                <List.Header>{ program.title }</List.Header>
              </List.Content>
            </List.Item> } closeIcon>
    <Modal.Header>Изменить/удалить программу</Modal.Header>
    <Modal.Content scrolling>
      <ModalProgram program = { program } ApiPath ={ApiPath} settings = {settings} onUp = { onUp } onRemove = { onRemove } />
    </Modal.Content>
  </Modal>
) 



const ProgramsList = ({ programs, settings, ApiPath, onAdd, onUp, onRemove }) => {

    if (programs)
      return (
        <div>
              <List celled >
                {programs.map((program, i) =>
                <ProgramItem key={i} program={program} settings={ settings } ApiPath={ApiPath} onUp = {onUp} onRemove = {onRemove}/> )}
              </List>
                <AddNewPopupButton settings={ settings } onAdd={ onAdd } ApiPath={ApiPath} />
        </div>
      )
    return ( <Loader /> )
}

const AddNewPopupButton = ({settings, ApiPath, onAdd}) => {
  return (
    <Modal trigger={<Button className = "addTogler" circular color='google plus' icon='plus' />} closeIcon>
      <Modal.Header>Добавте программу</Modal.Header>
      <Modal.Content scrolling>
        <ModalProgram settings={ settings } ApiPath ={ApiPath} onAdd={ onAdd } />
      </Modal.Content>
    </Modal>
   )
};
  
export default ProgramsList