import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  Segment,
  Sidebar } from 'semantic-ui-react';
import SidebarMenu from '../containers/sidebar';

import MainPage from './pages/MainPage';
import ProductsPage from '../containers/pages/ProductsPage';
import DishsPage from '../containers/pages/DishsPage.js';
import ClientsPage from '../containers/pages/ClientsPage.js';
import OrdersPage from '../containers/pages/OrdersPage.js';
import ProgramsPage from '../containers/pages/ProgramsPage.js';
import DaysPage from '../containers/pages/DaysPage.js';


class App extends Component {
  componentWillMount() {
    const { screenResize } = this.props;
    window.addEventListener('resize', () => {
    screenResize(window.innerWidth>600);
    });
  }



  render() {
    const { desctop, visibleSidebar } = this.props;
    return (
          <Router>
            <div className = "AppContent">
              <Sidebar.Pushable as={Segment}>
                  <SidebarMenu />  
                  <Sidebar.Pusher dimmed={!desctop && visibleSidebar} style={{ "overflow": "auto"}}>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        <Route exact path="/days" component={DaysPage}/>
                        <Route exact path="/programs" component={ProgramsPage}/>
                        <Route exact path="/orders" component={OrdersPage}/>
                        <Route exact path="/clients" component={ClientsPage}/>
                        <Route exact path="/products" component={ProductsPage}/>
                        <Route path="/dishs" component={DishsPage}/>
                    </Switch>
                    </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          </Router>
    );
  }
}

export default App;
