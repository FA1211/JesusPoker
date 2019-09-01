import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NavBarStyle, NavBarTextStyle } from "./styles.jsx";
import FacebookLogin from "react-facebook-login";

class NavigationBar extends Component {
    
    constructor(props){
        super(props)
        //console.log(props)
        this.state = {
            fb_access_token: "",
            is_authed: false,
            fb_user: this.props.name
          };
        
    } 

  onFacebookLogin = response => {
    this.props.update_auth()
    return this.setState(
      {
        fb_access_token: response["accessToken"],
        fb_user: response["first_name"]
      },
      () => this.props.getBackendToken(this.state.fb_access_token)
    );
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <Navbar style={NavBarStyle} className="border-bottom border-dark" light>
          <NavbarBrand href="/" className="ml-2 mb-0 h1">
            Jesus Poker
          </NavbarBrand>

          {!this.props.is_authed ?
            <FacebookLogin
              appId={process.env.REACT_APP_STR_FACEBOOK_APP_ID}
              fields="first_name, email, picture"
              autoLoad={false}
              callback={this.onFacebookLogin}
              size="small"
            />
           : (
            <h6>{this.props.name===""? "" : "Logged in as " + this.props.name}</h6>
          )}
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
