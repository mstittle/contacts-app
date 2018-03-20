import React from 'react'
import { Switch, Route } from 'react-router-dom';
import ContactList from './ContactList';
import Home from './Home';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/contacts' component={ContactList}/>
    </Switch>
  </main>
)

export default Main;
