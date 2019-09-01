import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SessionForm from "./components/SessionForm";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";
import SessionTable from "./components/SessionTable";
import { bgStyle } from "./components/styles";

class App extends Component {
  state = { is_authed: false, authed_user: "" };

  updateAuth = () => {
    let new_auth = !this.state.is_authed;
    this.setState({ is_authed: new_auth });
  };

  checkInitialAuth = () => {
    let token = localStorage.getItem("django_token");

    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/check-token/", {
      method: "get",
      headers: { Authorization: "Token " + token }
    }).then(response => {
      if (!response.ok) {
        console.log("initial auth failed - user not logged in");
        return;
      } else
        return response.json().then(data =>
          this.setState({
            is_authed: true,
            authed_user: data["authenticated_user"]
          })
        );
    });
  };

  getBackendToken = fb_access_token => {
    let login_body = {
      provider: "facebook",
      access_token: fb_access_token
    };
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/login/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login_body)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({authed_user:data["first_name"]})
        let django_token = data["access_token"];
        localStorage.setItem("django_token", django_token);
      });
  };

  componentDidMount = () => {
    this.checkInitialAuth();
  };

  render() {
    console.log(this.state.authed_user);
    return (
      <BrowserRouter>
        <div style={bgStyle}>
          <NavigationBar
            is_authed={this.state.is_authed}
            update_auth={this.updateAuth}
            getBackendToken={this.getBackendToken}
            name={this.state.authed_user}
          />
          <Switch>
            <Route path="/add-session" component={SessionForm} />
            <Route path="/view-sessions" component={SessionTable} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
