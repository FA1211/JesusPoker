import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SessionForm from './components/SessionForm'
import HomePage from './components/HomePage';
<<<<<<< Updated upstream
import NavigationBar from './components/NavigationBar'
import {bgStyle} from './components/styles'
=======
import NavigationBar from './components/navbar'


const bgStyle = {
  display: "flex",
  flexDirection : "column",
  backgroundColor: "#17223b",
  width: "100vw",
  minHeight: "100vh",
  margin: "0px",
  padding: "0px",
}
>>>>>>> Stashed changes

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
