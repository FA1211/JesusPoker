import React, { Component } from "react";
import { Navbar, NavbarBrand, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NavBarStyle, NavBarTextStyle } from "./styles.jsx";
import FacebookLogin from 'react-facebook-login'


class NavigationBar extends Component {

    onFacebookLogin = (response) => {
        return this.setState({fb_access_token: response['accessToken']}, this.getBackendToken)
    }
    
    getBackendToken = () => {
        let login_body = {provider: "facebook", access_token: this.state.fb_access_token}
        console.log(login_body)
        return fetch(process.env.REACT_APP_BACKEND_URL + "/oauth/login/", 
        {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body:JSON.stringify(login_body)
        })
        .then(response => console.log(response))
    }

  state = {fb_access_token:""};
  render() {
    return (
      <div>
        <Navbar style={NavBarStyle} className="border-bottom border-dark" light>
          <NavbarBrand href="/" className="ml-2 mb-0 h1">
            Jesus Poker
          </NavbarBrand>

          <FacebookLogin
            appId = "347699686134343"
            fields = "first_name, email, picture"
            autoLoad = {false}
            callback = {this.onFacebookLogin}
            size = "small"
          />

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
