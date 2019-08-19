import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'


const tableTextStyle = {
  color: "#767D92",
  fontSize: "medium",
  fontWeight: "bold"
}

function App() {


  return (
    <BrowserRouter>
    <Route path="/" component={HomePage}/>
    </BrowserRouter>
  );
}

export default App;
