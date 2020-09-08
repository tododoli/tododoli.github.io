import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import List from "./components/list/List";
import Home from './components/home/Home'
import Sync from "./components/sync/Sync";

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route exact path={'/sync/:id'} render={()=><Sync/>}/>
                    <Route exact path={'/nosync'} render={()=><Sync nosync/>}/>
                    <Route exact path={'/'} component={Home}/>
                    <Route exact path={'/:id'} component={List}/>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
