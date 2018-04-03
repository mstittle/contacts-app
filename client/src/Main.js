import React from 'react'
import { Switch, Route } from 'react-router-dom';
import ContactList from './ContactList';
import Contact from './Contact';
import Home from './Home';

const Main = () => (
  <main className="flex" >
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/contacts' component={ContactList}/>
      <Route path='/contact/:id' component={Contact}/>
    </Switch>
  </main>
)

export default Main;
