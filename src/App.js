import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SessionForm from './components/SessionForm'
import HomePage from './components/HomePage';
import NavigationBar from './components/navbar'

const tableTextStyle = {
  color: "#767D92",
  fontSize: "medium",
  fontWeight: "bold"
}
const bgStyle = {
  display: "flex",
  flexDirection : "column",
  backgroundColor: "#17223b",
  width: "100vw",
  minHeight: "100vh",
  margin: "0px",
  padding: "0px",
}

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
