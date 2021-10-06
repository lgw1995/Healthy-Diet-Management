/*
Application
 */
import React, {Component} from 'react';

//import of the routing
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from "./pages/login/login.js";
import Personal from "./pages/personal/personal"
export default class App extends Component{
    render() {
        return (
            //Home page:router
            <BrowserRouter>
                <Switch> {/*Only match one of them*/}
                    <Route path='/login' component={Login}></Route>
                    <Route path='/personal' component={Personal}></Route>
                    <Route path='/' component={Login}></Route>
                </Switch>
            </BrowserRouter>
        )
         }
}

