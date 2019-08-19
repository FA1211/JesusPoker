import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import BestPlayerLine from './components/BestPlayerLine';
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
  height: "100vh",
  margin: "0px",
  padding: "0px",
}

function App() {


  return (
    <BrowserRouter>
    <div style = {bgStyle}>
      <NavigationBar/>
      <Switch>
      <Route path="/" component={HomePage} exact/>
      <Route path="/secondpage" component={BestPlayerLine}/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
