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
        "cal": '',
        "public": false,
        "price": ''
      },
      "optionActive": {
        "activeItem": -1
      },
      "activePage": 1
    };

    if (!this.props.program) {
      for (var setting of this.props.settings) { 
         var set = {
          "title": setting.title,
          types: [],
          auto: true
          };
          this.state.program.settings.push(set);
        }
    }
  }
    setTitle = (e) => { this.setState({ program: { ...this.state.program, title: e.target.value}})};

    setCalOption = (e) => { this.setState({ NewOption: { ...this.state.NewOption, cal: e.target.value}})};
    setPriceOption = (e) => { this.setState({ NewOption: { ...this.state.NewOption, price: e.target.value}})};
    setOption = (program, newOption) =>  {
      program.options.push(newOption);
      this.setState({ NewOption: { ...this.state.NewOption, cal: '', price: '' }, program},)
      this.props.onUp(this.props.ApiPath, this.state.program._id, this.state.program)
    };
    changePriceOption = (e, option) => { 
      option.price = e.target.value;
      this.setState({option}); 
    }
    changeDrop = (i) => { 
      if (this.state.optionActive.activeItem === i)
        i = -1;
      this.setState({ optionActive: { ...this.state.optionActive, activeItem: i }})
    };
    AutoActction = (i) => { 
      var newData = [...this.state.program.settings];
      newData[i].auto = !newData[i].auto;
      if( newData[i].auto)
        newData[i].types=[]

      this.setState({ program: { ...this.state.program, settings: newData}});
    }
    AddDelSetting = (i, type) => { 
      var newData = [...this.state.program.settings];
      if (newData[i].types.indexOf( type ) === -1) {
         newData[i].types.push(type)
      } else {
        newData[i].types.splice(newData[i].types.indexOf( type ), 1)
      }
      this.setState({ program: { ...this.state.program, settings: newData}});
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

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
            var checkFixed = false;
            var checkPices = false;
            var i = 3;
            while (i !== 0) {
                for (var mealOne of dayItem.meals) {
                 for (var dishsOne of mealOne.meal) { 
                    for (var dishOne of dishsOne.dishs) { 
                      var BaseDish = this.props.dishs.find(x => x._id === dishOne.id )
                      var needCal = 0;
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
              for (var mealCheckk of dayItem.meals) { 
                if (mealCheckk.ended) {
                  dayItem.cal = dayItem.cal + mealCheckk.cal
                  dayItem.gram = dayItem.gram + mealCheckk.gram
                  dayItem.prot = dayItem.prot + mealCheckk.prot
                  dayItem.fat = dayItem.fat + mealCheckk.fat
                  dayItem.carb = dayItem.carb + mealCheckk.carb
                  dayItem.price = dayItem.price + mealCheckk.price
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

    ProcentSum = (array) => {
      var procent = 0;
      for (var item of array) {
        if (!item.ended && item.unit !== "Гр")
          procent = procent + item.count
      }
      return procent;
    }

    setChangeAndUpdate = (item, prop, update) => {
      item[prop] = update;
      this.setState({item})
      this.props.onUp(this.props.ApiPath, this.state.program._id, this.state.program)
    }


 render() {
      const { program, NewOption, optionActive, settingsActive, activePage, portionActive } = this.state;
      const { days, settings, ApiPath, onAdd, onUp, onRemove } = this.props;
      return (
        <div>
           <Form size='mini' >
              <Form.Group  style = {{ padding: "10px" }} >
                <Input  value={program.title}
                  onChange={this.setTitle}
                  placeholder='Название' />
                <Label basic>
                  <Checkbox label="Доступна всем" 
                    checked={program.public} 
                    onChange={e => this.setChangeAndUpdate(program, 'public', !program.public)} />
                </Label>
              </Form.Group>
            </Form>
            <Grid >
              {settings.map((setting, i) =>
                <Grid.Column key = {i} style={{     width: "min-content",  textAlign: "center" }} >
                  {setting.title}
                  <Button.Group basic vertical size='mini'>
                    {setting.types.map((type, j) => 
                      <Button key={j} disabled={program.settings[i].auto} active = {program.settings[i].types.indexOf( type ) !== -1} onClick={e => this.AddDelSetting(i, type)} >{type}</Button>)}
                  </Button.Group>
                  <Checkbox label='Авто' checked={program.settings[i].auto === true} onChange ={e => this.AutoActction(i)} />
                </Grid.Column>
              )}
            </Grid>

            <Form size='mini' style={{ padding: "10px",  paddingTop: "20px" }} >
              <Form.Group  style = {{display: "flex"}} >
                <Input value={NewOption.cal}
                  onChange={this.setCalOption}
                  placeholder='Добавте опцию...'
                  style = {{paddingRight: "5px"}} />
                <Input value={NewOption.price}
                  onChange={this.setPriceOption}
                  placeholder='Цена'
                  style = {{paddingRight: "5px"}} />
                <Button size='tiny' onClick={e => this.setOption(program, NewOption) } circular icon='plus' style={{ cursor: 'pointer' }} />
              </Form.Group>
            </Form>

            <Accordion styled fluid>
             {program.options.map((option, i) =>
              (option.days) 
              ? (<div key = { i } >
                  <Accordion.Title active={optionActive.activeItem === i} index={i} onClick={e => this.changeDrop(i)}>
                    <Icon name='dropdown' />
                    { option.cal + " Цена: "}
                    <Input value={option.price}
                    onChange={ e => this.changePriceOption(e, option)}
                    placeholder='Цена'
                    style = {{margin: "5px", width: "80px"}} />
                    <Label basic><Checkbox label="Доступна всем" checked={option.public} onChange={e => this.setChangeAndUpdate(option, 'public', !option.public)} /></Label>
                  </Accordion.Title>
                  <Accordion.Content active={optionActive.activeItem === i} >
                    <LabelsStats item={option.days[activePage-1]} />
                    <List key={i} celled horizontal>
                      {option.days[activePage-1].meals.map((meal, j) =>
                        <MealOptionItem key={j} mealToCard={meal}/>
                      )}
                    </List>
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
                </div>)
              : ''
              )}
            </Accordion>
            {(onAdd)
              ? <Button positive onClick = {onAdd.bind(this, ApiPath, this.state.program)} style={{ cursor: 'pointer',   float: 'right' }} >
                  Добавить
                </Button>
              : '' }
              {(onUp && onRemove)
                ? <div>
                    <Button positive onClick = {onUp.bind(this, ApiPath, this.state.program._id, this.state.program)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Изменить
                    </Button>
                    <Button negative onClick = {onRemove.bind(this, ApiPath, this.state.program._id)} style={{ cursor: 'pointer',   float: 'right' }} >
                        Удалить
                    </Button>
                  </div>
                : ''}
        </div>
       )
    }
};

const MealOptionItem = ({ mealToCard }) => (
  <List.Item style={{ verticalAlign: 'top', marginBottom: '20px', borderTop: '#4183c4 solid', width: '320px'}} >
    <List.Header>
    </List.Header>
    <List.Content>
      {mealToCard.title}  <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {mealToCard.target}</span>
    </List.Content>
      <DishInOption mealToCard = {mealToCard} />
  </List.Item>
)

const DishInOption = ({ mealToCard }) => (
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
                        {dish.dish.title}
                         <span style={{fontSize: '12px', color: 'rgba(0,0,0,.4)'}}className='date'> {dish.dish.type.title + ' ' + dish.target}</span>
                           {(dish.dish.type.unit !== "Шт")
                            ? <span>{" " +(dish.gram).toFixed(0) + " " }<Icon name='weight' /></span>
                            : <span>{" " + dish.count + " Шт"}</span>}
                        }
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

export { ModalProgram };