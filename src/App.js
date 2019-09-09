import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";
import SessionForm from "./components/SessionForm";
import SessionTable from "./components/SessionTable";
import { bgStyle } from "./components/styles";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div style={bgStyle}>
          <NavigationBar/>
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
