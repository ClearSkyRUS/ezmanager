import React from 'react'
import {
  Icon,
  Menu,
  Sidebar,
  Image
} from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const SidebarItems = ({ changeMenu, menuState }) => (
   <div>
            <Link to="/" onClick={changeMenu.bind(this, '/')}>
              <Menu.Item 
                active={menuState === '/'}>
                <Image src='https://react.semantic-ui.com/logo.png' size='mini' centered/>
              </Menu.Item>
            </Link>
             <Link to="/orders" onClick={changeMenu.bind(this, '/orders')}>
              <Menu.Item 
                active={menuState === '/orders'}>
                Заказы
              </Menu.Item>
            </Link>
             <Link to="/clients" onClick={changeMenu.bind(this, '/clients')}>
              <Menu.Item 
                active={menuState === '/clients'}>
                Клиенты
              </Menu.Item>
            </Link>
            <Link to="/programs" onClick={changeMenu.bind(this, '/programs')}>
              <Menu.Item 
                active={menuState === '/programs'}>
                Программы
              </Menu.Item>
            </Link>
            <Link to="/days" onClick={changeMenu.bind(this, '/days')}>
              <Menu.Item 
                active={menuState === '/days'}>
                Дни
              </Menu.Item>
            </Link>
            <Link to="/dishs" onClick={changeMenu.bind(this, '/dishs')}>
              <Menu.Item 
                active={menuState === '/dishs'}>
                Блюда
              </Menu.Item>
            </Link>
            <Link to="/products" onClick={changeMenu.bind(this, '/products')}>
              <Menu.Item 
                active={menuState === '/products'}>
                Продукты
              </Menu.Item>
            </Link>
      </div>
)

const MobileSidebar = ({visibleSidebar, setVisbleSideBar, changeMenu, menuState }) => (
  <div>
    <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              vertical
              onHide={setVisbleSideBar.bind(this, false)}
              visible={visibleSidebar}
              width='thin'
            >
            <SidebarItems  menuState = {menuState} changeMenu = {changeMenu}/>
    </Sidebar>
    <Icon size = 'small' onClick = {setVisbleSideBar.bind(this, true)} name="angle right" style={{  position: "absolute", zIndex: "101", top: "50%" }}/>
  </div>
)

const DesctopSidebar = ({ changeMenu, menuState }) => (
      <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              vertical
              visible={true}
              width='thin'
            >
            <SidebarItems menuState = {menuState} changeMenu = {changeMenu} />
     </Sidebar>
)

const HorizontalSidebar = ({ desctop, visibleSidebar, setVisbleSideBar, menuState, changeMenu }) => (
  <div>
    {desctop
      ? <DesctopSidebar menuState = {menuState} changeMenu = {changeMenu} />
      : <MobileSidebar visibleSidebar = {visibleSidebar} setVisbleSideBar = {setVisbleSideBar} menuState = {menuState} changeMenu = {changeMenu}/>   }
   </div>
)



export default HorizontalSidebar