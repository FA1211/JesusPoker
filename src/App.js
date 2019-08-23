import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SessionForm from './components/SessionForm'
import HomePage from './components/HomePage';
import NavigationBar from './components/NavigationBar'
import {bgStyle} from './components/styles'
  

function App() {


  return (
    <BrowserRouter>
    <div style = {bgStyle}>
      <NavigationBar/>
      <Switch>
      <Route path="/add-session" component={SessionForm}></Route> 
      <Route path="/" component={HomePage}/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
