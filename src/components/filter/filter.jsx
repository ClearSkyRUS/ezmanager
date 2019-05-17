import React from 'react'
import { Button, Input } from 'semantic-ui-react';
import uniqBy from 'lodash/uniqBy';


const Filter = ({ items, setFilter, setSerchQuery, filterBy }) => (

      <div>
          <Input onChange = {e => setSerchQuery(e.target.value)} size='mini' icon='search' placeholder='Поиск...' style = {{ marginRight: "10px", marginBottom: "10px" }} />
          <Button basic size='mini' onClick = {setFilter.bind(this, 'Все')} active={filterBy === "Все"}>Все</Button>
         {(items !== undefined) ? (items.map((item, i) =>
              <Button key={i} basic size='mini' onClick = {setFilter.bind(this, (item.type.title) ? item.type.title : item.type)} active={filterBy === ((item.type.title) ? item.type.title : item.type)}   style = {{ marginBottom: "10px" }}>{(item.type.title) ? item.type.title : item.type}</Button>
          ))
     		: ''}
      </div>
)

export default Filter;