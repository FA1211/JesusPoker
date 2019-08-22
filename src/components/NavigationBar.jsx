import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {NavBarStyle, NavBarTextStyle} from './styles.jsx';

class NavigationBar extends Component {
    state = {  }
    render() { 
        return (
            <div >
                <Navbar style={NavBarStyle} className="border-bottom border-dark" light>
                <NavbarBrand href="/" className="ml-2 mb-0 h1">
                        Jesus Poker
                </NavbarBrand>
                </Navbar>

                <Navbar className="navbar-secondary border-bottom border-right border-dark m1-auto">
                    
                    <NavLink to="/add-session" style={NavBarTextStyle} className ="border-right border-dark col-6">
                        Add Session
                    </NavLink>

                    <NavLink to ="/" style = {NavBarTextStyle} className ="col-6">
                        View Sessions
                    </NavLink>
                    
                </Navbar>
            </div>
          );
    }
}
 
export default NavigationBar;