import React, { Component } from 'react';
import Main from './Main';
import Header from './Header';
import NavBar from './NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Main />
      </div>
    );
  }
}

export default App;
