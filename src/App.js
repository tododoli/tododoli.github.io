import React from 'react';
import './App.css';
import {HashRouter, Route} from "react-router-dom";
import List from "./components/list/List";
import Home from './components/home/Home'

const App = () => {
  return (
    <div className="App">
    <HashRouter>
      <Route exact path={'/'} component={Home}/>
      <Route exact path={'/:id'} component={List}/>
    </HashRouter>
    </div>
  );
}

export default App;
