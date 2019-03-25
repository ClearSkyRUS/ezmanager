import React from 'react'
import { List, Label, Checkbox, Icon, Header, Card } from 'semantic-ui-react'

const PortionsList = ({programs, dishs}) => (
	<Card.Group centered>
		{programs.map((program, i) => 
			<ProgramCard key={i} program={program} dishs={dishs} />
		)}
	</Card.Group>
)

const ProgramCard = ({program, dishs}) => (
	<Card>
	    <Card.Content>
	      <Card.Header>{program.title + " " + program.option}</Card.Header>
	      <Card.Meta>
	        {"Кол-во: " + program.count + " День: " + (program.day+1)}
	      </Card.Meta>
	      <Card.Description>
	      	<List divided  verticalAlign='middle'>
	   			{program.meals.map((meal, j) =>
	   				<MealCard key={j} meal={meal} dishs={dishs} />
	   			)}
	      	</List>
	      </Card.Description>
	    </Card.Content>
	</Card>
)

const MealCard = ({ meal, dishs}) => (
	<List.Item>
	    <List.Content>
	   	 	<List.Header>{meal.title}</List.Header>
	    </List.Content>
	    <List.List>
	   			{meal.meal.map((mealItem, k) =>
	   				<DishsItem key={k} mealItem={mealItem} dishs={dishs} />
	   			)}
	    </List.List>
	</List.Item>
)

const DishsItem = ({mealItem, dishs}) => (
	<List.Item>
		<List.Content>
			<List.Icon name='zip' />
	   	 	{mealItem.type}
	    </List.Content>
	    <List.List>
	   			{mealItem.dishs.map((dish, t) =>
	   				<DishItem key={t} dish={dish} dishs={dishs} />
	   			)}
	    </List.List>
	</List.Item>
)

const DishItem = ({dish, dishs}) => (
	<List.Item style={{ paddingBottom: "10px" }} >
		<List.Content floated='right'>
			<Label size='small' basic style={{ width: "70px", textAlign: "right" }} >{dish.gram.toFixed(0) + " Гр "}</Label>
		</List.Content>
	    <List.Content>
	    	<List.Icon name='utensils' />
	      	{dishs.find(x => x.id === dish.id).title}
	    </List.Content>
	</List.Item>
)

export default PortionsList
