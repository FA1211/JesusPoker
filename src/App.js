import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SessionForm from "./components/SessionForm";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";
import SessionTable from "./components/SessionTable";
import { bgStyle } from "./components/styles";
import {checkFacebookToken} from "./api/facebook.jsx"
import {getDjangoToken} from "./api/django.jsx"
import {Container} from "reactstrap"

class App extends Component {
  state = { is_authed: false, authed_user: "" };

  updateAuth = () => {
    let new_auth = !this.state.is_authed;
    this.setState({ is_authed: new_auth });
  };

  saveDjangoToken = (fb_access_token) => {
    getDjangoToken(fb_access_token).then(data => {
      let django_token = data["access_token"];
      localStorage.setItem("django_token", django_token);
      this.setState({is_authed: true, authed_user:data["first_name"]})
    })
  } 

  componentDidMount = () => {
    checkFacebookToken().then(response => {
      if("authenticated_user" in response){
        this.setState({is_authed:true, authed_user:response['authenticated_user']})
      }
    })
  } 
    

  render() {
    return (
      <BrowserRouter>
        <div style={bgStyle}>
          <NavigationBar
            is_authed={this.state.is_authed}
            update_auth={this.updateAuth}
            getBackendToken={this.saveDjangoToken}
            name={this.state.authed_user}
          />
          <Container fluid>
          <Switch style={{paddingLeft:0, paddingRight:0}}>
            <Route path="/add-session" component={SessionForm} />
            <Route path="/view-sessions" component={SessionTable} />
            <Route path="/" component={HomePage} />
          </Switch>

          </Container>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
