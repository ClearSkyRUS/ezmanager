import React, { Component } from 'react'
import { Button, Form, Input, Icon, Accordion, List, Grid, Checkbox, Pagination, Card, Label } from 'semantic-ui-react';
import { ProgramMas } from 'const';


class ModalProgram extends Component {
   constructor(props) {
    super(props);

    var program = []
    if (this.props.program) {
      program = this.props.program
    } else {
      program = ProgramMas
    }
    this.state = {  
      "program": program,
      "NewOption": {
        "title": '',
        "type": 'Общая',
        "price": 0,
        "days": []
      },
      "settingsActive": {
        "activeItem": false
      },
      "optionActive": {
        "activeItem": -1
      },
       "portionActive": {
        "activeItem": false
      },
      "activePage": 1
    };

    if (!this.props.program) {
      for (var meal of this.props.days[0].meals) { 
         var set = {
          "title": meal.title,
          types: [],
          auto: true
          };
          this.state.program.settings.push(set);
        }
       this.state.program.portions = this.resetPortions();
       this.state.program.options = this.calculateOptions();
    }
  }
    setTitle = (e) => { this.setState({ program: { ...this.state.program, title: e.target.value}})};
    setPrice = (e) => { 
      this.setState({ program: { ...this.state.program, price: e.target.value}})
      this.changePrice(parseFloat(e.target.value))
    };
    changePrice = (newPrice) => {
       for (var option of this.state.program.options) {
        option.price = (option.cal /100) * newPrice;
      }
    }
    setTitleOption = (e) => { this.setState({ NewOption: { ...this.state.NewOption, title: e.target.value}})};
    setOption = (i, j) =>  { 
      this.setState({program: { ...this.state.program, options: this.calculateOptions(this.state.NewOption)}})
      this.setState({ NewOption: { ...this.state.NewOption, title: ''}})
    };
     changeDrop = (i) => { 
      if (this.state.optionActive.activeItem === i)
        i = -1;
      this.setState({ optionActive: { ...this.state.optionActive, activeItem: i }, activePage: 1, portionActive: { ...this.state.portionActive, activeItem: false}})
    };
    changePortionDrop = (i) => { this.setState({ portionActive: { ...this.state.portionActive, activeItem: !this.state.portionActive.activeItem}, activePage: 1, optionActive: { ...this.state.optionActive, activeItem: -1 }})};
    changeDropSett = () => { this.setState({ settingsActive: { ...this.state.settingsActive, activeItem: !this.state.settingsActive.activeItem }})};
    AutoActction = (i) => { 
      var newData = [...this.state.program.settings];
      newData[i].auto = !newData[i].auto;
      if( newData[i].auto)
        newData[i].types=[]

      this.setState({ program: { ...this.state.program, settings: newData, portions: this.resetPortions(), options: this.calculateOptions()}});
    }
    AddDelSetting = (i, type) => { 
      var newData = [...this.state.program.settings];
      if (newData[i].types.indexOf( type ) === -1) {
         newData[i].types.push(type)
      } else {
        newData[i].types.splice(newData[i].types.indexOf( type ), 1)
      }
      this.setState({ program: { ...this.state.program, settings: newData, portions: this.resetPortions(), options: this.calculateOptions()} });
    }
    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    resetPortions = () => {
      var set = []
      for (var day of this.props.days) { 
       var dayItem = {
        "title": day.title,
        "id": day._id,
        "meals": []
        }
          for (var meal of day.meals) { 
            var mealItem = {
              "title": meal.title,
              "unit": "%",
              "count": parseFloat((100/day.meals.length).toFixed(1)),
              "meal":[]
            }
              for (var dishs of meal.meal) { 
                if (this.state.program.settings[day.meals.indexOf(meal)].auto) {
                  if (dishs.main === 1)
                    mealItem.meal.push(this.mealConstructor(dishs, 1))
                 } else {
                  if (this.state.program.settings[day.meals.indexOf(meal)].types.indexOf(dishs.type) !== -1)
                    mealItem.meal.push(this.mealConstructor(dishs, this.state.program.settings[day.meals.indexOf(meal)].types.length))
                }
              }
              if (mealItem.meal.length !== 0)
            dayItem.meals.push(mealItem)
          }
        set.push(dayItem)
      }
      return set;
    }

    mealConstructor = (dishs, lenMeal) => {
        var dishsItem = {
                  "type": dishs.type,
                  "unit": "%",
                  "count": parseFloat((100/lenMeal).toFixed(1)),
                  "dishs":[]
                }
                  for (var dish of dishs.dishs) { 
                    var dishItem = {
                      "id":dish.id,
                      "unit": "%",
                      "count": parseFloat((100/dishs.dishs.length).toFixed(1))
                    }
                    dishsItem.dishs.push(dishItem)
                  }
        return dishsItem;
    }

     calculateOptions = (newOption) => {
      var set = []
      var options = this.state.program.options;
      if (newOption) {
        options.push(newOption)
      }
      for (var option of options) {
        var optionItem = {
          "title": option.title,
          "cal": parseFloat(option.title),
          "type": "Общая",
          "price":  (parseFloat(option.title)/100) * parseFloat(this.state.program.price),
          "days": []
        }
        console.log("Цена: " + this.state.program.price)
        for (var day of this.state.program.portions) { 
         var dayItem = {
          "title": day.title,
          "id": day.id,
          "gram": 0,
          "cal": 0,
          "prot": 0,
          "fat": 0,
          "carb": 0,
          "price": 0,
          "meals": []
          }
          for (var meal of day.meals) { 
              var mealItem = {
                "title": meal.title,
                "gram": 0,
                "cal": 0,
                "prot": 0,
                "fat": 0,
                "carb": 0,
                "price": 0,
                "ended": false,
                "unit": meal.unit,
                "count": meal.count,
                "meal":[]
              }
                for (var dishs of meal.meal) { 
                  var dishsItem = {
                  "type": dishs.type,
                  "gram": 0,
                  "cal": 0,
                  "prot": 0,
                  "fat": 0,
                  "carb": 0,
                  "price": 0,
                  "ended": false,
                  "unit": dishs.unit,
                  "count": dishs.count,
                  "dishs":[]
                  }
                  for (var dish of dishs.dishs) { 
                    var dishItem = {
                      "id":dish.id,
                      "gram": 0,
                      "cal": 0,
                      "prot": 0,
                      "fat": 0,
                      "carb": 0,
                      "price": 0,
                      "ended": false,
                      "unit": dish.unit,
                      "count": dish.count
                    }
                    dishsItem.dishs.push(dishItem)
                  }
                  mealItem.meal.push(dishsItem)
                }
              dayItem.meals.push(mealItem)
            }
            optionItem.days.push(dayItem)
            var needCalForDay = parseFloat(optionItem.title);
            var leftCalForDay = parseFloat(option.title);
            var checkFixed = false;
            var checkPices = false;
            var i = 3;
            while (i !== 0) {
                for (var mealOne of dayItem.meals) {
                 for (var dishsOne of mealOne.meal) { 
                    for (var dishOne of dishsOne.dishs) { 
                      var BaseDish = this.props.dishs.find(x => x._id === dishOne.id )
                      if (!checkFixed) {
                        if (dishOne.unit === "Гр") {
                          dishOne.gram = dishOne.count;
                          dishOne.cal = BaseDish.cal * dishOne.gram/100
                          dishOne.prot = BaseDish.prot * dishOne.gram/100
                          dishOne.fat = BaseDish.fat * dishOne.gram/100
                          dishOne.carb = BaseDish.carb * dishOne.gram/100
                          dishOne.price = BaseDish.price * dishOne.gram/100

                          dishOne.ended = true;
                        }
                      }
                      if (checkFixed && !checkPices) {
                        if (dishOne.unit === "Шт") {
                          if (mealOne.cal !== 0 && mealOne.count === this.state.program.portions[this.state.program.portions.indexOf(day)].meals[dayItem.meals.indexOf(mealOne)].count) {
                            needCal = ((needCalForDay * (mealOne.count/100)) * (dishsOne.count/100)* (dishOne.count/100)) - mealOne.cal
                          } else {
                            if (mealOne.count !== this.state.program.portions[this.state.program.portions.indexOf(day)].meals[dayItem.meals.indexOf(mealOne)].count) {
                              needCal = (((needCalForDay- dayItem.cal) * (mealOne.count/100)) * (dishsOne.count/100)* (dishOne.count/100))- mealOne.cal
                            } else { 
                              needCal = (((needCalForDay) * (mealOne.count/100)) * (dishsOne.count/100)* (dishOne.count/100))- mealOne.cal
                            }
                          }
                          dishOne.count = 0;
                          while (needCal > dishOne.cal) {
                             dishOne.count =  dishOne.count + 0.5;
                            dishOne.cal = BaseDish.cal *  dishOne.count;
                          }
                          if ( (dishOne.cal - needCal) > (needCal -BaseDish.cal * ( dishOne.count-0.5)))
                             dishOne.count =  dishOne.count - 0.5

                          dishOne.gram = BaseDish.gramms * dishOne.count;
                          dishOne.cal = BaseDish.cal * dishOne.count
                          dishOne.prot = BaseDish.prot * dishOne.count
                          dishOne.fat = BaseDish.fat * dishOne.count
                          dishOne.carb = BaseDish.carb * dishOne.count
                          dishOne.price = BaseDish.price * dishOne.count

                          dishOne.ended = true;
                        }
                      }
                      if (checkFixed && checkPices) {
                        if (dishOne.unit === "%") {
                          var needCal = 0;
                          if (mealOne.cal !== 0 && mealOne.count === this.state.program.portions[this.state.program.portions.indexOf(day)].meals[dayItem.meals.indexOf(mealOne)].count) {
                            needCal = ((needCalForDay * (mealOne.count/100)) * (dishsOne.count/100)* (dishOne.count/100)) - mealOne.cal
                          } else {
                            if (mealOne.count !== this.state.program.portions[this.state.program.portions.indexOf(day)].meals[dayItem.meals.indexOf(mealOne)].count) {
                              needCal = (((needCalForDay- dayItem.cal) * (mealOne.count/100)) * (dishsOne.count/100)* (dishOne.count/100))- mealOne.cal
                            } else { 
                              needCal = (((needCalForDay) * (mealOne.count/100)) * (dishsOne.count/100)* (dishOne.count/100))- mealOne.cal
                            }
                          }
                          dishOne.gram = needCal/BaseDish.cal * BaseDish.gramms
                          dishOne.cal = BaseDish.cal * dishOne.gram/100
                          dishOne.prot = BaseDish.prot * dishOne.gram/100
                          dishOne.fat = BaseDish.fat * dishOne.gram/100
                          dishOne.carb = BaseDish.carb * dishOne.gram/100
                          dishOne.price = BaseDish.price * dishOne.gram/100

                          dishOne.ended = true;
                        }
                      }
                    }
                    dishsOne.cal = dishsOne.dishs.reduce((cal, dish) => cal + parseFloat(dish.cal), 0);
                    dishsOne.gram = dishsOne.dishs.reduce((gram, dish) => gram + parseFloat(dish.gram), 0);
                    dishsOne.prot = dishsOne.dishs.reduce((prot, dish) => prot + parseFloat(dish.prot), 0);
                    dishsOne.fat = dishsOne.dishs.reduce((fat, dish) => fat + parseFloat(dish.fat), 0);
                    dishsOne.carb = dishsOne.dishs.reduce((carb, dish) => carb + parseFloat(dish.carb), 0);
                    dishsOne.price = dishsOne.dishs.reduce((price, dish) => price + parseFloat(dish.price), 0);
                 }
                 mealOne.cal = mealOne.meal.reduce((cal, meal) => cal + parseFloat(meal.cal), 0);
                 mealOne.gram = mealOne.meal.reduce((gram, meal) => gram + parseFloat(meal.gram), 0);
                 mealOne.prot = mealOne.meal.reduce((prot, meal) => prot + parseFloat(meal.prot), 0);
                 mealOne.fat = mealOne.meal.reduce((fat, meal) => fat + parseFloat(meal.fat), 0);
                 mealOne.carb = mealOne.meal.reduce((carb, meal) => carb + parseFloat(meal.carb), 0);
                 mealOne.price = mealOne.meal.reduce((price, meal) => price + parseFloat(meal.price), 0);
              }
              leftCalForDay = needCalForDay - dayItem.cal;
              for (var mealCheck of dayItem.meals) {
                var countMeals = 0;
                for (var dishsCheck of mealCheck.meal) { 
                  var countDishs = 0;
                  for (var dishCheck of dishsCheck.dishs) { 
                    if (dishCheck.ended) {
                      countDishs++;      
                    }
                  }
                  if (countDishs === dishsCheck.dishs.length) {
                    countMeals++;
                    dishsCheck.ended = true;
                  }
                }
                if (countMeals === mealCheck.meal.length) {
                    mealCheck.ended = true;
                  }
              }
              dayItem.cal = 0;
              dayItem.gram = 0;
              dayItem.prot = 0;
              dayItem.fat = 0;
              dayItem.carb = 0;
              dayItem.price = 0;
              for (var mealCheck of dayItem.meals) {
                if (mealCheck.ended) {
                  dayItem.cal = dayItem.cal + mealCheck.cal
                  dayItem.gram = dayItem.gram + mealCheck.gram
                  dayItem.prot = dayItem.prot + mealCheck.prot
                  dayItem.fat = dayItem.fat + mealCheck.fat
                  dayItem.carb = dayItem.carb + mealCheck.carb
                  dayItem.price = dayItem.price + mealCheck.price
                }
              }
              var mealsProcent = this.ProcentSum(dayItem.meals) /100
              for (var mealReset of dayItem.meals) {
                if (!mealReset.ended) {
                  mealReset.count =  parseFloat((mealReset.count / mealsProcent).toFixed(1))
                  var mealProcent = this.ProcentSum(mealReset.meal)/100
                  for (var dishsReset of mealReset.meal) { 
                    if (!dishsReset.ended) {
                      dishsReset.count = parseFloat((dishsReset.count / mealProcent).toFixed(1))
                      var dihsProcent = this.ProcentSum(dishsReset.dishs)/100
                      for (var dishReset of dishsReset.dishs) { 
                        if (!dishReset.ended) {
                          dishReset.count = parseFloat((dishReset.count / dihsProcent).toFixed(1))
                        }
                      } 
                    }
                  }
                }
              }
              i--;
              
              if (checkFixed && !checkPices)
                  checkPices = true;
              if (!checkFixed)
                  checkFixed = true;
            }
        }
        set.push(optionItem)
      } 
      return set;
    }

    NotEndedLes = (array) => {
      var count = 0;
      for (var item of array) {
        if (item.ended)
          count++;
      }
      return count;
    }

    ProcentSum = (array) => {
      var procent = 0;
      for (var item of array) {
        if (!item.ended && item.unit !== "Гр")
          procent = procent + item.count
      }
      return procent;
    }

    setItemUnit = (item, unit) => {
      item.unit=unit;

        this.setState({ program: { ...this.state.program, options: this.calculateOptions()} });
    }
    setItemCount = (item, value) => {
      item.count=value;
        this.setState({ program: { ...this.state.program, options: this.calculateOptions()} });
    }
 render() {
      const { program, NewOption, optionActive, settingsActive, activePage, portionActive } = this.state;
      const { days, dishs, onAdd, onUp, onRemove } = this.props;
      return (
        <div>
           <Form size='mini' >
                            <Form.Group  style = {{display: "flex", padding: "10px" }} >
                               <Input  value={program.title}
                                onChange={this.setTitle}
                                placeholder='Название' />
                                <span style={{fontSize: "small", fontStyle: "italic", margin: "auto 5px auto auto"}}> Цена за 100 Ккал: </span>
                                <Input  value={program.price}
                                onChange={this.setPrice}
                                placeholder='Цена за 100 ккал' 
                                type= "number"/>
                            </Form.Group>
            </Form>
            <Accordion styled fluid>
                <Accordion.Title active={settingsActive.activeItem} index={0} onClick={this.changeDropSett}>
                  <Icon name='dropdown' />
                  Варианты
                </Accordion.Title>
                <Accordion.Content active={settingsActive.activeItem} >
                  <Grid >
                  {days[0].meals.map((meal, i) =>
                    <Grid.Column key = {i} style={{     width: "min-content",  textAlign: "center" }} >
                      {meal.title}
                       <Button.Group basic vertical size='mini'>
                        {meal.meal.map((type, j) => 
                          <Button key={j} disabled={program.settings[i].auto} active = {program.settings[i].types.indexOf( type.type ) != -1} onClick={e => this.AddDelSetting(i, type.type)} >{type.type}</Button>)}

                      </Button.Group>
                      <Checkbox label='Авто' checked={program.settings[i].auto === true} onChange ={e => this.AutoActction(i)} />
                    </Grid.Column>
                  )}
                  </Grid>
               </Accordion.Content>
            </Accordion>

            <Accordion styled fluid>
                <Accordion.Title active={portionActive.activeItem} onClick={this.changePortionDrop}>
                  <Icon name='dropdown' />
                  Настройка порций
                </Accordion.Title>
                <Accordion.Content active={portionActive.activeItem} >
                    <Card.Group centered >
                      {program.portions[activePage-1].meals.map((meal, j) =>
                          <MealCard key={j} mealToCard={meal} dishs={dishs} program={program} j={j} setItemUnit={this.setItemUnit} setItemCount={this.setItemCount} />
                        )}
                    </Card.Group>
                     <Pagination
                        activePage={activePage}
                        onPageChange={this.handlePaginationChange}
                        firstItem={null}
                        lastItem={null}
                        pointing
                        secondary
                        totalPages={program.portions.length}
                      />
                </Accordion.Content>
            </Accordion>

                 <Form size='mini' style={{ padding: "10px",  paddingTop: "20px" }} >
                            <Form.Group  style = {{display: "flex"}} >
                               <Input value={NewOption.title}
                                onChange={this.setTitleOption}
                                placeholder='Добавте опцию...'
                                style = {{paddingRight: "5px"}} />
                              <Button size='tiny' onClick={e => this.setOption() } circular icon='plus' style={{ cursor: 'pointer' }} />
                            </Form.Group>
                 </Form>

            <Accordion styled fluid>
             {program.options.map((option, i) =>
              <div key = { i } >
                <Accordion.Title active={optionActive.activeItem === i} index={i} onClick={e => this.changeDrop(i)}>
                  <Icon name='dropdown' />
                  { option.title + " Цена: " +  option.price}
                  <LabelsStats item={option.days[activePage-1]} style={{display: "inline", float: "right"}} />
                </Accordion.Title>
                <Accordion.Content active={optionActive.activeItem === i} >
                   <Card.Group centered >
                      {option.days[activePage-1].meals.map((meal, j) =>
                          <MealOptionCard key={j} mealToCard={meal} dishs={dishs} program={program} j={j} option={option} />
                        )}
                   </Card.Group>
                   <Pagination
                      activePage={activePage}
                      onPageChange={this.handlePaginationChange}
                      firstItem={null}
                      lastItem={null}
                      pointing
                      secondary
                      totalPages={program.options[0].days.length}
                    />
                </Accordion.Content>
              </div>
              )}
            </Accordion>
            {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, this.state.program)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, this.state.program)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, this.state.program._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div>
                : ''}
        </div>
       )
    }
};
const MealCard = ({ mealToCard, dishs, program, j, setItemUnit, setItemCount}) => (
  <Card style={{width: "320px"}} >
    <div style={{fontSize: "larger", fontStyle: "italic", textAlign: "center"}} >{mealToCard.title}
            <Input
              size='mini'
              value= {mealToCard.count}
              onChange = {e => setItemCount(mealToCard, parseFloat(e.target.value))}
              style={{ width: "70px", paddingLeft: "10px" }} /></div>
          <DishToChange mealToCard={mealToCard} dishs={dishs} setItemUnit={setItemUnit} setItemCount={setItemCount} />
  </Card>
)

const MealOptionCard = ({ mealToCard, dishs, program, j, option}) => (
  <Card style={{width: "320px"}} >
    <div style={{fontSize: "larger", fontStyle: "italic", textAlign: "center"}} >{mealToCard.title}</div>
    <div style={{fontSize: "small", fontStyle: "italic", textAlign: "center"}} ><LabelsStats item={mealToCard} /></div>
          <DishInOption mealToCard={mealToCard} dishs={dishs}  option={option} />
  </Card>
)

const DishInOption = ({ mealToCard, dishs, option}) => (
  <List  size='small' celled>
    {mealToCard.meal.map((dishsInMeal, g) =>
        <List.Item key={g} style={{fontSize: "small", fontStyle: "italic"}}>
             <List.Content style={{ paddingBottom: "0"}}>
              {dishsInMeal.type}
            </List.Content>
           <List.List>
              {dishsInMeal.dishs.map((dish, i) =>
                 <List.Item  key= {i}  >
                    <List.Content style={{ paddingBottom: "0"}}>
                      <List.Header> 
                        {dishs.find(x => x._id === dish.id ).title}
                         <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {dishs.find(x => x._id === dish.id ).type}</span>
                           {(dish.unit !== "Шт")
                            ? <span>{" " +(dish.gram).toFixed(0) + " " }<Icon name='weight' /></span>
                            : <span>{" " + dish.count + " Шт"}</span>}
                      </List.Header>
                      <List.Description>
                        <LabelsStats item={dish} />
                      </List.Description>
                    </List.Content>
                  </List.Item>
              )}
            </List.List>
        </List.Item>
    )}
  </List>
)

const DishToChange = ({ mealToCard, dishs, setItemUnit, setItemCount }) => (
  <List  size='small' celled>
    {mealToCard.meal.map((dishsInMeal, g) =>
        <List.Item key={g} style={{fontSize: "small", fontStyle: "italic"}}>
           <List.Content floated='right' style={{    padding: "5px 0 0 0"}} >
             <Input
              size='mini'
              value= {dishsInMeal.count}
              onChange = {e => setItemCount(dishsInMeal, parseFloat(e.target.value))}
              style={{ width: "70px" }} />
            </List.Content>
             <List.Content>
              {dishsInMeal.type}
            </List.Content>
           <List.List>
              {dishsInMeal.dishs.map((dish, i) =>
                 <List.Item  key= {i}  >
                    <List.Content>
                      <List.Header> 
                        {dishs.find(x => x._id === dish.id ).title}
                         <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {dishs.find(x => x._id === dish.id ).type}</span>
                      </List.Header>
                          <ButtonGroupType  item={dish} setItemUnit={setItemUnit} setItemCount={setItemCount} />
                        <List.Description>
                      </List.Description>
                    </List.Content>
                  </List.Item>
              )}
            </List.List>
        </List.Item>
    )}
  </List>
)

const ButtonGroupType = ({item, setItemUnit, setItemCount}) => (
  <Input
    size='mini'
    value= {item.count}
    onChange = {e => setItemCount(item, parseFloat(e.target.value))}>
    <Button.Group size='mini' basic>
      <Button active={item.unit === "%"} onClick={e => setItemUnit(item, "%")}>%</Button>
      <Button active={item.unit === "Гр"} onClick={e => setItemUnit(item, "Гр")}>Гр</Button>
      <Button active={item.unit === "Шт"} onClick={e => setItemUnit(item, "Шт")}>Шт</Button>
    </Button.Group>
    <input  style={{ width: "40px" }}  />
  </Input>
)

const LabelsStats = ({item}) => (
  <Label.Group size='mini'>
    <Label basic>
      {(item.cal).toFixed(0) + " Ккал " + (item.prot).toFixed(1) + " Б " + (item.fat).toFixed(1) + " Ж " + (item.carb).toFixed(1) + " У "} <Icon name='pie graph' />
    </Label>
    <Label basic>
      {(item.price).toFixed(1)} <Icon name='rub' />
    </Label>
  </Label.Group>
)



export { ModalProgram};