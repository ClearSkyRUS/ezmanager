import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Swipe from 'react-easy-swipe';
import {
  Segment,
  Sidebar } from 'semantic-ui-react';
import SidebarMenu from '../containers/sidebar';

import MainPage from 'containers/pages/MainPage';
import ProductsPage from 'containers/pages/ProductsPage';
import DishsPage from 'containers/pages/DishsPage.js';
import DishTypesPage from 'containers/pages/DishTypesPage';
import ClientsPage from 'containers/pages/ClientsPage.js';
import OrdersPage from 'containers/pages/OrdersPage.js';
import ProgramsPage from 'containers/pages/ProgramsPage.js';
import DaysPage from 'containers/pages/DaysPage.js';
import DaysQueryPage from 'containers/pages/DaysQueryPage.js';


class App extends Component {
  componentWillMount() {
    const { screenResize } = this.props;
    window.addEventListener('resize', () => {
    screenResize(window.innerWidth>600);
    });
  }


  render() {
    const { desctop, visibleSidebar, setVisbleSideBar } = this.props;
    return (
          <Router>
            <div className = "AppContent">
              <Sidebar.Pushable as={Segment}>
                  <SidebarMenu /> 
                  <Swipe onSwipeRight={  setVisbleSideBar.bind(this, true) } style = {{    height: "100%", width: "60px",  position: "absolute", zIndex: "100" }} />
                    <Sidebar.Pusher dimmed={!desctop && visibleSidebar} style={{ "overflow": "auto"}}>
                      <Switch>
                          <Route exact path="/" component={MainPage}/>
                          <Route exact path="/days" component={DaysPage}/>
                          <Route exact path="/daysquery" component={DaysQueryPage}/>
                          <Route exact path="/programs" component={ProgramsPage}/>
                          <Route exact path="/orders" component={OrdersPage}/>
                          <Route exact path="/clients" component={ClientsPage}/>
                          <Route exact path="/products" component={ProductsPage}/> 
                          <Route exact path="/dishs" component={DishsPage}/>
                          <Route exact path="/dishTypes" component={DishTypesPage}/>
                      </Switch>
                    </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          </Router>
    );
  }
}

export default App;
