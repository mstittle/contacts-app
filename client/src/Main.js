import React from 'react'
import { Switch, Route } from 'react-router-dom';
// import ContactList from './ContactList';
import ContactList from './ContactListHook';

import Contact from './Contact';
import Home from './Home';
import Login from './Login';
import './Main.css';

const Main = () => (
  <main className="Main" >
    <div className="Main-column tile" >
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/contacts' component={ContactList}/>
      <Route path='/contact/:id' component={Contact}/>
    </Switch>
    </div>
    <div className="Main-sidebar" >
      <Login />
    </div>
  </main>
  
)

export default Main;
