import React from 'react'
import { Card, Icon, Popup, Button, Image, List } from 'semantic-ui-react'
import Loader from '../loader/loader';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';



const CardProgram = ({ program }) => (
            <Card>
              <Card.Content>
                <Card.Header>{program.title}</Card.Header>
              </Card.Content>
              <Card.Content extra>
               {"Дней: " + program.days.length}
               <Popup
                  trigger={  <Icon name= 'signup' style={{ cursor: 'pointer',   float: 'right' }}/> }
                  content={ <div /> }
                  on='click'
                />
              </Card.Content>
            </Card>
)



const ProgramsList = ({ programs, setPrograms }) => {

    if (programs == null) {
      axios.get('/programs.json').then(({ data }) => {
        setPrograms(data);
      })
    return ( <Loader /> )
    }

  return (
    <div>
      <Card.Group centered >
        {programs.map((program, i) =>
        <CardProgram key={i} program={program} /> )}
      </Card.Group>
        <AddNewPopupButton />
    </div>
  )
}

const AddNewPopupButton = () => {
  return (
    <Popup
      trigger={ <Button className = "addTogler" circular color='google plus' icon='plus' /> }
      content={ <div/> }
      on='click'
    />
   )
};
  
export default ProgramsList