import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import List from "./components/list/List";
import Home from './components/home/Home'

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
      <Route exact path={'/'} component={Home}/>
      <Route exact path={'/list/:id'} component={List}/>
    </BrowserRouter>
    </div>
  );
}

export default App;
