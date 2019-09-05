import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NavBarStyle, NavBarTextStyle } from "./styles.jsx";
// import FacebookLogin from "react-facebook-login";
import "../styles.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fb_access_token: "",
      is_authed: false,
      fb_user: this.props.name,
      is_logging_in: false
    };
  }

  onFacebookLogin = response => {
    if (response.status === "unknown") {
      return;
    } else {
      this.setState({ is_logging_in: true }, () => {
        this.props.update_auth();
        console.log(this.state);
        this.props.getBackendToken(response["accessToken"]);
        this.setState({ is_logging_in: false }, () => console.log(this.state));
      });
    }
  };

  render() {
    return (
      <div>
        <Navbar style={NavBarStyle} className="border-bottom border-dark" light>
          <NavbarBrand href="/" className="ml-2 mb-0 h1">
            Jesus Poker
          </NavbarBrand>

          {/* {this.state.is_logging_in ? (
            <FontAwesomeIcon icon={faSpinner} size="xs" spin  />
          ) : !this.props.is_authed ? (
            <FacebookLogin
              className="btnFacebook"
              appId={process.env.REACT_APP_STR_FACEBOOK_APP_ID}
              fields="first_name, email, picture"
              autoLoad={false}
              reAuthenticate={false}
              callback={this.onFacebookLogin}
              size="small"
            />
          ) : (
            <h6> Logged In</h6> */}
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
