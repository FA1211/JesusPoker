import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, UncontrolledDropdown } from "reactstrap";
import navLogo from '../assets/navbaricon.png';
import "../styles.css";
import { NavBarStyle, NavBarTextStyle } from "./styles.jsx";


class NavigationBar extends Component {

  state = {
    dropdownOpen: false,
    names: ["Fadle", "Joao"],
    selectedName:"My Profile"
  }

  toggle = () => { this.setState({ dropdownOpen: !this.state.dropdownOpen }) }

  render() {
    return (
      <div>

        <Navbar style={NavBarStyle} className="border-bottom border-dark" light>
          <NavbarBrand href="/" className="ml-2 mb-0 h1">
            <img style={{}} alt="navbar icon" src={navLogo} width={40} height={40} />
            <span style={{ fontSize: 16, paddingBottom: 0, paddingLeft: 10 }}>JC Poker </span>
          </NavbarBrand>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {this.state.selectedName}
                </DropdownToggle>
            <DropdownMenu right>
              {this.state.names.map(name =>
                <NavLink to={"/profile/?name=" + name}>
                <DropdownItem onClick={() => this.setState({selectedName:name})}>
                    {name}
                </DropdownItem>
                </NavLink>)}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Navbar>


        <Navbar className="navbar-secondary border-bottom border-right border-dark m1-auto">
          <NavLink
            to="/add-session"
            style={NavBarTextStyle}
            className="border-right border-dark col-6"
          >
            Add Session
          </NavLink>

          <NavLink
            to="/view-sessions"
            style={NavBarTextStyle}
            className="col-6"
          >
            View Sessions
          </NavLink>

        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
