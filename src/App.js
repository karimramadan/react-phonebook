import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Contacts from "./components/Contacts";
import './css/normalize.css';
import './css/App.css';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <div id="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/contacts' component={Contacts} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;