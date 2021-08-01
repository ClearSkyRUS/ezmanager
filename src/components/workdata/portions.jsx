import React from 'react'
import { List, Label, Card } from 'semantic-ui-react'

const PortionsList = ({programs, dishs}) => (
	<List celled>
		{programs.map((program, i) => 
			<ProgramCard key={i} program={program} dishs={dishs} />
		)}
	</List>
)

const ProgramCard = ({program, dishs}) => (
	<List.Item>
		<List.Header>{program.title + " " + program.option + " "} 
			<span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'>
				{" Кол-во: " + program.count + ",  " + (program.day.title)}
			</span>
		</List.Header>
	    <List.Content>
	      	<List celled horizontal>
	   			{program.meals.map((meal, j) =>
	   				<MealCard key={j} meal={meal} dishs={dishs} />
	   			)}
	      	</List>
	    </List.Content>
	</List.Item>
)

const MealCard = ({ meal, dishs}) => (
	<List.Item style={{ verticalAlign: 'top', marginBottom: '20px', borderTop: '#4183c4 solid', width: '280px'}}>
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
			<Label size='small' basic style={{ width: "70px", textAlign: "right" }} >
			 {(dish.count) ? (dish.count + " Шт") : (dish.gram.toFixed(0) + " Гр")}
			</Label>
		</List.Content>
	    <List.Content>
	    	<List.Icon name='utensils' />
	      	{dish.dish.title}
	    </List.Content>
	</List.Item>
)

export default PortionsList
